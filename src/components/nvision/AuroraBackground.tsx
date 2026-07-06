"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Aurora background — fixed full-viewport canvas with drifting blue/cyan blobs
 * that subtly react to cursor position. Particles drift, and on click they
 * form a small constellation ripple.
 */
export default function AuroraBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let raf = 0;
    let w = 0;
    let h = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const PARTICLE_COUNT = window.innerWidth < 768 ? 30 : 60;
    const particles = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.15,
      vy: (Math.random() - 0.5) * 0.15,
      r: Math.random() * 1.4 + 0.3,
      a: Math.random() * 0.5 + 0.2,
      pulse: Math.random() * Math.PI * 2,
    }));

    let mouseX = w / 2;
    let mouseY = h / 2;
    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove, { passive: true });

    const render = () => {
      ctx.clearRect(0, 0, w, h);

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.pulse += 0.02;

        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10;
        if (p.y > h + 10) p.y = -10;

        const dx = mouseX - p.x;
        const dy = mouseY - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 200) {
          const force = (1 - dist / 200) * 0.04;
          p.x += dx * force;
          p.y += dy * force;
        }

        const alpha = p.a * (0.6 + Math.sin(p.pulse) * 0.4);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(186, 230, 253, ${alpha})`;
        ctx.fill();
      }

      raf = requestAnimationFrame(render);
    };
    raf = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  // Cursor parallax for aurora blobs
  useEffect(() => {
    const container = containerRef.current!;
    let raf = 0;
    let tx = 0;
    let ty = 0;
    let cx = 0;
    let cy = 0;

    const onMove = (e: MouseEvent) => {
      const x = e.clientX / window.innerWidth - 0.5;
      const y = e.clientY / window.innerHeight - 0.5;
      tx = x * 60;
      ty = y * 60;
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    const tick = () => {
      cx += (tx - cx) * 0.05;
      cy += (ty - cy) * 0.05;
      container.style.setProperty("--px", `${cx}px`);
      container.style.setProperty("--py", `${cy}px`);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="aurora-bg" ref={containerRef}>
      {/* Aurora blobs — blue/cyan/teal */}
      <div
        className="aurora-blob-el aurora-blob"
        style={{
          width: "60vw",
          height: "60vw",
          top: "-15vw",
          left: "-15vw",
          background:
            "radial-gradient(circle, rgba(34,211,238,0.55) 0%, transparent 70%)",
          transform: "translate(var(--px, 0), var(--py, 0))",
        }}
      />
      <div
        className="aurora-blob-el aurora-blob"
        style={{
          width: "55vw",
          height: "55vw",
          top: "30vh",
          right: "-15vw",
          background:
            "radial-gradient(circle, rgba(59,130,246,0.45) 0%, transparent 70%)",
          animationDelay: "-6s",
          transform: "translate(calc(-1 * var(--px, 0)), var(--py, 0))",
        }}
      />
      <div
        className="aurora-blob-el aurora-blob"
        style={{
          width: "50vw",
          height: "50vw",
          bottom: "-15vw",
          left: "20vw",
          background:
            "radial-gradient(circle, rgba(45,212,191,0.4) 0%, transparent 70%)",
          animationDelay: "-12s",
          transform: "translate(var(--px, 0), calc(-1 * var(--py, 0)))",
        }}
      />

      <div
        className="absolute inset-0 grid-bg"
        style={{ opacity: 0.4, maskImage: "radial-gradient(ellipse at center, #000 0%, transparent 80%)" }}
      />

      <canvas
        ref={canvasRef}
        className="absolute inset-0"
        style={{ width: "100%", height: "100%" }}
      />

      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 30%, color-mix(in oklch, var(--background) 70%, transparent) 100%)",
        }}
      />
    </div>
  );
}
