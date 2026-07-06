"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowUpRight, ArrowDown, Code2, Film } from "lucide-react";
import { useRouter } from "../router";
import { SERVICES, PROJECTS, VIDEO_PROJECTS, STATS, CLIENT_LOGOS } from "@/lib/nvision/data";
import SplitText from "../shared/SplitText";
import ScrollReveal from "../shared/ScrollReveal";
import Marquee from "../shared/Marquee";
import TiltCard from "../shared/TiltCard";
import Counter from "../shared/Counter";
import MagneticButton from "../MagneticButton";
import CodeTypewriter from "../CodeTypewriter";
import { SERVICE_ICONS } from "../shared/icons";
import { useSound } from "../SoundProvider";
import { scrollToId } from "../useLenis";
import Parallax from "../shared/Parallax";
import MagneticHover from "../shared/MagneticHover";
import SplitReveal from "../shared/SplitReveal";
import TextScramble from "../shared/TextScramble";
import AnimatedReveal from "../shared/AnimatedReveal";

export default function HomePage() {
  return (
    <div className="page-enter">
      <Hero />
      <DualMarquee />
      <Intro />
      <ServicesPreview />
      <CodePlayground />
      <DualWork />
      <StatsBand />
      <ProcessTeaser />
      <CTA />
    </div>
  );
}

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  const { navigate } = useRouter();
  const { play } = useSound();

  const scrollToNext = () => {
    const next = document.querySelector("#after-hero");
    if (next) {
      next.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      window.scrollBy({ top: window.innerHeight, behavior: "smooth" });
    }
  };

  return (
    <section
      ref={ref}
      className="relative w-full flex flex-col justify-center px-5 lg:px-10 overflow-hidden"
      style={{ minHeight: "100svh", paddingTop: "5rem", paddingBottom: "2rem" }}
    >
      <motion.div style={{ opacity }} className="relative z-10 mx-auto max-w-7xl w-full">
        {/* Index label */}
        <AnimatedReveal delay={0.3} variant="fade-up" className="flex items-center gap-3 mb-5 font-mono-tight text-[11px] uppercase tracking-[0.4em] text-muted-foreground">
          <span className="w-8 h-px bg-current opacity-40" />
          <span>[ Index 01 / Home ]</span>
        </AnimatedReveal>

        {/* Headline */}
        <h1 className="font-display tracking-[-0.04em] leading-[0.95] text-[clamp(2.5rem,8vw,8rem)]">
          <SplitText text="We build" delay={0.5} stagger={0.08} />
          <br />
          <SplitText text="websites & films." delay={0.8} stagger={0.06} className="text-aurora-static italic font-light" />
        </h1>

        {/* Bottom row: left col (paragraph + buttons) | right col (cards) */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-end">
          {/* Left column */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <AnimatedReveal delay={1.1} variant="fade-up" className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-xl">
              NVISION is a creative studio that ships premium websites and
              cinematic films in equal measure. One team, two crafts, no
              handoffs. Whether it's a brand site that wins Awwwards or a
              launch film that lands at festivals — we make it here.
            </AnimatedReveal>
            <AnimatedReveal delay={1.3} variant="fade-up" className="flex flex-wrap items-center gap-3">
              <MagneticButton
                onClick={() => { play("transition"); navigate("portfolio"); }}
                className="group inline-flex items-center gap-3 px-6 py-3.5 rounded-full bg-foreground text-background text-sm font-medium btn-premium"
                cursorLabel="View work"
              >
                <span>See the work</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </MagneticButton>
              <MagneticButton
                onClick={() => { play("transition"); navigate("contact"); }}
                className="inline-flex items-center gap-3 px-6 py-3.5 rounded-full glass text-sm font-medium"
                cursorLabel="Say hello"
              >
                <span>Start a project</span>
              </MagneticButton>
            </AnimatedReveal>
          </div>

          {/* Right column — medium cards */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-3">
            <AnimatedReveal delay={1.4} variant="slide-right">
              <MediumCard icon="code" count="120+" label="sites shipped" />
            </AnimatedReveal>
            <AnimatedReveal delay={1.55} variant="slide-right">
              <MediumCard icon="film" count="85+" label="films delivered" />
            </AnimatedReveal>
          </div>
        </div>
      </motion.div>

      {/* Scroll hint */}
      <AnimatedReveal delay={2} variant="fade" className="absolute bottom-5 left-1/2 -translate-x-1/2">
        <motion.button
          style={{ opacity }}
          onClick={scrollToNext}
          className="flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          aria-label="Scroll to next section"
        >
          <span className="font-mono-tight text-[10px] uppercase tracking-[0.3em]">Scroll</span>
          <ArrowDown className="w-3.5 h-3.5" />
        </motion.button>
      </AnimatedReveal>
    </section>
  );
}

function MediumCard({ icon, count, label }: { icon: "code" | "film"; count: string; label: string }) {
  return (
    <div className="rounded-2xl glass p-4 flex flex-col gap-1 group hover:bg-foreground/[0.08] transition-colors">
      <div className="flex items-center justify-between mb-1">
        {icon === "code" ? <Code2 className="w-4 h-4 text-cyan-400" /> : <Film className="w-4 h-4 text-cyan-400" />}
        <span className="font-mono-tight text-[9px] uppercase tracking-wider text-muted-foreground">{icon === "code" ? "Web" : "Film"}</span>
      </div>
      <span className="font-display text-3xl font-semibold tracking-tight">{count}</span>
      <span className="text-xs text-muted-foreground">{label}</span>
    </div>
  );
}

function DualMarquee() {
  return (
    <section id="after-hero" className="relative py-6 border-y" style={{ borderColor: "color-mix(in oklch, var(--foreground) 6%, transparent)" }}>
      <Marquee duration={35} gap="3rem">
        {["Premium Websites", "Cinematic Films", "Brand Identity", "UI/UX Design", "Creative Direction", "Motion Graphics", "Color Grading", "Sound Design"].map((item, i) => (
          <div key={i} className="flex items-center gap-10 font-display text-xl sm:text-2xl font-medium text-foreground/70">
            <span>{item}</span>
            <span className="text-aurora-static text-lg">✦</span>
          </div>
        ))}
      </Marquee>
    </section>
  );
}

function Intro() {
  return (
    <section className="relative py-20 lg:py-28 px-5 lg:px-10">
      <Parallax speed={0.15} className="relative mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-3">
            <ScrollReveal variant="slide-left"><span className="font-mono-tight text-[10px] uppercase tracking-[0.3em] text-muted-foreground">[ 02 ] — <TextScramble text="Manifesto" /></span></ScrollReveal>
          </div>
          <div className="lg:col-span-9">
            <SplitText
              text="Most studios pick a lane. We didn't. We build websites that win Awwwards and films that screen at festivals — because the best brands need both, and they need them to feel like they came from the same hand."
              as="p"
              className="font-display text-2xl sm:text-3xl lg:text-4xl font-medium leading-[1.2] tracking-tight"
              stagger={0.03}
            />
            <ScrollReveal delay={0.3} variant="fade-up">
              <p className="mt-6 text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl">
                NVISION is a studio of seven. We've shipped 120+ websites and 85+ films across 18 industries — sometimes for the same client in the same quarter. The people who design the site are the same people who grade the film. That's not a cost-saving measure; it's the whole point.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </Parallax>
    </section>
  );
}

function ServicesPreview() {
  const { navigate } = useRouter();
  return (
    <section className="relative py-16 lg:py-24 px-5 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-8">
          <div className="flex flex-col gap-2">
            <ScrollReveal><span className="font-mono-tight text-[10px] uppercase tracking-[0.3em] text-muted-foreground">[ 03 ] — What we do</span></ScrollReveal>
            <SplitText text="Six disciplines. Two crafts." as="h2" className="font-display text-4xl sm:text-6xl lg:text-7xl font-semibold tracking-tight leading-[0.95]" stagger={0.05} />
          </div>
          <ScrollReveal delay={0.2}>
            <button onClick={() => navigate("services")} className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group">
              <span className="link-underline">All services</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </ScrollReveal>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {SERVICES.map((service, i) => {
            const Icon = SERVICE_ICONS[service.icon] || Code2;
            const variant = (["fade-up", "slide-left", "scale"][i % 3]) as any;
            return (
              <ScrollReveal key={service.slug} delay={i * 0.06} variant={variant}>
                <MagneticHover strength={0.15} className="h-full rounded-3xl">
                  <TiltCard max={4} className="h-full rounded-3xl glass p-6 hover:bg-foreground/[0.06] transition-colors duration-500 cursor-pointer">
                    <button onClick={() => navigate("services")} className="text-left w-full h-full flex flex-col" data-cursor-label="Explore">
                      <div className="flex items-start justify-between mb-6">
                        <span className="w-11 h-11 rounded-2xl flex items-center justify-center" style={{ background: service.gradient }}><Icon className="w-5 h-5 text-white" /></span>
                        <span className="font-mono-tight text-xs text-muted-foreground">{service.index}</span>
                      </div>
                      <h3 className="font-display text-lg font-semibold tracking-tight mb-2">{service.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{service.tagline}</p>
                      <div className="mt-auto pt-4 border-t flex items-center justify-between" style={{ borderColor: "color-mix(in oklch, var(--foreground) 6%, transparent)" }}>
                        <span className="text-[10px] text-muted-foreground font-mono-tight uppercase tracking-wider">Learn more</span>
                        <ArrowUpRight className="w-4 h-4 text-muted-foreground" />
                      </div>
                    </button>
                  </TiltCard>
                </MagneticHover>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function CodePlayground() {
  return (
    <section className="relative py-16 lg:py-24 px-5 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-6">
          <div className="lg:col-span-5">
            <ScrollReveal><span className="font-mono-tight text-[10px] uppercase tracking-[0.3em] text-muted-foreground">[ 04 ] — Live build</span></ScrollReveal>
            <SplitText text="Code, typed live." as="h2" className="mt-2 font-display text-3xl sm:text-5xl lg:text-6xl font-semibold tracking-tight leading-[0.95]" delay={0.1} stagger={0.05} />
          </div>
          <div className="lg:col-span-6 lg:col-start-7 flex items-end">
            <ScrollReveal delay={0.2}>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-md">
                Watch the code type itself — HTML, CSS, JS cycling automatically. On the right, a real browser renders a live mini version of the NVISION site, scrolling through pages on its own. Toggle between desktop, tablet, and mobile.
              </p>
            </ScrollReveal>
          </div>
        </div>
        <ScrollReveal delay={0.1}><CodeTypewriter /></ScrollReveal>
      </div>
    </section>
  );
}

function DualWork() {
  const { navigate } = useRouter();
  const [tab, setTab] = useState<"websites" | "films">("websites");
  const webProjects = PROJECTS.filter((p) => p.medium === "website").slice(0, 3);
  const filmProjects = VIDEO_PROJECTS.slice(0, 3);

  return (
    <section className="relative py-16 lg:py-24 px-5 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-8">
          <div className="flex flex-col gap-2">
            <ScrollReveal><span className="font-mono-tight text-[10px] uppercase tracking-[0.3em] text-muted-foreground">[ 05 ] — Selected work</span></ScrollReveal>
            <SplitText text="Recent obsessions." as="h2" className="font-display text-4xl sm:text-6xl lg:text-7xl font-semibold tracking-tight" stagger={0.05} />
          </div>
          <ScrollReveal delay={0.2}>
            <div className="inline-flex items-center gap-1 p-1 rounded-full glass">
              <button onClick={() => setTab("websites")} className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${tab === "websites" ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"}`}>
                <Code2 className="w-3.5 h-3.5" /> Websites
              </button>
              <button onClick={() => setTab("films")} className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${tab === "films" ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"}`}>
                <Film className="w-3.5 h-3.5" /> Films
              </button>
            </div>
          </ScrollReveal>
        </div>
        {tab === "websites" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {webProjects.map((project, i) => (
              <ScrollReveal key={project.slug} delay={i * 0.08} className={i === 0 ? "md:col-span-2" : ""}>
                <button onClick={() => navigate("case-study", { caseStudySlug: project.slug })} data-cursor-label="Open case" className="group relative w-full text-left">
                  <div className={`relative overflow-hidden rounded-3xl glass ${i === 0 ? "aspect-[2/1]" : "aspect-[4/3]"}`}>
                    <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-105" style={{ background: project.cover }} />
                    <div className="absolute inset-0 grain" />
                    <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.7), transparent 60%)" }} />
                    <div className="absolute top-4 right-4 w-11 h-11 rounded-2xl glass-strong flex items-center justify-center"><Code2 className="w-4 h-4 text-white" /></div>
                    <div className="absolute inset-x-0 bottom-0 p-5 lg:p-6">
                      <span className="font-mono-tight text-[10px] uppercase tracking-[0.3em] text-white/70">{project.category} — {project.year}</span>
                      <h3 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight text-white mt-1">{project.title}</h3>
                      <p className="text-sm text-white/70 mt-1 line-clamp-1">{project.summary}</p>
                    </div>
                  </div>
                </button>
              </ScrollReveal>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filmProjects.map((project, i) => (
              <ScrollReveal key={project.slug} delay={i * 0.08} className={i === 0 ? "md:col-span-2" : ""}>
                <button onClick={() => navigate("case-study", { caseStudySlug: project.slug })} data-cursor-label="Open case" className="group relative w-full text-left">
                  <div className={`relative overflow-hidden rounded-3xl glass ${i === 0 ? "aspect-[2/1]" : "aspect-[4/3]"}`}>
                    <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-105" style={{ background: project.cover }} />
                    <div className="absolute inset-0 grain" />
                    <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.7), transparent 60%)" }} />
                    <div className="absolute top-4 right-4 w-11 h-11 rounded-2xl glass-strong flex items-center justify-center"><Film className="w-4 h-4 text-white" /></div>
                    <div className="absolute inset-x-0 bottom-0 p-5 lg:p-6">
                      <span className="font-mono-tight text-[10px] uppercase tracking-[0.3em] text-white/70">{project.category} — {project.year} · {project.duration}</span>
                      <h3 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight text-white mt-1">{project.title}</h3>
                      <p className="text-sm text-white/70 mt-1 line-clamp-1">{project.summary}</p>
                    </div>
                  </div>
                </button>
              </ScrollReveal>
            ))}
          </div>
        )}
        <div className="mt-8 flex justify-center">
          <button onClick={() => navigate("portfolio")} className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group">
            <span className="link-underline">View all projects</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </section>
  );
}

function StatsBand() {
  return (
    <SplitReveal className="relative py-20 px-5 lg:px-10 border-y" >
      <div className="relative mx-auto max-w-7xl">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {STATS.map((stat, i) => {
            const numeric = parseInt(stat.value.replace(/\D/g, ""), 10);
            const suffix = stat.value.replace(/[0-9]/g, "").replace("+", "") || (stat.value.includes("+") ? "+" : "");
            return (
              <ScrollReveal key={i} delay={i * 0.1} className="flex flex-col gap-1">
                <span className="font-mono-tight text-[10px] uppercase tracking-[0.3em] text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
                <div className="font-display text-4xl lg:text-6xl font-semibold tracking-tight text-foreground">
                  {numeric > 0 ? <Counter value={numeric} duration={2.5} suffix={suffix || ""} /> : <span>{stat.value}</span>}
                </div>
                <div className="text-sm text-foreground/80 font-medium">{stat.label}</div>
                <div className="text-xs text-muted-foreground leading-relaxed">{stat.sub}</div>
              </ScrollReveal>
            );
          })}
        </div>
        <div className="mt-12">
          <ScrollReveal><p className="text-center font-mono-tight text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-5">Trusted by teams who care about the details</p></ScrollReveal>
          <Marquee duration={28} gap="3rem">
            {CLIENT_LOGOS.map((logo, i) => (
              <div key={i} className="font-display text-2xl font-semibold tracking-tight text-foreground/30 hover:text-foreground/70 transition-colors duration-500">{logo}</div>
            ))}
          </Marquee>
        </div>
      </div>
    </SplitReveal>
  );
}

function ProcessTeaser() {
  const { navigate } = useRouter();
  return (
    <section className="relative py-16 lg:py-24 px-5 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
          <div className="lg:col-span-5">
            <ScrollReveal><span className="font-mono-tight text-[10px] uppercase tracking-[0.3em] text-muted-foreground">[ 06 ] — How we work</span></ScrollReveal>
            <SplitText text="Two crafts. One studio." as="h2" className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight mt-2 leading-[0.95]" stagger={0.05} />
          </div>
          <div className="lg:col-span-6 lg:col-start-7 flex flex-col gap-3 justify-end">
            <ScrollReveal delay={0.2}><p className="text-base text-muted-foreground leading-relaxed">We build websites and films with the same team, the same standards, the same obsession with craft. See exactly how each one gets made — code typed character by character, footage cut frame by frame.</p></ScrollReveal>
            <ScrollReveal delay={0.3}>
              <button onClick={() => navigate("process")} className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group self-start">
                <span className="link-underline">See the full process</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </ScrollReveal>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ScrollReveal>
            <button onClick={() => navigate("process")} className="group block w-full text-left rounded-3xl glass p-6 lg:p-8 hover:bg-foreground/[0.06] transition-colors" data-cursor-label="How we build">
              <div className="flex items-center gap-3 mb-4"><Code2 className="w-5 h-5 text-cyan-400" /><span className="font-mono-tight text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Building a website</span></div>
              <h3 className="font-display text-2xl font-semibold tracking-tight mb-2">Code, typed live.</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">Watch a homepage get built character by character — HTML, CSS, JS, all in real time.</p>
            </button>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <button onClick={() => navigate("process")} className="group block w-full text-left rounded-3xl glass p-6 lg:p-8 hover:bg-foreground/[0.06] transition-colors" data-cursor-label="How we cut">
              <div className="flex items-center gap-3 mb-4"><Film className="w-5 h-5 text-cyan-400" /><span className="font-mono-tight text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Cutting a film</span></div>
              <h3 className="font-display text-2xl font-semibold tracking-tight mb-2">Footage, cut frame by frame.</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">Watch a timeline assemble — clips, color, sound, all timed to the beat.</p>
            </button>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

function CTA() {
  const { navigate } = useRouter();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.97, 1, 1.02]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.85, 1], [0.5, 1, 1, 0.6]);
  const { play } = useSound();
  return (
    <section ref={ref} className="relative py-16 lg:py-28 px-5 lg:px-10 overflow-hidden">
      <motion.div style={{ scale, opacity }} className="relative mx-auto max-w-6xl rounded-[2rem] overflow-hidden glass-strong p-10 lg:p-16 text-center">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(circle at 30% 20%, color-mix(in oklch, var(--aurora-cyan) 35%, transparent), transparent 50%), radial-gradient(circle at 70% 80%, color-mix(in oklch, var(--aurora-blue) 30%, transparent), transparent 50%)" }} />
        <div className="relative flex flex-col items-center gap-5">
          <span className="font-mono-tight text-[10px] uppercase tracking-[0.3em] text-muted-foreground">[ 07 ] — Let's build</span>
          <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl font-semibold tracking-tight leading-[0.9]">Make something<br /><span className="text-aurora-static italic font-light">unforgettable.</span></h2>
          <p className="text-base text-muted-foreground max-w-xl">A website, a film, or both. We take on a handful of projects each quarter. If you've got something worth obsessing over, we'd love to hear about it.</p>
          <MagneticButton onClick={() => { play("success"); navigate("contact"); }} className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-foreground text-background text-base font-medium btn-premium" cursorLabel="Let's go">
            <span>Start a project</span>
            <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </MagneticButton>
        </div>
      </motion.div>
    </section>
  );
}
