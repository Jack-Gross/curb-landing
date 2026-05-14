import { NextResponse } from "next/server";
import { ensureSchema, sql } from "@/lib/db";
import { timingSafeEqual } from "crypto";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function authorized(req: Request): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;
  const header = req.headers.get("authorization") ?? "";
  const token = header.toLowerCase().startsWith("bearer ")
    ? header.slice(7).trim()
    : "";
  if (!token) return false;
  const a = Buffer.from(token);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export async function POST(req: Request) {
  if (!authorized(req)) {
    return NextResponse.json(
      { success: false, error: "Unauthorized" },
      { status: 401 }
    );
  }
  try {
    await ensureSchema();
    const c = await sql<{ count: string }>`SELECT COUNT(*)::text AS count FROM signups`;
    return NextResponse.json({
      success: true,
      message: "Schema ensured.",
      currentSignupCount: Number(c.rows[0]?.count ?? 0),
    });
  } catch (err) {
    console.error("[migrate] failed:", err);
    return NextResponse.json(
      {
        success: false,
        error: err instanceof Error ? err.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
