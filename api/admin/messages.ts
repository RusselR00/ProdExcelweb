import type { VercelRequest, VercelResponse } from "@vercel/node";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { desc, sql } from "drizzle-orm";
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
    if (req.method !== "GET") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    if (!verifyAuth(req, res)) return;

    try {
        const messages = await db
            .select()
            .from(contactMessages)
            .orderBy(desc(contactMessages.createdAt));

        res.json(messages);
    } catch (error) {
        console.error("Error fetching messages:", error);
        res.status(400).json({ error: "Failed to fetch messages" });
    }
}
