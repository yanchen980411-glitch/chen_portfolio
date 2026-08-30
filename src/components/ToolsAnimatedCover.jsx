import React, { useCallback, useRef } from "react";
import {
  TOOLS_COVER_LOOP_MS,
  TOOLS_COVER_SRC,
  TOOLS_CUBE_SURFACE_HEIGHT,
  TOOLS_CUBE_SURFACE_WIDTH,
} from "./toolsCoverConfig";
import "./ToolsAnimatedCover.css";

const PATH_GROUPS = [
  {
    className: "tools-cover-path--outer",
    paths: [
      "M536 445 L962 174",
      "M962 174 L1205 328 L1206 389",
      "M536 445 L536 510 L620 563",
      "M1206 389 L1106 476 L1106 568",
    ],
  },
  {
    className: "tools-cover-path--structure",
    paths: [
      "M1106 568 L1007 520 L1007 573 L861 657",
      "M861 657 L710 722 L603 650",
      "M603 650 L603 591 L700 530 L620 480",
      "M864 237 L1060 359 L1147 306",
    ],
  },
  {
    className: "tools-cover-path--interior",
    paths: [
      "M746 314 L914 418 L1060 329",
      "M661 368 L829 474 L919 418",
      "M759 467 L925 363 L1106 476",
      "M759 467 L902 553 L1007 489",
    ],
  },
  {
    className: "tools-cover-path--detail",
    paths: [
      "M700 530 L797 592 L902 537",
      "M700 530 L621 581 L710 637 L797 592",
      "M797 592 L861 632 L1007 551",
    ],
  },
];

const DIMENSION_PATHS = [
  "M662 367 L674 386 M861 240 L873 259 M674 386 L873 259",
  "M710 637 L720 655 M861 568 L871 586 M720 655 L871 586",
  "M1007 489 L1017 507 M1106 442 L1116 460 M1017 507 L1116 460",
];

const NODE_POINTS = [
  [962, 174],
  [759, 467],
  [1106, 476],
  [861, 657],
];

export const ToolsAnimatedCover = React.forwardRef(function ToolsAnimatedCover(
  {
    mode = "hero",
    className = "",
    imageClassName = "",
    alt = "MILESEEY Tools measurement workspace poster",
  },
  forwardedRef,
) {
  const rootRef = useRef(null);
  const phaseOffsetRef = useRef(
    typeof performance === "undefined" ? 0 : -(performance.now() % TOOLS_COVER_LOOP_MS),
  );

  const setRootRef = useCallback((node) => {
    rootRef.current = node;
    if (typeof forwardedRef === "function") forwardedRef(node);
    else if (forwardedRef) forwardedRef.current = node;
  }, [forwardedRef]);

  const rootClassName = [
    "tools-animated-cover",
    `tools-animated-cover--${mode}`,
    className,
  ].filter(Boolean).join(" ");
  const imageClasses = [
    "tools-animated-cover__image",
    imageClassName,
  ].filter(Boolean).join(" ");

  return (
    <div
      ref={setRootRef}
      className={rootClassName}
      data-tools-animated-cover={mode}
      style={{
        "--tools-cover-loop": `${TOOLS_COVER_LOOP_MS}ms`,
        // A mount-time negative delay locks every instance to the same global
        // four-second phase, including a hero that is mounted later.
        "--tools-cover-phase": `${phaseOffsetRef.current}ms`,
        "--tools-cover-cube-width": `${TOOLS_CUBE_SURFACE_WIDTH}px`,
        "--tools-cover-cube-height": `${TOOLS_CUBE_SURFACE_HEIGHT}px`,
      }}
      aria-hidden={mode === "cube" ? "true" : undefined}
    >
      <img
        className={imageClasses}
        src={TOOLS_COVER_SRC}
        alt={mode === "cube" ? "" : alt}
        loading="eager"
        decoding="async"
        fetchPriority="high"
        draggable="false"
        width="1672"
        height="941"
      />

      <svg
        className="tools-cover-overlay"
        viewBox="0 0 1672 941"
        preserveAspectRatio="xMinYMid slice"
        aria-hidden="true"
        focusable="false"
      >
        <g className="tools-cover-draw-lines">
          {PATH_GROUPS.map((group) => (
            <g key={group.className} className={group.className}>
              {group.paths.map((path) => (
                <path key={path} className="tools-cover-path" d={path} pathLength="1" />
              ))}
            </g>
          ))}
        </g>

        <g className="tools-cover-dimensions">
          {DIMENSION_PATHS.map((path, index) => (
            <path
              key={path}
              className={`tools-cover-dimension tools-cover-dimension--${index + 1}`}
              d={path}
              pathLength="1"
            />
          ))}
        </g>

        <g className="tools-cover-nodes">
          {NODE_POINTS.map(([cx, cy], index) => (
            <g
              key={`${cx}-${cy}`}
              className={`tools-cover-node tools-cover-node--${index + 1}`}
              style={{ transformOrigin: `${cx}px ${cy}px` }}
            >
              <circle cx={cx} cy={cy} r="6.5" className="tools-cover-node__ring" />
              <circle cx={cx} cy={cy} r="3.1" className="tools-cover-node__point" />
            </g>
          ))}
        </g>

        <circle className="tools-cover-scan-point" cx="0" cy="0" r="3.6" />
      </svg>
    </div>
  );
});

export default ToolsAnimatedCover;
