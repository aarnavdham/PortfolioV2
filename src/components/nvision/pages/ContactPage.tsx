"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Check, Mail, Clock, Globe } from "lucide-react";
import SplitText from "../shared/SplitText";
import ScrollReveal from "../shared/ScrollReveal";
import AnimatedReveal from "../shared/AnimatedReveal";
import MagneticButton from "../MagneticButton";

const SERVICES_OPTIONS = [
  "Premium Website Development",
  "Cinematic Video Editing",
  "Brand Identity",
  "UI/UX Design",
  "Creative Direction",
  "Motion Graphics",
  "Not sure yet",
];

const BUDGET_OPTIONS = ["$20k–50k", "$50k–100k", "$100k–250k", "$250k+"];

export default function ContactPage() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    services: [] as string[],
    budget: "",
    timeline: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const toggleService = (s: string) => {
    setForm((f) => ({
      ...f,
      services: f.services.includes(s)
        ? f.services.filter((x) => x !== s)
        : [...f.services, s],
    }));
  };

  const next = () => setStep((s) => Math.min(s + 1, 3));
  const prev = () => setStep((s) => Math.max(s - 1, 1));

  const submit = () => {
    setSubmitted(true);
  };

  return (
    <div className="page-enter pt-32">
      {/* Hero */}
      <section className="relative px-6 lg:px-10 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <AnimatedReveal delay={0.1} variant="fade-up">
            <span className="font-mono-tight text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
              [ Index 08 / Contact ]
            </span>
          </AnimatedReveal>
          <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-9">
              <SplitText
                text="Let's make"
                as="h1"
                className="font-display text-5xl sm:text-7xl lg:text-9xl font-semibold tracking-tight leading-[0.9]"
                stagger={0.05}
              />
              <SplitText
                text="something real."
                as="h1"
                className="font-display text-5xl sm:text-7xl lg:text-9xl font-semibold tracking-tight leading-[0.9] text-aurora-static italic font-light"
                delay={0.3}
                stagger={0.05}
              />
            </div>
            <div className="lg:col-span-3">
              <ScrollReveal delay={0.2}>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  We take on three to four new projects each quarter. The first
                  conversation is always free, always honest.
                </p>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Form / sidebar layout */}
      <section className="px-6 lg:px-10 py-12 lg:py-20">
        <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Form */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="rounded-3xl glass p-8 lg:p-12"
                >
                  {/* Progress */}
                  <div className="flex items-center gap-3 mb-12">
                    {[1, 2, 3].map((s) => (
                      <div key={s} className="flex items-center gap-3 flex-1">
                        <span
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-mono-tight transition-all duration-500 ${
                            step >= s
                              ? "bg-foreground text-background"
                              : "bg-white/10 text-muted-foreground"
                          }`}
                        >
                          {step > s ? <Check className="w-3.5 h-3.5" /> : s}
                        </span>
                        {s < 3 && (
                          <div
                            className={`flex-1 h-px transition-all duration-500 ${
                              step > s ? "bg-white" : "bg-white/10"
                            }`}
                          />
                        )}
                      </div>
                    ))}
                  </div>

                  <AnimatePresence mode="wait">
                    {step === 1 && (
                      <motion.div
                        key="step1"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.4 }}
                      >
                        <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight mb-3">
                          Who are you?
                        </h2>
                        <p className="text-sm text-muted-foreground mb-8">
                          Tell us a bit about yourself and your company.
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <Field
                            label="Your name"
                            value={form.name}
                            onChange={(v) => setForm({ ...form, name: v })}
                            placeholder="Jordan Lee"
                          />
                          <Field
                            label="Email"
                            type="email"
                            value={form.email}
                            onChange={(v) => setForm({ ...form, email: v })}
                            placeholder="jordan@company.com"
                          />
                          <Field
                            label="Company"
                            value={form.company}
                            onChange={(v) => setForm({ ...form, company: v })}
                            placeholder="Acme Inc."
                            className="sm:col-span-2"
                          />
                        </div>
                        <div className="mt-10 flex justify-end">
                          <button
                            onClick={next}
                            disabled={!form.name || !form.email}
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-foreground text-background text-sm font-medium disabled:opacity-30 disabled:cursor-not-allowed hover:opacity-90 transition-colors"
                          >
                            Continue
                            <ArrowUpRight className="w-4 h-4" />
                          </button>
                        </div>
                      </motion.div>
                    )}

                    {step === 2 && (
                      <motion.div
                        key="step2"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.4 }}
                      >
                        <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight mb-3">
                          What do you need?
                        </h2>
                        <p className="text-sm text-muted-foreground mb-8">
                          Pick all that apply. You can change this later.
                        </p>
                        <div className="flex flex-wrap gap-2 mb-8">
                          {SERVICES_OPTIONS.map((s) => (
                            <button
                              key={s}
                              onClick={() => toggleService(s)}
                              className={`px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                                form.services.includes(s)
                                  ? "bg-foreground text-background"
                                  : "glass text-foreground/70 hover:text-foreground"
                              }`}
                            >
                              {s}
                            </button>
                          ))}
                        </div>

                        <h3 className="font-display text-lg font-semibold mb-3">
                          Budget range
                        </h3>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-8">
                          {BUDGET_OPTIONS.map((b) => (
                            <button
                              key={b}
                              onClick={() => setForm({ ...form, budget: b })}
                              className={`px-3 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                                form.budget === b
                                  ? "bg-foreground text-background"
                                  : "glass text-foreground/70 hover:text-foreground"
                              }`}
                            >
                              {b}
                            </button>
                          ))}
                        </div>

                        <div className="flex justify-between">
                          <button
                            onClick={prev}
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass text-sm font-medium"
                          >
                            Back
                          </button>
                          <button
                            onClick={next}
                            disabled={form.services.length === 0}
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-foreground text-background text-sm font-medium disabled:opacity-30 disabled:cursor-not-allowed hover:opacity-90 transition-colors"
                          >
                            Continue
                            <ArrowUpRight className="w-4 h-4" />
                          </button>
                        </div>
                      </motion.div>
                    )}

                    {step === 3 && (
                      <motion.div
                        key="step3"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.4 }}
                      >
                        <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight mb-3">
                          Tell us the story.
                        </h2>
                        <p className="text-sm text-muted-foreground mb-8">
                          What are you building? What's keeping you up at night?
                          The more honest, the better.
                        </p>
                        <textarea
                          value={form.message}
                          onChange={(e) =>
                            setForm({ ...form, message: e.target.value })
                          }
                          placeholder="We're launching a new product in Q1 and our current site doesn't match the ambition..."
                          rows={8}
                          className="w-full px-5 py-4 rounded-2xl glass text-sm text-white placeholder-white/40 outline-none focus:bg-white/10 transition-colors resize-none"
                        />
                        <div className="mt-10 flex justify-between">
                          <button
                            onClick={prev}
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass text-sm font-medium"
                          >
                            Back
                          </button>
                          <MagneticButton
                            onClick={submit}
                            className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-foreground text-background text-sm font-medium btn-premium"
                            cursorLabel="Send"
                          >
                            Send
                            <ArrowUpRight className="w-4 h-4" />
                          </MagneticButton>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="rounded-3xl glass-strong p-12 lg:p-20 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      delay: 0.2,
                    }}
                    className="w-20 h-20 rounded-full bg-emerald-400 mx-auto flex items-center justify-center mb-8"
                  >
                    <Check className="w-10 h-10 text-[#05050a]" />
                  </motion.div>
                  <h2 className="font-display text-3xl sm:text-5xl font-semibold tracking-tight mb-4">
                    Message received.
                  </h2>
                  <p className="text-base text-muted-foreground max-w-md mx-auto">
                    Thanks, {form.name || "friend"}. We'll get back to you
                    within 24 hours — usually faster.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="rounded-3xl glass p-8">
              <span className="font-mono-tight text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                Direct lines
              </span>
              <div className="mt-4 flex flex-col gap-4">
                <a
                  href="mailto:hello@nvision.studio"
                  className="flex items-center gap-3 group"
                >
                  <span className="w-10 h-10 rounded-full glass flex items-center justify-center">
                    <Mail className="w-4 h-4" />
                  </span>
                  <div>
                    <div className="text-xs text-muted-foreground">New projects</div>
                    <div className="text-sm font-medium link-underline">
                      hello@nvision.studio
                    </div>
                  </div>
                </a>
                <a
                  href="mailto:press@nvision.studio"
                  className="flex items-center gap-3 group"
                >
                  <span className="w-10 h-10 rounded-full glass flex items-center justify-center">
                    <Mail className="w-4 h-4" />
                  </span>
                  <div>
                    <div className="text-xs text-muted-foreground">Press</div>
                    <div className="text-sm font-medium link-underline">
                      press@nvision.studio
                    </div>
                  </div>
                </a>
              </div>
            </div>

            <div className="rounded-3xl glass p-8">
              <span className="font-mono-tight text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                Working rhythm
              </span>
              <div className="mt-4 flex flex-col gap-3 text-sm text-foreground/70">
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span>09:00 — 19:00 CET, Mon–Fri</span>
                </div>
                <div className="flex items-center gap-3">
                  <Globe className="w-4 h-4 text-muted-foreground" />
                  <span>Remote / Worldwide</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-emerald-400">Open for Q4 2025</span>
                </div>
              </div>
            </div>

            <div className="rounded-3xl glass p-8">
              <span className="font-mono-tight text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                Response time
              </span>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="font-display text-5xl font-semibold tracking-tight text-aurora-static">
                  ~6h
                </span>
                <span className="text-sm text-muted-foreground">avg first reply</span>
              </div>
              <p className="mt-3 text-xs text-muted-foreground leading-relaxed">
                We read every email ourselves. No bots, no autoresponders, no
                funnels.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  className = "",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  className?: string;
}) {
  return (
    <label className={`flex flex-col gap-2 ${className}`}>
      <span className="text-xs text-muted-foreground font-mono-tight uppercase tracking-wider">
        {label}
      </span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="px-5 py-3.5 rounded-xl glass text-sm text-white placeholder-white/40 outline-none focus:bg-white/10 transition-colors"
      />
    </label>
  );
}
