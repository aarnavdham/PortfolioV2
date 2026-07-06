"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, Code2, Film } from "lucide-react";
import { useRouter } from "../router";
import { PROCESS_STEPS } from "@/lib/nvision/data";
import SplitText from "../shared/SplitText";
import ScrollReveal from "../shared/ScrollReveal";
import AnimatedReveal from "../shared/AnimatedReveal";
import CodeTypewriter from "../CodeTypewriter";
import VideoTimelineTypewriter from "../VideoTimelineTypewriter";
import { useSound } from "../SoundProvider";

export default function ProcessPage() {
  const { navigate } = useRouter();
  const { play } = useSound();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div className="page-enter pt-32">
      {/* Hero */}
      <section className="relative px-5 lg:px-10 py-12 lg:py-16">
        <div className="mx-auto max-w-7xl">
          <AnimatedReveal delay={0.1} variant="fade-up">
            <span className="font-mono-tight text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
              [ Index 05 / Process ]
            </span>
          </AnimatedReveal>
          <div className="mt-4 grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
            <div className="lg:col-span-9">
              <SplitText
                text="How it gets made."
                as="h1"
                className="font-display text-5xl sm:text-7xl lg:text-9xl font-semibold tracking-tight leading-[0.9]"
                stagger={0.05}
              />
              <SplitText
                text="Code &amp; camera, side by side."
                as="p"
                className="mt-2 font-display text-2xl sm:text-4xl text-aurora-static italic font-light"
                delay={0.3}
                stagger={0.04}
              />
            </div>
            <div className="lg:col-span-3">
              <ScrollReveal delay={0.2}>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Two crafts, one studio. Watch a website get typed and a film
                  get cut — then see the six phases that govern both.
                </p>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Code typed live (websites) */}
      <section className="relative px-5 lg:px-10 py-12 lg:py-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-5">
            <div className="lg:col-span-7 flex items-end gap-3">
              <ScrollReveal>
                <span className="font-mono-tight text-[10px] uppercase tracking-[0.3em] text-muted-foreground block mb-2">
                  [ 01 ] — Building a website
                </span>
                <div className="flex items-center gap-3">
                  <Code2 className="w-7 h-7 text-cyan-400" />
                  <h2 className="font-display text-3xl sm:text-5xl font-semibold tracking-tight leading-tight">
                    Code, typed live.
                  </h2>
                </div>
              </ScrollReveal>
            </div>
            <div className="lg:col-span-5 flex items-end">
              <ScrollReveal delay={0.2}>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Every site we ship starts in a text editor. Switch between
                  HTML, CSS, and JS — watch it type character by character,
                  then render in the live preview. This is the exact workflow
                  our engineers use, just slowed down so you can see it.
                </p>
              </ScrollReveal>
            </div>
          </div>

          <ScrollReveal delay={0.1}>
            <CodeTypewriter />
          </ScrollReveal>
        </div>
      </section>

      {/* Video timeline (films) */}
      <section className="relative px-5 lg:px-10 py-12 lg:py-16 border-t" style={{ borderColor: "color-mix(in oklch, var(--foreground) 6%, transparent)" }}>
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-5">
            <div className="lg:col-span-7 flex items-end gap-3">
              <ScrollReveal>
                <span className="font-mono-tight text-[10px] uppercase tracking-[0.3em] text-muted-foreground block mb-2">
                  [ 02 ] — Cutting a film
                </span>
                <div className="flex items-center gap-3">
                  <Film className="w-7 h-7 text-cyan-400" />
                  <h2 className="font-display text-3xl sm:text-5xl font-semibold tracking-tight leading-tight">
                    Footage, cut frame by frame.
                  </h2>
                </div>
              </ScrollReveal>
            </div>
            <div className="lg:col-span-5 flex items-end">
              <ScrollReveal delay={0.2}>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Every film we deliver starts on a timeline. Switch between
                  Edit, Color, and Sound — watch clips assemble, the playhead
                  scrub, waveforms build. Same workflow our editors use in
                  DaVinci Resolve, recreated in your browser.
                </p>
              </ScrollReveal>
            </div>
          </div>

          <ScrollReveal delay={0.1}>
            <VideoTimelineTypewriter />
          </ScrollReveal>
        </div>
      </section>

      {/* Six-phase timeline */}
      <section ref={containerRef} className="relative px-5 lg:px-10 py-16 lg:py-24 border-t" style={{ borderColor: "color-mix(in oklch, var(--foreground) 6%, transparent)" }}>
        <div className="mx-auto max-w-7xl">
          <div className="mb-10">
            <ScrollReveal>
              <span className="font-mono-tight text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                [ 03 ] — Six phases
              </span>
            </ScrollReveal>
            <SplitText
              text="Same process. Both crafts."
              as="h2"
              className="mt-2 font-display text-3xl sm:text-5xl lg:text-6xl font-semibold tracking-tight leading-[0.95]"
              delay={0.1}
              stagger={0.04}
            />
          </div>

          {/* Sticky progress line */}
          <div className="absolute left-6 lg:left-1/2 top-32 bottom-0 w-px -translate-x-1/2 hidden sm:block" style={{ background: "color-mix(in oklch, var(--foreground) 8%, transparent)" }}>
            <motion.div style={{ height: lineHeight }} className="w-full">
              <div
                className="w-full h-full"
                style={{
                  background: "linear-gradient(180deg, #22D3EE 0%, #3B82F6 50%, #2DD4BF 100%)",
                }}
              />
            </motion.div>
          </div>

          <div className="flex flex-col gap-16 lg:gap-20">
            {PROCESS_STEPS.map((step, i) => (
              <ProcessStepRow key={step.index} step={step} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-5 lg:px-10 py-16 lg:py-24 border-t" style={{ borderColor: "color-mix(in oklch, var(--foreground) 6%, transparent)" }}>
        <div className="mx-auto max-w-5xl text-center">
          <SplitText
            text="Ready to start?"
            as="h2"
            className="font-display text-3xl sm:text-5xl lg:text-6xl font-semibold tracking-tight"
            stagger={0.05}
          />
          <p className="mt-4 text-base text-muted-foreground max-w-xl mx-auto">
            A website, a film, or both. The first conversation is free, always
            honest.
          </p>
          <button
            onClick={() => {
              play("transition");
              navigate("contact");
            }}
            className="mt-6 inline-flex items-center gap-3 px-7 py-4 rounded-full bg-foreground text-background text-sm font-medium hover:opacity-90 transition-all group"
            data-cursor-label="Let's go"
          >
            <span>Start a project</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>
      </section>
    </div>
  );
}

function ProcessStepRow({
  step,
  index,
}: {
  step: (typeof PROCESS_STEPS)[0];
  index: number;
}) {
  const isLeft = index % 2 === 0;
  return (
    <div
      className={`relative grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-12 items-center ${
        isLeft ? "" : "sm:[direction:rtl]"
      }`}
    >
      {/* Dot */}
      <div className="absolute left-6 lg:left-1/2 top-3 -translate-x-1/2 hidden sm:block z-10">
        <ScrollReveal>
          <span className="block w-3.5 h-3.5 rounded-full bg-cyan-400 shadow-[0_0_16px_rgba(34,211,238,0.7)]" />
        </ScrollReveal>
      </div>

      <div
        className={`pl-12 sm:pl-0 ${
          isLeft ? "sm:pr-12 sm:text-right" : "sm:pl-12 sm:[direction:ltr]"
        }`}
      >
        <ScrollReveal>
          <div className="flex items-baseline gap-2 mb-2 sm:justify-end">
            {isLeft && (
              <>
                <span className="font-mono-tight text-xs text-muted-foreground">
                  {step.duration}
                </span>
                <span className="w-1 h-1 rounded-full bg-muted-foreground/40" />
              </>
            )}
            <span className="font-mono-tight text-xs text-muted-foreground">
              {step.index}
            </span>
            {!isLeft && (
              <>
                <span className="w-1 h-1 rounded-full bg-muted-foreground/40" />
                <span className="font-mono-tight text-xs text-muted-foreground">
                  {step.duration}
                </span>
              </>
            )}
          </div>
          <h3 className="font-display text-2xl sm:text-4xl font-semibold tracking-tight mb-3">
            {step.title}
          </h3>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            {step.description}
          </p>
        </ScrollReveal>
      </div>

      <div
        className={`pl-12 sm:pl-0 ${
          isLeft ? "sm:pl-12" : "sm:pr-12 sm:[direction:ltr]"
        }`}
      >
        <ScrollReveal delay={0.12}>
          <div className="rounded-2xl glass p-5 lg:p-6">
            <span className="font-mono-tight text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
              Deliverables
            </span>
            <ul className="mt-3 space-y-2">
              {step.deliverables.map((d, idx) => (
                <li
                  key={idx}
                  className="flex items-center gap-3 text-sm text-foreground/75"
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ background: "linear-gradient(90deg, #22D3EE, #2DD4BF)" }}
                  />
                  {d}
                </li>
              ))}
            </ul>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
