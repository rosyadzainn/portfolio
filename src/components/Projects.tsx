"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useLanguage } from "@/context/LanguageContext";
import DecryptText from "./DecryptText";

const PROJECTS_META = [
  {
    id: 5, slug: "anharumitra",
    title: "ANHARU MITRA",
    url: "https://anharumitra.com/en",
    tech: ["Next.js", "React", "Tailwind CSS", "i18n"],
    category: "Web · Corporate", year: "2026", status: "LIVE", type: "CLIENT WORK",
  },
  {
    id: 3, slug: "pendi",
    title: "PENDI GROUP",
    url: "https://www.pendi.id",
    tech: ["Next.js", "React", "Figma"],
    category: "Web · Corporate", year: "2025", status: "LIVE", type: "CLIENT WORK",
  },
  {
    id: 4, slug: "pendihijau",
    title: "PENDI HIJAU",
    url: "https://www.pendihijau.com",
    tech: ["Next.js", "React", "Figma"],
    category: "Web · Corporate", year: "2025", status: "LIVE", type: "CLIENT WORK",
  },
  {
    id: 1, slug: "islametra",
    title: "ISLAMETRA",
    url: "https://www.islametra.com",
    tech: ["Next.js", "React", "Tailwind CSS", "CMS"],
    category: "Web · Platform", year: "2025", status: "LIVE", type: "PERSONAL PROJECT",
  },
  {
    id: 2, slug: "zainogen",
    title: "ZAINOGEN",
    url: "https://www.zainogen.com",
    tech: ["Next.js", "React", "TypeScript"],
    category: "Web · Tool", year: "2025", status: "LIVE", type: "PERSONAL PROJECT",
  },
];

function screenshotFallback(url: string) {
  return `https://s0.wordpress.com/mshots/v1/${encodeURIComponent(url)}?w=1200&h=900`;
}

type ProjectItem = (typeof PROJECTS_META)[0] & { subtitle: string; description: string; };

function ProjectCard({ project, index, featured }: { project: ProjectItem; index: number; featured: boolean }) {
  const [hov, setHov]         = useState(false);
  const [imgSrc, setImgSrc]   = useState(`/images/projects/${project.slug}.jpg`);
  const [imgLoaded, setImgLoaded] = useState(false);
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 32 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}>
      <a href={project.url} target="_blank" rel="noopener noreferrer"
        style={{ display: "block", textDecoration: "none" }}
        data-hover="true" data-cursor="EXPLORE"
        onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>

        {/* Image */}
        <div style={{
          position: "relative", borderRadius: 16, overflow: "hidden",
          aspectRatio: featured ? "16 / 7.5" : "16 / 10",
          border: "1px solid rgba(255,255,255,0.08)", background: "#080808",
        }}>
          {!imgLoaded && (
            <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ width: 24, height: 24, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.15)", borderTopColor: "rgba(255,255,255,0.5)", animation: "spin-slow 1s linear infinite" }} />
            </div>
          )}
          <img
            src={imgSrc}
            alt={project.title}
            onLoad={() => setImgLoaded(true)}
            onError={() => { if (!imgSrc.includes("mshots")) setImgSrc(screenshotFallback(project.url)); }}
            style={{
              width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center", display: "block",
              opacity: imgLoaded ? 1 : 0,
              transform: hov ? "scale(1.04)" : "scale(1)",
              transition: "opacity 0.5s ease, transform 0.6s cubic-bezier(0.22,1,0.36,1)",
            }}
            loading="lazy"
          />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 55%, rgba(0,0,0,0.45) 100%)", pointerEvents: "none" }} />
          {/* White glow — bottom-left on hover */}
          <div style={{
            position: "absolute", inset: 0, pointerEvents: "none",
            background: "radial-gradient(ellipse 55% 65% at 0% 100%, rgba(255,255,255,0.28) 0%, rgba(255,255,255,0.08) 35%, transparent 65%)",
            opacity: hov ? 1 : 0,
            transition: "opacity 0.45s ease",
          }} />
        </div>

        {/* Meta below image */}
        <div style={{ paddingTop: featured ? 20 : 16 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: featured ? 12 : 9 }}>
            <span style={{ fontSize: 11, fontFamily: "Plus Jakarta Sans, sans-serif", color: "rgba(255,255,255,0.4)", letterSpacing: "0.06em" }}>{project.year}</span>
            <span style={{ fontSize: 10, fontFamily: "Plus Jakarta Sans, sans-serif", fontWeight: 600, letterSpacing: "0.06em", color: "rgba(255,255,255,0.55)", padding: "5px 14px", borderRadius: 999, border: "1px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.04)" }}>
              {project.category}
            </span>
          </div>
          <h3 style={{ margin: "0 0 8px", fontFamily: "Plus Jakarta Sans, sans-serif", fontWeight: 700, color: hov ? "#fff" : "rgba(255,255,255,0.92)", fontSize: featured ? "clamp(1.3rem, 2.4vw, 1.7rem)" : "1.15rem", transition: "color 0.2s" }}>
            <DecryptText text={project.title} trigger={inView} delay={index * 100} />
          </h3>
          <p style={{ margin: 0, fontSize: featured ? 14 : 13, lineHeight: 1.75, color: "rgba(255,255,255,0.42)", fontFamily: "Plus Jakarta Sans, sans-serif", maxWidth: featured ? 640 : "100%" }}>
            {project.description}
          </p>
        </div>
      </a>
    </motion.div>
  );
}

