"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
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
        position: "relative", overflow: "hidden", borderRadius: 999,
        padding: "15px 32px", fontSize: 10,
        fontFamily: "Plus Jakarta Sans, sans-serif", fontWeight: 700,
        letterSpacing: "0.22em", textTransform: "uppercase" as const,
        background: primary ? "linear-gradient(180deg, #ffffff 0%, #c4c4c8 100%)" : "rgba(255,255,255,0.03)",
        border: primary ? "1px solid rgba(255,255,255,0.5)" : "1px solid rgba(255,255,255,0.10)",
        color: primary ? "#000" : "rgba(255,255,255,0.65)",
        boxShadow: primary
          ? "0 8px 24px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.8)"
          : "none",
        filter: primary && hov ? "brightness(1.08)" : "brightness(1)",
        transition: "filter 0.2s",
        cursor: "none",
      }}
    >
      <span style={{ position: "relative", zIndex: 1 }}>{children}</span>
    </motion.button>
  );
}


const HEADLINE = [
  { text: "Design",       color: "#fff",                   delay: 0.55 },
  { text: "That Ships.",  color: "rgba(255,255,255,0.55)", delay: 0.78 },
];

const LATEST = {
  title: "Anharu Mitra",
  category: "Web · Corporate",
  image: "/images/projects/anharumitra.jpg",
  url: "https://anharumitra.com/en",
};

const SOCIALS = [
  { name: "GitHub",   logo: "/images/social/github.svg",   href: "https://github.com/rosyadzainn" },
  { name: "LinkedIn", logo: "/images/social/linkedin.svg", href: "https://www.linkedin.com/in/rosyadzain/" },
  { name: "TikTok",   logo: "/images/social/tiktok.svg",   href: "https://www.tiktok.com/@rosyadzainn" },
  { name: "WhatsApp", logo: "/images/social/whatsapp.svg", href: "https://wa.me/6282242035628" },
];

function SocialIcons() {
  return (
    <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginBottom: 14 }}>
      {SOCIALS.map((s) => (
        <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer" data-hover="true" aria-label={s.name}
          style={{
            width: 34, height: 34, borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center",
            border: "1px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.04)",
            transition: "border-color 0.2s, background 0.2s",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.4)"; e.currentTarget.style.background = "rgba(255,255,255,0.1)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)"; e.currentTarget.style.background = "rgba(255,255,255,0.04)"; }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={s.logo} alt={s.name} style={{ width: 15, height: 15, opacity: 0.85 }} />
        </a>
      ))}
    </div>
  );
}

function FeaturedCard() {
  const ref = useRef<HTMLAnchorElement>(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const [hov, setHov] = useState(false);
  return (
    <motion.div
      style={{ position: "absolute", right: "19%", bottom: "21%", zIndex: 10, perspective: 900 }}
      initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.8, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <SocialIcons />
      <a
        ref={ref}
        href={LATEST.url} target="_blank" rel="noopener noreferrer" data-hover="true"
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => { setHov(false); setTilt({ rx: 0, ry: 0 }); }}
        onMouseMove={(e) => {
          const r = ref.current?.getBoundingClientRect();
          if (!r) return;
          const px = (e.clientX - r.left) / r.width - 0.5;
          const py = (e.clientY - r.top) / r.height - 0.5;
          setTilt({ rx: -py * 11, ry: px * 13 });
        }}
        style={{
          display: "block", width: 290, padding: 16, borderRadius: 18, textDecoration: "none",
          border: `1px solid ${hov ? "rgba(255,255,255,0.28)" : "rgba(255,255,255,0.10)"}`,
          background: "linear-gradient(180deg, rgba(30,30,32,0.65) 0%, rgba(12,12,14,0.65) 100%)",
          backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)",
          boxShadow: hov ? "0 28px 64px rgba(0,0,0,0.55)" : "0 16px 40px rgba(0,0,0,0.45)",
          transformStyle: "preserve-3d",
          transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
          transition: "transform 0.15s ease-out, border-color 0.25s, box-shadow 0.25s",
        }}
      >
        {/* Header row */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
          <span style={{ fontSize: 14, fontFamily: "Plus Jakarta Sans, sans-serif", fontWeight: 700, color: "#fff", letterSpacing: "0.01em" }}>Featured</span>
          <span style={{ fontSize: 13, fontFamily: "Plus Jakarta Sans, sans-serif", fontWeight: 500, color: "rgba(255,255,255,0.45)" }}>{LATEST.title}</span>
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: "rgba(255,255,255,0.10)", marginBottom: 14 }} />

        {/* Image */}
        <div style={{ position: "relative", borderRadius: 12, overflow: "hidden", aspectRatio: "16 / 11", border: "1px solid rgba(255,255,255,0.06)", transform: "translateZ(30px)" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={LATEST.image} alt={LATEST.title} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 60%, rgba(0,0,0,0.45) 100%)" }} />
          <span style={{ position: "absolute", left: 12, bottom: 10, fontSize: 10, fontFamily: "Plus Jakarta Sans, sans-serif", fontWeight: 600, letterSpacing: "0.04em", color: "rgba(255,255,255,0.75)" }}>
            {LATEST.category} ↗
          </span>
        </div>
      </a>
    </motion.div>
  );
}

