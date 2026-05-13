"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-slate-200 bg-white/85 backdrop-blur-md"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <a href="#top" className="flex items-center gap-2">
          <span className="text-xl font-extrabold tracking-tight text-navy">
            CURB
          </span>
          <span className="hidden h-2 w-2 rounded-full bg-coral sm:block" />
        </a>
        <nav className="hidden items-center gap-8 text-sm font-medium text-slate-600 md:flex">
          <a href="#how" className="transition-colors hover:text-navy">
            How it works
          </a>
          <a href="#hosts" className="transition-colors hover:text-navy">
            For hosts
          </a>
          <a href="#faq" className="transition-colors hover:text-navy">
            FAQ
          </a>
        </nav>
        <a
          href="#signup"
          className="inline-flex h-10 items-center justify-center rounded-lg bg-navy px-4 text-sm font-semibold text-white transition-all hover:bg-navy-700"
        >
          Get early access
        </a>
      </div>
    </header>
  );
}
