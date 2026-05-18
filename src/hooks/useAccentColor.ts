"use client";

import { useState, useEffect } from "react";

export function useAccentColor() {
  const [color, setColor] = useState("#ffffff");
  const [glow,  setGlow]  = useState("rgba(255,255,255,0.45)");

  useEffect(() => {
    const handler = (e: Event) => {
      const hex = (e as CustomEvent<string>).detail;
      setColor(hex);

      // Derive glow from hex
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      setGlow(`rgba(${r},${g},${b},0.45)`);
    };
    window.addEventListener("accent-change", handler);
    return () => window.removeEventListener("accent-change", handler);
  }, []);

  return { color, glow };
}
