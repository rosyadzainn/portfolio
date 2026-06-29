"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useLanguage } from "@/context/LanguageContext";

const SOCIALS = [
  { label: "GitHub",   logo: "/images/social/github.svg",   href: "https://github.com/rosyadzainn" },
  { label: "LinkedIn", logo: "/images/social/linkedin.svg", href: "https://www.linkedin.com/in/rosyadzain/" },
  { label: "TikTok",   logo: "/images/social/tiktok.svg",   href: "https://www.tiktok.com/@rosyadzainn" },
  { label: "WhatsApp", logo: "/images/social/whatsapp.svg", href: "https://wa.me/6282242035628" },
];

function Field({ label, name, type = "text", placeholder, multi = false }: {
  label: string; name: string; type?: string; placeholder: string; multi?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  const base: React.CSSProperties = {
    width: "100%",
    background: "rgba(255,255,255,0.03)",
    border: `1px solid ${focused ? "rgba(255,255,255,0.35)" : "rgba(255,255,255,0.07)"}`,
    borderRadius: 6,
    padding: "12px 14px",
    color: "#fff",
    fontSize: 13,
    fontFamily: "Plus Jakarta Sans, sans-serif",
    outline: "none",
    resize: "none" as const,
    transition: "border-color 0.25s ease, box-shadow 0.25s ease",
    boxShadow: focused ? "0 0 16px rgba(255,255,255,0.05)" : "none",
    boxSizing: "border-box",
  };
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <label style={{
        fontSize: 10, fontFamily: "Plus Jakarta Sans, sans-serif", letterSpacing: "0.2em",
        color: focused ? "rgba(255,255,255,0.65)" : "rgba(255,255,255,0.35)",
        transition: "color 0.25s ease",
      }}>
        {label}
      </label>
      {multi
        ? <textarea name={name} rows={5} placeholder={placeholder} style={base}
            onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} />
        : <input name={name} type={type} placeholder={placeholder} style={{ ...base, caretColor: "#fff" }}
            onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} />
      }
    </div>
  );
}

