"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { container } from "@/lib/layout";
import { useIsMobile } from "@/hooks/useIsMobile";
import DecryptText from "./DecryptText";

const PROJECTS = [
  {
    id: 1, slug: "islametra",
    title: "ISLAMETRA", subtitle: "Islamic Digital Platform",
    url: "https://www.islametra.com",
    description: "A modern Islamic platform delivering curated content, digital resources, and a refined reading experience for a Muslim audience.",
    tech: ["Next.js", "React", "Tailwind CSS", "CMS"],
    category: "Web · Platform", year: "2025", status: "LIVE",
  },
  {
    id: 2, slug: "zainogen",
    title: "ZAINOGEN", subtitle: "Invoice Generator",
    url: "https://www.zainogen.com",
    description: "A clean and efficient web application for generating professional invoices — fast, minimal, and built for modern workflows.",
    tech: ["Next.js", "React", "TypeScript"],
    category: "Web · Tool", year: "2025", status: "LIVE",
  },
  {
    id: 3, slug: "pendi",
    title: "PENDI GROUP", subtitle: "Holding Company Digital Presence",
    url: "https://www.pendi.id",
    description: "Digital presence for Pendi Group, a holding company — clean corporate branding, group profile, and modern multi-entity business presentation.",
    tech: ["WordPress", "Figma"],
    category: "Web · Corporate", year: "2025", status: "LIVE",
  },
  {
    id: 4, slug: "pendihijau",
    title: "PENDI HIJAU", subtitle: "Health Distribution Company",
    url: "https://www.pendihijau.com",
    description: "Digital presence for PT. Pendi Hijau Berkah — a precision health distribution company, showcasing products, partnerships, and corporate profile.",
    tech: ["WordPress", "Figma"],
    category: "Web · Corporate", year: "2025", status: "LIVE",
  },
];

function screenshotFallback(url: string) {
  return `https://s0.wordpress.com/mshots/v1/${encodeURIComponent(url)}?w=1200&h=900`;
}

function ProjectCard({ project, index }: { project: (typeof PROJECTS)[0]; index: number }) {
  const [hov, setHov]         = useState(false);
  const [mouse, setMouse]     = useState({ x: 0.5, y: 0.5 });
  const [imgSrc, setImgSrc]   = useState(`/images/projects/${project.slug}.jpg`);
  const [imgLoaded, setImgLoaded] = useState(false);
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div ref={ref} style={{ perspective: 1000 }}
      initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
      <a href={project.url} target="_blank" rel="noopener noreferrer"
        style={{ display: "block", textDecoration: "none" }}
        data-hover="true" data-cursor="EXPLORE"
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => { setHov(false); setMouse({ x: 0.5, y: 0.5 }); }}
        onMouseMove={(e) => {
          const r = ref.current?.getBoundingClientRect();
          if (!r) return;
          setMouse({ x: (e.clientX - r.left) / r.width, y: (e.clientY - r.top) / r.height });
        }}>
        <motion.div style={{ position: "relative", borderRadius: 10, overflow: "hidden", transformStyle: "preserve-3d", background: "rgba(10,10,10,0.95)", display: "flex", flexDirection: "column" }}
          animate={{
            rotateX: hov ? (mouse.y - 0.5) * -5 : 0,
            rotateY: hov ? (mouse.x - 0.5) * 5 : 0,
            boxShadow: hov ? "0 24px 56px rgba(255,255,255,0.07), 0 0 0 1px rgba(255,255,255,0.2)" : "0 4px 24px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.05)",
          }}
          transition={{ type: "spring", stiffness: 220, damping: 26 }}>

          {/* Screenshot preview */}
          <div style={{ position: "relative", height: 196, overflow: "hidden", flexShrink: 0, background: "#080808" }}>
            {!imgLoaded && (
              <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ width: 24, height: 24, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.15)", borderTopColor: "rgba(255,255,255,0.5)", animation: "spin-slow 1s linear infinite" }} />
              </div>
            )}
            <motion.img
              src={imgSrc}
              alt={project.title}
              onLoad={() => setImgLoaded(true)}
              onError={() => { if (!imgSrc.includes("mshots")) setImgSrc(screenshotFallback(project.url)); }}
              style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center", display: "block", opacity: imgLoaded ? 1 : 0, transition: "opacity 0.5s ease" }}
              animate={{ scale: hov ? 1.04 : 1, filter: hov ? "brightness(0.85)" : "brightness(0.65)" }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              loading="lazy"
            />
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 72, background: "linear-gradient(0deg, rgba(10,10,10,0.98) 0%, transparent 100%)", pointerEvents: "none" }} />
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)", opacity: hov ? 1 : 0, transition: "opacity 0.4s", pointerEvents: "none" }} />
            <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: `radial-gradient(ellipse at ${mouse.x * 100}% ${mouse.y * 100}%, rgba(255,255,255,0.06), transparent 65%)`, opacity: hov ? 1 : 0, transition: "opacity 0.3s" }} />
          </div>

          {/* Card body */}
          <div style={{ padding: "18px 22px 22px", display: "flex", flexDirection: "column", flex: 1 }}>
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 14 }}>
              <div>
                <span style={{ display: "block", fontSize: 9, fontFamily: "Space Grotesk, sans-serif", letterSpacing: "0.22em", marginBottom: 2, color: "rgba(255,255,255,0.28)" }}>{project.category}</span>
                <span style={{ fontSize: 9, fontFamily: "Space Grotesk, sans-serif", color: "rgba(255,255,255,0.18)" }}>{project.year}</span>
              </div>
              <span style={{ fontSize: 8, fontFamily: "Space Grotesk, sans-serif", fontWeight: 700, letterSpacing: "0.2em", padding: "2px 8px", borderRadius: 3, border: "1px solid rgba(255,255,255,0.14)", color: "rgba(255,255,255,0.45)", background: "rgba(255,255,255,0.04)" }}>
                {project.status}
              </span>
            </div>

            <h3 style={{ margin: "0 0 2px", fontFamily: "Exo 2, sans-serif", fontSize: 18, fontWeight: 800, color: "#fff", letterSpacing: "0.04em" }}>
              <DecryptText text={project.title} trigger={inView} delay={index * 120} />
            </h3>
            <p style={{ margin: "0 0 3px", fontSize: 11, fontFamily: "Space Grotesk, sans-serif", color: "rgba(255,255,255,0.32)" }}>{project.subtitle}</p>
            <span style={{ fontSize: 9, fontFamily: "Space Grotesk, sans-serif", color: "rgba(255,255,255,0.18)", letterSpacing: "0.06em", marginBottom: 14, display: "block" }}>
              {project.url.replace("https://www.", "")}
            </span>
            <p style={{ margin: "0 0 16px", fontSize: 12, lineHeight: 1.7, flex: 1, color: "rgba(255,255,255,0.36)" }}>{project.description}</p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
              {project.tech.map((t) => (
                <span key={t} style={{ fontSize: 9, fontFamily: "Space Grotesk, sans-serif", padding: "2px 8px", borderRadius: 2, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.3)" }}>{t}</span>
              ))}
            </div>

            <AnimatePresence>
              {hov && (
                <motion.div style={{ marginTop: 14 }} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 4 }} transition={{ duration: 0.16 }}>
                  <span style={{ fontSize: 9, fontFamily: "Space Grotesk, sans-serif", fontWeight: 700, letterSpacing: "0.2em", color: "rgba(255,255,255,0.6)", display: "flex", alignItems: "center", gap: 7 }}>
                    VISIT SITE
                    <motion.span animate={{ x: [0, 5, 0] }} transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}>→</motion.span>
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </a>
    </motion.div>
  );
}

