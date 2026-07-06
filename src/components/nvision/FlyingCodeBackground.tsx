"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";

interface Token {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  text: string;
  size: number;
  pulse: number;
}

interface Link {
  id: number;
  a: number;
  b: number;
  born: number;
  ttl: number;
  via?: { x: number; y: number };
}

// Mix of short and long code snippets for variety
const CODE_TOKENS = [
  // short symbols
  "{}", "()", "[]", "=>", "&&", "||", "?:", "</>",
  "++", "--", "==", "!=", "<<", ">>", "**", "01",
  // medium keywords
  "if", "for", "let", "var", "new", "try", "fn", "return",
  "await", "async", "import", "export", "const", "class",
  // longer snippets
  "useState()", "useEffect()", "gsap.to()", "<Hero />",
  "framer-motion", "layoutId", "transform:", "@keyframes",
  "clip-path", "backdrop-filter", "will-change", "mix-blend",
  "document.querySelector", "addEventListener", "requestAnimationFrame",
];

const TOKEN_COUNT = 26;
const CONNECT_DIST = 170;
const CLICK_LINK_DIST = 280;

// Track client-ready state without setState-in-effect
let _clientReady = false;
const _readySubs = new Set<() => void>();
function _subscribeReady(cb: () => void) {
  _readySubs.add(cb);
  return () => _readySubs.delete(cb);
}
function _getReady() {
  return _clientReady;
}
function _getServerReady() {
  return false;
}

