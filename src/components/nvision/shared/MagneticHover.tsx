"use client";

import { useRef, type ReactNode, type MouseEvent, useState } from "react";
import { motion } from "framer-motion";

/**
 * Magnetic hover wrapper — children drift toward cursor on hover,
 * with a glow that follows the cursor position.
 */
export default function MagneticHover({
  children,
  className = "",
  strength = 0.3,
  glow = true,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
  glow?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });
  const [hovered, setHovered] = useState(false);

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    // Magnetic pull
    el.style.transform = `translate3d(${(x - cx) * strength}px, ${(y - cy) * strength}px, 0)`;
    // Glow position (percentage)
    setGlowPos({ x: (x / rect.width) * 100, y: (y / rect.height) * 100 });
  };

  const handleLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "translate3d(0,0,0)";
    setHovered(false);
  };

  return (
    <div
      ref={ref}
      className={`relative ${className}`}
      onMouseMove={handleMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleLeave}
      style={{
        transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        willChange: "transform",
      }}
    >
      {glow && hovered && (
        <div
          className="absolute inset-0 pointer-events-none rounded-[inherit]"
          style={{
            background: `radial-gradient(circle at ${glowPos.x}% ${glowPos.y}%, color-mix(in oklch, var(--aurora-cyan) 25%, transparent), transparent 60%)`,
            transition: "background 0.1s",
          }}
        />
      )}
      {children}
    </div>
  );
}
