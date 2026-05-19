"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { container } from "@/lib/layout";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useLanguage } from "@/context/LanguageContext";

const W = "#fff";

function ServiceCard({ item, index }: {
  item: { title: string; price: string; timeline: string; tag: string; features: string[] };
  index: number;
}) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const { t }  = useLanguage();
  const isSig  = item.tag !== "";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      style={{ height: "100%" }}
    >
      <div style={{
        position: "relative", height: "100%", display: "flex", flexDirection: "column",
        padding: "28px 28px 26px",
        borderRadius: 10, overflow: "hidden",
        background: isSig ? "rgba(255,255,255,0.025)" : "rgba(255,255,255,0.015)",
        border: isSig ? "1px solid rgba(255,255,255,0.18)" : "1px solid rgba(255,255,255,0.07)",
        boxShadow: isSig ? "0 0 40px rgba(255,255,255,0.04) inset" : "none",
      }}>

        {/* Top gradient accent for signature card */}
        {isSig && (
          <div style={{
            position: "absolute", top: 0, left: 0, right: 0, height: 1,
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
            pointerEvents: "none",
          }} />
        )}

        {/* Header row */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 20, gap: 12 }}>
          <h3 style={{
            margin: 0, fontFamily: "Exo 2, sans-serif", fontWeight: 800,
            fontSize: 14, letterSpacing: "0.06em", color: W, lineHeight: 1.3,
            flex: 1,
          }}>
            {item.title}
          </h3>
          {isSig && (
            <span style={{
              flexShrink: 0,
              fontSize: 7.5, fontFamily: "Space Grotesk, sans-serif", fontWeight: 700,
              letterSpacing: "0.18em", padding: "3px 9px", borderRadius: 3,
              border: "1px solid rgba(255,255,255,0.35)",
              color: "rgba(255,255,255,0.75)",
              background: "rgba(255,255,255,0.06)",
              whiteSpace: "nowrap" as const,
            }}>
              {item.tag}
            </span>
          )}
        </div>

        {/* Price */}
        <div style={{ marginBottom: 10 }}>
          <span style={{
            display: "block", fontSize: 9, fontFamily: "Space Grotesk, sans-serif",
            letterSpacing: "0.22em", color: "rgba(255,255,255,0.3)", marginBottom: 4,
          }}>
            {t.services.starting}
          </span>
          <span style={{
            fontSize: 20, fontFamily: "Exo 2, sans-serif", fontWeight: 800,
            color: W, letterSpacing: "0.02em", lineHeight: 1,
          }}>
            {item.price}
          </span>
        </div>

        {/* Timeline */}
        <div style={{ marginBottom: 22 }}>
          <span style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            fontSize: 9, fontFamily: "Space Grotesk, sans-serif",
            letterSpacing: "0.18em", color: "rgba(255,255,255,0.32)",
            padding: "3px 10px", borderRadius: 2,
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.07)",
          }}>
            <svg width="8" height="8" viewBox="0 0 12 12" fill="none">
              <circle cx="6" cy="6" r="5" stroke="rgba(255,255,255,0.4)" strokeWidth="1"/>
              <path d="M6 3.5V6.5L8 7.5" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinecap="round"/>
            </svg>
            {item.timeline}
          </span>
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: "rgba(255,255,255,0.06)", marginBottom: 20 }} />

        {/* Features */}
        <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 10, flex: 1 }}>
          {item.features.map((feat, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -8 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: index * 0.1 + i * 0.04 + 0.25, duration: 0.35 }}
              style={{ display: "flex", alignItems: "flex-start", gap: 10 }}
            >
              <span style={{
                flexShrink: 0, marginTop: 5,
                width: 3, height: 3, borderRadius: "50%",
                background: isSig ? "rgba(255,255,255,0.55)" : "rgba(255,255,255,0.28)",
                display: "inline-block",
              }} />
              <span style={{
                fontSize: 12, fontFamily: "Space Grotesk, sans-serif",
                color: "rgba(255,255,255,0.52)", lineHeight: 1.55,
              }}>
                {feat}
              </span>
            </motion.li>
          ))}
        </ul>
      </div>
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
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", backgroundImage: "linear-gradient(rgba(255,255,255,0.008) 1px, transparent 1px)", backgroundSize: "100% 80px" }} />

      <div style={{ ...container, position: "relative", zIndex: 10 }}>

        {/* Heading */}
        <div ref={headRef} style={{ marginBottom: isMobile ? 36 : 64, maxWidth: 520 }}>
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
            <span style={{ color: W }}>{t.services.h1}</span>
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

        {/* Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
          gap: isMobile ? 12 : 16,
          alignItems: "stretch",
        }}>
          {t.services.items.map((item, i) => (
            <ServiceCard key={i} item={item} index={i} />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          ref={ctaRef}
          initial={{ opacity: 0, y: 20 }}
          animate={ctaInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{
            marginTop: isMobile ? 40 : 56,
            display: "flex", flexDirection: "column", alignItems: "center", gap: 16,
            textAlign: "center",
          }}
        >
          <p style={{
            margin: 0, fontSize: 12, fontFamily: "Space Grotesk, sans-serif",
            color: "rgba(255,255,255,0.28)", letterSpacing: "0.06em", maxWidth: 360,
          }}>
            {t.services.cta_sub}
          </p>
          <motion.button
            onClick={go}
            style={{
              position: "relative", overflow: "hidden",
              padding: "12px 36px", borderRadius: 4,
              fontFamily: "Space Grotesk, sans-serif", fontWeight: 700,
              fontSize: 11, letterSpacing: "0.22em",
              background: "none", border: "1px solid rgba(255,255,255,0.22)", color: W,
            }}
            whileHover={{ borderColor: "rgba(255,255,255,0.55)", boxShadow: "0 0 24px rgba(255,255,255,0.08)" }}
            whileTap={{ scale: 0.97 }}
            data-hover="true"
          >
            <span style={{ position: "relative", zIndex: 1 }}>{t.services.cta} →</span>
          </motion.button>
        </motion.div>

      </div>
    </section>
  );
}
