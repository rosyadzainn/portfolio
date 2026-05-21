"use client";

import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Lenis from "lenis";
import LoadingScreen from "@/components/LoadingScreen";
import Navigation from "@/components/Navigation";
import SystemStatus from "@/components/SystemStatus";
import ThemePicker from "@/components/ThemePicker";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import RealTime3D from "@/components/RealTime3D";
import Contact from "@/components/Contact";
import { LanguageProvider } from "@/context/LanguageContext";

export default function Home() {
  const [loading, setLoading]     = useState(() =>
    typeof window === "undefined" ? true : !sessionStorage.getItem("visited")
  );
  const [easterEgg, setEasterEgg] = useState(false);
  const keyBuffer                 = useRef("");

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
    });

    let rafId: number;
    function raf(time: number) { lenis.raf(time); rafId = requestAnimationFrame(raf); }
    rafId = requestAnimationFrame(raf);

    // Scroll to hash after Lenis is ready
    const hash = window.location.hash;
    if (hash) {
      setTimeout(() => {
        document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });
      }, 300);
    }

    return () => { cancelAnimationFrame(rafId); lenis.destroy(); };
  }, []);

  // Easter egg — type "rz" anywhere on the page
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      keyBuffer.current = (keyBuffer.current + e.key).slice(-2);
      if (keyBuffer.current.toLowerCase() === "rz") {
        setEasterEgg(true);
        setTimeout(() => setEasterEgg(false), 2600);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <LanguageProvider>
      <ThemePicker />

      {/* Easter egg overlay */}
      <AnimatePresence>
        {easterEgg && (
          <motion.div
            style={{
              position: "fixed", inset: 0, zIndex: 99990,
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
              pointerEvents: "none",
              background: "radial-gradient(ellipse at center, rgba(255,255,255,0.07) 0%, transparent 70%)",
            }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              style={{ textAlign: "center" }}
              initial={{ scale: 0.5, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 1.15, opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <div style={{
                fontFamily: "Exo 2, sans-serif", fontSize: "clamp(80px, 18vw, 160px)",
                fontWeight: 900, color: "#fff", letterSpacing: "0.08em", lineHeight: 1,
                textShadow: "0 0 80px rgba(255,255,255,0.4), 0 0 160px rgba(255,255,255,0.15)",
              }}>
                RZ
              </div>
              <motion.p
                style={{ margin: "12px 0 0", fontSize: 10, fontFamily: "Space Grotesk, sans-serif", letterSpacing: "0.4em", color: "rgba(255,255,255,0.4)" }}
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.4 }}
              >
                YOU FOUND THE SECRET
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {loading && <LoadingScreen onComplete={() => { sessionStorage.setItem("visited", "1"); setLoading(false); }} />}
      </AnimatePresence>

      <AnimatePresence>
        {!loading && (
          <motion.div
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <Navigation />
            <SystemStatus />
            <main>
              <Hero />
              <Projects />
              <RealTime3D />
              <Contact />
            </main>
          </motion.div>
        )}
      </AnimatePresence>
    </LanguageProvider>
  );
}
