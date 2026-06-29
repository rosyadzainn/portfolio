"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useIsMobile } from "@/hooks/useIsMobile";

const SKILLS = [
  "Product Design", "UI/UX Design", "Design Systems", "Prototyping",
  "Web Development", "Next.js / React", "Brand Identity", "Motion / 3D",
];

const TOOLS = [
  { name: "Figma",      logo: "/images/logos/figma.svg" },
  { name: "Claude",     logo: "/images/logos/claude.svg" },
  { name: "HTML",       logo: "/images/logos/html.svg" },
  { name: "CSS",        logo: "/images/logos/css.svg" },
  { name: "JavaScript", logo: "/images/logos/js.svg" },
  { name: "TypeScript", logo: "/images/logos/typescript.svg" },
  { name: "React",      logo: "/images/logos/react.svg" },
  { name: "Next.js",    logo: "/images/logos/nextjs.svg" },
  { name: "Tailwind",   logo: "/images/logos/tailwind.svg" },
];

function ToolItem({ tool, onHover }: { tool: { name: string; logo: string }; onHover: (h: boolean) => void }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      data-hover="true"
      onMouseEnter={() => { setHov(true); onHover(true); }}
      onMouseLeave={() => { setHov(false); onHover(false); }}
      style={{
        display: "flex", flexDirection: "column", alignItems: "center", gap: 12, flexShrink: 0,
        marginRight: 56, padding: "6px 0", whiteSpace: "nowrap",
        transform: hov ? "scale(1.18)" : "scale(1)",
        transition: "transform 0.28s cubic-bezier(0.22,1,0.36,1)",
      }}
    >
      <span style={{
        position: "relative", width: 52, height: 52, flexShrink: 0, display: "inline-block",
        filter: hov ? "drop-shadow(0 0 9px rgba(255,255,255,0.55))" : "none",
        transition: "filter 0.28s ease",
      }}>
        <Image src={tool.logo} alt={tool.name} fill sizes="52px" unoptimized style={{ objectFit: "contain" }} />
      </span>
      <span style={{
        fontSize: 12, fontFamily: "Plus Jakarta Sans, sans-serif", fontWeight: 500,
        color: hov ? "#fff" : "rgba(255,255,255,0.45)",
        textShadow: hov ? "0 0 9px rgba(255,255,255,0.35)" : "none",
        transition: "color 0.2s, text-shadow 0.2s",
      }}>
        {tool.name}
      </span>
    </div>
  );
}

function ToolsGroup({ onHover }: { onHover: (h: boolean) => void }) {
  return (
    <div style={{ display: "flex", flexShrink: 0 }}>
      {TOOLS.map((tool, i) => <ToolItem key={i} tool={tool} onHover={onHover} />)}
    </div>
  );
}

function ToolsMarquee() {
  const [paused, setPaused] = useState(false);
  return (
    <div style={{
      overflow: "hidden", width: "100%", padding: "26px 0",
      WebkitMaskImage: "linear-gradient(90deg, transparent, #000 4%, #000 96%, transparent)",
      maskImage: "linear-gradient(90deg, transparent, #000 4%, #000 96%, transparent)",
    }}>
      <div style={{
        display: "flex", width: "max-content",
        animation: "marquee 38s linear infinite",
        animationPlayState: paused ? "paused" : "running",
      }}>
        <ToolsGroup onHover={setPaused} />
        <ToolsGroup onHover={setPaused} />
        <ToolsGroup onHover={setPaused} />
        <ToolsGroup onHover={setPaused} />
      </div>
    </div>
  );
}

function SkillPill({ skill, onHover }: { skill: string; onHover: (h: boolean) => void }) {
  const [hov, setHov] = useState(false);
  return (
    <span
      data-hover="true"
      onMouseEnter={() => { setHov(true); onHover(true); }}
      onMouseLeave={() => { setHov(false); onHover(false); }}
      style={{
        flexShrink: 0, marginRight: 14, padding: "9px 18px", borderRadius: 999,
        border: `1px solid ${hov ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.12)"}`,
        background: "rgba(255,255,255,0.03)",
        fontSize: 13, fontFamily: "Plus Jakarta Sans, sans-serif",
        color: hov ? "#fff" : "rgba(255,255,255,0.6)",
        textShadow: hov ? "0 0 9px rgba(255,255,255,0.35)" : "none",
        transform: hov ? "scale(1.12)" : "scale(1)",
        transition: "transform 0.28s cubic-bezier(0.22,1,0.36,1), color 0.2s, border-color 0.2s, text-shadow 0.2s",
        whiteSpace: "nowrap", display: "inline-block",
      }}
    >
      {skill}
    </span>
  );
}

