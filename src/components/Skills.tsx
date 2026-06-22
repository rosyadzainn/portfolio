"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { container } from "@/lib/layout";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useLanguage } from "@/context/LanguageContext";

const SKILL_TECH = [
  ["Figma", "Design Systems", "UI/UX Design", "Brand Identity", "Product Strategy"],
  ["Unreal Engine 5", "Lumen", "Nanite", "Megascans", "MetaHuman", "Environment Art"],
  ["Adobe Photoshop", "Adobe Illustrator", "Adobe Premiere Pro", "After Effects", "Motion Graphics", "Video Production"],
  ["AI-Powered Development", "Figma-to-Code", "WordPress", "Vercel Deployment", "Project Direction", "Vendor Coordination"],
];

function SkillGroup({ label, skills, index }: { label: string; skills: string[]; index: number }) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      style={{
        padding: "28px 28px 24px",
        border: "1px solid rgba(255,255,255,0.07)",
        borderRadius: 10,
        background: "rgba(255,255,255,0.015)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 18 }}>
        <div style={{ width: 3, height: 3, borderRadius: "50%", background: "rgba(255,255,255,0.35)", flexShrink: 0 }} />
        <span style={{
          fontSize: 9, fontFamily: "Space Grotesk, sans-serif",
          letterSpacing: "0.28em", color: "rgba(255,255,255,0.32)",
        }}>
          {label}
        </span>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        {skills.map((skill, si) => (
          <motion.span
            key={skill}
            initial={{ opacity: 0, scale: 0.88 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: index * 0.1 + si * 0.045 + 0.18, duration: 0.32, ease: "easeOut" }}
            style={{
              fontSize: 11, fontFamily: "Space Grotesk, sans-serif",
              padding: "5px 13px", borderRadius: 3,
              background: "rgba(255,255,255,0.035)",
              border: "1px solid rgba(255,255,255,0.09)",
              color: "rgba(255,255,255,0.68)",
              letterSpacing: "0.02em",
            }}
          >
            {skill}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const headRef    = useRef<HTMLDivElement>(null);
  const headInView = useInView(headRef, { once: true, margin: "-80px" });
  const isMobile   = useIsMobile();
  const { t }      = useLanguage();

  const groups = SKILL_TECH.map((skills, i) => ({ label: t.skills.groups[i], skills }));

  return (
    <section
      id="skills"
      style={{ position: "relative", paddingTop: isMobile ? 80 : 112, paddingBottom: isMobile ? 80 : 112, overflow: "hidden" }}
    >
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, #000 0%, #080808 50%, #000 100%)" }} />

      <div style={{ ...container, position: "relative", zIndex: 10 }}>
        <div ref={headRef} style={{ marginBottom: isMobile ? 36 : 56, maxWidth: 520 }}>
          <motion.div
            style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}
            initial={{ opacity: 0, x: -20 }} animate={headInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <div style={{ height: 1, width: 48, background: "linear-gradient(90deg, rgba(255,255,255,0.5), transparent)" }} />
            <span style={{ fontSize: 10, fontFamily: "Space Grotesk, sans-serif", letterSpacing: "0.3em", color: "rgba(255,255,255,0.3)" }}>
              03 / {t.skills.label}
            </span>
          </motion.div>

          <motion.h2
            style={{ margin: "0 0 20px", fontFamily: "Exo 2, sans-serif", fontWeight: 800, fontSize: "clamp(2rem, 4.5vw, 3.25rem)", lineHeight: 1.06 }}
            initial={{ opacity: 0, y: 22 }} animate={headInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.12, duration: 0.6 }}
          >
            <span style={{ color: "#fff" }}>{t.skills.h1}</span>
            <br />
            <span style={{ color: "rgba(255,255,255,0.4)" }}>{t.skills.h2}</span>
          </motion.h2>

          <motion.p
            style={{ margin: 0, fontSize: 14, lineHeight: 1.85, color: "rgba(255,255,255,0.38)" }}
            initial={{ opacity: 0, y: 14 }} animate={headInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.22, duration: 0.55 }}
          >
            {t.skills.sub}
          </motion.p>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
          gap: isMobile ? 12 : 16,
        }}>
          {groups.map((group, i) => (
            <SkillGroup key={i} label={group.label} skills={group.skills} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
