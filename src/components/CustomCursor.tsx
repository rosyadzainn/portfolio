"use client";

import { useEffect, useRef } from "react";

const W     = "#ffffff";
const TRAIL = 8;

export default function CustomCursor() {
  const ringRef  = useRef<HTMLDivElement>(null);
  const dotRef   = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<(HTMLDivElement | null)[]>([]);
  const state    = useRef({ hover: false, click: false, cursorLabel: "" });

  useEffect(() => {
    let mx = -300, my = -300;
    let rx = -300, ry = -300;
    let sz = 32;
    const trail = Array.from({ length: TRAIL }, () => ({ x: -300, y: -300 }));
    const lerp  = (a: number, b: number, t: number) => a + (b - a) * t;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (dotRef.current)
        dotRef.current.style.transform = `translate(${mx - 3}px,${my - 3}px)`;
    };

    const onOver = (e: MouseEvent) => {
      const el = e.target;
      if (!(el instanceof Element)) { state.current.hover = false; state.current.cursorLabel = ""; return; }
      state.current.hover = !!el.closest('a, button, [data-hover="true"], input, textarea, label');
      const tagged = el.closest("[data-cursor]") as HTMLElement | null;
      state.current.cursorLabel = tagged?.dataset.cursor ?? "";
    };

    const onDown = () => { state.current.click = true; };
    const onUp   = () => { state.current.click = false; };

    let id: number;
    const tick = () => {
      const { hover, click, cursorLabel } = state.current;
      const targetSz = hover ? 52 : click ? 16 : 32;
      sz = lerp(sz, targetSz, 0.16);
      rx = lerp(rx, mx, 0.12);
      ry = lerp(ry, my, 0.12);

      const ring = ringRef.current;
      if (ring) {
        ring.style.transform   = `translate(${rx - sz / 2}px,${ry - sz / 2}px)`;
        ring.style.width       = `${sz}px`;
        ring.style.height      = `${sz}px`;
        ring.style.borderColor = hover ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.45)";
        ring.style.background  = hover ? "rgba(255,255,255,0.05)" : "transparent";
        ring.style.boxShadow   = hover
          ? "0 0 20px rgba(255,255,255,0.25), inset 0 0 12px rgba(255,255,255,0.06)"
          : "0 0 8px rgba(255,255,255,0.08)";
      }

      const label = labelRef.current;
      if (label) {
        label.textContent = cursorLabel;
        label.style.transform = `translate(${rx + sz / 2 + 8}px,${ry - sz / 2}px)`;
        label.style.opacity   = hover && cursorLabel ? "1" : "0";
      }

      trail.unshift({ x: mx, y: my });
      trail.pop();
      trailRef.current.forEach((el, i) => {
        if (!el) return;
        const p = trail[i];
        const s = (1 - i / TRAIL) * 4;
        el.style.transform = `translate(${p.x - s / 2}px,${p.y - s / 2}px)`;
        el.style.opacity   = String((1 - i / TRAIL) * 0.22);
        el.style.width     = `${s}px`;
        el.style.height    = `${s}px`;
      });

      id = requestAnimationFrame(tick);
    };

    id = requestAnimationFrame(tick);
    window.addEventListener("mousemove",   onMove, { passive: true });
    document.addEventListener("mouseover", onOver, { passive: true });
    window.addEventListener("mousedown",   onDown);
    window.addEventListener("mouseup",     onUp);

    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener("mousemove",   onMove);
      document.removeEventListener("mouseover", onOver);
      window.removeEventListener("mousedown",   onDown);
      window.removeEventListener("mouseup",     onUp);
    };
  }, []);

  return (
    <>
      {Array.from({ length: TRAIL }).map((_, i) => (
        <div
          key={i}
          ref={(el) => { trailRef.current[i] = el; }}
          style={{
            position: "fixed", top: 0, left: 0,
            borderRadius: "50%", pointerEvents: "none", zIndex: 99998,
            background: W, width: "4px", height: "4px",
            willChange: "transform, width, height, opacity",
          }}
        />
      ))}
      <div
        ref={ringRef}
        style={{
          position: "fixed", top: 0, left: 0,
          width: "32px", height: "32px",
          borderRadius: "50%", pointerEvents: "none", zIndex: 99999,
          border: "1px solid rgba(255,255,255,0.45)",
          background: "transparent",
          boxShadow: "0 0 8px rgba(255,255,255,0.08)",
          transition: "border-color 0.22s, background 0.22s, box-shadow 0.22s",
          willChange: "transform, width, height",
        }}
      />
      <div
        ref={dotRef}
        style={{
          position: "fixed", top: 0, left: 0,
          width: "6px", height: "6px",
          borderRadius: "50%", pointerEvents: "none", zIndex: 99999,
          background: W,
          boxShadow: "0 0 6px rgba(255,255,255,0.6)",
          willChange: "transform",
        }}
      />
      <div
        ref={labelRef}
        style={{
          position: "fixed", top: 0, left: 0,
          fontSize: 8, fontFamily: "Space Grotesk, sans-serif",
          fontWeight: 700, letterSpacing: "0.28em",
          color: "rgba(255,255,255,0.9)",
          pointerEvents: "none", zIndex: 99999,
          opacity: 0, transition: "opacity 0.18s",
          whiteSpace: "nowrap",
          willChange: "transform, opacity",
        }}
      />
    </>
  );
}
