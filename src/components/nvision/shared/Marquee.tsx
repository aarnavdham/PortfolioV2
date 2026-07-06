"use client";

import { type ReactNode, useEffect, useRef } from "react";

/**
 * Continuous marquee — rAF-driven, never pauses, seamless loop.
 * Duplicates content 4x and wraps based on measured content width.
 */
export default function Marquee({
  children,
  duration = 30,
  reverse = false,
  gap = "2rem",
  className = "",
}: {
  children: ReactNode;
  duration?: number;
  reverse?: boolean;
  gap?: string;
  className?: string;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(0);
  const rafRef = useRef(0);
  const contentWidthRef = useRef(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // Measure one copy of the content (first child div)
    const measure = () => {
      const firstChild = track.firstElementChild as HTMLElement;
      if (firstChild && firstChild.offsetWidth > 0) {
        // Include the gap between copies
        const gapVal = parseFloat(gap) || 0;
        contentWidthRef.current = firstChild.offsetWidth + gapVal;
      }
    };
    measure();
    // Re-measure after fonts/layout settle
    const measureTimer1 = setTimeout(measure, 200);
    const measureTimer2 = setTimeout(measure, 1000);
    const onResize = () => measure();
    window.addEventListener("resize", onResize);

    let last = performance.now();

    const tick = (now: number) => {
      const dt = Math.min(now - last, 50); // cap dt to avoid jumps on tab switch
      last = now;
      const w = contentWidthRef.current;
      if (w > 0) {
        const pxPerMs = w / (duration * 1000);
        offsetRef.current += pxPerMs * dt * (reverse ? -1 : 1);
        // Seamless wrap
        if (offsetRef.current >= w) offsetRef.current -= w;
        if (offsetRef.current <= -w) offsetRef.current += w;
        track.style.transform = `translateX(${-offsetRef.current}px)`;
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      clearTimeout(measureTimer1);
      clearTimeout(measureTimer2);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(rafRef.current);
    };
  }, [duration, reverse, gap]);

  return (
    <div
      className={`flex overflow-hidden ${className}`}
      style={{
        maskImage:
          "linear-gradient(90deg, transparent 0%, #000 6%, #000 94%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(90deg, transparent 0%, #000 6%, #000 94%, transparent 100%)",
      }}
    >
      <div
        ref={trackRef}
        className="flex flex-shrink-0"
        style={{
          gap: gap,
          willChange: "transform",
        }}
      >
        {/* 4 copies for seamless loop */}
        <div className="flex flex-shrink-0" style={{ gap: gap }}>
          {children}
        </div>
        <div className="flex flex-shrink-0" style={{ gap: gap }}>
          {children}
        </div>
        <div className="flex flex-shrink-0" style={{ gap: gap }}>
          {children}
        </div>
        <div className="flex flex-shrink-0" style={{ gap: gap }}>
          {children}
        </div>
      </div>
    </div>
  );
}
