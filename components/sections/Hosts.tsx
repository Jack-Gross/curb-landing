"use client";

import { motion } from "framer-motion";
import { Check, Clock, DollarSign, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";

const benefits = [
  {
    icon: Clock,
    title: "List in under 5 minutes",
    body: "Add a few photos, set your hours, and you're live.",
  },
  {
    icon: DollarSign,
    title: "You keep 100% of your listed rate",
    body: "CURB charges drivers a small service fee — you get your full asking price.",
  },
  {
    icon: Wallet,
    title: "Earnings hit your bank weekly",
    body: "Automatic payouts every Friday. No invoicing, no chasing.",
  },
];

export function Hosts() {
  return (
    <section id="hosts" className="bg-navy py-20 text-white sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55 }}
          >
            <p className="text-sm font-semibold uppercase tracking-wider text-coral">
              For homeowners
            </p>
            <h2 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
              Your driveway is sitting empty.{" "}
              <span className="text-coral">Turn it into income.</span>
            </h2>
            <p className="mt-5 text-lg text-slate-300">
              The average CURB host in a high-demand area is on track to earn
              $200–$600 a month — for doing nothing.
            </p>
            <div className="mt-8">
              <Button asChild size="lg">
                <a href="#signup">List your driveway</a>
              </Button>
            </div>
          </motion.div>

          <motion.ul
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="space-y-5"
          >
            {benefits.map((b) => {
              const Icon = b.icon;
              return (
                <li
                  key={b.title}
                  className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-sm"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-coral text-white">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="flex items-center gap-2 text-lg font-semibold">
                      <Check className="h-4 w-4 text-coral" />
                      {b.title}
                    </p>
                    <p className="mt-1 text-slate-300">{b.body}</p>
                  </div>
                </li>
              );
            })}
          </motion.ul>
        </div>
      </div>
    </section>
  );
}
