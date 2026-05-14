import { config } from "dotenv";
import path from "path";

config({ path: path.join(process.cwd(), ".env.local") });
config({ path: path.join(process.cwd(), ".env") });

async function main() {
  if (!process.env.POSTGRES_URL) {
    console.error(
      "POSTGRES_URL is not set. Set it in .env.local or pull via `vercel env pull .env.local`."
    );
    process.exit(1);
  }
  const { ensureSchema } = await import("../lib/db");
  await ensureSchema();
  console.log("✓ Migration complete: signups table + index ready.");
}

main().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
