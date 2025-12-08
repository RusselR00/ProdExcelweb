import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
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
        const { db } = await import("./server/db");
        const { sql } = await import("drizzle-orm");

        console.log("Testing database connection...");
        const result = await db.execute(sql`SELECT 1`);
        console.log("Connection successful:", result);
        process.exit(0);
    } catch (error) {
        console.error("Connection failed:", error);
        process.exit(1);
    }
}

main();
