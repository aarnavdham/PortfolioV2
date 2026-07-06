"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Monitor, Tablet, Smartphone } from "lucide-react";

type Lang = "html" | "css" | "js";
type Device = "desktop" | "tablet" | "mobile";

interface Token { text: string; cls: string; }

const CODE: Record<Lang, string> = {
  html: `<section class="hero">
  <div class="hero-inner">
    <span class="eyebrow">Code & camera</span>
    <h1 class="title">We build
      <span class="accent">websites & films.</span>
    </h1>
    <p class="subtitle">
      A creative studio shipping
      premium sites and cinematic films.
    </p>
    <div class="cta-group">
      <button class="cta primary">See work</button>
      <button class="cta ghost">Start a project</button>
    </div>
    <div class="stats">
      <span>120+ sites</span>
      <span>85+ films</span>
    </div>
  </div>
</section>`,
  css: `.hero {
  min-height: 100vh;
  display: grid;
  place-items: center;
  background: linear-gradient(135deg, #0891b2, #1d4ed8);
  color: white;
  font-family: 'Space Grotesk', sans-serif;
}
.title {
  font-size: clamp(3rem, 10vw, 8rem);
  font-weight: 600;
  letter-spacing: -0.04em;
  line-height: 0.95;
}
.accent {
  background: linear-gradient(120deg, #67e8f9, #2dd4bf);
  -webkit-background-clip: text;
  color: transparent;
  font-style: italic;
}
.cta.primary {
  padding: 1rem 2rem;
  border-radius: 999px;
  background: white;
  color: #0891b2;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.3s ease;
}
.cta.primary:hover { transform: scale(1.03); }`,
  js: `const hero = document.querySelector('.hero');
const ctas = document.querySelectorAll('.cta');
let clicks = 0;

// Magnetic button effect
ctas.forEach((cta) => {
  cta.addEventListener('mousemove', (e) => {
    const r = cta.getBoundingClientRect();
    const x = e.clientX - r.left - r.width / 2;
    const y = e.clientY - r.top - r.height / 2;
    cta.style.transform = \`translate(\${x * 0.3}px, \${y * 0.3}px)\`;
  });
  cta.addEventListener('mouseleave', () => {
    cta.style.transform = '';
  });
  cta.addEventListener('click', () => {
    clicks++;
    console.log(\`Clicked \${clicks}x\`);
  });
});

// Parallax on scroll
window.addEventListener('scroll', () => {
  hero.style.setProperty('--offset', window.scrollY * 0.3 + 'px');
});`,
};

