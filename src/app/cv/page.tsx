"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const EDUCATION = [
  { school: "BINUS University",  degree: "Master's — Management Information Systems & Services", period: "2023 – 2025", gpa: "3.80" },
  { school: "Telkom University", degree: "BASc — Multimedia Engineering Technology",              period: "2018 – 2022", gpa: "3.59" },
];

const EXPERIENCE = [
  {
    role: "Creative Lead & Multimedia Director",
    company: "PT. Pendi Hijau Berkah",
    period: "2025 — Present",
    desc: "Leading creative direction and multimedia production — brand identity, website, and corporate visual systems for a precision health distribution company.",
  },
  {
    role: "Creative Director & Multimedia Lead",
    company: "MBBiotek (Contract)",
    period: "2025 — 2026",
    desc: "Directed website development and brand identity for a medical device manufacturer — multimedia production and medical industry packaging design.",
  },
  {
    role: "Videographer & Multimedia Support",
    company: "Seven Inc Jogja",
    period: "2021 — 2022",
    desc: "Produced visual content for a formal clothing brand — developing storytelling and creative production workflows.",
  },
];

const SKILLS = [
  { label: "DESIGN & DIRECTION",  items: ["Figma", "Design Systems", "UI/UX Design", "Brand Identity", "Creative Direction"] },
  { label: "REAL-TIME 3D",        items: ["Unreal Engine 5", "Lumen", "Nanite", "Megascans", "MetaHuman", "Environment Art"] },
  { label: "MULTIMEDIA & VISUAL", items: ["Adobe Photoshop", "Illustrator", "Premiere Pro", "After Effects", "Motion Graphics"] },
  { label: "MODERN WORKFLOW",     items: ["AI-Augmented Development", "Figma-to-Code", "WordPress", "Vercel", "Project Direction"] },
];

const PROJECTS = [
  { title: "ISLAMETRA",   url: "islametra.com",  desc: "Modern Islamic digital platform — curated content & refined reading experience.",    tech: ["Next.js", "React", "Tailwind CSS"] },
  { title: "ZAINOGEN",    url: "zainogen.com",   desc: "Clean web app for generating professional invoices — fast, minimal, modern.",         tech: ["Next.js", "TypeScript"] },
  { title: "PENDI GROUP", url: "pendi.id",       desc: "Corporate digital presence for Pendi Group holding company.",                         tech: ["WordPress", "Figma"] },
  { title: "PENDI HIJAU", url: "pendihijau.com", desc: "Digital presence for PT. Pendi Hijau Berkah — health distribution company.",         tech: ["WordPress", "Figma"] },
];

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div style={{ marginBottom: 36 }}>
    <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
      <span style={{ fontSize: 9, fontFamily: "Space Grotesk, sans-serif", letterSpacing: "0.3em", color: "rgba(255,255,255,0.35)" }}>{title}</span>
      <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.07)" }} />
    </div>
    {children}
  </div>
);

