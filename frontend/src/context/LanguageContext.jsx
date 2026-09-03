import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { getTranslation, SUPPORTED_LANGUAGES } from "../translations/index.js";

const LanguageContext = createContext({
  language: "hi",
  setLanguage: () => {},
  t: (key) => key,
  supportedLanguages: SUPPORTED_LANGUAGES,
});

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(() => {
    try {
      return localStorage.getItem("kisansetu_lang") || "hi";
    } catch {
      return "hi";
    }
  });

  const setLanguage = useCallback((newLang) => {
    setLanguageState(newLang);
    try {
      localStorage.setItem("kisansetu_lang", newLang);
    } catch {
      // Ignore storage write errors
    }
  }, []);

  const t = useCallback(
    (key, fallback = "") => {
      return getTranslation(language, key, fallback);
    },
    [language]
  );

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t,
        supportedLanguages: SUPPORTED_LANGUAGES,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}

export default LanguageContext;