export default function Contact() {
  const headRef   = useRef<HTMLDivElement>(null);
  const headInView = useInView(headRef, { once: true, margin: "-80px" });
  const mountTime  = useRef(0);
  useEffect(() => { mountTime.current = Date.now(); }, []);
  const isMobile   = useIsMobile();
  const { t }      = useLanguage();
  const [sent, setSent]         = useState(false);
  const [blocked, setBlocked]   = useState(false);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState<string | false>(false);

  const checkRateLimit = () => {
    const KEY = "cf_submissions";
    const WINDOW = 60 * 60 * 1000;
    const MAX = 3;
    const now = Date.now();
    const stored: number[] = JSON.parse(localStorage.getItem(KEY) ?? "[]");
    const recent = stored.filter(ts => now - ts < WINDOW);
    if (recent.length >= MAX) return false;
    return true;
  };

  const recordSubmission = () => {
    const KEY = "cf_submissions";
    const WINDOW = 60 * 60 * 1000;
    const now = Date.now();
    const stored: number[] = JSON.parse(localStorage.getItem(KEY) ?? "[]");
    const recent = stored.filter(ts => now - ts < WINDOW);
    localStorage.setItem(KEY, JSON.stringify([...recent, now]));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);

    if (fd.get("website")) return;
    if (Date.now() - mountTime.current < 5000) return;
    if (!checkRateLimit()) {
      setBlocked(true);
      setTimeout(() => setBlocked(false), 6000);
      return;
    }

    setLoading(true);
    setError(false);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          honeypot: fd.get("website"),
          name:     fd.get("name"),
          email:    fd.get("email"),
          subject:  fd.get("subject"),
          message:  fd.get("message"),
        }),
      });
      if (res.ok) {
        recordSubmission();
        setSent(true);
        setTimeout(() => setSent(false), 5000);
      } else {
        const data = await res.json().catch(() => ({}));
        const msg = res.status === 503 ? t.contact.err_send : (data.error ?? t.contact.err_send);
        setError(msg);
        setTimeout(() => setError(false), 6000);
      }
    } catch {
      setError(t.contact.err_send);
      setTimeout(() => setError(false), 6000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" style={{ position: "relative", paddingTop: isMobile ? 80 : 112, paddingBottom: isMobile ? 28 : 36, overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, #000 0%, #0a0a0a 100%)" }} />
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse 60% 40% at 50% 100%, rgba(255,255,255,0.04) 0%, transparent 70%)",
      }} />

      <div style={{ position: "relative", zIndex: 10, padding: isMobile ? "0 24px" : "0 19%" }}>
        {/* Heading */}
        <div ref={headRef} style={{ marginBottom: 64, textAlign: "center" }}>
          <motion.div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 16 }}
            initial={{ opacity: 0, y: 16 }} animate={headInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#fff", boxShadow: "0 0 10px rgba(255,255,255,0.6)", animation: "pulse-glow 2s ease-in-out infinite" }} />
            <span style={{ fontSize: 11, fontFamily: "Plus Jakarta Sans, sans-serif", fontWeight: 600, letterSpacing: "0.24em", color: "rgba(255,255,255,0.5)" }}>{t.contact.label}</span>
          </motion.div>
          <motion.h2 style={{ margin: 0, fontFamily: "Plus Jakarta Sans, sans-serif", fontWeight: 800, fontSize: "clamp(2rem, 4.5vw, 3.25rem)" }}
            initial={{ opacity: 0, y: 22 }} animate={headInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.15, duration: 0.6 }}>
            <span style={{ color: "#fff" }}>{t.contact.h1}</span>
            <br />
            <span style={{ color: "rgba(255,255,255,0.5)" }}>{t.contact.h2}</span>
          </motion.h2>
          <motion.p style={{ margin: "16px auto 0", fontSize: 13, fontFamily: "Plus Jakarta Sans, sans-serif", maxWidth: 380, lineHeight: 1.7, color: "rgba(255,255,255,0.38)" }}
            initial={{ opacity: 0 }} animate={headInView ? { opacity: 1 } : {}} transition={{ delay: 0.3, duration: 0.5 }}>
            {t.contact.tagline}
          </motion.p>
        </div>

        {/* Two-column layout */}
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "2fr 3fr", gap: isMobile ? 32 : 40 }}>
          {/* Left info */}
          <motion.div style={{ display: "flex", flexDirection: "column", gap: 32 }}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.65 }}>

            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <span style={{ fontSize: 10, fontFamily: "Plus Jakarta Sans, sans-serif", fontWeight: 600, letterSpacing: "0.22em", color: "rgba(255,255,255,0.35)" }}>EMAIL</span>
              <a href="mailto:rosyadz123@gmail.com" data-hover="true"
                style={{ fontSize: "clamp(1.1rem, 1.8vw, 1.5rem)", fontWeight: 600, color: "rgba(255,255,255,0.85)", textDecoration: "none", letterSpacing: "-0.01em", transition: "color 0.2s" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.85)")}>
                rosyadz123@gmail.com ↗
              </a>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <span style={{ fontSize: 10, fontFamily: "Plus Jakarta Sans, sans-serif", fontWeight: 600, letterSpacing: "0.22em", color: "rgba(255,255,255,0.35)" }}>LOCATION</span>
              <span style={{ fontSize: 14, fontFamily: "Plus Jakarta Sans, sans-serif", color: "rgba(255,255,255,0.55)", lineHeight: 1.7 }}>
                {t.contact.location}<br />
                <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 12.5 }}>{t.contact.locationSub}</span>
              </span>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <span style={{ fontSize: 10, fontFamily: "Plus Jakarta Sans, sans-serif", fontWeight: 600, letterSpacing: "0.22em", color: "rgba(255,255,255,0.35)" }}>SOCIALS</span>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                {SOCIALS.map((s, i) => (
                  <motion.a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                    style={{ width: 40, height: 40, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.04)", textDecoration: "none", transition: "border-color 0.2s, background 0.2s" }}
                    initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.4 }} data-hover="true"
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.4)"; e.currentTarget.style.background = "rgba(255,255,255,0.1)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)"; e.currentTarget.style.background = "rgba(255,255,255,0.04)"; }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={s.logo} alt={s.label} style={{ width: 17, height: 17, opacity: 0.85 }} />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Status */}
            <div style={{
              display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", borderRadius: 8,
              border: "1px solid rgba(34,197,94,0.18)", background: "rgba(34,197,94,0.04)",
            }}>
              <span style={{
                width: 8, height: 8, borderRadius: "50%", flexShrink: 0, display: "inline-block",
                background: "#22c55e", boxShadow: "0 0 7px #22c55e", animation: "pulse-glow 2s ease-in-out infinite",
              }} />
              <div>
                <p style={{ margin: 0, fontSize: 11, fontFamily: "Plus Jakarta Sans, sans-serif", fontWeight: 600, color: "rgba(34,197,94,0.85)" }}>{t.contact.available}</p>
                <p style={{ margin: "2px 0 0", fontSize: 10, fontFamily: "Plus Jakarta Sans, sans-serif", color: "rgba(255,255,255,0.28)" }}>{t.contact.response}</p>
              </div>
            </div>
          </motion.div>

          {/* Right form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.65, delay: 0.08 }}>
            <div style={{ padding: 28, borderRadius: 12, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#fff", boxShadow: "0 0 6px rgba(255,255,255,0.5)" }} />
                <span style={{ fontSize: 10, fontFamily: "Plus Jakarta Sans, sans-serif", fontWeight: 600, letterSpacing: "0.22em", color: "rgba(255,255,255,0.4)" }}>SEND A MESSAGE</span>
              </div>

              {sent ? (
                <motion.div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "56px 0", gap: 16 }}
                  initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.35 }}>
                  <div style={{
                    width: 56, height: 56, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                    background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.28)", boxShadow: "0 0 24px rgba(34,197,94,0.15)",
                  }}>
                    <span style={{ color: "#22c55e", fontSize: 22 }}>✓</span>
                  </div>
                  <p style={{ margin: 0, fontSize: 12, fontFamily: "Plus Jakarta Sans, sans-serif", letterSpacing: "0.1em", color: "rgba(34,197,94,0.8)" }}>{t.contact.ok_title}</p>
                  <p style={{ margin: 0, fontSize: 11, fontFamily: "Plus Jakarta Sans, sans-serif", color: "rgba(255,255,255,0.35)" }}>{t.contact.ok_sub}</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  <div style={{ position: "absolute", left: "-9999px", opacity: 0, pointerEvents: "none" }} aria-hidden>
                    <input name="website" type="text" tabIndex={-1} autoComplete="off" />
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 16 }}>
                    <Field label={t.contact.name_l}  name="name"  placeholder={t.contact.name_ph} />
                    <Field label={t.contact.email_l} name="email" type="email" placeholder="your@email.com" />
                  </div>
                  <Field label={t.contact.subject_l} name="subject" placeholder={t.contact.subject_ph} />
                  <Field label={t.contact.message_l} name="message" placeholder={t.contact.message_ph} multi />

                  <motion.button type="submit" disabled={loading}
                    style={{
                      position: "relative", marginTop: 4, padding: "14px 0", borderRadius: 6, overflow: "hidden",
                      fontFamily: "Plus Jakarta Sans, sans-serif", fontWeight: 700, fontSize: 11, letterSpacing: "0.2em",
                      background: loading ? "rgba(255,255,255,0.7)" : "#fff",
                      border: "1px solid rgba(255,255,255,0.9)", color: "#000", width: "100%",
                      cursor: loading ? "not-allowed" : "pointer",
                    }}
                    whileHover={loading ? {} : { boxShadow: "0 0 28px rgba(255,255,255,0.3)" }}
                    whileTap={loading ? {} : { scale: 0.98 }}
                    data-hover="true">
                    {!loading && <span className="shimmer" style={{ position: "absolute", inset: 0 }} />}
                    <span style={{ position: "relative", zIndex: 1 }}>
                      {loading ? "SENDING..." : "SEND MESSAGE"}
                    </span>
                  </motion.button>

                  {blocked && (
                    <motion.p initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}
                      style={{ margin: 0, textAlign: "center", fontSize: 11, fontFamily: "Plus Jakarta Sans, sans-serif", letterSpacing: "0.1em", color: "rgba(239,68,68,0.75)" }}>
                      {t.contact.err_rate}
                    </motion.p>
                  )}
                  {error && (
                    <motion.p initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}
                      style={{ margin: 0, textAlign: "center", fontSize: 11, fontFamily: "Plus Jakarta Sans, sans-serif", letterSpacing: "0.1em", color: "rgba(239,68,68,0.75)" }}>
                      {error}
                    </motion.p>
                  )}
                </form>
              )}
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div style={{
          marginTop: 80, paddingTop: 24, display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center",
          borderTop: "1px solid rgba(255,255,255,0.04)",
        }}
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <span style={{ fontSize: 10, fontFamily: "Plus Jakarta Sans, sans-serif", letterSpacing: "0.15em", color: "rgba(255,255,255,0.18)" }}>
            {t.contact.footer_rights}
          </span>
        </motion.div>
      </div>
    </section>
  );
}
