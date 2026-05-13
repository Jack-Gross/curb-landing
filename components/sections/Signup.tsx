"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Car, Home, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

type Status = "idle" | "submitting" | "success" | "error";

function SignupCard({
  role,
  title,
  body,
  ctaLabel,
  accent,
  icon: Icon,
}: {
  role: "driver" | "host";
  title: string;
  body: string;
  ctaLabel: string;
  accent: "coral" | "navy";
  icon: typeof Car;
}) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus("submitting");
    setMessage(null);
    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, role }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Something went wrong");
      }
      setStatus("success");
      setMessage("You're on the list. We'll be in touch.");
      setEmail("");
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  const iconBg =
    accent === "coral" ? "bg-coral text-white" : "bg-navy text-white";
  const buttonVariant = accent === "coral" ? "default" : "navy";

  return (
    <Card className="h-full transition-shadow hover:shadow-lg">
      <CardContent className="flex h-full flex-col p-8">
        <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${iconBg}`}>
          <Icon className="h-6 w-6" />
        </div>
        <h3 className="mt-5 text-2xl font-bold text-navy">{title}</h3>
        <p className="mt-2 text-base text-slate-600">{body}</p>

        <form onSubmit={onSubmit} className="mt-6 flex flex-col gap-3">
          <Input
            type="email"
            required
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={status === "submitting" || status === "success"}
            aria-label="Email address"
          />
          <Button
            type="submit"
            variant={buttonVariant as "default" | "navy"}
            size="lg"
            disabled={status === "submitting" || status === "success"}
          >
            {status === "submitting" ? "Saving…" : ctaLabel}
          </Button>
        </form>

        <div className="mt-3 min-h-[1.25rem] text-sm">
          {status === "success" && message && (
            <p className="flex items-center gap-1.5 text-emerald-600">
              <CheckCircle2 className="h-4 w-4" />
              {message}
            </p>
          )}
          {status === "error" && message && (
            <p className="text-red-600">{message}</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export function Signup() {
  return (
    <section
      id="signup"
      className="relative overflow-hidden bg-gradient-to-b from-slate-50 to-white py-20 sm:py-28"
    >
      <div className="mx-auto max-w-5xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="text-sm font-semibold uppercase tracking-wider text-coral">
            Get early access
          </p>
          <h2 className="mt-3 text-4xl font-bold tracking-tight text-navy sm:text-5xl">
            Be first when we launch.
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Pick the side you're on. We'll send the right details, no spam.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
          >
            <SignupCard
              role="driver"
              icon={Car}
              accent="coral"
              title="I want to park"
              body="We'll notify you the moment CURB goes live in your area."
              ctaLabel="Notify me at launch"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <SignupCard
              role="host"
              icon={Home}
              accent="navy"
              title="I want to host"
              body="Get the host onboarding guide and early-access listing slot."
              ctaLabel="Get host details"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
