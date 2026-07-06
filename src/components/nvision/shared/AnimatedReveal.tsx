"use client";

import { motion, useInView } from "framer-motion";
import { type ReactNode, useRef } from "react";

type Variant = "fade-up" | "fade" | "slide-left" | "slide-right" | "scale";

const VARIANTS: Record<Variant, { initial: any; animate: any }> = {
  "fade-up": { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } },
  fade: { initial: { opacity: 0 }, animate: { opacity: 1 } },
  "slide-left": { initial: { opacity: 0, x: -30 }, animate: { opacity: 1, x: 0 } },
  "slide-right": { initial: { opacity: 0, x: 30 }, animate: { opacity: 1, x: 0 } },
  scale: { initial: { opacity: 0, scale: 0.92 }, animate: { opacity: 1, scale: 1 } },
};

export default function AnimatedReveal({
  children,
  delay = 0,
  variant = "fade-up",
  className = "",
  duration = 0.7,
  scroll = false,
}: {
  children: ReactNode;
  delay?: number;
  variant?: Variant;
  className?: string;
  duration?: number;
  scroll?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-8% 0px -8% 0px" });
  const v = VARIANTS[variant];

  // For scroll: animate when in view
  // For above-the-fold: animate when in view (which is immediately on load)
  // Add 2.5s delay for above-the-fold to wait for loader
  const finalDelay = scroll ? delay : 2.5 + delay;

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={v.initial}
      animate={inView ? v.animate : v.initial}
      transition={{ duration, ease: [0.16, 1, 0.3, 1], delay: finalDelay }}
    >
      {children}
    </motion.div>
  );
}
