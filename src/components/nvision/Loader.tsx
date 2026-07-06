"use client";

import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";

export default function Loader({ onComplete }: { onComplete?: () => void }) {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += 5;
      setProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setDone(true);
          onComplete?.();
          (window as any).__nvisionLoaded = true;
          window.dispatchEvent(new Event("nvision-loaded"));
        }, 400);
      }
    }, 110);
    return () => clearInterval(interval);
  }, [onComplete]);

  if (done) return null;

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-[300] flex flex-col items-center justify-center"
        style={{ background: "var(--background)" }}
        data-loader
      >
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{
            background: "linear-gradient(90deg, transparent, #22D3EE, #3B82F6, #2DD4BF, transparent)",
            transform: `scaleX(${progress / 100})`,
            transformOrigin: "left",
          }}
        />
        <div className="flex flex-col items-center gap-10 px-8">
          <svg width="72" height="72" viewBox="0 0 80 80" fill="none">
            <path
              d="M14 14 L14 66 L26 66 L26 38 L54 66 L66 66 L66 14 L54 14 L54 42 L26 14 Z"
              fill="url(#loaderGrad)"
            />
            <defs>
              <linearGradient id="loaderGrad" x1="0" y1="0" x2="80" y2="80">
                <stop stopColor="#67e8f9" />
                <stop offset="0.5" stopColor="#38bdf8" />
                <stop offset="1" stopColor="#2dd4bf" />
              </linearGradient>
            </defs>
          </svg>
          <div className="flex flex-col items-center gap-2.5">
            <div className="font-display text-3xl tracking-tight" style={{ color: "var(--foreground)" }}>
              NVISION
            </div>
            <div
              className="font-mono-tight text-[10px] uppercase tracking-[0.4em]"
              style={{ color: "color-mix(in oklch, var(--foreground) 40%, transparent)" }}
            >
              Creative Digital Studio
            </div>
          </div>
          <div className="flex flex-col items-center gap-3 w-64">
            <div className="flex items-baseline gap-2">
              <span className="font-display text-5xl tabular-nums" style={{ color: "var(--foreground)" }}>
                {String(progress).padStart(3, "0")}
              </span>
              <span
                className="font-mono-tight text-xs"
                style={{ color: "color-mix(in oklch, var(--foreground) 40%, transparent)" }}
              >
                %
              </span>
            </div>
            <div
              className="w-full h-px overflow-hidden"
              style={{ background: "color-mix(in oklch, var(--foreground) 10%, transparent)" }}
            >
              <div
                style={{
                  width: `${progress}%`,
                  height: "100%",
                  background: "linear-gradient(90deg, #22D3EE, #3B82F6, #2DD4BF)",
                }}
              />
            </div>
          </div>
        </div>
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 font-mono-tight text-[10px] uppercase tracking-[0.3em]"
          style={{ color: "color-mix(in oklch, var(--foreground) 30%, transparent)" }}
        >
          Calibrating experience
        </div>
      </div>
    </AnimatePresence>
  );
}
