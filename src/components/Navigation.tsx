"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useLanguage } from "@/context/LanguageContext";

export default function Navigation() {
  const isMobile = useIsMobile();
  const { lang } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollTo = (id: string) => document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  type NavItem = { label: string; action: () => void };
  const NAV_ITEMS: NavItem[] = [
    { label: "Home",       action: () => window.scrollTo({ top: 0, behavior: "smooth" }) },
    { label: "About",      action: () => scrollTo("#about") },
    { label: "Projects",   action: () => scrollTo("#projects") },
    { label: "Experience", action: () => scrollTo("#experience") },
    { label: "Contact",    action: () => scrollTo("#contact") },
  ];

  const talkLabel = lang === "id" ? "Hubungi Saya" : "Let's Talk";

  return (
    <motion.nav
      style={{
        position: "fixed", top: isMobile ? 14 : 22, left: 0, right: 0, zIndex: 200,
        display: "flex", alignItems: "center", justifyContent: "center",
        pointerEvents: "none",
        padding: 0,
      }}
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* ── Logo (left, floating) ── */}
      <motion.button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        style={{
          position: "absolute", left: isMobile ? 20 : "19%", top: "50%", transform: "translateY(-50%)",
          display: "flex", alignItems: "center", gap: 9, background: "none", border: "none",
          pointerEvents: "auto",
        }}
        data-hover="true"
      >
        <span style={{
          fontSize: isMobile ? 30 : 40, fontFamily: "Plus Jakarta Sans, sans-serif", fontWeight: 700, letterSpacing: "0",
          background: "linear-gradient(180deg, #ffffff 0%, #8f8f8f 100%)",
          WebkitBackgroundClip: "text", backgroundClip: "text",
          WebkitTextFillColor: "transparent", color: "transparent",
        }}>
          RZ.
        </span>
      </motion.button>

      {/* ── Center pill (desktop) ── */}
      {!isMobile && (
        <div
          style={{
            pointerEvents: "auto",
            display: "flex", alignItems: "center", gap: 6,
            padding: "8px 12px",
            borderRadius: 999,
            background: "linear-gradient(180deg, rgba(28,28,30,0.92) 0%, rgba(12,12,14,0.92) 100%)",
            border: "1px solid rgba(255,255,255,0.09)",
            backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.06)",
          }}
        >
          {NAV_ITEMS.map((item, i) => (
            <PillLink key={item.label} label={item.label} onClick={item.action} delay={i * 0.06} />
          ))}
        </div>
      )}

      {/* ── Let's Talk button (desktop) ── */}
      {!isMobile && (
        <a
          href="https://wa.me/6282242035628"
          target="_blank" rel="noopener noreferrer" data-hover="true"
          style={{
            position: "absolute", right: "19%", top: "50%", transform: "translateY(-50%)",
            pointerEvents: "auto",
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "17px 26px", borderRadius: 999,
            fontSize: 13, fontFamily: "Plus Jakarta Sans, sans-serif", fontWeight: 600,
            color: "#000",
            background: "linear-gradient(180deg, #ffffff 0%, #c4c4c8 100%)",
            border: "1px solid rgba(255,255,255,0.5)",
            boxShadow: "0 8px 24px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.8)",
            textDecoration: "none", whiteSpace: "nowrap", transition: "filter 0.2s",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.filter = "brightness(1.08)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.filter = "brightness(1)"; }}
        >
          {talkLabel} ↗
        </a>
      )}

      {/* ── Hamburger (mobile) ── */}
      {isMobile && (
        <button
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
          data-hover="true"
          style={{
            position: "absolute", right: 20, top: "50%", transform: "translateY(-50%)",
            pointerEvents: "auto",
            width: 46, height: 46, borderRadius: 13,
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 6,
            background: "linear-gradient(180deg, rgba(28,28,30,0.92) 0%, rgba(12,12,14,0.92) 100%)",
            border: "1px solid rgba(255,255,255,0.1)",
            backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
          }}
        >
          <span style={{ width: 18, height: 1.6, background: "#fff", borderRadius: 2 }} />
          <span style={{ width: 18, height: 1.6, background: "#fff", borderRadius: 2 }} />
        </button>
      )}

      {/* ── Mobile menu overlay ── */}
      <AnimatePresence>
        {isMobile && menuOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: "fixed", inset: 0, zIndex: 300, pointerEvents: "auto",
              background: "rgba(8,8,10,0.97)", backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)",
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 4,
            }}
          >
            {/* Close */}
            <button
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
              style={{
                position: "absolute", top: 22, right: 22,
                width: 44, height: 44, borderRadius: 12, fontSize: 22, color: "#fff",
                background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}
            >
              ✕
            </button>

            {NAV_ITEMS.map((item, i) => (
              <motion.button
                key={item.label}
                onClick={() => { item.action(); setMenuOpen(false); }}
                initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 + i * 0.06, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  fontSize: 30, fontFamily: "Plus Jakarta Sans, sans-serif", fontWeight: 600,
                  color: "#fff", background: "none", border: "none", padding: "12px 20px", letterSpacing: "-0.01em",
                }}
              >
                {item.label}
              </motion.button>
            ))}

            <motion.a
              href="https://wa.me/6282242035628"
              target="_blank" rel="noopener noreferrer"
              onClick={() => setMenuOpen(false)}
              initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 + NAV_ITEMS.length * 0.06, duration: 0.4 }}
              style={{
                marginTop: 24, padding: "15px 32px", borderRadius: 999,
                fontSize: 15, fontFamily: "Plus Jakarta Sans, sans-serif", fontWeight: 600, color: "#000",
                background: "linear-gradient(180deg, #ffffff 0%, #c4c4c8 100%)",
                textDecoration: "none", boxShadow: "0 8px 24px rgba(0,0,0,0.45)",
              }}
            >
              {talkLabel} ↗
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

function PillLink({ label, onClick, delay }: { label: string; onClick: () => void; delay: number }) {
  const ref = useRef<HTMLButtonElement>(null);
  const [hov, setHov] = useState(false);
  return (
    <motion.button
      ref={ref}
      onClick={onClick}
      style={{
        position: "relative", borderRadius: 999,
        padding: "9px 22px",
        fontSize: 13, fontFamily: "Plus Jakarta Sans, sans-serif", fontWeight: 500,
        color: hov ? "#fff" : "rgba(255,255,255,0.62)",
        textShadow: hov ? "0 0 0.65px #fff, 0 0 0.65px #fff" : "none",
        background: "none",
        border: "none", whiteSpace: "nowrap",
        transition: "color 0.2s, text-shadow 0.2s",
      }}
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.55 + delay, duration: 0.4 }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      data-hover="true"
    >
      {label}
    </motion.button>
  );
}
