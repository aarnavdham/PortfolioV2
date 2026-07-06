"use client";

import { useRef, type ReactNode, type MouseEvent } from "react";

/**
 * 3D tilt card — children tilt toward cursor with perspective.
 * Use for premium cards (projects, services).
 */
export default function TiltCard({
  children,
  className = "",
  max = 8,
  scale = 1.02,
  glare = true,
}: {
  children: ReactNode;
  className?: string;
  max?: number;
  scale?: number;
  glare?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);

  const handleMove = (e: MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(hover: none)").matches) return;

    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    const rx = (0.5 - y) * max * 2;
    const ry = (x - 0.5) * max * 2;

    el.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) scale(${scale})`;

    if (glare && glareRef.current) {
      glareRef.current.style.background = `radial-gradient(circle at ${
        x * 100
      }% ${y * 100}%, rgba(255,255,255,0.18), transparent 60%)`;
    }
  };

  const handleLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "perspective(1000px) rotateX(0) rotateY(0) scale(1)";
    if (glareRef.current) {
      glareRef.current.style.background = "transparent";
    }
  };

  return (
    <div
      ref={ref}
      className={`tilt-card relative ${className}`}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{
        transform: "perspective(1000px) rotateX(0) rotateY(0)",
        transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        willChange: "transform",
      }}
    >
      {children}
      {glare && (
        <div
          ref={glareRef}
          className="pointer-events-none absolute inset-0 rounded-[inherit]"
          style={{ transition: "background 0.3s" }}
        />
      )}
    </div>
  );
}