export default function Projects() {
  const headRef    = useRef<HTMLDivElement>(null);
  const headInView = useInView(headRef, { once: true, margin: "-80px" });
  const isMobile   = useIsMobile();
  const { t }      = useLanguage();

  const projects = PROJECTS_META.map((p, i) => ({
    ...p,
    subtitle: t.projects.items[i].subtitle,
    description: t.projects.items[i].desc,
  }));

  return (
    <section id="projects" style={{ position: "relative", paddingTop: isMobile ? 80 : 112, paddingBottom: isMobile ? 80 : 112, overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, #000 0%, #0a0a0a 55%, #000 100%)" }} />
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", backgroundImage: "linear-gradient(rgba(255,255,255,0.012) 1px, transparent 1px)", backgroundSize: "100% 72px" }} />

      <div style={{ position: "relative", zIndex: 10, padding: isMobile ? "0 24px" : "0 19%" }}>
        <div ref={headRef} style={{ marginBottom: isMobile ? 36 : 56 }}>
          <motion.div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}
            initial={{ opacity: 0, x: -20 }} animate={headInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.5 }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#fff", boxShadow: "0 0 10px rgba(255,255,255,0.6)", animation: "pulse-glow 2s ease-in-out infinite" }} />
            <span style={{ fontSize: 11, fontFamily: "Plus Jakarta Sans, sans-serif", fontWeight: 600, letterSpacing: "0.24em", color: "rgba(255,255,255,0.5)" }}>{t.projects.label}</span>
          </motion.div>
          <motion.h2 style={{ margin: "0 0 12px", fontFamily: "Plus Jakarta Sans, sans-serif", fontWeight: 800, fontSize: "clamp(2rem, 4.5vw, 3.25rem)" }}
            initial={{ opacity: 0, y: 22 }} animate={headInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.15, duration: 0.6 }}>
            <span style={{ color: "#fff" }}>{t.projects.h1}</span><br />
            <span style={{ color: "rgba(255,255,255,0.4)" }}>{t.projects.h2}</span>
          </motion.h2>
          <motion.p style={{ margin: 0, fontSize: 13, fontFamily: "Plus Jakarta Sans, sans-serif", color: "rgba(255,255,255,0.28)" }}
            initial={{ opacity: 0 }} animate={headInView ? { opacity: 1 } : {}} transition={{ delay: 0.3, duration: 0.5 }}>
            {t.projects.sub}
          </motion.p>
        </div>

        {/* Featured (latest) */}
        <div style={{
          marginBottom: isMobile ? 32 : 56,
          padding: isMobile ? 18 : 32,
          borderRadius: 22,
          background: "linear-gradient(135deg, #050505 0%, #131313 55%, #202020 100%)",
          border: "1px solid rgba(255,255,255,0.07)",
        }}>
          <ProjectCard project={projects[0]} index={0} featured />
        </div>

        {/* Rest — 2-column grid */}
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)", gap: isMobile ? 24 : 28 }}>
          {projects.slice(1).map((p, i) => (
            <div key={p.id} style={{
              padding: isMobile ? 16 : 22,
              borderRadius: 18,
              background: "linear-gradient(135deg, #050505 0%, #131313 55%, #202020 100%)",
              border: "1px solid rgba(255,255,255,0.07)",
            }}>
              <ProjectCard project={p} index={i + 1} featured={false} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
