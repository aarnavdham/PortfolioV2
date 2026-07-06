"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter, type PageId } from "./router";
import { Menu, X, ArrowUpRight } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { useSound } from "./SoundProvider";

const NAV_LINKS: { id: PageId; label: string; index: string }[] = [
  { id: "home", label: "Home", index: "01" },
  { id: "about", label: "About", index: "02" },
  { id: "services", label: "Services", index: "03" },
  { id: "portfolio", label: "Work", index: "04" },
  { id: "process", label: "Process", index: "05" },
  { id: "contact", label: "Contact", index: "06" },
  { id: "testimonials", label: "Voices", index: "07" },
  { id: "blog", label: "Insights", index: "08" },
];

// Show first 6 in the desktop top bar (rest in fullscreen menu)
const TOP_LINKS = NAV_LINKS.slice(0, 6);

export default function Navbar() {
  const { page, navigate } = useRouter();
  const { play } = useSound();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const go = (id: PageId) => {
    play("transition");
    setMenuOpen(false);
    navigate(id);
  };

  return (
    <>
      <ScrollProgress />

      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
        className="fixed top-0 left-0 right-0 z-[120] px-3 sm:px-5 lg:px-8 pt-3"
      >
        <div
          className={`mx-auto max-w-7xl flex items-center justify-between navbar-solid rounded-full pl-5 pr-3 py-2.5 transition-all duration-500 ${
            scrolled ? "navbar-solid-scrolled" : ""
          }`}
        >
          {/* Logo */}
          <button
            onClick={() => go("home")}
            className="flex items-center gap-2.5 group"
            data-cursor-label="Home"
            aria-label="NVISION home"
          >
            <svg
              width="26"
              height="26"
              viewBox="0 0 80 80"
              fill="none"
              className="transition-transform duration-500 group-hover:rotate-12"
            >
              <path
                d="M14 14 L14 66 L26 66 L26 38 L54 66 L66 66 L66 14 L54 14 L54 42 L26 14 Z"
                fill="url(#navLogoGrad)"
              />
              <defs>
                <linearGradient id="navLogoGrad" x1="0" y1="0" x2="80" y2="80">
                  <stop stopColor="#67e8f9" />
                  <stop offset="0.5" stopColor="#38bdf8" />
                  <stop offset="1" stopColor="#2dd4bf" />
                </linearGradient>
              </defs>
            </svg>
            <span className="font-display text-base font-semibold tracking-tight">
              NVISION
            </span>
          </button>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {TOP_LINKS.map((link) => {
              const isActive = page === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => go(link.id)}
                  className={`relative px-3.5 py-2 text-sm font-medium rounded-full transition-all duration-200 ${
                    isActive
                      ? "text-[var(--background)]"
                      : "text-muted-foreground hover:text-foreground hover:bg-foreground/10"
                  }`}
                  style={isActive ? { background: "var(--foreground)" } : undefined}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Right cluster */}
          <div className="flex items-center gap-2">
            <ThemeToggle />

            <button
              onClick={() => go("contact")}
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-full bg-foreground text-background text-sm font-medium hover:opacity-90 transition-opacity group"
              data-cursor-label="Let's talk"
            >
              <span>Start a project</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>

            <button
              onClick={() => {
                play("click");
                setMenuOpen(true);
              }}
              className="lg:hidden flex items-center justify-center w-10 h-10 rounded-full navbar-solid"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Fullscreen menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[140] flex flex-col"
            style={{
              background:
                "color-mix(in oklch, var(--background) 96%, transparent)",
              backdropFilter: "blur(40px)",
              WebkitBackdropFilter: "blur(40px)",
            }}
          >
            <div
              className="absolute inset-0 pointer-events-none opacity-60"
              style={{
                background:
                  "radial-gradient(circle at 30% 20%, color-mix(in oklch, var(--aurora-cyan) 35%, transparent), transparent 50%), radial-gradient(circle at 80% 80%, color-mix(in oklch, var(--aurora-blue) 30%, transparent), transparent 50%)",
              }}
            />

            <div className="relative flex items-center justify-between px-6 lg:px-10 pt-6">
              <span className="font-display text-lg font-semibold">
                NVISION
              </span>
              <button
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-center w-12 h-12 rounded-full navbar-solid"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative flex-1 flex flex-col justify-center px-6 lg:px-20 overflow-y-auto">
              <nav className="flex flex-col gap-0">
                {NAV_LINKS.map((link, i) => (
                  <motion.button
                    key={link.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{
                      duration: 0.5,
                      delay: 0.08 + i * 0.05,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    onClick={() => go(link.id)}
                    className="group flex items-baseline gap-5 py-2.5 text-left"
                  >
                    <span className="font-mono-tight text-xs text-muted-foreground tabular-nums w-8">
                      {link.index}
                    </span>
                    <span
                      className={`font-display text-4xl sm:text-6xl lg:text-7xl font-semibold tracking-tight transition-all duration-300 ${
                        page === link.id
                          ? "text-aurora-static"
                          : "group-hover:translate-x-3"
                      }`}
                      style={{ color: page === link.id ? undefined : "var(--foreground)" }}
                    >
                      {link.label}
                    </span>
                  </motion.button>
                ))}
              </nav>
            </div>

            <div className="relative px-6 lg:px-20 pb-10 flex flex-col sm:flex-row justify-between gap-6">
              <div className="flex flex-col gap-1">
                <span className="font-mono-tight text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                  Get in touch
                </span>
                <a
                  href="mailto:hello@nvision.studio"
                  className="text-lg font-medium link-underline"
                >
                  hello@nvision.studio
                </a>
              </div>
              <div className="flex flex-col gap-1 sm:text-right">
                <span className="font-mono-tight text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                  Based in
                </span>
                <span className="text-lg font-medium">Everywhere / Nowhere</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const scrollable = h.scrollHeight - h.clientHeight;
      setProgress(scrollable > 0 ? h.scrollTop / scrollable : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-[125] h-0.5 bg-transparent">
      <div
        className="h-full origin-left"
        style={{
          transform: `scaleX(${progress})`,
          background:
            "linear-gradient(90deg, #22D3EE 0%, #3B82F6 50%, #2DD4BF 100%)",
          transition: "transform 0.1s linear",
        }}
      />
    </div>
  );
}
