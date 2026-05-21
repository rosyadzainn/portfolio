"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { container } from "@/lib/layout";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useLanguage } from "@/context/LanguageContext";

const TOOLS = ["UNREAL ENGINE 5", "LUMEN", "NANITE", "MEGASCANS", "METAHUMAN"];

const VIDEOS = [
  { src: "/videos/Scene Statue Fish Landscape 2.mp4", label: "UNREAL ENGINE 5", env: "ENV_001", seekTo: 1.5 },
  { src: "/videos/bamboo forest.mp4",                 label: "BAMBOO FOREST",   env: "ENV_002", seekTo: 2.0 },
];

const fmt = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;

const btnStyle: React.CSSProperties = {
  background: "none", border: "none", cursor: "pointer", padding: 0,
  display: "flex", alignItems: "center", justifyContent: "center",
  color: "rgba(255,255,255,0.7)", flexShrink: 0,
};

function VideoFrame({ src, label, env, index, seekTo }: {
  src: string; label: string; env: string; index: number; seekTo: number;
}) {
  const videoRef    = useRef<HTMLVideoElement>(null);
  const frameRef    = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const inView      = useInView(frameRef, { once: true, margin: "-60px" });
  const hasCaptured = useRef(false);

  const [playing,    setPlaying]    = useState(false);
  const [current,    setCurrent]    = useState(0);
  const [duration,   setDuration]   = useState(0);
  const [muted,      setMuted]      = useState(true);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [thumbUrl,   setThumbUrl]   = useState("");
  const [hovered,    setHovered]    = useState(false);

  // Trigger video load when the section scrolls into view
  useEffect(() => {
    if (inView) setShouldLoad(true);
  }, [inView]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    const onTime  = () => setCurrent(v.currentTime);
    const onMeta  = () => {
      setDuration(v.duration);
      // Seek to a visible frame for thumbnail
      if (!hasCaptured.current) v.currentTime = seekTo;
    };
    const onSeeked = () => {
      if (hasCaptured.current || playing) return;
      hasCaptured.current = true;
      // Capture the seeked frame to canvas as poster
      try {
        const c = document.createElement("canvas");
        c.width  = v.videoWidth  || 1280;
        c.height = v.videoHeight || 720;
        const ctx = c.getContext("2d");
        if (ctx) {
          ctx.drawImage(v, 0, 0, c.width, c.height);
          setThumbUrl(c.toDataURL("image/jpeg", 0.85));
        }
      } catch { /* cross-origin guard */ }
    };
    const onEnded = () => { setPlaying(false); setCurrent(0); };

    v.addEventListener("timeupdate",     onTime);
    v.addEventListener("loadedmetadata", onMeta);
    v.addEventListener("seeked",         onSeeked);
    v.addEventListener("ended",          onEnded);

    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setShouldLoad(true);
        else { v.pause(); setPlaying(false); }
      },
      { threshold: 0.15 }
    );
    obs.observe(v);

    return () => {
      v.removeEventListener("timeupdate",     onTime);
      v.removeEventListener("loadedmetadata", onMeta);
      v.removeEventListener("seeked",         onSeeked);
      v.removeEventListener("ended",          onEnded);
      obs.disconnect();
    };
  }, [seekTo]);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      // If still at the thumbnail seek position, reset to start
      if (!playing && Math.abs(v.currentTime - seekTo) < 0.5) v.currentTime = 0;
      v.play().catch(() => {});
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  };

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  };

  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    const v = videoRef.current, bar = progressRef.current;
    if (!v || !bar || !duration) return;
    const r = bar.getBoundingClientRect();
    v.currentTime = ((e.clientX - r.left) / r.width) * duration;
  };

  const goFullscreen = () => {
    const v = videoRef.current;
    if (!v) return;
    if (document.fullscreenElement) document.exitFullscreen();
    else v.requestFullscreen().catch(() => {});
  };

  const pct = duration > 0 ? (current / duration) * 100 : 0;

  return (
    <motion.div
      ref={frameRef}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.15, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{
        position: "relative", width: "100%", aspectRatio: "16/9",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 8, overflow: "hidden", background: "#080808",
      }}>
        {/* Placeholder shown before video loads */}
        {!thumbUrl && (
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(135deg, #0d0d0d 0%, #111 50%, #0a0a0a 100%)",
            display: "flex", alignItems: "center", justifyContent: "center",
            zIndex: 0,
          }}>
            <div style={{
              width: 40, height: 40, borderRadius: "50%",
              border: "1px solid rgba(255,255,255,0.08)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
                <path d="M5 3L17 10L5 17V3Z" fill="rgba(255,255,255,0.18)" />
              </svg>
            </div>
          </div>
        )}

        <video
          ref={videoRef}
          src={shouldLoad ? src : undefined}
          poster={thumbUrl || undefined}
          muted loop playsInline
          preload={shouldLoad ? "metadata" : "none"}
          style={{
            position: "absolute", inset: 0, width: "100%", height: "100%",
            objectFit: "cover", objectPosition: "center",
            zIndex: 1,
          }}
        />

        {/* Center play overlay — always visible when not playing, show full opacity on hover */}
        <div
          onClick={togglePlay}
          style={{
            position: "absolute", inset: 0, bottom: 36, zIndex: 3,
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer",
            opacity: playing ? (hovered ? 0.6 : 0) : 1,
            transition: "opacity 0.25s ease",
          }}
        >
          <motion.div
            style={{
              width: 52, height: 52, borderRadius: "50%",
              background: "rgba(0,0,0,0.65)",
              border: "1px solid rgba(255,255,255,0.22)",
              display: "flex", alignItems: "center", justifyContent: "center",
              backdropFilter: "blur(8px)",
            }}
            whileHover={{ scale: 1.1, background: "rgba(255,255,255,0.15)" }}
            whileTap={{ scale: 0.93 }}
          >
            {playing
              ? <svg width="12" height="12" viewBox="0 0 10 10" fill="none">
                  <rect x="1" y="0" width="3" height="10" rx="1" fill="rgba(255,255,255,0.9)"/>
                  <rect x="6" y="0" width="3" height="10" rx="1" fill="rgba(255,255,255,0.9)"/>
                </svg>
              : <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                  <path d="M5 3L17 10L5 17V3Z" fill="rgba(255,255,255,0.9)" />
                </svg>
            }
          </motion.div>
        </div>

        {/* Vignette */}
        <div style={{
          position: "absolute", inset: 0, bottom: 36, pointerEvents: "none", zIndex: 2,
          background: "radial-gradient(ellipse 85% 70% at 50% 50%, transparent 40%, rgba(0,0,0,0.45) 100%)",
        }} />

        {/* Corner brackets */}
        {[
          { top: 10,    left: 10,  borderTop:    "1px solid rgba(255,255,255,0.28)", borderLeft:   "1px solid rgba(255,255,255,0.28)" },
          { top: 10,    right: 10, borderTop:    "1px solid rgba(255,255,255,0.28)", borderRight:  "1px solid rgba(255,255,255,0.28)" },
          { bottom: 46, left: 10,  borderBottom: "1px solid rgba(255,255,255,0.28)", borderLeft:   "1px solid rgba(255,255,255,0.28)" },
          { bottom: 46, right: 10, borderBottom: "1px solid rgba(255,255,255,0.28)", borderRight:  "1px solid rgba(255,255,255,0.28)" },
        ].map((s, i) => (
          <div key={i} style={{ position: "absolute", width: 14, height: 14, zIndex: 4, ...s }} />
        ))}

        {/* ── Control bar ── */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 5,
          height: 36, display: "flex", alignItems: "center", gap: 8,
          padding: "0 10px",
          background: "rgba(0,0,0,0.88)",
          borderTop: "1px solid rgba(255,255,255,0.06)",
          backdropFilter: "blur(10px)",
        }}>
          {/* Play/Pause */}
          <button onClick={togglePlay} style={btnStyle}>
            {playing
              ? <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><rect x="1" y="0" width="3" height="10" rx="1" fill="rgba(255,255,255,0.85)"/><rect x="6" y="0" width="3" height="10" rx="1" fill="rgba(255,255,255,0.85)"/></svg>
              : <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 1L9 5L2 9V1Z" fill="rgba(255,255,255,0.85)"/></svg>
            }
          </button>

          {/* Timecode */}
          <span style={{ fontSize: 9, fontFamily: "Space Grotesk, sans-serif", color: "rgba(255,255,255,0.55)", letterSpacing: "0.04em", flexShrink: 0, minWidth: 72 }}>
            {fmt(current)} / {fmt(duration)}
          </span>

          {/* Progress bar */}
          <div
            ref={progressRef}
            onClick={seek}
            style={{ flex: 1, height: 3, background: "rgba(255,255,255,0.15)", borderRadius: 2, cursor: "pointer", position: "relative" }}
          >
            <div style={{ position: "absolute", left: 0, top: 0, height: "100%", width: `${pct}%`, background: "rgba(255,255,255,0.85)", borderRadius: 2, transition: "width 0.1s linear" }} />
          </div>

          {/* Volume */}
          <button onClick={toggleMute} style={btnStyle}>
            {muted
              ? <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M11 5L6 9H2v6h4l5 4V5Z" fill="rgba(255,255,255,0.5)"/><line x1="18" y1="9" x2="23" y2="15" stroke="rgba(255,255,255,0.5)" strokeWidth="2"/><line x1="23" y1="9" x2="18" y2="15" stroke="rgba(255,255,255,0.5)" strokeWidth="2"/></svg>
              : <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M11 5L6 9H2v6h4l5 4V5Z" fill="rgba(255,255,255,0.85)"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07" stroke="rgba(255,255,255,0.85)" strokeWidth="2"/></svg>
            }
          </button>

          {/* Fullscreen */}
          <button onClick={goFullscreen} style={btnStyle}>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="2">
              <polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/>
              <line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/>
            </svg>
          </button>

          {/* ENV label */}
          <span style={{ fontSize: 8, fontFamily: "Space Grotesk, sans-serif", letterSpacing: "0.18em", color: "rgba(255,255,255,0.22)", flexShrink: 0 }}>
            {env}
          </span>
        </div>

        {/* Top-left label */}
        <div style={{ position: "absolute", top: 12, left: 14, zIndex: 4, display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ width: 4, height: 4, borderRadius: "50%", background: "rgba(255,255,255,0.5)", boxShadow: "0 0 5px rgba(255,255,255,0.35)", display: "inline-block" }} />
          <span style={{ fontSize: 8, fontFamily: "Space Grotesk, sans-serif", letterSpacing: "0.2em", color: "rgba(255,255,255,0.4)" }}>{label}</span>
        </div>
      </div>
    </motion.div>
  );
}

