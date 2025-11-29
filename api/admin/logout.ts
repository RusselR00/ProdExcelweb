import type { VercelRequest, VercelResponse } from "@vercel/node";
import { serialize } from "cookie";

export default function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const cookie = serialize("admin_token", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 0,
        path: "/",
    });

    res.setHeader("Set-Cookie", cookie);
    res.json({ success: true });
}