function SkillsGroup({ onHover }: { onHover: (h: boolean) => void }) {
  return (
    <div style={{ display: "flex", flexShrink: 0 }}>
      {SKILLS.map((s, i) => <SkillPill key={i} skill={s} onHover={onHover} />)}
    </div>
  );
}

function SkillsMarquee() {
  const [paused, setPaused] = useState(false);
  return (
    <div style={{
      overflow: "hidden", width: "100%", padding: "14px 0",
      WebkitMaskImage: "linear-gradient(90deg, transparent, #000 4%, #000 96%, transparent)",
      maskImage: "linear-gradient(90deg, transparent, #000 4%, #000 96%, transparent)",
    }}>
      <div style={{
        display: "flex", width: "max-content",
        animation: "marquee 30s linear infinite",
        animationPlayState: paused ? "paused" : "running",
      }}>
        <SkillsGroup onHover={setPaused} />
        <SkillsGroup onHover={setPaused} />
        <SkillsGroup onHover={setPaused} />
        <SkillsGroup onHover={setPaused} />
      </div>
    </div>
  );
}

export default function AboutHome() {
  const isMobile = useIsMobile();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" style={{ position: "relative", zIndex: 3, background: "linear-gradient(180deg, #0e0e0e 0%, #090909 60%, #070707 100%)", padding: isMobile ? "90px 0" : "140px 0", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
      <div style={{ padding: isMobile ? "0 24px" : "0 19%" }}>

        <div ref={ref} style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "0.8fr 1.2fr", gap: isMobile ? 40 : 80, alignItems: "start" }}>

          {/* Left — label + heading */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -16 }} animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5 }}
              style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}
            >
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#fff", boxShadow: "0 0 10px rgba(255,255,255,0.6)", animation: "pulse-glow 2s ease-in-out infinite" }} />
              <span style={{ fontSize: 11, fontFamily: "Plus Jakarta Sans, sans-serif", fontWeight: 600, letterSpacing: "0.24em", color: "rgba(255,255,255,0.5)" }}>ABOUT</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              style={{ margin: 0, fontFamily: "Plus Jakarta Sans, sans-serif", fontWeight: 700, fontSize: "clamp(1.8rem, 3.2vw, 2.8rem)", color: "#fff", lineHeight: 1.12 }}
            >
              Designing products<br />that ship & convert.
            </motion.h2>
          </div>

          {/* Right — bio + skills */}
          <div style={{ minWidth: 0 }}>
            <motion.p
              initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.18, duration: 0.6 }}
              style={{ margin: "0 0 20px", fontSize: isMobile ? 15 : 16, lineHeight: 1.85, color: "rgba(255,255,255,0.6)", fontFamily: "Plus Jakarta Sans, sans-serif" }}
            >
              I&apos;m Rosyad Zain — a product designer and web developer focused on building clean,
              high-impact digital products. I bridge design and engineering to turn ideas into
              real, shippable interfaces that look sharp and perform.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.26, duration: 0.6 }}
              style={{ margin: "0 0 32px", fontSize: isMobile ? 14 : 15, lineHeight: 1.85, color: "rgba(255,255,255,0.4)", fontFamily: "Plus Jakarta Sans, sans-serif" }}
            >
              From brand identity and UI systems to full web builds, I deliver end-to-end —
              for startups, SMEs, and personal brands.
            </motion.p>
          </div>
        </div>

        {/* Skills & Tools */}
        <div style={{ marginTop: isMobile ? 56 : 80 }}>
          <motion.p
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            style={{ textAlign: "center", margin: "0 0 32px", fontSize: 10, fontFamily: "Plus Jakarta Sans, sans-serif", fontWeight: 600, letterSpacing: "0.28em", color: "rgba(255,255,255,0.3)" }}
          >
            SKILLS &amp; TOOLS
          </motion.p>
          <ToolsMarquee />
          <div style={{ marginTop: 18 }}>
            <SkillsMarquee />
          </div>
        </div>
      </div>
    </section>
  );
}