export default function Hero() {
  const mouse = useMousePosition();
  const isMobile = useIsMobile();
  const { color: accentColor } = useAccentColor();
  const { t } = useLanguage();
  const go = (id: string) => document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="hero" style={{ position: "relative", height: "100vh", overflow: "hidden", background: "linear-gradient(180deg, #1e1e1e 0%, #101010 26%, #040404 58%, #000000 100%)" }}>

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

      {/* ── Light from above (fades to black) ── */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none", zIndex: 3,
        background: "radial-gradient(ellipse 95% 60% at 50% -8%, rgba(255,255,255,0.30) 0%, rgba(255,255,255,0.12) 24%, rgba(255,255,255,0.035) 46%, transparent 60%)",
      }} />



{/* ── Main content ── */}
      <div style={{
        position: "absolute",
        left: isMobile ? "5%" : "19%",
        right: isMobile ? "5%" : "auto",
        bottom: isMobile ? "18%" : "21%",
        zIndex: 10,
        display: "flex", flexDirection: "column", gap: isMobile ? 16 : 22,
        maxWidth: isMobile ? "100%" : 760,
      }}>

        {/* Eyebrow — name + role */}
        <motion.div
          initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 6 }}
        >
          <span style={{
            width: 7, height: 7, borderRadius: "50%", flexShrink: 0,
            background: "#fff", boxShadow: "0 0 10px rgba(255,255,255,0.7)",
            animation: "pulse-glow 2s ease-in-out infinite",
          }} />
          <span style={{ fontSize: 12, fontFamily: "Plus Jakarta Sans, sans-serif", fontWeight: 600, letterSpacing: "0.22em", color: "rgba(255,255,255,0.6)" }}>
            ROSYAD ZAIN
          </span>
        </motion.div>

        {/* Headline — blur + rise reveal, line by line */}
        <h1 style={{ margin: 0, lineHeight: 1.08 }}>
          {HEADLINE.map(({ text, color, delay }) => (
            <motion.span
              key={text}
              style={{ display: "block", fontFamily: "Plus Jakarta Sans, sans-serif", fontWeight: 800, fontSize: "clamp(2.9rem, 5.6vw, 4.9rem)", color }}
              initial={{ opacity: 0, y: 40, filter: "blur(12px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ delay, duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
            >
              {text}
            </motion.span>
          ))}
        </h1>

        {/* Divider + subtitle */}
        <motion.div style={{ display: "flex", alignItems: "center", gap: 12 }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 1.28, duration: 0.7 }}>
          <div style={{ height: 1, width: 36, background: "linear-gradient(90deg, rgba(255,255,255,0.5), transparent)", flexShrink: 0 }} />
          <span style={{ fontSize: 14, fontFamily: "Plus Jakarta Sans, sans-serif", color: "rgba(255,255,255,0.4)", letterSpacing: "0.05em" }}>
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

      {/* ── Featured project (bottom-right) ── */}
      {!isMobile && <FeaturedCard />}

      {/* ── Scroll indicator ── */}
      {!isMobile && (
        <motion.div
          style={{
            position: "absolute", left: "50%", bottom: 28, zIndex: 10,
            display: "flex", flexDirection: "column", alignItems: "center", gap: 12,
            transform: "translateX(-50%)",
          }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 2.0, duration: 0.8 }}>

          <span style={{
            fontSize: 8, fontFamily: "Plus Jakarta Sans, sans-serif", fontWeight: 700,
            letterSpacing: "0.28em", color: "rgba(255,255,255,0.25)",
          }}>
            {t.hero.scroll}
          </span>

          {/* Animated line */}
          <div style={{ position: "relative", width: 1, height: 56, overflow: "hidden" }}>
            <div style={{ position: "absolute", inset: 0, background: "rgba(255,255,255,0.08)" }} />
            <motion.div
              style={{
                position: "absolute", left: 0, right: 0, height: 24,
                background: "linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.7) 50%, transparent 100%)",
              }}
              animate={{ y: [-24, 56] }}
              transition={{ duration: 1.6, ease: "linear", repeat: Infinity, repeatDelay: 0.4 }}
            />
          </div>
        </motion.div>
      )}



    </section>
  );
}
