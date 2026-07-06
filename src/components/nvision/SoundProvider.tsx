"use client";

import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";

type SoundKind = "click" | "hover" | "transition" | "success" | "error" | "whoosh";

interface SoundContextValue {
  enabled: boolean;
  toggle: () => void;
  play: (kind?: SoundKind) => void;
}

const SoundContext = createContext<SoundContextValue | null>(null);

export function useSound() {
  const ctx = useContext(SoundContext);
  if (!ctx) throw new Error("useSound must be used within SoundProvider");
  return ctx;
}

/**
 * Sound system using Web Audio API — no audio files needed.
 * - Click: short tick
 * - Hover: subtle blip
 * - Transition: descending sweep
 * - Success: bright chord
 * - Whoosh: filtered noise sweep
 * - Ambient: slow evolving pad (very low volume)
 */
export function SoundProvider({ children }: { children: ReactNode }) {
  // Always start as false (matches SSR). Sync from localStorage after mount.
  const [enabled, setEnabled] = useState<boolean>(false);
  const ctxRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const ambientNodesRef = useRef<{ stop: () => void } | null>(null);

  // Sync from localStorage after hydration
  useEffect(() => {
    try {
      if (localStorage.getItem("nvision-sound") === "on") {
        setEnabled(true);
      }
    } catch (e) {
      // ignore
    }
  }, []);

  // Lazy-init audio context on first user gesture (required by browsers)
  const ensureContext = () => {
    if (ctxRef.current) return ctxRef.current;
    const Ctor =
      window.AudioContext ||
      (window as any).webkitAudioContext;
    if (!Ctor) return null;
    const ctx = new Ctor();
    const master = ctx.createGain();
    master.gain.value = 0.6;
    master.connect(ctx.destination);
    ctxRef.current = ctx;
    masterGainRef.current = master;
    return ctx;
  };

  // Start/stop ambient music when toggled
  useEffect(() => {
    if (enabled) {
      const ctx = ensureContext();
      if (!ctx) return;
      if (ctx.state === "suspended") ctx.resume();
      ambientNodesRef.current = startAmbient(ctx, masterGainRef.current!);
    } else {
      if (ambientNodesRef.current) {
        ambientNodesRef.current.stop();
        ambientNodesRef.current = null;
      }
    }
    localStorage.setItem("nvision-sound", enabled ? "on" : "off");
  }, [enabled]);

  const play = (kind: SoundKind = "click") => {
    if (!enabled) return;
    const ctx = ensureContext();
    if (!ctx || !masterGainRef.current) return;
    if (ctx.state === "suspended") ctx.resume();
    const now = ctx.currentTime;

    switch (kind) {
      case "click":
        playTick(ctx, masterGainRef.current, now, 880, 0.04);
        break;
      case "hover":
        playTick(ctx, masterGainRef.current, now, 1320, 0.018, 0.06);
        break;
      case "transition":
        playSweep(ctx, masterGainRef.current, now, 600, 200, 0.4);
        break;
      case "success":
        playChord(ctx, masterGainRef.current, now, [523, 659, 784], 0.4);
        break;
      case "error":
        playChord(ctx, masterGainRef.current, now, [220, 233], 0.3);
        break;
      case "whoosh":
        playWhoosh(ctx, masterGainRef.current, now);
        break;
    }
  };

  const toggle = () => setEnabled((e) => !e);

  return (
    <SoundContext.Provider value={{ enabled, toggle, play }}>
      {children}
    </SoundContext.Provider>
  );
}

/* ============ Synth helpers ============ */

function playTick(
  ctx: AudioContext,
  dest: GainNode,
  start: number,
  freq: number,
  duration: number,
  gain = 0.12
) {
  const osc = ctx.createOscillator();
  const g = ctx.createGain();
  osc.type = "sine";
  osc.frequency.setValueAtTime(freq, start);
  osc.frequency.exponentialRampToValueAtTime(freq * 0.5, start + duration);
  g.gain.setValueAtTime(0, start);
  g.gain.linearRampToValueAtTime(gain, start + 0.002);
  g.gain.exponentialRampToValueAtTime(0.001, start + duration);
  osc.connect(g);
  g.connect(dest);
  osc.start(start);
  osc.stop(start + duration + 0.05);
}

function playSweep(
  ctx: AudioContext,
  dest: GainNode,
  start: number,
  fromHz: number,
  toHz: number,
  duration: number
) {
  const osc = ctx.createOscillator();
  const g = ctx.createGain();
  const filter = ctx.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.setValueAtTime(2000, start);
  osc.type = "sawtooth";
  osc.frequency.setValueAtTime(fromHz, start);
  osc.frequency.exponentialRampToValueAtTime(toHz, start + duration);
  g.gain.setValueAtTime(0, start);
  g.gain.linearRampToValueAtTime(0.08, start + 0.05);
  g.gain.exponentialRampToValueAtTime(0.001, start + duration);
  osc.connect(filter);
  filter.connect(g);
  g.connect(dest);
  osc.start(start);
  osc.stop(start + duration + 0.05);
}

