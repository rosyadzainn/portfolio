"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { container } from "@/lib/layout";
import { useIsMobile } from "@/hooks/useIsMobile";

const W = "#fff";

const CAPABILITIES = [
  { icon: "⬡", title: "Web Development",       desc: "Building modern interactive websites using Next.js, React, and immersive frontend systems." },
  { icon: "◈", title: "Real-Time 3D",           desc: "Creating cinematic environments and immersive worlds using Unreal Engine." },
  { icon: "◎", title: "Interactive Experience", desc: "Combining motion, atmosphere, and storytelling into futuristic digital experiences." },
];

const JOURNEY = [
  { period: "2021 — 2022", role: "Videographer & Multimedia Support", company: "SEVEN INC JOGJA",       desc: "Produced visual content, motion graphics, and branding-focused multimedia experiences while developing storytelling and creative production workflows." },
  { period: "2025 — PRESENT", role: "Multimedia & IT Specialist",    company: "PT. Pendi Hijau Berkah", desc: "Developing company websites, digital systems, and visual branding materials while supporting modern business operations and multimedia production." },
  { period: "2025 — PRESENT", role: "Multimedia & IT Specialist",    company: "MBBiotek",               desc: "Handling multimedia production, digital branding, visual communication, and creative assets for healthcare-related products and campaigns." },
  { period: "2025 — PRESENT", role: "Real-Time 3D Exploration",      company: null,                     desc: "Expanding into cinematic 3D environments and immersive world-building using Unreal Engine workflows." },
];

function SectionLabel({ number, label }: { number: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  return (
    <motion.div ref={ref} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}
      initial={{ opacity: 0, x: -16 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.5 }}>
      <div style={{ height: 1, width: 40, background: "linear-gradient(90deg, rgba(255,255,255,0.5), transparent)" }} />
      <span style={{ fontSize: 10, fontFamily: "Space Grotesk, sans-serif", letterSpacing: "0.3em", color: "rgba(255,255,255,0.3)" }}>
        {number} / {label}
      </span>
    </motion.div>
  );
}

function CapabilityCard({ item, index }: { item: (typeof CAPABILITIES)[0]; index: number }) {
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
          <h3 style={{ margin: "0 0 5px", fontSize: 13, fontFamily: "Space Grotesk, sans-serif", fontWeight: 600, color: W }}>{item.title}</h3>
          <p style={{ margin: 0, fontSize: 12, lineHeight: 1.7, color: "rgba(255,255,255,0.36)" }}>{item.desc}</p>
        </div>
      </div>
    </motion.div>
  );
}

function JourneyItem({ item, index, isLast }: { item: (typeof JOURNEY)[0]; index: number; isLast: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-30px" });
  return (
    <motion.div ref={ref} style={{ position: "relative", paddingLeft: 26, paddingBottom: isLast ? 0 : 28 }}
      initial={{ opacity: 0, x: -12 }} animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: index * 0.12, duration: 0.5 }}>
      {!isLast && (
        <div style={{ position: "absolute", left: 5, top: 16, bottom: 0, width: 1, background: "linear-gradient(180deg, rgba(255,255,255,0.1) 0%, transparent 100%)" }} />
      )}
      <motion.div style={{ position: "absolute", left: 0, top: 3, width: 12, height: 12, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.28)", background: "#000", display: "flex", alignItems: "center", justifyContent: "center" }}
        initial={{ scale: 0 }} animate={inView ? { scale: 1 } : {}} transition={{ delay: index * 0.12 + 0.15, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}>
        <div style={{ width: 4, height: 4, borderRadius: "50%", background: W }} />
      </motion.div>
      <span style={{ display: "block", fontSize: 9, fontFamily: "Space Grotesk, sans-serif", letterSpacing: "0.22em", color: "rgba(255,255,255,0.28)", marginBottom: 4 }}>{item.period}</span>
      <div style={{ marginBottom: 5 }}>
        <span style={{ fontSize: 13, fontFamily: "Space Grotesk, sans-serif", fontWeight: 600, color: W }}>{item.role}</span>
        {item.company && <span style={{ display: "block", fontSize: 10, fontFamily: "Space Grotesk, sans-serif", color: "rgba(255,255,255,0.28)", marginTop: 1, letterSpacing: "0.08em" }}>{item.company}</span>}
      </div>
      <p style={{ margin: 0, fontSize: 12, lineHeight: 1.7, color: "rgba(255,255,255,0.32)" }}>{item.desc}</p>
    </motion.div>
  );
}

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const isMobile   = useIsMobile();
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const blobY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section id="about" ref={sectionRef} style={{ position: "relative", paddingTop: isMobile ? 80 : 120, paddingBottom: isMobile ? 80 : 120, overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, #000 0%, #0a0a0a 50%, #000 100%)" }} />
      <motion.div style={{ position: "absolute", right: "-8%", top: "15%", width: 560, height: 560, borderRadius: "50%", pointerEvents: "none", background: "radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 68%)", filter: "blur(80px)", y: blobY }} />

      <div style={{ ...container, position: "relative", zIndex: 10 }}>
        <div style={{ marginBottom: isMobile ? 40 : 64 }}>
          <SectionLabel number="01" label="ABOUT" />
          <motion.h2 style={{ margin: 0, fontFamily: "Exo 2, sans-serif", fontWeight: 800, fontSize: "clamp(1.8rem, 4vw, 3.1rem)", lineHeight: 1.08 }}
            initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1, duration: 0.6 }}>
            <span style={{ color: W }}>The Mind</span>
            <br />
            <span style={{ color: "rgba(255,255,255,0.38)" }}>Behind the Work</span>
          </motion.h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? 40 : 72 }}>

          {/* Left */}
          <div style={{ display: "flex", flexDirection: "column", gap: isMobile ? 32 : 44 }}>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.6 }}
              style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <p style={{ margin: 0, fontSize: 15, lineHeight: 1.85, color: "rgba(255,255,255,0.58)" }}>
                I&apos;m <strong style={{ color: W, fontWeight: 600 }}>Rosyad Zain</strong>, a creative developer focused on modern web experiences and cinematic real-time 3D environments.
              </p>
              <p style={{ margin: 0, fontSize: 13, lineHeight: 1.85, color: "rgba(255,255,255,0.36)" }}>
                I build immersive digital products using modern frontend technologies and Unreal Engine — creating interactive worlds that blend technology, atmosphere, and storytelling.
              </p>
              <p style={{ margin: 0, fontSize: 13, lineHeight: 1.85, color: "rgba(255,255,255,0.24)" }}>
                From futuristic interfaces to cinematic environments, every project is crafted with a balance of aesthetics, performance, and experience.
              </p>
            </motion.div>

            <div>
              <motion.p style={{ margin: "0 0 14px", fontSize: 9, fontFamily: "Space Grotesk, sans-serif", letterSpacing: "0.3em", color: "rgba(255,255,255,0.28)" }}
                initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
                CAPABILITIES
              </motion.p>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {CAPABILITIES.map((c, i) => <CapabilityCard key={c.title} item={c} index={i} />)}
              </div>
            </div>
          </div>

          {/* Right */}
          <div>
            <motion.p style={{ margin: "0 0 28px", fontSize: 9, fontFamily: "Space Grotesk, sans-serif", letterSpacing: "0.3em", color: "rgba(255,255,255,0.28)" }}
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
              DIGITAL JOURNEY
            </motion.p>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {JOURNEY.map((item, i) => <JourneyItem key={i} item={item} index={i} isLast={i === JOURNEY.length - 1} />)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