export default function FlyingCodeBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const tokensRef = useRef<Token[]>([]);
  const linksRef = useRef<Link[]>([]);
  const linkIdRef = useRef(0);
  const ready = useSyncExternalStore(_subscribeReady, _getReady, _getServerReady);

  // Initialize tokens in an effect (client-only) to avoid hydration mismatch
  // from Math.random() being called during render.
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (tokensRef.current.length > 0) return;
    const w = window.innerWidth;
    const h = Math.max(window.innerHeight, 600);
    const tokens: Token[] = Array.from({ length: TOKEN_COUNT }, (_, i) => ({
      id: i,
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.22,
      vy: (Math.random() - 0.5) * 0.22,
      text: CODE_TOKENS[i % CODE_TOKENS.length],
      size: 0.7 + Math.random() * 0.5,
      pulse: Math.random() * Math.PI * 2,
    }));
    tokensRef.current = tokens;

    const permLinks: Link[] = [];
    for (let i = 0; i < tokens.length; i++) {
      for (let j = i + 1; j < tokens.length; j++) {
        const dx = tokens[i].x - tokens[j].x;
        const dy = tokens[i].y - tokens[j].y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < CONNECT_DIST && Math.random() < 0.3) {
          permLinks.push({ id: linkIdRef.current++, a: i, b: j, born: 0, ttl: 0 });
        }
      }
    }
    linksRef.current = permLinks;
    _clientReady = true;
    _readySubs.forEach((s) => s());
  }, []);

  useEffect(() => {
    if (!ready || typeof window === "undefined") return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

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
    window.addEventListener("resize", resize);

    const render = () => {
      ctx.clearRect(0, 0, w, h);
      const arr = tokensRef.current;
      const links = linksRef.current;
      const now = performance.now();

      const isLight = document.documentElement.classList.contains("light");
      const tokenColor = isLight ? "59, 130, 246" : "186, 230, 253";
      const lineColor = isLight ? "14, 165, 233" : "103, 232, 249";
      const autoLineColor = isLight ? "59, 130, 246" : "148, 197, 253";

      for (const t of arr) {
        t.x += t.vx;
        t.y += t.vy;
        t.pulse += 0.012;

        const margin = 24;
        if (t.x < margin) { t.x = margin; t.vx = Math.abs(t.vx); }
        if (t.x > w - margin) { t.x = w - margin; t.vx = -Math.abs(t.vx); }
        if (t.y < 70) { t.y = 70; t.vy = Math.abs(t.vy); }
        if (t.y > h - margin) { t.y = h - margin; t.vy = -Math.abs(t.vy); }

        const speed = Math.sqrt(t.vx * t.vx + t.vy * t.vy);
        if (speed < 0.06) {
          t.vx += (Math.random() - 0.5) * 0.02;
          t.vy += (Math.random() - 0.5) * 0.02;
        }
        if (speed > 0.35) { t.vx *= 0.98; t.vy *= 0.98; }
      }

      linksRef.current = links.filter((l) =>
        l.ttl === 0 ? true : now - l.born < l.ttl
      );

      // Auto-links between close tokens
      for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {
          const dx = arr[i].x - arr[j].x;
          const dy = arr[i].y - arr[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 140) {
            const alpha = (1 - d / 140) * (isLight ? 0.18 : 0.12);
            ctx.beginPath();
            ctx.moveTo(arr[i].x, arr[i].y);
            ctx.lineTo(arr[j].x, arr[j].y);
            ctx.strokeStyle = `rgba(${autoLineColor}, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      // Explicit links
      for (const l of linksRef.current) {
        const a = arr[l.a];
        const b = arr[l.b];
        if (!a || !b) continue;

        const age = l.ttl === 0 ? 1 : Math.max(0, 1 - (now - l.born) / l.ttl);
        const alpha = l.ttl === 0 ? (isLight ? 0.25 : 0.18) : 0.6 * age;

        ctx.beginPath();
        if (l.via) {
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(l.via.x, l.via.y);
          ctx.lineTo(b.x, b.y);
        } else {
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
        }
        ctx.strokeStyle = `rgba(${lineColor}, ${alpha})`;
        ctx.lineWidth = l.via ? 1 : 0.7;
        ctx.stroke();

        if (l.via && l.ttl !== 0) {
          ctx.beginPath();
          ctx.arc(l.via.x, l.via.y, 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${lineColor}, ${alpha})`;
          ctx.fill();
        }
      }

      // Draw tokens
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      for (const t of arr) {
        const breathe = 0.65 + Math.sin(t.pulse) * 0.12;
        const fontSize = 10 * t.size;
        ctx.font = `${fontSize}px 'JetBrains Mono', monospace`;
        ctx.fillStyle = `rgba(${tokenColor}, ${(isLight ? 0.4 : 0.32) * breathe})`;
        ctx.fillText(t.text, t.x, t.y);
      }

      raf = requestAnimationFrame(render);
    };
    raf = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(raf);
    };
  }, [ready]);

  // Click handler — ONLY draws lines when clicking on empty space
  // (not on buttons, links, inputs, or other interactive elements)
  useEffect(() => {
    if (!ready || typeof window === "undefined") return;

    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      // Skip clicks on interactive elements
      if (
        target.closest(
          'button, a, input, textarea, select, [role="button"], [data-cursor-label], .glass, .glass-strong'
        )
      ) {
        return;
      }

      const x = e.clientX;
      const y = e.clientY;
      const arr = tokensRef.current;

      const nearby: { token: Token; dist: number }[] = [];
      for (const t of arr) {
        const dx = t.x - x;
        const dy = t.y - y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < CLICK_LINK_DIST) {
          nearby.push({ token: t, dist: d });
        }
      }

      if (nearby.length < 2) return;

      nearby.sort((a, b) => a.dist - b.dist);
      const top = nearby.slice(0, Math.min(3, nearby.length));

      const now = performance.now();
      for (let i = 0; i < top.length; i++) {
        for (let j = i + 1; j < top.length; j++) {
          linksRef.current.push({
            id: linkIdRef.current++,
            a: top[i].token.id,
            b: top[j].token.id,
            born: now,
            ttl: 3500,
            via: { x, y },
          });
        }
      }
    };

    window.addEventListener("click", onClick, { passive: true });
    return () => window.removeEventListener("click", onClick);
  }, [ready]);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none" aria-hidden>
      <div
        className="absolute aurora-blob-el aurora-blob"
        style={{
          width: "55vw", height: "55vw", top: "-15vw", left: "-15vw",
          background: "radial-gradient(circle, color-mix(in oklch, var(--aurora-cyan) 50%, transparent) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute aurora-blob-el aurora-blob"
        style={{
          width: "50vw", height: "50vw", top: "30vh", right: "-15vw",
          background: "radial-gradient(circle, color-mix(in oklch, var(--aurora-blue) 40%, transparent) 0%, transparent 70%)",
          animationDelay: "-6s",
        }}
      />
      <div
        className="absolute aurora-blob-el aurora-blob"
        style={{
          width: "45vw", height: "45vw", bottom: "-15vw", left: "20vw",
          background: "radial-gradient(circle, color-mix(in oklch, var(--aurora-teal) 35%, transparent) 0%, transparent 70%)",
          animationDelay: "-12s",
        }}
      />
      <div
        className="absolute inset-0 grid-bg"
        style={{
          opacity: 0.3,
          maskImage: "radial-gradient(ellipse at center, #000 0%, transparent 85%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, #000 0%, transparent 85%)",
        }}
      />
      <canvas ref={canvasRef} className="absolute inset-0" style={{ width: "100%", height: "100%" }} />
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at center, transparent 40%, color-mix(in oklch, var(--background) 60%, transparent) 100%)",
        }}
      />
    </div>
  );
}
