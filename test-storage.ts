import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const envPath = path.resolve(__dirname, ".env");
if (fs.existsSync(envPath)) {
    console.log("Loading .env from", envPath);
    const envConfig = fs.readFileSync(envPath, "utf-8");
    envConfig.split("\n").forEach((line) => {
        const [key, value] = line.split("=");
        if (key && value) {
            const cleanKey = key.trim();
            const cleanValue = value.trim().replace(/^["']|["']$/g, "");
            if (!process.env[cleanKey]) {
                process.env[cleanKey] = cleanValue;
            }
        }
    });
}

async function main() {
    try {
        const { storage } = await import("./server/storage");

        console.log("Testing contact message insertion...");
        const message = {
            name: "Test User",
            email: "test@example.com",
            subject: "Test Subject",
            message: "This is a test message to verify database connectivity.",
            ipAddress: "127.0.0.1"
        };

        const result = await storage.createContactMessage(message);
        console.log("Message created successfully:", result);
        process.exit(0);
    } catch (error) {
        console.error("Failed to create message:", error);
        process.exit(1);
    }
}

main();
