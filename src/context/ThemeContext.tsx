"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type ThemeName = "green" | "red" | "blue";

export interface ThemeConfig {
  name: ThemeName;
  color: string;
  glow: string;
}

export const THEMES: ThemeConfig[] = [
  { name: "green", color: "#22c55e", glow: "rgba(34,197,94,0.45)"  },
  { name: "red",   color: "#ef4444", glow: "rgba(239,68,68,0.45)"  },
  { name: "blue",  color: "#3b82f6", glow: "rgba(59,130,246,0.45)" },
];

interface ThemeContextValue {
  theme: ThemeConfig;
  setTheme: (name: ThemeName) => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: THEMES[0],
  setTheme: () => {},
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemeConfig>(THEMES[0]);

  const apply = (t: ThemeConfig) => {
    document.documentElement.style.setProperty("--accent",      t.color);
    document.documentElement.style.setProperty("--accent-glow", t.glow);
  };

  useEffect(() => { apply(THEMES[0]); }, []);

  const setTheme = (name: ThemeName) => {
    const t = THEMES.find((t) => t.name === name) ?? THEMES[0];
    setThemeState(t);
    apply(t);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
