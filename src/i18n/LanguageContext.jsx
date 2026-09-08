import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";

const STORAGE_KEY = "portfolio-language";
const LanguageContext = createContext(null);

function readStoredLanguage() {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored === "en" || stored === "zh" ? stored : "zh";
  } catch {
    return "zh";
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
  const [menuPosition, setMenuPosition] = useState(null);
  const triggerRef = useRef(null);
  const isZh = language === "zh";

  const updateMenuPosition = useCallback(() => {
    const rect = triggerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const width = Math.max(116, rect.width);
    setMenuPosition({ top: rect.bottom + 8, left: rect.right - width, width });
  }, []);

  useEffect(() => {
    if (!open) return undefined;
    updateMenuPosition();
    window.addEventListener("resize", updateMenuPosition);
    window.addEventListener("scroll", updateMenuPosition, true);
    return () => {
      window.removeEventListener("resize", updateMenuPosition);
      window.removeEventListener("scroll", updateMenuPosition, true);
    };
  }, [open, updateMenuPosition]);

  const menu = open && menuPosition ? createPortal(
    <div
      className="language-menu language-menu--portal"
      role="menu"
      style={menuPosition}
    >
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
    </div>,
    document.body,
  ) : null;

  return (
    <div className={`language-switcher ${className}`.trim()}>
      <button
        ref={triggerRef}
        className="pill-button language-button"
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={isZh ? "选择语言" : "Choose language"}
        onClick={() => {
          if (!open) updateMenuPosition();
          setOpen((value) => !value);
        }}
      >
        {isZh ? "中文" : "English"} <span aria-hidden="true">⌄</span>
      </button>
      {menu}
    </div>
  );
}
