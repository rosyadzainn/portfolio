"use client";

import { useRef } from "react";
import {
  motion, useInView,
  useScroll, useTransform,
} from "framer-motion";
import { container } from "@/lib/layout";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useLanguage } from "@/context/LanguageContext";

// ── Static data ────────────────────────────────────────────────────────────────

const CAPABILITY_ICONS = ["⬡", "◈", "◎"];

const EDUCATION_META = [
  { period: "2023 — 2025", school: "BINUS University", gpa: "3.80" },
  { period: "2018 — 2022", school: "Telkom University", gpa: "3.59" },
];

const SKILL_TECH = [
  ["Figma", "Design Systems", "UI/UX Design", "Brand Identity", "Product Strategy"],
  ["Unreal Engine 5", "Lumen", "Nanite", "Megascans", "MetaHuman", "Environment Art"],
  ["Adobe Photoshop", "Adobe Illustrator", "Adobe Premiere Pro", "After Effects", "Motion Graphics", "Video Production"],
  ["AI-Powered Development", "Figma-to-Code", "WordPress", "Vercel Deployment", "Project Direction", "Vendor Coordination"],
];

// ── Section header ─────────────────────────────────────────────────────────────

function SectionHeader({ label }: { label: string }) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 40 }}
      initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5 }}
    >
      <div style={{ height: 1, width: 48, background: "linear-gradient(90deg, rgba(255,255,255,0.5), transparent)" }} />
      <span style={{ fontSize: 10, fontFamily: "Plus Jakarta Sans, sans-serif", letterSpacing: "0.3em", color: "rgba(255,255,255,0.3)" }}>
        {label}
      </span>
    </motion.div>
  );
}

// ── About sub-components ───────────────────────────────────────────────────────

function CapabilityCard({ item, index }: { item: { icon: string; title: string; desc: string }; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div ref={ref} className="gradient-border" style={{ overflow: "hidden" }}
      initial={{ opacity: 0, y: 18 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ y: -3, transition: { duration: 0.2 } }}>
      <div style={{ padding: "16px 20px", display: "flex", gap: 14, alignItems: "flex-start" }}>
        <span style={{ fontSize: 15, color: "rgba(255,255,255,0.4)", flexShrink: 0, lineHeight: 1, paddingTop: 2 }}>{item.icon}</span>
        <div>
          <h3 style={{ margin: "0 0 5px", fontSize: 13, fontFamily: "Plus Jakarta Sans, sans-serif", fontWeight: 600, color: "#fff" }}>{item.title}</h3>
          <p style={{ margin: 0, fontSize: 12, lineHeight: 1.7, color: "rgba(255,255,255,0.36)" }}>{item.desc}</p>
        </div>
      </div>
    </motion.div>
  );
}

function JourneyItem({ item, index, isLast }: {
  item: { role: string; desc?: string };
  index: number; isLast: boolean;
}) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-30px" });
  const num    = String(index + 1).padStart(2, "0");
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 10 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.12, duration: 0.5 }}
      style={{ paddingTop: 22, paddingBottom: isLast ? 0 : 22, borderTop: "1px solid rgba(255,255,255,0.07)" }}>
      <span style={{ fontSize: 9, fontFamily: "Plus Jakarta Sans, sans-serif", letterSpacing: "0.28em", color: "rgba(255,255,255,0.22)" }}>{num}</span>
      <span style={{ display: "block", fontSize: 14, fontFamily: "Plus Jakarta Sans, sans-serif", fontWeight: 600, color: "#fff", marginTop: 9, lineHeight: 1.35 }}>{item.role}</span>
    </motion.div>
  );
}

function EducationCard({ item, index }: { item: { period: string; degree: string; field: string; school: string; gpa: string }; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div ref={ref} className="gradient-border" style={{ overflow: "hidden" }}
      initial={{ opacity: 0, y: 18 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.12, duration: 0.5 }}
      whileHover={{ y: -3, transition: { duration: 0.2 } }}>
      <div style={{ padding: "20px 22px", display: "flex", flexDirection: "column", gap: 10 }}>
        <div>
          <span style={{ display: "block", fontSize: 14, fontFamily: "Plus Jakarta Sans, sans-serif", fontWeight: 600, color: "#fff", marginBottom: 3 }}>{item.school}</span>
          <span style={{ display: "block", fontSize: 11, fontFamily: "Plus Jakarta Sans, sans-serif", color: "rgba(255,255,255,0.45)", marginBottom: 2 }}>{item.degree}</span>
          <span style={{ display: "block", fontSize: 10, fontFamily: "Plus Jakarta Sans, sans-serif", color: "rgba(255,255,255,0.24)", lineHeight: 1.5 }}>{item.field}</span>
        </div>
      </div>
    </motion.div>
  );
}

