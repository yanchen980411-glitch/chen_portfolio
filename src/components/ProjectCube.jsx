import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { projects } from "../data/projects";
import {
  getS50CSharedVideoElement,
  preloadS50CSharedCoverVideo,
  setS50CSharedVideoPlaybackIntent,
  subscribeS50CSharedVideoFrames,
} from "./S50CSharedCoverVideo";
import { ToolsAnimatedCover } from "./ToolsAnimatedCover";
import {
  TOOLS_CUBE_SURFACE_HEIGHT,
  TOOLS_CUBE_SURFACE_WIDTH,
} from "./toolsCoverConfig";

const FACE_COUNT = 4;
const HALF_TURN = Math.PI / 2;
const FULL_TURN = Math.PI * 2;
const CUBOID_WIDTH = 3.2;
const CUBOID_HEIGHT = 2;
const CUBOID_DEPTH = 2;
const PANEL_OFFSET = CUBOID_DEPTH / 2 + 0.006;
const PRESENTATION_TILT_X = 0.28;
const PRESENTATION_TILT_Y = -Math.PI / 8;
const HOME_PRESENTATION_TILT_X = 0.36;
const HOME_PRESENTATION_TILT_Y = -0.43;
const HOME_PRESENTATION_X = 0.18;
const HOME_PRESENTATION_Y = 0.1;
const DRAG_RADIANS_PER_PIXEL = 0.008;
const WHEEL_THRESHOLD = 5;
const ROTATION_DURATION = 900;
const FLAT_CAMERA_Z = 3.25;
const FLAT_DEPTH_SCALE = 0.015;

function getFilledHomeCameraZ(aspect, isDesktop, useHomeComposition = false) {
  if (!isDesktop) return 7.5;

  if (useHomeComposition && aspect >= 1.2) return 5.95;

  const safeAspect = Math.max(0.6, Number.isFinite(aspect) ? aspect : 1);
  if (safeAspect >= 1.25) return 5.9;
  if (safeAspect >= 1) {
    return THREE.MathUtils.lerp(7.3, 5.9, (safeAspect - 1) / 0.25);
  }

  return Math.min(9.5, 7.3 / safeAspect);
}

const FACE_LABELS = ["01 AG1", "02 S50C", "03 TOOLS APP", "ABOUT ME"];
const FACE_TEXTURES = projects.map((project) => project.cover);
const S50C_FACE_INDEX = projects.findIndex((project) => project.id === "s50c");
let sharedS50CVideoTexture = null;
let sharedS50CVideoTextureUsers = 0;

function acquireS50CVideoTexture(video) {
  if (!sharedS50CVideoTexture) {
    sharedS50CVideoTexture = new THREE.VideoTexture(video);
    sharedS50CVideoTexture.colorSpace = THREE.SRGBColorSpace;
    sharedS50CVideoTexture.generateMipmaps = false;
    sharedS50CVideoTexture.minFilter = THREE.LinearFilter;
    sharedS50CVideoTexture.magFilter = THREE.LinearFilter;
    sharedS50CVideoTexture.wrapS = THREE.ClampToEdgeWrapping;
    sharedS50CVideoTexture.wrapT = THREE.ClampToEdgeWrapping;
  }
  sharedS50CVideoTextureUsers += 1;
  return sharedS50CVideoTexture;
}

function releaseS50CVideoTexture() {
  sharedS50CVideoTextureUsers = Math.max(0, sharedS50CVideoTextureUsers - 1);
  if (sharedS50CVideoTextureUsers > 0 || !sharedS50CVideoTexture) return;
  sharedS50CVideoTexture.dispose();
  sharedS50CVideoTexture = null;
}

const FACE_TRANSFORMS = [
  { position: [0, 0, PANEL_OFFSET], rotation: [0, 0, 0] },
  { position: [0, PANEL_OFFSET, 0], rotation: [-HALF_TURN, 0, 0] },
  { position: [0, 0, -PANEL_OFFSET], rotation: [Math.PI, 0, 0] },
  { position: [0, -PANEL_OFFSET, 0], rotation: [HALF_TURN, 0, 0] },
];

function normalizeIndex(value) {
  const integer = Number.isFinite(value) ? Math.trunc(value) : 0;
  return ((integer % FACE_COUNT) + FACE_COUNT) % FACE_COUNT;
}

function rotationForFace(index, currentRotation) {
  const canonicalRotation = normalizeIndex(index) * HALF_TURN;
  const fullTurns = Math.round((currentRotation - canonicalRotation) / FULL_TURN);
  return canonicalRotation + fullTurns * FULL_TURN;
}

function faceForRotation(rotation) {
  return normalizeIndex(Math.round(rotation / HALF_TURN));
}

function easeInOutQuart(value) {
  return value < 0.5
    ? 8 * value * value * value * value
    : 1 - Math.pow(-2 * value + 2, 4) / 2;
}

function easeInOutPower3(value) {
  return value < 0.5
    ? 4 * value * value * value
    : 1 - Math.pow(-2 * value + 2, 3) / 2;
}

function applyPanelCover(texture, ratio, horizontalAlignment = 0.5) {
  const panelRatio = CUBOID_WIDTH / CUBOID_HEIGHT;
  let repeatX = 1;
  let repeatY = 1;

  if (ratio < 1) {
    repeatX = panelRatio / ratio;
  } else if (ratio >= panelRatio) {
    repeatX = panelRatio / ratio;
  } else {
    repeatY = ratio / panelRatio;
  }

  texture.wrapS = THREE.ClampToEdgeWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.repeat.set(repeatX, repeatY);
  texture.offset.set((1 - repeatX) * horizontalAlignment, (1 - repeatY) / 2);
}

function getPanelGeometrySize(definition) {
  if (definition.fit !== "contain") {
    return [CUBOID_WIDTH, CUBOID_HEIGHT];
  }

  const panelRatio = CUBOID_WIDTH / CUBOID_HEIGHT;
  const imageRatio = Math.max(0.001, definition.ratio);

  if (imageRatio >= panelRatio) {
    return [CUBOID_WIDTH, CUBOID_WIDTH / imageRatio];
  }

  return [CUBOID_HEIGHT * imageRatio, CUBOID_HEIGHT];
}

