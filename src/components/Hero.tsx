"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import dynamic from "next/dynamic";
import { useMousePosition } from "@/hooks/useMousePosition";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useAccentColor } from "@/hooks/useAccentColor";
import { useLanguage } from "@/context/LanguageContext";

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
  const { color: accentColor, glow: accentGlow } = useAccentColor();
  const { t } = useLanguage();
  const go = (id: string) => document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <motion.section id="hero" style={{ position: "relative", height: "100vh", overflow: "hidden", opacity }}>

      {/* ── Full-screen 3D ── */}
      <div style={{ position: "absolute", inset: 0 }}>
        <Scene mouseX={mouse.normalizedX} mouseY={mouse.normalizedY} shape="sphere" accentColor={accentColor} />
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
              background: accentColor, boxShadow: `0 0 8px ${accentGlow}`,
              animation: "pulse-glow 2s ease-in-out infinite",
            }} />
            <span style={{ fontSize: 9, fontFamily: "Space Grotesk, sans-serif", fontWeight: 700, letterSpacing: "0.3em", color: "rgba(255,255,255,0.55)" }}>
              {t.hero.badge}
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
            {t.hero.subtitle}
          </span>
        </motion.div>

        {/* Buttons */}
        <motion.div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.45, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}>
          <MagBtn onClick={() => go("#projects")} primary>{t.hero.cta1}</MagBtn>
        </motion.div>
      </div>

      {/* ── Scroll indicator ── */}
      {!isMobile && (
        <motion.div
          style={{
            position: "absolute", right: 36, top: "50%", zIndex: 10,
            display: "flex", flexDirection: "column", alignItems: "center", gap: 12,
            transform: "translateY(-50%)",
          }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 2.0, duration: 0.8 }}>

          {/* Animated line */}
          <div style={{ position: "relative", width: 1, height: 80, overflow: "hidden" }}>
            {/* Track */}
            <div style={{
              position: "absolute", inset: 0,
              background: "rgba(255,255,255,0.08)",
            }} />
            {/* Travelling light */}
            <motion.div
              style={{
                position: "absolute", left: 0, right: 0,
                height: 32,
                background: "linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.7) 50%, transparent 100%)",
              }}
              animate={{ y: [-32, 80] }}
              transition={{ duration: 1.6, ease: "linear", repeat: Infinity, repeatDelay: 0.4 }}
            />
          </div>

          <span style={{
            fontSize: 8, fontFamily: "Space Grotesk, sans-serif", fontWeight: 700,
            letterSpacing: "0.28em", color: "rgba(255,255,255,0.25)",
            writingMode: "vertical-rl", textOrientation: "mixed",
          }}>
            {t.hero.scroll}
          </span>
        </motion.div>
      )}



    </motion.section>
  );
}
