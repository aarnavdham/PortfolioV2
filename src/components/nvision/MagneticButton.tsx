"use client";

import { useRef, type ReactNode, type MouseEvent } from "react";

/**
 * Magnetic button — children drift toward the cursor on hover.
 * Use for primary CTAs. Falls back to normal button on touch.
 */
export default function MagneticButton({
  children,
  className = "",
  strength = 0.4,
  onClick,
  as = "button",
  href,
  ariaLabel,
  cursorLabel,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
  onClick?: () => void;
  as?: "button" | "a";
  href?: string;
  ariaLabel?: string;
  cursorLabel?: string;
}) {
  const ref = useRef<HTMLElement>(null);

  const handleMove = (e: MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(hover: none)").matches) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate3d(${x * strength}px, ${
      y * strength
    }px, 0)`;
  };

  const handleLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "translate3d(0,0,0)";
  };

  const sharedProps: any = {
    ref,
    className,
    onMouseMove: handleMove,
    onMouseLeave: handleLeave,
    "aria-label": ariaLabel,
    "data-cursor-label": cursorLabel,
    style: {
      transition: "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
      willChange: "transform",
    },
  };

  if (as === "a") {
    return (
      <a href={href} {...sharedProps} onClick={onClick}>
        {children}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} {...sharedProps}>
      {children}
    </button>
  );
}
