import type { VercelRequest, VercelResponse } from "@vercel/node";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { contactMessages, insertContactMessageSchema } from "../shared/schema";
import { eq, and, gt, sql } from "drizzle-orm";

// Initialize database connection
const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
    throw new Error("DATABASE_URL environment variable is not set");
}

const client = postgres(connectionString, {
    prepare: false,
    ssl: {
        rejectUnauthorized: false
    }
});
const db = drizzle(client);

const RATE_LIMIT = {
    maxSubmissions: 5,
    timeWindowMs: 24 * 60 * 60 * 1000, // 24 hours
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        const ip = (req.headers["x-forwarded-for"] as string) || req.socket.remoteAddress || "unknown";

        // Rate limiting: Check submissions from this IP in the last 24 hours
        const oneDayAgo = new Date(Date.now() - RATE_LIMIT.timeWindowMs);

        const [result] = await db
            .select({ count: sql<number>`count(*)` })
            .from(contactMessages)
            .where(
                and(
                    eq(contactMessages.ipAddress, ip),
                    gt(contactMessages.createdAt, oneDayAgo)
                )
            );

        if (Number(result.count) >= RATE_LIMIT.maxSubmissions) {
            return res.status(429).json({
                error: "Too many submissions. Please try again later."
            });
        }

        const parsed = insertContactMessageSchema.parse(req.body);

        const [message] = await db.insert(contactMessages).values({
            ...parsed,
            ipAddress: ip,
        }).returning();

        res.json({ success: true, message });
    } catch (error) {
        console.error("Contact form error:", error);
        res.status(400).json({ error: "Failed to submit contact form" });
    }
}