export default function CV() {
  return (
    <>
      <style>{`
        @media print {
          body { background: #fff !important; color: #000 !important; }
          .cv-wrap { background: #fff !important; color: #000 !important; }
          .cv-actions { display: none !important; }
          .cv-tag { border-color: #ccc !important; color: #555 !important; }
          .cv-divider { background: #ddd !important; }
          .cv-label { color: #888 !important; }
          .cv-muted { color: #555 !important; }
        }
      `}</style>

      <div className="cv-wrap" style={{ minHeight: "100vh", background: "#000", color: "#fff", fontFamily: "Space Grotesk, sans-serif" }}>

        {/* Actions bar */}
        <div className="cv-actions" style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, background: "rgba(0,0,0,0.85)", borderBottom: "1px solid rgba(255,255,255,0.06)", backdropFilter: "blur(16px)", padding: "12px 40px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/" style={{ fontSize: 11, letterSpacing: "0.2em", color: "rgba(255,255,255,0.45)", textDecoration: "none" }}>← BACK</Link>
          <span style={{ fontSize: 11, letterSpacing: "0.25em", color: "rgba(255,255,255,0.25)" }}>CURRICULUM VITAE</span>
          <button onClick={() => window.print()} style={{ fontSize: 11, letterSpacing: "0.2em", padding: "6px 18px", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 4, background: "none", color: "rgba(255,255,255,0.7)", cursor: "pointer" }}>
            PRINT / SAVE PDF
          </button>
        </div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{ maxWidth: 820, margin: "0 auto", padding: "100px clamp(20px, 5vw, 40px) 80px" }}
        >
          {/* Header */}
          <div style={{ marginBottom: 52, paddingBottom: 40, borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
            <p className="cv-label" style={{ fontSize: 10, letterSpacing: "0.3em", color: "rgba(255,255,255,0.3)", marginBottom: 10 }}>
              CREATIVE DIRECTOR · REAL-TIME 3D · MODERN WEB
            </p>
            <h1 style={{ margin: "0 0 4px", fontFamily: "Exo 2, sans-serif", fontWeight: 900, fontSize: "clamp(2.5rem, 6vw, 4rem)", letterSpacing: "0.02em", lineHeight: 1 }}>
              ROSYAD ZAIN
            </h1>
            <p className="cv-muted" style={{ margin: "16px 0 0", fontSize: 13, lineHeight: 1.8, color: "rgba(255,255,255,0.45)", maxWidth: 560 }}>
              I design and direct cinematic web experiences — bridging premium visual design, real-time 3D, and modern AI-augmented development workflows. I help founders, agencies, and brands deliver digital experiences that don&apos;t just inform — they leave an impression.
            </p>
            <div style={{ marginTop: 24, display: "flex", flexWrap: "wrap", gap: 20 }}>
              {[
                { label: "EMAIL",    value: "zainvon@gmail.com",            href: "mailto:zainvon@gmail.com" },
                { label: "WEB",      value: "rosyadzain.com",               href: "https://rosyadzain.com" },
                { label: "GITHUB",   value: "github.com/rosyadzainn",       href: "https://github.com/rosyadzainn" },
                { label: "LINKEDIN", value: "linkedin.com/in/rosyadzain",   href: "https://linkedin.com/in/rosyadzain" },
                { label: "LOCATION", value: "Indonesia · Remote-first",     href: undefined },
              ].map(({ label, value, href }) => (
                <div key={label}>
                  <p className="cv-label" style={{ margin: "0 0 2px", fontSize: 8, letterSpacing: "0.25em", color: "rgba(255,255,255,0.28)" }}>{label}</p>
                  {href
                    ? <a href={href} style={{ fontSize: 12, color: "rgba(255,255,255,0.65)", textDecoration: "none" }}>{value}</a>
                    : <span style={{ fontSize: 12, color: "rgba(255,255,255,0.65)" }}>{value}</span>
                  }
                </div>
              ))}
            </div>
          </div>

          {/* Experience */}
          <Section title="EXPERIENCE">
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              {EXPERIENCE.map((e) => (
                <div key={e.company} style={{ display: "grid", gridTemplateColumns: "minmax(120px, 160px) 1fr", gap: 16, alignItems: "start" }}>
                  <div>
                    <p className="cv-muted" style={{ margin: "0 0 2px", fontSize: 10, letterSpacing: "0.12em", color: "rgba(255,255,255,0.35)" }}>{e.period}</p>
                    <p style={{ margin: 0, fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.5)", letterSpacing: "0.06em" }}>{e.company}</p>
                  </div>
                  <div>
                    <p style={{ margin: "0 0 6px", fontSize: 13, fontWeight: 600, color: "#fff" }}>{e.role}</p>
                    <p className="cv-muted" style={{ margin: 0, fontSize: 12, color: "rgba(255,255,255,0.45)", lineHeight: 1.6 }}>{e.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </Section>

          {/* Education */}
          <Section title="EDUCATION">
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {EDUCATION.map((e) => (
                <div key={e.school} style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 8 }}>
                  <div>
                    <p style={{ margin: "0 0 2px", fontSize: 14, fontWeight: 600, color: "#fff" }}>{e.school}</p>
                    <p className="cv-muted" style={{ margin: 0, fontSize: 12, color: "rgba(255,255,255,0.45)" }}>{e.degree}</p>
                  </div>
                  <div style={{ textAlign: "right", flexShrink: 0 }}>
                    <p className="cv-muted" style={{ margin: "0 0 2px", fontSize: 11, color: "rgba(255,255,255,0.35)" }}>{e.period}</p>
                    <p style={{ margin: 0, fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.6)" }}>GPA {e.gpa}</p>
                  </div>
                </div>
              ))}
            </div>
          </Section>

          {/* Skills */}
          <Section title="SKILLS & TOOLS">
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "16px 32px" }}>
              {SKILLS.map((g) => (
                <div key={g.label}>
                  <p className="cv-label" style={{ margin: "0 0 8px", fontSize: 9, letterSpacing: "0.2em", color: "rgba(255,255,255,0.28)" }}>{g.label}</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                    {g.items.map((s) => (
                      <span key={s} className="cv-tag" style={{ fontSize: 10, padding: "3px 10px", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 3, color: "rgba(255,255,255,0.55)" }}>{s}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Section>

          {/* Projects */}
          <Section title="SELECTED PROJECTS">
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {PROJECTS.map((p) => (
                <div key={p.title} style={{ display: "grid", gridTemplateColumns: "minmax(120px, 160px) 1fr", gap: 16, alignItems: "start" }}>
                  <div>
                    <p style={{ margin: "0 0 2px", fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", color: "#fff" }}>{p.title}</p>
                    <a href={`https://${p.url}`} target="_blank" rel="noopener noreferrer" style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", textDecoration: "none" }}>{p.url}</a>
                  </div>
                  <div>
                    <p className="cv-muted" style={{ margin: "0 0 8px", fontSize: 12, color: "rgba(255,255,255,0.5)", lineHeight: 1.6 }}>{p.desc}</p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                      {p.tech.map((t) => (
                        <span key={t} className="cv-tag" style={{ fontSize: 9, padding: "2px 8px", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 2, color: "rgba(255,255,255,0.35)" }}>{t}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Section>

          {/* Footer */}
          <div style={{ paddingTop: 28, borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span className="cv-label" style={{ fontSize: 9, letterSpacing: "0.2em", color: "rgba(255,255,255,0.18)" }}>ROSYAD ZAIN · CURRICULUM VITAE · 2026</span>
            <span className="cv-label" style={{ fontSize: 9, letterSpacing: "0.15em", color: "rgba(255,255,255,0.18)" }}>rosyadzain.com</span>
          </div>
        </motion.div>
      </div>
    </>
  );
}