function tokenize(code: string, lang: Lang): Token[] {
  const tokens: Token[] = [];
  if (lang === "html") {
    const regex = /(<\/?[\w-]+)|([\w-]+)(=)("|')(?:[^"']*)("|')|(<!--[\s\S]*?-->)|([^<]+)/g;
    let m;
    while ((m = regex.exec(code)) !== null) {
      if (m[1]) tokens.push({ text: m[1], cls: "code-tag" });
      else if (m[2]) {
        tokens.push({ text: m[2], cls: "code-attr" });
        tokens.push({ text: m[3], cls: "code-punct" });
        tokens.push({ text: m[4], cls: "code-punct" });
        tokens.push({ text: m[5], cls: "code-string" });
        tokens.push({ text: m[6], cls: "code-punct" });
      } else if (m[7]) tokens.push({ text: m[7], cls: "code-comment" });
      else if (m[8]) tokens.push({ text: m[8], cls: "code-plain" });
    }
    return tokens;
  }
  if (lang === "css") {
    const regex = /(\/\*[\s\S]*?\*\/)|([.#]?[\w-]+)(\s*\{)|([a-z-]+)(\s*:)|([^{};:\/\n]+)|(;|\}|\{)|(\n)/g;
    let m;
    while ((m = regex.exec(code)) !== null) {
      if (m[1]) tokens.push({ text: m[1], cls: "code-comment" });
      else if (m[2]) { tokens.push({ text: m[2], cls: "code-selector" }); tokens.push({ text: m[3], cls: "code-punct" }); }
      else if (m[4]) { tokens.push({ text: m[4], cls: "code-property" }); tokens.push({ text: m[5], cls: "code-punct" }); }
      else if (m[6]) tokens.push({ text: m[6], cls: "code-string" });
      else if (m[7]) tokens.push({ text: m[7], cls: "code-punct" });
      else if (m[8]) tokens.push({ text: m[8], cls: "code-plain" });
    }
    return tokens;
  }
  const regex = /(\/\/.*$)|(`[^`]*`)|('[^']*'|"[^"]*")|(\b(?:const|let|var|function|return|if|else|for|while|async|await|new|class|import|export|from|default|true|false|null)\b)|(\b\d+\b)|(\b[A-Za-z_$][\w$]*\b)(?=\s*\()|([A-Za-z_$][\w$]*)|(\s+)|([^\s\w])/gm;
  let m;
  while ((m = regex.exec(code)) !== null) {
    if (m[1]) tokens.push({ text: m[1], cls: "code-comment" });
    else if (m[2] || m[3]) tokens.push({ text: m[2] || m[3], cls: "code-string" });
    else if (m[4]) tokens.push({ text: m[4], cls: "code-keyword" });
    else if (m[5]) tokens.push({ text: m[5], cls: "code-number" });
    else if (m[6]) tokens.push({ text: m[6], cls: "code-function" });
    else if (m[7]) tokens.push({ text: m[7], cls: "code-plain" });
    else if (m[8]) tokens.push({ text: m[8], cls: "code-plain" });
    else if (m[9]) tokens.push({ text: m[9], cls: "code-punct" });
  }
  return tokens;
}

/* ============== MINI WEBSITE ============== */
type MiniPage = "home" | "work" | "about" | "contact";

function MiniWebsite({ device }: { device: Device }) {
  const [page, setPage] = useState<MiniPage>("home");
  const [autoScroll, setAutoScroll] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollPct, setScrollPct] = useState(0);

  // Auto-scroll
  useEffect(() => {
    if (!autoScroll) return;
    const el = scrollRef.current;
    if (!el) return;
    let raf = 0;
    let dir = 1;
    let pauseTimer = 0;
    const tick = () => {
      if (!el) return;
      if (pauseTimer > 0) { pauseTimer--; }
      else {
        el.scrollTop += dir * 0.35;
        if (el.scrollTop > el.scrollHeight - el.clientHeight - 4) {
          dir = -1;
          pauseTimer = 30;
        }
        if (el.scrollTop < 4) { dir = 1; pauseTimer = 30; }
        const pct = el.scrollTop / Math.max(1, el.scrollHeight - el.clientHeight);
        setScrollPct(Math.max(0, Math.min(1, pct)));
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [autoScroll, page]);

  // Auto-cycle pages at EQUAL intervals (4s per page)
  useEffect(() => {
    if (!autoScroll) return;
    const pages: MiniPage[] = ["home", "work", "about", "contact"];
    const idx = pages.indexOf(page);
    const id = setTimeout(() => {
      setPage(pages[(idx + 1) % pages.length]);
    }, 4000);
    return () => clearTimeout(id);
  }, [page, autoScroll]);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
  }, [page]);

  // Scale content based on device
  const scale = device === "desktop" ? 1 : device === "tablet" ? 0.9 : 0.8;

  return (
    <div className="w-full h-full flex flex-col" style={{ background: "#04060d" }}>
      {/* Mini navbar */}
      <div
        className="flex items-center justify-between px-3 py-2 border-b flex-shrink-0"
        style={{ borderColor: "rgba(255,255,255,0.06)", background: "rgba(4,6,13,0.95)", backdropFilter: "blur(8px)" }}
      >
        <div className="flex items-center gap-1.5">
          <div style={{ width: "14px", height: "14px", borderRadius: "3px", background: "linear-gradient(135deg, #67e8f9, #38bdf8, #2dd4bf)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontSize: "8px", color: "#04060d", fontWeight: 700, fontFamily: "'Space Grotesk', sans-serif" }}>N</span>
          </div>
          <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "9px", fontWeight: 600, color: "#fff", letterSpacing: "-0.02em" }}>NVISION</span>
        </div>
        <div className="flex items-center gap-0.5">
          {(["home", "work", "about", "contact"] as MiniPage[]).map((p) => (
            <button
              key={p}
              onClick={() => { setPage(p); setAutoScroll(false); }}
              style={{
                padding: "2px 6px", borderRadius: "99px", fontSize: "7px",
                fontFamily: "'JetBrains Mono', monospace", textTransform: "uppercase" as const,
                letterSpacing: "0.05em", transition: "all 0.3s",
                background: page === p ? "rgba(255,255,255,0.95)" : "transparent",
                color: page === p ? "#04060d" : "rgba(255,255,255,0.5)",
              }}
            >{p}</button>
          ))}
        </div>
      </div>

      {/* Scrollable page */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-hidden relative"
        onMouseEnter={() => setAutoScroll(false)}
        style={{ transform: `scale(${scale})`, transformOrigin: "top center" }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={page}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {page === "home" && <MiniHome />}
            {page === "work" && <MiniWork />}
            {page === "about" && <MiniAbout />}
            {page === "contact" && <MiniContact />}
          </motion.div>
        </AnimatePresence>

        <div
          className="absolute top-2 right-1 bottom-2 w-0.5 rounded-full"
          style={{ background: "rgba(255,255,255,0.08)" }}
        >
          <div className="w-full rounded-full" style={{ height: `${scrollPct * 100}%`, background: "linear-gradient(180deg, #67e8f9, #38bdf8)", minHeight: "8px" }} />
        </div>
      </div>
    </div>
  );
}

function MiniHome() {
  return (
    <div style={{ padding: "14px" }}>
      <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "6px", color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: "6px" }}>[ 01 / Home ]</div>
      <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "20px", fontWeight: 600, color: "#fff", lineHeight: 0.95, letterSpacing: "-0.03em", marginBottom: "8px" }}>
        We build<br />
        <span style={{ background: "linear-gradient(120deg, #67e8f9, #38bdf8, #2dd4bf)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", fontStyle: "italic", fontWeight: 300 }}>websites & films.</span>
      </div>
      <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "7px", color: "rgba(255,255,255,0.5)", lineHeight: 1.4, marginBottom: "10px" }}>A creative studio shipping premium sites and films.</div>
      <div style={{ display: "inline-block", padding: "4px 10px", borderRadius: "99px", background: "#fff", color: "#04060d", fontFamily: "'JetBrains Mono', monospace", fontSize: "7px", fontWeight: 600, marginBottom: "12px" }}>See work →</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "5px", marginBottom: "12px" }}>
        {[{v:"120+",l:"sites"},{v:"85+",l:"films"},{v:"30+",l:"awards"}].map(s => (
          <div key={s.l} style={{ textAlign: "center", padding: "5px 3px", borderRadius: "5px", background: "rgba(255,255,255,0.04)" }}>
            <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "12px", fontWeight: 600, color: "#67e8f9" }}>{s.v}</div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "5px", color: "rgba(255,255,255,0.4)", textTransform: "uppercase" }}>{s.l}</div>
          </div>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4px" }}>
        {[{t:"Lumen",g:"linear-gradient(135deg,#3B82F6,#06B6D4)"},{t:"Aurora",g:"linear-gradient(135deg,#0EA5E9,#3B82F6)"},{t:"Nebula",g:"linear-gradient(135deg,#2DD4BF,#06B6D4)"},{t:"Atlas",g:"linear-gradient(135deg,#38BDF8,#3B82F6)"}].map(p => (
          <div key={p.t} style={{ borderRadius: "5px", overflow: "hidden", height: "32px", position: "relative", background: p.g }}>
            <div style={{ position: "absolute", bottom: "2px", left: "4px", fontFamily: "'Space Grotesk', sans-serif", fontSize: "7px", fontWeight: 600, color: "#fff" }}>{p.t}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MiniWork() {
  const projects = [
    { t: "Lumen Bank", c: "WEB · FINTECH", g: "linear-gradient(135deg,#3B82F6,#06B6D4)", m: "</>" },
    { t: "Aurora Film", c: "FILM · BRAND", g: "linear-gradient(135deg,#0EA5E9,#3B82F6)", m: "▶" },
    { t: "Nebula Viz", c: "WEB · MUSIC", g: "linear-gradient(135deg,#2DD4BF,#06B6D4)", m: "</>" },
    { t: "Atlas Film", c: "FILM · DOC", g: "linear-gradient(135deg,#38BDF8,#3B82F6)", m: "▶" },
    { t: "Verde", c: "WEB · SHOP", g: "linear-gradient(135deg,#2DD4BF,#06B6D4)", m: "</>" },
    { t: "Kinetic", c: "WEB · EVENT", g: "linear-gradient(135deg,#38BDF8,#3B82F6)", m: "</>" },
  ];
  return (
    <div style={{ padding: "14px" }}>
      <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "6px", color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: "4px" }}>[ 02 / Work ]</div>
      <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "15px", fontWeight: 600, color: "#fff", letterSpacing: "-0.03em", marginBottom: "8px" }}>Recent obsessions.</div>
      <div style={{ display: "flex", gap: "3px", marginBottom: "8px" }}>
        {["all","web","film"].map((f,i) => (
          <div key={f} style={{ padding: "2px 6px", borderRadius: "99px", fontFamily: "'JetBrains Mono', monospace", fontSize: "6px", textTransform: "uppercase", background: i===0?"rgba(255,255,255,0.9)":"rgba(255,255,255,0.06)", color: i===0?"#04060d":"rgba(255,255,255,0.5)" }}>{f}</div>
        ))}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
        {projects.map(p => (
          <div key={p.t} style={{ display: "flex", alignItems: "center", gap: "5px", padding: "4px", borderRadius: "5px", background: "rgba(255,255,255,0.04)" }}>
            <div style={{ width: "20px", height: "20px", borderRadius: "3px", background: p.g, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "7px", color: "#fff" }}>{p.m}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "5px", color: "rgba(255,255,255,0.4)", textTransform: "uppercase" }}>{p.c}</div>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "8px", fontWeight: 600, color: "#fff", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{p.t}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MiniAbout() {
  return (
    <div style={{ padding: "14px" }}>
      <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "6px", color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: "4px" }}>[ 03 / About ]</div>
      <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "15px", fontWeight: 600, color: "#fff", letterSpacing: "-0.03em", marginBottom: "6px", lineHeight: 1 }}>
        Seven<br />
        <span style={{ background: "linear-gradient(120deg, #67e8f9, #2dd4bf)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", fontStyle: "italic", fontWeight: 300 }}>obsessives.</span>
      </div>
      <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "6px", color: "rgba(255,255,255,0.5)", lineHeight: 1.4, marginBottom: "8px" }}>A studio building the unforgettable.</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4px", marginBottom: "8px" }}>
        {[{n:"Mira V.",r:"Creative Dir.",c:"#22D3EE"},{n:"Kenji O.",r:"Engineering",c:"#60A5FA"},{n:"Lina R.",r:"Motion",c:"#7DD3FC"},{n:"Adaeze O.",r:"Strategy",c:"#2DD4BF"}].map(m => (
          <div key={m.n} style={{ padding: "5px", borderRadius: "5px", background: "rgba(255,255,255,0.04)" }}>
            <div style={{ width: "16px", height: "16px", borderRadius: "50%", background: m.c, marginBottom: "3px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "7px", fontWeight: 700, color: "#04060d", fontFamily: "'Space Grotesk', sans-serif" }}>{m.n[0]}</div>
            <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "7px", fontWeight: 600, color: "#fff" }}>{m.n}</div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "5px", color: "rgba(255,255,255,0.4)", textTransform: "uppercase" }}>{m.r}</div>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
        {["Outcomes over outputs","Craft as advantage","Curiosity required"].map(v => (
          <div key={v} style={{ padding: "3px 5px", borderRadius: "3px", background: "rgba(255,255,255,0.03)", fontFamily: "'JetBrains Mono', monospace", fontSize: "6px", color: "rgba(255,255,255,0.6)" }}>✦ {v}</div>
        ))}
      </div>
    </div>
  );
}

function MiniContact() {
  return (
    <div style={{ padding: "14px" }}>
      <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "6px", color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: "4px" }}>[ 04 / Contact ]</div>
      <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "15px", fontWeight: 600, color: "#fff", letterSpacing: "-0.03em", marginBottom: "8px", lineHeight: 1 }}>
        Let's make<br />
        <span style={{ background: "linear-gradient(120deg, #67e8f9, #2dd4bf)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", fontStyle: "italic", fontWeight: 300 }}>something real.</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "3px", marginBottom: "6px" }}>
        <div style={{ height: "14px", borderRadius: "3px", background: "rgba(255,255,255,0.06)" }} />
        <div style={{ height: "14px", borderRadius: "3px", background: "rgba(255,255,255,0.06)" }} />
        <div style={{ height: "28px", borderRadius: "3px", background: "rgba(255,255,255,0.06)" }} />
      </div>
      <div style={{ height: "16px", borderRadius: "99px", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'JetBrains Mono', monospace", fontSize: "6px", fontWeight: 600, color: "#04060d", marginBottom: "8px" }}>Send →</div>
      <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "6px", color: "rgba(255,255,255,0.4)" }}>hello@nvision.studio</div>
        <div style={{ display: "flex", alignItems: "center", gap: "3px" }}>
          <div style={{ width: "4px", height: "4px", borderRadius: "50%", background: "#34d399" }} />
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "6px", color: "#34d399" }}>Open for Q4 2025</div>
        </div>
      </div>
    </div>
  );
}

/* ============== MAIN ============== */
export default function CodeTypewriter() {
  const [active, setActive] = useState<Lang>("html");
  const [typed, setTyped] = useState("");
  const [done, setDone] = useState(false);
  const [device, setDevice] = useState<Device>("desktop");
  const [reloadKey, setReloadKey] = useState(0);

  // Auto-cycle HTML → CSS → JS → repeat at equal intervals
  useEffect(() => {
    setTyped("");
    setDone(false);
    const code = CODE[active];
    let i = 0;
    // 25ms per char for readable speed
    const typeInterval = setInterval(() => {
      i++;
      setTyped(code.slice(0, i));
      if (i >= code.length) {
        clearInterval(typeInterval);
        setDone(true);
      }
    }, 25);

    // After typing + 2s pause, switch to next lang (equal intervals)
    const totalTime = code.length * 25 + 2000;
    const switchTimer = setTimeout(() => {
      const order: Lang[] = ["html", "css", "js"];
      const idx = order.indexOf(active);
      setActive(order[(idx + 1) % order.length]);
    }, totalTime);

    return () => {
      clearInterval(typeInterval);
      clearTimeout(switchTimer);
    };
  }, [active]);

  const tokens = tokenize(typed, active);
  const lineCount = typed.split("\n").length;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 w-full">
      {/* Code editor */}
      <div className="rounded-3xl overflow-hidden glass" style={{ background: "color-mix(in oklch, var(--card) 96%, transparent)" }}>
        <div className="flex items-center justify-between px-4 py-3 border-b" style={{ borderColor: "color-mix(in oklch, var(--foreground) 8%, transparent)" }}>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-400/80" />
            <span className="w-3 h-3 rounded-full bg-amber-400/80" />
            <span className="w-3 h-3 rounded-full bg-emerald-400/80" />
          </div>
          <div className="flex items-center gap-1">
            {(["html", "css", "js"] as Lang[]).map((lang) => (
              <button
                key={lang}
                onClick={() => setActive(lang)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono-tight transition-all ${
                  active === lang ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {lang === "html" ? "index.html" : lang === "css" ? "style.css" : "script.js"}
              </button>
            ))}
          </div>
        </div>
        <div className="relative p-4 overflow-x-auto" style={{ minHeight: "440px", maxHeight: "440px" }}>
          <div className="flex">
            <div className="flex-shrink-0 pr-4 text-right select-none font-mono-tight text-xs leading-6 text-muted-foreground/50">
              {Array.from({ length: Math.max(lineCount, 20) }, (_, i) => (<div key={i}>{i + 1}</div>))}
            </div>
            <pre className="flex-1 font-mono-tight text-xs leading-6 overflow-x-auto">
              <code>
                {tokens.map((tok, i) => (<span key={i} className={tok.cls}>{tok.text}</span>))}
                {!done && <span className="caret">&nbsp;</span>}
              </code>
            </pre>
          </div>
        </div>
        <div className="flex items-center justify-between px-4 py-2 border-t text-[10px] font-mono-tight uppercase tracking-wider text-muted-foreground" style={{ borderColor: "color-mix(in oklch, var(--foreground) 8%, transparent)" }}>
          <span>{active === "html" ? "HTML" : active === "css" ? "CSS" : "JavaScript"}</span>
          <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />auto-cycling</span>
        </div>
      </div>

      {/* Browser preview with device toggle */}
      <div className="rounded-3xl overflow-hidden glass" style={{ background: "color-mix(in oklch, var(--card) 96%, transparent)" }}>
        {/* Browser chrome */}
        <div className="flex items-center gap-2 px-4 py-3 border-b" style={{ borderColor: "color-mix(in oklch, var(--foreground) 8%, transparent)" }}>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-rose-400/80" />
            <span className="w-3 h-3 rounded-full bg-amber-400/80" />
            <span className="w-3 h-3 rounded-full bg-emerald-400/80" />
          </div>
          <button
            onClick={() => { setReloadKey(k => k + 1); }}
            className="ml-2 p-1 rounded text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Reload preview"
            title="Reload"
          >
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="hover:rotate-180 transition-transform duration-500">
              <path d="M23 4v6h-6" />
              <path d="M1 20v-6h6" />
              <path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" />
            </svg>
          </button>
          {/* URL bar */}
          <div className="flex-1 flex items-center gap-2 px-3 py-1.5 rounded-lg" style={{ background: "color-mix(in oklch, var(--foreground) 6%, transparent)" }}>
            <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-cyan-400"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0110 0v4" /></svg>
            <span className="font-mono-tight text-[10px] text-muted-foreground truncate">nvision.studio</span>
            <span className="ml-auto font-mono-tight text-[9px] text-emerald-400 flex items-center gap-1"><span className="w-1 h-1 rounded-full bg-emerald-400" />live</span>
          </div>
          {/* Device toggle */}
          <div className="flex items-center gap-0.5 p-0.5 rounded-lg" style={{ background: "color-mix(in oklch, var(--foreground) 6%, transparent)" }}>
            {([["desktop", Monitor], ["tablet", Tablet], ["mobile", Smartphone]] as [Device, typeof Monitor][]).map(([d, Icon]) => (
              <button
                key={d}
                onClick={() => setDevice(d)}
                className={`p-1.5 rounded transition-all ${device === d ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"}`}
                aria-label={d}
              >
                <Icon className="w-3 h-3" />
              </button>
            ))}
          </div>
        </div>

        {/* Mini website viewport — computer screen look */}
        <div className="relative p-4 flex items-center justify-center" style={{ height: "440px", background: "color-mix(in oklch, var(--foreground) 3%, transparent)" }}>
          {/* Screen bezel */}
          <div
            className="relative overflow-hidden"
            style={{
              width: device === "mobile" ? "160px" : device === "tablet" ? "280px" : "100%",
              height: "100%",
              background: "#04060d",
              borderRadius: "12px",
              border: "3px solid color-mix(in oklch, var(--foreground) 14%, transparent)",
              boxShadow: "0 8px 32px -8px rgba(0,0,0,0.4)",
            }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={active + device + reloadKey}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0"
              >
                <MiniWebsite device={device} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="flex items-center justify-between px-4 py-2 border-t text-[10px] font-mono-tight uppercase tracking-wider text-muted-foreground" style={{ borderColor: "color-mix(in oklch, var(--foreground) 8%, transparent)" }}>
          <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />rendering</span>
          <span>{device === "mobile" ? "375 × 667" : device === "tablet" ? "768 × 1024" : "1440 × 900"} · 60fps</span>
        </div>
      </div>
    </div>
  );
}