export default function Projects() {
  const headRef    = useRef<HTMLDivElement>(null);
  const headInView = useInView(headRef, { once: true, margin: "-80px" });
  const isMobile   = useIsMobile();

  return (
    <section id="projects" style={{ position: "relative", paddingTop: isMobile ? 80 : 112, paddingBottom: isMobile ? 80 : 112, overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, #000 0%, #0a0a0a 55%, #000 100%)" }} />
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", backgroundImage: "linear-gradient(rgba(255,255,255,0.012) 1px, transparent 1px)", backgroundSize: "100% 72px" }} />

      <div style={{ ...container, position: "relative", zIndex: 10 }}>
        <div ref={headRef} style={{ marginBottom: isMobile ? 36 : 56 }}>
          <motion.div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}
            initial={{ opacity: 0, x: -20 }} animate={headInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.5 }}>
            <div style={{ height: 1, width: 48, background: "linear-gradient(90deg, rgba(255,255,255,0.5), transparent)" }} />
            <span style={{ fontSize: 10, fontFamily: "Space Grotesk, sans-serif", letterSpacing: "0.3em", color: "rgba(255,255,255,0.3)" }}>02 / PROJECTS</span>
          </motion.div>
          <motion.h2 style={{ margin: "0 0 12px", fontFamily: "Exo 2, sans-serif", fontWeight: 800, fontSize: "clamp(2rem, 4.5vw, 3.25rem)" }}
            initial={{ opacity: 0, y: 22 }} animate={headInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.15, duration: 0.6 }}>
            <span style={{ color: "#fff" }}>Selected</span><br />
            <span style={{ color: "rgba(255,255,255,0.4)" }}>Works</span>
          </motion.h2>
          <motion.p style={{ margin: 0, fontSize: 13, fontFamily: "Space Grotesk, sans-serif", color: "rgba(255,255,255,0.28)" }}
            initial={{ opacity: 0 }} animate={headInView ? { opacity: 1 } : {}} transition={{ delay: 0.3, duration: 0.5 }}>
            A focused selection of live websites built for real clients.
          </motion.p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)", gap: isMobile ? 12 : 16, alignItems: "stretch" }}>
          {PROJECTS.map((p, i) => <ProjectCard key={p.id} project={p} index={i} />)}
        </div>
      </div>
    </section>
  );
}
