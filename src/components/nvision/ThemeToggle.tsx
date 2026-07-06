"use client";

import { useTheme } from "./ThemeProvider";
import { Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useSyncExternalStore } from "react";

// Track mounted state without setState-in-effect
let mounted = false;
const subscribers = new Set<() => void>();
function subscribe(cb: () => void) {
  subscribers.add(cb);
  if (!mounted && typeof window !== "undefined") {
    mounted = true;
    // Notify on next tick
    queueMicrotask(() => subscribers.forEach((s) => s()));
  }
  return () => subscribers.delete(cb);
}
function getSnapshot() {
  return mounted;
}
function getServerSnapshot() {
  return false;
}

export default function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, toggle } = useTheme();
  const isMounted = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      data-cursor-label="Theme"
      className={`relative w-10 h-10 rounded-full navbar-solid flex items-center justify-center hover:scale-105 transition-transform overflow-hidden ${className}`}
    >
      {isMounted ? (
        <AnimatePresence mode="wait" initial={false}>
          {theme === "dark" ? (
            <motion.div
              key="moon"
              initial={{ y: 20, opacity: 0, rotate: -90 }}
              animate={{ y: 0, opacity: 1, rotate: 0 }}
              exit={{ y: -20, opacity: 0, rotate: 90 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <Moon className="w-4 h-4" />
            </motion.div>
          ) : (
            <motion.div
              key="sun"
              initial={{ y: 20, opacity: 0, rotate: -90 }}
              animate={{ y: 0, opacity: 1, rotate: 0 }}
              exit={{ y: -20, opacity: 0, rotate: 90 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <Sun className="w-4 h-4" />
            </motion.div>
          )}
        </AnimatePresence>
      ) : (
        <Moon className="w-4 h-4" />
      )}
    </button>
  );
}
