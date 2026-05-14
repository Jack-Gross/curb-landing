import { sql } from "@vercel/postgres";

export { sql };

export type SignupRow = {
  id: number;
  email: string;
  role: "driver" | "host";
  created_at: string;
  ip_address: string | null;
  user_agent: string | null;
};

export async function ensureSchema() {
  await sql`
    CREATE TABLE IF NOT EXISTS signups (
      id SERIAL PRIMARY KEY,
      email TEXT NOT NULL,
      role TEXT NOT NULL CHECK (role IN ('driver', 'host')),
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      ip_address TEXT,
      user_agent TEXT,
      UNIQUE (email, role)
    )
  `;
  await sql`CREATE INDEX IF NOT EXISTS signups_created_at_idx ON signups (created_at DESC)`;
}
