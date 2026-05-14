import { NextResponse } from "next/server";
import { sql, ensureSchema } from "@/lib/db";
import { Resend } from "resend";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const EMAIL_RE = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

function getClientIp(headers: Headers): string | null {
  const fwd = headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0]!.trim();
  return headers.get("x-real-ip");
}

function formatPacific(d: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Los_Angeles",
    dateStyle: "full",
    timeStyle: "short",
  }).format(d);
}

function buildEmailHtml(opts: {
  email: string;
  role: "driver" | "host";
  total: number;
  drivers: number;
  hosts: number;
  when: Date;
}): string {
  const { email, role, total, drivers, hosts, when } = opts;
  const roleColor = role === "driver" ? "#F97316" : "#0F172A";
  const roleLabel = role === "driver" ? "Driver" : "Host";
  return `<!doctype html>
<html>
<body style="margin:0;padding:0;background:#F1F5F9;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Inter,Roboto,Arial,sans-serif;color:#0F172A;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="padding:32px 16px;">
    <tr><td align="center">
      <table role="presentation" width="560" cellspacing="0" cellpadding="0" border="0" style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 1px 3px rgba(15,23,42,0.08);">
        <tr><td style="background:#0F172A;padding:24px 32px;color:#ffffff;">
          <div style="font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#FB923C;font-weight:600;">CURB</div>
          <div style="margin-top:6px;font-size:20px;font-weight:700;">New signup</div>
        </td></tr>
        <tr><td style="padding:28px 32px;">
          <div style="display:inline-block;background:${roleColor};color:#ffffff;padding:6px 12px;border-radius:999px;font-size:12px;font-weight:700;letter-spacing:0.5px;text-transform:uppercase;">${roleLabel}</div>
          <div style="margin-top:18px;font-size:18px;font-weight:600;color:#0F172A;">${email}</div>
          <div style="margin-top:6px;font-size:14px;color:#475569;">${formatPacific(when)} (Pacific)</div>
        </td></tr>
        <tr><td style="padding:0 32px 28px 32px;">
          <div style="border-top:1px solid #E2E8F0;padding-top:18px;font-size:14px;color:#475569;">
            <strong style="color:#0F172A;">Total signups: ${total}</strong>
            &nbsp;·&nbsp; ${drivers} driver${drivers === 1 ? "" : "s"}
            &nbsp;·&nbsp; ${hosts} host${hosts === 1 ? "" : "s"}
          </div>
        </td></tr>
      </table>
      <div style="margin-top:16px;font-size:12px;color:#94A3B8;">CURB · trycurb@gmail.com</div>
    </td></tr>
  </table>
</body>
</html>`;
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid request body" },
      { status: 400 }
    );
  }

  const { email: rawEmail, role } = (body ?? {}) as {
    email?: unknown;
    role?: unknown;
  };

  const email =
    typeof rawEmail === "string" ? rawEmail.trim().toLowerCase() : "";
  if (!email || email.length > 254 || !EMAIL_RE.test(email)) {
    return NextResponse.json(
      { success: false, error: "Please enter a valid email." },
      { status: 400 }
    );
  }
  if (role !== "driver" && role !== "host") {
    return NextResponse.json(
      { success: false, error: "Invalid role." },
      { status: 400 }
    );
  }

  const ip = getClientIp(request.headers);
  const ua = request.headers.get("user-agent");

  try {
    await ensureSchema();

    const inserted = await sql<{ id: number }>`
      INSERT INTO signups (email, role, ip_address, user_agent)
      VALUES (${email}, ${role}, ${ip}, ${ua})
      ON CONFLICT (email, role) DO NOTHING
      RETURNING id
    `;

    if (inserted.rowCount && inserted.rowCount > 0) {
      const apiKey = process.env.RESEND_API_KEY;
      const to = process.env.NOTIFICATION_EMAIL;
      if (apiKey && to) {
        try {
          const totals = await sql<{
            total: string;
            drivers: string;
            hosts: string;
          }>`
            SELECT
              COUNT(*)::text AS total,
              COUNT(*) FILTER (WHERE role = 'driver')::text AS drivers,
              COUNT(*) FILTER (WHERE role = 'host')::text AS hosts
            FROM signups
          `;
          const t = totals.rows[0]!;
          const total = Number(t.total);
          const drivers = Number(t.drivers);
          const hosts = Number(t.hosts);
          const when = new Date();
          const resend = new Resend(apiKey);
          await resend.emails.send({
            from: "CURB <onboarding@resend.dev>",
            to,
            subject: `🚗 New CURB signup: ${role} - ${email}`,
            html: buildEmailHtml({ email, role, total, drivers, hosts, when }),
          });
        } catch (mailErr) {
          console.error("[signup] notification email failed:", mailErr);
        }
      }
    }

    return NextResponse.json({
      success: true,
      message: "You're on the list!",
    });
  } catch (err) {
    console.error("[signup] insert failed:", err);
    return NextResponse.json(
      { success: false, error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
