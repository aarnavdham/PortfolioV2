"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Film, Scissors, Palette, Music, Play, Pause } from "lucide-react";

type Tool = "cut" | "color" | "sound";

interface TimelineClip {
  id: number;
  track: number; // 0 = video, 1 = audio
  start: number; // 0-100 (% of timeline)
  width: number; // %
  label: string;
  color: string;
}

const TIMELINES: Record<Tool, TimelineClip[]> = {
  cut: [
    { id: 1, track: 0, start: 0, width: 18, label: "INT. ROOM — DAWN", color: "linear-gradient(90deg, #3B82F6, #06B6D4)" },
    { id: 2, track: 0, start: 19, width: 14, label: "EXT. STREET — DAY", color: "linear-gradient(90deg, #06B6D4, #2DD4BF)" },
    { id: 3, track: 0, start: 34, width: 22, label: "CU. HANDS", color: "linear-gradient(90deg, #2DD4BF, #38BDF8)" },
    { id: 4, track: 0, start: 57, width: 16, label: "WIDE. CITY", color: "linear-gradient(90deg, #38BDF8, #3B82F6)" },
    { id: 5, track: 0, start: 74, width: 25, label: "OUTRO — DUSK", color: "linear-gradient(90deg, #3B82F6, #06B6D4)" },
    { id: 6, track: 1, start: 0, width: 40, label: "AMBIENCE", color: "linear-gradient(90deg, #1e3a5f, #0e2a4a)" },
    { id: 7, track: 1, start: 41, width: 35, label: "SCORE — CELLO", color: "linear-gradient(90deg, #0e2a4a, #1e3a5f)" },
    { id: 8, track: 1, start: 77, width: 22, label: "VO", color: "linear-gradient(90deg, #1e3a5f, #0e2a4a)" },
  ],
  color: [
    { id: 1, track: 0, start: 0, width: 18, label: "BEFORE", color: "linear-gradient(90deg, #6b7280, #4b5563)" },
    { id: 2, track: 0, start: 19, width: 14, label: "BEFORE", color: "linear-gradient(90deg, #4b5563, #6b7280)" },
    { id: 3, track: 0, start: 34, width: 22, label: "AFTER", color: "linear-gradient(90deg, #3B82F6, #06B6D4)" },
    { id: 4, track: 0, start: 57, width: 16, label: "AFTER", color: "linear-gradient(90deg, #06B6D4, #2DD4BF)" },
    { id: 5, track: 0, start: 74, width: 25, label: "GRADE", color: "linear-gradient(90deg, #2DD4BF, #38BDF8)" },
  ],
  sound: [
    { id: 1, track: 0, start: 0, width: 100, label: "MASTER", color: "linear-gradient(90deg, #1e3a5f, #06B6D4, #1e3a5f)" },
    { id: 2, track: 1, start: 0, width: 30, label: "ROOM TONE", color: "linear-gradient(90deg, #1e3a5f, #0e2a4a)" },
    { id: 3, track: 1, start: 31, width: 28, label: "FOLEY", color: "linear-gradient(90deg, #0e2a4a, #1e3a5f)" },
    { id: 4, track: 1, start: 60, width: 18, label: "SCORE", color: "linear-gradient(90deg, #1e3a5f, #0e2a4a)" },
    { id: 5, track: 1, start: 79, width: 20, label: "VO + FX", color: "linear-gradient(90deg, #0e2a4a, #1e3a5f)" },
  ],
};

const TOOLS: { id: Tool; label: string; icon: typeof Film }[] = [
  { id: "cut", label: "Edit", icon: Scissors },
  { id: "color", label: "Color", icon: Palette },
  { id: "sound", label: "Sound", icon: Music },
];

/**
 * VideoTimelineTypewriter — the film equivalent of the CodeTypewriter.
 * Shows a video editing timeline that assembles clip by clip, with a
 * playhead that scrubs across. Switch between Edit / Color / Sound tabs.
 */
