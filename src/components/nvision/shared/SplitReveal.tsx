"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";

/**
 * SplitReveal — two panels start covering the content (meeting in the middle),
 * then slide apart (left goes left, right goes right) as you scroll,
 * revealing the content behind. Creates a curtain-opening effect.
 */
export default function SplitReveal({
  children,
  className = "",
}: {
  children?: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Panels start at 0 (covering) and slide to -100% / 100% (off-screen)
  const leftX = useTransform(scrollYProgress, [0, 0.45], ["0%", "-100%"]);
  const rightX = useTransform(scrollYProgress, [0, 0.45], ["0%", "100%"]);
  const gapOpacity = useTransform(scrollYProgress, [0, 0.15, 0.4], [1, 0.5, 0]);

  return (
    <div ref={ref} className={`relative ${className}`} style={{ overflow: "hidden" }}>
      {/* Content behind the panels */}
      <div className="relative z-0">{children}</div>

      {/* Left panel — starts covering, slides left */}
      <motion.div
        style={{ x: leftX }}
        className="absolute inset-y-0 left-0 w-1/2 z-10 pointer-events-none"
      >
        <div className="w-full h-full" style={{ background: "var(--background)" }} />
      </motion.div>

      {/* Right panel — starts covering, slides right */}
      <motion.div
        style={{ x: rightX }}
        className="absolute inset-y-0 right-0 w-1/2 z-10 pointer-events-none"
      >
        <div className="w-full h-full" style={{ background: "var(--background)" }} />
      </motion.div>

      {/* Center gap line that fades */}
      <motion.div
        style={{ opacity: gapOpacity }}
        className="absolute inset-y-0 left-1/2 w-px z-20 pointer-events-none -translate-x-1/2"
      >
        <div className="w-full h-full" style={{ background: "linear-gradient(180deg, transparent, var(--aurora-cyan), transparent)" }} />
      </motion.div>
    </div>
  );
}
