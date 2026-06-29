"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAccentColor } from "@/hooks/useAccentColor";

const SECTION_STATUSES: Record<string, string> = {
  hero:         "RENDERING_PARTICLES",
  about:        "SCANNING_TIMELINE",
  projects:     "LOADING_PROJECTS",
  environments: "STREAMING_ENVIRONMENT",
  contact:      "AWAITING_INPUT",
};

function timeAgo(dateStr: string): string {
  const diff = (Date.now() - new Date(dateStr).getTime()) / 1000;
  if (diff < 3600)  return `${Math.floor(diff / 60)}M AGO`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}H AGO`;
  return `${Math.floor(diff / 86400)}D AGO`;
}

export default function SystemStatus() {
  const { color: accentColor, glow: accentGlow } = useAccentColor();
  const [status, setStatus]         = useState("RENDERING_PARTICLES");
  const [visible, setVisible]       = useState(false);
  const [lastCommit, setLastCommit] = useState<string | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 2400);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    fetch("https://api.github.com/users/rosyadzainn/events?per_page=30")
      .then((r) => r.json())
      .then((events: Array<{ type: string; created_at: string }>) => {
        const push = events.find((e) => e.type === "PushEvent");
        if (push) setLastCommit(push.created_at);
      })
      .catch(() => {});

  }, []);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    Object.keys(SECTION_STATUSES).forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setStatus(SECTION_STATUSES[id]); },
        { threshold: 0.3 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            position: "fixed", bottom: 32, right: 40, zIndex: 50,
            display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6,
            pointerEvents: "none",
          }}
        >
          {/* Section status row */}
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{
              display: "inline-block", width: 4, height: 4, borderRadius: "50%",
              background: "rgba(255,255,255,0.5)",
              boxShadow: "0 0 6px rgba(255,255,255,0.4)",
              animation: "pulse-glow 2s ease-in-out infinite",
              flexShrink: 0,
            }} />
            <AnimatePresence mode="wait">
              <motion.span
                key={status}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.25 }}
                style={{
                  fontSize: 8, fontFamily: "Plus Jakarta Sans, sans-serif",
                  fontWeight: 700, letterSpacing: "0.28em",
                  color: "rgba(255,255,255,0.22)",
                }}
              >
                {status}
              </motion.span>
            </AnimatePresence>
          </div>

          {/* GitHub last commit row */}
          <AnimatePresence>
            {lastCommit && (
              <motion.div
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                style={{ display: "flex", alignItems: "center", gap: 8 }}
              >
                <span style={{
                  display: "inline-block", width: 4, height: 4, borderRadius: "50%",
                  background: accentColor,
                  boxShadow: `0 0 6px ${accentGlow}`,
                  animation: "pulse-glow 2s ease-in-out infinite",
                  flexShrink: 0,
                }} />
                <span style={{
                  fontSize: 8, fontFamily: "Plus Jakarta Sans, sans-serif",
                  fontWeight: 700, letterSpacing: "0.28em",
                  color: "rgba(255,255,255,0.18)",
                }}>
                  LAST_COMMIT: {timeAgo(lastCommit)}
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
