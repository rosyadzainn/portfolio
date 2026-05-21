"use client";

import { useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, useScroll, useTransform } from "framer-motion";
import { container } from "@/lib/layout";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useLanguage } from "@/context/LanguageContext";

const W = "#fff";

export default function Navigation() {
  const { scrollY } = useScroll();
  const bg = useTransform(scrollY, [0, 80], [0, 1]);
  const isMobile = useIsMobile();
  const { lang, setLang, t } = useLanguage();
  const router = useRouter();

  type NavItem = { label: string; action: () => void };
  const NAV_ITEMS: NavItem[] = [
    { label: t.nav.about,    action: () => router.push("/about") },
    { label: t.nav.projects, action: () => document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" }) },
  ];

  return (
    <motion.nav
      style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 200 }}
      initial={{ opacity: 0, y: -14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.6 }}
    >
      <motion.div
        style={{
          opacity: bg,
          position: "absolute", inset: 0,
          background: "rgba(0,0,0,0.85)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
          pointerEvents: "none",
        }}
      />

      <div style={{ ...container, position: "relative", display: "flex", alignItems: "center", justifyContent: "space-between", padding: isMobile ? "14px 20px" : "16px 40px" }}>
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          style={{ display: "flex", alignItems: "center", gap: 10, background: "none", border: "none" }}
          data-hover="true"
        >
          <div style={{ position: "relative", width: 24, height: 24, flexShrink: 0 }}>
            <div style={{
              position: "absolute", inset: 0, borderRadius: "50%",
              border: "1px solid rgba(255,255,255,0.3)",
              animation: "spin-slow 5s linear infinite",
            }} />
            <div style={{
              position: "absolute", inset: 5, borderRadius: "50%",
              background: W, boxShadow: "0 0 8px rgba(255,255,255,0.5)",
            }} />
          </div>
          <span style={{ fontSize: isMobile ? 11 : 12, fontFamily: "Space Grotesk, sans-serif", fontWeight: 700, letterSpacing: "0.22em", color: "#fff" }}>
            {isMobile ? "RZ" : "ROSYAD ZAIN"}
          </span>
        </button>

        {/* Links */}
        <div style={{ display: "flex", alignItems: "center", gap: isMobile ? 10 : 24 }}>
          {!isMobile && NAV_ITEMS.map((item, i) => (
            <NavLink key={item.label} label={item.label} onClick={item.action} delay={i * 0.07} />
          ))}

          {/* Language toggle */}
          <div style={{ display: "flex", alignItems: "center", gap: 1, border: "1px solid rgba(255,255,255,0.12)", borderRadius: 4, overflow: "hidden" }}>
            {(["en", "id"] as const).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                data-hover="true"
                style={{
                  padding: isMobile ? "5px 8px" : "5px 10px",
                  fontSize: 9,
                  fontFamily: "Space Grotesk, sans-serif",
                  fontWeight: 700,
                  letterSpacing: "0.16em",
                  background: lang === l ? "rgba(255,255,255,0.12)" : "none",
                  border: "none",
                  color: lang === l ? "#fff" : "rgba(255,255,255,0.38)",
                  cursor: "pointer",
                  transition: "background 0.2s, color 0.2s",
                }}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>

          <motion.button
            onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
            style={{
              position: "relative", overflow: "hidden",
              padding: isMobile ? "6px 14px" : "7px 18px",
              fontSize: 10,
              fontFamily: "Space Grotesk, sans-serif", fontWeight: 700,
              letterSpacing: "0.2em", borderRadius: 4,
              border: "1px solid rgba(255,255,255,0.22)", color: "#fff",
              background: "none",
            }}
            whileHover="hover"
            whileTap={{ scale: 0.97 }}
            data-hover="true"
          >
            <motion.span
              style={{ position: "absolute", inset: 0, background: "rgba(255,255,255,0.08)", originX: 0 }}
              variants={{ hover: { scaleX: 1 }, initial: { scaleX: 0 } }}
              initial="initial"
              transition={{ duration: 0.25 }}
            />
            <span style={{ position: "relative", zIndex: 1 }}>{t.nav.contact}</span>
          </motion.button>
        </div>
      </div>
    </motion.nav>
  );
}

function NavLink({ label, onClick, delay }: { label: string; onClick: () => void; delay: number }) {
  const ref = useRef<HTMLButtonElement>(null);
  return (
    <motion.button
      ref={ref}
      onClick={onClick}
      style={{ position: "relative", fontSize: 13, fontFamily: "Space Grotesk, sans-serif", fontWeight: 500, color: "rgba(255,255,255,0.5)", background: "none", border: "none" }}
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 + delay, duration: 0.4 }}
      whileHover={{ color: "#fff" }}
      onMouseMove={(e) => {
        const r = ref.current?.getBoundingClientRect();
        if (!r || !ref.current) return;
        ref.current.style.transition = "transform 0.1s ease";
        ref.current.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.25}px, ${(e.clientY - r.top - r.height / 2) * 0.25}px)`;
      }}
      onMouseLeave={() => {
        if (!ref.current) return;
        ref.current.style.transition = "transform 0.35s ease";
        ref.current.style.transform = "translate(0,0)";
      }}
      data-hover="true"
    >
      {label}
      <span style={{
        position: "absolute", bottom: -2, left: 0,
        height: 1, width: 0, background: W,
        transition: "width 0.25s ease",
      }}
        onMouseEnter={(e) => (e.currentTarget.style.width = "100%")}
      />
    </motion.button>
  );
}
