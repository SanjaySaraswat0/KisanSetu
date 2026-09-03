import en from "./en.js";
import hi from "./hi.js";
import mr from "./mr.js";
import ta from "./ta.js";

export const translations = {
  en,
  hi,
  mr,
  ta,
};

export const SUPPORTED_LANGUAGES = [
  { code: "hi", label: "🇮🇳 हिन्दी (Hindi)" },
  { code: "en", label: "🇬🇧 English" },
  { code: "mr", label: "🇮🇳 मराठी (Marathi)" },
  { code: "ta", label: "🇮🇳 தமிழ் (Tamil)" },
];

export function getTranslation(lang, path, fallback = "") {
  const currentDict = translations[lang] || translations.en;
  const englishDict = translations.en;

  const getByPath = (obj, p) => {
    if (!obj) return undefined;
    const parts = p.split(".");
    let current = obj;
    for (const part of parts) {
      if (current === undefined || current === null) return undefined;
      current = current[part];
    }
    return current;
  };

  const val = getByPath(currentDict, path);
  if (val !== undefined) return val;

  const fallbackVal = getByPath(englishDict, path);
  if (fallbackVal !== undefined) return fallbackVal;

  return fallback || path;
}
