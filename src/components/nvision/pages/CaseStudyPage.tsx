"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ArrowLeft, ChevronRight } from "lucide-react";
import { useRouter } from "../router";
import { PROJECTS, VIDEO_PROJECTS, type Project, type VideoProject } from "@/lib/nvision/data";
import SplitText from "../shared/SplitText";
import ScrollReveal from "../shared/ScrollReveal";
import TiltCard from "../shared/TiltCard";

type AnyProject = Project | VideoProject;

function isVideo(p: AnyProject): p is VideoProject {
  return (p as VideoProject).duration !== undefined || (p as VideoProject).brief !== undefined;
}

export default function CaseStudyPage() {
  const { caseStudySlug, navigate } = useRouter();

  // Search both PROJECTS and VIDEO_PROJECTS
  const webProject = PROJECTS.find((p) => p.slug === caseStudySlug);
  const videoProject = VIDEO_PROJECTS.find((p) => p.slug === caseStudySlug);
  const project: AnyProject = webProject || videoProject || PROJECTS[0];
  const isVideoProject = !webProject && !!videoProject;

  // Build a combined "next project" list
  const allSlugs = [...PROJECTS.map((p) => p.slug), ...VIDEO_PROJECTS.map((p) => p.slug)];
  const currentSlug = project.slug;
  const currentIdx = allSlugs.indexOf(currentSlug);
  const nextSlug = allSlugs[(currentIdx + 1) % allSlugs.length];
  const nextProject =
    PROJECTS.find((p) => p.slug === nextSlug) ||
    VIDEO_PROJECTS.find((p) => p.slug === nextSlug) ||
    PROJECTS[0];

  const [beforeAfterPos, setBeforeAfterPos] = useState(50);

  // Common fields
  const title = project.title;
  const category = project.category;
  const year = project.year;
  const cover = project.cover;
  const accent = project.accent;
  const summary = project.summary;
  const overview = project.overview;
  const results = project.results;
  const testimonial = project.testimonial;
  const tags = project.tags;
  const stack = isVideo(project) ? project.gear : (project as Project).stack;
  const challengeText = isVideo(project) ? (project as VideoProject).brief : (project as Project).challenge;
  const solutionText = isVideo(project) ? (project as VideoProject).approach : (project as Project).solution;
  const client = project.client;

  return (
    <div className="page-enter pt-32">
      <BackBar />

      {/* Hero */}
      <CaseHero title={title} category={category} year={year} cover={cover} summary={summary} isVideo={isVideoProject} duration={isVideo(project) ? project.duration : undefined} />

      {/* Overview */}
      <section className="relative px-6 lg:px-10 py-20 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-3">
              <ScrollReveal>
                <span className="font-mono-tight text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                  [ 01 ] — Overview
                </span>
              </ScrollReveal>
            </div>
            <div className="lg:col-span-9">
              <SplitText
                text={overview}
                as="p"
                className="font-display text-2xl sm:text-3xl lg:text-4xl font-medium leading-[1.3] tracking-tight"
                stagger={0.02}
              />
            </div>
          </div>

          {/* Meta strip */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-20 pt-12 border-t border-foreground/[0.06]">
            {[
              { label: "Client", value: client },
              { label: "Year", value: year },
              { label: "Category", value: category },
              { label: isVideoProject ? "Duration" : "Engagement", value: isVideoProject ? (isVideo(project) ? project.duration : "") : "12 weeks" },
            ].map((item, i) => (
              <ScrollReveal key={i} delay={i * 0.08}>
                <div className="flex flex-col gap-2">
                  <span className="font-mono-tight text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                    {item.label}
                  </span>
                  <span className="text-lg font-medium">{item.value}</span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Challenge / Solution */}
      <section className="relative px-6 lg:px-10 py-20 lg:py-32 border-y border-foreground/[0.06]">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            <div>
              <ScrollReveal>
                <span className="font-mono-tight text-[10px] uppercase tracking-[0.3em] text-rose-400/80">
                  [ 02 ] — {isVideoProject ? "The brief" : "The challenge"}
                </span>
              </ScrollReveal>
              <ScrollReveal delay={0.1}>
                <p className="mt-6 text-base sm:text-lg text-foreground/70 leading-relaxed">
                  {challengeText}
                </p>
              </ScrollReveal>
            </div>
            <div>
              <ScrollReveal>
                <span className="font-mono-tight text-[10px] uppercase tracking-[0.3em] text-emerald-400/80">
                  [ 03 ] — {isVideoProject ? "Our approach" : "Our solution"}
                </span>
              </ScrollReveal>
              <ScrollReveal delay={0.1}>
                <p className="mt-6 text-base sm:text-lg text-foreground/70 leading-relaxed">
                  {solutionText}
                </p>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Big visual */}
      <section className="relative px-6 lg:px-10 py-20">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal>
            <div
              className="relative w-full aspect-[16/9] rounded-3xl overflow-hidden glass"
              style={{ background: cover }}
            >
              <div className="absolute inset-0 grain" />
              <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-white/10" />
              {/* Floating UI mockup */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                  className="w-3/4 max-w-2xl aspect-[4/3] rounded-2xl glass-strong p-6 shadow-2xl"
                >
                  <div className="flex gap-1.5 mb-6">
                    <span className="w-2.5 h-2.5 rounded-full bg-foreground/20" />
                    <span className="w-2.5 h-2.5 rounded-full bg-foreground/20" />
                    <span className="w-2.5 h-2.5 rounded-full bg-foreground/20" />
                  </div>
                  <div className="space-y-3">
                    <div className="h-3 w-2/3 rounded bg-foreground/20" />
                    <div className="h-2 w-full rounded bg-white/10" />
                    <div className="h-2 w-5/6 rounded bg-white/10" />
                    <div className="h-2 w-4/5 rounded bg-white/10" />
                    <div className="grid grid-cols-3 gap-3 pt-4">
                      <div className="aspect-square rounded-lg bg-white/10" />
                      <div className="aspect-square rounded-lg bg-white/10" />
                      <div className="aspect-square rounded-lg bg-white/10" />
                    </div>
                  </div>
                </motion.div>
              </div>
              <span className="absolute bottom-6 left-6 font-mono-tight text-[10px] uppercase tracking-[0.3em] text-foreground/70">
                {title} — {isVideoProject ? "Footage" : "Product UI"}
              </span>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Before / After slider */}
      <section className="relative px-6 lg:px-10 py-20 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal>
            <span className="font-mono-tight text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
              [ 04 ] — Before / After
            </span>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="mt-4 font-display text-3xl sm:text-5xl font-semibold tracking-tight mb-10">
              The transformation.
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <div className="relative w-full aspect-[16/9] rounded-3xl overflow-hidden glass select-none">
              {/* Before */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(135deg, #2a2a32 0%, #1a1a22 100%)",
                }}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="font-display text-4xl text-muted-foreground/60 mb-2">
                      {title} — Before
                    </div>
                    <div className="font-mono-tight text-xs text-muted-foreground/60 uppercase tracking-widest">
                      Original experience
                    </div>
                  </div>
                </div>
              </div>
              {/* After (clipped) */}
              <div
                className="absolute inset-0 overflow-hidden"
                style={{ width: `${beforeAfterPos}%` }}
              >
                <div
                  className="absolute inset-0"
                  style={{
                    background: cover,
                    width: "100vw",
                  }}
                >
                  <div className="absolute inset-0 grain" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="font-display text-4xl text-white mb-2">
                        {title} — After
                      </div>
                      <div className="font-mono-tight text-xs text-foreground/80 uppercase tracking-widest">
                        Reimagined by NVISION
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Handle */}
              <input
                type="range"
                min="0"
                max="100"
                value={beforeAfterPos}
                onChange={(e) => setBeforeAfterPos(Number(e.target.value))}
                className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize"
                aria-label="Drag to compare"
              />
              <div
                className="absolute top-0 bottom-0 w-0.5 bg-white pointer-events-none"
                style={{ left: `${beforeAfterPos}%` }}
              >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full glass-strong flex items-center justify-center">
                  <div className="flex gap-0.5">
                    <ChevronRight className="w-3 h-3 rotate-180" />
                    <ChevronRight className="w-3 h-3" />
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Results */}
      <section className="relative px-6 lg:px-10 py-20 lg:py-32 border-y border-foreground/[0.06]">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal>
            <span className="font-mono-tight text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
              [ 05 ] — Results
            </span>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="mt-4 font-display text-3xl sm:text-5xl font-semibold tracking-tight mb-12">
              The numbers moved.
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {results.map((r, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <TiltCard max={5} className="rounded-2xl glass p-6 h-full">
                  <div className="flex flex-col gap-2">
                    <span className="font-mono-tight text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight"
                      style={{ color: accent }}
                    >
                      {r.value}
                    </span>
                    <span className="text-sm text-foreground/70">{r.label}</span>
                  </div>
                </TiltCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Tech stack */}
      <section className="relative px-6 lg:px-10 py-20">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal>
            <span className="font-mono-tight text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
              [ 06 ] — Tech stack
            </span>
          </ScrollReveal>
          <div className="mt-6 flex flex-wrap gap-3">
            {stack.map((tech, i) => (
              <ScrollReveal key={tech} delay={i * 0.05}>
                <span className="px-5 py-2.5 rounded-full glass text-sm font-medium hover:bg-foreground/10 transition-colors cursor-default">
                  {tech}
                </span>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="relative px-6 lg:px-10 py-20 lg:py-32">
        <div className="mx-auto max-w-5xl">
          <ScrollReveal>
            <div className="relative rounded-3xl glass-strong p-10 lg:p-16 overflow-hidden">
              <div
                className="absolute -top-20 -left-20 w-60 h-60 rounded-full opacity-30 blur-3xl"
                style={{ background: accent }}
              />
              <span className="relative font-display text-6xl text-aurora-static leading-none">
                "
              </span>
              <p className="relative font-display text-xl sm:text-2xl lg:text-3xl font-medium leading-snug tracking-tight mt-4">
                {testimonial.quote}
              </p>
              <div className="relative mt-8 flex items-center gap-4">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center font-display font-semibold text-lg"
                  style={{ background: accent, color: "#05050a" }}
                >
                  {testimonial.author.charAt(0)}
                </div>
                <div>
                  <div className="font-medium text-white">
                    {testimonial.author}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Next project */}
      <section className="relative px-6 lg:px-10 py-20 border-t border-foreground/[0.06]">
        <button
          onClick={() => navigate("case-study", { caseStudySlug: nextProject.slug })}
          className="group block w-full"
          data-cursor-label="Next case"
        >
          <div className="mx-auto max-w-7xl">
            <span className="font-mono-tight text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
              Next project
            </span>
            <div className="mt-4 flex items-end justify-between gap-6">
              <h3 className="font-display text-4xl sm:text-6xl lg:text-8xl font-semibold tracking-tight transition-transform duration-500 group-hover:translate-x-3">
                {nextProject.title}
              </h3>
              <ArrowUpRight className="w-8 h-8 sm:w-12 sm:h-12 transition-transform duration-500 group-hover:translate-x-2 group-hover:-translate-y-2" />
            </div>
            <p className="mt-4 text-sm text-muted-foreground max-w-md">
              {nextProject.summary}
            </p>
          </div>
        </button>
      </section>
    </div>
  );
}

function BackBar() {
  const { navigate } = useRouter();
  return (
    <div className="px-6 lg:px-10 py-6">
      <div className="mx-auto max-w-7xl">
        <button
          onClick={() => navigate("portfolio")}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
          <span className="link-underline">Back to portfolio</span>
        </button>
      </div>
    </div>
  );
}

function CaseHero({
  title,
  category,
  year,
  cover,
  summary,
  isVideo,
  duration,
}: {
  title: string;
  category: string;
  year: string;
  cover: string;
  summary: string;
  isVideo: boolean;
  duration?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <section
      ref={ref}
      className="relative h-[70vh] overflow-hidden"
    >
      <motion.div
        style={{ y, scale, background: cover }}
        className="absolute inset-0"
      />
      <div className="absolute inset-0 grain" />
      <div className="absolute inset-0" style={{ background: "linear-gradient(to top, var(--background), transparent 60%)" }} />
      <div className="absolute inset-0 flex items-end">
        <div className="mx-auto max-w-7xl w-full px-6 lg:px-10 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="font-mono-tight text-[10px] uppercase tracking-[0.3em] text-foreground/70">
                {category}
              </span>
              <span className="w-1 h-1 rounded-full bg-foreground/40" />
              <span className="font-mono-tight text-[10px] uppercase tracking-[0.3em] text-foreground/70">
                {year}
              </span>
              {isVideo && duration && (
                <>
                  <span className="w-1 h-1 rounded-full bg-foreground/40" />
                  <span className="font-mono-tight text-[10px] uppercase tracking-[0.3em] text-foreground/70">
                    {duration}
                  </span>
                </>
              )}
            </div>
            <h1 className="font-display text-5xl sm:text-7xl lg:text-9xl font-semibold tracking-tight leading-[0.9] text-white">
              {title}
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-foreground/80 max-w-2xl">
              {summary}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
