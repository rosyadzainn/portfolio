"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LINES = [
  "INITIALIZING SYSTEM...",
  "LOADING MODULES [████████░░] 82%",
  "ESTABLISHING CONNECTION...",
  "COMPILING ALGORITHMS...",
  "ACTIVATING RENDERER...",
  "SYSTEM READY.",
];

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [lines, setLines] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"boot" | "logo" | "out">("boot");
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    let i = 0;
    intervalRef.current = setInterval(() => {
      if (i < LINES.length) {
        setLines((p) => [...p, LINES[i]]);
        setProgress(Math.round(((i + 1) / LINES.length) * 100));
        i++;
      } else {
        clearInterval(intervalRef.current!);
        setTimeout(() => {
          setPhase("logo");
          setTimeout(() => {
            setPhase("out");
            setTimeout(onComplete, 700);
          }, 1800);
        }, 300);
      }
    }, 200);
    return () => clearInterval(intervalRef.current!);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== "out" && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          style={{ background: "#000" }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
        >
          <Corner pos="tl" /> <Corner pos="tr" />
          <Corner pos="bl" /> <Corner pos="br" />

          <AnimatePresence mode="wait">
            {phase === "boot" && (
              <motion.div
                key="terminal"
                className="w-full max-w-lg px-8"
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#fff", boxShadow: "0 0 6px rgba(255,255,255,0.5)" }} />
                  <span style={{ fontSize: 10, fontFamily: "Space Grotesk, sans-serif", color: "rgba(255,255,255,0.35)", letterSpacing: "0.22em" }}>
                    BOOT_SEQUENCE_v4.1
                  </span>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  {lines.map((line, idx) => (
                    <motion.div
                      key={idx}
                      style={{ display: "flex", alignItems: "center", gap: 12 }}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 12 }}>›</span>
                      <span style={{
                        fontSize: 12, fontFamily: "Space Grotesk, sans-serif",
                        color: idx === lines.length - 1 ? "#fff" : "rgba(255,255,255,0.32)",
                      }}>
                        {line}
                      </span>
                      {idx === lines.length - 1 && (
                        <span style={{ display: "inline-block", width: 6, height: 14, background: "#fff", animation: "blink 1s step-end infinite" }} />
                      )}
                    </motion.div>
                  ))}
                </div>

                <div style={{ marginTop: 32 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                    <span style={{ fontSize: 9, fontFamily: "Space Grotesk, sans-serif", color: "rgba(255,255,255,0.3)", letterSpacing: "0.22em" }}>LOADING</span>
                    <span style={{ fontSize: 9, fontFamily: "Space Grotesk, sans-serif", color: "rgba(255,255,255,0.7)" }}>{progress}%</span>
                  </div>
                  <div style={{ height: 1, width: "100%", background: "rgba(255,255,255,0.07)" }}>
                    <motion.div
                      style={{ height: "100%", background: "#fff", boxShadow: "0 0 6px rgba(255,255,255,0.5)" }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.25 }}
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {phase === "logo" && (
              <motion.div
                key="logo"
                style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 24 }}
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.04 }}
                transition={{ duration: 0.5 }}
              >
                <div style={{ position: "relative", width: 72, height: 72 }}>
                  <div style={{
                    position: "absolute", inset: 0, borderRadius: "50%",
                    border: "1px solid rgba(255,255,255,0.22)",
                    animation: "spin-slow 6s linear infinite",
                  }} />
                  <div style={{
                    position: "absolute", inset: 10, borderRadius: "50%",
                    border: "1px solid rgba(255,255,255,0.1)",
                    animation: "spin-slow 4s linear infinite reverse",
                  }} />
                  <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <div style={{
                      width: 22, height: 22, borderRadius: "50%",
                      background: "#fff",
                      boxShadow: "0 0 20px rgba(255,255,255,0.6), 0 0 40px rgba(255,255,255,0.2)",
                      animation: "pulse-glow 2s ease-in-out infinite",
                    }} />
                  </div>
                </div>

                <div style={{ textAlign: "center" }}>
                  <motion.h1
                    style={{ fontFamily: "Exo 2, sans-serif", fontSize: 24, fontWeight: 800, letterSpacing: "0.28em", color: "#fff", margin: 0 }}
                    initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25, duration: 0.45 }}
                  >
                    ROSYAD ZAIN
                  </motion.h1>
                  <motion.p
                    style={{ fontSize: 9, fontFamily: "Space Grotesk, sans-serif", marginTop: 6, letterSpacing: "0.45em", color: "rgba(255,255,255,0.35)" }}
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    transition={{ delay: 0.45, duration: 0.4 }}
                  >
                    CREATIVE DEVELOPER
                  </motion.p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Corner({ pos }: { pos: "tl" | "tr" | "bl" | "br" }) {
  const s: Record<string, React.CSSProperties> = {
    tl: { top: 24, left: 24, borderTop: "1px solid rgba(255,255,255,0.2)", borderLeft: "1px solid rgba(255,255,255,0.2)" },
    tr: { top: 24, right: 24, borderTop: "1px solid rgba(255,255,255,0.2)", borderRight: "1px solid rgba(255,255,255,0.2)" },
    bl: { bottom: 24, left: 24, borderBottom: "1px solid rgba(255,255,255,0.2)", borderLeft: "1px solid rgba(255,255,255,0.2)" },
    br: { bottom: 24, right: 24, borderBottom: "1px solid rgba(255,255,255,0.2)", borderRight: "1px solid rgba(255,255,255,0.2)" },
  };
  return <div style={{ position: "absolute", width: 22, height: 22, ...s[pos] }} />;
}
