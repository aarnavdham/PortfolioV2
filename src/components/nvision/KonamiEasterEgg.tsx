"use client";

import { useEffect, useState } from "react";

/**
 * Konami code easter egg — typing the classic code triggers a screen flash
 * + floating NVISION logo rain for a few seconds.
 */
const KONAMI = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

export default function KonamiEasterEgg() {
  const [active, setActive] = useState(false);

  useEffect(() => {
    let buffer: string[] = [];
    const onKey = (e: KeyboardEvent) => {
      buffer.push(e.key);
      if (buffer.length > KONAMI.length) buffer.shift();
      if (buffer.join(",").toLowerCase() === KONAMI.join(",").toLowerCase()) {
        setActive(true);
        buffer = [];
        setTimeout(() => setActive(false), 6000);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  if (!active) return null;

  // Floating logos
  const items = Array.from({ length: 40 });
  return (
    <div className="fixed inset-0 z-[400] pointer-events-none overflow-hidden">
      {items.map((_, i) => {
        const left = Math.random() * 100;
        const delay = Math.random() * 2;
        const duration = 3 + Math.random() * 3;
        const size = 12 + Math.random() * 32;
        return (
          <div
            key={i}
            className="absolute -top-20"
            style={{
              left: `${left}%`,
              animation: `konami-fall ${duration}s linear ${delay}s forwards`,
            }}
          >
            <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
              <path
                d="M14 14 L14 66 L26 66 L26 38 L54 66 L66 66 L66 14 L54 14 L54 42 L26 14 Z"
                fill="url(#konamiGrad)"
              />
              <defs>
                <linearGradient
                  id="konamiGrad"
                  x1="0"
                  y1="0"
                  x2="80"
                  y2="80"
                >
                  <stop stopColor="#67e8f9" />
                  <stop offset="0.5" stopColor="#38bdf8" />
                  <stop offset="1" stopColor="#2dd4bf" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        );
      })}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at center, transparent 0%, rgba(56,189,248,0.18) 50%, transparent 80%)",
          animation: "konami-flash 1.5s ease-out forwards",
        }}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-display text-6xl sm:text-9xl text-aurora-static font-semibold tracking-tight"
        style={{ animation: "konami-text 3s ease-out forwards" }}
      >
        YOU FOUND US
      </div>
      <style jsx>{`
        @keyframes konami-fall {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(110vh) rotate(720deg);
            opacity: 0;
          }
        }
        @keyframes konami-flash {
          0% {
            opacity: 1;
          }
          100% {
            opacity: 0;
          }
        }
        @keyframes konami-text {
          0% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.5);
          }
          20% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
          }
          80% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
          }
          100% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(1.2);
          }
        }
      `}</style>
    </div>
  );
}
