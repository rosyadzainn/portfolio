"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const THEMES = [
  { name: "white", color: "#ffffff", glow: "rgba(255,255,255,0.45)" },
  { name: "green", color: "#22c55e", glow: "rgba(34,197,94,0.45)"  },
  { name: "red",   color: "#ef4444", glow: "rgba(239,68,68,0.45)"  },
  { name: "blue",  color: "#3b82f6", glow: "rgba(59,130,246,0.45)" },
] as const;

type TName = typeof THEMES[number]["name"];

export default function ThemePicker() {
  const [selected, setSelected] = useState<TName>("white");
  const [open, setOpen]         = useState(false);

  const apply = (name: TName) => {
    const t = THEMES.find((t) => t.name === name)!;
    document.documentElement.style.setProperty("--accent",      t.color);
    document.documentElement.style.setProperty("--accent-glow", t.glow);
    window.dispatchEvent(new CustomEvent("accent-change", { detail: t.color }));
    setSelected(name);
    setOpen(false);
  };

  const current = THEMES.find((t) => t.name === selected)!;

  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 2.6 }}
      style={{
        position: "fixed", top: 22, right: 220, zIndex: 300,
        display: "flex", flexDirection: "row", alignItems: "center", gap: 8,
        pointerEvents: "auto",
      }}
    >
      {/* Toggle button */}
      <button
        onClick={() => setOpen((o) => !o)}
        style={{
          background: "none", border: "none", cursor: "none",
          display: "flex", alignItems: "center", gap: 8, padding: 0,
        }}
        data-hover="true"
      >
        <span style={{
          display: "inline-block", width: 4, height: 4, borderRadius: "50%",
          background: current.color,
          boxShadow: `0 0 6px ${current.glow}`,
          flexShrink: 0,
          animation: "pulse-glow 2s ease-in-out infinite",
          transition: "background 0.3s, box-shadow 0.3s",
        }} />
        <span style={{
          fontSize: 8, fontFamily: "Plus Jakarta Sans, sans-serif",
          fontWeight: 700, letterSpacing: "0.28em",
          color: "rgba(255,255,255,0.22)",
        }}>
          THEME
        </span>
      </button>

      {/* Color swatches */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
            style={{ display: "flex", gap: 8 }}
          >
            {THEMES.map((t) => (
              <motion.button
                key={t.name}
                onClick={() => apply(t.name)}
                data-hover="true"
                whileHover={{ scale: 1.3 }}
                whileTap={{ scale: 0.85 }}
                style={{
                  width: 14, height: 14, borderRadius: "50%",
                  background: t.color,
                  border: selected === t.name
                    ? "2px solid rgba(255,255,255,0.8)"
                    : "2px solid rgba(255,255,255,0.15)",
                  boxShadow: selected === t.name ? `0 0 10px ${t.glow}` : "none",
                  cursor: "none", padding: 0,
                  transition: "border 0.2s, box-shadow 0.2s",
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
