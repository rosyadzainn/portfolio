"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import dynamic from "next/dynamic";
import { useMousePosition } from "@/hooks/useMousePosition";
import { useIsMobile } from "@/hooks/useIsMobile";

const Scene = dynamic(() => import("./3d/Scene"), {
  ssr: false,
  loading: () => null,
});

function MagBtn({ children, onClick, primary }: { children: React.ReactNode; onClick?: () => void; primary?: boolean }) {
  const ref = useRef<HTMLButtonElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hov, setHov] = useState(false);
  return (
    <motion.button
      ref={ref}
      onClick={onClick}
      onMouseMove={(e) => {
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        setPos({ x: (e.clientX - r.left - r.width / 2) * 0.3, y: (e.clientY - r.top - r.height / 2) * 0.3 });
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => { setPos({ x: 0, y: 0 }); setHov(false); }}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 200, damping: 22 }}
      data-hover="true"
      style={{
        position: "relative", overflow: "hidden", borderRadius: 2,
        padding: "11px 30px", fontSize: 10,
        fontFamily: "Space Grotesk, sans-serif", fontWeight: 700,
        letterSpacing: "0.22em", textTransform: "uppercase" as const,
        background: primary ? "#fff" : "rgba(255,255,255,0.03)",
        border: primary ? "1px solid rgba(255,255,255,0.9)" : "1px solid rgba(255,255,255,0.10)",
        color: primary ? "#000" : "rgba(255,255,255,0.65)",
        boxShadow: primary
          ? hov ? "0 0 32px rgba(255,255,255,0.35), 0 0 80px rgba(255,255,255,0.12)" : "0 0 16px rgba(255,255,255,0.15)"
          : "none",
        transition: "box-shadow 0.35s",
        cursor: "none",
      }}
    >
      {hov && primary && <span className="shimmer" style={{ position: "absolute", inset: 0 }} />}
      <span style={{ position: "relative", zIndex: 1 }}>{children}</span>
    </motion.button>
  );
}


const HEADLINE = [
  { text: "ROSYAD",  color: "#fff",                   delay: 0.55 },
  { text: "ZAIN.",   color: "rgba(255,255,255,0.55)", delay: 0.78 },
];

export default function Hero() {
  const mouse = useMousePosition();
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 520], [1, 0]);
  const isMobile = useIsMobile();
  const go = (id: string) => document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <motion.section style={{ position: "relative", height: "100vh", overflow: "hidden", opacity }}>

      {/* ── Full-screen 3D ── */}
      <div style={{ position: "absolute", inset: 0 }}>
        <Scene mouseX={mouse.normalizedX} mouseY={mouse.normalizedY} />
      </div>

      {/* ── Gradient overlays ── */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "linear-gradient(105deg, rgba(0,0,0,0.92) 22%, rgba(0,0,0,0.55) 52%, rgba(0,0,0,0.05) 100%)",
      }} />
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: "50%", pointerEvents: "none",
        background: "linear-gradient(0deg, rgba(0,0,0,0.97) 0%, rgba(0,0,0,0.65) 40%, transparent 100%)",
      }} />

      {/* ── Cinematic framing lines ── */}
      <motion.div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 1, zIndex: 30, pointerEvents: "none",
        background: "linear-gradient(90deg, transparent 5%, rgba(255,255,255,0.22) 25%, rgba(255,255,255,0.22) 75%, transparent 95%)",
      }}
        initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.3, duration: 1.4, ease: [0.22, 1, 0.36, 1] }} />
      <motion.div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: 1, zIndex: 30, pointerEvents: "none",
        background: "linear-gradient(90deg, transparent 5%, rgba(255,255,255,0.22) 25%, rgba(255,255,255,0.22) 75%, transparent 95%)",
      }}
        initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.3, duration: 1.4, ease: [0.22, 1, 0.36, 1] }} />