export default function RealTime3D() {
  const sectionRef = useRef<HTMLElement>(null);
  const headRef    = useRef<HTMLDivElement>(null);
  const headInView = useInView(headRef, { once: true, margin: "-80px" });
  const isMobile   = useIsMobile();

  const { t } = useLanguage();
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const blobY = useTransform(scrollYProgress, [0, 1], [-40, 40]);

  return (
    <section
      id="environments"
      ref={sectionRef}
      style={{ position: "relative", paddingTop: isMobile ? 80 : 120, paddingBottom: isMobile ? 80 : 120, overflow: "hidden" }}
    >
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, #000 0%, #080808 50%, #000 100%)" }} />
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
              03 / {t.env.label}
            </span>
          </motion.div>

          <motion.h2
            style={{ margin: "0 0 20px", fontFamily: "Exo 2, sans-serif", fontWeight: 800, fontSize: "clamp(2rem, 4.5vw, 3.25rem)", lineHeight: 1.06 }}
            initial={{ opacity: 0, y: 22 }} animate={headInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.12, duration: 0.6 }}
          >
            <span style={{ color: "#fff" }}>{t.env.h1}</span>
            <br />
            <span style={{ color: "rgba(255,255,255,0.4)" }}>{t.env.h2}</span>
          </motion.h2>

          <motion.p
            style={{ margin: 0, fontSize: 14, lineHeight: 1.85, color: "rgba(255,255,255,0.38)" }}
            initial={{ opacity: 0, y: 14 }} animate={headInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.22, duration: 0.55 }}
          >
            {t.env.sub}
          </motion.p>
        </div>

        {/* ── Video grid ── */}
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? 16 : 20 }}>
          {VIDEOS.map((v, i) => (
            <VideoFrame key={v.env} src={v.src} label={v.label} env={v.env} index={i} seekTo={v.seekTo} />
          ))}
        </div>

        {/* ── Tool tags ── */}
        <motion.div
          style={{ marginTop: 24, display: "flex", gap: 8, flexWrap: "wrap" }}
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {TOOLS.map((tool) => (
            <span key={tool} style={{
              fontSize: 9, fontFamily: "Space Grotesk, sans-serif",
              padding: "3px 12px", borderRadius: 2,
              background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)",
              color: "rgba(255,255,255,0.28)", letterSpacing: "0.15em",
            }}>
              {tool}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
