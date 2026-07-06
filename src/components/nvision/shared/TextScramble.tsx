"use client";

import { useEffect, useRef, useState } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789{}()[]<>/\\";

/**
 * TextScramble — text scrambles through random characters before settling.
 * Triggers when scrolled into view.
 */
export default function TextScramble({
  text,
  className = "",
  duration = 800,
}: {
  text: string;
  className?: string;
  duration?: number;
}) {
  const [display, setDisplay] = useState(text);
  const ref = useRef<HTMLSpanElement>(null);
  const startedRef = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !startedRef.current) {
            startedRef.current = true;
            const start = performance.now();
            const tick = (now: number) => {
              const progress = Math.min((now - start) / duration, 1);
              const scrambled = text
                .split("")
                .map((char, i) => {
                  if (char === " ") return " ";
                  if (progress * text.length > i) {
                    return text[i];
                  }
                  return CHARS[Math.floor(Math.random() * CHARS.length)];
                })
                .join("");
              setDisplay(scrambled);
              if (progress < 1) {
                requestAnimationFrame(tick);
              } else {
                setDisplay(text);
              }
            };
            requestAnimationFrame(tick);
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [text, duration]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
