import type { VercelRequest, VercelResponse } from "@vercel/node";
import { serialize } from "cookie";
import jwt from "jsonwebtoken";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "excelessel2025";

function signToken(): string {
    const secret = process.env.SUPABASE_JWT_SECRET || "fallback-secret";
    return jwt.sign({ role: "admin" }, secret, { expiresIn: "24h" });
}

export default function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const { password } = req.body;

    if (password === ADMIN_PASSWORD) {
        const token = signToken();

        const cookie = serialize("admin_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 60 * 60 * 24, // 1 day
            path: "/",
        });

        res.setHeader("Set-Cookie", cookie);
        res.json({ success: true });
    } else {
        res.status(401).json({ error: "Invalid password" });
    }
}