{/* ── Main content ── */}
      <div style={{
        position: "absolute",
        left: isMobile ? "5%" : "8%",
        right: isMobile ? "5%" : "auto",
        bottom: isMobile ? "18%" : "21%",
        zIndex: 10,
        display: "flex", flexDirection: "column", gap: isMobile ? 16 : 22,
        maxWidth: isMobile ? "100%" : 560,
      }}>

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "5px 14px", borderRadius: 2,
            border: "1px solid rgba(255,255,255,0.14)", background: "rgba(255,255,255,0.04)",
          }}>
            <span style={{
              display: "inline-block", width: 5, height: 5, borderRadius: "50%",
              background: "#22c55e", boxShadow: "0 0 8px #22c55e",
              animation: "pulse-glow 2s ease-in-out infinite",
            }} />
            <span style={{ fontSize: 9, fontFamily: "Space Grotesk, sans-serif", fontWeight: 700, letterSpacing: "0.3em", color: "rgba(255,255,255,0.55)" }}>
              AVAILABLE FOR WORK
            </span>
          </div>
        </motion.div>

        {/* Headline — blur focus-pull reveal, line by line */}
        <h1 style={{ margin: 0, lineHeight: 1.04 }}>
          {HEADLINE.map(({ text, color, delay }) => (
            <motion.span
              key={text}
              style={{ display: "block", fontFamily: "Exo 2, sans-serif", fontWeight: 800, fontSize: "clamp(2.5rem, 4.8vw, 4.1rem)", color }}
              initial={{ opacity: 0, y: 44, filter: "blur(14px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ delay, duration: 1.05, ease: [0.22, 1, 0.36, 1] }}
            >
              {text}
            </motion.span>
          ))}
        </h1>

        {/* Divider + subtitle */}
        <motion.div style={{ display: "flex", alignItems: "center", gap: 12 }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 1.28, duration: 0.7 }}>
          <div style={{ height: 1, width: 28, background: "linear-gradient(90deg, rgba(255,255,255,0.5), transparent)", flexShrink: 0 }} />
          <span style={{ fontSize: 11, fontFamily: "Space Grotesk, sans-serif", color: "rgba(255,255,255,0.32)", letterSpacing: "0.07em" }}>
            Creative Developer · Real-Time 3D Artist
          </span>
        </motion.div>

        {/* Buttons */}
        <motion.div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.45, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}>
          <MagBtn onClick={() => go("#projects")} primary>View Projects</MagBtn>
          {!isMobile && <MagBtn onClick={() => go("#about")}>Enter Experience</MagBtn>}
        </motion.div>
      </div>

      {/* ── Bottom bar ── */}
      <motion.div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 10,
        display: "flex", alignItems: "flex-end", justifyContent: "space-between",
        padding: "0 8% 38px",
      }}
        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.7, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>

        {/* Stats */}
        <div style={{ display: "flex", gap: 52 }}>
          {[["3+", "YEARS XP"], ["∞", "IDEAS"]].map(([v, l]) => (
            <div key={l} style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <span style={{ fontSize: 22, fontFamily: "Exo 2, sans-serif", fontWeight: 800, color: "#fff", lineHeight: 1 }}>{v}</span>
              <span style={{ fontSize: 8, fontFamily: "Space Grotesk, sans-serif", color: "rgba(255,255,255,0.22)", letterSpacing: "0.24em" }}>{l}</span>
            </div>
          ))}
        </div>

      </motion.div>

      {/* ── Scroll indicator: right edge (desktop only) ── */}
      <motion.div style={{
        position: "absolute", right: 28, top: "50%", transform: "translateY(-50%)",
        display: isMobile ? "none" : "flex", flexDirection: "column", alignItems: "center", gap: 10, zIndex: 10,
      }}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.2, duration: 0.8 }}>
        <div style={{ width: 1, height: 64, overflow: "hidden", background: "rgba(255,255,255,0.05)" }}>
          <motion.div
            style={{ width: "100%", height: "45%", background: "linear-gradient(180deg, rgba(255,255,255,0.5), transparent)" }}
            animate={{ y: ["0%", "230%"] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
        <span style={{
          fontSize: 8, fontFamily: "Space Grotesk, sans-serif", letterSpacing: "0.38em",
          color: "rgba(255,255,255,0.15)", writingMode: "vertical-rl" as const,
        }}>
          SCROLL
        </span>
      </motion.div>

    </motion.section>
  );
}
