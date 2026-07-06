"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Interactable node-graph canvas. Floating "code node" circles drift around;
 * when the user moves their cursor near them, lines connect to nearby nodes
 * (showing the constellation). Clicking creates a pulse that pushes nodes
 * outward briefly. Designed to feel like a code graph / network diagram.
 *
 * This is a SECTION (not full-screen) so it doesn't fight the main aurora bg.
 * Mount it where you want users to "play" with it.
 */
interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  label: string;
  pulse: number;
}

const CODE_LABELS = [
  "{ }", "</>", "()", "[]", "=>", "fn", "const", "let",
  "if", "for", "&&", "||", "=>", "...", "?:", "new",
  "class", "import", "async", "await", "return", "void", "this",
];

const NODE_COUNT = 22;
const CONNECT_DIST = 180;
const MOUSE_DIST = 220;

export default function NodeGraphPlayground({
  className = "",
  height = 420,
}: {
  className?: string;
  height?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [hint, setHint] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const container = containerRef.current!;
    const ctx = canvas.getContext("2d")!;
    let raf = 0;
    let w = 0;
    let h = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      w = container.clientWidth;
      h = container.clientHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    // Initialize nodes
    const nodes: Node[] = Array.from({ length: NODE_COUNT }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: 18 + Math.random() * 10,
      label: CODE_LABELS[Math.floor(Math.random() * CODE_LABELS.length)],
      pulse: Math.random() * Math.PI * 2,
    }));

    let mouseX = -1000;
    let mouseY = -1000;
    let mouseDown = false;
    const pulses: { x: number; y: number; t: number }[] = [];

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
      if (hint) setHint(false);
    };
    const onLeave = () => {
      mouseX = -1000;
      mouseY = -1000;
    };
    const onDown = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      pulses.push({ x: e.clientX - rect.left, y: e.clientY - rect.top, t: 0 });
      mouseDown = true;
    };
    const onUp = () => {
      mouseDown = false;
    };

    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("mouseleave", onLeave);
    canvas.addEventListener("mousedown", onDown);
    canvas.addEventListener("mouseup", onUp);
    // Touch support
    canvas.addEventListener(
      "touchmove",
      (e: TouchEvent) => {
        const rect = canvas.getBoundingClientRect();
        mouseX = e.touches[0].clientX - rect.left;
        mouseY = e.touches[0].clientY - rect.top;
        if (hint) setHint(false);
      },
      { passive: true }
    );
    canvas.addEventListener("touchstart", (e: TouchEvent) => {
      const rect = canvas.getBoundingClientRect();
      pulses.push({
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top,
        t: 0,
      });
    });

    const render = () => {
      ctx.clearRect(0, 0, w, h);

      // Update + apply pulses
      for (let i = pulses.length - 1; i >= 0; i--) {
        const p = pulses[i];
        p.t += 0.02;
        const radius = p.t * 200;
        const alpha = Math.max(0, 1 - p.t);
        ctx.beginPath();
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(56, 189, 248, ${alpha * 0.5})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
        if (p.t > 1) pulses.splice(i, 1);
      }

      // Update nodes
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        n.pulse += 0.03;

        // Bounce off edges
        if (n.x < n.r) { n.x = n.r; n.vx *= -1; }
        if (n.x > w - n.r) { n.x = w - n.r; n.vx *= -1; }
        if (n.y < n.r) { n.y = n.r; n.vy *= -1; }
        if (n.y > h - n.r) { n.y = h - n.r; n.vy *= -1; }

        // Apply pulse push
        for (const p of pulses) {
          const dx = n.x - p.x;
          const dy = n.y - p.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          const ringR = p.t * 200;
          if (Math.abs(d - ringR) < 60) {
            const push = (1 - p.t) * 0.6;
            n.vx += (dx / (d || 1)) * push;
            n.vy += (dy / (d || 1)) * push;
          }
        }

        // Mouse attraction (gentle pull)
        const dx = mouseX - n.x;
        const dy = mouseY - n.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MOUSE_DIST) {
          const force = (1 - dist / MOUSE_DIST) * 0.08;
          n.vx += (dx / (dist || 1)) * force;
          n.vy += (dy / (dist || 1)) * force;
        }

        // Damping
        n.vx *= 0.985;
        n.vy *= 0.985;

        // Min velocity so they never freeze
        const speed = Math.sqrt(n.vx * n.vx + n.vy * n.vy);
        if (speed < 0.05) {
          n.vx += (Math.random() - 0.5) * 0.1;
          n.vy += (Math.random() - 0.5) * 0.1;
        }
      }

      // Draw connections between nearby nodes
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < CONNECT_DIST) {
            const alpha = (1 - d / CONNECT_DIST) * 0.35;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(56, 189, 248, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
        // Also draw line from cursor to nearest nodes
        const a = nodes[i];
        const dx = mouseX - a.x;
        const dy = mouseY - a.y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < MOUSE_DIST) {
          const alpha = (1 - d / MOUSE_DIST) * 0.6;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(mouseX, mouseY);
          ctx.strokeStyle = `rgba(103, 232, 249, ${alpha})`;
          ctx.lineWidth = 1.2;
          ctx.stroke();
        }
      }

      // Draw nodes
      for (const n of nodes) {
        const pulseR = n.r + Math.sin(n.pulse) * 1.5;
        // Glow
        const gradient = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, pulseR * 2);
        gradient.addColorStop(0, "rgba(56, 189, 248, 0.4)");
        gradient.addColorStop(1, "rgba(56, 189, 248, 0)");
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(n.x, n.y, pulseR * 2, 0, Math.PI * 2);
        ctx.fill();

        // Core
        ctx.beginPath();
        ctx.arc(n.x, n.y, pulseR, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(8, 12, 24, 0.9)";
        ctx.fill();
        ctx.strokeStyle = "rgba(103, 232, 249, 0.7)";
        ctx.lineWidth = 1.2;
        ctx.stroke();

        // Label
        ctx.fillStyle = "rgba(186, 230, 253, 0.95)";
        ctx.font = "10px 'JetBrains Mono', monospace";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(n.label, n.x, n.y);
      }

      // Cursor
      if (mouseX > -500) {
        ctx.beginPath();
        ctx.arc(mouseX, mouseY, 6, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(45, 212, 191, 0.9)";
        ctx.fill();
        ctx.beginPath();
        ctx.arc(mouseX, mouseY, 12, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(45, 212, 191, 0.4)";
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      raf = requestAnimationFrame(render);
    };
    raf = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mouseleave", onLeave);
      canvas.removeEventListener("mousedown", onDown);
      canvas.removeEventListener("mouseup", onUp);
      cancelAnimationFrame(raf);
    };
  }, [hint]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full rounded-3xl overflow-hidden ${className}`}
      style={{ height }}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 cursor-crosshair"
        style={{ width: "100%", height: "100%" }}
      />
      {hint && (
        <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full glass text-[10px] font-mono-tight uppercase tracking-wider text-muted-foreground pointer-events-none">
          <span className="inline-flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            Move your cursor — click to ripple
          </span>
        </div>
      )}
    </div>
  );
}