export default function VideoTimelineTypewriter() {
  const [tool, setTool] = useState<Tool>("cut");
  const [visibleClips, setVisibleClips] = useState<number>(0);
  const [playhead, setPlayhead] = useState(0);
  const [playing, setPlaying] = useState(true);
  const rafRef = useRef(0);

  // Reset + assemble clips when tool changes
  useEffect(() => {
    setVisibleClips(0);
    setPlayhead(0);
    const total = TIMELINES[tool].length;
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setVisibleClips(i);
      if (i >= total) clearInterval(interval);
    }, 280);
    return () => clearInterval(interval);
  }, [tool]);

  // Playhead animation
  useEffect(() => {
    if (!playing) return;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = now - last;
      last = now;
      setPlayhead((p) => {
        const next = p + dt / 80; // ~8s for full timeline
        return next > 100 ? 0 : next;
      });
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [playing]);

  const clips = TIMELINES[tool];
  const videoClips = clips.filter((c) => c.track === 0);
  const audioClips = clips.filter((c) => c.track === 1);

  return (
    <div className="rounded-3xl overflow-hidden glass" style={{ background: "color-mix(in oklch, var(--card) 96%, transparent)" }}>
      {/* Title bar */}
      <div className="flex items-center justify-between px-4 py-3 border-b" style={{ borderColor: "color-mix(in oklch, var(--foreground) 8%, transparent)" }}>
        <div className="flex items-center gap-2">
          <Film className="w-4 h-4 text-cyan-400" />
          <span className="font-mono-tight text-xs text-muted-foreground">aurora-launch-film.prproj</span>
        </div>
        <div className="flex items-center gap-1">
          {TOOLS.map((t) => {
            const Icon = t.icon;
            return (
              <button
                key={t.id}
                onClick={() => setTool(t.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono-tight transition-all flex items-center gap-1.5 ${
                  tool === t.id
                    ? "bg-foreground text-background"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon className="w-3 h-3" />
                {t.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Preview monitor */}
      <div className="relative aspect-video overflow-hidden" style={{ background: "#000" }}>
        <div
          className="absolute inset-0 transition-all duration-500"
          style={{
            background:
              tool === "cut"
                ? "linear-gradient(135deg, #1e3a5f 0%, #06B6D4 50%, #3B82F6 100%)"
                : tool === "color"
                ? playhead > 50
                ? "linear-gradient(135deg, #3B82F6 0%, #06B6D4 50%, #2DD4BF 100%)"
                : "linear-gradient(135deg, #4b5563 0%, #6b7280 50%, #4b5563 100%)"
                : "radial-gradient(circle at 50% 50%, #1e3a5f 0%, #000 80%)",
          }}
        />
        <div className="absolute inset-0 grain" />

        {/* Center play indicator */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            animate={{ scale: playing ? [1, 1.1, 1] : 1 }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-16 h-16 rounded-full glass-strong flex items-center justify-center"
          >
            {playing ? (
              <Pause className="w-6 h-6 text-white" />
            ) : (
              <Play className="w-6 h-6 text-white ml-1" />
            )}
          </motion.div>
        </div>

        {/* Timecode overlay */}
        <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-black/60 font-mono-tight text-[10px] text-cyan-300 tabular-nums">
          {formatTimecode(playhead)} / 00:00:08:00
        </div>
        <div className="absolute top-3 right-3 px-2.5 py-1 rounded-md bg-black/60 font-mono-tight text-[10px] text-white/70 uppercase tracking-wider">
          {tool === "cut" ? "Editing" : tool === "color" ? "Color Grade" : "Sound Mix"}
        </div>

        {/* Resolution badge */}
        <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded bg-black/60 font-mono-tight text-[9px] text-white/60">
          4K · 24fps
        </div>
      </div>

      {/* Timeline */}
      <div className="p-4 space-y-2">
        {/* Ruler */}
        <div className="relative h-4 mb-1">
          <div className="absolute inset-x-0 top-1/2 h-px" style={{ background: "color-mix(in oklch, var(--foreground) 10%, transparent)" }} />
          {[0, 25, 50, 75, 100].map((t) => (
            <div key={t} className="absolute top-0 flex flex-col items-center" style={{ left: `${t}%`, transform: "translateX(-50%)" }}>
              <div className="w-px h-2" style={{ background: "color-mix(in oklch, var(--foreground) 20%, transparent)" }} />
              <span className="font-mono-tight text-[8px] text-muted-foreground mt-0.5 tabular-nums">
                {formatTimecode(t)}
              </span>
            </div>
          ))}
          {/* Playhead */}
          <motion.div
            className="absolute top-0 bottom-0 w-px bg-cyan-400 z-10"
            style={{ left: `${playhead}%` }}
          >
            <div className="absolute -top-0.5 -left-1.5 w-3 h-3 rotate-45 bg-cyan-400" />
          </motion.div>
        </div>

        {/* Video track */}
        <div className="flex items-center gap-2">
          <span className="w-12 font-mono-tight text-[9px] uppercase tracking-wider text-muted-foreground flex-shrink-0">
            V1
          </span>
          <div className="relative flex-1 h-10 rounded-md overflow-hidden" style={{ background: "color-mix(in oklch, var(--foreground) 4%, transparent)" }}>
            <AnimatePresence>
              {videoClips.slice(0, visibleClips).map((clip, i) => (
                <motion.div
                  key={clip.id}
                  initial={{ opacity: 0, scaleX: 0.8, transformOrigin: "left" }}
                  animate={{ opacity: 1, scaleX: 1 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute top-0.5 bottom-0.5 rounded flex items-center px-2 overflow-hidden"
                  style={{
                    left: `${clip.start}%`,
                    width: `${clip.width}%`,
                    background: clip.color,
                  }}
                >
                  <span className="font-mono-tight text-[8px] text-white/90 whitespace-nowrap truncate">
                    {clip.label}
                  </span>
                </motion.div>
              ))}
            </AnimatePresence>
            {/* Playhead line through tracks */}
            <div
              className="absolute top-0 bottom-0 w-px bg-cyan-400 pointer-events-none z-20"
              style={{ left: `${playhead}%` }}
            />
          </div>
        </div>

        {/* Audio track */}
        <div className="flex items-center gap-2">
          <span className="w-12 font-mono-tight text-[9px] uppercase tracking-wider text-muted-foreground flex-shrink-0">
            A1
          </span>
          <div className="relative flex-1 h-10 rounded-md overflow-hidden" style={{ background: "color-mix(in oklch, var(--foreground) 4%, transparent)" }}>
            <AnimatePresence>
              {audioClips.slice(0, Math.max(0, visibleClips - videoClips.length)).map((clip) => (
                <motion.div
                  key={clip.id}
                  initial={{ opacity: 0, scaleX: 0.8, transformOrigin: "left" }}
                  animate={{ opacity: 1, scaleX: 1 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute top-0.5 bottom-0.5 rounded flex items-center px-2 overflow-hidden"
                  style={{
                    left: `${clip.start}%`,
                    width: `${clip.width}%`,
                    background: clip.color,
                  }}
                >
                  {/* Waveform mock */}
                  <div className="flex items-center gap-px h-full w-full overflow-hidden">
                    {Array.from({ length: Math.floor(clip.width / 1.5) }).map((_, i) => (
                      <div
                        key={i}
                        className="flex-1 bg-white/40 rounded-full"
                        style={{
                          height: `${30 + Math.sin(i * 0.7 + clip.id) * 25 + Math.random() * 20}%`,
                          minWidth: "1px",
                        }}
                      />
                    ))}
                  </div>
                  <span className="absolute font-mono-tight text-[8px] text-white/80 whitespace-nowrap pl-2">
                    {clip.label}
                  </span>
                </motion.div>
              ))}
            </AnimatePresence>
            <div
              className="absolute top-0 bottom-0 w-px bg-cyan-400 pointer-events-none z-20"
              style={{ left: `${playhead}%` }}
            />
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPlaying((p) => !p)}
              className="w-8 h-8 rounded-full bg-foreground text-background flex items-center justify-center hover:scale-105 transition-transform"
            >
              {playing ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
            </button>
            <span className="font-mono-tight text-[10px] text-muted-foreground">
              {playing ? "Playing" : "Paused"}
            </span>
          </div>
          <div className="flex items-center gap-3 text-[9px] font-mono-tight text-muted-foreground">
            <span>{videoClips.length + audioClips.length} clips</span>
            <span>·</span>
            <span>4K · ProRes 422</span>
            <span>·</span>
            <span>DaVinci Resolve</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function formatTimecode(percent: number): string {
  const totalSeconds = (percent / 100) * 8;
  const frames = Math.floor((totalSeconds % 1) * 24);
  const seconds = Math.floor(totalSeconds);
  return `00:00:${String(seconds).padStart(2, "0")}:${String(frames).padStart(2, "0")}`;
}
