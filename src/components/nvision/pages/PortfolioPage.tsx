"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Search, X, Code2, Film } from "lucide-react";
import { useRouter } from "../router";
import { PROJECTS, VIDEO_PROJECTS } from "@/lib/nvision/data";
import SplitText from "../shared/SplitText";
import ScrollReveal from "../shared/ScrollReveal";
import AnimatedReveal from "../shared/AnimatedReveal";

type Medium = "all" | "websites" | "films";

interface UnifiedItem {
  slug: string;
  title: string;
  client: string;
  category: string;
  year: string;
  cover: string;
  summary: string;
  tags: string[];
  medium: "website" | "video";
  duration?: string;
}

// Merge websites + films into a single list
const ALL_ITEMS: UnifiedItem[] = [
  ...PROJECTS.map((p) => ({
    slug: p.slug,
    title: p.title,
    client: p.client,
    category: p.category,
    year: p.year,
    cover: p.cover,
    summary: p.summary,
    tags: p.tags,
    medium: "website" as const,
  })),
  ...VIDEO_PROJECTS.map((p) => ({
    slug: p.slug,
    title: p.title,
    client: p.client,
    category: p.category,
    year: p.year,
    cover: p.cover,
    summary: p.summary,
    tags: p.tags,
    medium: "video" as const,
    duration: p.duration,
  })),
];

export default function PortfolioPage() {
  const { navigate } = useRouter();
  const [medium, setMedium] = useState<Medium>("all");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return ALL_ITEMS.filter((p) => {
      const matchesMedium =
        medium === "all" ||
        (medium === "websites" && p.medium === "website") ||
        (medium === "films" && p.medium === "video");
      const matchesQuery =
        !query ||
        p.title.toLowerCase().includes(query.toLowerCase()) ||
        p.client.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase());
      return matchesMedium && matchesQuery;
    });
  }, [medium, query]);

  return (
    <div className="page-enter pt-32">
      {/* Header */}
      <section className="relative px-5 lg:px-10 py-12 lg:py-16">
        <div className="mx-auto max-w-7xl">
          <AnimatedReveal delay={0.1} variant="fade-up">
            <span className="font-mono-tight text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
              [ Index 04 / Portfolio ]
            </span>
          </AnimatedReveal>
          <div className="mt-4 grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
            <div className="lg:col-span-8">
              <SplitText
                text="Selected work."
                as="h1"
                className="font-display text-5xl sm:text-7xl lg:text-9xl font-semibold tracking-tight leading-[0.9]"
                stagger={0.05}
              />
              <SplitText
                text="Sites & films, 2024 — 2025"
                as="p"
                className="mt-2 font-display text-xl sm:text-3xl text-aurora-static italic font-light"
                delay={0.3}
                stagger={0.04}
              />
            </div>
            <div className="lg:col-span-4">
              <ScrollReveal delay={0.2}>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Websites and films, made by the same team. Filter by medium,
                  search by name, click any card to dive into the case study.
                </p>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="sticky top-24 z-30 px-5 lg:px-10 py-3 backdrop-blur-xl border-y" style={{ background: "color-mix(in oklch, var(--background) 80%, transparent)", borderColor: "color-mix(in oklch, var(--foreground) 6%, transparent)" }}>
        <div className="mx-auto max-w-7xl flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
          <div className="flex flex-wrap items-center gap-1">
            {(["all", "websites", "films"] as Medium[]).map((m) => (
              <button
                key={m}
                onClick={() => setMedium(m)}
                className={`px-4 py-2 rounded-full text-xs font-medium transition-all duration-300 flex items-center gap-1.5 capitalize ${
                  medium === m
                    ? "bg-foreground text-background"
                    : "glass text-muted-foreground hover:text-foreground"
                }`}
              >
                {m === "websites" && <Code2 className="w-3 h-3" />}
                {m === "films" && <Film className="w-3 h-3" />}
                {m === "all" ? "All work" : m}
              </button>
            ))}
          </div>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search projects..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-9 pr-9 py-2 rounded-full glass text-xs text-foreground placeholder-muted-foreground outline-none focus:bg-foreground/10 transition-colors"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                <X className="w-3.5 h-3.5 text-muted-foreground hover:text-foreground" />
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="px-5 lg:px-10 py-8 lg:py-12">
        <div className="mx-auto max-w-7xl">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <p className="font-display text-3xl text-foreground/60 mb-4">
                No projects found.
              </p>
              <p className="text-sm text-muted-foreground">
                Try a different filter or search term.
              </p>
            </div>
          ) : (
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <AnimatePresence mode="popLayout">
                {filtered.map((project, i) => (
                  <motion.button
                    key={project.slug}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    onClick={() =>
                      navigate("case-study", { caseStudySlug: project.slug })
                    }
                    data-cursor-label="Open case"
                    className="group relative w-full text-left"
                  >
                    <div className="relative overflow-hidden rounded-3xl glass aspect-[4/3]">
                      <div
                        className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
                        style={{ background: project.cover }}
                      />
                      <div className="absolute inset-0 grain" />
                      <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.75), transparent 55%)" }} />

                      {/* Medium badge */}
                      <div className="absolute top-4 left-4 flex items-center gap-2">
                        <span className="px-2.5 py-1 rounded-full glass-strong text-[10px] text-white font-mono-tight uppercase tracking-wider flex items-center gap-1.5">
                          {project.medium === "website" ? (
                            <Code2 className="w-3 h-3" />
                          ) : (
                            <Film className="w-3 h-3" />
                          )}
                          {project.medium === "website" ? "Web" : "Film"}
                        </span>
                      </div>

                      <motion.div
                        className="absolute top-4 right-4 w-11 h-11 rounded-2xl glass-strong flex items-center justify-center"
                        whileHover={{ rotate: 90, scale: 1.1 }}
                      >
                        <ArrowUpRight className="w-4 h-4 text-white" />
                      </motion.div>

                      <div className="absolute inset-x-0 bottom-0 p-5 lg:p-6">
                        <span className="font-mono-tight text-[10px] uppercase tracking-[0.3em] text-foreground/70">
                          {project.category} — {project.year}
                          {project.duration && ` · ${project.duration}`}
                        </span>
                        <h3 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight text-white mt-1">
                          {project.title}
                        </h3>
                        <p className="text-sm text-foreground/70 mt-1 line-clamp-1">
                          {project.summary}
                        </p>
                        <div className="flex gap-2 mt-3">
                          {project.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-0.5 rounded-full glass text-[9px] text-foreground/80 font-mono-tight uppercase tracking-wider"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}
