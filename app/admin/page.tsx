import { isAuthenticated } from "@/lib/admin-auth";
import { sql, ensureSchema } from "@/lib/db";
import { loginAction } from "./actions";
import { AdminDashboard, type SignupRecord } from "./AdminDashboard";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export default async function AdminPage({
  searchParams,
}: {
  searchParams?: { error?: string };
}) {
  if (!isAuthenticated()) {
    const hasError = searchParams?.error === "1";
    return (
      <main className="min-h-dvh bg-navy text-white">
        <div className="mx-auto flex min-h-dvh max-w-md flex-col items-center justify-center px-6 py-16">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-coral">
            CURB
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight">
            Admin access
          </h1>
          <p className="mt-2 text-sm text-slate-300">
            Enter the admin password to continue.
          </p>
          <form
            action={loginAction}
            className="mt-8 w-full rounded-2xl border border-white/10 bg-white/5 p-6 shadow-xl"
          >
            <label
              htmlFor="password"
              className="block text-xs font-semibold uppercase tracking-wider text-slate-300"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoFocus
              autoComplete="current-password"
              className="mt-2 block h-12 w-full rounded-lg border border-white/10 bg-navy-800/60 px-4 text-base text-white placeholder:text-slate-500 focus:border-coral focus:outline-none focus:ring-2 focus:ring-coral/50"
            />
            {hasError && (
              <p className="mt-3 text-sm text-red-300">
                Incorrect password. Try again.
              </p>
            )}
            <button
              type="submit"
              className="mt-5 inline-flex h-12 w-full items-center justify-center rounded-lg bg-coral px-5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-coral-600 hover:shadow-md active:scale-[0.98]"
            >
              Sign in
            </button>
          </form>
        </div>
      </main>
    );
  }

  await ensureSchema();
  const rows = await sql<{
    id: number;
    email: string;
    role: "driver" | "host";
    created_at: string;
  }>`
    SELECT id, email, role, created_at
    FROM signups
    ORDER BY created_at DESC
  `;
  const signups: SignupRecord[] = rows.rows.map((r) => ({
    id: r.id,
    email: r.email,
    role: r.role,
    createdAt: new Date(r.created_at).toISOString(),
  }));

  return <AdminDashboard signups={signups} />;
}
