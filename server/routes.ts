import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactMessageSchema } from "@shared/schema";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";
const ADMIN_SESSIONS = new Set<string>();

// Rate limiting: track submissions by IP
const IP_SUBMISSIONS = new Map<string, number[]>();
const RATE_LIMIT = {
  maxSubmissions: 5,
  timeWindowMs: 24 * 60 * 60 * 1000, // 24 hours
};

function generateSessionId(): string {
  return Math.random().toString(36).substring(2, 15);
}

function getClientIP(req: Request): string {
  const forwarded = req.headers["x-forwarded-for"];
  const ip = typeof forwarded === "string" ? forwarded.split(",")[0] : req.socket.remoteAddress;
  return (ip || "unknown").trim();
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const submissions = IP_SUBMISSIONS.get(ip) || [];
  
  // Remove submissions older than time window
  const recentSubmissions = submissions.filter(time => now - time < RATE_LIMIT.timeWindowMs);
  
  if (recentSubmissions.length >= RATE_LIMIT.maxSubmissions) {
    return false; // Rate limited
  }
  
  // Add new submission timestamp
  recentSubmissions.push(now);
  IP_SUBMISSIONS.set(ip, recentSubmissions);
  
  return true; // Allowed
}

function requireAdmin(req: Request, res: Response, next: () => void) {
  const sessionId = req.cookies?.adminSession;
  if (!sessionId || !ADMIN_SESSIONS.has(sessionId)) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  next();
}

// Simple cookie parsing middleware
function parseCookies(req: Request) {
  const cookieHeader = req.headers.cookie;
  const cookies: Record<string, string> = {};
  if (cookieHeader) {
    cookieHeader.split(";").forEach((cookie) => {
      const [key, value] = cookie.trim().split("=");
      if (key && value) {
        cookies[key] = decodeURIComponent(value);
      }
    });
  }
  req.cookies = cookies;
  return cookies;
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Parse cookies for all requests
  app.use((req, res, next) => {
    parseCookies(req);
    next();
  });
  app.post("/api/contact", async (req, res) => {
    try {
      const clientIP = getClientIP(req);
      
      // Check rate limiting - max 5 submissions per IP per 24 hours
      if (!checkRateLimit(clientIP)) {
        return res.status(429).json({ 
          error: "Too many submissions. Please try again later." 
        });
      }

      const parsed = insertContactMessageSchema.parse(req.body);
      const message = await storage.createContactMessage(parsed);

      res.json({ success: true, message });
    } catch (error) {
      console.error("Contact form error:", error);
      res.status(400).json({ error: "Failed to submit contact form" });
    }
  });

  app.post("/api/admin/login", (req, res) => {
    const { password } = req.body;
    if (password === ADMIN_PASSWORD) {
      const sessionId = generateSessionId();
      ADMIN_SESSIONS.add(sessionId);
      res.setHeader("Set-Cookie", `adminSession=${sessionId}; Path=/; HttpOnly; SameSite=Strict`);
      res.json({ success: true });
    } else {
      res.status(401).json({ error: "Invalid password" });
    }
  });

  app.post("/api/admin/logout", (req, res) => {
    const sessionId = req.cookies?.adminSession;
    if (sessionId) {
      ADMIN_SESSIONS.delete(sessionId);
    }
    res.setHeader("Set-Cookie", "adminSession=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0");
    res.json({ success: true });
  });

  app.get("/api/admin/messages", (req, res, next) => {
    requireAdmin(req, res, next);
  }, async (req, res) => {
    try {
      const messages = await storage.getContactMessages();
      res.json(messages);
    } catch (error) {
      console.error("Error fetching messages:", error);
      res.status(400).json({ error: "Failed to fetch messages" });
    }
  });

  app.patch("/api/admin/messages/:id/status", (req, res, next) => {
    requireAdmin(req, res, next);
  }, async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;

      if (!["cold", "responded", "closed"].includes(status)) {
        return res.status(400).json({ error: "Invalid status" });
      }

      const message = await storage.updateMessageStatus(id, status);
      if (!message) {
        return res.status(404).json({ error: "Message not found" });
      }

      res.json(message);
    } catch (error) {
      console.error("Status update error:", error);
      res.status(400).json({ error: "Failed to update status" });
    }
  });

  return httpServer;
}
