"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { container } from "@/lib/layout";
import { useIsMobile } from "@/hooks/useIsMobile";

const TOOLS = ["UNREAL ENGINE 5", "LUMEN", "NANITE", "MEGASCANS", "METAHUMAN"];

export default function RealTime3D() {
  const sectionRef = useRef<HTMLElement>(null);
  const headRef    = useRef<HTMLDivElement>(null);
  const frameRef   = useRef<HTMLDivElement>(null);
  const headInView  = useInView(headRef,  { once: true, margin: "-80px" });
  const frameInView = useInView(frameRef, { once: true, margin: "-60px" });
  const isMobile    = useIsMobile();

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const blobY = useTransform(scrollYProgress, [0, 1], [-40, 40]);

  return (
    <section
      id="environments"
      ref={sectionRef}
      style={{ position: "relative", paddingTop: isMobile ? 80 : 120, paddingBottom: isMobile ? 80 : 120, overflow: "hidden" }}
    >
      {/* Background */}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, #000 0%, #080808 50%, #000 100%)" }} />

      {/* Ambient glow */}
      <motion.div style={{
        position: "absolute", left: "50%", top: "40%",
        width: 700, height: 700, borderRadius: "50%",
        transform: "translate(-50%, -50%)",
        background: "radial-gradient(circle, rgba(255,255,255,0.025) 0%, transparent 65%)",
        filter: "blur(80px)", pointerEvents: "none", y: blobY,
      }} />

      <div style={{ ...container, position: "relative", zIndex: 10 }}>

        {/* ── Heading ── */}
        <div ref={headRef} style={{ marginBottom: isMobile ? 36 : 64, maxWidth: 580 }}>
          <motion.div
            style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}
            initial={{ opacity: 0, x: -20 }} animate={headInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <div style={{ height: 1, width: 48, background: "linear-gradient(90deg, rgba(255,255,255,0.5), transparent)" }} />
            <span style={{ fontSize: 10, fontFamily: "Space Grotesk, sans-serif", letterSpacing: "0.3em", color: "rgba(255,255,255,0.3)" }}>
              03 / ENVIRONMENTS
            </span>
          </motion.div>

          <motion.h2
            style={{ margin: "0 0 20px", fontFamily: "Exo 2, sans-serif", fontWeight: 800, fontSize: "clamp(2rem, 4.5vw, 3.25rem)", lineHeight: 1.06 }}
            initial={{ opacity: 0, y: 22 }} animate={headInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.12, duration: 0.6 }}
          >
            <span style={{ color: "#fff" }}>Real-Time</span>
            <br />
            <span style={{ color: "rgba(255,255,255,0.4)" }}>Worlds</span>
          </motion.h2>

          <motion.p
            style={{ margin: 0, fontSize: 14, lineHeight: 1.85, color: "rgba(255,255,255,0.38)" }}
            initial={{ opacity: 0, y: 14 }} animate={headInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.22, duration: 0.55 }}
          >
            Exploring cinematic real-time environments and immersive world-building using Unreal Engine 5 — bridging the gap between game development and interactive storytelling.
          </motion.p>
        </div>

        {/* ── Cinematic viewport frame ── */}
        <motion.div
          ref={frameRef}
          style={{ position: "relative" }}
          initial={{ opacity: 0, y: 32 }}
          animate={frameInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Outer frame */}
          <div style={{
            position: "relative", width: "100%", aspectRatio: "16/7",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 8, overflow: "hidden",
            background: "#000",
          }}>
            {/* Video */}
            <video
              src="/videos/Scene Statue Fish Landscape 2.mp4"
              autoPlay muted loop playsInline
              style={{
                position: "absolute", inset: 0,
                width: "100%", height: "100%",
                objectFit: "cover", objectPosition: "center",
              }}
            />

            {/* Subtle dark vignette over video */}
            <div style={{
              position: "absolute", inset: 0, pointerEvents: "none",
              background: "radial-gradient(ellipse 85% 70% at 50% 50%, transparent 40%, rgba(0,0,0,0.55) 100%)",
            }} />

            {/* Bottom gradient fade */}
            <div style={{
              position: "absolute", bottom: 0, left: 0, right: 0, height: 80, pointerEvents: "none",
              background: "linear-gradient(0deg, rgba(0,0,0,0.7) 0%, transparent 100%)",
            }} />

            {/* Corner brackets */}
            {[
              { top: 12, left: 12, borderTop: "1px solid rgba(255,255,255,0.3)", borderLeft: "1px solid rgba(255,255,255,0.3)" },
              { top: 12, right: 12, borderTop: "1px solid rgba(255,255,255,0.3)", borderRight: "1px solid rgba(255,255,255,0.3)" },
              { bottom: 12, left: 12, borderBottom: "1px solid rgba(255,255,255,0.3)", borderLeft: "1px solid rgba(255,255,255,0.3)" },
              { bottom: 12, right: 12, borderBottom: "1px solid rgba(255,255,255,0.3)", borderRight: "1px solid rgba(255,255,255,0.3)" },
            ].map((s, i) => (
              <div key={i} style={{ position: "absolute", width: 20, height: 20, zIndex: 2, ...s }} />
            ))}

            {/* Bottom-left label */}
            <div style={{ position: "absolute", bottom: 16, left: 20, zIndex: 2, display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: "rgba(255,255,255,0.6)", boxShadow: "0 0 6px rgba(255,255,255,0.4)", display: "inline-block" }} />
              <span style={{ fontSize: 8, fontFamily: "Space Grotesk, sans-serif", letterSpacing: "0.22em", color: "rgba(255,255,255,0.45)" }}>
                UNREAL ENGINE 5
              </span>
            </div>

            {/* Bottom-right label */}
            <div style={{ position: "absolute", bottom: 16, right: 20, zIndex: 2 }}>
              <span style={{ fontSize: 8, fontFamily: "Space Grotesk, sans-serif", letterSpacing: "0.22em", color: "rgba(255,255,255,0.25)" }}>
                ENV_001
              </span>
            </div>
          </div>
        </motion.div>

        {/* ── Tool tags ── */}
        <motion.div
          style={{ marginTop: 24, display: "flex", gap: 8, flexWrap: "wrap" }}
          initial={{ opacity: 0 }} animate={frameInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          {TOOLS.map((t) => (
            <span key={t} style={{
              fontSize: 9, fontFamily: "Space Grotesk, sans-serif",
              padding: "3px 12px", borderRadius: 2,
              background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)",
              color: "rgba(255,255,255,0.28)", letterSpacing: "0.15em",
            }}>
              {t}
            </span>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
