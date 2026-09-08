import React, { useEffect, useRef } from "react";
import { ArrowSquareOut, EnvelopeSimple, Phone, X } from "@phosphor-icons/react";
import { AnimatePresence, motion } from "motion/react";
import { CONTACT_EMAIL } from "../data/projects";
import { useLanguage } from "../i18n/LanguageContext";

const CONTACT_PHONE_DISPLAY = "+86 13966222278";
const CONTACT_PHONE_LINK = "+8613966222278";

const contactCopy = {
  zh: {
    body: "您好，我目前从事交互 / UX 设计，主要负责智能硬件、移动端 App 和 AR 可穿戴产品，参与过激光测量设备、项目管理类 App 及 AR 智能眼镜等项目，也有 AI 辅助原型设计经验。",
    email: "邮箱",
    phone: "电话",
    close: "关闭联系弹窗",
  },
  en: {
    body: "I'm an Interaction / UX Designer working across smart hardware, mobile applications, and AR wearable experiences. My work includes laser measurement devices, project management applications, and AR smart glasses, with experience using AI-assisted prototyping to explore and validate interaction ideas.",
    email: "Email",
    phone: "Phone",
    close: "Close contact dialog",
  },
};

const modalTransition = { duration: 0.26, ease: [0.22, 1, 0.36, 1] };

export function ContactModal({ open, onClose }) {
  const { language } = useLanguage();
  const locale = language === "en" ? "en" : "zh";
  const text = contactCopy[locale];
  const modalRef = useRef(null);
  const returnFocusRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;

    returnFocusRef.current = document.activeElement;
    const focusFrame = window.requestAnimationFrame(() => {
      modalRef.current?.focus({ preventScroll: true });
    });
    const handleKeyDown = (event) => {
      if (event.key !== "Escape") return;
      event.preventDefault();
      event.stopImmediatePropagation();
      onClose();
    };
    const handleOutsidePointerDown = (event) => {
      const target = event.target instanceof Element ? event.target : null;
      if (
        target?.closest(".contact-modal") ||
        target?.closest(".contact-trigger") ||
        target?.closest(".language-switcher") ||
        target?.closest(".language-menu")
      ) {
        return;
      }

      event.preventDefault();
      event.stopImmediatePropagation();
      onClose();
    };

    window.addEventListener("keydown", handleKeyDown, true);
    window.addEventListener("pointerdown", handleOutsidePointerDown, true);
    return () => {
      window.cancelAnimationFrame(focusFrame);
      window.removeEventListener("keydown", handleKeyDown, true);
      window.removeEventListener("pointerdown", handleOutsidePointerDown, true);
      returnFocusRef.current?.focus?.({ preventScroll: true });
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="contact-modal-layer"
          data-contact-modal-open="true"
          data-i18n-skip
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={modalTransition}
        >
          <motion.section
            ref={modalRef}
            id="contact-modal"
            className={`contact-modal contact-modal--${locale}`}
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-modal-title"
            tabIndex={-1}
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={modalTransition}
          >
            <button
              className="contact-modal__close"
              type="button"
              aria-label={text.close}
              onClick={onClose}
            >
              <X size={32} weight="light" aria-hidden="true" />
            </button>

            <header className="contact-modal__header">
              <h2 id="contact-modal-title">Hello!</h2>
              <hr aria-hidden="true" />
            </header>

            <p className="contact-modal__body">{text.body}</p>

            <div className="contact-modal__items">
              <a className="contact-modal__item" href={`mailto:${CONTACT_EMAIL}`}>
                <span className="contact-modal__icon" aria-hidden="true">
                  <EnvelopeSimple size={30} weight="regular" />
                </span>
                <span className="contact-modal__item-copy">
                  <small>{text.email}</small>
                  <strong>{CONTACT_EMAIL}</strong>
                </span>
                <ArrowSquareOut className="contact-modal__external" size={24} weight="regular" aria-hidden="true" />
              </a>

              <a className="contact-modal__item" href={`tel:${CONTACT_PHONE_LINK}`}>
                <span className="contact-modal__icon" aria-hidden="true">
                  <Phone size={30} weight="regular" />
                </span>
                <span className="contact-modal__item-copy">
                  <small>{text.phone}</small>
                  <strong>{CONTACT_PHONE_DISPLAY}</strong>
                </span>
                <ArrowSquareOut className="contact-modal__external" size={24} weight="regular" aria-hidden="true" />
              </a>
            </div>

            <p className="contact-modal__footer">LET’S CREATE A BRIGHTER TOMORROW TOGETHER.</p>
          </motion.section>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
