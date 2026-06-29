"use client";

import { motion } from "framer-motion";
import { container } from "@/lib/layout";

export default function NotFound() {
  return (
    <div style={{ minHeight: "100vh", background: "#000", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>

      {/* Grid */}
      <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.012) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px)", backgroundSize: "80px 80px", pointerEvents: "none" }} />

      {/* Corner brackets */}
      {[
        { top: 24, left: 24, borderTop: "1px solid rgba(255,255,255,0.2)", borderLeft: "1px solid rgba(255,255,255,0.2)" },
        { top: 24, right: 24, borderTop: "1px solid rgba(255,255,255,0.2)", borderRight: "1px solid rgba(255,255,255,0.2)" },
        { bottom: 24, left: 24, borderBottom: "1px solid rgba(255,255,255,0.2)", borderLeft: "1px solid rgba(255,255,255,0.2)" },
        { bottom: 24, right: 24, borderBottom: "1px solid rgba(255,255,255,0.2)", borderRight: "1px solid rgba(255,255,255,0.2)" },
      ].map((s, i) => (
        <div key={i} style={{ position: "absolute", width: 20, height: 20, ...s }} />
      ))}

      <div style={{ ...container, textAlign: "center", position: "relative", zIndex: 10 }}>
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Label */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginBottom: 24 }}>
            <div style={{ height: 1, width: 40, background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4))" }} />
            <span style={{ fontSize: 10, fontFamily: "Plus Jakarta Sans, sans-serif", letterSpacing: "0.3em", color: "rgba(255,255,255,0.3)" }}>ERROR</span>
            <div style={{ height: 1, width: 40, background: "linear-gradient(90deg, rgba(255,255,255,0.4), transparent)" }} />
          </div>

          {/* 404 */}
          <h1 style={{ margin: "0 0 8px", fontFamily: "Plus Jakarta Sans, sans-serif", fontWeight: 900, fontSize: "clamp(7rem, 20vw, 14rem)", lineHeight: 1, color: "#fff", letterSpacing: "-0.02em" }}>
            404
          </h1>
          <p style={{ margin: "0 0 8px", fontFamily: "Plus Jakarta Sans, sans-serif", fontWeight: 800, fontSize: "clamp(1.2rem, 3vw, 2rem)", color: "rgba(255,255,255,0.35)" }}>
            Signal Lost
          </p>
          <p style={{ margin: "0 0 48px", fontSize: 13, fontFamily: "Plus Jakarta Sans, sans-serif", color: "rgba(255,255,255,0.28)", lineHeight: 1.7 }}>
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>

          {/* Back button */}
          <motion.a
            href="/"
            style={{
              display: "inline-flex", alignItems: "center", gap: 10,
              padding: "12px 28px", borderRadius: 6,
              border: "1px solid rgba(255,255,255,0.2)",
              fontFamily: "Plus Jakarta Sans, sans-serif", fontWeight: 700,
              fontSize: 11, letterSpacing: "0.2em", color: "#fff",
              textDecoration: "none", background: "rgba(255,255,255,0.04)",
            }}
            whileHover={{ background: "rgba(255,255,255,0.1)", borderColor: "rgba(255,255,255,0.4)" }}
            whileTap={{ scale: 0.97 }}
          >
            ← RETURN TO BASE
          </motion.a>
        </motion.div>

        {/* System tag */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 0.5 }}
          style={{ position: "absolute", bottom: -80, left: "50%", transform: "translateX(-50%)", whiteSpace: "nowrap" }}
        >
          <span style={{ fontSize: 9, fontFamily: "Plus Jakarta Sans, sans-serif", letterSpacing: "0.25em", color: "rgba(255,255,255,0.12)" }}>
            ROSYAD ZAIN · PORTFOLIO · 2026
          </span>
        </motion.div>
      </div>
    </div>
  );
}
