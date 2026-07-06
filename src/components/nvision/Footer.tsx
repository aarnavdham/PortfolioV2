"use client";

import { useRouter, type PageId } from "./router";
import { ArrowUpRight } from "lucide-react";

const FOOTER_NAV: { id: PageId; label: string }[] = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "portfolio", label: "Portfolio" },
  { id: "process", label: "Process" },
  { id: "testimonials", label: "Voices" },
  { id: "blog", label: "Insights" },
  { id: "contact", label: "Contact" },
];

const SOCIALS = [
  { label: "Twitter", href: "#" },
  { label: "Instagram", href: "#" },
  { label: "Dribbble", href: "#" },
  { label: "LinkedIn", href: "#" },
  { label: "Awwwards", href: "#" },
];

export default function Footer() {
  const { navigate } = useRouter();

  return (
    <footer className="relative mt-auto border-t glass" style={{ borderColor: "color-mix(in oklch, var(--foreground) 6%, transparent)", background: "color-mix(in oklch, var(--background) 80%, transparent)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)" }}>
      {/* Aurora glow at top */}
      <div
        className="absolute -top-px left-1/2 -translate-x-1/2 w-2/3 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(56,189,248,0.6), rgba(59,130,246,0.6), rgba(45,212,191,0.6), transparent)",
        }}
      />

      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-16 lg:py-20">
        {/* CTA strip */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 pb-16 border-b" style={{ borderColor: "color-mix(in oklch, var(--foreground) 6%, transparent)" }}>
          <div className="flex flex-col gap-3">
            <span className="font-mono-tight text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
              [ 01 ] — Start something
            </span>
            <h3 className="font-display text-3xl sm:text-5xl lg:text-6xl font-semibold tracking-tight leading-[0.95]">
              Got a project that
              <br />
              <span className="text-aurora-static">deserves to exist?</span>
            </h3>
          </div>
          <button
            onClick={() => navigate("contact")}
            className="group inline-flex items-center gap-3 px-7 py-4 rounded-full bg-foreground text-background text-sm font-medium hover:opacity-90 transition-all"
            data-cursor-label="Let's talk"
          >
            <span>Start a project</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>

        {/* Footer grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 py-16">
          <div className="col-span-2 md:col-span-1 flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <svg width="24" height="24" viewBox="0 0 80 80" fill="none">
                <path
                  d="M14 14 L14 66 L26 66 L26 38 L54 66 L66 66 L66 14 L54 14 L54 42 L26 14 Z"
                  fill="url(#footerLogoGrad)"
                />
                <defs>
                  <linearGradient
                    id="footerLogoGrad"
                    x1="0"
                    y1="0"
                    x2="80"
                    y2="80"
                  >
                    <stop stopColor="#67e8f9" />
                    <stop offset="0.5" stopColor="#38bdf8" />
                    <stop offset="1" stopColor="#2dd4bf" />
                  </linearGradient>
                </defs>
              </svg>
              <span className="font-display text-lg font-semibold">
                NVISION
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              A creative digital studio crafting the experiences people
              remember.
            </p>
            <p className="text-xs text-muted-foreground/60 font-mono-tight mt-3">
              EST. 2013 — STILL CURIOUS
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <span className="font-mono-tight text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
              Navigate
            </span>
            {FOOTER_NAV.map((link) => (
              <button
                key={link.id}
                onClick={() => navigate(link.id)}
                className="text-sm text-foreground/70 hover:text-foreground transition-colors link-underline self-start"
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="flex flex-col gap-3">
            <span className="font-mono-tight text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
              Social
            </span>
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                className="text-sm text-foreground/70 hover:text-foreground transition-colors link-underline self-start"
              >
                {s.label}
              </a>
            ))}
          </div>

          <div className="flex flex-col gap-3">
            <span className="font-mono-tight text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
              Contact
            </span>
            <a
              href="mailto:hello@nvision.studio"
              className="text-sm text-foreground/70 hover:text-foreground transition-colors link-underline self-start"
            >
              hello@nvision.studio
            </a>
            <a
              href="mailto:press@nvision.studio"
              className="text-sm text-foreground/70 hover:text-foreground transition-colors link-underline self-start"
            >
              press@nvision.studio
            </a>
            <span className="text-sm text-foreground/70 mt-3">
              Remote / Worldwide
            </span>
            <span className="text-xs text-muted-foreground font-mono-tight">
              Working hours: 09:00–19:00 CET
            </span>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-10 border-t" style={{ borderColor: "color-mix(in oklch, var(--foreground) 6%, transparent)" }}>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-muted-foreground font-mono-tight">
            <span>© {new Date().getFullYear()} NVISION STUDIO</span>
            <button
              onClick={() => navigate("privacy")}
              className="hover:text-foreground/80 transition-colors"
            >
              Privacy
            </button>
            <button
              onClick={() => navigate("terms")}
              className="hover:text-foreground/80 transition-colors"
            >
              Terms
            </button>
            <button
              onClick={() => navigate("404")}
              className="hover:text-foreground/80 transition-colors"
            >
              404
            </button>
          </div>
          <div className="flex items-center gap-3 text-xs text-muted-foreground font-mono-tight">
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              All systems operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
