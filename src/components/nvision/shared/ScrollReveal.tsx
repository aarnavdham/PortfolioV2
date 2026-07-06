"use client";

import { motion, useInView } from "framer-motion";
import { useRef, type ReactNode } from "react";

type Variant = "fade-up" | "fade" | "scale" | "slide-left" | "slide-right" | "blur";

const VARIANTS: Record<Variant, { initial: any; animate: any }> = {
  "fade-up": { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 } },
  fade: { initial: { opacity: 0 }, animate: { opacity: 1 } },
  scale: { initial: { opacity: 0, scale: 0.92 }, animate: { opacity: 1, scale: 1 } },
  "slide-left": { initial: { opacity: 0, x: -40 }, animate: { opacity: 1, x: 0 } },
  "slide-right": { initial: { opacity: 0, x: 40 }, animate: { opacity: 1, x: 0 } },
  blur: { initial: { opacity: 0, filter: "blur(12px)" }, animate: { opacity: 1, filter: "blur(0px)" } },
};

export default function ScrollReveal({
  children,
  className = "",
  delay = 0,
  variant = "fade-up",
  once = true,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  variant?: Variant;
  once?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, margin: "-8% 0px -8% 0px" });
  const v = VARIANTS[variant];

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={v.initial}
      animate={inView ? v.animate : v.initial}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay }}
    >
      {children}
    </motion.div>
  );
}
