"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useIsMobile } from "@/hooks/useIsMobile";

const EXPERIENCE = [
  {
    period: "2023 — Present",
    role: "Freelance Product Designer & Developer",
    company: "Independent",
    points: [
      "Lead end-to-end design & build — research, UI systems, and shipped web products.",
      "Deliver brand identity and digital presence for startups and SMEs.",
    ],
  },
  {
    period: "2022 — 2023",
    role: "Product & Brand Designer",
    company: "Various Clients",
    points: [
      "Designed visual identities, marketing assets, and digital products across industries.",
      "Built reusable UI components and style guides for consistent delivery.",
    ],
  },
  {
    period: "2020 — 2022",
    role: "Videographer & Multimedia",
    company: "Media Production",
    points: [
      "Produced video, photography, and motion graphics for commercial clients.",
      "Managed shoots end-to-end, from concept to final edit.",
    ],
  },
];

function Item({ item, index, isLast, hovered, setHovered }: {
  item: typeof EXPERIENCE[0]; index: number; isLast: boolean;
  hovered: number | null; setHovered: (i: number | null) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const isMobile = useIsMobile();
  const active = hovered === index;
  const dimmed = hovered !== null && !active;
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => { if (!isMobile) setHovered(index); }}
      onMouseLeave={() => { if (!isMobile) setHovered(null); }}
      style={{
        display: "grid", gridTemplateColumns: isMobile ? "1fr" : "110px 30px 1fr", gap: isMobile ? 8 : 18,
        paddingTop: 26, paddingBottom: isLast ? 0 : 26,
        opacity: dimmed ? 0.35 : 1,
        transform: !isMobile && active ? "translateX(5px)" : "translateX(0)",
        transition: "opacity 0.3s ease, transform 0.3s ease",
      }}
    >
      <span style={{ fontSize: 11, fontFamily: "Plus Jakarta Sans, sans-serif", color: active ? "rgba(255,255,255,0.6)" : "rgba(255,255,255,0.3)", letterSpacing: "0.04em", paddingTop: 3, transition: "color 0.25s" }}>
        {item.period}
      </span>

      {/* Timeline node + line */}
      {!isMobile && (
        <div style={{ position: "relative", display: "flex", justifyContent: "center" }}>
          {!isLast && (
            <div style={{ position: "absolute", top: 8, bottom: -26, left: "50%", width: 1, transform: "translateX(-50%)", background: "rgba(255,255,255,0.1)" }} />
          )}
          <span style={{
            position: "relative", zIndex: 1, marginTop: 3, flexShrink: 0,
            width: active ? 11 : 9, height: active ? 11 : 9, borderRadius: "50%",
            background: active ? "#fff" : "#0c0c0c",
            border: active ? "none" : "1.5px solid rgba(255,255,255,0.35)",
            boxShadow: active ? "0 0 12px rgba(255,255,255,0.7)" : "none",
            transition: "all 0.3s ease",
          }} />
        </div>
      )}

      <div>
        <div style={{ display: "flex", alignItems: "baseline", gap: 10, flexWrap: "wrap", marginBottom: 12 }}>
          <h3 style={{ margin: 0, fontFamily: "Plus Jakarta Sans, sans-serif", fontWeight: 700, fontSize: 16, color: "#fff" }}>{item.role}</h3>
          <span style={{ fontSize: 12, fontFamily: "Plus Jakarta Sans, sans-serif", color: active ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.3)", transition: "color 0.25s" }}>· {item.company}</span>
        </div>
        <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 7 }}>
          {item.points.map((pt, i) => (
            <li key={i} style={{ display: "flex", gap: 10, fontSize: 13.5, lineHeight: 1.7, color: active ? "rgba(255,255,255,0.6)" : "rgba(255,255,255,0.42)", fontFamily: "Plus Jakarta Sans, sans-serif", transition: "color 0.25s" }}>
              <span style={{ flexShrink: 0, marginTop: 8, width: 4, height: 4, borderRadius: "50%", background: "rgba(255,255,255,0.35)" }} />
              <span>{pt}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

export default function ExperienceHome() {
  const isMobile = useIsMobile();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section id="experience" style={{ position: "relative", zIndex: 3, background: "linear-gradient(180deg, #0e0e0e 0%, #090909 60%, #070707 100%)", padding: isMobile ? "90px 0" : "140px 0", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
      <div style={{ padding: isMobile ? "0 24px" : "0 19%" }}>

        <div ref={ref} style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "0.8fr 1.2fr", gap: isMobile ? 40 : 80, alignItems: "start" }}>
          <div>
            <motion.div
              initial={{ opacity: 0, x: -16 }} animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5 }}
              style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}
            >
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#fff", boxShadow: "0 0 10px rgba(255,255,255,0.6)", animation: "pulse-glow 2s ease-in-out infinite" }} />
              <span style={{ fontSize: 11, fontFamily: "Plus Jakarta Sans, sans-serif", fontWeight: 600, letterSpacing: "0.24em", color: "rgba(255,255,255,0.5)" }}>EXPERIENCE</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              style={{ margin: 0, fontFamily: "Plus Jakarta Sans, sans-serif", fontWeight: 700, fontSize: "clamp(1.8rem, 3.2vw, 2.8rem)", color: "#fff", lineHeight: 1.12 }}
            >
              Where I&apos;ve been<br />building value.
            </motion.h2>
          </div>

          <div>
            {EXPERIENCE.map((item, i) => (
              <Item key={i} item={item} index={i} isLast={i === EXPERIENCE.length - 1}
                hovered={hovered} setHovered={setHovered} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