function applyProjectedQuadTransform(element, points) {
  const [topLeft, topRight, bottomRight, bottomLeft] = points;
  const dx1 = topRight.x - bottomRight.x;
  const dx2 = bottomLeft.x - bottomRight.x;
  const dx3 = topLeft.x - topRight.x + bottomRight.x - bottomLeft.x;
  const dy1 = topRight.y - bottomRight.y;
  const dy2 = bottomLeft.y - bottomRight.y;
  const dy3 = topLeft.y - topRight.y + bottomRight.y - bottomLeft.y;
  const denominator = dx1 * dy2 - dx2 * dy1;

  if (Math.abs(denominator) < 0.000001) return false;

  const perspectiveX = (dx3 * dy2 - dx2 * dy3) / denominator;
  const perspectiveY = (dx1 * dy3 - dx3 * dy1) / denominator;
  const scaleX = topRight.x - topLeft.x + perspectiveX * topRight.x;
  const skewX = bottomLeft.x - topLeft.x + perspectiveY * bottomLeft.x;
  const translateX = topLeft.x;
  const skewY = topRight.y - topLeft.y + perspectiveX * topRight.y;
  const scaleY = bottomLeft.y - topLeft.y + perspectiveY * bottomLeft.y;
  const translateY = topLeft.y;

  const matrix = [
    scaleX / TOOLS_CUBE_SURFACE_WIDTH,
    skewY / TOOLS_CUBE_SURFACE_WIDTH,
    0,
    perspectiveX / TOOLS_CUBE_SURFACE_WIDTH,
    skewX / TOOLS_CUBE_SURFACE_HEIGHT,
    scaleY / TOOLS_CUBE_SURFACE_HEIGHT,
    0,
    perspectiveY / TOOLS_CUBE_SURFACE_HEIGHT,
    0,
    0,
    1,
    0,
    translateX,
    translateY,
    0,
    1,
  ];

  if (!matrix.every(Number.isFinite)) return false;
  element.style.transform = `matrix3d(${matrix.map((value) => value.toFixed(8)).join(",")})`;
  return true;
}

