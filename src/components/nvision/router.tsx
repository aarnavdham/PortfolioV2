"use client";

import { createContext, useContext, useState, type ReactNode, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

export type PageId =
  | "home"
  | "about"
  | "services"
  | "portfolio"
  | "case-study"
  | "testimonials"
  | "process"
  | "blog"
  | "contact"
  | "404"
  | "privacy"
  | "terms";

interface RouterState {
  page: PageId;
  caseStudySlug: string | null;
  navKey: number;
  navigate: (page: PageId, opts?: { caseStudySlug?: string }) => void;
}

const RouterContext = createContext<RouterState | null>(null);

export function useRouter() {
  const ctx = useContext(RouterContext);
  if (!ctx) throw new Error("useRouter must be used within RouterProvider");
  return ctx;
}

export function RouterProvider({ children }: { children: ReactNode }) {
  const [page, setPage] = useState<PageId>("home");
  const [caseStudySlug, setCaseStudySlug] = useState<string | null>(null);
  const [navKey, setNavKey] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const [pendingPage, setPendingPage] = useState<{ page: PageId; slug?: string } | null>(null);

  const navigate = useCallback(
    (next: PageId, opts?: { caseStudySlug?: string }) => {
      if (next === page && !opts?.caseStudySlug) return;
      if (opts?.caseStudySlug) setCaseStudySlug(opts.caseStudySlug);
      setPendingPage({ page: next, slug: opts?.caseStudySlug });
      setTransitioning(true);
    },
    [page]
  );

  // Swap page at the midpoint (when the wipe covers the screen)
  useEffect(() => {
    if (!transitioning || !pendingPage) return;
    const t = setTimeout(() => {
      setPage(pendingPage.page);
      if (pendingPage.slug) setCaseStudySlug(pendingPage.slug);
      setNavKey((k) => k + 1);
      window.scrollTo(0, 0);
    }, 350);
    return () => clearTimeout(t);
  }, [transitioning, pendingPage]);

  // End transition after exit
  useEffect(() => {
    if (!transitioning) return;
    const t = setTimeout(() => {
      setTransitioning(false);
      setPendingPage(null);
    }, 750);
    return () => clearTimeout(t);
  }, [transitioning]);

  // Keyboard shortcuts
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      if (e.key === "g") {
        const handler = (ev: KeyboardEvent) => {
          const map: Record<string, PageId> = {
            h: "home", a: "about", s: "services", p: "portfolio",
            t: "testimonials", r: "process", b: "blog", c: "contact",
          };
          if (map[ev.key.toLowerCase()]) navigate(map[ev.key.toLowerCase()]);
          window.removeEventListener("keydown", handler);
        };
        window.addEventListener("keydown", handler, { once: true });
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [navigate]);

  return (
    <RouterContext.Provider value={{ page, caseStudySlug, navKey, navigate }}>
      {children}
      {/* Simple top-to-bottom screen wipe */}
      <AnimatePresence>
        {transitioning && (
          <motion.div
            className="fixed inset-0 z-[400] pointer-events-none"
            style={{
              background: "var(--background)",
            }}
            initial={{ scaleY: 0, originY: 0 }}
            animate={{ scaleY: 1, originY: 0 }}
            exit={{ scaleY: 0, originY: 1 }}
            transition={{ duration: 0.35, ease: [0.76, 0, 0.24, 1] }}
          />
        )}
      </AnimatePresence>
    </RouterContext.Provider>
  );
}
