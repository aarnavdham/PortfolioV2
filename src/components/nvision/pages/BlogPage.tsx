"use client";

import { useState } from "react";
import { ArrowUpRight, Clock } from "lucide-react";
import { useRouter } from "../router";
import { BLOG_POSTS } from "@/lib/nvision/data";
import SplitText from "../shared/SplitText";
import ScrollReveal from "../shared/ScrollReveal";
import Marquee from "../shared/Marquee";

const CATEGORIES = ["All", "Essay", "Motion", "Case Note", "Tech", "Insight"];

export default function BlogPage() {
  const { navigate } = useRouter();
  const [filter, setFilter] = useState("All");

  const filtered =
    filter === "All"
      ? BLOG_POSTS
      : BLOG_POSTS.filter((p) => p.category === filter);

  const featured = filtered[0];
  const rest = filtered.slice(1);

  return (
    <div className="page-enter pt-32">
      {/* Hero */}
      <section className="relative px-6 lg:px-10 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal>
            <span className="font-mono-tight text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
              [ Index 07 / Insights ]
            </span>
          </ScrollReveal>
          <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-9">
              <SplitText
                text="Notes from"
                as="h1"
                className="font-display text-5xl sm:text-7xl lg:text-9xl font-semibold tracking-tight leading-[0.9]"
                stagger={0.05}
              />
              <SplitText
                text="the studio."
                as="h1"
                className="font-display text-5xl sm:text-7xl lg:text-9xl font-semibold tracking-tight leading-[0.9] text-aurora-static italic font-light"
                delay={0.3}
                stagger={0.05}
              />
            </div>
            <div className="lg:col-span-3">
              <ScrollReveal delay={0.2}>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Essays, case notes, and the occasional rant. We write when we
                  have something to say — not on a content calendar.
                </p>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Filter strip */}
      <section className="px-6 lg:px-10 py-4 border-y border-foreground/[0.06]">
        <div className="mx-auto max-w-7xl flex flex-wrap items-center gap-2">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`px-4 py-2 rounded-full text-xs font-medium transition-all duration-300 ${
                filter === c
                  ? "bg-foreground text-background"
                  : "glass text-foreground/70 hover:text-foreground"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </section>

      {/* Featured post */}
      {featured && (
        <section className="px-6 lg:px-10 py-12 lg:py-20">
          <div className="mx-auto max-w-7xl">
            <ScrollReveal>
              <button
                className="group relative block w-full text-left"
                data-cursor-label="Read"
              >
                <div
                  className="relative overflow-hidden rounded-3xl glass aspect-[16/10] lg:aspect-[2/1]"
                >
                  <div
                    className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
                    style={{
                      background: `linear-gradient(135deg, ${featured.accent}, rgba(0,0,0,0.6))`,
                    }}
                  />
                  <div className="absolute inset-0 grain" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute top-6 left-6 flex items-center gap-3">
                    <span className="px-3 py-1 rounded-full glass text-[10px] text-foreground/80 font-mono-tight uppercase tracking-wider">
                      Featured
                    </span>
                    <span className="px-3 py-1 rounded-full glass text-[10px] text-foreground/80 font-mono-tight uppercase tracking-wider">
                      {featured.category}
                    </span>
                  </div>
                  <div className="absolute bottom-0 inset-x-0 p-6 lg:p-10">
                    <div className="flex items-center gap-3 mb-4 font-mono-tight text-[10px] uppercase tracking-[0.3em] text-foreground/70">
                      <span>{featured.date}</span>
                      <span className="w-1 h-1 rounded-full bg-foreground/40" />
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {featured.readTime}
                      </span>
                    </div>
                    <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-white max-w-4xl">
                      {featured.title}
                    </h2>
                    <p className="mt-4 text-base sm:text-lg text-foreground/70 max-w-2xl">
                      {featured.excerpt}
                    </p>
                    <div className="mt-6 inline-flex items-center gap-2 text-sm text-white">
                      <span className="link-underline">Read essay</span>
                      <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </div>
                </div>
              </button>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* Grid */}
      <section className="px-6 lg:px-10 py-12 lg:py-20 border-t border-foreground/[0.06]">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map((post, i) => (
              <ScrollReveal key={post.slug} delay={i * 0.06}>
                <button
                  className="group relative block w-full text-left h-full rounded-3xl glass overflow-hidden hover:bg-foreground/[0.07] transition-colors"
                  data-cursor-label="Read"
                >
                  <div
                    className="relative aspect-[16/10] overflow-hidden"
                    style={{
                      background: `linear-gradient(135deg, ${post.accent}40, transparent)`,
                    }}
                  >
                    <div
                      className="absolute inset-0 transition-transform duration-700 group-hover:scale-110"
                      style={{
                        background: `radial-gradient(circle at 30% 30%, ${post.accent}, transparent 70%)`,
                      }}
                    />
                    <div className="absolute inset-0 grain" />
                    <span className="absolute top-4 left-4 px-2.5 py-1 rounded-full glass text-[10px] text-foreground/80 font-mono-tight uppercase tracking-wider">
                      {post.category}
                    </span>
                  </div>
                  <div className="p-6 flex flex-col gap-3">
                    <div className="flex items-center gap-2 font-mono-tight text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                      <span>{post.date}</span>
                      <span className="w-1 h-1 rounded-full bg-white/30" />
                      <span>{post.readTime}</span>
                    </div>
                    <h3 className="font-display text-xl font-semibold tracking-tight leading-tight">
                      {post.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div className="mt-2 inline-flex items-center gap-2 text-xs text-foreground/70">
                      <span className="link-underline">Read</span>
                      <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </div>
                </button>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="px-6 lg:px-10 py-20 lg:py-32 border-t border-foreground/[0.06]">
        <div className="mx-auto max-w-4xl">
          <div className="relative rounded-3xl glass-strong p-10 lg:p-16 overflow-hidden">
            <div
              className="absolute inset-0 pointer-events-none opacity-50"
              style={{
                background:
                  "radial-gradient(circle at 30% 20%, rgba(139,92,246,0.25), transparent 50%), radial-gradient(circle at 70% 80%, rgba(6,182,212,0.18), transparent 50%)",
              }}
            />
            <div className="relative flex flex-col items-center text-center gap-6">
              <span className="font-mono-tight text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                Newsletter
              </span>
              <h2 className="font-display text-3xl sm:text-5xl font-semibold tracking-tight">
                One email. <span className="text-aurora-static italic font-light">Monthly.</span>
              </h2>
              <p className="text-base text-muted-foreground max-w-md">
                Notes on craft, motion, and the web. No promos, no spam, no
                growth hacks. Just the things we're thinking about.
              </p>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  navigate("contact");
                }}
                className="flex flex-col sm:flex-row gap-3 w-full max-w-md mt-4"
              >
                <input
                  type="email"
                  required
                  placeholder="you@studio.com"
                  className="flex-1 px-5 py-3.5 rounded-full glass text-sm text-white placeholder-white/40 outline-none focus:bg-white/10 transition-colors"
                />
                <button
                  type="submit"
                  className="px-6 py-3.5 rounded-full bg-foreground text-background text-sm font-medium hover:opacity-90 transition-colors"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