export function ProjectCube({
  activeIndex = 0,
  onActiveChange,
  onOpen,
  onFirstFrameReady,
  mode = "filled",
  ariaLabel,
  className = "",
  presentation = "home",
  presentationDuration = 520,
  rotationDuration = ROTATION_DURATION,
  coverFlatViewport = false,
  interactive = true,
  homeComposition = false,
  mediaPlaybackEnabled = false,
  apiRef,
}) {
  const canvasRef = useRef(null);
  const toolsCoverRef = useRef(null);
  const controllerRef = useRef(null);
  const activeIndexRef = useRef(normalizeIndex(activeIndex));
  const intendedIndexRef = useRef(normalizeIndex(activeIndex));
  const onActiveChangeRef = useRef(onActiveChange);
  const onOpenRef = useRef(onOpen);
  const onFirstFrameReadyRef = useRef(onFirstFrameReady);
  const modeRef = useRef(mode);
  const presentationRef = useRef(presentation);
  const presentationDurationRef = useRef(presentationDuration);
  const rotationDurationRef = useRef(rotationDuration);
  const coverFlatViewportRef = useRef(coverFlatViewport);
  const mediaPlaybackEnabledRef = useRef(mediaPlaybackEnabled);
  const mediaPlaybackKeyRef = useRef(Symbol("s50c-cube-video"));
  const apiRefRef = useRef(apiRef);

  const normalizedActiveIndex = normalizeIndex(activeIndex);
  activeIndexRef.current = normalizedActiveIndex;
  onActiveChangeRef.current = onActiveChange;
  onOpenRef.current = onOpen;
  onFirstFrameReadyRef.current = onFirstFrameReady;
  modeRef.current = mode;
  presentationRef.current = presentation;
  presentationDurationRef.current = presentationDuration;
  rotationDurationRef.current = rotationDuration;
  coverFlatViewportRef.current = coverFlatViewport;
  mediaPlaybackEnabledRef.current = mediaPlaybackEnabled;
  apiRefRef.current = apiRef;

  useEffect(() => {
    const canvas = canvasRef.current;
    const playbackKey = mediaPlaybackKeyRef.current;
    const canPlayVideo = mediaPlaybackEnabled
      && mode !== "wireframe"
      && normalizedActiveIndex === S50C_FACE_INDEX;

    if (!canvas || !canPlayVideo) {
      setS50CSharedVideoPlaybackIntent(playbackKey, false);
      return undefined;
    }

    let disposed = false;
    const updateIntent = (visible) => {
      if (disposed) return;
      setS50CSharedVideoPlaybackIntent(playbackKey, canPlayVideo && visible);
    };

    if (typeof IntersectionObserver === "undefined") {
      updateIntent(true);
      return () => {
        disposed = true;
        setS50CSharedVideoPlaybackIntent(playbackKey, false);
      };
    }

    const observer = new IntersectionObserver(
      ([entry]) => updateIntent(Boolean(entry?.isIntersecting && entry.intersectionRatio > 0)),
      { threshold: [0, 0.01] },
    );
    observer.observe(canvas);

    return () => {
      disposed = true;
      observer.disconnect();
      setS50CSharedVideoPlaybackIntent(playbackKey, false);
    };
  }, [mediaPlaybackEnabled, mode, normalizedActiveIndex]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    let disposed = false;
    let wheelUnlockTimer = 0;
    let reducedMotion = false;
    let firstFrameReadyFrameId = 0;
    let firstFrameReadyCalled = false;
    let initialSceneReady = false;
    const settledFaceTextures = new Set();
    const videoFrameUnsubscribers = [];
    const videoTextureReleases = [];

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 100);
    camera.position.set(0, 0, 7.4);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

    const ambientLight = new THREE.AmbientLight(0xffffff, 2.2);
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.6);
    keyLight.position.set(4, 6, 7);
    const fillLight = new THREE.DirectionalLight(0xdde8ee, 1.2);
    fillLight.position.set(-5, 1, -4);
    scene.add(ambientLight, keyLight, fillLight);

    const presentationRoot = new THREE.Group();
    const startsFlat = presentationRef.current === "flat";
    presentationRoot.rotation.set(
      startsFlat ? 0 : (homeComposition ? HOME_PRESENTATION_TILT_X : PRESENTATION_TILT_X),
      startsFlat ? 0 : (homeComposition ? HOME_PRESENTATION_TILT_Y : PRESENTATION_TILT_Y),
      0,
    );
    presentationRoot.position.set(
      homeComposition && !startsFlat ? HOME_PRESENTATION_X : 0,
      homeComposition && !startsFlat ? HOME_PRESENTATION_Y : 0,
      0,
    );
    scene.add(presentationRoot);

    // Keep fullscreen depth flattening in the presentation-aligned frame.
    // cubeRoot remains rotation-only so a side face's own width/height axes
    // are never collapsed when that face rotates toward the camera.
    const depthRoot = new THREE.Group();
    depthRoot.scale.z = startsFlat ? FLAT_DEPTH_SCALE : 1;
    presentationRoot.add(depthRoot);

    const cubeRoot = new THREE.Group();
    depthRoot.add(cubeRoot);

    const boxGeometry = new THREE.BoxGeometry(CUBOID_WIDTH, CUBOID_HEIGHT, CUBOID_DEPTH);
    const boxMaterial = new THREE.MeshStandardMaterial({
      color: 0x050505,
      metalness: 0,
      roughness: 0.9,
    });
    const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
    cubeRoot.add(boxMesh);

    const edgeGeometry = new THREE.EdgesGeometry(boxGeometry, 1);
    const edgeMaterial = new THREE.LineBasicMaterial({
      color: 0x080a09,
      transparent: true,
      opacity: 0.88,
    });
    const edges = new THREE.LineSegments(edgeGeometry, edgeMaterial);
    edges.renderOrder = 4;
    cubeRoot.add(edges);

    const panelGroup = new THREE.Group();
    cubeRoot.add(panelGroup);

    // The textured panels sit just in front of the solid cuboid so their
    // edges can partially cover the BoxGeometry outline at oblique angles.
    // Draw one exact rectangle on each panel itself to keep every corner
    // closed and every projected side continuous without changing geometry,
    // camera, perspective, or motion.
    const panelOutlineGeometry = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(-CUBOID_WIDTH / 2, -CUBOID_HEIGHT / 2, 0),
      new THREE.Vector3(CUBOID_WIDTH / 2, -CUBOID_HEIGHT / 2, 0),
      new THREE.Vector3(CUBOID_WIDTH / 2, CUBOID_HEIGHT / 2, 0),
      new THREE.Vector3(-CUBOID_WIDTH / 2, CUBOID_HEIGHT / 2, 0),
    ]);

    const panelGeometries = [];
    const panelMaterials = [];
    const panelMeshes = [];
    const textures = [];
    const textureLoader = new THREE.TextureLoader();
    let toolsPanel = null;
    const toolsFaceLocalCorners = [
      new THREE.Vector3(-CUBOID_WIDTH / 2, CUBOID_HEIGHT / 2, 0),
      new THREE.Vector3(CUBOID_WIDTH / 2, CUBOID_HEIGHT / 2, 0),
      new THREE.Vector3(CUBOID_WIDTH / 2, -CUBOID_HEIGHT / 2, 0),
      new THREE.Vector3(-CUBOID_WIDTH / 2, -CUBOID_HEIGHT / 2, 0),
    ];
    const toolsFaceScreenCorners = toolsFaceLocalCorners.map(() => new THREE.Vector3());
    const toolsFaceCenter = new THREE.Vector3();
    const toolsFaceNormal = new THREE.Vector3();
    const cameraWorldPosition = new THREE.Vector3();
    const toolsFaceToCamera = new THREE.Vector3();
    const toolsFaceQuaternion = new THREE.Quaternion();
    const spatialFaceLocalCorners = [
      new THREE.Vector3(-CUBOID_WIDTH / 2, CUBOID_HEIGHT / 2, 0),
      new THREE.Vector3(CUBOID_WIDTH / 2, CUBOID_HEIGHT / 2, 0),
      new THREE.Vector3(CUBOID_WIDTH / 2, -CUBOID_HEIGHT / 2, 0),
      new THREE.Vector3(-CUBOID_WIDTH / 2, -CUBOID_HEIGHT / 2, 0),
    ];
    const spatialFaceScreenCorners = spatialFaceLocalCorners.map(() => new THREE.Vector3());

    function updateToolsCoverProjection() {
      const cover = toolsCoverRef.current;
      if (!cover || !toolsPanel || modeRef.current === "wireframe") {
        if (cover) {
          cover.style.display = "none";
          cover.style.opacity = "0";
        }
        return;
      }

      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      if (!width || !height) return;

      scene.updateMatrixWorld(true);
      camera.updateMatrixWorld(true);
      toolsPanel.getWorldQuaternion(toolsFaceQuaternion);
      toolsFaceNormal.set(0, 0, 1).applyQuaternion(toolsFaceQuaternion).normalize();
      toolsFaceCenter.setFromMatrixPosition(toolsPanel.matrixWorld);
      camera.getWorldPosition(cameraWorldPosition);
      toolsFaceToCamera.subVectors(cameraWorldPosition, toolsFaceCenter).normalize();
      const facing = toolsFaceNormal.dot(toolsFaceToCamera);

      if (facing <= 0.015) {
        cover.style.display = "none";
        cover.style.opacity = "0";
        return;
      }

      for (let index = 0; index < toolsFaceLocalCorners.length; index += 1) {
        const point = toolsFaceScreenCorners[index]
          .copy(toolsFaceLocalCorners[index])
          .applyMatrix4(toolsPanel.matrixWorld)
          .project(camera);
        point.x = (point.x * 0.5 + 0.5) * width;
        point.y = (-point.y * 0.5 + 0.5) * height;
      }

      if (!applyProjectedQuadTransform(cover, toolsFaceScreenCorners)) {
        cover.style.display = "none";
        cover.style.opacity = "0";
        return;
      }

      // Do not set visibility: visible here. Transition containers deliberately
      // use visibility: hidden, and a visible descendant would override that
      // inherited state and leak the projected cover over the fullscreen hero.
      cover.style.display = "block";
      cover.style.removeProperty("visibility");
      cover.style.opacity = String(THREE.MathUtils.smoothstep(facing, 0.04, 0.3));
    }

    function renderScene() {
      if (!disposed) {
        renderer.render(scene, camera);
        updateToolsCoverProjection();
      }
    }

    function scheduleFirstFrameReady() {
      if (
        disposed
        || firstFrameReadyCalled
        || firstFrameReadyFrameId
        || !initialSceneReady
        || !settledFaceTextures.has(activeIndexRef.current)
      ) return;

      renderScene();
      firstFrameReadyFrameId = requestAnimationFrame(() => {
        firstFrameReadyFrameId = 0;
        if (disposed || firstFrameReadyCalled) return;
        firstFrameReadyCalled = true;
        onFirstFrameReadyRef.current?.();
      });
    }

    function markFaceTextureSettled(index) {
      if (disposed || settledFaceTextures.has(index)) return;
      settledFaceTextures.add(index);
      scheduleFirstFrameReady();
    }

    const maxAnisotropy = Math.min(renderer.capabilities.getMaxAnisotropy(), 8);

    function updateCameraPosition(
      nextMode = modeRef.current,
      nextPresentation = presentationRef.current,
    ) {
      const isFilled = nextMode !== "wireframe";
      const isDesktop = window.matchMedia("(min-width: 761px)").matches;

      const flatCoverCameraZ = () => {
        const halfFovRadians = THREE.MathUtils.degToRad(camera.fov / 2);
        const heightDistance = CUBOID_HEIGHT / (2 * Math.tan(halfFovRadians));
        const widthDistance = CUBOID_WIDTH / (2 * Math.tan(halfFovRadians) * camera.aspect);
        return Math.min(FLAT_CAMERA_Z, heightDistance, widthDistance) * 0.998;
      };

      if (isFilled && nextPresentation === "flat") {
        camera.position.set(
          0,
          0,
          coverFlatViewportRef.current ? flatCoverCameraZ() : FLAT_CAMERA_Z,
        );
      } else if (isFilled && isDesktop) {
        camera.position.set(0, 0, getFilledHomeCameraZ(camera.aspect, true, homeComposition));
      } else if (isFilled) {
        camera.position.set(0, 0, getFilledHomeCameraZ(camera.aspect, false));
      } else {
        camera.position.set(0, 0, 7.4);
      }
      camera.lookAt(0, 0, 0);
    }

    for (let index = 0; index < FACE_TEXTURES.length; index += 1) {
      const definition = FACE_TEXTURES[index];
      const [panelWidth, panelHeight] = getPanelGeometrySize(definition);
      const geometry = new THREE.PlaneGeometry(panelWidth, panelHeight);
      let material;

      if (definition.media === "video") {
        const posterTexture = textureLoader.load(
          definition.poster,
          () => {
            if (disposed) return;
            posterTexture.needsUpdate = true;
            renderScene();
            markFaceTextureSettled(index);
          },
          undefined,
          () => {
            if (!disposed) markFaceTextureSettled(index);
          },
        );
        posterTexture.colorSpace = THREE.SRGBColorSpace;
        posterTexture.anisotropy = maxAnisotropy;
        posterTexture.minFilter = THREE.LinearMipmapLinearFilter;
        posterTexture.magFilter = THREE.LinearFilter;
        posterTexture.wrapS = THREE.ClampToEdgeWrapping;
        posterTexture.wrapT = THREE.ClampToEdgeWrapping;
        posterTexture.repeat.set(1, 1);
        posterTexture.offset.set(0, 0);

        material = new THREE.MeshBasicMaterial({
          map: posterTexture,
          toneMapped: false,
        });
        textures.push(posterTexture);

        const video = modeRef.current === "wireframe"
          ? null
          : getS50CSharedVideoElement();
        if (video) {
          const videoTexture = acquireS50CVideoTexture(video);
          videoTextureReleases.push(releaseS50CVideoTexture);

          preloadS50CSharedCoverVideo().then((readyVideo) => {
            if (disposed || !readyVideo) return;
            videoTexture.needsUpdate = true;
            material.map = videoTexture;
            material.needsUpdate = true;
            renderScene();
            markFaceTextureSettled(index);
          });

          videoFrameUnsubscribers.push(
            subscribeS50CSharedVideoFrames(() => {
              videoTexture.needsUpdate = true;
              renderScene();
            }, () => (
              !disposed
              && mediaPlaybackEnabledRef.current
              && intendedIndexRef.current === index
              && modeRef.current !== "wireframe"
            )),
          );
        }
      } else {
        const texture = textureLoader.load(
          definition.src,
          () => {
            if (disposed) {
              texture.dispose();
              return;
            }
            texture.needsUpdate = true;
            renderScene();
            markFaceTextureSettled(index);
          },
          undefined,
          () => {
            if (!disposed) {
              renderScene();
              markFaceTextureSettled(index);
            }
          },
        );
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.anisotropy = maxAnisotropy;
        texture.minFilter = THREE.LinearMipmapLinearFilter;
        texture.magFilter = THREE.LinearFilter;
        if (definition.fit === "contain") {
          texture.wrapS = THREE.ClampToEdgeWrapping;
          texture.wrapT = THREE.ClampToEdgeWrapping;
          texture.repeat.set(1, 1);
          texture.offset.set(0, 0);
        } else {
          applyPanelCover(texture, definition.ratio, index === 2 ? 0 : 0.5);
        }

        material = new THREE.MeshBasicMaterial({
          map: texture,
          toneMapped: false,
        });
        textures.push(texture);
      }

      const panel = new THREE.Mesh(geometry, material);
      const transform = FACE_TRANSFORMS[index];
      panel.position.set(...transform.position);
      panel.rotation.set(...transform.rotation);
      panel.renderOrder = 2;

      if (definition.fit === "contain" && definition.background) {
        const backgroundGeometry = new THREE.PlaneGeometry(CUBOID_WIDTH, CUBOID_HEIGHT);
        const backgroundMaterial = new THREE.MeshBasicMaterial({
          color: definition.background,
          toneMapped: false,
        });
        const backgroundPanel = new THREE.Mesh(backgroundGeometry, backgroundMaterial);
        backgroundPanel.position.z = -0.002;
        backgroundPanel.renderOrder = 1;
        panel.add(backgroundPanel);
        panelGeometries.push(backgroundGeometry);
        panelMaterials.push(backgroundMaterial);
      }

      const panelOutline = new THREE.LineLoop(panelOutlineGeometry, edgeMaterial);
      panelOutline.position.z = 0.002;
      panelOutline.renderOrder = 5;
      panel.add(panelOutline);

      panelGroup.add(panel);
      if (index === 2) toolsPanel = panel;

      panelMeshes.push(panel);
      panelGeometries.push(geometry);
      panelMaterials.push(material);
    }

    const initialRotation = activeIndexRef.current * HALF_TURN;
    cubeRoot.rotation.x = initialRotation;

    const motionState = {
      current: initialRotation,
      target: initialRotation,
      velocity: 0,
      lastTime: 0,
      startTime: 0,
      from: initialRotation,
      frameId: 0,
    };
    const presentationState = {
      frameId: 0,
      startTime: 0,
      fromTiltX: presentationRoot.rotation.x,
      fromTiltY: presentationRoot.rotation.y,
      fromDepth: depthRoot.scale.z,
      fromCameraZ: camera.position.z,
      fromPositionX: presentationRoot.position.x,
      fromPositionY: presentationRoot.position.y,
      toTiltX: presentationRoot.rotation.x,
      toTiltY: presentationRoot.rotation.y,
      toDepth: depthRoot.scale.z,
      toCameraZ: camera.position.z,
      toPositionX: presentationRoot.position.x,
      toPositionY: presentationRoot.position.y,
    };
    const enterState = {
      frameId: 0,
      resolve: null,
      startTime: 0,
      duration: 480,
      fromRotation: initialRotation,
      toRotation: initialRotation,
      fromTiltX: presentationRoot.rotation.x,
      fromTiltY: presentationRoot.rotation.y,
      fromDepth: depthRoot.scale.z,
      fromCameraZ: camera.position.z,
      toCameraZ: camera.position.z,
      previousFrameTime: 0,
      maxFrameGap: 0,
      framesOver30: 0,
      frameCount: 0,
    };
    const spatialTransitionState = {
      active: false,
      progress: 0,
      homeRotation: initialRotation,
      fullscreenRotation: initialRotation,
      homeTiltX: presentationRoot.rotation.x,
      homeTiltY: presentationRoot.rotation.y,
      homeDepth: depthRoot.scale.z,
      homeCameraZ: camera.position.z,
      homeFov: camera.fov,
      homePositionX: presentationRoot.position.x,
      homePositionY: presentationRoot.position.y,
      baseFullscreenCameraZ: FLAT_CAMERA_Z,
      fullscreenCameraZ: FLAT_CAMERA_Z,
      fullscreenPositionX: 0,
      fullscreenPositionY: 0,
      selectedIndex: activeIndexRef.current,
      targetRect: null,
    };
    const dragState = {
      active: false,
      pointerId: -1,
      lastY: 0,
      startX: 0,
      startY: 0,
      moved: false,
    };
    let wheelAccumulator = 0;
    let wheelLocked = false;

    function stopAnimation() {
      if (motionState.frameId !== 0) {
        cancelAnimationFrame(motionState.frameId);
        motionState.frameId = 0;
      }
      motionState.lastTime = 0;
      motionState.startTime = 0;
    }

    function stopPresentationAnimation() {
      if (presentationState.frameId !== 0) {
        cancelAnimationFrame(presentationState.frameId);
        presentationState.frameId = 0;
      }
      presentationState.startTime = 0;
    }

    function stopEnterAnimation() {
      if (enterState.frameId !== 0) {
        cancelAnimationFrame(enterState.frameId);
        enterState.frameId = 0;
      }
      enterState.startTime = 0;
      if (enterState.resolve) {
        const resolve = enterState.resolve;
        enterState.resolve = null;
        resolve();
      }
    }

    function getFlatCameraZ() {
      const halfFovRadians = THREE.MathUtils.degToRad(camera.fov / 2);
      const heightDistance = CUBOID_HEIGHT / (2 * Math.tan(halfFovRadians));
      const widthDistance = CUBOID_WIDTH / (2 * Math.tan(halfFovRadians) * camera.aspect);
      return coverFlatViewportRef.current
        ? Math.min(FLAT_CAMERA_Z, heightDistance, widthDistance) * 0.998
        : FLAT_CAMERA_Z;
    }

    function copyEndpointRect(rect) {
      if (!rect) return null;
      const left = Number(rect.left);
      const top = Number(rect.top);
      const width = Number(rect.width);
      const height = Number(rect.height);
      if (![left, top, width, height].every(Number.isFinite) || width <= 0 || height <= 0) {
        return null;
      }
      return { left, top, width, height };
    }

    function configureSpatialTransitionEndpoint(targetRect, stageRect = targetRect) {
      const target = copyEndpointRect(targetRect);
      const stage = copyEndpointRect(stageRect);
      if (!target || !stage) {
        spatialTransitionState.targetRect = null;
        spatialTransitionState.fullscreenCameraZ = spatialTransitionState.baseFullscreenCameraZ;
        spatialTransitionState.fullscreenPositionX = 0;
        spatialTransitionState.fullscreenPositionY = 0;
        return;
      }

      const finalFov = 36;
      const tanHalfFov = Math.tan(THREE.MathUtils.degToRad(finalFov / 2));
      const stageAspect = stage.width / stage.height;
      const widthDistance = (CUBOID_WIDTH * stage.width)
        / (2 * target.width * tanHalfFov * stageAspect);
      const heightDistance = (CUBOID_HEIGHT * stage.height)
        / (2 * target.height * tanHalfFov);
      const fitDistance = Math.min(widthDistance, heightDistance);
      const faceCenterZ = PANEL_OFFSET * FLAT_DEPTH_SCALE;
      const stageCenterX = stage.left + stage.width / 2;
      const stageCenterY = stage.top + stage.height / 2;
      const targetCenterX = target.left + target.width / 2;
      const targetCenterY = target.top + target.height / 2;
      const worldUnitsPerPixelX = (2 * fitDistance * tanHalfFov * stageAspect) / stage.width;
      const worldUnitsPerPixelY = (2 * fitDistance * tanHalfFov) / stage.height;

      spatialTransitionState.targetRect = target;
      spatialTransitionState.fullscreenCameraZ = faceCenterZ + fitDistance;
      spatialTransitionState.fullscreenPositionX = (targetCenterX - stageCenterX)
        * worldUnitsPerPixelX;
      spatialTransitionState.fullscreenPositionY = -(targetCenterY - stageCenterY)
        * worldUnitsPerPixelY;
    }

    function getSpatialTransitionFaceRect() {
      const panel = panelMeshes[spatialTransitionState.selectedIndex];
      const canvasRect = canvas.getBoundingClientRect();
      if (!panel || canvasRect.width <= 0 || canvasRect.height <= 0) return null;

      scene.updateMatrixWorld(true);
      camera.updateMatrixWorld(true);

      let left = Infinity;
      let top = Infinity;
      let right = -Infinity;
      let bottom = -Infinity;

      for (let index = 0; index < spatialFaceLocalCorners.length; index += 1) {
        const point = spatialFaceScreenCorners[index]
          .copy(spatialFaceLocalCorners[index])
          .applyMatrix4(panel.matrixWorld)
          .project(camera);
        const x = canvasRect.left + (point.x * 0.5 + 0.5) * canvasRect.width;
        const y = canvasRect.top + (-point.y * 0.5 + 0.5) * canvasRect.height;
        left = Math.min(left, x);
        top = Math.min(top, y);
        right = Math.max(right, x);
        bottom = Math.max(bottom, y);
      }

      if (![left, top, right, bottom].every(Number.isFinite)) return null;
      return {
        left,
        top,
        right,
        bottom,
        width: right - left,
        height: bottom - top,
        centerX: (left + right) / 2,
        centerY: (top + bottom) / 2,
      };
    }

    function syncSpatialTransitionEndpoint(targetRect) {
      if (!spatialTransitionState.active) return null;
      configureSpatialTransitionEndpoint(targetRect, canvas.getBoundingClientRect());
      setSpatialTransitionProgress(1);
      const actualRect = getSpatialTransitionFaceRect();
      const target = spatialTransitionState.targetRect;

      if (actualRect && target) {
        canvas.dataset.spatialFaceRect = [
          actualRect.left,
          actualRect.top,
          actualRect.width,
          actualRect.height,
        ].map((value) => value.toFixed(3)).join(",");
        canvas.dataset.spatialTargetRect = [
          target.left,
          target.top,
          target.width,
          target.height,
        ].map((value) => value.toFixed(3)).join(",");
        canvas.dataset.spatialEndpointError = [
          actualRect.left - target.left,
          actualRect.top - target.top,
          actualRect.width - target.width,
          actualRect.height - target.height,
        ].map((value) => value.toFixed(3)).join(",");
      }

      return actualRect;
    }

    function setSpatialTransitionProgress(value) {
      if (!spatialTransitionState.active) return;
      const progress = THREE.MathUtils.clamp(value, 0, 1);
      const endpointMix = THREE.MathUtils.smootherstep(progress, 0.9, 1);
      spatialTransitionState.progress = progress;

      motionState.current = THREE.MathUtils.lerp(
        spatialTransitionState.homeRotation,
        spatialTransitionState.fullscreenRotation,
        progress,
      );
      motionState.target = spatialTransitionState.fullscreenRotation;
      cubeRoot.rotation.x = motionState.current;
      presentationRoot.rotation.x = THREE.MathUtils.lerp(
        spatialTransitionState.homeTiltX,
        0,
        progress,
      );
      presentationRoot.rotation.y = THREE.MathUtils.lerp(
        spatialTransitionState.homeTiltY,
        0,
        progress,
      );
      presentationRoot.position.x = THREE.MathUtils.lerp(
        spatialTransitionState.homePositionX,
        spatialTransitionState.fullscreenPositionX,
        endpointMix,
      );
      presentationRoot.position.y = THREE.MathUtils.lerp(
        spatialTransitionState.homePositionY,
        spatialTransitionState.fullscreenPositionY,
        endpointMix,
      );
      presentationRoot.scale.setScalar(1);
      depthRoot.scale.z = THREE.MathUtils.lerp(
        spatialTransitionState.homeDepth,
        FLAT_DEPTH_SCALE,
        progress,
      );
      const baseCameraZ = THREE.MathUtils.lerp(
        spatialTransitionState.homeCameraZ,
        spatialTransitionState.baseFullscreenCameraZ,
        progress,
      );
      camera.position.z = baseCameraZ + (
        spatialTransitionState.fullscreenCameraZ
        - spatialTransitionState.baseFullscreenCameraZ
      ) * endpointMix;
      camera.fov = THREE.MathUtils.lerp(spatialTransitionState.homeFov, 36, progress);
      camera.updateProjectionMatrix();
      camera.lookAt(0, 0, 0);
      renderScene();
    }

    function beginSpatialTransition(index, targetRect = null) {
      stopAnimation();
      stopPresentationAnimation();
      stopEnterAnimation();

      const nextIndex = normalizeIndex(index);
      intendedIndexRef.current = nextIndex;
      spatialTransitionState.homeRotation = cubeRoot.rotation.x;
      spatialTransitionState.fullscreenRotation = rotationForFace(
        nextIndex,
        cubeRoot.rotation.x,
      );
      spatialTransitionState.homeTiltX = presentationRoot.rotation.x;
      spatialTransitionState.homeTiltY = presentationRoot.rotation.y;
      spatialTransitionState.homeDepth = depthRoot.scale.z;
      spatialTransitionState.homeCameraZ = camera.position.z;
      spatialTransitionState.homeFov = camera.fov;
      spatialTransitionState.homePositionX = presentationRoot.position.x;
      spatialTransitionState.homePositionY = presentationRoot.position.y;
      spatialTransitionState.baseFullscreenCameraZ = getFlatCameraZ();
      spatialTransitionState.selectedIndex = nextIndex;
      configureSpatialTransitionEndpoint(targetRect, targetRect);
      spatialTransitionState.active = true;
      setSpatialTransitionProgress(0);
    }

    function endSpatialTransition() {
      if (!spatialTransitionState.active) return;
      setSpatialTransitionProgress(0);
      spatialTransitionState.active = false;
      motionState.current = cubeRoot.rotation.x;
      motionState.target = cubeRoot.rotation.x;
      renderScene();
    }

    function enterFrame(time) {
      enterState.frameId = 0;
      if (!enterState.startTime) enterState.startTime = time;
      if (enterState.previousFrameTime) {
        const frameGap = time - enterState.previousFrameTime;
        enterState.maxFrameGap = Math.max(enterState.maxFrameGap, frameGap);
        if (frameGap > 30) enterState.framesOver30 += 1;
      }
      enterState.previousFrameTime = time;
      enterState.frameCount += 1;
      const progress = Math.min(1, (time - enterState.startTime) / enterState.duration);
      const eased = easeInOutPower3(progress);
      // The stage transform and the 3D camera both contribute to apparent
      // enlargement. Keep the camera track coupled to the same timeline, but
      // let it build more gradually so the whole cuboid remains readable
      // through the middle of ENTER instead of filling the viewport too early.
      const approachProgress = eased * eased;

      motionState.current = THREE.MathUtils.lerp(
        enterState.fromRotation,
        enterState.toRotation,
        eased,
      );
      motionState.target = enterState.toRotation;
      cubeRoot.rotation.x = motionState.current;
      presentationRoot.rotation.x = THREE.MathUtils.lerp(
        enterState.fromTiltX,
        0,
        eased,
      );
      presentationRoot.rotation.y = THREE.MathUtils.lerp(
        enterState.fromTiltY,
        0,
        eased,
      );
      camera.position.z = THREE.MathUtils.lerp(
        enterState.fromCameraZ,
        enterState.toCameraZ,
        approachProgress,
      );

      // Keep the cuboid spatially intact for almost the entire ENTER. Only the
      // final 10% removes the residual depth so the target face can hand off to
      // the identically framed Section 00 cover without a visible jump.
      const depthProgress = Math.max(0, Math.min(1, (progress - 0.9) / 0.1));
      depthRoot.scale.z = THREE.MathUtils.lerp(
        enterState.fromDepth,
        FLAT_DEPTH_SCALE,
        easeInOutPower3(depthProgress),
      );
      presentationRoot.scale.setScalar(1);
      camera.lookAt(0, 0, 0);
      renderScene();

      if (progress < 1) {
        enterState.frameId = requestAnimationFrame(enterFrame);
        return;
      }

      motionState.current = enterState.toRotation;
      motionState.target = enterState.toRotation;
      motionState.startTime = 0;
      motionState.lastTime = 0;
      cubeRoot.rotation.x = enterState.toRotation;
      presentationRoot.rotation.set(0, 0, 0);
      presentationRoot.scale.setScalar(1);
      depthRoot.scale.z = FLAT_DEPTH_SCALE;
      camera.position.z = enterState.toCameraZ;
      camera.lookAt(0, 0, 0);
      renderScene();

      // Publish the completed run once. Writing these QA values on every
      // animation frame would create DOM mutation work inside the transition.
      canvas.dataset.enterFrameCount = String(enterState.frameCount);
      canvas.dataset.enterMaxFrameGap = enterState.maxFrameGap.toFixed(2);
      canvas.dataset.enterFramesOver30 = String(enterState.framesOver30);

      if (enterState.resolve) {
        const resolve = enterState.resolve;
        enterState.resolve = null;
        resolve();
      }
    }

    function startEnter(index, duration = 480) {
      stopAnimation();
      stopPresentationAnimation();
      stopEnterAnimation();

      const nextIndex = normalizeIndex(index);
      intendedIndexRef.current = nextIndex;
      enterState.duration = Math.max(1, duration);
      enterState.startTime = 0;
      enterState.fromRotation = cubeRoot.rotation.x;
      enterState.toRotation = rotationForFace(nextIndex, cubeRoot.rotation.x);
      enterState.fromTiltX = presentationRoot.rotation.x;
      enterState.fromTiltY = presentationRoot.rotation.y;
      enterState.fromDepth = depthRoot.scale.z;
      enterState.fromCameraZ = camera.position.z;
      enterState.toCameraZ = getFlatCameraZ();
      enterState.previousFrameTime = 0;
      enterState.maxFrameGap = 0;
      enterState.framesOver30 = 0;
      enterState.frameCount = 0;

      if (reducedMotion) {
        motionState.current = enterState.toRotation;
        motionState.target = enterState.toRotation;
        cubeRoot.rotation.x = enterState.toRotation;
        presentationRoot.rotation.set(0, 0, 0);
        presentationRoot.scale.setScalar(1);
        depthRoot.scale.z = FLAT_DEPTH_SCALE;
        camera.position.z = enterState.toCameraZ;
        camera.lookAt(0, 0, 0);
        renderScene();
        return Promise.resolve();
      }

      return new Promise((resolve) => {
        enterState.resolve = resolve;
        enterState.frameId = requestAnimationFrame(enterFrame);
      });
    }

    function presentationFrame(time) {
      presentationState.frameId = 0;
      if (!presentationState.startTime) presentationState.startTime = time;
      const duration = Math.max(1, presentationDurationRef.current);
      const progress = Math.min(1, (time - presentationState.startTime) / duration);
      const eased = easeInOutQuart(progress);

      presentationRoot.rotation.x = THREE.MathUtils.lerp(
        presentationState.fromTiltX,
        presentationState.toTiltX,
        eased,
      );
      presentationRoot.rotation.y = THREE.MathUtils.lerp(
        presentationState.fromTiltY,
        presentationState.toTiltY,
        eased,
      );
      presentationRoot.position.x = THREE.MathUtils.lerp(
        presentationState.fromPositionX,
        presentationState.toPositionX,
        eased,
      );
      presentationRoot.position.y = THREE.MathUtils.lerp(
        presentationState.fromPositionY,
        presentationState.toPositionY,
        eased,
      );
      depthRoot.scale.z = THREE.MathUtils.lerp(
        presentationState.fromDepth,
        presentationState.toDepth,
        eased,
      );
      camera.position.z = THREE.MathUtils.lerp(
        presentationState.fromCameraZ,
        presentationState.toCameraZ,
        eased,
      );
      camera.lookAt(0, 0, 0);
      renderScene();

      if (progress < 1) {
        presentationState.frameId = requestAnimationFrame(presentationFrame);
      }
    }

    function applyPresentation(nextPresentation, animate = true) {
      stopEnterAnimation();
      const isFlat = nextPresentation === "flat";
      const isDesktop = window.matchMedia("(min-width: 761px)").matches;
      const filledCameraZ = getFilledHomeCameraZ(camera.aspect, isDesktop, homeComposition);
      const halfFovRadians = THREE.MathUtils.degToRad(camera.fov / 2);
      const heightDistance = CUBOID_HEIGHT / (2 * Math.tan(halfFovRadians));
      const widthDistance = CUBOID_WIDTH / (2 * Math.tan(halfFovRadians) * camera.aspect);
      const flatCameraZ = coverFlatViewportRef.current
        ? Math.min(FLAT_CAMERA_Z, heightDistance, widthDistance) * 0.998
        : FLAT_CAMERA_Z;

      presentationState.fromTiltX = presentationRoot.rotation.x;
      presentationState.fromTiltY = presentationRoot.rotation.y;
      presentationState.fromDepth = depthRoot.scale.z;
      presentationState.fromCameraZ = camera.position.z;
      presentationState.fromPositionX = presentationRoot.position.x;
      presentationState.fromPositionY = presentationRoot.position.y;
      presentationState.toTiltX = isFlat
        ? 0
        : (homeComposition ? HOME_PRESENTATION_TILT_X : PRESENTATION_TILT_X);
      presentationState.toTiltY = isFlat
        ? 0
        : (homeComposition ? HOME_PRESENTATION_TILT_Y : PRESENTATION_TILT_Y);
      presentationState.toDepth = isFlat ? FLAT_DEPTH_SCALE : 1;
      presentationState.toCameraZ = isFlat ? flatCameraZ : filledCameraZ;
      presentationState.toPositionX = isFlat || !homeComposition ? 0 : HOME_PRESENTATION_X;
      presentationState.toPositionY = isFlat || !homeComposition ? 0 : HOME_PRESENTATION_Y;
      presentationState.startTime = 0;

      stopPresentationAnimation();
      if (!animate || reducedMotion) {
        presentationRoot.rotation.x = presentationState.toTiltX;
        presentationRoot.rotation.y = presentationState.toTiltY;
        presentationRoot.position.x = presentationState.toPositionX;
        presentationRoot.position.y = presentationState.toPositionY;
        depthRoot.scale.z = presentationState.toDepth;
        camera.position.z = presentationState.toCameraZ;
        camera.lookAt(0, 0, 0);
        renderScene();
        return;
      }

      presentationState.frameId = requestAnimationFrame(presentationFrame);
    }

    function animationFrame(time) {
      motionState.frameId = 0;
      if (!motionState.startTime) motionState.startTime = time;
      const progress = Math.min(
        1,
        (time - motionState.startTime) / Math.max(1, rotationDurationRef.current),
      );
      const eased = progress < 0.5
        ? 2 * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 2) / 2;
      motionState.current = THREE.MathUtils.lerp(motionState.from, motionState.target, eased);
      cubeRoot.rotation.x = motionState.current;
      const transitionScale = 1 - Math.sin(Math.PI * progress) * 0.08;
      presentationRoot.scale.setScalar(transitionScale);
      renderScene();

      if (progress >= 1) {
        motionState.current = motionState.target;
        motionState.velocity = 0;
        motionState.lastTime = 0;
        motionState.startTime = 0;
        cubeRoot.rotation.x = motionState.target;
        presentationRoot.scale.setScalar(1);
        renderScene();
        if (wheelLocked) {
          wheelUnlockTimer = window.setTimeout(unlockWheel, 250);
        }
        return;
      }

      motionState.frameId = requestAnimationFrame(animationFrame);
    }

    function startAnimation() {
      if (motionState.frameId === 0) {
        motionState.lastTime = 0;
        motionState.startTime = 0;
        motionState.from = motionState.current;
        motionState.frameId = requestAnimationFrame(animationFrame);
      }
    }

    function setFace(index, animate = true) {
      stopEnterAnimation();
      const nextIndex = normalizeIndex(index);
      intendedIndexRef.current = nextIndex;
      motionState.target = rotationForFace(nextIndex, motionState.current);
      motionState.from = motionState.current;
      motionState.startTime = 0;

      if (!animate || reducedMotion) {
        stopAnimation();
        motionState.current = motionState.target;
        motionState.velocity = 0;
        cubeRoot.rotation.x = motionState.current;
        presentationRoot.scale.setScalar(1);
        renderScene();
        unlockWheel();
        return;
      }

      startAnimation();
    }

    function requestFace(index) {
      const nextIndex = normalizeIndex(index);
      setFace(nextIndex, true);

      if (nextIndex !== activeIndexRef.current) {
        onActiveChangeRef.current?.(nextIndex);
      }
    }

    function applyMode(nextMode) {
      const isFilled = nextMode !== "wireframe";
      updateCameraPosition(nextMode, presentationRef.current);
      boxMesh.visible = true;
      boxMaterial.color.setHex(isFilled ? 0x050505 : 0xefebeb);
      panelGroup.visible = isFilled;
      edgeMaterial.color.setHex(isFilled ? 0x6f706b : 0x080a09);
      edgeMaterial.opacity = isFilled ? 0.62 : 1;
      renderScene();
    }

    function resizeRenderer() {
      const parent = canvas.parentElement;
      const width = Math.max(1, canvas.clientWidth || parent?.clientWidth || 1);
      const height = Math.max(1, canvas.clientHeight || parent?.clientHeight || 1);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      if (spatialTransitionState.active) {
        setSpatialTransitionProgress(spatialTransitionState.progress);
      } else {
        updateCameraPosition();
        renderScene();
      }
    }

    function handlePointerDown(event) {
      if (event.button !== 0 && event.pointerType !== "touch") return;
      stopAnimation();
      presentationRoot.scale.setScalar(1);
      dragState.active = true;
      dragState.pointerId = event.pointerId;
      dragState.lastY = event.clientY;
      dragState.startX = event.clientX;
      dragState.startY = event.clientY;
      dragState.moved = false;
      motionState.current = cubeRoot.rotation.x;
      motionState.target = motionState.current;
      motionState.velocity = 0;
      canvas.focus({ preventScroll: true });
      canvas.setPointerCapture?.(event.pointerId);
    }

    function handlePointerMove(event) {
      if (!dragState.active || event.pointerId !== dragState.pointerId) return;
      const deltaY = event.clientY - dragState.lastY;
      dragState.lastY = event.clientY;
      if (
        Math.abs(event.clientX - dragState.startX) > 6 ||
        Math.abs(event.clientY - dragState.startY) > 6
      ) {
        dragState.moved = true;
      }
      motionState.current += deltaY * DRAG_RADIANS_PER_PIXEL;
      motionState.target = motionState.current;
      cubeRoot.rotation.x = motionState.current;
      renderScene();
    }

    function finishDrag(event) {
      if (!dragState.active || event.pointerId !== dragState.pointerId) return;
      dragState.active = false;
      if (canvas.hasPointerCapture?.(event.pointerId)) {
        canvas.releasePointerCapture(event.pointerId);
      }
      const snappedIndex = faceForRotation(motionState.current);
      requestFace(snappedIndex);
      if (event.type === "pointerup" && !dragState.moved) {
        onOpenRef.current?.(snappedIndex);
      }
    }

    function unlockWheel() {
      wheelLocked = false;
      wheelAccumulator = 0;
      wheelUnlockTimer = 0;
    }

    function handleWheel(event) {
      event.preventDefault();

      if (wheelLocked) return;

      const dominantDelta =
        Math.abs(event.deltaY) >= Math.abs(event.deltaX) ? event.deltaY : event.deltaX;
      wheelAccumulator += dominantDelta;
      if (Math.abs(wheelAccumulator) < WHEEL_THRESHOLD) return;

      wheelLocked = true;
      const direction = wheelAccumulator > 0 ? 1 : -1;
      requestFace(intendedIndexRef.current + direction);
    }

    function handleKeyDown(event) {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        requestFace(intendedIndexRef.current - 1);
        return;
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        requestFace(intendedIndexRef.current + 1);
        return;
      }

      if (event.key === "ArrowUp") {
        event.preventDefault();
        requestFace(intendedIndexRef.current - 1);
        return;
      }

      if (event.key === "ArrowDown") {
        event.preventDefault();
        requestFace(intendedIndexRef.current + 1);
        return;
      }

      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        const index = intendedIndexRef.current;
        onOpenRef.current?.(index);
      }
    }

    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    reducedMotion = reducedMotionQuery.matches;

    function handleReducedMotionChange(event) {
      reducedMotion = event.matches;
      if (reducedMotion) setFace(intendedIndexRef.current, false);
    }

    const resizeObserver = new ResizeObserver(resizeRenderer);
    resizeObserver.observe(canvas);
    if (canvas.parentElement) resizeObserver.observe(canvas.parentElement);

    canvas.addEventListener("pointerdown", handlePointerDown);
    canvas.addEventListener("pointermove", handlePointerMove);
    canvas.addEventListener("pointerup", finishDrag);
    canvas.addEventListener("pointercancel", finishDrag);
    canvas.addEventListener("wheel", handleWheel, { passive: false });
    canvas.addEventListener("keydown", handleKeyDown);
    reducedMotionQuery.addEventListener?.("change", handleReducedMotionChange);

    controllerRef.current = {
      setFace,
      applyMode,
      applyPresentation,
      startEnter,
      beginSpatialTransition,
      setSpatialTransitionProgress,
      syncSpatialTransitionEndpoint,
      getSpatialTransitionFaceRect,
      endSpatialTransition,
      resize: resizeRenderer,
      render: renderScene,
    };
    if (apiRefRef.current) apiRefRef.current.current = controllerRef.current;

    applyMode(modeRef.current);
    resizeRenderer();
    setFace(activeIndexRef.current, false);
    applyPresentation(presentationRef.current, false);
    initialSceneReady = true;
    scheduleFirstFrameReady();

    return () => {
      disposed = true;
      if (firstFrameReadyFrameId) cancelAnimationFrame(firstFrameReadyFrameId);
      stopAnimation();
      stopPresentationAnimation();
      stopEnterAnimation();
      if (wheelUnlockTimer) window.clearTimeout(wheelUnlockTimer);
      resizeObserver.disconnect();
      reducedMotionQuery.removeEventListener?.("change", handleReducedMotionChange);
      canvas.removeEventListener("pointerdown", handlePointerDown);
      canvas.removeEventListener("pointermove", handlePointerMove);
      canvas.removeEventListener("pointerup", finishDrag);
      canvas.removeEventListener("pointercancel", finishDrag);
      canvas.removeEventListener("wheel", handleWheel);
      canvas.removeEventListener("keydown", handleKeyDown);
      videoFrameUnsubscribers.forEach((unsubscribe) => unsubscribe());
      videoTextureReleases.forEach((release) => release());

      controllerRef.current = null;
      if (apiRefRef.current) apiRefRef.current.current = null;
      for (let index = 0; index < panelGeometries.length; index += 1) {
        panelGeometries[index].dispose();
      }
      for (let index = 0; index < panelMaterials.length; index += 1) {
        panelMaterials[index].dispose();
      }
      for (let index = 0; index < textures.length; index += 1) {
        textures[index].dispose();
      }
      edgeGeometry.dispose();
      panelOutlineGeometry.dispose();
      edgeMaterial.dispose();
      boxGeometry.dispose();
      boxMaterial.dispose();
      renderer.dispose();
      scene.clear();
    };
  }, []);

  useEffect(() => {
    intendedIndexRef.current = normalizedActiveIndex;
    controllerRef.current?.setFace(normalizedActiveIndex, true);
  }, [normalizedActiveIndex]);

  useEffect(() => {
    controllerRef.current?.applyMode(mode);
  }, [mode]);

  useEffect(() => {
    controllerRef.current?.applyPresentation(presentation, true);
  }, [presentation]);

  const canvasClassName = ["project-cube__canvas", className].filter(Boolean).join(" ");
  const currentLabel = FACE_LABELS[normalizedActiveIndex];

  return (
    <div className="project-cube__surface" data-project-cube-surface>
      <canvas
        ref={canvasRef}
        className={canvasClassName}
        tabIndex={interactive ? 0 : -1}
        role={interactive ? "button" : "img"}
        aria-roledescription="可滚动切换项目的长方体"
        aria-keyshortcuts="ArrowUp ArrowDown ArrowLeft ArrowRight Enter Space"
        aria-label={
          ariaLabel ?? `${currentLabel}。滚轮或上下方向键切换，回车或空格打开当前项目。`
        }
        style={interactive ? undefined : { pointerEvents: "none" }}
      />
      {mode !== "wireframe" ? (
        <ToolsAnimatedCover ref={toolsCoverRef} mode="cube" />
      ) : null}
    </div>
  );
}

export default ProjectCube;
