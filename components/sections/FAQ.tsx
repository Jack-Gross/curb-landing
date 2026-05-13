"use client";

import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "Is this legal?",
    a: "Yes. Hosts list their own private property — their driveway. We provide guidance on local regulations (HOA, zoning, business-license thresholds) when you sign up, and we keep that guidance current as we expand to new cities.",
  },
  {
    q: "What if a driver overstays?",
    a: "Every booking has a fixed time window. We send automated alerts to the driver as their window ends, charge for overage time automatically, and let hosts flag overstays in one tap. Repeat offenders are removed from the platform.",
  },
  {
    q: "Is my car safe?",
    a: "All drivers complete ID verification before their first booking, and every booking carries two-sided ratings. We're finalizing an insurance partnership to cover damage and theft during a booking window — details at launch.",
  },
  {
    q: "When does CURB launch?",
    a: "Beta is launching in San Luis Obispo, Summer 2026. Drop your email below and we'll send you an invite the day we go live.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <p className="text-sm font-semibold uppercase tracking-wider text-coral">
            FAQ
          </p>
          <h2 className="mt-3 text-4xl font-bold tracking-tight text-navy sm:text-5xl">
            Questions, answered.
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="mt-10"
        >
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((f, i) => (
              <AccordionItem key={f.q} value={`item-${i}`}>
                <AccordionTrigger>{f.q}</AccordionTrigger>
                <AccordionContent>{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
