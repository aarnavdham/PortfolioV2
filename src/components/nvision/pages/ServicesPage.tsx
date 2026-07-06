"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight,
  Code2,
  Film,
  Sparkles,
  Layout,
  Compass,
  Zap,
  Check,
  X,
} from "lucide-react";
import { useRouter } from "../router";
import { SERVICES } from "@/lib/nvision/data";
import SplitText from "../shared/SplitText";
import ScrollReveal from "../shared/ScrollReveal";
import AnimatedReveal from "../shared/AnimatedReveal";
import TiltCard from "../shared/TiltCard";
import { SERVICE_ICONS } from "../shared/icons";
import { useSound } from "../SoundProvider";

const BUDGET_OPTIONS = ["$20k–50k", "$50k–100k", "$100k–250k", "$250k+"];

export default function ServicesPage() {
  const { navigate } = useRouter();
  const { play } = useSound();
  const [selected, setSelected] = useState<string | null>(SERVICES[0].slug);

  const selectedService = SERVICES.find((s) => s.slug === selected) || SERVICES[0];

  return (
    <div className="page-enter pt-32">
      {/* Hero */}
      <section className="relative px-5 lg:px-10 py-12 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <AnimatedReveal delay={0.1} variant="fade-up">
            <span className="font-mono-tight text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
              [ Index 03 / Services ]
            </span>
          </AnimatedReveal>
          <div className="mt-5 grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
            <div className="lg:col-span-9">
              <SplitText
                text="Six things,"
                as="h1"
                className="font-display text-5xl sm:text-7xl lg:text-9xl font-semibold tracking-tight leading-[0.9]"
                stagger={0.05}
              />
              <SplitText
                text="one obsession."
                as="h1"
                className="font-display text-5xl sm:text-7xl lg:text-9xl font-semibold tracking-tight leading-[0.9] text-aurora-static italic font-light"
                delay={0.3}
                stagger={0.05}
              />
            </div>
            <div className="lg:col-span-3">
              <AnimatedReveal delay={0.4} variant="slide-right">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  We're not a full-service agency. We're a studio that does six
                  specific things extremely well, and we say no to everything
                  else.
                </p>
              </AnimatedReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Service grid + detail viewer */}
      <section className="px-5 lg:px-10 py-12 lg:py-16">
        <div className="mx-auto max-w-7xl">
          {/* Grid of 6 services */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-10">
            {SERVICES.map((service, i) => {
              const Icon = SERVICE_ICONS[service.icon] || Code2;
              const isActive = selected === service.slug;
              return (
                <ScrollReveal key={service.slug} delay={i * 0.06}>
                  <button
                    onClick={() => {
                      play("click");
                      setSelected(service.slug);
                    }}
                    onMouseEnter={() => play("hover")}
                    data-cursor-label="View details"
                    className={`group relative w-full h-full rounded-3xl p-6 lg:p-7 text-left transition-all duration-500 overflow-hidden ${
                      isActive ? "glass-strong" : "glass hover:bg-foreground/[0.06]"
                    }`}
                  >
                    {/* Active glow border */}
                    {isActive && (
                      <motion.div
                        layoutId="serviceActive"
                        className="absolute inset-0 rounded-3xl pointer-events-none"
                        style={{
                          background: `linear-gradient(135deg, color-mix(in oklch, var(--aurora-cyan) 8%, transparent), color-mix(in oklch, var(--aurora-blue) 6%, transparent))`,
                          border: "1px solid color-mix(in oklch, var(--aurora-cyan) 40%, transparent)",
                        }}
                      />
                    )}

                    <div className="relative flex flex-col h-full">
                      <div className="flex items-start justify-between mb-6">
                        <span
                          className="w-12 h-12 rounded-2xl flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6"
                          style={{ background: service.gradient }}
                        >
                          <Icon className="w-5 h-5 text-white" />
                        </span>
                        <span className="font-mono-tight text-xs text-muted-foreground">
                          {service.index}
                        </span>
                      </div>
                      <h3 className="font-display text-lg lg:text-xl font-semibold tracking-tight mb-2">
                        {service.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {service.tagline}
                      </p>
                      <div
                        className="mt-4 pt-4 border-t flex items-center justify-between"
                        style={{
                          borderColor:
                            "color-mix(in oklch, var(--foreground) 6%, transparent)",
                        }}
                      >
                        <span className="text-[10px] font-mono-tight uppercase tracking-wider text-muted-foreground">
                          {isActive ? "Selected" : "View details"}
                        </span>
                        <ArrowUpRight
                          className={`w-4 h-4 transition-transform ${
                            isActive
                              ? "translate-x-0.5 -translate-y-0.5"
                              : "text-muted-foreground"
                          }`}
                        />
                      </div>
                    </div>
                  </button>
                </ScrollReveal>
              );
            })}
          </div>

          {/* Detail panel */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedService.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-3xl glass-strong p-7 lg:p-12 overflow-hidden relative"
            >
              {/* Background glow */}
              <div
                className="absolute -top-32 -right-32 w-80 h-80 rounded-full opacity-30 blur-3xl pointer-events-none"
                style={{ background: selectedService.gradient }}
              />

              <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-7 flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <span
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ background: selectedService.gradient }}
                    >
                      {(() => {
                        const Icon = SERVICE_ICONS[selectedService.icon] || Code2;
                        return <Icon className="w-4 h-4 text-white" />;
                      })()}
                    </span>
                    <span className="font-mono-tight text-xs text-muted-foreground uppercase tracking-wider">
                      {selectedService.index} — Service detail
                    </span>
                  </div>
                  <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight leading-tight">
                    {selectedService.title}
                  </h2>
                  <p className="text-base sm:text-lg text-foreground/80 leading-relaxed">
                    {selectedService.description}
                  </p>
                  <p className="text-base text-aurora-static italic font-display">
                    "{selectedService.tagline}"
                  </p>
                </div>
                <div className="lg:col-span-5 lg:col-start-8 flex flex-col gap-3">
                  <span className="font-mono-tight text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                    What you get
                  </span>
                  <ul className="flex flex-col gap-2.5">
                    {selectedService.deliverables.map((d, idx) => (
                      <motion.li
                        key={idx}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 + idx * 0.06 }}
                        className="flex items-start gap-3 text-sm text-foreground/80"
                      >
                        <span
                          className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                          style={{ background: selectedService.gradient }}
                        >
                          <Check className="w-3 h-3 text-white" />
                        </span>
                        <span>{d}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Engagement model */}
      <section className="px-5 lg:px-10 py-16 lg:py-24 border-t" style={{ borderColor: "color-mix(in oklch, var(--foreground) 6%, transparent)" }}>
        <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
            <ScrollReveal>
              <span className="font-mono-tight text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                [ 02 ] — How we engage
              </span>
            </ScrollReveal>
            <SplitText
              text="Three ways to work with us."
              as="h2"
              className="mt-3 font-display text-3xl sm:text-5xl font-semibold tracking-tight leading-[0.95]"
              delay={0.1}
              stagger={0.05}
            />
          </div>
          <div className="lg:col-span-8 flex flex-col gap-3">
            {[
              {
                title: "Full project",
                duration: "8–14 weeks",
                price: "From $80k",
                desc: "End-to-end: discovery, direction, design, build, launch. We take on three to four of these per quarter.",
                features: ["Dedicated team of 3", "Weekly previews", "Launch + 30-day support"],
              },
              {
                title: "Sprint",
                duration: "2–4 weeks",
                price: "From $20k",
                desc: "A focused intervention — a homepage redesign, a brand refresh, a motion system. We ship something real in weeks.",
                features: ["Single deliverable", "Daily check-ins", "Working prototype"],
              },
              {
                title: "Partnership",
                duration: "Ongoing",
                price: "From $15k/mo",
                desc: "A quarterly retainer for brands that treat their site as a living product. We ship new chapters every 90 days.",
                features: ["Quarterly iterations", "Analytics review", "Priority booking"],
              },
            ].map((tier, i) => (
              <ScrollReveal key={i} delay={i * 0.08}>
                <div className="rounded-3xl glass p-7 lg:p-8 flex flex-col lg:flex-row gap-5 lg:items-center justify-between hover:bg-foreground/[0.06] transition-colors">
                  <div className="flex-1">
                    <div className="flex items-baseline gap-3 mb-2">
                      <h3 className="font-display text-2xl font-semibold tracking-tight">
                        {tier.title}
                      </h3>
                      <span className="text-sm text-muted-foreground font-mono-tight">
                        {tier.duration}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed max-w-md mb-3">
                      {tier.desc}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {tier.features.map((f) => (
                        <span
                          key={f}
                          className="px-2.5 py-1 rounded-full text-[10px] font-mono-tight uppercase tracking-wider"
                          style={{
                            background:
                              "color-mix(in oklch, var(--foreground) 6%, transparent)",
                            color: "var(--foreground)",
                          }}
                        >
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-5">
                    <span className="font-display text-2xl font-semibold text-aurora-static">
                      {tier.price}
                    </span>
                    <button
                      onClick={() => {
                        play("transition");
                        navigate("contact");
                      }}
                      className="w-12 h-12 rounded-full bg-foreground text-background flex items-center justify-center hover:scale-105 transition-transform"
                      data-cursor-label="Inquire"
                      aria-label={`Inquire about ${tier.title}`}
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
