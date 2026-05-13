"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

const stats = [
  {
    value: "17 hours",
    label: "Average time a driver spends searching for parking each year",
  },
  {
    value: "$345",
    label: "Average annual cost in lost time, fuel, and emissions",
  },
  {
    value: "86%",
    label: "of drivers we surveyed circle the block or park blocks away",
  },
];

export function Problem() {
  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="text-sm font-semibold uppercase tracking-wider text-coral">
            The problem
          </p>
          <h2 className="mt-3 text-4xl font-bold tracking-tight text-navy sm:text-5xl">
            Parking is broken.
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Every day, drivers waste time and money hunting for a spot — while
            empty driveways sit a block away.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.value}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Card className="h-full transition-shadow hover:shadow-md">
                <CardContent className="flex h-full flex-col p-8">
                  <div className="text-5xl font-extrabold tracking-tight text-coral sm:text-6xl">
                    {stat.value}
                  </div>
                  <p className="mt-4 text-base leading-relaxed text-slate-600">
                    {stat.label}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
