"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import { useRouter } from "../router";
import { TESTIMONIALS } from "@/lib/nvision/data";
import SplitText from "../shared/SplitText";
import ScrollReveal from "../shared/ScrollReveal";
import Marquee from "../shared/Marquee";

export default function TestimonialsPage() {
  const { navigate } = useRouter();
  const [active, setActive] = useState(0);

  // Auto-advance
  useEffect(() => {
    const id = setInterval(() => {
      setActive((a) => (a + 1) % TESTIMONIALS.length);
    }, 7000);
    return () => clearInterval(id);
  }, []);

  const current = TESTIMONIALS[active];

  return (
    <div className="page-enter pt-32">
      {/* Hero */}
      <section className="relative px-6 lg:px-10 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal>
            <span className="font-mono-tight text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
              [ Index 06 / Voices ]
            </span>
          </ScrollReveal>
          <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-9">
              <SplitText
                text="What clients say"
                as="h1"
                className="font-display text-5xl sm:text-7xl lg:text-9xl font-semibold tracking-tight leading-[0.9]"
                stagger={0.05}
              />
              <SplitText
                text="when no one's watching."
                as="h1"
                className="font-display text-5xl sm:text-7xl lg:text-9xl font-semibold tracking-tight leading-[0.9] text-aurora-static italic font-light"
                delay={0.3}
                stagger={0.04}
              />
            </div>
            <div className="lg:col-span-3">
              <ScrollReveal delay={0.2}>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  We don't pay for testimonials. We don't ask for them either.
                  These are the messages that show up in our inbox six months
                  after we ship.
                </p>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Featured testimonial */}
      <section className="relative px-6 lg:px-10 py-20 lg:py-32 border-y border-foreground/[0.06] overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none opacity-40"
          style={{
            background:
              "radial-gradient(circle at 20% 30%, rgba(139,92,246,0.2), transparent 50%), radial-gradient(circle at 80% 70%, rgba(236,72,153,0.18), transparent 50%)",
          }}
        />
        <div className="relative mx-auto max-w-6xl">
          <div className="flex items-center justify-between mb-12">
            <span className="font-mono-tight text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
              [ {String(active + 1).padStart(2, "0")} / {String(TESTIMONIALS.length).padStart(2, "0")} ]
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() =>
                  setActive((a) => (a - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)
                }
                className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-foreground/10 transition-colors"
                aria-label="Previous"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => setActive((a) => (a + 1) % TESTIMONIALS.length)}
                className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-foreground/10 transition-colors"
                aria-label="Next"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col gap-12"
            >
              <Quote className="w-12 h-12 text-aurora-static opacity-60" />
              <p className="font-display text-2xl sm:text-4xl lg:text-5xl font-medium leading-[1.2] tracking-tight">
                {current.quote}
              </p>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center font-display text-xl font-semibold text-[#05050a]">
                  {current.author.charAt(0)}
                </div>
                <div>
                  <div className="font-display text-lg font-semibold">
                    {current.author}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {current.role} · {current.company}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Dots */}
          <div className="mt-16 flex items-center gap-2">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`h-1 rounded-full transition-all duration-500 ${
                  i === active
                    ? "w-12 bg-white"
                    : "w-6 bg-foreground/20 hover:bg-foreground/40"
                }`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Marquee strip of quotes */}
      <section className="py-10">
        <Marquee duration={40} gap="3rem">
          {TESTIMONIALS.map((t, i) => (
            <div
              key={i}
              className="flex items-center gap-6 text-muted-foreground hover:text-foreground/70 transition-colors"
            >
              <span className="font-display text-xl italic">"{t.quote.slice(0, 60)}..."</span>
              <span className="font-mono-tight text-xs uppercase tracking-wider">
                — {t.author}
              </span>
              <span className="text-aurora-static">✦</span>
            </div>
          ))}
        </Marquee>
      </section>

      {/* All testimonials grid */}
      <section className="px-6 lg:px-10 py-20 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal>
            <span className="font-mono-tight text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
              [ 02 ] — All voices
            </span>
          </ScrollReveal>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
            {TESTIMONIALS.map((t, i) => (
              <ScrollReveal key={i} delay={i * 0.05}>
                <button
                  onClick={() => {
                    setActive(i);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="text-left w-full h-full rounded-3xl glass p-8 hover:bg-foreground/[0.07] transition-colors group"
                >
                  <Quote className="w-6 h-6 text-aurora-static opacity-60 mb-4" />
                  <p className="text-sm text-foreground/70 leading-relaxed line-clamp-3 mb-6">
                    {t.quote}
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-xs font-semibold text-[#05050a]">
                      {t.author.charAt(0)}
                    </div>
                    <div>
                      <div className="text-sm font-medium">{t.author}</div>
                      <div className="text-xs text-muted-foreground">
                        {t.role} · {t.company}
                      </div>
                    </div>
                  </div>
                </button>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
