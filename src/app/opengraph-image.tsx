import { ImageResponse } from "next/og";

export const runtime     = "edge";
export const alt         = "Rosyad Zain — Product Designer";
export const size        = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#000",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "60px 72px",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Grid overlay simulation */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          display: "flex",
        }} />

        {/* Corner brackets */}
        <div style={{ position: "absolute", top: 28, left: 28, width: 22, height: 22, borderTop: "1.5px solid rgba(255,255,255,0.35)", borderLeft: "1.5px solid rgba(255,255,255,0.35)", display: "flex" }} />
        <div style={{ position: "absolute", top: 28, right: 28, width: 22, height: 22, borderTop: "1.5px solid rgba(255,255,255,0.35)", borderRight: "1.5px solid rgba(255,255,255,0.35)", display: "flex" }} />
        <div style={{ position: "absolute", bottom: 28, left: 28, width: 22, height: 22, borderBottom: "1.5px solid rgba(255,255,255,0.35)", borderLeft: "1.5px solid rgba(255,255,255,0.35)", display: "flex" }} />
        <div style={{ position: "absolute", bottom: 28, right: 28, width: 22, height: 22, borderBottom: "1.5px solid rgba(255,255,255,0.35)", borderRight: "1.5px solid rgba(255,255,255,0.35)", display: "flex" }} />

        {/* Top label */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, zIndex: 1 }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#fff", boxShadow: "0 0 10px rgba(255,255,255,0.8)" }} />
          <span style={{ fontSize: 12, letterSpacing: "0.3em", color: "rgba(255,255,255,0.35)", textTransform: "uppercase" }}>
            PORTFOLIO · 2026
          </span>
        </div>

        {/* Main content */}
        <div style={{ display: "flex", flexDirection: "column", gap: 0, zIndex: 1 }}>
          {/* Eyebrow */}
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20 }}>
            <div style={{ height: 1, width: 56, background: "rgba(255,255,255,0.5)" }} />
            <span style={{ fontSize: 13, letterSpacing: "0.28em", color: "rgba(255,255,255,0.4)" }}>
              PRODUCT DESIGNER · UI/UX · WEB · 3D
            </span>
          </div>

          {/* Name */}
          <div style={{ fontSize: 96, fontWeight: 900, color: "#fff", letterSpacing: "0.02em", lineHeight: 1, display: "flex" }}>
            ROSYAD
          </div>
          <div style={{ fontSize: 96, fontWeight: 900, color: "rgba(255,255,255,0.25)", letterSpacing: "0.02em", lineHeight: 1, display: "flex" }}>
            ZAIN
          </div>

          {/* Subtitle */}
          <div style={{ marginTop: 28, fontSize: 18, color: "rgba(255,255,255,0.45)", letterSpacing: "0.04em", display: "flex" }}>
            Product Design · UI/UX · Web · AI · 3D
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", zIndex: 1 }}>
          <div style={{ display: "flex", gap: 10 }}>
            {["PRODUCT DESIGN", "UI/UX", "WEB · AI · 3D"].map((tag) => (
              <div key={tag} style={{
                fontSize: 10, letterSpacing: "0.18em", padding: "4px 12px",
                border: "1px solid rgba(255,255,255,0.12)",
                color: "rgba(255,255,255,0.3)",
                display: "flex",
              }}>
                {tag}
              </div>
            ))}
          </div>
          <span style={{ fontSize: 12, color: "rgba(255,255,255,0.2)", letterSpacing: "0.1em" }}>
            rosyadzain.com
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
