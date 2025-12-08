import type { VercelRequest, VercelResponse } from "@vercel/node";
import { db, contactMessages } from "../../../_lib/db-helper";
import { eq } from "drizzle-orm";
import { verifyAuth } from "../../../_lib/auth";

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
