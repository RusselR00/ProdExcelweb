import type { VercelRequest, VercelResponse } from "@vercel/node";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { eq, sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp } from "drizzle-orm/pg-core";
import { parse } from "cookie";
import jwt from "jsonwebtoken";

// Schema definition
const contactMessages = pgTable("contact_messages", {
    id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
    name: text("name").notNull(),
    email: text("email").notNull(),
    subject: text("subject").notNull(),
    message: text("message").notNull(),
    status: text("status").default("pending").notNull(),
    ipAddress: text("ip_address"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Database connection
const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
    throw new Error("DATABASE_URL environment variable is not set");
}

const client = postgres(connectionString, {
    prepare: false,
    ssl: { rejectUnauthorized: false }
});
const db = drizzle(client);

// Auth helper
function verifyAuth(req: VercelRequest, res: VercelResponse): boolean {
    const cookies = parse(req.headers.cookie || "");
    const token = cookies.admin_token;

    if (!token) {
        res.status(401).json({ error: "Unauthorized" });
        return false;
    }

    try {
        const secret = process.env.SUPABASE_JWT_SECRET || "fallback-secret";
        jwt.verify(token, secret);
        return true;
    } catch {
        res.status(401).json({ error: "Invalid token" });
        return false;
    }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== "PATCH") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    if (!verifyAuth(req, res)) return;

    try {
        const { id } = req.query;
        const { status } = req.body;

        if (!id || typeof id !== "string") {
            return res.status(400).json({ error: "Invalid ID" });
        }

        if (!["pending", "replied", "resolved"].includes(status)) {
            return res.status(400).json({ error: "Invalid status" });
        }

        const [message] = await db
            .update(contactMessages)
            .set({ status })
            .where(eq(contactMessages.id, id))
            .returning();

        if (!message) {
            return res.status(404).json({ error: "Message not found" });
        }

        res.json(message);
    } catch (error) {
        console.error("Status update error:", error);
        res.status(400).json({ error: "Failed to update status" });
    }
}
