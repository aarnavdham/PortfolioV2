"use client";

import { useEffect } from "react";
import { useSound } from "./SoundProvider";

/**
 * Wires global click/hover events to the sound system.
 * Must be rendered inside <SoundProvider>.
 */
export default function SoundBridge() {
  const { play, enabled } = useSound();

  useEffect(() => {
    if (!enabled) return; // only wire when sound is on (perf)

    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;
      const interactive = target.closest(
        'button, a, [role="button"], [data-sound]'
      );
      if (interactive) {
        play("click");
      }
    };

    let lastHoverTime = 0;
    const onHover = (e: MouseEvent) => {
      // Throttle hover sounds so they don't pile up
      const now = performance.now();
      if (now - lastHoverTime < 80) return;
      const target = e.target as HTMLElement;
      if (!target) return;
      const interactive = target.closest(
        'button, a, [role="button"], [data-sound]'
      );
      if (interactive) {
        lastHoverTime = now;
        play("hover");
      }
    };

    document.addEventListener("click", onClick, { passive: true });
    document.addEventListener("mouseover", onHover, { passive: true });

    return () => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("mouseover", onHover);
    };
  }, [enabled, play]);

  return null;
}
