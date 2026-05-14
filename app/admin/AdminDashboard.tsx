"use client";

import { useMemo, useState } from "react";
import { Download, LogOut, Car, Home as HomeIcon } from "lucide-react";
import { logoutAction } from "./actions";

export type SignupRecord = {
  id: number;
  email: string;
  role: "driver" | "host";
  createdAt: string;
};

type Filter = "all" | "driver" | "host";

const PACIFIC_FMT = new Intl.DateTimeFormat("en-US", {
  timeZone: "America/Los_Angeles",
  month: "long",
  day: "numeric",
  year: "numeric",
  hour: "numeric",
  minute: "2-digit",
  hour12: true,
});

function formatPacific(iso: string): string {
  const d = new Date(iso);
  const parts = PACIFIC_FMT.formatToParts(d);
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  return `${get("month")} ${get("day")}, ${get("year")} at ${get("hour")}:${get(
    "minute"
  )} ${get("dayPeriod")}`;
}

function toCsv(rows: SignupRecord[]): string {
  const esc = (v: string) => {
    if (/[",\n]/.test(v)) return `"${v.replace(/"/g, '""')}"`;
    return v;
  };
  const header = ["timestamp", "email", "role"].join(",");
  const body = rows
    .map((r) => [esc(r.createdAt), esc(r.email), esc(r.role)].join(","))
    .join("\n");
  return `${header}\n${body}\n`;
}

export function AdminDashboard({ signups }: { signups: SignupRecord[] }) {
  const [filter, setFilter] = useState<Filter>("all");

  const stats = useMemo(() => {
    const drivers = signups.filter((s) => s.role === "driver").length;
    const hosts = signups.filter((s) => s.role === "host").length;
    return { total: signups.length, drivers, hosts };
  }, [signups]);

  const mostRecent = signups[0]?.createdAt;

  const filtered = useMemo(() => {
    if (filter === "all") return signups;
    return signups.filter((s) => s.role === filter);
  }, [signups, filter]);

  function downloadCsv() {
    const csv = toCsv(signups);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    const stamp = new Date().toISOString().slice(0, 10);
    a.href = url;
    a.download = `curb-signups-${stamp}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  return (
    <main className="min-h-dvh bg-navy text-white">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
        <header className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-coral">
              CURB · Admin
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              Signups
            </h1>
            {mostRecent && (
              <p className="mt-1 text-sm text-slate-300">
                Most recent: {formatPacific(mostRecent)}
              </p>
            )}
          </div>
          <form action={logoutAction}>
            <button
              type="submit"
              className="inline-flex h-10 items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-4 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </form>
        </header>

        <section className="mt-8 grid gap-4 sm:grid-cols-3">
          <StatCard label="Total" value={stats.total} accent="white" />
          <StatCard label="Drivers" value={stats.drivers} accent="coral" />
          <StatCard label="Hosts" value={stats.hosts} accent="navy-light" />
        </section>

        <section className="mt-8 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-2">
            <FilterButton
              active={filter === "all"}
              onClick={() => setFilter("all")}
            >
              All ({stats.total})
            </FilterButton>
            <FilterButton
              active={filter === "driver"}
              onClick={() => setFilter("driver")}
            >
              <Car className="mr-1.5 h-4 w-4" />
              Drivers ({stats.drivers})
            </FilterButton>
            <FilterButton
              active={filter === "host"}
              onClick={() => setFilter("host")}
            >
              <HomeIcon className="mr-1.5 h-4 w-4" />
              Hosts ({stats.hosts})
            </FilterButton>
          </div>
          <button
            type="button"
            onClick={downloadCsv}
            disabled={signups.length === 0}
            className="inline-flex h-10 items-center gap-2 rounded-lg bg-coral px-4 text-sm font-semibold text-white shadow-sm transition-all hover:bg-coral-600 hover:shadow-md active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Download className="h-4 w-4" />
            Export CSV
          </button>
        </section>

        <section className="mt-6 overflow-hidden rounded-2xl border border-white/10 bg-white/5">
          {filtered.length === 0 ? (
            <div className="px-6 py-16 text-center text-sm text-slate-300">
              No signups yet.
            </div>
          ) : (
            <>
              <div className="hidden sm:block">
                <table className="w-full text-left text-sm">
                  <thead className="bg-white/5 text-xs uppercase tracking-wider text-slate-300">
                    <tr>
                      <th className="px-6 py-3 font-semibold">When</th>
                      <th className="px-6 py-3 font-semibold">Email</th>
                      <th className="px-6 py-3 font-semibold">Role</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10">
                    {filtered.map((s) => (
                      <tr
                        key={s.id}
                        className="transition-colors hover:bg-white/5"
                      >
                        <td className="whitespace-nowrap px-6 py-4 text-slate-200">
                          {formatPacific(s.createdAt)}
                        </td>
                        <td className="px-6 py-4 font-medium text-white">
                          {s.email}
                        </td>
                        <td className="px-6 py-4">
                          <RoleBadge role={s.role} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <ul className="divide-y divide-white/10 sm:hidden">
                {filtered.map((s) => (
                  <li key={s.id} className="px-4 py-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-medium text-white">
                          {s.email}
                        </p>
                        <p className="mt-0.5 text-xs text-slate-300">
                          {formatPacific(s.createdAt)}
                        </p>
                      </div>
                      <RoleBadge role={s.role} />
                    </div>
                  </li>
                ))}
              </ul>
            </>
          )}
        </section>
      </div>
    </main>
  );
}

function StatCard({
  label,
  value,
  accent,
}: {
  label: string;
  value: number;
  accent: "white" | "coral" | "navy-light";
}) {
  const valueColor =
    accent === "coral"
      ? "text-coral"
      : accent === "navy-light"
      ? "text-sky-300"
      : "text-white";
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 px-6 py-5">
      <p className="text-xs font-semibold uppercase tracking-wider text-slate-300">
        {label}
      </p>
      <p className={`mt-2 text-4xl font-bold tracking-tight ${valueColor}`}>
        {value}
      </p>
    </div>
  );
}

function FilterButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        "inline-flex h-9 items-center rounded-full px-4 text-sm font-semibold transition-colors " +
        (active
          ? "bg-coral text-white shadow-sm"
          : "border border-white/15 bg-white/5 text-slate-200 hover:bg-white/10")
      }
    >
      {children}
    </button>
  );
}

function RoleBadge({ role }: { role: "driver" | "host" }) {
  const isDriver = role === "driver";
  return (
    <span
      className={
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold uppercase tracking-wider " +
        (isDriver ? "bg-coral/15 text-coral" : "bg-sky-400/15 text-sky-300")
      }
    >
      {role}
    </span>
  );
}
