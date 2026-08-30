import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "portfolio-language";
const LanguageContext = createContext(null);

function readStoredLanguage() {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored === "en" || stored === "zh" ? stored : "en";
  } catch {
    return "en";
  }
}

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(readStoredLanguage);

  useEffect(() => {
    document.documentElement.lang = language === "zh" ? "zh-CN" : "en";
    document.documentElement.dataset.language = language;
    try {
      window.localStorage.setItem(STORAGE_KEY, language);
    } catch {
      // The UI still works when storage is unavailable (for example in private mode).
    }
  }, [language]);

  const value = useMemo(() => ({ language, setLanguage }), [language]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used inside LanguageProvider");
  return context;
}

export function LanguageSwitcher({ className = "" }) {
  const { language, setLanguage } = useLanguage();
  const [open, setOpen] = useState(false);
  const isZh = language === "zh";

  return (
    <div className={`language-switcher ${className}`.trim()}>
      <button
        className="pill-button language-button"
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={isZh ? "选择语言" : "Choose language"}
        onClick={() => setOpen((value) => !value)}
      >
        {isZh ? "中文" : "English"} <span aria-hidden="true">⌄</span>
      </button>
      {open ? (
        <div className="language-menu" role="menu">
          <button
            type="button"
            role="menuitem"
            className={isZh ? "is-active" : ""}
            onClick={() => { setLanguage("zh"); setOpen(false); }}
          >
            中文
          </button>
          <button
            type="button"
            role="menuitem"
            className={!isZh ? "is-active" : ""}
            onClick={() => { setLanguage("en"); setOpen(false); }}
          >
            English
          </button>
        </div>
      ) : null}
    </div>
  );
}
