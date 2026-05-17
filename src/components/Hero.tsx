"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import { useMousePosition } from "@/hooks/useMousePosition";
import { useIsMobile } from "@/hooks/useIsMobile";
import type { ShapeName } from "@/lib/shapes";

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

const SHAPES: { id: ShapeName; label: string; icon: string }[] = [
  { id: "sphere", label: "SPHERE", icon: "○" },
  { id: "torus",  label: "TORUS",  icon: "◎" },
  { id: "helix",  label: "HELIX",  icon: "∿" },
  { id: "galaxy", label: "GALAXY", icon: "✦" },
];

export default function Hero() {
  const mouse = useMousePosition();
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 520], [1, 0]);
  const isMobile = useIsMobile();
  const [shape, setShape] = useState<ShapeName>("sphere");
  const [menuOpen, setMenuOpen] = useState(false);
  const go = (id: string) => document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <motion.section style={{ position: "relative", height: "100vh", overflow: "hidden", opacity }}>

      {/* ── Full-screen 3D ── */}
      <div style={{ position: "absolute", inset: 0 }}>
        <Scene mouseX={mouse.normalizedX} mouseY={mouse.normalizedY} shape={shape} />
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

        {/* Shape selector */}
        {!isMobile && (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 8 }}>
            <span style={{ fontSize: 8, fontFamily: "Space Grotesk, sans-serif", letterSpacing: "0.3em", color: "rgba(255,255,255,0.2)" }}>
              PARTICLE FORM
            </span>
            <div style={{ display: "flex", gap: 5 }}>
              {SHAPES.map((s) => {
                const active = shape === s.id;
                return (
                  <motion.button
                    key={s.id}
                    onClick={() => setShape(s.id)}
                    style={{
                      display: "flex", alignItems: "center", gap: 5,
                      padding: "4px 10px", borderRadius: 3,
                      fontFamily: "Space Grotesk, sans-serif", fontSize: 8,
                      fontWeight: 700, letterSpacing: "0.18em",
                      border: active ? "1px solid rgba(255,255,255,0.45)" : "1px solid rgba(255,255,255,0.10)",
                      background: active ? "rgba(255,255,255,0.10)" : "rgba(255,255,255,0.02)",
                      color: active ? "#fff" : "rgba(255,255,255,0.32)",
                      cursor: "pointer",
                    }}
                    whileHover={{ background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.7)" }}
                    whileTap={{ scale: 0.94 }}
                    transition={{ duration: 0.15 }}
                  >
                    <span style={{ fontSize: 10, lineHeight: 1 }}>{s.icon}</span>
                    {s.label}
                    {active && (
                      <motion.span
                        layoutId="shape-indicator"
                        style={{
                          position: "absolute", inset: 0, borderRadius: 3,
                          border: "1px solid rgba(255,255,255,0.45)",
                          pointerEvents: "none",
                        }}
                      />
                    )}
                  </motion.button>
                );
              })}
            </div>
          </div>
        )}

        {/* Mobile: floating shape button */}
        {isMobile && (
          <div style={{ position: "relative" }}>
            <motion.button
              onClick={() => setMenuOpen(v => !v)}
              style={{
                padding: "5px 12px", borderRadius: 3,
                fontFamily: "Space Grotesk, sans-serif", fontSize: 8,
                fontWeight: 700, letterSpacing: "0.18em",
                border: "1px solid rgba(255,255,255,0.18)",
                background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.55)",
                cursor: "pointer",
              }}
              whileTap={{ scale: 0.94 }}
            >
              {SHAPES.find(s => s.id === shape)?.icon} FORM
            </motion.button>
            <AnimatePresence>
              {menuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 6 }}
                  style={{
                    position: "absolute", bottom: "calc(100% + 8px)", right: 0,
                    display: "flex", flexDirection: "column", gap: 4,
                    background: "rgba(0,0,0,0.88)", border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: 6, padding: 8, backdropFilter: "blur(12px)",
                  }}
                >
                  {SHAPES.map(s => (
                    <button key={s.id} onClick={() => { setShape(s.id); setMenuOpen(false); }}
                      style={{
                        display: "flex", alignItems: "center", gap: 8,
                        padding: "5px 12px", borderRadius: 3, whiteSpace: "nowrap",
                        fontFamily: "Space Grotesk, sans-serif", fontSize: 9,
                        fontWeight: 700, letterSpacing: "0.16em",
                        border: shape === s.id ? "1px solid rgba(255,255,255,0.35)" : "1px solid transparent",
                        background: shape === s.id ? "rgba(255,255,255,0.08)" : "transparent",
                        color: shape === s.id ? "#fff" : "rgba(255,255,255,0.45)",
                        cursor: "pointer",
                      }}>
                      <span>{s.icon}</span>{s.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

      </motion.div>


    </motion.section>
  );
}
