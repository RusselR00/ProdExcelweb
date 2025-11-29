import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactMessageSchema } from "@shared/schema";
import { sendEmail } from "./email";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.post("/api/contact", async (req, res) => {
    try {
      const parsed = insertContactMessageSchema.parse(req.body);
      
      const message = await storage.createContactMessage(parsed);
      
      // Send email to admin
      await sendEmail({
        to: process.env.ADMIN_EMAIL || "management@excelessel.com",
        subject: `New Contact Message: ${parsed.subject}`,
        html: `
          <h2>New Contact Message</h2>
          <p><strong>From:</strong> ${parsed.name}</p>
          <p><strong>Email:</strong> ${parsed.email}</p>
          <p><strong>Subject:</strong> ${parsed.subject}</p>
          <p><strong>Message:</strong></p>
          <p>${parsed.message.replace(/\n/g, "<br>")}</p>
        `,
      });

      // Send confirmation email to user
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

  return httpServer;
}
