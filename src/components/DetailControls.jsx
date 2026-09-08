import React from "react";
import { LanguageSwitcher } from "../i18n/LanguageContext";

export function DetailControls({
  className = "",
  onBack,
  onNext,
  onContact,
  isContactOpen = false,
}) {
  const navClassName = `detail-nav ${className}`.trim();

  return (
    <header className={navClassName} aria-label="项目详情导航">
      <div className="detail-nav-group">
        <button className="pill-button" type="button" onClick={onBack}>/返回</button>
        <button className="pill-button" type="button" onClick={onNext}>下一个</button>
      </div>
      <div className="detail-nav-group detail-nav-group-right">
        <button
          className={`pill-button contact-trigger${isContactOpen ? " is-contact-open" : ""}`}
          type="button"
          aria-controls="contact-modal"
          aria-expanded={isContactOpen}
          onClick={onContact}
        >
          联系
        </button>
        <LanguageSwitcher />
      </div>
    </header>
  );
}
