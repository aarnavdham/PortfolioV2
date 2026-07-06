"use client";

import { useSound } from "./SoundProvider";
import { Volume2, VolumeX } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Floating sound toggle button — bottom-right, above the footer.
 * Shows animated equalizer bars when sound is on.
 */
export default function SoundToggle() {
  const { enabled, toggle } = useSound();

  return (
    <button
      onClick={toggle}
      aria-label={enabled ? "Mute sound" : "Enable sound"}
      data-cursor-label={enabled ? "Mute" : "Sound on"}
      className="fixed bottom-6 right-6 z-[120] w-12 h-12 rounded-full navbar-solid flex items-center justify-center hover:scale-105 transition-transform"
    >
      <AnimatePresence mode="wait">
        {enabled ? (
          <motion.div
            key="on"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            className="flex items-end gap-[2px] h-4"
          >
            <span className="sound-bar h-3" />
            <span className="sound-bar h-4" />
            <span className="sound-bar h-2.5" />
            <span className="sound-bar h-3.5" />
          </motion.div>
        ) : (
          <motion.div
            key="off"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
          >
            <VolumeX className="w-5 h-5" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tooltip */}
      <span className="absolute right-full mr-3 px-3 py-1.5 rounded-full navbar-solid text-[10px] font-mono-tight uppercase tracking-wider whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity">
        {enabled ? "Sound on" : "Sound off"}
      </span>
    </button>
  );
}