function playChord(
  ctx: AudioContext,
  dest: GainNode,
  start: number,
  freqs: number[],
  duration: number
) {
  freqs.forEach((f, i) => {
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(f, start + i * 0.04);
    g.gain.setValueAtTime(0, start + i * 0.04);
    g.gain.linearRampToValueAtTime(0.06, start + i * 0.04 + 0.02);
    g.gain.exponentialRampToValueAtTime(0.001, start + duration);
    osc.connect(g);
    g.connect(dest);
    osc.start(start + i * 0.04);
    osc.stop(start + duration + 0.05);
  });
}

function playWhoosh(ctx: AudioContext, dest: GainNode, start: number) {
  const dur = 0.6;
  const buffer = ctx.createBuffer(1, ctx.sampleRate * dur, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < data.length; i++) {
    data[i] = (Math.random() * 2 - 1) * (1 - i / data.length);
  }
  const src = ctx.createBufferSource();
  src.buffer = buffer;
  const filter = ctx.createBiquadFilter();
  filter.type = "bandpass";
  filter.Q.value = 1.5;
  filter.frequency.setValueAtTime(400, start);
  filter.frequency.exponentialRampToValueAtTime(4000, start + dur * 0.7);
  filter.frequency.exponentialRampToValueAtTime(200, start + dur);
  const g = ctx.createGain();
  g.gain.setValueAtTime(0, start);
  g.gain.linearRampToValueAtTime(0.12, start + 0.05);
  g.gain.exponentialRampToValueAtTime(0.001, start + dur);
  src.connect(filter);
  filter.connect(g);
  g.connect(dest);
  src.start(start);
  src.stop(start + dur + 0.05);
}

/**
 * Ambient evolving pad — three detuned oscillators with slow LFO on filter.
 * Returns a stop() function.
 */
function startAmbient(ctx: AudioContext, dest: GainNode) {
  const padGain = ctx.createGain();
  padGain.gain.value = 0.04;
  padGain.connect(dest);

  const filter = ctx.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.value = 2200; // brighter, more open
  filter.Q.value = 0.6;
  filter.connect(padGain);

  // LFO on filter cutoff for gentle movement
  const lfo = ctx.createOscillator();
  const lfoGain = ctx.createGain();
  lfo.frequency.value = 0.06; // slower, calmer
  lfoGain.gain.value = 400;
  lfo.connect(lfoGain);
  lfoGain.connect(filter.frequency);
  lfo.start();

  // Major chord pad — C major (C3, E3, G3) — bright, warm, calm
  const freqs = [130.81, 164.81, 196.0];
  const oscs = freqs.map((f, i) => {
    const o = ctx.createOscillator();
    o.type = "sine"; // all sine = softer, less harsh
    o.frequency.value = f;
    o.detune.value = (i - 1) * 4;
    o.connect(filter);
    o.start();
    return o;
  });

  // Add a high shimmer (G4) very quiet for sparkle
  const shimmer = ctx.createOscillator();
  const shimmerGain = ctx.createGain();
  shimmer.type = "sine";
  shimmer.frequency.value = 392.0;
  shimmerGain.gain.value = 0.012;
  shimmer.connect(shimmerGain);
  shimmerGain.connect(filter);
  shimmer.start();
  oscs.push(shimmer);

  // Gentle volume swell every ~16s (slower, less dramatic)
  let swellRaf = 0;
  const swell = () => {
    const now = ctx.currentTime;
    padGain.gain.cancelScheduledValues(now);
    padGain.gain.setValueAtTime(padGain.gain.value, now);
    padGain.gain.linearRampToValueAtTime(0.055, now + 5);
    padGain.gain.linearRampToValueAtTime(0.04, now + 10);
    swellRaf = window.setTimeout(swell, 16000);
  };
  swellRaf = window.setTimeout(swell, 8000);

  return {
    stop: () => {
      clearTimeout(swellRaf);
      // Fade out
      const now = ctx.currentTime;
      padGain.gain.cancelScheduledValues(now);
      padGain.gain.setValueAtTime(padGain.gain.value, now);
      padGain.gain.linearRampToValueAtTime(0, now + 0.6);
      setTimeout(() => {
        try {
          oscs.forEach((o) => o.stop());
          lfo.stop();
        } catch {}
      }, 700);
    },
  };
}
