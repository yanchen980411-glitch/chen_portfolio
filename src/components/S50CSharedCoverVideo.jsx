import React, { useEffect, useLayoutEffect, useRef } from "react";
import { S50C_COVER_MEDIA } from "../media/s50cCoverConfig";

export const S50C_COVER_VIDEO_SRC = S50C_COVER_MEDIA.src;
export const S50C_COVER_POSTER_SRC = S50C_COVER_MEDIA.poster;

const useBrowserLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;
const playbackIntents = new Map();
const frameSubscribers = new Map();

let sharedVideo = null;
let readyPromise = null;
let frameRequest = null;
let visibilityListenerBound = false;

function notifyFrameSubscribers() {
  frameSubscribers.forEach(({ subscriber, isActive }) => {
    if (isActive()) subscriber();
  });
}

function hasActiveFrameSubscribers() {
  return Array.from(frameSubscribers.values()).some(({ isActive }) => isActive());
}

function cancelFramePump() {
  if (!frameRequest || !sharedVideo) return;

  if (frameRequest.kind === "video" && sharedVideo.cancelVideoFrameCallback) {
    sharedVideo.cancelVideoFrameCallback(frameRequest.id);
  } else if (frameRequest.kind === "animation") {
    cancelAnimationFrame(frameRequest.id);
  }
  frameRequest = null;
}

function scheduleFramePump() {
  if (
    frameRequest
    || !sharedVideo
    || sharedVideo.paused
    || document.visibilityState === "hidden"
    || !hasActiveFrameSubscribers()
  ) return;

  if (sharedVideo.requestVideoFrameCallback) {
    const id = sharedVideo.requestVideoFrameCallback(() => {
      frameRequest = null;
      notifyFrameSubscribers();
      scheduleFramePump();
    });
    frameRequest = { kind: "video", id };
    return;
  }

  const id = requestAnimationFrame(() => {
    frameRequest = null;
    notifyFrameSubscribers();
    scheduleFramePump();
  });
  frameRequest = { kind: "animation", id };
}

function wantsPlayback() {
  if (typeof document === "undefined" || document.visibilityState === "hidden") return false;
  return Array.from(playbackIntents.values()).some(Boolean);
}

async function reconcilePlayback() {
  const video = getS50CSharedVideoElement();
  if (!video) return;

  if (!wantsPlayback()) {
    video.pause();
    cancelFramePump();
    return;
  }

  const readyVideo = await preloadS50CSharedCoverVideo();
  if (!readyVideo || !wantsPlayback()) return;

  try {
    await readyVideo.play();
    scheduleFramePump();
  } catch {
    // Muted autoplay is expected to succeed. A later visibility or user event
    // runs this reconciliation again if a browser temporarily defers playback.
  }
}

export function getS50CSharedVideoElement() {
  if (typeof document === "undefined") return null;
  if (sharedVideo) return sharedVideo;

  const video = document.createElement("video");
  video.className = "s50c-shared-cover-video";
  video.src = S50C_COVER_VIDEO_SRC;
  video.poster = S50C_COVER_POSTER_SRC;
  video.preload = "auto";
  video.autoplay = true;
  video.muted = true;
  video.defaultMuted = true;
  video.loop = true;
  video.playsInline = true;
  video.controls = false;
  video.disablePictureInPicture = true;
  video.tabIndex = -1;
  video.setAttribute("muted", "");
  video.setAttribute("autoplay", "");
  video.setAttribute("playsinline", "");
  video.setAttribute("webkit-playsinline", "");
  video.setAttribute("aria-hidden", "true");
  video.setAttribute("data-s50c-shared-cover-video", "true");

  video.addEventListener("play", () => {
    if (!wantsPlayback()) {
      video.pause();
      cancelFramePump();
      return;
    }
    scheduleFramePump();
  });
  video.addEventListener("pause", cancelFramePump);
  video.addEventListener("loadeddata", () => {
    notifyFrameSubscribers();
    void reconcilePlayback();
  });
  video.addEventListener("seeked", notifyFrameSubscribers);

  sharedVideo = video;

  if (!visibilityListenerBound) {
    document.addEventListener("visibilitychange", reconcilePlayback);
    visibilityListenerBound = true;
  }

  return sharedVideo;
}

export function preloadS50CSharedCoverVideo() {
  const video = getS50CSharedVideoElement();
  if (!video) return Promise.resolve(null);
  if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) return Promise.resolve(video);
  if (readyPromise) return readyPromise;

  readyPromise = new Promise((resolve) => {
    const finish = (ready) => {
      video.removeEventListener("loadeddata", handleReady);
      video.removeEventListener("error", handleError);
      resolve(ready ? video : null);
    };
    const handleReady = () => finish(true);
    const handleError = () => finish(false);
    video.addEventListener("loadeddata", handleReady, { once: true });
    video.addEventListener("error", handleError, { once: true });
    video.load();
  }).then((readyVideo) => {
    if (!readyVideo) readyPromise = null;
    return readyVideo;
  });

  return readyPromise;
}

export function setS50CSharedVideoPlaybackIntent(key, active) {
  if (active) playbackIntents.set(key, true);
  else playbackIntents.delete(key);
  void reconcilePlayback();
}

export function subscribeS50CSharedVideoFrames(subscriber, isActive = () => true) {
  frameSubscribers.set(subscriber, { subscriber, isActive });
  scheduleFramePump();
  return () => {
    frameSubscribers.delete(subscriber);
    if (!hasActiveFrameSubscribers()) cancelFramePump();
  };
}

export function S50CSharedCoverVideo({ active = false, className = "", label }) {
  const hostRef = useRef(null);
  const playbackKeyRef = useRef(Symbol("s50c-hero-video"));

  useBrowserLayoutEffect(() => {
    const host = hostRef.current;
    const video = getS50CSharedVideoElement();
    if (!host || !video) return undefined;

    host.appendChild(video);
    return () => {
      if (video.parentNode === host) host.removeChild(video);
    };
  }, []);

  useEffect(() => {
    const host = hostRef.current;
    const scrollContainer = host?.closest(".project-detail-scroll-shell");
    let updateFrame = 0;

    const updateIntent = () => {
      updateFrame = 0;
      const heroVisible = !scrollContainer
        || scrollContainer.scrollTop < Math.max(1, scrollContainer.clientHeight);
      setS50CSharedVideoPlaybackIntent(playbackKeyRef.current, active && heroVisible);
    };
    const scheduleUpdate = () => {
      if (updateFrame) return;
      updateFrame = requestAnimationFrame(updateIntent);
    };

    updateIntent();
    scrollContainer?.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate, { passive: true });

    return () => {
      if (updateFrame) cancelAnimationFrame(updateFrame);
      scrollContainer?.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      setS50CSharedVideoPlaybackIntent(playbackKeyRef.current, false);
    };
  }, [active]);

  return (
    <div
      ref={hostRef}
      className={["s50c-shared-cover-video-host", className].filter(Boolean).join(" ")}
      role="img"
      aria-label={label}
      data-s50c-shared-cover-host
    />
  );
}
