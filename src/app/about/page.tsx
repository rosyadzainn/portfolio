"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { LanguageProvider, useLanguage } from "@/context/LanguageContext";
import TabSection from "@/components/TabSection";

function AboutContent() {
  const params     = useSearchParams();
  const initialTab = params.get("tab") ?? "about";
  return <TabSection initialTab={initialTab} />;
}

function Header() {
  const { lang, setLang } = useLanguage();
  return (
    <div style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
      background: "rgba(0,0,0,0.85)", backdropFilter: "blur(20px)",
      WebkitBackdropFilter: "blur(20px)",
      borderBottom: "1px solid rgba(255,255,255,0.05)",
      padding: "14px clamp(20px, 5.5vw, 40px)",
      display: "flex", alignItems: "center", justifyContent: "space-between",
    }}>
      <Link href="/"
        data-hover="true"
        style={{ fontSize: 11, fontFamily: "Space Grotesk, sans-serif", fontWeight: 600, letterSpacing: "0.2em", color: "rgba(255,255,255,0.45)", textDecoration: "none" }}>
        ← BACK
      </Link>

      <Link href="/" data-hover="true" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ position: "relative", width: 22, height: 22, flexShrink: 0 }}>
          <div style={{ position: "absolute", inset: 0, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.3)", animation: "spin-slow 5s linear infinite" }} />
          <div style={{ position: "absolute", inset: 5, borderRadius: "50%", background: "#fff", boxShadow: "0 0 8px rgba(255,255,255,0.5)" }} />
        </div>
        <span style={{ fontSize: 12, fontFamily: "Space Grotesk, sans-serif", fontWeight: 700, letterSpacing: "0.22em", color: "#fff" }}>
          ROSYAD ZAIN
        </span>
      </Link>

      <div style={{ display: "flex", alignItems: "center", gap: 1, border: "1px solid rgba(255,255,255,0.12)", borderRadius: 4, overflow: "hidden" }}>
        {(["en", "id"] as const).map((l) => (
          <button
            key={l}
            onClick={() => setLang(l)}
            data-hover="true"
            style={{
              padding: "5px 10px", fontSize: 9,
              fontFamily: "Space Grotesk, sans-serif", fontWeight: 700, letterSpacing: "0.16em",
              background: lang === l ? "rgba(255,255,255,0.12)" : "none",
              border: "none", color: lang === l ? "#fff" : "rgba(255,255,255,0.38)",
              cursor: "pointer", transition: "background 0.2s, color 0.2s",
            }}
          >
            {l.toUpperCase()}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function AboutPage() {
  return (
    <LanguageProvider>
      <div style={{ minHeight: "100vh", background: "#000", color: "#fff" }}>
        <Header />
        <div style={{ paddingTop: 56 }}>
          <Suspense fallback={null}>
            <AboutContent />
          </Suspense>
        </div>
      </div>
    </LanguageProvider>
  );
}
