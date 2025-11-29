import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactMessageSchema } from "@shared/schema";
import { sendEmail } from "./email";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";
const ADMIN_SESSIONS = new Set<string>();

function generateSessionId(): string {
  return Math.random().toString(36).substring(2, 15);
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
      const parsed = insertContactMessageSchema.parse(req.body);
      
      const message = await storage.createContactMessage(parsed);
      
      // Send confirmation email to user only (prevent spam to admin inbox)
      await sendEmail({
        to: parsed.email,
        subject: "We received your message",
        html: `
          <p>Dear ${parsed.name},</p>
          <p>Thank you for contacting Excelessel Marine Services. We have received your message and will get back to you shortly.</p>
          <p><strong>Your Message:</strong></p>
          <p>${parsed.message.replace(/\n/g, "<br>")}</p>
          <p>Best regards,<br>Excelessel Marine Services Team</p>
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
