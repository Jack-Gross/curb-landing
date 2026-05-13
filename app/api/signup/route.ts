import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Role = "driver" | "host";
type Signup = {
  email: string;
  role: Role;
  createdAt: string;
};

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "signups.json");
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

async function readSignups(): Promise<Signup[]> {
  try {
    const raw = await fs.readFile(DATA_FILE, "utf8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as Signup[]) : [];
  } catch (err: unknown) {
    if (
      err &&
      typeof err === "object" &&
      "code" in err &&
      (err as { code?: string }).code === "ENOENT"
    ) {
      return [];
    }
    throw err;
  }
}

async function writeSignups(rows: Signup[]) {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(DATA_FILE, JSON.stringify(rows, null, 2) + "\n", "utf8");
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }

  const { email, role } = (body ?? {}) as { email?: unknown; role?: unknown };

  if (typeof email !== "string" || !EMAIL_RE.test(email)) {
    return NextResponse.json(
      { error: "Please enter a valid email." },
      { status: 400 }
    );
  }
  if (role !== "driver" && role !== "host") {
    return NextResponse.json({ error: "Invalid role." }, { status: 400 });
  }

  const rows = await readSignups();
  const exists = rows.find(
    (r) => r.email.toLowerCase() === email.toLowerCase() && r.role === role
  );
  if (!exists) {
    rows.push({
      email: email.trim(),
      role,
      createdAt: new Date().toISOString(),
    });
    await writeSignups(rows);
  }

  return NextResponse.json({ ok: true, alreadySubscribed: !!exists });
}

export async function GET() {
  const rows = await readSignups();
  return NextResponse.json({ count: rows.length });
}
