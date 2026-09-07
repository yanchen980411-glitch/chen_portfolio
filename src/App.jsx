import React, { useCallback, useEffect, useRef, useState } from "react";
import { animate, useReducedMotion } from "motion/react";
import { AboutPage } from "./components/AboutPage";
import { ProjectCube } from "./components/ProjectCube";
import { ProjectDetail } from "./components/ProjectDetail";
import { CONTACT_EMAIL, projects } from "./data/projects";
import { LanguageSwitcher, useLanguage } from "./i18n/LanguageContext";
import { translateText } from "./i18n/translations";

function scrollToSection(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function SiteNav({ active }) {
  const { language } = useLanguage();
  const isZh = language === "zh";
  return (
    <nav className="site-nav" aria-label={isZh ? "主要导航" : "Primary navigation"}>
      <button
        className={`pill-button ${active === "works" ? "is-active" : ""}`}
        type="button"
        onClick={() => scrollToSection("works")}
      >
        {translateText("Work", language)}
      </button>
      <button
        className={`pill-button ${active === "contact" ? "is-active" : ""}`}
        type="button"
        onClick={() => scrollToSection("contact")}
      >
        {translateText("Contact", language)}
      </button>
      <LanguageSwitcher />
    </nav>
  );
}

const SPATIAL_EASE = [0.76, 0, 0.24, 1];
const ENTER_EASE = [0.65, 0, 0.35, 1];
const ENTER_DURATION_SECONDS = 0.48;
const ENTER_DURATION_MS = ENTER_DURATION_SECONDS * 1000;
const ABOUT_PAGE_FADE_SECONDS = 0.18;
const ABOUT_PAGE_EASE = [0.22, 1, 0.36, 1];
const HOME_INTRO_PROGRESS_MS = 1017;
const HOME_INTRO_PROGRESS_END_MS = 1070;
const HOME_INTRO_BLINK_HALF_MS = 400;
const HOME_INTRO_BACKGROUND_MS = 600;
const HOME_INTRO_CONTENT_MS = 400;
const HOME_INTRO_TITLE_DELAY_MS = 60;
const HOME_INTRO_TITLE_MS = 600;
const HOME_BACKGROUND_WIPE_DELAY_MS = 150;
const HOME_BACKGROUND_WIPE_DURATION_MS = 600;
const HOME_PROJECT_TITLES = ["HORIZON", "S50C", "TOOLS APP"];

function easeOutCubic(value) {
  return 1 - Math.pow(1 - value, 3);
}

function createDeferred() {
  let resolve;
  const promise = new Promise((nextResolve) => {
    resolve = nextResolve;
  });
  return { promise, resolve, settled: false };
}

function afterPaint() {
  return new Promise((resolve) => {
    requestAnimationFrame(() => requestAnimationFrame(resolve));
  });
}

function nextFrame() {
  return new Promise((resolve) => requestAnimationFrame(resolve));
}

function motionDelay(duration) {
  return animate(0, 1, { duration, ease: "linear" }).finished;
}

function setRect(element, rect) {
  if (!element || !rect) return;
  element.style.left = `${rect.left}px`;
  element.style.top = `${rect.top}px`;
  element.style.width = `${rect.width}px`;
  element.style.height = `${rect.height}px`;
}

function getSwitchRect() {
  const width = window.innerWidth * 0.64;
  const height = window.innerHeight * 0.58;
  return {
    left: (window.innerWidth - width) / 2,
    top: (window.innerHeight - height) / 2,
    width,
    height,
  };
}

function getRectTransform(rect) {
  return {
    x: rect.left,
    y: rect.top,
    scaleX: rect.width / window.innerWidth,
    scaleY: rect.height / window.innerHeight,
  };
}

function interpolateRect(from, to, progress) {
  return {
    left: from.left + (to.left - from.left) * progress,
    top: from.top + (to.top - from.top) * progress,
    width: from.width + (to.width - from.width) * progress,
    height: from.height + (to.height - from.height) * progress,
  };
}

function getDetailHeroPlaneRect(detailStage, projectId) {
  if (!detailStage || !projectId) return null;
  const covers = detailStage.querySelectorAll("[data-project-fullscreen-cover]");
  let plane = null;

  for (const cover of covers) {
    if (cover.dataset.projectFullscreenCover === projectId) {
      plane = cover.querySelector(".project-fullscreen-cover__plane");
      break;
    }
  }

  const rect = plane?.getBoundingClientRect();
  if (!rect || rect.width <= 0 || rect.height <= 0) return null;

  return {
    left: rect.left,
    top: rect.top,
    width: rect.width,
    height: rect.height,
    centerX: rect.left + rect.width / 2,
    centerY: rect.top + rect.height / 2,
  };
}

function getRectError(actual, target) {
  if (!actual || !target) {
    return { left: Infinity, top: Infinity, width: Infinity, height: Infinity, max: Infinity };
  }

  const left = Math.abs(actual.left - target.left);
  const top = Math.abs(actual.top - target.top);
  const width = Math.abs(actual.width - target.width);
  const height = Math.abs(actual.height - target.height);
  return { left, top, width, height, max: Math.max(left, top, width, height) };
}

async function settleSpatialEndpoint(api, targetRect) {
  let actualRect = null;
  let error = getRectError(null, targetRect);

  for (let attempt = 0; attempt < 3; attempt += 1) {
    api.resize();
    actualRect = api.syncSpatialTransitionEndpoint(targetRect);
    error = getRectError(actualRect, targetRect);
    if (error.max < 1) return { matched: true, actualRect, error };
    if (attempt < 2) await nextFrame();
  }

  return { matched: false, actualRect, error };
}

const DETAIL_HERO_IMAGE_SELECTORS = [
  ".project-fullscreen-cover__image",
  ".project-fullscreen-cover__image",
  ".project-fullscreen-cover__image",
  null,
];

function decodeImage(image) {
  const decode = () => {
    if (typeof image.decode !== "function") return Promise.resolve();
    return image.decode().catch(() => undefined);
  };

  if (image.complete) return decode();

  return new Promise((resolve) => {
    const finish = () => {
      image.removeEventListener("load", finish);
      image.removeEventListener("error", finish);
      resolve();
    };
    image.addEventListener("load", finish, { once: true });
    image.addEventListener("error", finish, { once: true });
  }).then(decode);
}

function prepareDetailHero(detailStage, index) {
  const selector = DETAIL_HERO_IMAGE_SELECTORS[index];
  if (!detailStage || !selector) return Promise.resolve();
  const images = Array.from(detailStage.querySelectorAll(selector));
  return Promise.allSettled(images.map(decodeImage));
}

function resetDetailScroll(detailStage) {
  if (!detailStage) return;
  detailStage.scrollTop = 0;
  detailStage
    .querySelectorAll(
      ".horizon-project-scroll, .horizon-pages-scroll, .s50c-pages-scroll, .tools-project-scroll, .detail-scroll, .about-page",
    )
    .forEach((element) => {
      element.scrollTop = 0;
    });
}

function HomeIntro({ phase, progress, overlayRef, textRef }) {
  if (phase === "complete") return null;

  return (
    <div
      ref={overlayRef}
      className="portfolio-home-intro"
      aria-hidden="true"
      data-i18n-skip="true"
    >
      <div className="portfolio-home-intro__frame">
        <span ref={textRef} className="portfolio-home-intro__text">
          {phase === "loading" ? `LOADING: ${progress}%` : "CHEN YAN"}
        </span>
      </div>
    </div>
  );
}

function Works({
  activeIndex,
  onActiveChange,
  onOpenProject,
  onOpenAbout,
  cubeZoneRef,
  cubeApiRef,
  worksSectionRef,
  titleGroupRef,
  onCubeFirstFrameReady,
  reduceMotion,
}) {
  const project = projects[activeIndex];
  const publishedProjects = projects.slice(0, 3);
  const initialBackgroundRef = useRef(project.background);
  const [currentBackground, setCurrentBackground] = useState(initialBackgroundRef.current);
  const [transitionBackground, setTransitionBackground] = useState(initialBackgroundRef.current);
  const [isBackgroundWiping, setIsBackgroundWiping] = useState(false);
  const backgroundWipeStateRef = useRef({
    current: initialBackgroundRef.current,
    requested: initialBackgroundRef.current,
    target: null,
    running: false,
    delayTimer: 0,
    fallbackTimer: 0,
    resetFrame: 0,
    resetFrameAfterPaint: 0,
  });
  const runPendingBackgroundWipeRef = useRef(null);
  const finishBackgroundWipeRef = useRef(null);
  const reduceMotionRef = useRef(reduceMotion);
  reduceMotionRef.current = reduceMotion;

  runPendingBackgroundWipeRef.current = () => {
    const state = backgroundWipeStateRef.current;
    if (state.running || state.current === state.requested) return;

    if (reduceMotionRef.current) {
      state.current = state.requested;
      setCurrentBackground(state.current);
      setTransitionBackground(state.current);
      setIsBackgroundWiping(false);
      return;
    }

    state.running = true;
    state.target = null;
    setIsBackgroundWiping(false);
    setTransitionBackground(state.requested);

    state.delayTimer = window.setTimeout(() => {
      state.delayTimer = 0;
      state.target = state.requested;
      setTransitionBackground(state.target);
      setIsBackgroundWiping(true);
      state.fallbackTimer = window.setTimeout(
        () => finishBackgroundWipeRef.current?.(),
        HOME_BACKGROUND_WIPE_DURATION_MS + 80,
      );
    }, HOME_BACKGROUND_WIPE_DELAY_MS);
  };

  finishBackgroundWipeRef.current = () => {
    const state = backgroundWipeStateRef.current;
    if (!state.running || !state.target) return;

    window.clearTimeout(state.fallbackTimer);
    state.fallbackTimer = 0;
    state.current = state.target;
    state.target = null;
    setCurrentBackground(state.current);
    setIsBackgroundWiping(false);

    // Let the transition layer snap below the viewport before starting a queued wipe.
    state.resetFrame = window.requestAnimationFrame(() => {
      state.resetFrame = 0;
      state.resetFrameAfterPaint = window.requestAnimationFrame(() => {
        state.resetFrameAfterPaint = 0;
        state.running = false;
        runPendingBackgroundWipeRef.current?.();
      });
    });
  };

  useEffect(() => {
    const state = backgroundWipeStateRef.current;
    state.requested = project.background;

    // A newer selection made during the 150ms lead-in replaces the pending color.
    if (state.running && !state.target) {
      setTransitionBackground(state.requested);
      return;
    }

    runPendingBackgroundWipeRef.current?.();
  }, [project.background]);

  useEffect(() => () => {
    const state = backgroundWipeStateRef.current;
    window.clearTimeout(state.delayTimer);
    window.clearTimeout(state.fallbackTimer);
    window.cancelAnimationFrame(state.resetFrame);
    window.cancelAnimationFrame(state.resetFrameAfterPaint);
  }, []);

  return (
    <section
      ref={worksSectionRef}
      id="works"
      className="section-shell works-section"
      style={{ "--section-bg": currentBackground, "--project-accent": project.accent }}
      aria-labelledby="works-title"
    >
      <div
        className="works-background works-background--current"
        style={{ backgroundColor: currentBackground }}
        aria-hidden="true"
      />
      <div
        className={`works-background works-background--transition${isBackgroundWiping ? " is-active" : ""}`}
        style={{ backgroundColor: transitionBackground }}
        aria-hidden="true"
        onTransitionEnd={(event) => {
          if (event.target === event.currentTarget && event.propertyName === "transform") {
            finishBackgroundWipeRef.current?.();
          }
        }}
      />

      <SiteNav active="works" />

      <div ref={titleGroupRef} className="project-title-list" id="works-title">
        <button
          className={`project-title-about ${activeIndex === 3 ? "is-active" : ""}`}
          type="button"
          aria-pressed={activeIndex === 3}
          onClick={() => {
            if (activeIndex === 3) {
              onOpenAbout();
              return;
            }
            onActiveChange(3);
          }}
        >
          <span>ABOUT ME</span>
        </button>

        {publishedProjects.map((item, index) => (
          <button
            type="button"
            key={item.id}
            className={index === activeIndex ? "is-active" : ""}
            aria-pressed={index === activeIndex}
            onClick={() => {
              if (index === activeIndex) {
                onOpenProject(index);
                return;
              }
              onActiveChange(index);
            }}
          >
            <span>{HOME_PROJECT_TITLES[index]}</span>
          </button>
        ))}

      </div>

      <div className="works-cube-zone" ref={cubeZoneRef}>
        <ProjectCube
          activeIndex={activeIndex}
          onActiveChange={onActiveChange}
          onOpen={(index) => {
            if (index === 3) {
              onOpenAbout();
              return;
            }
            onOpenProject(index);
          }}
          mode="filled"
          homeComposition
          apiRef={cubeApiRef}
          onFirstFrameReady={onCubeFirstFrameReady}
          ariaLabel={`项目索引长方体，当前为 ${activeIndex === 3 ? "ABOUT ME" : project.title}`}
        />
      </div>

      {activeIndex !== 3 && !project.openable ? (
        <p className="pending-note" role="status">下一项真实作品准备好后，会替换这一面。</p>
      ) : null}
    </section>
  );
}

function Contact({ activeIndex, onActiveChange, copied, onCopy }) {
  return (
    <section id="contact" className="section-shell contact-section" aria-labelledby="contact-title">
      <SiteNav active="contact" />

      <h2 id="contact-title" className="contact-statement">
        <span>让复杂的工具，</span>
        <span>变得清晰。</span>
      </h2>

      <div className="contact-cube-zone" aria-hidden="true">
        <ProjectCube
          activeIndex={activeIndex}
          onActiveChange={onActiveChange}
          mode="wireframe"
          ariaLabel="线框项目长方体"
        />
      </div>
      <p className="contact-legend">01 AG1 · 02 S50C · 03 TOOLS APP · 04 ABOUT ME</p>

      <div className="contact-card">
        <h3>联系 Chen</h3>
        <p className="contact-role">交互与用户体验设计师</p>
        <p className="contact-copy">
          如果你正在寻找一位能够连接智能硬件、
          <br />
          交互流程与视觉系统的设计师，欢迎聊聊。
        </p>
        <a className="email-cta" href={`mailto:${CONTACT_EMAIL}`}>
          发送邮件
        </a>
        <div className="email-helper">
          <span>点击打开邮件客户端</span>
          <button type="button" onClick={onCopy}>{copied ? "已复制邮箱" : "复制邮箱"}</button>
        </div>
      </div>

      <p className="contact-location">中国 · CST</p>
    </section>
  );
}

export function App() {
  const startsOnAbout = window.location.pathname === "/about";
  const playsHomeIntro = useRef(window.location.pathname === "/").current;
  const prebootIntro = useRef(window.__portfolioHomeIntroBoot ?? null).current;
  const initialIndex = 3;
  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const [detailIndex, setDetailIndex] = useState(startsOnAbout ? 3 : null);
  const [transitionState, setTransitionState] = useState(startsOnAbout ? "project" : "idle");
  const [detailNavVisible, setDetailNavVisible] = useState(startsOnAbout);
  const [transitionVisual, setTransitionVisual] = useState({
    visible: false,
    index: initialIndex,
    presentation: "home",
    presentationDuration: 520,
    rotationDuration: 400,
    background: projects[initialIndex].background,
  });
  const [copied, setCopied] = useState(false);
  const [homeIntroPhase, setHomeIntroPhase] = useState(playsHomeIntro ? "loading" : "complete");
  const [homeIntroProgress, setHomeIntroProgress] = useState(
    playsHomeIntro ? prebootIntro?.progress ?? 0 : 0,
  );
  const reduceMotion = useReducedMotion();
  const cubeZoneRef = useRef(null);
  const homeCubeApiRef = useRef(null);
  const worksSectionRef = useRef(null);
  const titleGroupRef = useRef(null);
  const homeIntroOverlayRef = useRef(null);
  const homeIntroTextRef = useRef(null);
  const homeCubeReadyRef = useRef(null);
  const sharedCubeLayerRef = useRef(null);
  const detailStageRef = useRef(null);
  const transitionLayerRef = useRef(null);
  const transitionBackdropRef = useRef(null);
  const transitionStageRef = useRef(null);
  const transitionCubeApiRef = useRef(null);
  const transitionStateRef = useRef(transitionState);
  const detailIndexRef = useRef(detailIndex);
  const detailReadyRef = useRef({ index: null, promise: Promise.resolve() });

  if (!homeCubeReadyRef.current) homeCubeReadyRef.current = createDeferred();

  const renderedDetailIndex = detailIndex ?? activeIndex;

  transitionStateRef.current = transitionState;
  detailIndexRef.current = detailIndex;

  const handleHomeCubeFirstFrameReady = useCallback(() => {
    const ready = homeCubeReadyRef.current;
    if (ready.settled) return;
    ready.settled = true;
    ready.resolve();
  }, []);

  useEffect(() => {
    if (!playsHomeIntro) return undefined;

    const overlay = homeIntroOverlayRef.current;
    const text = homeIntroTextRef.current;
    const worksSection = worksSectionRef.current;
    const titleGroup = titleGroupRef.current;
    const cubeZone = cubeZoneRef.current;
    const nav = worksSection?.querySelector(":scope > .site-nav");
    prebootIntro?.stop?.();

    if (!overlay || !text || !worksSection || !titleGroup || !cubeZone || !nav) {
      document.documentElement.removeAttribute("data-home-boot");
      window.__portfolioHomeIntroBoot = null;
      setHomeIntroPhase("complete");
      return undefined;
    }

    let cancelled = false;
    let displayedProgress = -1;
    const frameIds = new Set();
    const previousBodyOverflow = document.body.style.overflow;

    const requestTick = (callback) => {
      const frameId = requestAnimationFrame((time) => {
        frameIds.delete(frameId);
        callback(time);
      });
      frameIds.add(frameId);
      return frameId;
    };

    const wait = (durationMs) => new Promise((resolve) => {
      const start = performance.now();
      const tick = (time) => {
        if (cancelled) return;
        if (time - start >= durationMs) {
          resolve();
          return;
        }
        requestTick(tick);
      };
      requestTick(tick);
    });

    const tween = (durationMs, update, easing = (value) => value) => new Promise((resolve) => {
      const start = performance.now();
      update(easing(0));
      const tick = (time) => {
        if (cancelled) return;
        const rawProgress = Math.min(1, Math.max(0, (time - start) / durationMs));
        update(easing(rawProgress));
        if (rawProgress >= 1) {
          resolve();
          return;
        }
        requestTick(tick);
      };
      requestTick(tick);
    });

    document.body.style.overflow = "hidden";
    overlay.style.opacity = "1";
    text.style.opacity = "1";
    nav.style.opacity = "0";
    nav.style.willChange = "opacity";
    cubeZone.style.opacity = "0";
    cubeZone.style.willChange = "opacity";

    titleGroup.style.setProperty("--home-intro-title-offset", "0px");
    const titleRect = titleGroup.getBoundingClientRect();
    const referenceScale = Math.min(window.innerWidth / 2048, window.innerHeight / 1394);
    const referenceOffset = 800 * Math.max(0.42, referenceScale);
    const titleOffset = -Math.ceil(Math.max(titleRect.bottom + 8, referenceOffset));
    titleGroup.style.setProperty("--home-intro-title-offset", `${titleOffset}px`);
    titleGroup.style.willChange = "transform";

    const fontReady = document.fonts?.ready ?? Promise.resolve();
    const criticalAssetsReady = Promise.allSettled([
      fontReady,
      homeCubeReadyRef.current.promise,
    ]);
    let resourcesReady = false;
    let resourcesReadyAt = 0;
    criticalAssetsReady.then(() => {
      resourcesReady = true;
      resourcesReadyAt = performance.now();
    });

    const finish = () => {
      if (cancelled) return;
      setHomeIntroPhase("complete");
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.removeAttribute("data-home-boot");
      window.__portfolioHomeIntroBoot = null;
      requestTick(() => {
        titleGroup.style.removeProperty("transform");
        titleGroup.style.removeProperty("will-change");
        titleGroup.style.removeProperty("--home-intro-title-offset");
        nav.style.removeProperty("opacity");
        nav.style.removeProperty("will-change");
        cubeZone.style.removeProperty("opacity");
        cubeZone.style.removeProperty("will-change");
      });
    };

    const runTimeline = async () => {
      if (reduceMotion) {
        await criticalAssetsReady;
        finish();
        return;
      }

      const timelineStart = prebootIntro?.startedAt ?? performance.now();
      await new Promise((resolve) => {
        const updateProgress = (time) => {
          if (cancelled) return;
          const elapsed = time - timelineStart;
          const unit = Math.min(1, Math.max(0, elapsed / HOME_INTRO_PROGRESS_MS));
          const curvedProgress = Math.round(100 * Math.sin(unit * Math.PI / 2));
          const nextProgress = resourcesReady ? curvedProgress : Math.min(99, curvedProgress);
          if (nextProgress !== displayedProgress) {
            displayedProgress = nextProgress;
            setHomeIntroProgress(nextProgress);
          }

          if (elapsed >= HOME_INTRO_PROGRESS_MS && resourcesReady) {
            if (displayedProgress !== 100) {
              displayedProgress = 100;
              setHomeIntroProgress(100);
            }
            resolve();
            return;
          }
          requestTick(updateProgress);
        };
        requestTick(updateProgress);
      });
      if (cancelled) return;

      const progressCompletedAt = performance.now();
      const remainingNormalHold = HOME_INTRO_PROGRESS_END_MS - (progressCompletedAt - timelineStart);
      const reachedReadyAfterNormalWindow = resourcesReadyAt - timelineStart > HOME_INTRO_PROGRESS_END_MS;
      const progressHold = reachedReadyAfterNormalWindow ? 53 : Math.max(0, remainingNormalHold);
      if (progressHold > 0) await wait(progressHold);
      if (cancelled) return;

      text.textContent = "CHEN YAN";
      setHomeIntroPhase("name");
      text.style.opacity = "1";

      for (let cycle = 0; cycle < 2; cycle += 1) {
        await tween(HOME_INTRO_BLINK_HALF_MS, (value) => {
          text.style.opacity = String(1 - value);
        });
        await tween(HOME_INTRO_BLINK_HALF_MS, (value) => {
          text.style.opacity = String(value);
        });
      }

      await tween(HOME_INTRO_BLINK_HALF_MS, (value) => {
        text.style.opacity = String(1 - value);
      });
      if (cancelled) return;

      setHomeIntroPhase("background");
      await tween(HOME_INTRO_BACKGROUND_MS, (value) => {
        overlay.style.opacity = String(1 - value);
      });
      if (cancelled) return;

      setHomeIntroPhase("content");
      await tween(HOME_INTRO_CONTENT_MS, (value) => {
        nav.style.opacity = String(value);
        cubeZone.style.opacity = String(value);
      });
      if (cancelled) return;

      await wait(HOME_INTRO_TITLE_DELAY_MS);
      if (cancelled) return;
      setHomeIntroPhase("titles");
      await tween(HOME_INTRO_TITLE_MS, (value) => {
        const currentOffset = titleOffset * (1 - value);
        titleGroup.style.setProperty("--home-intro-title-offset", `${currentOffset}px`);
      }, easeOutCubic);

      finish();
    };

    runTimeline();

    return () => {
      cancelled = true;
      frameIds.forEach((frameId) => cancelAnimationFrame(frameId));
      document.body.style.overflow = previousBodyOverflow;
      titleGroup.style.removeProperty("transform");
      titleGroup.style.removeProperty("will-change");
      titleGroup.style.removeProperty("--home-intro-title-offset");
      nav.style.removeProperty("opacity");
      nav.style.removeProperty("will-change");
      cubeZone.style.removeProperty("opacity");
      cubeZone.style.removeProperty("will-change");
    };
  }, [playsHomeIntro, reduceMotion]);

  useEffect(() => {
    const index = renderedDetailIndex;
    const promise = prepareDetailHero(detailStageRef.current, index);
    detailReadyRef.current = { index, promise };
  }, [renderedDetailIndex]);

  useEffect(() => {
    // Warm all three project cover assets while the visitor is still browsing
    // the homepage. ENTER never waits for image loading or decoding.
    const preloaders = projects.slice(0, 3).map((project) => {
      const image = new Image();
      image.decoding = "async";
      image.src = project.cover.src;
      return decodeImage(image);
    });
    Promise.allSettled(preloaders);
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      const nextRoute = window.location.pathname;
      if (nextRoute === "/about") {
        setActiveIndex(3);
        setDetailIndex(3);
        setTransitionState("project");
        setDetailNavVisible(true);
      } else if (detailIndexRef.current === 3) {
        setDetailIndex(null);
        setTransitionState("idle");
        setDetailNavVisible(false);
        detailStageRef.current?.removeAttribute("style");
      }
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const handleActiveChange = useCallback((nextIndex) => {
    if (transitionStateRef.current !== "idle") return;
    const normalizedIndex = ((nextIndex % 4) + 4) % 4;
    setActiveIndex(normalizedIndex);
    setTransitionVisual((current) => ({
      ...current,
      visible: false,
      index: normalizedIndex,
      presentation: "home",
      background: projects[normalizedIndex].background,
    }));
  }, []);

  const openAboutPage = useCallback(async () => {
    if (transitionStateRef.current !== "idle") return;
    const detailStage = detailStageRef.current;
    if (!detailStage) return;

    setActiveIndex(3);
    setTransitionState("about-opening");
    transitionStateRef.current = "about-opening";
    setDetailNavVisible(false);

    detailStage.style.visibility = "hidden";
    detailStage.style.pointerEvents = "none";
    detailStage.style.opacity = "0";
    detailStage.style.transform = "translate3d(0, 4px, 0)";
    setDetailIndex(3);
    detailIndexRef.current = 3;
    if (window.location.pathname !== "/about") {
      window.history.pushState({}, "", "/about");
    }

    await afterPaint();
    resetDetailScroll(detailStage);
    detailStage.style.visibility = "";

    if (!reduceMotion) {
      await animate(
        detailStage,
        { opacity: 1, transform: "translate3d(0, 0px, 0)" },
        { duration: ABOUT_PAGE_FADE_SECONDS, ease: ABOUT_PAGE_EASE },
      ).finished;
    }

    detailStage.removeAttribute("style");
    setDetailNavVisible(true);
    setTransitionState("project");
    transitionStateRef.current = "project";
  }, [reduceMotion]);

  const openProjectTimeline = useCallback(async (requestedIndex) => {
    if (transitionStateRef.current !== "idle") return;
    const nextIndex = Number.isInteger(requestedIndex) ? requestedIndex : activeIndex;
    if (nextIndex < 0 || nextIndex > 2 || !projects[nextIndex]?.openable) return;

    const cubeRect = cubeZoneRef.current?.getBoundingClientRect();
    const sharedCubeLayer = sharedCubeLayerRef.current;
    const homeCubeApi = homeCubeApiRef.current;
    const detailStage = detailStageRef.current;
    const preMountProject = nextIndex >= 0 && nextIndex < 3;
    const homeCubeSurface = cubeZoneRef.current?.querySelector("[data-project-cube-surface]");
    if (!cubeRect || !detailStage) return;
    if (preMountProject && (!sharedCubeLayer || !homeCubeApi || !homeCubeSurface)) return;

    setTransitionState("opening");
    transitionStateRef.current = "opening";
    setDetailNavVisible(false);
    detailStage.style.opacity = "1";
    detailStage.style.transform = "none";

    if (preMountProject) {
      // The exact homepage renderer and scene become the transition surface.
      // No renderer, geometry, material, texture or shader is created here.
      detailStage.style.visibility = "hidden";
      detailStage.style.pointerEvents = "none";
      const needsDetailCommit = detailIndexRef.current !== nextIndex;
      if (needsDetailCommit) {
        setDetailIndex(nextIndex);
        detailIndexRef.current = nextIndex;
        await afterPaint();
      }

      resetDetailScroll(detailStage);
      const targetHeroRect = getDetailHeroPlaneRect(detailStage, projects[nextIndex].id);
      if (!targetHeroRect) {
        detailStage.style.visibility = "";
        detailStage.style.pointerEvents = "";
        setDetailIndex(null);
        detailIndexRef.current = null;
        setTransitionState("idle");
        transitionStateRef.current = "idle";
        return;
      }

      homeCubeApi.beginSpatialTransition(nextIndex, targetHeroRect);
      setRect(sharedCubeLayer, cubeRect);
      sharedCubeLayer.style.visibility = "visible";
      sharedCubeLayer.style.opacity = "1";
      sharedCubeLayer.appendChild(homeCubeSurface);
      homeCubeApi.setSpatialTransitionProgress(0);

      if (reduceMotion) {
        setRect(sharedCubeLayer, targetHeroRect);
      } else {
        await animate(0, 1, {
          duration: ENTER_DURATION_SECONDS,
          ease: ENTER_EASE,
          onUpdate: (progress) => {
            setRect(sharedCubeLayer, interpolateRect(cubeRect, targetHeroRect, progress));
            homeCubeApi.setSpatialTransitionProgress(progress);
          },
        }).finished;
      }

      const handoffHeroRect = getDetailHeroPlaneRect(detailStage, projects[nextIndex].id);
      if (handoffHeroRect) setRect(sharedCubeLayer, handoffHeroRect);
      const endpoint = handoffHeroRect
        ? await settleSpatialEndpoint(homeCubeApi, handoffHeroRect)
        : { matched: false };
      if (!endpoint.matched) {
        console.error("Project hero endpoint did not converge within one pixel.", endpoint);
        cubeZoneRef.current.appendChild(homeCubeSurface);
        homeCubeApi.endSpatialTransition();
        sharedCubeLayer.removeAttribute("style");
        setDetailIndex(null);
        detailIndexRef.current = null;
        detailStage.style.visibility = "";
        detailStage.style.pointerEvents = "";
        setTransitionState("idle");
        transitionStateRef.current = "idle";
        return;
      }

      // The DOM hero has been fullscreen underneath for the whole trajectory.
      // At progress=1 its crop and bounds match the flattened WebGL face.
      detailStage.style.visibility = "";
      detailStage.style.pointerEvents = "";
      if (!reduceMotion) {
        await animate(sharedCubeLayer, { opacity: 0 }, { duration: 0.04, ease: "linear" }).finished;
      }
      cubeZoneRef.current.appendChild(homeCubeSurface);
      homeCubeApi.endSpatialTransition();
      sharedCubeLayer.removeAttribute("style");
      setDetailNavVisible(true);
      setTransitionState("project");
      transitionStateRef.current = "project";
      return;
    }
  }, [activeIndex, reduceMotion]);

  const closeAboutPage = useCallback(async () => {
    if (transitionStateRef.current !== "project" || detailIndexRef.current !== 3) return;
    const detailStage = detailStageRef.current;
    if (!detailStage) return;

    setTransitionState("about-closing");
    transitionStateRef.current = "about-closing";
    setDetailNavVisible(false);

    if (!reduceMotion) {
      await animate(
        detailStage,
        { opacity: 0, transform: "translate3d(0, 4px, 0)" },
        { duration: ABOUT_PAGE_FADE_SECONDS, ease: ABOUT_PAGE_EASE },
      ).finished;
    }

    detailStage.style.visibility = "hidden";
    detailStage.style.pointerEvents = "none";
    setDetailIndex(null);
    detailIndexRef.current = null;
    if (window.location.pathname === "/about") {
      window.history.pushState({}, "", "/");
    }
    await afterPaint();
    detailStage.removeAttribute("style");
    setTransitionState("idle");
    transitionStateRef.current = "idle";
  }, [reduceMotion]);

  const closeProjectTimeline = useCallback(async () => {
    if (transitionStateRef.current !== "project") return;
    const currentIndex = detailIndexRef.current;
    const cubeRect = cubeZoneRef.current?.getBoundingClientRect();
    const sharedCubeLayer = sharedCubeLayerRef.current;
    const homeCubeApi = homeCubeApiRef.current;
    const homeCubeSurface = cubeZoneRef.current?.querySelector("[data-project-cube-surface]");
    const detailStage = detailStageRef.current;
    if (currentIndex === null || currentIndex > 2 || !cubeRect || !detailStage) return;
    const persistentProject = currentIndex >= 0 && currentIndex < 3;
    if (persistentProject && (!sharedCubeLayer || !homeCubeApi || !homeCubeSurface)) return;

    setTransitionState("closing");
    transitionStateRef.current = "closing";
    setDetailNavVisible(false);
    setActiveIndex(currentIndex);

    if (persistentProject) {
      // Recreate the opening endpoint with the same persistent Three.js scene,
      // then drive the exact same progress path from 1 back to 0.
      const targetHeroRect = getDetailHeroPlaneRect(
        detailStage,
        projects[currentIndex].id,
      );
      if (!targetHeroRect) {
        setDetailNavVisible(true);
        setTransitionState("project");
        transitionStateRef.current = "project";
        return;
      }

      homeCubeApi.beginSpatialTransition(currentIndex, targetHeroRect);
      setRect(sharedCubeLayer, targetHeroRect);
      sharedCubeLayer.style.visibility = "visible";
      sharedCubeLayer.style.opacity = "0";
      sharedCubeLayer.appendChild(homeCubeSurface);
      await nextFrame();
      const endpoint = await settleSpatialEndpoint(homeCubeApi, targetHeroRect);
      if (!endpoint.matched) {
        console.error("Project return endpoint did not converge within one pixel.", endpoint);
        cubeZoneRef.current.appendChild(homeCubeSurface);
        homeCubeApi.endSpatialTransition();
        sharedCubeLayer.removeAttribute("style");
        setDetailNavVisible(true);
        setTransitionState("project");
        transitionStateRef.current = "project";
        return;
      }
      sharedCubeLayer.style.opacity = "1";
      detailStage.style.visibility = "hidden";

      if (reduceMotion) {
        setRect(sharedCubeLayer, cubeRect);
        homeCubeApi.setSpatialTransitionProgress(0);
      } else {
        await animate(1, 0, {
          duration: ENTER_DURATION_SECONDS,
          ease: ENTER_EASE,
          onUpdate: (progress) => {
            setRect(sharedCubeLayer, interpolateRect(cubeRect, targetHeroRect, progress));
            homeCubeApi.setSpatialTransitionProgress(progress);
          },
        }).finished;
        setRect(sharedCubeLayer, cubeRect);
        homeCubeApi.setSpatialTransitionProgress(0);
      }

      cubeZoneRef.current.appendChild(homeCubeSurface);
      homeCubeApi.endSpatialTransition();
      sharedCubeLayer.removeAttribute("style");
      setDetailIndex(null);
      detailIndexRef.current = null;
      await afterPaint();
      detailStage.style.visibility = "";
    }

    detailStage.style.opacity = "1";
    detailStage.style.transform = "none";
    setTransitionVisual((current) => ({ ...current, visible: false }));
    setTransitionState("idle");
    transitionStateRef.current = "idle";
  }, [reduceMotion]);

  const nextProjectTimeline = useCallback(async () => {
    if (transitionStateRef.current !== "project") return;
    const currentIndex = detailIndexRef.current;
    if (currentIndex === null || currentIndex > 2) return;
    const nextIndex = (currentIndex + 1) % 3;
    const detailStage = detailStageRef.current;
    const transitionStage = transitionStageRef.current;
    const transitionLayer = transitionLayerRef.current;
    const transitionBackdrop = transitionBackdropRef.current;
    if (!detailStage || !transitionStage || !transitionLayer || !transitionBackdrop) return;

    setTransitionState("switching");
    transitionStateRef.current = "switching";
    setDetailNavVisible(false);

    if (reduceMotion) {
      setActiveIndex(nextIndex);
      setDetailIndex(nextIndex);
      detailIndexRef.current = nextIndex;
    } else {
      const switchRect = getSwitchRect();
      await animate(
        detailStage,
        getRectTransform(switchRect),
        { duration: 0.24, ease: SPATIAL_EASE },
      ).finished;

      setRect(transitionStage, switchRect);
      transitionLayer.style.opacity = "1";
      transitionBackdrop.style.opacity = "1";
      transitionBackdrop.style.backgroundColor = projects[currentIndex].background;
      setTransitionVisual({
        visible: true,
        index: currentIndex,
        presentation: "flat",
        presentationDuration: 160,
        rotationDuration: 400,
        background: projects[currentIndex].background,
      });
      await afterPaint();
      detailStage.style.opacity = "0";

      setTransitionVisual((current) => ({ ...current, presentation: "home" }));
      await motionDelay(0.16);

      setActiveIndex(nextIndex);
      setTransitionVisual((current) => ({
        ...current,
        index: nextIndex,
        background: projects[nextIndex].background,
      }));
      await Promise.all([
        motionDelay(0.4),
        animate(
          transitionBackdrop,
          { backgroundColor: projects[nextIndex].background },
          { duration: 0.4, ease: SPATIAL_EASE },
        ).finished,
      ]);

      setDetailIndex(nextIndex);
      detailIndexRef.current = nextIndex;
      detailStage.style.transform = "none";
      detailStage.style.opacity = "1";
      setTransitionVisual((current) => ({
        ...current,
        presentation: "flat",
        presentationDuration: 260,
      }));
      await afterPaint();
      resetDetailScroll(detailStage);
      await prepareDetailHero(detailStage, nextIndex);

      const expansion = animate(
        transitionStage,
        {
          left: 0,
          top: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        },
        { duration: 0.26, ease: SPATIAL_EASE },
      );
      const navReveal = (async () => {
        await motionDelay(0.21);
        setDetailNavVisible(true);
      })();
      await Promise.all([expansion.finished, navReveal]);
      await animate(transitionLayer, { opacity: 0 }, { duration: 0.05, ease: "linear" }).finished;
    }

    detailStage.style.opacity = "1";
    detailStage.style.transform = "none";
    setTransitionVisual((current) => ({ ...current, visible: false }));
    setDetailNavVisible(true);
    setTransitionState("project");
    transitionStateRef.current = "project";
  }, [reduceMotion]);

  const handleOpenAbout = useCallback(() => openAboutPage(), [openAboutPage]);
  const handleCloseAbout = useCallback(() => closeAboutPage(), [closeAboutPage]);
  const handleOpenProject = useCallback((index) => openProjectTimeline(index), [openProjectTimeline]);
  const handleNextProject = useCallback(() => nextProjectTimeline(), [nextProjectTimeline]);

  const handleCopyEmail = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${CONTACT_EMAIL}`;
    }
  }, []);

  return (
    <div
      className={reduceMotion ? "app reduce-motion" : "app"}
      data-transition-state={transitionState}
      data-detail-nav-visible={detailNavVisible ? "true" : "false"}
      data-home-intro={homeIntroPhase}
    >
      <main inert={homeIntroPhase === "complete" ? undefined : true}>
        <Works
          activeIndex={activeIndex}
          onActiveChange={handleActiveChange}
          onOpenProject={handleOpenProject}
          onOpenAbout={handleOpenAbout}
          cubeZoneRef={cubeZoneRef}
          cubeApiRef={homeCubeApiRef}
          worksSectionRef={worksSectionRef}
          titleGroupRef={titleGroupRef}
          onCubeFirstFrameReady={handleHomeCubeFirstFrameReady}
          reduceMotion={reduceMotion}
        />
        <Contact
          activeIndex={activeIndex}
          onActiveChange={handleActiveChange}
          copied={copied}
          onCopy={handleCopyEmail}
        />
      </main>

      <HomeIntro
        phase={homeIntroPhase}
        progress={homeIntroProgress}
        overlayRef={homeIntroOverlayRef}
        textRef={homeIntroTextRef}
      />

      <div ref={sharedCubeLayerRef} className="persistent-project-transition" aria-hidden="true" />

      <div
        ref={detailStageRef}
        className={`project-detail-stage ${detailIndex === null ? "is-empty" : ""}`}
        aria-hidden={detailIndex === null}
      >
        {renderedDetailIndex === 3 ? (
          <AboutPage onBack={handleCloseAbout} />
        ) : (
          <ProjectDetail
            key={projects[renderedDetailIndex].id}
            project={projects[renderedDetailIndex]}
            onClose={closeProjectTimeline}
            onNext={handleNextProject}
            active={detailIndex !== null}
          />
        )}
      </div>

      <div
        ref={transitionLayerRef}
        className={`spatial-project-transition ${transitionVisual.visible ? "is-visible" : ""}`}
        aria-hidden="true"
      >
        <div ref={transitionBackdropRef} className="spatial-project-transition__backdrop" />
        <div
          ref={transitionStageRef}
          className="spatial-project-transition__stage"
        >
          <ProjectCube
            apiRef={transitionCubeApiRef}
            activeIndex={transitionVisual.index}
            mode="filled"
            presentation={transitionVisual.presentation}
            presentationDuration={transitionVisual.presentationDuration}
            rotationDuration={transitionVisual.rotationDuration}
            coverFlatViewport={transitionState === "opening"}
            interactive={false}
            className="spatial-project-transition__canvas"
            ariaLabel="项目空间转场"
          />
        </div>
      </div>

      <div className="sr-only" aria-live="polite">{copied ? "邮箱已复制" : ""}</div>
    </div>
  );
}
