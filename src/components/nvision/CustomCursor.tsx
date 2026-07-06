"use client";

import { useEffect, useRef } from "react";

/**
 * Custom cursor with magnetic ring + dot.
 * - dot follows pointer instantly
 * - ring lags with spring physics
 * - ring grows when hovering interactive elements
 * - ring displays contextual label when hovering [data-cursor-label]
 */
export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    // Skip on touch devices
    if (window.matchMedia("(hover: none)").matches) return;

    const dot = dotRef.current!;
    const ring = ringRef.current!;
    const label = labelRef.current!;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let raf = 0;
    let hovering = false;
    let labelText = "";

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Check for contextual label
      const target = (e.target as HTMLElement)?.closest(
        "[data-cursor-label]"
      ) as HTMLElement | null;
      if (target) {
        const text = target.getAttribute("data-cursor-label");
        if (text && text !== labelText) {
          labelText = text;
          label.textContent = text;
        }
        if (!label.classList.contains("opacity-100")) {
          label.classList.remove("opacity-0");
          label.classList.add("opacity-100");
        }
      } else {
        if (labelText) {
          labelText = "";
          label.classList.remove("opacity-100");
          label.classList.add("opacity-0");
        }
      }

      // Check for interactive hover
      const interactive = (e.target as HTMLElement)?.closest(
        'a, button, input, textarea, [data-cursor-hover], [role="button"]'
      );
      if (interactive && !hovering) {
        hovering = true;
        ring.style.width = "64px";
        ring.style.height = "64px";
        ring.style.borderColor = "rgba(255,255,255,0.9)";
        ring.style.backgroundColor = "rgba(255,255,255,0.05)";
      } else if (!interactive && hovering) {
        hovering = false;
        ring.style.width = "32px";
        ring.style.height = "32px";
        ring.style.borderColor = "rgba(255,255,255,0.5)";
        ring.style.backgroundColor = "transparent";
      }
    };

    const onDown = () => {
      ring.style.transform = `${ring.style.transform.replace(
        /scale\([^)]+\)/,
        ""
      )} scale(0.8)`;
    };
    const onUp = () => {
      ring.style.transform = ring.style.transform.replace(/\s*scale\([^)]+\)/, "");
    };

    const render = () => {
      // Dot follows instantly
      dot.style.transform = `translate3d(${mouseX - 3}px, ${
        mouseY - 3
      }px, 0)`;

      // Ring follows with spring
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      const ringHalf = parseFloat(ring.style.width || "32") / 2;
      ring.style.transform = `translate3d(${ringX - ringHalf}px, ${
        ringY - ringHalf
      }px, 0)`;

      // Label position
      label.style.transform = `translate3d(${mouseX + 24}px, ${
        mouseY + 24
      }px, 0)`;

      raf = requestAnimationFrame(render);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    raf = requestAnimationFrame(render);

    // Initial visibility
    dot.style.opacity = "1";
    ring.style.opacity = "1";

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="cursor-dot hide-on-touch"
        style={{ opacity: 0, transition: "opacity 0.3s" }}
      />
      <div
        ref={ringRef}
        className="cursor-ring hide-on-touch"
        style={{
          opacity: 0,
          width: "32px",
          height: "32px",
          transition:
            "width 0.3s cubic-bezier(0.16,1,0.3,1), height 0.3s cubic-bezier(0.16,1,0.3,1), border-color 0.3s, background-color 0.3s",
        }}
      />
      <div
        ref={labelRef}
        className="hide-on-touch"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          pointerEvents: "none",
          zIndex: 9999,
          padding: "6px 12px",
          background: "rgba(255,255,255,0.95)",
          color: "#0a0a0f",
          borderRadius: "999px",
          fontSize: "11px",
          fontWeight: 600,
          letterSpacing: "0.05em",
          textTransform: "uppercase",
          opacity: 0,
          transition: "opacity 0.3s",
          whiteSpace: "nowrap",
          willChange: "transform",
        }}
      />
    </>
  );
}
