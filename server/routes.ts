import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactMessageSchema } from "@shared/schema";
import { sendEmail } from "./email";

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
      
      // Check rate limiting
      if (!checkRateLimit(clientIP)) {
        return res.status(429).json({ 
          error: "Too many submissions. Please try again later." 
        });
      }

      const parsed = insertContactMessageSchema.parse(req.body);
      
      const message = await storage.createContactMessage(parsed);
      
      // Send email to admin
      await sendEmail({
        to: "management@excelessel.com",
        subject: `New Charter Inquiry: ${parsed.subject}`,
        html: `
          <h2>New Contact Message from ${parsed.name}</h2>
          <p><strong>From:</strong> ${parsed.name}</p>
          <p><strong>Email:</strong> ${parsed.email}</p>
          <p><strong>Subject:</strong> ${parsed.subject}</p>
          <hr/>
          <p><strong>Message:</strong></p>
          <p>${parsed.message.replace(/\n/g, "<br>")}</p>
          <hr/>
          <p><small>This message was submitted through your contact form. You can reply to ${parsed.email}</small></p>
        `,
      });

      // Send confirmation email to user
      await sendEmail({
        to: parsed.email,
        subject: "We received your message - Excelessel Marine Services",
        html: `
          <p>Dear ${parsed.name},</p>
          <p>Thank you for contacting Excelessel Marine Services. We have received your inquiry and our team will get back to you shortly.</p>
          <p><strong>Your Message:</strong></p>
          <p>${parsed.message.replace(/\n/g, "<br>")}</p>
          <hr/>
          <p>Best regards,<br><strong>Excelessel Marine Services Team</strong></p>
        `,
      });

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

  return httpServer;
}
