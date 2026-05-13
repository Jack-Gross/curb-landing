"use client";

import { motion } from "framer-motion";
import { Search, CalendarCheck, Car } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Search",
    body: "Drop a pin near where you're going, see nearby driveways.",
  },
  {
    number: "02",
    icon: CalendarCheck,
    title: "Book",
    body: "Pick a spot, set your time window, pay in the app.",
  },
  {
    number: "03",
    icon: Car,
    title: "Park",
    body: "Pull in, the spot is yours for the full window.",
  },
];

export function HowItWorks() {
  return (
    <section id="how" className="bg-slate-50 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="text-sm font-semibold uppercase tracking-wider text-coral">
            For drivers
          </p>
          <h2 className="mt-3 text-4xl font-bold tracking-tight text-navy sm:text-5xl">
            How it works
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            From search to parked in under a minute.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative flex flex-col items-start"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-navy text-white shadow-sm">
                    <Icon className="h-6 w-6" />
                  </div>
                  <span className="text-sm font-bold tracking-wider text-coral">
                    {step.number}
                  </span>
                </div>
                <h3 className="mt-5 text-2xl font-bold text-navy">
                  {step.title}
                </h3>
                <p className="mt-2 text-base leading-relaxed text-slate-600">
                  {step.body}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
