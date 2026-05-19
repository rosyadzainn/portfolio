"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { container } from "@/lib/layout";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useLanguage } from "@/context/LanguageContext";

function StepCard({ step, index }: {
  step: { num: string; title: string; desc: string };
  index: number;
}) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.12, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      style={{ position: "relative", paddingTop: 28, paddingBottom: 28 }}
    >
      {/* Top border line */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 1,
        background: "linear-gradient(90deg, rgba(255,255,255,0.12), rgba(255,255,255,0.04))",
      }} />

      {/* Step number — large ghost behind */}
      <div style={{
        position: "absolute", top: 10, right: 0,
        fontFamily: "Exo 2, sans-serif", fontWeight: 800,
        fontSize: "clamp(64px, 8vw, 96px)",
        color: "rgba(255,255,255,0.03)",
        lineHeight: 1, letterSpacing: "-0.02em",
        userSelect: "none", pointerEvents: "none",
      }}>
        {step.num}
      </div>

      {/* Small step tag */}
      <motion.div
        initial={{ opacity: 0, x: -8 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ delay: index * 0.12 + 0.1, duration: 0.4 }}
        style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}
      >
        <span style={{
          fontSize: 9, fontFamily: "Space Grotesk, sans-serif",
          letterSpacing: "0.28em", color: "rgba(255,255,255,0.28)",
        }}>
          {step.num}
        </span>
        <div style={{ height: 1, width: 24, background: "rgba(255,255,255,0.12)" }} />
      </motion.div>

      {/* Title */}
      <motion.h3
        initial={{ opacity: 0, y: 10 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: index * 0.12 + 0.18, duration: 0.5 }}
        style={{
          margin: "0 0 14px",
          fontFamily: "Exo 2, sans-serif", fontWeight: 800,
          fontSize: "clamp(1.1rem, 2vw, 1.4rem)",
          letterSpacing: "0.06em", color: "#fff", lineHeight: 1.1,
        }}
      >
        {step.title}
      </motion.h3>

      {/* Description */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: index * 0.12 + 0.28, duration: 0.5 }}
        style={{
          margin: 0, fontSize: 13, lineHeight: 1.8,
          color: "rgba(255,255,255,0.38)",
          fontFamily: "Space Grotesk, sans-serif",
          maxWidth: 340,
        }}
      >
        {step.desc}
      </motion.p>
    </motion.div>
  );
}

export default function Services() {
  const headRef    = useRef<HTMLDivElement>(null);
  const ctaRef     = useRef<HTMLDivElement>(null);
  const headInView = useInView(headRef, { once: true, margin: "-80px" });
  const ctaInView  = useInView(ctaRef,  { once: true, margin: "-60px" });
  const isMobile   = useIsMobile();
  const { t }      = useLanguage();

  const go = () => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="services"
      style={{ position: "relative", paddingTop: isMobile ? 80 : 120, paddingBottom: isMobile ? 80 : 120, overflow: "hidden" }}
    >
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, #000 0%, #0a0a0a 50%, #000 100%)" }} />

      <div style={{ ...container, position: "relative", zIndex: 10 }}>

        {/* Heading */}
        <div ref={headRef} style={{ marginBottom: isMobile ? 40 : 72, maxWidth: 520 }}>
          <motion.div
            style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}
            initial={{ opacity: 0, x: -20 }} animate={headInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <div style={{ height: 1, width: 48, background: "linear-gradient(90deg, rgba(255,255,255,0.5), transparent)" }} />
            <span style={{ fontSize: 10, fontFamily: "Space Grotesk, sans-serif", letterSpacing: "0.3em", color: "rgba(255,255,255,0.3)" }}>
              04 / {t.services.label}
            </span>
          </motion.div>

          <motion.h2
            style={{ margin: "0 0 20px", fontFamily: "Exo 2, sans-serif", fontWeight: 800, fontSize: "clamp(2rem, 4.5vw, 3.25rem)", lineHeight: 1.06 }}
            initial={{ opacity: 0, y: 22 }} animate={headInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.12, duration: 0.6 }}
          >
            <span style={{ color: "#fff" }}>{t.services.h1}</span>
            <br />
            <span style={{ color: "rgba(255,255,255,0.4)" }}>{t.services.h2}</span>
          </motion.h2>

          <motion.p
            style={{ margin: 0, fontSize: 14, lineHeight: 1.85, color: "rgba(255,255,255,0.38)" }}
            initial={{ opacity: 0, y: 14 }} animate={headInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.22, duration: 0.55 }}
          >
            {t.services.sub}
          </motion.p>
        </div>

        {/* Steps grid — 2×2 */}
        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
          columnGap: isMobile ? 0 : 64,
          rowGap: 0,
        }}>
          {t.services.steps.map((step, i) => (
            <StepCard key={step.num} step={step} index={i} />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          ref={ctaRef}
          initial={{ opacity: 0, y: 16 }}
          animate={ctaInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          style={{ marginTop: isMobile ? 40 : 56, display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 14 }}
        >
          <p style={{
            margin: 0, fontSize: 12, fontFamily: "Space Grotesk, sans-serif",
            color: "rgba(255,255,255,0.25)", letterSpacing: "0.04em",
          }}>
            {t.services.cta_sub}
          </p>
          <motion.button
            onClick={go}
            style={{
              display: "inline-flex", alignItems: "center", gap: 10,
              background: "none", border: "none", padding: 0,
              fontFamily: "Space Grotesk, sans-serif", fontWeight: 700,
              fontSize: 13, letterSpacing: "0.1em", color: "rgba(255,255,255,0.65)",
              cursor: "pointer",
            }}
            whileHover={{ color: "#fff" }}
            data-hover="true"
          >
            {t.services.cta}
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
            >
              →
            </motion.span>
          </motion.button>
        </motion.div>

      </div>
    </section>
  );
}
