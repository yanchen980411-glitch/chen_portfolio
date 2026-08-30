import { useLayoutEffect } from "react";
import { useLanguage } from "./LanguageContext";
import { translateText } from "./translations";

const textState = new WeakMap();
const attributeState = new WeakMap();
const SKIP_SELECTOR = [
  "[data-i18n-skip]",
  ".flow-hud-mockup",
  ".journey-hud",
  ".fov-hud-screen",
  ".complete-ui-frame",
  ".tools-device-screen",
  ".s50c-device-composite__screen-mask",
  ".s50c-structure-device__screen",
  ".s50c-interaction-device__screen-mask",
  ".s50c-measurement-device__screen-mask",
  ".tools-phone",
  ".complete-experience-gallery",
  ".complete-experience-figure",
].join(",");
const FORCE_SELECTOR = ".fov-hud-clear";

function shouldSkip(node) {
  const element = node.nodeType === Node.ELEMENT_NODE ? node : node.parentElement;
  if (!element || ["SCRIPT", "STYLE", "NOSCRIPT"].includes(element.tagName)) return true;
  if (element.closest(FORCE_SELECTOR)) return false;
  return Boolean(element.closest(SKIP_SELECTOR));
}

function preserveOuterWhitespace(source, translated) {
  const leading = source.match(/^\s*/)?.[0] ?? "";
  const trailing = source.match(/\s*$/)?.[0] ?? "";
  return `${leading}${translated.trim()}${trailing}`;
}

function localizeTextNode(node, language) {
  if (shouldSkip(node) || !node.nodeValue?.trim()) return;
  const current = node.nodeValue;
  let state = textState.get(node);
  if (!state || current !== state.lastApplied) state = { source: current, lastApplied: current };
  const translated = translateText(state.source, language);
  const next = translated === state.source ? state.source : preserveOuterWhitespace(state.source, translated);
  state.lastApplied = next;
  textState.set(node, state);
  if (current !== next) node.nodeValue = next;
}

function localizeAttributes(element, language) {
  if (shouldSkip(element)) return;
  for (const name of ["aria-label", "title"]) {
    if (!element.hasAttribute(name)) continue;
    let states = attributeState.get(element);
    if (!states) { states = new Map(); attributeState.set(element, states); }
    const current = element.getAttribute(name);
    let state = states.get(name);
    if (!state || current !== state.lastApplied) state = { source: current, lastApplied: current };
    const next = translateText(state.source, language);
    state.lastApplied = next;
    states.set(name, state);
    if (current !== next) element.setAttribute(name, next);
  }
}

function localizeSubtree(root, language) {
  if (!root) return;
  if (root.nodeType === Node.TEXT_NODE) {
    localizeTextNode(root, language);
    return;
  }
  if (root.nodeType !== Node.ELEMENT_NODE && root.nodeType !== Node.DOCUMENT_FRAGMENT_NODE) return;
  if (root.nodeType === Node.ELEMENT_NODE) localizeAttributes(root, language);
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT);
  let node = walker.nextNode();
  while (node) {
    if (node.nodeType === Node.TEXT_NODE) localizeTextNode(node, language);
    else localizeAttributes(node, language);
    node = walker.nextNode();
  }
}

export function GlobalLocalization() {
  const { language } = useLanguage();

  useLayoutEffect(() => {
    const root = document.getElementById("root");
    if (!root) return undefined;
    localizeSubtree(root, language);
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === "characterData") localizeTextNode(mutation.target, language);
        mutation.addedNodes.forEach((node) => localizeSubtree(node, language));
      }
    });
    observer.observe(root, { childList: true, subtree: true, characterData: true });
    return () => observer.disconnect();
  }, [language]);

  return null;
}
