import { Instagram, Linkedin } from "lucide-react";

function XIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M18.244 2H21.5l-7.5 8.57L23 22h-6.844l-5.36-7.01L4.5 22H1.244l8.02-9.16L1 2h7.012l4.85 6.42L18.244 2Zm-1.2 18h1.82L7.04 4H5.12l11.924 16Z" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white py-12">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xl font-extrabold tracking-tight text-navy">
              CURB
            </span>
            <span className="h-2 w-2 rounded-full bg-coral" />
          </div>
          <p className="mt-2 text-sm text-slate-500">
            CURB — San Luis Obispo, CA
          </p>
          <p className="mt-1 text-sm text-slate-400">Built by Jack Gross</p>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="#"
            aria-label="Instagram"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-600 transition-colors hover:border-coral hover:text-coral"
          >
            <Instagram className="h-4 w-4" />
          </a>
          <a
            href="#"
            aria-label="LinkedIn"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-600 transition-colors hover:border-coral hover:text-coral"
          >
            <Linkedin className="h-4 w-4" />
          </a>
          <a
            href="#"
            aria-label="X (Twitter)"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-600 transition-colors hover:border-coral hover:text-coral"
          >
            <XIcon className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
      <div className="mx-auto mt-8 max-w-6xl px-6">
        <p className="text-xs text-slate-400">
          © {new Date().getFullYear()} CURB. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
