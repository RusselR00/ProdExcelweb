import type { VercelRequest, VercelResponse } from "@vercel/node";
import { db } from "../../server/db";
import { contactMessages } from "../../shared/schema";
import { desc } from "drizzle-orm";
import { verifyAuth } from "../_lib/auth";

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