// ── Skills sub-component ───────────────────────────────────────────────────────

function SkillGroup({ label, skills, index }: { label: string; skills: string[]; index: number }) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      style={{ padding: "28px 28px 24px", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 10, background: "rgba(255,255,255,0.015)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 18 }}>
        <div style={{ width: 3, height: 3, borderRadius: "50%", background: "rgba(255,255,255,0.35)", flexShrink: 0 }} />
        <span style={{ fontSize: 9, fontFamily: "Plus Jakarta Sans, sans-serif", letterSpacing: "0.28em", color: "rgba(255,255,255,0.32)" }}>{label}</span>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        {skills.map((skill, si) => (
          <motion.span key={skill}
            initial={{ opacity: 0, scale: 0.88 }} animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: index * 0.1 + si * 0.045 + 0.18, duration: 0.32, ease: "easeOut" }}
            style={{ fontSize: 11, fontFamily: "Plus Jakarta Sans, sans-serif", padding: "5px 13px", borderRadius: 3, background: "rgba(255,255,255,0.035)", border: "1px solid rgba(255,255,255,0.09)", color: "rgba(255,255,255,0.68)", letterSpacing: "0.02em" }}>
            {skill}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}

// ── Process sub-component ──────────────────────────────────────────────────────

function StepCard({ step, index }: { step: { num: string; title: string; desc: string }; index: number }) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.12, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      style={{ position: "relative", paddingTop: 28, paddingBottom: 28 }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg, rgba(255,255,255,0.12), rgba(255,255,255,0.04))" }} />
      <div style={{ position: "absolute", top: 10, right: 0, fontFamily: "Plus Jakarta Sans, sans-serif", fontWeight: 800, fontSize: "clamp(64px, 8vw, 96px)", color: "rgba(255,255,255,0.03)", lineHeight: 1, letterSpacing: "-0.02em", userSelect: "none", pointerEvents: "none" }}>
        {step.num}
      </div>
      <motion.div initial={{ opacity: 0, x: -8 }} animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ delay: index * 0.12 + 0.1, duration: 0.4 }}
        style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
        <span style={{ fontSize: 9, fontFamily: "Plus Jakarta Sans, sans-serif", letterSpacing: "0.28em", color: "rgba(255,255,255,0.28)" }}>{step.num}</span>
        <div style={{ height: 1, width: 24, background: "rgba(255,255,255,0.12)" }} />
      </motion.div>
      <motion.h3 initial={{ opacity: 0, y: 10 }} animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: index * 0.12 + 0.18, duration: 0.5 }}
        style={{ margin: "0 0 14px", fontFamily: "Plus Jakarta Sans, sans-serif", fontWeight: 800, fontSize: "clamp(1.1rem, 2vw, 1.4rem)", letterSpacing: "0.06em", color: "#fff", lineHeight: 1.1 }}>
        {step.title}
      </motion.h3>
      <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: index * 0.12 + 0.28, duration: 0.5 }}
        style={{ margin: 0, fontSize: 13, lineHeight: 1.8, color: "rgba(255,255,255,0.38)", fontFamily: "Plus Jakarta Sans, sans-serif", maxWidth: 340 }}>
        {step.desc}
      </motion.p>
    </motion.div>
  );
}

// ── Section panes ──────────────────────────────────────────────────────────────

type TT = ReturnType<typeof useLanguage>["t"];

function AboutPane({ isMobile, t }: { isMobile: boolean; t: TT }) {
  const capabilities = CAPABILITY_ICONS.map((icon, i) => ({ icon, ...t.about.caps[i] }));
  const journey      = t.about.journey;
  const education    = EDUCATION_META.map((meta, i) => ({ ...meta, ...t.about.edu[i] }));

  const labelStyle = { margin: "0 0 20px", fontSize: 9, fontFamily: "Plus Jakarta Sans, sans-serif", letterSpacing: "0.3em", color: "rgba(255,255,255,0.28)" } as const;

  return (
    <div>
      {/* Intro + Journey — 2 col */}
      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? 40 : 72 }}>
        {/* Left: paragraphs */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.6 }}
          style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <p style={{ margin: 0, fontSize: 15, lineHeight: 1.9, color: "rgba(255,255,255,0.58)" }}>{t.about.p1}</p>
          <p style={{ margin: 0, fontSize: 13, lineHeight: 1.9, color: "rgba(255,255,255,0.36)" }}>{t.about.p2}</p>
          <p style={{ margin: 0, fontSize: 13, lineHeight: 1.9, color: "rgba(255,255,255,0.24)" }}>{t.about.p3}</p>
        </motion.div>
        {/* Right: journey */}
        <div>
          <motion.p style={labelStyle}
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            {t.about.journey_label}
          </motion.p>
          <div>
            {journey.map((item, i) => (
              <JourneyItem key={i} item={item} index={i} isLast={i === journey.length - 1} />
            ))}
          </div>
        </div>
      </div>

      {/* Capabilities — 3-col grid */}
      <div style={{ marginTop: isMobile ? 56 : 72 }}>
        <motion.p style={labelStyle}
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          {t.about.cap_label}
        </motion.p>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)", gap: isMobile ? 8 : 12 }}>
          {capabilities.map((c, i) => <CapabilityCard key={i} item={c} index={i} />)}
        </div>
      </div>

      {/* Education */}
      <div style={{ marginTop: isMobile ? 56 : 72 }}>
        <motion.p style={labelStyle}
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          {t.about.edu_label}
        </motion.p>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? 12 : 24 }}>
          {education.map((item, i) => <EducationCard key={i} item={item} index={i} />)}
        </div>
      </div>
    </div>
  );
}

