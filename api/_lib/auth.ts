import jwt from "jsonwebtoken";
import { parse } from "cookie";
import type { VercelRequest, VercelResponse } from "@vercel/node";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";
const JWT_SECRET = process.env.JWT_SECRET || "super-secret-jwt-key-change-this";

export function verifyAuth(req: VercelRequest, res: VercelResponse): boolean {
    const cookies = parse(req.headers.cookie || "");
    const token = cookies.admin_token;

    if (!token) {
        res.status(401).json({ error: "Unauthorized" });
        return false;
    }

    try {
        jwt.verify(token, JWT_SECRET);
        return true;
    } catch (error) {
        res.status(401).json({ error: "Invalid token" });
        return false;
    }
}

export function signToken(): string {
    return jwt.sign({ role: "admin" }, JWT_SECRET, { expiresIn: "24h" });
}

export { ADMIN_PASSWORD };
