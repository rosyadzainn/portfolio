"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let p = 0;
    const id = setInterval(() => {
      p = Math.min(100, p + Math.random() * 13 + 6);
      setProgress(Math.round(p));
      if (p >= 100) {
        clearInterval(id);
        setTimeout(onComplete, 650);
      }
    }, 130);
    return () => clearInterval(id);
  }, [onComplete]);

  return (
    <motion.div
      key="loader"
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
      style={{ background: "#000" }}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
      {/* RZ. logo */}
      <motion.span
        initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        style={{
          fontSize: 56, fontWeight: 700, fontFamily: "Plus Jakarta Sans, sans-serif", letterSpacing: 0,
          background: "linear-gradient(180deg, #ffffff 0%, #8f8f8f 100%)",
          WebkitBackgroundClip: "text", backgroundClip: "text",
          WebkitTextFillColor: "transparent", color: "transparent",
          marginBottom: 38,
        }}
      >
        RZ.
      </motion.span>

      {/* Progress */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 0.4 }}
        style={{ width: 200, display: "flex", flexDirection: "column", gap: 10 }}
      >
        <div style={{ height: 2, width: "100%", background: "rgba(255,255,255,0.1)", borderRadius: 2, overflow: "hidden" }}>
          <motion.div
            style={{ height: "100%", background: "#fff", boxShadow: "0 0 8px rgba(255,255,255,0.5)" }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span style={{ fontSize: 9, fontFamily: "Plus Jakarta Sans, sans-serif", letterSpacing: "0.22em", color: "rgba(255,255,255,0.3)" }}>LOADING</span>
          <span style={{ fontSize: 9, fontFamily: "Plus Jakarta Sans, sans-serif", color: "rgba(255,255,255,0.6)" }}>{progress}%</span>
        </div>
      </motion.div>
    </motion.div>
  );
}