function SkillsPane({ isMobile, t }: { isMobile: boolean; t: TT }) {
  const groups = SKILL_TECH.map((skills, i) => ({ label: t.skills.groups[i], skills }));
  return (
    <div>
      <motion.p style={{ margin: "0 0 32px", fontSize: 14, lineHeight: 1.85, color: "rgba(255,255,255,0.38)", maxWidth: 520 }}
        initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.5 }}>
        {t.skills.sub}
      </motion.p>
      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? 12 : 16 }}>
        {groups.map((g, i) => <SkillGroup key={i} label={g.label} skills={g.skills} index={i} />)}
      </div>
    </div>
  );
}

function ProcessPane({ isMobile, t }: { isMobile: boolean; t: TT }) {
  const ctaRef    = useRef<HTMLDivElement>(null);
  const ctaInView = useInView(ctaRef, { once: true, margin: "-60px" });
  const go = () => { window.location.href = "/#contact"; };

  return (
    <div>
      <motion.p style={{ margin: "0 0 40px", fontSize: 14, lineHeight: 1.85, color: "rgba(255,255,255,0.38)", maxWidth: 520 }}
        initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.5 }}>
        {t.services.sub}
      </motion.p>
      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", columnGap: isMobile ? 0 : 64, rowGap: 0 }}>
        {t.services.steps.map((step, i) => <StepCard key={step.num} step={step} index={i} />)}
      </div>
      <motion.div ref={ctaRef}
        initial={{ opacity: 0, y: 16 }} animate={ctaInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        style={{ marginTop: isMobile ? 40 : 56, display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 14 }}>
        <p style={{ margin: 0, fontSize: 12, fontFamily: "Plus Jakarta Sans, sans-serif", color: "rgba(255,255,255,0.25)", letterSpacing: "0.04em" }}>
          {t.services.cta_sub}
        </p>
        <motion.button onClick={go}
          style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "none", border: "none", padding: 0, fontFamily: "Plus Jakarta Sans, sans-serif", fontWeight: 700, fontSize: 13, letterSpacing: "0.1em", color: "rgba(255,255,255,0.65)", cursor: "pointer" }}
          whileHover={{ color: "#fff" }} data-hover="true">
          {t.services.cta}
          <motion.span animate={{ x: [0, 5, 0] }} transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}>→</motion.span>
        </motion.button>
      </motion.div>
    </div>
  );
}

// ── Main export ────────────────────────────────────────────────────────────────

export default function TabSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isMobile   = useIsMobile();
  const { t }      = useLanguage();

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const blobY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section
      id="about"
      ref={sectionRef}
      style={{ position: "relative", paddingTop: isMobile ? 80 : 120, paddingBottom: isMobile ? 80 : 120, overflow: "hidden" }}
    >
      {/* Hidden anchors */}
      <span id="skills"   style={{ position: "absolute", top: 0 }} />
      <span id="services" style={{ position: "absolute", top: 0 }} />

      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, #000 0%, #0a0a0a 50%, #000 100%)" }} />
      <motion.div style={{ position: "absolute", right: "-8%", top: "15%", width: 560, height: 560, borderRadius: "50%", pointerEvents: "none", background: "radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 68%)", filter: "blur(80px)", y: blobY }} />

      <div style={{ ...container, position: "relative", zIndex: 10 }}>

        {/* ABOUT */}
        <SectionHeader label={t.about.label} />
        <AboutPane isMobile={isMobile} t={t} />

        {/* SKILLS */}
        <div style={{ marginTop: isMobile ? 80 : 120 }}>
          <SectionHeader label={t.skills.label} />
          <SkillsPane isMobile={isMobile} t={t} />
        </div>

        {/* PROCESS */}
        <div style={{ marginTop: isMobile ? 80 : 120 }}>
          <SectionHeader label={t.services.label} />
          <ProcessPane isMobile={isMobile} t={t} />
        </div>

      </div>
    </section>
  );
}
