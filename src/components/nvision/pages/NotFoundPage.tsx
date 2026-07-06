"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "../router";
import { ArrowUpRight, Home } from "lucide-react";

export default function NotFoundPage() {
  const { navigate } = useRouter();
  const [glitch, setGlitch] = useState(false);

  useEffect(() => {
    const id = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 150);
    }, 3000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="page-enter min-h-[100svh] flex items-center justify-center px-6 lg:px-10 pt-32 pb-20 relative overflow-hidden">
      {/* Background aurora */}
      <div
        className="absolute inset-0 pointer-events-none opacity-60"
        style={{
          background:
            "radial-gradient(circle at 30% 30%, rgba(139,92,246,0.3), transparent 50%), radial-gradient(circle at 70% 70%, rgba(236,72,153,0.25), transparent 50%)",
        }}
      />

      <div className="relative text-center max-w-3xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className={`font-display text-[clamp(8rem,30vw,20rem)] font-semibold tracking-tight leading-none ${
            glitch ? "text-aurora-static" : "text-white"
          }`}
          style={
            glitch
              ? {
                  textShadow:
                    "3px 0 #EC4899, -3px 0 #06B6D4, 0 0 60px rgba(196,181,253,0.5)",
                }
              : undefined
          }
        >
          404
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <h1 className="font-display text-3xl sm:text-5xl font-semibold tracking-tight mt-4">
            This page wandered off.
          </h1>
          <p className="mt-4 text-base text-muted-foreground max-w-md mx-auto">
            The URL you tried doesn't exist. It might have moved, been
            redesigned, or never existed at all. Either way — let's get you
            back.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => navigate("home")}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-foreground text-background text-sm font-medium hover:opacity-90 transition-colors group"
              data-cursor-label="Home"
            >
              <Home className="w-4 h-4" />
              <span>Back to home</span>
            </button>
            <button
              onClick={() => navigate("portfolio")}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass text-sm font-medium hover:bg-foreground/10 transition-colors group"
            >
              <span>See the work</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>

          {/* Easter egg hint */}
          <p className="mt-16 text-xs text-muted-foreground/60 font-mono-tight">
            {"// Tip: try the konami code for a surprise ↑↑↓↓←→←→ B A"}
          </p>
        </motion.div>
      </div>
    </div>
  );
}
