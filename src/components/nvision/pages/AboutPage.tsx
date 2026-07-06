"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useRouter } from "../router";
import { TEAM, VALUES } from "@/lib/nvision/data";
import SplitText from "../shared/SplitText";
import ScrollReveal from "../shared/ScrollReveal";
import TiltCard from "../shared/TiltCard";
import Marquee from "../shared/Marquee";
import AnimatedReveal from "../shared/AnimatedReveal";
import { Compass, Gem, Shield, Target } from "lucide-react";

const ICONS: Record<string, any> = { target: Target, gem: Gem, compass: Compass, shield: Shield };

export default function AboutPage() {
  const { navigate } = useRouter();

  return (
    <div className="page-enter pt-28">
      {/* Hero */}
      <section className="relative px-6 lg:px-10 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <AnimatedReveal delay={0.1} variant="fade-up">
            <span className="font-mono-tight text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
              [ Index 02 / About ]
            </span>
          </AnimatedReveal>
          <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-9">
              <SplitText
                text="We're seven obsessives"
                as="h1"
                className="font-display text-5xl sm:text-7xl lg:text-9xl font-semibold tracking-tight leading-[0.9]"
                stagger={0.05}
              />
              <SplitText
                text="building the unforgettable."
                as="h1"
                className="font-display text-5xl sm:text-7xl lg:text-9xl font-semibold tracking-tight leading-[0.9] text-aurora-static italic font-light mt-2"
                delay={0.3}
                stagger={0.04}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Manifesto */}
      <section className="relative px-6 lg:px-10 py-12 lg:py-20 border-y border-foreground/[0.06]">
        <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-3">
            <ScrollReveal>
              <span className="font-mono-tight text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                [ 01 ] — Manifesto
              </span>
            </ScrollReveal>
          </div>
          <div className="lg:col-span-9">
            <SplitText
              text="Most of the internet is forgettable. We don't think that's an accident — we think it's a choice made by people who stopped caring. We chose differently."
              as="p"
              className="font-display text-2xl sm:text-4xl lg:text-5xl font-medium leading-[1.2] tracking-tight"
              stagger={0.03}
            />
            <ScrollReveal delay={0.3}>
              <div className="mt-12 grid sm:grid-cols-2 gap-8 text-base text-muted-foreground leading-relaxed max-w-3xl">
                <p>
                  NVISION started in 2013 in a small apartment in Lisbon with
                  one founder, one laptop, and one rule: every project had to be
                  better than the last. That rule still holds. We've grown to
                  seven people, shipped 120+ websites and 85+ films, and won more awards than
                  we have wall space for — but the rule hasn't moved.
                </p>
                <p>
                  We don't scale by hiring. We scale by saying no. We take on
                  roughly twelve projects a year, which means we say no to
                  roughly two hundred. The work we do take on gets our full
                  attention for the full duration. You're not hiring an agency.
                  You're hiring a small, opinionated team that has spent over a
                  decade getting very good at one specific thing.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="relative px-6 lg:px-10 py-12 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal>
            <span className="font-mono-tight text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
              [ 02 ] — What we believe
            </span>
          </ScrollReveal>
          <SplitText
            text="Four principles, no exceptions."
            as="h2"
            className="mt-4 font-display text-4xl sm:text-6xl lg:text-7xl font-semibold tracking-tight"
            delay={0.1}
            stagger={0.05}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-16">
            {VALUES.map((value, i) => {
              const Icon = ICONS[value.icon] || Target;
              return (
                <ScrollReveal key={i} delay={i * 0.1}>
                  <TiltCard max={4} className="h-full rounded-3xl glass p-8 lg:p-10">
                    <div className="flex items-start gap-6">
                      <span className="w-12 h-12 rounded-2xl glass-strong flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-aurora-static" />
                      </span>
                      <div>
                        <span className="font-mono-tight text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <h3 className="font-display text-xl font-semibold tracking-tight mt-1">
                          {value.title}
                        </h3>
                        <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                          {value.description}
                        </p>
                      </div>
                    </div>
                  </TiltCard>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="relative px-6 lg:px-10 py-12 lg:py-20 border-y border-foreground/[0.06]">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal>
            <span className="font-mono-tight text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
              [ 03 ] — The team
            </span>
          </ScrollReveal>
          <SplitText
            text="The people you'll actually work with."
            as="h2"
            className="mt-4 font-display text-4xl sm:text-6xl lg:text-7xl font-semibold tracking-tight"
            delay={0.1}
            stagger={0.04}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
            {TEAM.map((member, i) => (
              <ScrollReveal key={member.name} delay={i * 0.1}>
                <div className="group relative rounded-3xl glass p-8 lg:p-10 h-full overflow-hidden">
                  <div
                    className="absolute -top-20 -right-20 w-60 h-60 rounded-full opacity-20 blur-3xl transition-opacity duration-500 group-hover:opacity-40"
                    style={{ background: member.accent }}
                  />
                  <div className="relative flex flex-col gap-6">
                    <div className="flex items-center gap-4">
                      <div
                        className="w-16 h-16 rounded-full flex items-center justify-center font-display text-2xl font-semibold"
                        style={{ background: member.accent, color: "#05050a" }}
                      >
                        {member.name.charAt(0)}
                      </div>
                      <div>
                        <h3 className="font-display text-2xl font-semibold tracking-tight">
                          {member.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">{member.role}</p>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {member.bio}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Marquee */}
      <section className="py-10">
        <Marquee duration={35} gap="3rem">
          {["CRAFT", "CURIOSITY", "CARE", "COURAGE", "CALM", "CLARITY"].map(
            (word, i) => (
              <div
                key={i}
                className="flex items-center gap-12 font-display text-3xl sm:text-5xl font-semibold tracking-tight text-muted-foreground/60"
              >
                <span>{word}</span>
                <span className="text-aurora-static">✦</span>
              </div>
            )
          )}
        </Marquee>
      </section>

      {/* CTA */}
      <section className="px-6 lg:px-10 py-12 lg:py-20">
        <div className="mx-auto max-w-5xl text-center">
          <SplitText
            text="Want to work with us?"
            as="h2"
            className="font-display text-3xl sm:text-5xl lg:text-6xl font-semibold tracking-tight"
            stagger={0.05}
          />
          <AnimatedReveal delay={0.3} variant="fade-up" scroll className="mt-6 text-base text-muted-foreground max-w-xl mx-auto">
            We take on a handful of new projects each quarter. Tell us what
            you're building.
          </AnimatedReveal>
          <AnimatedReveal delay={0.4} variant="fade-up" scroll>
            <button
              onClick={() => navigate("contact")}
              className="mt-8 inline-flex items-center gap-3 px-7 py-4 rounded-full bg-foreground text-background text-sm font-medium hover:opacity-90 transition-all group"
              data-cursor-label="Let's talk"
            >
              <span>Start a project</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </AnimatedReveal>
        </div>
      </section>
    </div>
  );
}
