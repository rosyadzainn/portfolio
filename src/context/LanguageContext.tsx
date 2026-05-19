"use client";

import { createContext, useContext, useState } from "react";
import { translations } from "@/lib/translations";
import type { Lang, T } from "@/lib/translations";

interface LangCtx { lang: Lang; setLang: (l: Lang) => void; t: T; }

const LanguageContext = createContext<LangCtx>({ lang: "en", setLang: () => {}, t: translations.en });

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");
  return (
    <LanguageContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() { return useContext(LanguageContext); }
