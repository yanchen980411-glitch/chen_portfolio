import React, { useEffect, useRef } from "react";
import { motion } from "motion/react";
import { ToolsAnimatedCover } from "./ToolsAnimatedCover";
import { horizonResearchCopy } from "../content/horizonResearchCopy";
import { s50cCopy } from "../content/s50cCopy";
import { LanguageSwitcher, useLanguage } from "../i18n/LanguageContext";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  ArrowsClockwise,
  ArrowsLeftRight,
  Blueprint,
  Camera,
  CheckCircle,
  Circle,
  ClockCounterClockwise,
  DeviceMobile,
  DotsThree,
  Crosshair,
  Eye,
  FileText,
  Flag,
  FlagPennant,
  FolderOpen,
  Gear,
  Golf,
  HandTap,
  House,
  Info,
  Lightbulb,
  Lightning,
  MapPin,
  ListNumbers,
  Play,
  PlusCircle,
  Pulse,
  Quotes,
  Selection,
  Stack,
  Star,
  Trash,
  UsersThree,
  XCircle,
} from "@phosphor-icons/react";

function useProjectDialog(onClose, dialogRef, active = true) {
  useEffect(() => {
    if (!active) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialogRef.current?.focus({ preventScroll: true });

    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [active, onClose, dialogRef]);
}

function CaseStudyImage({ loading = "lazy", decoding = "async", ...props }) {
  return React.createElement("img", { loading, decoding, ...props });
}

function ProjectFullscreenCover({ project }) {
  const coverBackground = project.cover.ratio < 1 ? "#fff" : "#000";
  const coverFit = project.cover.ratio < 1 ? "contain" : "cover";
  return (
    <section
      className="horizon-fullscreen-cover project-fullscreen-cover"
      data-project-fullscreen-cover={project.id}
      aria-label={`${project.title} fullscreen cover`}
      style={{
        "--project-cover-background": coverBackground,
        "--project-cover-fit": coverFit,
      }}
    >
      <div className="project-fullscreen-cover__plane">
        {project.id === "tools" ? (
          <ToolsAnimatedCover
            mode="hero"
            imageClassName="project-fullscreen-cover__image"
            alt={project.cover.alt}
          />
        ) : (
          <CaseStudyImage
            className="project-fullscreen-cover__image"
            src={project.cover.src}
            alt={project.cover.alt}
            loading="eager"
            fetchPriority="high"
          />
        )}
      </div>
    </section>
  );
}

function useSharedProjectDetailScroll(onClose) {
  const scrollRef = useRef(null);
  const returnFromHero = React.useCallback(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
    onClose();
  }, [onClose]);

  return { scrollRef, returnFromHero };
}

function SharedProjectDetailScrollShell({
  project,
  scrollRef,
  scrollClassName = "",
  caseClassName = "",
  children,
}) {
  const scrollClasses = [
    "horizon-project-scroll",
    "project-detail-scroll-shell",
    scrollClassName,
  ].filter(Boolean).join(" ");
  const caseClasses = [
    "horizon-case-layout",
    "project-detail-case-layer",
    caseClassName,
  ].filter(Boolean).join(" ");

  return (
    <div ref={scrollRef} className={scrollClasses}>
      <ProjectFullscreenCover project={project} />
      <div className={caseClasses}>{children}</div>
    </div>
  );
}

function HorizonOverviewPage() {
  return (
    <section className="horizon-case-page horizon-cover-page" aria-labelledby="horizon-overview-title">
      <div className="horizon-cover-atmosphere" aria-hidden="true">
        <CaseStudyImage src="/assets/projects/ag1/cover-v2/golf-course.png" alt="" />
      </div>
      <div className="horizon-cover-scrim" aria-hidden="true" />

      <section className="horizon-overview-copy">
        <p className="horizon-overview-kicker">PROJECT OVERVIEW</p>
        <h2 id="horizon-overview-title">MILESEEY Horizon</h2>
        <p className="horizon-overview-tagline">GOLF, IN YOUR FIELD OF VIEW.</p>
        <span className="horizon-overview-rule" aria-hidden="true" />
        <p className="horizon-overview-description">
          Horizon explores how essential on-course information
          <br />
          can be integrated naturally into the golfer&apos;s field of view.
          <br />
          By reorganizing distances, course maps, hazards, and green
          <br />
          information, it balances visibility with minimal distraction—
          <br />
          reducing attention shifts and keeping golfers focused on the course.
        </p>
      </section>

      <div className="horizon-overview-visual" aria-hidden="true">
        <span className="horizon-cover-optical-field" />

        <figure className="horizon-cover-hud horizon-cover-hud-overview">
          <CaseStudyImage src="/assets/projects/ag1/complete-experience/course-overview.png" alt="" />
        </figure>

        <figure className="horizon-cover-hud horizon-cover-hud-list">
          <CaseStudyImage src="/assets/projects/ag1/complete-experience/course-list.png" alt="" />
        </figure>

        <figure className="horizon-cover-hud horizon-cover-hud-main">
          <CaseStudyImage src="/assets/projects/ag1/complete-experience/hole-main.png" alt="" />
        </figure>

        <figure className="horizon-cover-hud horizon-cover-hud-green">
          <CaseStudyImage src="/assets/projects/ag1/complete-experience/green-preview.png" alt="" />
        </figure>

        <figure className="horizon-cover-hud horizon-cover-hud-direction">
          <CaseStudyImage src="/assets/projects/ag1/complete-experience/direction-assist.png" alt="" />
        </figure>

        <figure className="horizon-cover-hud horizon-cover-hud-score">
          <CaseStudyImage src="/assets/projects/ag1/complete-experience/scorecard.png" alt="" />
        </figure>

        <figure className="horizon-cover-hud horizon-cover-hud-score-entry">
          <CaseStudyImage src="/assets/projects/ag1/complete-experience/score-input.png" alt="" />
        </figure>

        <figure className="horizon-cover-hud horizon-cover-hud-shot">
          <CaseStudyImage src="/assets/projects/ag1/complete-experience/shot-view.png" alt="" />
        </figure>

        <CaseStudyImage
          className="horizon-cover-product"
          src="/assets/projects/ag1/cover-v2/horizon-glasses.png"
          alt=""
        />
      </div>
    </section>
  );
}

function HorizonResearchPage() {
  const { language } = useLanguage();
  const isZh = language === "zh";
  const copy = horizonResearchCopy[language] ?? horizonResearchCopy.en;
  const researchVisuals = [
    "/assets/projects/ag1/research/research-context.png",
    "/assets/projects/ag1/research/research-prototype.png",
    "/assets/projects/ag1/research/research-feedback.png",
  ];
  const insightVisuals = [
    "/assets/projects/ag1/research/insight-target.png",
    "/assets/projects/ag1/research/insight-attention.png",
    "/assets/projects/ag1/research/insight-interaction.png",
  ];

  return (
    <section className="horizon-case-page horizon-research-page" aria-labelledby="research-title">
      <figure className="horizon-research-artwork">
        <div
          className={`horizon-research-artboard ${isZh ? "horizon-research-artboard--zh" : ""}`.trim()}
          data-i18n-skip
        >
          <div className="horizon-research-background" aria-hidden="true" />

          <header className="horizon-research-intro">
            <span className="horizon-research-section-number">{copy.section}</span>
            <h2 id="research-title">{copy.title}</h2>
            <p className="horizon-research-subtitle">{copy.subtitle}</p>
          </header>
          <p className="horizon-research-description">{copy.intro}</p>

          <section className="horizon-research-traditional" aria-labelledby="traditional-experience-title">
            <header>
              <h3 id="traditional-experience-title">{copy.traditional.title}</h3>
              <p>{copy.traditional.subtitle}</p>
            </header>
            <CaseStudyImage
              className="horizon-research-traditional-icons"
              src="/assets/projects/ag1/research/traditional-icons.png"
              alt=""
            />
            <div className="horizon-research-traditional-labels">
              {copy.traditional.steps.map((step) => <span key={step}>{step}</span>)}
            </div>
            <CaseStudyImage
              className="horizon-research-traditional-curve"
              src="/assets/projects/ag1/research/traditional-curve.png"
              alt=""
            />
            <p className="horizon-research-traditional-caption">{copy.traditional.caption}</p>
          </section>

          <CaseStudyImage
            className="horizon-research-comparison"
            src="/assets/projects/ag1/research/comparison-vs.png"
            alt="versus"
          />
          <span className="horizon-research-comparison-divider" aria-hidden="true" />

          <section className="horizon-research-opportunity" aria-labelledby="horizon-opportunity-title">
            <header>
              <h3 id="horizon-opportunity-title">{copy.opportunity.title}</h3>
              <p>{copy.opportunity.subtitle}</p>
            </header>
            <div className="horizon-research-experience-visual">
              {isZh ? (
                <CaseStudyImage
                  className="horizon-research-opportunity-course"
                  src="/assets/projects/ag1/cover-v2/golf-course.png"
                  alt=""
                />
              ) : null}
              <CaseStudyImage
                className="horizon-research-opportunity-scene"
                src="/assets/projects/ag1/research/opportunity-scene.png"
                alt="Golf course viewed through the Horizon HUD and glasses"
              />
              {isZh ? (
                <div className="horizon-research-glasses-crop">
                  <CaseStudyImage
                    className="horizon-research-glasses-front"
                    src="/assets/projects/ag1/research/horizon-glasses-front-real.png"
                    alt="MILESEEY Horizon 智能眼镜正视图"
                  />
                </div>
              ) : (
                <CaseStudyImage
                  className="horizon-research-opportunity-overflow"
                  src="/assets/projects/ag1/research/opportunity-glasses-overflow.png"
                  alt=""
                />
              )}
            </div>
            <p className="horizon-research-opportunity-caption">{copy.opportunity.caption}</p>
          </section>

          <span className="horizon-research-section-divider" aria-hidden="true" />

          <section className="horizon-research-methods" aria-labelledby="research-methods-title">
            <h3 id="research-methods-title">{copy.research.title}</h3>
            <div className="horizon-research-method-grid">
              {copy.research.items.map((item, index) => (
                <article key={item.number}>
                  <CaseStudyImage src={researchVisuals[index]} alt="" />
                  <header><span>{item.number}</span><h4>{item.title}</h4></header>
                  <p>{item.description}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="horizon-research-insights" aria-labelledby="research-insights-title">
            <h3 id="research-insights-title">{copy.insights.title}</h3>
            <ol>
              {copy.insights.items.map((item, index) => (
                <li key={item.number}>
                  <CaseStudyImage src={insightVisuals[index]} alt="" />
                  <header>{isZh ? null : <span>{item.number}</span>}<h4>{item.title}</h4></header>
                  <p>{item.description}</p>
                </li>
              ))}
            </ol>
          </section>
        </div>
      </figure>
    </section>
  );
}

const journeyStages = [
  {
    number: "01",
    title: "PREPARE",
    subtitle: "Before the hole",
    image: "/assets/projects/ag1/journey/prepare.png",
    goal: "Understand the hole before playing.",
    type: "prepare",
  },
  {
    number: "02",
    title: "TEE SHOT",
    subtitle: "First shot",
    image: "/assets/projects/ag1/journey/tee-shot.png",
    goal: "Choose the right target and club.",
    type: "tee",
  },
  {
    number: "03",
    title: "FAIRWAY",
    subtitle: "Reassess the next shot",
    image: "/assets/projects/ag1/journey/fairway.png",
    goal: "Reassess distance and the next shot.",
    type: "fairway",
  },
  {
    number: "04",
    title: "GREEN",
    subtitle: "Read the green",
    image: "/assets/projects/ag1/journey/green.png",
    goal: "Understand the green and pin location.",
    type: "green",
  },
  {
    number: "05",
    title: "MOVE ON",
    subtitle: "Finish the hole",
    image: "/assets/projects/ag1/journey/move-on.png",
    goal: "Record the result without breaking the flow.",
    type: "score",
  },
];

const journeyStagesZh = [
  {
    number: "01",
    title: "准备",
    subtitle: "开始前",
    image: "/assets/projects/ag1/journey/prepare.png",
    goal: "击球前了解本洞信息。",
    type: "prepare",
  },
  {
    number: "02",
    title: "开球",
    subtitle: "第一次击球",
    image: "/assets/projects/ag1/journey/tee-shot.png",
    goal: "选择合适的目标与球杆。",
    type: "tee",
  },
  {
    number: "03",
    title: "球道",
    subtitle: "判断下一杆",
    image: "/assets/projects/ag1/journey/fairway.png",
    goal: "判断距离与下一杆。",
    type: "fairway",
  },
  {
    number: "04",
    title: "果岭预览",
    subtitle: "查看果岭",
    image: "/assets/projects/ag1/journey/green.png",
    goal: "了解果岭与旗杆位置。",
    type: "green",
  },
  {
    number: "05",
    title: "进入下一洞",
    subtitle: "完成本洞",
    image: "/assets/projects/ag1/journey/move-on.png",
    goal: "不中断流程地记录结果。",
    type: "score",
  },
];

const journeyPainPoints = [
  {
    number: "P01",
    title: "Fragmented information",
    description:
      "Essential course information is scattered across devices and moments, forcing golfers to repeatedly switch attention to collect what they need for a shot.",
  },
  {
    number: "P02",
    title: "Context-dependent information",
    description:
      "Different stages of the hole require different information. Showing the same content at every moment creates unnecessary visual load.",
  },
  {
    number: "P03",
    title: "Interaction interrupts play",
    description:
      "Even simple input becomes disruptive when the golfer has to stop, locate controls and confirm an action.",
  },
  {
    number: "P04",
    title: "Recording breaks the flow",
    description:
      "Scoring happens between shots, when interaction should be especially fast and lightweight.",
  },
];

const journeyPainPointsZh = [
  {
    number: "P01",
    title: "信息分散",
    description: "关键信息分散在不同设备与时刻，球手必须反复切换注意力，才能收集完成一杆所需的信息。",
  },
  {
    number: "P02",
    title: "信息依赖情境",
    description: "一洞中的关键信息需要不同信息，始终呈现相同内容会造成不必要的视觉负担。",
  },
  {
    number: "P03",
    title: "交互打断比赛",
    description: "当球手必须停下来查找或操作输入时，即使步骤简单，也会打断比赛。",
  },
  {
    number: "P04",
    title: "记录打断流程",
    description: "计分发生在行动之后，因此交互尤其需要快速、轻量。",
  },
];

const journeyPageCopy = {
  en: {
    title: "MAPPING THE MOMENTS THAT MATTER",
    subtitle: "User Journey & Pain Points",
    intro:
      "We mapped a complete hole from tee to green to understand what information golfers need, when they need it, and where the current experience breaks down.",
    labels: {
      stage: "STAGE",
      goal: "USER GOAL",
      information: "INFORMATION NEED",
      demand: "INFORMATION DEMAND",
      high: "High",
      low: "Low",
      pain: "PAIN POINTS",
    },
    transition: "These pain points guided the design principles and shaped the interaction system of Horizon.",
  },
  zh: {
    title: "梳理关键时刻",
    subtitle: "用户旅程与痛点",
    intro:
      "我们梳理了从发球台到果岭的一洞体验，理解球手在何时真正需要什么信息，\n以及现有体验在哪些环节中出现痛点。",
    labels: {
      stage: "阶段",
      goal: "用户目标",
      information: "信息需求",
      demand: "信息强度",
      high: "高",
      low: "低",
      pain: "痛点",
    },
  },
};

function JourneyInformationModule({ type, isZh = false }) {
  if (type === "prepare") {
    return (
      <div className="journey-hud journey-hud-prepare">
        <div><strong>HOLE 04</strong><strong>PAR 5</strong></div>
        <CaseStudyImage src="/assets/projects/ag1/overview/course-overview.png" alt="Hole 04 course overview" />
      </div>
    );
  }

  if (type === "tee") {
    return (
      <div className="journey-hud journey-hud-tee">
        <div className="journey-hud-distances">
          <span><small>F</small><strong>484</strong></span>
          <span><small>C</small><strong>495</strong></span>
          <span><small>B</small><strong>507</strong></span>
        </div>
        <div className="journey-hud-details">
          <span><small>BUNKER</small><strong>474 / 452</strong></span>
          <span><small>WATER</small><strong>429 / 421</strong></span>
          <span><small>Dr</small><strong>230–250</strong></span>
        </div>
      </div>
    );
  }

  if (type === "fairway") {
    return (
      <div className="journey-hud journey-hud-fairway">
        <div><small>GREEN</small><strong>156 <em>YD</em></strong><small>BUNKER</small><strong>98 <em>YD</em></strong></div>
        <CaseStudyImage src="/assets/projects/ag1/overview/course-overview.png" alt="Current hole direction preview" />
      </div>
    );
  }

  if (type === "green") {
    if (isZh) {
      return (
        <div className="journey-hud journey-hud-green journey-hud-green--zh">
          <CaseStudyImage
            className="journey-green-preview-image"
            src="/assets/projects/ag1/complete-experience/green-preview.png"
            alt="果岭轮廓、旗杆位置与距离预览"
          />
        </div>
      );
    }

    return (
      <div className="journey-hud journey-hud-green">
        <small>GREEN</small>
        <div className="journey-green-preview">
          <CaseStudyImage src="/assets/projects/ag1/overview/course-overview.png" alt="Green shape and pin position" />
          <span>PIN</span>
        </div>
      </div>
    );
  }

  if (isZh) {
    return (
      <div className="journey-hud journey-hud-score journey-hud-score--zh">
        <div className="journey-score-crop">
          <CaseStudyImage
            src="/assets/projects/ag1/complete-experience/score-input.png"
            alt="Score 3、4、5 与 Putts 2 计分界面"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="journey-hud journey-hud-score">
      <span><small>SCORE</small><strong>4</strong></span>
      <span><small>PUTTS</small><strong>2</strong></span>
      <span className="journey-score-total"><small>TOTAL</small><strong>+1</strong></span>
    </div>
  );
}

function HorizonJourneyPage() {
  const { language } = useLanguage();
  const isZh = language === "zh";
  const copy = journeyPageCopy[language] ?? journeyPageCopy.en;
  const stages = isZh ? journeyStagesZh : journeyStages;
  const painPoints = isZh ? journeyPainPointsZh : journeyPainPoints;

  return (
    <section
      className={`horizon-case-page horizon-journey-page ${isZh ? "horizon-journey-page--zh" : ""}`.trim()}
      aria-labelledby="journey-title"
    >
      <div className={`journey-artboard ${isZh ? "journey-artboard--zh" : ""}`.trim()} data-i18n-skip>
        <header className="journey-header">
          <div className="journey-header-copy">
            <p className="journey-number">02</p>
            <h2 id="journey-title">{copy.title}</h2>
            <p className="journey-subtitle">{copy.subtitle}</p>
            <p className="journey-intro">{copy.intro}</p>
          </div>
          <div className="journey-top-visual" aria-hidden="true">
            <CaseStudyImage className="journey-top-map" src="/assets/projects/ag1/overview/course-overview.png" alt="" />
            <div className="journey-top-hud journey-top-hud-green"><strong>156</strong><span>YD</span><small>GREEN</small></div>
            <div className="journey-top-hud journey-top-hud-bunker"><small>BUNKER</small><strong>98</strong><span>YD</span></div>
            <span className="journey-direction-line" />
            <CaseStudyImage className="journey-top-glasses" src="/assets/projects/ag1/overview/horizon-glasses.png" alt="" />
          </div>
        </header>

        <div className="journey-grid journey-stage-headings">
          <span aria-hidden="true" />
          {stages.map((stage, index) => (
            <div className="journey-stage-heading" key={stage.number}>
              <div><span>{stage.number}</span><strong>{stage.title}</strong></div>
              <small>{stage.subtitle}</small>
              {index < journeyStages.length - 1 && <i aria-hidden="true" />}
            </div>
          ))}
        </div>

        <div className="journey-grid journey-photo-row">
          <p className="journey-row-label">{copy.labels.stage}</p>
          {stages.map((stage) => (
            <figure key={stage.number}><CaseStudyImage src={stage.image} alt={`${stage.title} golf stage`} /></figure>
          ))}
        </div>

        <div className="journey-grid journey-goal-row">
          <p className="journey-row-label">{copy.labels.goal}</p>
          {stages.map((stage) => <p key={stage.number}>{stage.goal}</p>)}
        </div>

        <div className="journey-grid journey-information-row">
          <p className="journey-row-label">{copy.labels.information}</p>
          {stages.map((stage) => <JourneyInformationModule key={stage.number} type={stage.type} isZh={isZh} />)}
        </div>

        <div className="journey-grid journey-demand-row">
          <p className="journey-row-label">{copy.labels.demand}</p>
          <div className="journey-demand-graphic">
            <span className="journey-demand-high">{copy.labels.high}</span>
            <span className="journey-demand-low">{copy.labels.low}</span>
            <CaseStudyImage src="/assets/projects/ag1/journey/demand-curve.png" alt="Information demand rises at the tee shot and gradually falls toward move on" />
          </div>
        </div>

        <div className="journey-pain-row">
          <p className="journey-row-label journey-pain-label">{copy.labels.pain}</p>
          <div className="journey-pain-list">
            {painPoints.map((pain) => (
              <article className="journey-pain" key={pain.number}>
                <div className="journey-pain-heading"><span aria-hidden="true">!</span><h3><strong>{pain.number}</strong> {pain.title}</h3></div>
                <p>{pain.description}</p>
              </article>
            ))}
          </div>
        </div>

        {!isZh ? (
          <footer className="journey-transition">
            <CaseStudyImage src="/assets/projects/ag1/journey/transition-target.png" alt="" />
            <p>{copy.transition}</p>
          </footer>
        ) : null}
      </div>
    </section>
  );
}

const architectureFunctions = [
  { title: "SHOT", description: "Club Recommendation", className: "ia-shot" },
  { title: "SCORE", description: "Score Input · Putts", className: "ia-score" },
  { title: "MENU", description: "More Information", className: "ia-menu" },
  { title: "GREEN", description: "Green Preview · Pin Position", className: "ia-green" },
];

const designPrinciplesZh = [
  {
    number: "01",
    title: "情境驱动",
    statement: "在正确的时刻呈现正确的信息",
    body: "根据球手所在的阶段和场景，动态提供最相关的内容，避免无关信息干扰。",
    type: "contextual",
    Icon: Crosshair,
  },
  {
    number: "02",
    title: "一瞥即懂",
    statement: "一瞥获取 1–2 条关键信息",
    body: "通过极简的视觉层级与清晰的信息结构，让球手无需复杂操作即可快速获取信息。",
    type: "glanceable",
    Icon: Eye,
  },
  {
    number: "03",
    title: "高效操作",
    statement: "在比赛中减少交互步骤",
    body: "结合触控、滑动和按键操作，让球手在不中断专注的情况下完成操作。",
    type: "efficient",
    Icon: HandTap,
  },
  {
    number: "04",
    title: "可预测",
    statement: "保持一致的逻辑，并提供明确反馈",
    body: "延续熟悉的交互模式与信息结构，让球手在不同功能间都能快速理解并返回。",
    type: "predictable",
    Icon: Stack,
  },
];

const principlesPageCopyZh = {
  title: "将洞察转化为系统",
  subtitle: "设计原则与信息架构",
  intro: (
    <>
      基于研究与洞察，我们提炼出核心设计原则，<br />
      并构建 Horizon 的整体体验框架与信息结构，确保信息在合适的时机、以简洁的方式出现。
    </>
  ),
  architectureTitle: "信息架构",
  architectureIntro: (
    <>
      以球洞为核心，构建清晰的信息层级，<br />
      让关键功能在三步之内即可到达。
    </>
  ),
};

const architectureTopZh = [
  { title: "历史", Icon: ClockCounterClockwise },
  { title: "开始", className: "ia-play", Icon: Play },
  { title: "设置", Icon: Gear },
];

const architectureFunctionsZh = [
  { title: "击球", description: "球杆建议", className: "ia-shot", Icon: Golf },
  { title: "记分", description: "分数输入 · 推杆", className: "ia-score", Icon: ListNumbers },
  { title: "球道", description: "距离与障碍物", className: "ia-fairway", Icon: FlagPennant },
  { title: "果岭", description: "果岭预览 · 旗杆位置", className: "ia-green", Icon: Flag },
  { title: "球洞信息", description: "标准杆 · 距离 · 地图", className: "ia-hole-info", Icon: Info },
];

function PrincipleVisual({ type }) {
  if (type === "contextual") {
    return (
      <div className="principle-visual principle-context-visual" aria-label="Tee to Fairway to Green">
        <span>Tee</span><i aria-hidden="true" /><span>Fairway</span><i aria-hidden="true" /><span>Green</span>
      </div>
    );
  }

  if (type === "glanceable") {
    return (
      <div className="principle-visual principle-distance-visual" aria-label="495 yards, driver, 12 miles per hour">
        <div><strong>495</strong><span>YD</span></div>
        <small>Dr&nbsp;&nbsp;·&nbsp;&nbsp;12 MPH</small>
      </div>
    );
  }

  if (type === "efficient") {
    return (
      <div className="principle-visual principle-efficient-visual" aria-label="Direct interaction from one point to another">
        <span aria-hidden="true" /><i aria-hidden="true" /><span aria-hidden="true" />
      </div>
    );
  }

  return (
    <div className="principle-visual principle-gesture-visual" aria-label="Click, Swipe, Double Click">
      <div><span className="gesture-icon gesture-icon-click" aria-hidden="true" /><small>Click</small></div>
      <div><span className="gesture-icon gesture-icon-swipe" aria-hidden="true" /><small>Swipe</small></div>
      <div><span className="gesture-icon gesture-icon-double" aria-hidden="true" /><small>Double Click</small></div>
    </div>
  );
}

const designPrinciples = [
  {
    number: "01",
    title: "CONTEXTUAL",
    statement: "Show the right information at the right moment.",
    body: "Different stages of play require different information, so only relevant content is surfaced.",
    type: "contextual",
  },
  {
    number: "02",
    title: "GLANCEABLE",
    statement: "Prioritize what can be understood at a glance.",
    body: "Core information is visually prioritized so golfers can read it instantly.",
    type: "glanceable",
  },
  {
    number: "03",
    title: "EFFICIENT",
    statement: "Minimize interaction during play.",
    body: "High-frequency actions are kept short so golfers can stay focused on the course.",
    type: "efficient",
  },
  {
    number: "04",
    title: "PREDICTABLE",
    statement: "Keep navigation consistent and easy to recover from.",
    body: "Consistent gestures help users act confidently and return quickly.",
    type: "predictable",
  },
];

function ArchitectureNode({ title, description, className = "", Icon }) {
  return (
    <div className={`ia-node ${className}`}>
      {Icon ? <Icon className="ia-node-icon" aria-hidden="true" weight="regular" /> : null}
      <strong>{title}</strong>
      {description && <small>{description}</small>}
    </div>
  );
}

function HorizonPrinciplesPage() {
  const { language } = useLanguage();
  const isZh = language === "zh";
  const principles = isZh ? designPrinciplesZh : designPrinciples;
  const functions = isZh ? architectureFunctionsZh : architectureFunctions;

  return (
    <section className="horizon-case-page horizon-principles-page" aria-labelledby="principles-title">
      <div className={`principles-artboard ${isZh ? "principles-artboard--zh" : ""}`.trim()} data-i18n-skip>
        <header className="principles-header">
          <p className="principles-number">03</p>
          <h2 id="principles-title">{isZh ? principlesPageCopyZh.title : "TURNING INSIGHTS INTO A SYSTEM"}</h2>
          <p className="principles-subtitle">
            {isZh ? principlesPageCopyZh.subtitle : <>Design Principles &amp; Information Architecture</>}
          </p>
          <p className="principles-intro">
            {isZh ? principlesPageCopyZh.intro : (
              <>Based on research findings, we defined four principles that shaped Horizon’s experience and overall
                information structure.</>
            )}
          </p>
          {isZh ? (
            <div className="principles-header-product" aria-hidden="true">
              <CaseStudyImage className="principles-header-trajectory" src="/assets/projects/ag1/journey/demand-curve.png" alt="" />
              <CaseStudyImage className="principles-header-glasses" src="/assets/projects/ag1/overview/horizon-glasses.png" alt="" />
            </div>
          ) : null}
        </header>

        <div className={`principles-grid ${isZh ? "principles-grid--zh" : ""}`.trim()}>
          {isZh ? <p className="principles-section-label">设计原则</p> : null}
          {principles.map((principle) => (
            <article className="design-principle" key={principle.number}>
              {!isZh ? <PrincipleVisual type={principle.type} /> : null}
              <div className="principle-heading">
                <span>{principle.number}</span>
                <h3>{principle.title}</h3>
                {isZh && principle.Icon ? <principle.Icon className="principle-heading-icon" aria-hidden="true" weight="regular" /> : null}
              </div>
              <div className="principle-keyline">
                {isZh && principle.type === "glanceable" ? (
                  <div className="principle-distance-zh"><strong>495</strong><span>YD</span></div>
                ) : null}
                <p className="principle-statement">{principle.statement}</p>
              </div>
              <p className="principle-body">{principle.body}</p>
            </article>
          ))}
        </div>

        <div className="principles-divider" aria-hidden="true" />

        <section className="architecture-section" aria-labelledby="architecture-title">
          <div className="architecture-intro">
            <h3 id="architecture-title">{isZh ? principlesPageCopyZh.architectureTitle : "INFORMATION ARCHITECTURE"}</h3>
            <p>
              {isZh ? principlesPageCopyZh.architectureIntro : (
                <>A hub-centered structure keeps the core experience shallow and places key information within one step
                  of the main screen.</>
              )}
            </p>
          </div>

          <div className={`ia-diagram ${isZh ? "ia-diagram--zh" : ""}`.trim()} aria-label={isZh ? "Horizon 信息架构" : "Horizon information architecture"}>
            <div className="ia-top-row">
              {isZh ? architectureTopZh.map((item) => <ArchitectureNode key={item.title} {...item} />) : (
                <>
                  <ArchitectureNode title="HISTORY" />
                  <ArchitectureNode title="PLAY" className="ia-play" />
                  <ArchitectureNode title="SETTINGS" />
                </>
              )}
            </div>

            <ArchitectureNode title={isZh ? "球场选择" : "COURSE SELECTION"} className="ia-course-selection" Icon={isZh ? Flag : undefined} />

            <div className="ia-node ia-hole-main">
              <strong>{isZh ? "球洞主页" : "HOLE MAIN"}</strong>
              <small>
                {isZh ? "前 / 中 / 后距离 · 地图 · 球杆建议 · 球洞信息" : (
                  <>F / C / B Distance&nbsp;&nbsp;·&nbsp;&nbsp;Hazards&nbsp;&nbsp;·&nbsp;&nbsp;Club&nbsp;&nbsp;·&nbsp;&nbsp;Hole Info</>
                )}
              </small>
            </div>

            <div className={`ia-functions ${isZh ? "ia-functions--zh" : ""}`.trim()}>
              {functions.map((item) => (
                <ArchitectureNode key={item.title} {...item} />
              ))}
            </div>

            <div className={`ia-secondary-row ${isZh ? "ia-secondary-row--zh" : ""}`.trim()}>
              <ArchitectureNode title={isZh ? "记分卡" : "SCORECARD"} description={isZh ? "查看完整记分卡" : "View full scorecard"} Icon={isZh ? FileText : undefined} />
              <ArchitectureNode title={isZh ? "团队记分卡" : "TEAM SCORECARD"} description={isZh ? "查看团队成绩" : "View team scores"} Icon={isZh ? UsersThree : undefined} />
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}

const coreRoundNodes = [
  { title: "HOME", icon: "⌂", className: "user-flow-node-small" },
  { title: "PLAY", icon: "▷", className: "user-flow-node-small" },
  { title: "COURSE\nSELECTION", icon: "⚑", className: "user-flow-node-course" },
  { title: "HOLE MAIN", icon: "◎", className: "user-flow-node-main", main: true },
  { title: "PLAY\nTHE HOLE", icon: "⚑", className: "user-flow-node-small" },
  { title: "NEXT HOLE", icon: "⚐", className: "user-flow-node-small" },
  { title: "ROUND\nCOMPLETE", icon: "✓", className: "user-flow-node-complete" },
];

const holeMainFunctions = [
  { title: "SHOT", icon: "／", description: "Club\nRecommendation" },
  { title: "SCORE", icon: "✎", description: "Score Input\n& Putts" },
  { title: "MENU", icon: "•••", description: "More\nInformation" },
  { title: "GREEN", icon: "⌁", description: "Green Preview\n& Pin Position" },
];

function UserFlowNode({ node }) {
  return (
    <div className={`user-flow-node ${node.className}`}>
      <span className="user-flow-node-icon" aria-hidden="true">{node.icon}</span>
      <strong>{node.title.split("\n").map((line) => <span key={line}>{line}</span>)}</strong>
      {node.main && (
        <small>
          <span>F / C / B Distance&nbsp;&nbsp;·&nbsp;&nbsp;Hazards</span>
          <span>Club&nbsp;&nbsp;·&nbsp;&nbsp;Hole Info</span>
        </small>
      )}
    </div>
  );
}

function GestureMark({ type, label, description }) {
  return (
    <div className={`flow-gesture flow-gesture-${type.toLowerCase().replaceAll(" ", "-")}`}>
      <span className="flow-gesture-icon" aria-hidden="true" />
      <strong>{label || type}</strong>
      {description && <small>{description}</small>}
    </div>
  );
}

function GreenShape({ pin = false }) {
  return (
    <div className="hud-green-shape" aria-hidden="true">
      <i /><i /><i /><i />
      {pin && <span className="hud-green-pin">⚑</span>}
    </div>
  );
}

function PinGrid({ confirmed = false }) {
  return (
    <div className="hud-pin-grid" aria-label="3 by 3 pin position grid">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((cell) => (
        <span className={cell === 5 ? "is-selected" : ""} key={cell}>{confirmed && cell === 5 ? "⚑" : cell}</span>
      ))}
    </div>
  );
}

function FlowHudMockup({ type, compact = false }) {
  if (type === "hole") {
    return (
      <div className={`flow-hud-mockup flow-hud-hole ${compact ? "is-compact" : ""}`}>
        <div className="hud-topline"><span>H04</span><span>PAR 5</span><i /></div>
        <strong className="hud-distance">495<small>YD</small></strong>
        <div className="hud-fcb"><span>F 523</span><span>C 495</span><span>B 468</span></div>
        <CaseStudyImage src="/assets/projects/ag1/overview/course-overview.png" alt="Hole 04 course overview" />
        <small className="hud-club">7 IRON</small>
      </div>
    );
  }

  if (type === "score" || type === "putts") {
    const isScore = type === "score";
    return (
      <div className="flow-hud-mockup flow-hud-counter">
        <div className="hud-topline"><span>{isScore ? "SCORE" : "PUTTS"}</span><i /></div>
        <div className="hud-counter-value"><button type="button" aria-label="decrease">−</button><strong>{isScore ? "+1" : "2"}</strong><button type="button" aria-label="increase">＋</button></div>
        <small>Hole 04&nbsp;&nbsp;&nbsp;Par 5</small>
      </div>
    );
  }

  if (type === "confirm") {
    return (
      <div className="flow-hud-mockup flow-hud-confirm">
        <div className="hud-topline"><span>SCORE</span><i /></div>
        <strong>+1</strong>
        <small>Putts&nbsp;&nbsp;&nbsp;2</small>
        <span className="hud-confirm-mark">✓</span>
      </div>
    );
  }

  if (type === "green" || type === "pin") {
    return (
      <div className="flow-hud-mockup flow-hud-green">
        <div className="hud-topline"><span>Green</span><span>⚑</span><i /></div>
        <div className="hud-green-labels"><span>Front</span><span>Back</span></div>
        <GreenShape pin={type === "pin"} />
      </div>
    );
  }

  if (type === "grid" || type === "grid-confirm") {
    const confirmed = type === "grid-confirm";
    return (
      <div className="flow-hud-mockup flow-hud-grid">
        <div className="hud-grid-title">Pin Position</div>
        <PinGrid confirmed={confirmed} />
        {confirmed && <span className="hud-confirm-mark">✓</span>}
      </div>
    );
  }

  if (type === "menu") {
    return (
      <div className="flow-hud-mockup flow-hud-menu">
        <div className="hud-topline"><span>MENU</span><i /></div>
        <div className="hud-menu-items">
          <span><b>▣</b><small>Scorecard</small></span>
          <span><b>♙</b><small>Team<br />Scorecard</small></span>
          <span><b>⚙</b><small>Settings</small></span>
          <span><b>•••</b><small>More</small></span>
        </div>
      </div>
    );
  }

  if (type === "scorecard") {
    return (
      <div className="flow-hud-mockup flow-hud-table">
        <div className="hud-topline"><span>SCORECARD</span><i /></div>
        <div className="hud-score-grid hud-score-grid-head"><span>Hole</span><span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>…</span><span>Total</span></div>
        <div className="hud-score-grid"><span>Par</span><span>4</span><span>3</span><span>4</span><span>5</span><span>4</span><span>…</span><span>36</span></div>
        <div className="hud-score-grid"><span>Score</span><span>4</span><span>3</span><span>5</span><span>4</span><span>…</span><span>…</span><span>+1</span></div>
      </div>
    );
  }

  return (
    <div className="flow-hud-mockup flow-hud-table flow-hud-team">
      <div className="hud-topline"><span>TEAM SCORECARD</span><i /></div>
      <div className="hud-team-row hud-team-head"><span>Pos</span><span>Player</span><span>To Par</span><span>Total</span></div>
      <div className="hud-team-row"><span>1</span><span>Player A</span><span>-2</span><span>10</span></div>
      <div className="hud-team-row is-you"><span>2</span><span>You</span><span>+1</span><span>13</span></div>
      <div className="hud-team-row"><span>3</span><span>Player B</span><span>+3</span><span>14</span></div>
    </div>
  );
}

const scoringSteps = [
  { number: "1", title: "HOLE MAIN", type: "hole", gesture: "CLICK" },
  { number: "2", title: "SCORE", type: "score", gesture: "CLICK" },
  { number: "3", title: "PUTTS", type: "putts", gesture: "CLICK" },
  { number: "4", title: "CONFIRM / NEXT HOLE", type: "confirm", gesture: "DOUBLE CLICK" },
];

const greenSteps = [
  { number: "1", title: "GREEN PREVIEW", type: "green", gesture: "CLICK" },
  { number: "2", title: "PIN POSITION", type: "pin", gesture: "SWIPE" },
  { number: "3", title: "9-GRID SELECTION", type: "grid", gesture: "SWIPE" },
  { number: "4", title: "CONFIRM", type: "grid-confirm", gesture: "CLICK" },
];

function UserTaskFlow({ kind, number, title, goal, steps }) {
  return (
    <section className={`user-task-flow user-task-flow-${kind}`} aria-labelledby={`user-flow-${kind}-title`}>
      <header>
        <div><span>{number}</span><h3 id={`user-flow-${kind}-title`}>{title}</h3></div>
        <p><strong>User Goal:</strong> {goal}</p>
      </header>
      <div className="user-task-steps">
        {steps.map((step, index) => (
          <article className="user-task-step" key={step.title}>
            <div className="user-step-title"><span>{step.number}</span><strong>{step.title}</strong></div>
            <FlowHudMockup type={step.type} />
            <GestureMark type={step.gesture} />
            {kind === "green" && index === 1 && <small className="user-step-note">Switch Green<br />(if double green)</small>}
            {kind === "green" && index === 2 && <small className="user-step-note">Move Selection</small>}
            {kind === "green" && index === 3 && <small className="user-step-note">Confirm</small>}
          </article>
        ))}
      </div>
      {kind === "scoring" ? (
        <div className="task-flow-footer task-flow-footer-scoring">
          <GestureMark type="SWIPE" label="← SWIPE →" description="Switch Hole (Previous / Next)" />
          <GestureMark type="DOUBLE CLICK" description="Return to Hole Main or Next Hole" />
        </div>
      ) : (
        <div className="task-flow-footer task-flow-footer-green">
          <GestureMark type="DOUBLE CLICK" description="Back to Green / Hole Main" />
        </div>
      )}
    </section>
  );
}

const coreRoundNodesZh = [
  { title: "首页", Icon: House, className: "user-flow-node-small" },
  { title: "开始", Icon: Play, className: "user-flow-node-small" },
  { title: "球场\n选择", Icon: Flag, className: "user-flow-node-course" },
  { title: "球洞主页", Icon: Crosshair, className: "user-flow-node-main", main: true },
  { title: "开始\n当前球洞", Icon: FlagPennant, className: "user-flow-node-small" },
  { title: "下一洞", Icon: Flag, className: "user-flow-node-small" },
  { title: "回合\n完成", Icon: CheckCircle, className: "user-flow-node-complete" },
];

const holeMainFunctionsZh = [
  { title: "击球", Icon: Golf, description: "球杆建议" },
  { title: "记分", Icon: ListNumbers, description: "分数输入 · 计杆" },
  { title: "菜单", Icon: DotsThree, description: "更多信息" },
  { title: "风向", Icon: ArrowsClockwise, description: "果岭预览 · 旗杆位置" },
];

const scoringStepsZh = [
  { number: "1", title: "查看本洞信息", type: "hole", gesture: "CLICK" },
  { number: "2", title: "记录杆数", type: "score", gesture: "CLICK" },
  { number: "3", title: "记录推杆数", type: "putts", gesture: "CLICK" },
  { number: "4", title: "确认并继续", type: "confirm", gesture: "DOUBLE CLICK" },
];

const greenStepsZh = [
  { number: "1", title: "观察果岭", type: "green-overview", gesture: "CLICK" },
  { number: "2", title: "选择旗杆位置", type: "green-position", gesture: "SWIPE", note: "移动位置" },
  { number: "3", title: "微调旗杆位置", type: "grid", gesture: "CLICK" },
  { number: "4", title: "确认", type: "grid-confirm", gesture: "CLICK" },
];

function UserFlowNodeZh({ node }) {
  const Icon = node.Icon;

  return (
    <div className={`user-flow-node ${node.className}`}>
      <Icon className="user-flow-node-icon" aria-hidden="true" weight="regular" />
      <strong>{node.title.split("\n").map((line) => <span key={line}>{line}</span>)}</strong>
      {node.main ? (
        <small>
          <span>前 / 中 / 后距离 · 地图</span>
          <span>球杆建议 · 记分预览</span>
        </small>
      ) : null}
    </div>
  );
}

function FlowHudMockupZh({ type }) {
  if (type === "hole") {
    return (
      <div className="flow-hud-mockup flow-hud-mockup--zh flow-hud-hole">
        <div className="hud-topline"><span>HOLE 04</span><span>PAR 5</span></div>
        <strong className="hud-distance">495<small>YD</small></strong>
        <div className="hud-fcb"><span>F 523</span><span>C 495</span><span>B 468</span></div>
        <CaseStudyImage src="/assets/projects/ag1/overview/course-overview.png" alt="Hole 04 course overview" />
      </div>
    );
  }

  if (type === "score" || type === "putts") {
    const isScore = type === "score";
    return (
      <div className="flow-hud-mockup flow-hud-mockup--zh flow-hud-counter">
        <div className="hud-topline"><span>{isScore ? "SCORE" : "PUTTS"}</span></div>
        <div className="hud-counter-value">
          <button type="button" aria-label="减少">−</button>
          <strong>{isScore ? "+1" : "2"}</strong>
          <button type="button" aria-label="增加">＋</button>
        </div>
        <small>Hole 04&nbsp;&nbsp;&nbsp;Par 5</small>
      </div>
    );
  }

  if (type === "confirm") {
    return (
      <div className="flow-hud-mockup flow-hud-mockup--zh flow-hud-confirm">
        <div className="hud-topline"><span>SCORE</span></div>
        <strong>+1</strong>
        <small>Putts&nbsp;&nbsp;&nbsp;2</small>
        <CheckCircle className="hud-confirm-svg" aria-hidden="true" weight="regular" />
      </div>
    );
  }

  if (type === "green-overview" || type === "green-position") {
    return (
      <div className={`flow-hud-mockup flow-hud-mockup--zh flow-hud-green-simple ${type === "green-position" ? "is-position" : ""}`}>
        <div className="hud-topline"><span>Green</span><span>Back</span></div>
        {type === "green-overview" ? <span className="hud-green-front">Front</span> : null}
        {type === "green-overview" ? (
          <FlagPennant className="hud-green-flag-svg" aria-hidden="true" weight="fill" />
        ) : (
          <Crosshair className="hud-green-position-svg" aria-hidden="true" weight="regular" />
        )}
      </div>
    );
  }

  if (type === "grid" || type === "grid-confirm") {
    return (
      <div className="flow-hud-mockup flow-hud-mockup--zh flow-hud-grid">
        <div className="hud-grid-title">Pin Position</div>
        <PinGrid />
      </div>
    );
  }

  if (type === "menu") {
    const items = [
      { Icon: ListNumbers, label: "记分卡" },
      { Icon: UsersThree, label: "团队成绩" },
      { Icon: Gear, label: "设置" },
      { Icon: DotsThree, label: "更多" },
    ];

    return (
      <div className="flow-hud-mockup flow-hud-mockup--zh flow-hud-menu">
        <div className="hud-topline"><span>MENU</span></div>
        <div className="hud-menu-items">
          {items.map(({ Icon, label }) => (
            <span key={label}><Icon aria-hidden="true" weight="regular" /><small>{label}</small></span>
          ))}
        </div>
      </div>
    );
  }

  if (type === "scorecard") {
    return (
      <div className="flow-hud-mockup flow-hud-mockup--zh flow-hud-table">
        <div className="hud-topline"><span>SCORECARD</span></div>
        <div className="hud-score-grid hud-score-grid-head"><span>Hole</span><span>1</span><span>2</span><span>3</span><span>5</span><span>…</span><span>Total</span></div>
        <div className="hud-score-grid"><span>Par</span><span>4</span><span>3</span><span>4</span><span>5</span><span>…</span><span>36</span></div>
        <div className="hud-score-grid"><span>Score</span><span>4</span><span>3</span><span>5</span><span>4</span><span>…</span><span>37</span></div>
      </div>
    );
  }

  if (type === "team") {
    return (
      <div className="flow-hud-mockup flow-hud-mockup--zh flow-hud-table flow-hud-team">
        <div className="hud-topline"><span>TEAM SCORECARD</span></div>
        <div className="hud-team-row hud-team-head"><span>Pos</span><span>球队</span><span>本洞</span><span>总分</span></div>
        <div className="hud-team-row"><span>1</span><span>球队 A</span><span>-1</span><span>10</span></div>
        <div className="hud-team-row"><span>2</span><span>球队 B</span><span>+3</span><span>14</span></div>
        <div className="hud-team-row"><span>3</span><span>球队 C</span><span>+5</span><span>18</span></div>
      </div>
    );
  }

  return (
    <div className="flow-hud-mockup flow-hud-mockup--zh flow-hud-return">
      <ArrowLeft aria-hidden="true" weight="regular" />
      <span>返回</span>
    </div>
  );
}

function GestureMarkZh({ type, description }) {
  const labels = { CLICK: "点击", SWIPE: "滑动", "DOUBLE CLICK": "双击" };
  return <GestureMark type={type} label={labels[type]} description={description} />;
}

function UserTaskFlowZh({ kind, number, title, goal, steps }) {
  return (
    <section className={`user-task-flow user-task-flow-${kind}`} aria-labelledby={`user-flow-${kind}-title-zh`}>
      <header>
        <div><span>{number}</span><h3 id={`user-flow-${kind}-title-zh`}>{title}</h3></div>
        <p><strong>用户目标：</strong>{goal}</p>
      </header>
      <div className="user-task-steps">
        {steps.map((step) => (
          <article className="user-task-step" key={step.title}>
            <div className="user-step-title"><span>{step.number}</span><strong>{step.title}</strong></div>
            <FlowHudMockupZh type={step.type} />
            <GestureMarkZh type={step.gesture} />
            {step.note ? <small className="user-step-note">{step.note}</small> : null}
          </article>
        ))}
      </div>
      {kind === "scoring" ? (
        <div className="task-flow-footer task-flow-footer-scoring">
          <GestureMark type="SWIPE" label="← 滑动 →" description="切换球洞（上一个 / 下一个）" />
          <GestureMark type="DOUBLE CLICK" label="双击" description="返回主页或开始下一洞" />
        </div>
      ) : (
        <div className="task-flow-footer task-flow-footer-green">
          <GestureMark type="DOUBLE CLICK" label="双击" description="返回上一步或离开果岭" />
        </div>
      )}
    </section>
  );
}

function HorizonUserFlowPageZh() {
  const secondarySteps = [
    { number: "1", title: "打开菜单", type: "menu" },
    { number: "2", title: "查看记分卡", type: "scorecard" },
    { number: "3", title: "查看团队成绩", type: "team" },
    { number: "4", title: "返回继续比赛", type: "return" },
  ];

  return (
    <section className="horizon-case-page horizon-user-flow-page horizon-user-flow-page--zh" aria-labelledby="user-flow-title-zh">
      <div className="user-flow-artboard user-flow-artboard--zh" data-i18n-skip>
        <section className="user-flow-top">
          <header className="user-flow-header">
            <p>04</p>
            <h2 id="user-flow-title-zh">从开始到每一次击球</h2>
            <h3>用户流程</h3>
            <p>梳理球手完成一轮比赛的核心路径，<br />并将高频操作集中在<br />“球洞主页”附近。</p>
          </header>

          <aside className="user-flow-legend" aria-label="点击、滑动与双击说明">
            <GestureMarkZh type="CLICK" description="选择 / 确认" />
            <GestureMarkZh type="SWIPE" description="浏览 / 切换" />
            <GestureMarkZh type="DOUBLE CLICK" description="返回 / 退出" />
          </aside>

          <div className="core-flow-label"><span /><strong>核心比赛流程</strong><span /></div>
          <div className="core-round-flow">
            {coreRoundNodesZh.map((node, index) => (
              <div className={`core-round-item ${node.main ? "is-main" : ""}`} key={node.title}>
                <UserFlowNodeZh node={node} />
                {index < coreRoundNodesZh.length - 1 ? <i className="core-flow-arrow" aria-hidden="true" /> : null}
              </div>
            ))}
          </div>

          <div className="hole-main-functions">
            {holeMainFunctionsZh.map(({ title, Icon, description }) => (
              <div key={title}>
                <Icon aria-hidden="true" weight="regular" />
                <strong>{title}</strong>
                <small>{description}</small>
              </div>
            ))}
          </div>
          <span className="core-functions-connector" aria-hidden="true" />
          <span className="core-round-loop" aria-hidden="true" />
        </section>

        <div className="user-task-flows">
          <UserTaskFlowZh
            kind="scoring"
            number="01"
            title="计分流程"
            goal="不中断比赛地记录本洞成绩。"
            steps={scoringStepsZh}
          />
          <UserTaskFlowZh
            kind="green"
            number="02"
            title="果岭流程"
            goal="了解果岭并设置当前旗杆位置。"
            steps={greenStepsZh}
          />
        </div>

        <section className="secondary-flow secondary-flow--zh" aria-labelledby="secondary-flow-title-zh">
          <header>
            <div><span>03</span><h3 id="secondary-flow-title-zh">更多信息流程</h3></div>
            <p><strong>用户目标：</strong>从菜单快速获取所需信息。</p>
          </header>
          <div className="secondary-flow-track">
            {secondarySteps.map((step, index) => (
              <article className="secondary-flow-step" key={step.title}>
                <div className="user-step-title"><span>{step.number}</span><strong>{step.title}</strong></div>
                <FlowHudMockupZh type={step.type} />
                {index < secondarySteps.length - 1 ? <i className="secondary-flow-arrow" aria-hidden="true" /> : null}
              </article>
            ))}
          </div>
          <p className="secondary-flow-note">信息被组织为一个清晰的流程，<br />从一次操作到下一次操作，<br />帮助球手在最少的交互中<br />获取所需信息。</p>
        </section>
      </div>
    </section>
  );
}

function HorizonUserFlowPage() {
  const { language } = useLanguage();

  if (language === "zh") return <HorizonUserFlowPageZh />;

  return (
    <section className="horizon-case-page horizon-user-flow-page" aria-labelledby="user-flow-title">
      <div className="user-flow-artboard">
        <section className="user-flow-top">
          <header className="user-flow-header">
            <p>04</p>
            <h2 id="user-flow-title">FROM START TO EVERY SHOT</h2>
            <h3>User Flow</h3>
            <p>Mapping the core paths golfers take<br />through a round, with high-frequency<br />actions kept close to the Hole Main.</p>
          </header>

          <aside className="user-flow-legend" aria-label="Gesture legend">
            <GestureMark type="CLICK" description="Select / Confirm" />
            <GestureMark type="SWIPE" description="Browse / Switch" />
            <GestureMark type="DOUBLE CLICK" description="Back / Exit" />
          </aside>

          <div className="core-flow-label"><span /><strong>CORE ROUND FLOW</strong><span /></div>
          <div className="core-round-flow">
            {coreRoundNodes.map((node, index) => (
              <div className={`core-round-item ${node.main ? "is-main" : ""}`} key={node.title}>
                <UserFlowNode node={node} />
                {index < coreRoundNodes.length - 1 && <i className="core-flow-arrow" aria-hidden="true" />}
              </div>
            ))}
          </div>

          <div className="hole-main-functions">
            {holeMainFunctions.map((item) => (
              <div key={item.title}>
                <span aria-hidden="true">{item.icon}</span>
                <strong>{item.title}</strong>
                <small>{item.description.split("\n").map((line) => <span key={line}>{line}</span>)}</small>
              </div>
            ))}
          </div>
          <span className="core-functions-connector" aria-hidden="true" />
          <span className="core-round-loop" aria-hidden="true" />
        </section>

        <div className="user-task-flows">
          <UserTaskFlow
            kind="scoring"
            number="01"
            title="SCORING FLOW"
            goal="Record the hole without interrupting play."
            steps={scoringSteps}
          />
          <UserTaskFlow
            kind="green"
            number="02"
            title="GREEN FLOW"
            goal="Understand the green and set the current pin position."
            steps={greenSteps}
          />
        </div>

        <section className="secondary-flow" aria-labelledby="secondary-flow-title">
          <header>
            <div><span>03</span><h3 id="secondary-flow-title">SECONDARY FLOW</h3></div>
            <p>Accessed from Menu for<br />additional information.</p>
          </header>
          <div className="secondary-flow-track">
            <FlowHudMockup type="hole" compact />
            <GestureMark type="CLICK" />
            <FlowHudMockup type="menu" />
            <i className="secondary-flow-arrow" aria-hidden="true" />
            <FlowHudMockup type="scorecard" />
            <FlowHudMockup type="team" />
          </div>
          <p className="secondary-flow-note">Information is organized<br />one step away from<br />Hole Main to minimize<br />interaction depth.</p>
        </section>
      </div>
    </section>
  );
}

const fovConstraints = [
  { icon: "viewport", title: "LIMITED VIEWPORT", copy: "Small circular view demands compact, edge-aligned information." },
  { icon: "mono", title: "MONOCHROME DISPLAY", copy: "Single-color (green UI) reduces complexity and maximizes legibility." },
  { icon: "world", title: "REAL-WORLD FIRST", copy: "HUD supports awareness without blocking the real-world course." },
  { icon: "glance", title: "GLANCE-BASED READING", copy: "Information is scannable in <1 second with clear visual hierarchy." },
];

const hudLayers = [
  { letter: "A", title: "PRIMARY INFORMATION", copy: "Largest, top-center distances (F/C/B) drive the primary decision." },
  { letter: "B", title: "CONTEXTUAL INFORMATION", copy: "Hazards (Bunker/Water) and club recommendation provide tactical context." },
  { letter: "C", title: "STATUS INFORMATION", copy: "Round context (top-left), hole status (right), and battery keep you oriented." },
  { letter: "D", title: "ACTION LAYER", copy: "Core actions placed bottom-center for quick, consistent access." },
];

const visualHierarchy = [
  { number: "01", title: "PRIMARY", lines: ["495Y (Center)", "F, C, B distance", "Largest, highest contrast."] },
  { number: "02", title: "CONTEXTUAL", lines: ["Bunker / Water distances", "Club recommendation", "Secondary, but critical."] },
  { number: "03", title: "STATUS", lines: ["Hole & Round (top-left)", "Hole # / Par / Score (right)", "Battery (top-right)", "Keeps you oriented."] },
  { number: "04", title: "ACTION", lines: ["Shot / Score / Menu / Green", "Consistent, quick access", "at the bottom."] },
];

const placementRationale = [
  { icon: "clock", eyebrow: "TOP LEFT", title: "Round Context", copy: "Hole time and round time are checked often but not urgent. Placed where the eye starts." },
  { icon: "target", eyebrow: "TOP CENTER", title: "Primary Distance", copy: "Most important decision point—placed at the highest priority and center of top band." },
  { icon: "water", eyebrow: "SIDES (LEFT / RIGHT)", title: "Hazard Awareness", copy: "Hazard distances flank the map for quick comparison without entering the central view." },
  { icon: "club", eyebrow: "BOTTOM LEFT", title: "Club Recommendation", copy: "Quick reference near the current shot; close to the likely hand position." },
  { icon: "actions", eyebrow: "BOTTOM CENTER", title: "Action Layer", copy: "Core actions grouped at the bottom for stable, muscle-memory access." },
  { icon: "flag", eyebrow: "RIGHT SIDE", title: "Hole/Score Status", copy: "Hole number, par, and score live on the right—easy to find without searching." },
];

function FovIcon({ type }) {
  return <span className={`fov-line-icon fov-line-icon-${type}`} aria-hidden="true"><i /><b /></span>;
}

function HudAction({ icon, label }) {
  return (
    <span className="fov-hud-action">
      <i aria-hidden="true">{icon}</i>
      <strong>{label}</strong>
    </span>
  );
}

const fovConstraintsZh = [
  { icon: "viewport", title: "有限视野", copy: "狭小的视野需要浓缩信息\n并保持视觉对齐。" },
  { icon: "mono", title: "单色显示", copy: "单色绿色界面降低复杂度，\n并最大化可读性。" },
  { icon: "world", title: "真实世界优先", copy: "HUD 在不遮挡真实球场的前提下\n提供关键信息。" },
  { icon: "glance", title: "扫视式阅读", copy: "清晰的视觉层级让信息可在 1 秒内完成读取。" },
];

const hudLayersZh = [
  { letter: "A", title: "主要信息", copy: "顶部中央的关键距离信息（F / C / B）\n支持主要决策。" },
  { letter: "B", title: "情境信息", copy: "障碍物（沙坑 / 水域）与球杆建议\n提供决策背景。" },
  { letter: "C", title: "状态信息", copy: "左上角轮次信息、右侧球洞状态与\n电量，帮助用户保持方向感。" },
  { letter: "D", title: "操作层", copy: "核心操作位于底部中央，\n便于快速且一致地访问。" },
];

const visualHierarchyZh = [
  { number: "01", title: "主要", lines: ["495 码（中心）", "前、中、后距离", "字号最大，对比最强。"] },
  { number: "02", title: "情境", lines: ["沙坑 / 水域等距离", "球杆推荐", "次要但关键。"] },
  { number: "03", title: "状态", lines: ["球洞与回合（左上）", "球洞编号 / 标准杆 / 分数（右侧）", "电量（右上）", "帮助保持方向感。"] },
  { number: "04", title: "操作", lines: ["击球 / 记分 / 菜单 / 果岭", "一致、快速访问", "置于底部中央。"] },
];

const placementRationaleZh = [
  { icon: "clock", eyebrow: "左上：轮次信息", copy: "该信息用于比赛节奏的掌控，\n但并不紧急，因此放在视觉起点。" },
  { icon: "target", eyebrow: "顶部中央：主要距离", copy: "最重要的决策信息放在\n最高优先级，并位于视野中央。" },
  { icon: "water", eyebrow: "两侧：障碍物", copy: "障碍物距离分布在地图两侧，\n便于快速比较，同时不占据中央视野。" },
  { icon: "club", eyebrow: "左下：球杆建议", copy: "当前球杆信息可被迅速查看，\n并靠近可能的手部操作位置。" },
  { icon: "actions", eyebrow: "底部中央：操作层", copy: "核心操作集中在底部，\n形成稳定且符合肌肉记忆的访问方式。" },
  { icon: "flag", eyebrow: "右侧：球洞状态", copy: "球洞编号、标准杆与成绩\n位于右侧，无需寻找即可快速定位。" },
];

function HorizonFovHudPageZh() {
  return (
    <section className="horizon-case-page horizon-fov-hud-page horizon-fov-hud-page--zh" aria-labelledby="fov-hud-title-zh">
      <div className="fov-hud-artboard fov-hud-artboard--zh" data-i18n-skip>
        <header className="fov-hud-header">
          <div className="fov-hud-heading">
            <p className="fov-hud-number">05</p>
            <div>
              <h2 id="fov-hud-title-zh">为有限视野而设计</h2>
              <h3>视野与 HUD 布局</h3>
            </div>
          </div>
          <p className="fov-hud-intro">
            Horizon HUD 面向狭窄的单目视野设计，信息经过优先级排序与分组，<br />
            并放置在可快速读取且不遮挡球场的位置。
          </p>
        </header>

        <div className="fov-constraints" aria-label="视野设计约束">
          {fovConstraintsZh.map((item) => (
            <article key={item.title}>
              <FovIcon type={item.icon} />
              <div><h3>{item.title}</h3><p>{item.copy.split("\n").map((line) => <span key={line}>{line}</span>)}</p></div>
            </article>
          ))}
        </div>

        <section className="fov-hud-main">
          <aside className="fov-hud-layers" aria-labelledby="hud-layers-title-zh">
            <h3 id="hud-layers-title-zh">HUD 信息层级</h3>
            <div>
              {hudLayersZh.map((item) => (
                <article key={item.letter}>
                  <span>{item.letter}</span>
                  <div><h4>{item.title}</h4><p>{item.copy.split("\n").map((line) => <span key={line}>{line}</span>)}</p></div>
                </article>
              ))}
            </div>
          </aside>

          <figure className="fov-hud-analysis" aria-label="Horizon HUD 布局分析">
            <figcaption className="fov-callout fov-callout-round">轮次信息</figcaption>
            <figcaption className="fov-callout fov-callout-distance">主要距离</figcaption>
            <figcaption className="fov-callout fov-callout-hazard">障碍物信息</figcaption>
            <figcaption className="fov-callout fov-callout-map">球场地图</figcaption>
            <figcaption className="fov-callout fov-callout-club">球杆建议</figcaption>
            <figcaption className="fov-callout fov-callout-battery">电量</figcaption>
            <figcaption className="fov-callout fov-callout-status">球洞状态<br />及分数</figcaption>
            <figcaption className="fov-callout fov-callout-actions">操作层</figcaption>

            <div className="fov-hud-screen">
              <div className="fov-hud-round fov-analysis-box">
                <span><b>Hole</b><strong>07:23</strong></span>
                <span><b>Round</b><strong>01:04:28</strong></span>
              </div>
              <div className="fov-hud-primary fov-analysis-box">
                <span><b>F</b><strong>484</strong></span>
                <span><b>C</b><strong>495</strong></span>
                <span><b>B</b><strong>507</strong></span>
              </div>
              <span className="fov-hud-battery fov-analysis-box" aria-label="电量"><i /></span>
              <div className="fov-hud-hazards fov-analysis-box">
                <span><b>Bunker</b><strong>474</strong></span>
                <span><b>Bunker</b><strong>452</strong></span>
              </div>
              <div className="fov-hud-water">
                <span><b>Water</b><strong>429</strong></span>
                <span><b>Water</b><strong>421</strong></span>
              </div>
              <div className="fov-hud-course-map fov-analysis-box">
                <CaseStudyImage src="/assets/projects/ag1/overview/hole-interface.png" alt="" />
              </div>
              <div className="fov-hud-club fov-analysis-box"><b>· Dr</b><strong>230–250</strong></div>
              <div className="fov-hud-status fov-analysis-box"><strong>#4 Par5</strong><b>−10</b></div>
              <div className="fov-hud-clear fov-analysis-box">
                <strong>KEEP THE<br />COURSE VIEW<br />CLEAR</strong>
                <span>中央区域保持简洁，<br />为真实世界视野<br />留出空间。</span>
              </div>
              <div className="fov-hud-actions fov-analysis-box">
                <HudAction icon="⊕" label="Shot" />
                <HudAction icon="▧" label="Score" />
                <HudAction icon="⌘" label="Menu" />
                <HudAction icon="⌁" label="Green" />
              </div>
            </div>
          </figure>

          <aside className="fov-visual-hierarchy" aria-labelledby="visual-hierarchy-title-zh">
            <h3 id="visual-hierarchy-title-zh">视觉层级</h3>
            <div>
              {visualHierarchyZh.map((item) => (
                <article key={item.number}>
                  <span>{item.number}</span>
                  <div><h4>{item.title}</h4><p>{item.lines.map((line) => <span key={line}>{line}</span>)}</p></div>
                </article>
              ))}
            </div>
            <p className="fov-world-note"><FovIcon type="glance" />让真实世界始终可见</p>
          </aside>
        </section>

        <section className="fov-placement" aria-labelledby="placement-title-zh">
          <h3 id="placement-title-zh">布局依据</h3>
          <div className="fov-placement-row">
            {placementRationaleZh.map((item) => (
              <article key={item.eyebrow}>
                <FovIcon type={item.icon} />
                <div><h4>{item.eyebrow}</h4><p>{item.copy.split("\n").map((line) => <span key={line}>{line}</span>)}</p></div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}

function HorizonFovHudPage() {
  const { language } = useLanguage();

  if (language === "zh") return <HorizonFovHudPageZh />;

  return (
    <section className="horizon-case-page horizon-fov-hud-page" aria-labelledby="fov-hud-title">
      <div className="fov-hud-artboard">
        <header className="fov-hud-header">
          <div className="fov-hud-heading">
            <p className="fov-hud-number">05</p>
            <div>
              <h2 id="fov-hud-title">DESIGNING FOR A LIMITED FIELD OF VIEW</h2>
              <h3>FOV &amp; HUD Layout</h3>
            </div>
          </div>
          <p className="fov-hud-intro">The AG1 HUD is designed for a narrow monocular field of view. Information is prioritized, grouped, and placed where it can be read in a quick glance without obstructing the course.</p>
        </header>

        <div className="fov-constraints" aria-label="FOV constraints">
          {fovConstraints.map((item) => (
            <article key={item.title}>
              <FovIcon type={item.icon} />
              <div><h3>{item.title}</h3><p>{item.copy}</p></div>
            </article>
          ))}
        </div>

        <section className="fov-hud-main">
          <aside className="fov-hud-layers" aria-labelledby="hud-layers-title">
            <h3 id="hud-layers-title">HUD LAYERS</h3>
            <div>
              {hudLayers.map((item) => (
                <article key={item.letter}>
                  <span>{item.letter}</span>
                  <div><h4>{item.title}</h4><p>{item.copy}</p></div>
                </article>
              ))}
            </div>
          </aside>

          <figure className="fov-hud-analysis" aria-label="AG1 HUD layout analysis">
            <figcaption className="fov-callout fov-callout-round">ROUND CONTEXT</figcaption>
            <figcaption className="fov-callout fov-callout-distance">PRIMARY DISTANCE</figcaption>
            <figcaption className="fov-callout fov-callout-hazard">HAZARD<br />AWARENESS</figcaption>
            <figcaption className="fov-callout fov-callout-map">COURSE MAP</figcaption>
            <figcaption className="fov-callout fov-callout-club">CLUB<br />RECOMMENDATION</figcaption>
            <figcaption className="fov-callout fov-callout-battery">BATTERY</figcaption>
            <figcaption className="fov-callout fov-callout-status">HOLE STATUS</figcaption>
            <figcaption className="fov-callout fov-callout-actions">ACTION LAYER</figcaption>

            <div className="fov-hud-screen">
              <div className="fov-hud-round fov-analysis-box">
                <span><b>Hole</b><strong>07:23</strong></span>
                <span><b>Round</b><strong>01:04:28</strong></span>
              </div>
              <div className="fov-hud-primary fov-analysis-box">
                <span><b>F</b><strong>484</strong></span>
                <span><b>C</b><strong>495<small>y</small></strong></span>
                <span><b>B</b><strong>507</strong></span>
              </div>
              <span className="fov-hud-battery fov-analysis-box" aria-label="Battery"><i /></span>
              <div className="fov-hud-hazards fov-analysis-box">
                <span><b>Bunker</b><strong>474</strong></span>
                <span><b>Bunker</b><strong>452</strong></span>
              </div>
              <div className="fov-hud-water">
                <span><b>Water</b><strong>429</strong></span>
                <span><b>Water</b><strong>421</strong></span>
              </div>
              <div className="fov-hud-course-map fov-analysis-box">
                <CaseStudyImage src="/assets/projects/ag1/overview/hole-interface.png" alt="Hole map" />
              </div>
              <div className="fov-hud-club fov-analysis-box"><b>· Dr</b><strong>230~250</strong></div>
              <div className="fov-hud-status fov-analysis-box"><strong>#4 Par5</strong><b>−10</b></div>
              <div className="fov-hud-clear fov-analysis-box">
                <strong>KEEP THE<br />COURSE VIEW<br />CLEAR</strong>
                <span>Central area remains<br />uncluttered for the<br />real-world view.</span>
              </div>
              <div className="fov-hud-actions fov-analysis-box">
                <HudAction icon="⊕" label="Shot" />
                <HudAction icon="▧" label="Score" />
                <HudAction icon="⌘" label="Menu" />
                <HudAction icon="⌁" label="Green" />
              </div>
            </div>
          </figure>

          <aside className="fov-visual-hierarchy" aria-labelledby="visual-hierarchy-title">
            <h3 id="visual-hierarchy-title">VISUAL HIERARCHY</h3>
            <div>
              {visualHierarchy.map((item) => (
                <article key={item.number}>
                  <span>{item.number}</span>
                  <div><h4>{item.title}</h4><p>{item.lines.map((line) => <span key={line}>{line}</span>)}</p></div>
                </article>
              ))}
            </div>
            <p className="fov-world-note"><FovIcon type="glance" />KEEP THE REAL WORLD VISIBLE</p>
          </aside>
        </section>

        <section className="fov-placement" aria-labelledby="placement-title">
          <h3 id="placement-title">PLACEMENT RATIONALE</h3>
          <div className="fov-placement-row">
            {placementRationale.map((item) => (
              <article key={item.eyebrow}>
                <FovIcon type={item.icon} />
                <div><h4>{item.eyebrow}</h4><strong>{item.title}</strong><p>{item.copy}</p></div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}

const explorationVersions = [
  {
    version: "V1",
    note: "Early concept",
    image: "/assets/projects/ag1/exploration/v1.png",
    copy: "Experimental layout with weak hierarchy. Distance, hazards and status compete for attention.",
  },
  {
    version: "V2",
    note: "Simplified structure",
    image: "/assets/projects/ag1/exploration/v2.png",
    copy: "Cleaner status model and stronger focal distance, but contextual information is still limited.",
  },
  {
    version: "V3",
    note: "Selected direction",
    image: "/assets/projects/ag1/exploration/v3.png",
    copy: "Distance-first hierarchy with clearer hazard grouping, stable actions, and better balance for on-course use.",
  },
];

const explorationVersionsZh = [
  {
    version: "V1",
    note: "信息堆叠",
    image: "/assets/projects/ag1/exploration/v1.png",
    copy: "完整信息直接堆叠、填充较多；最终方案已取消填充高亮。",
  },
  {
    version: "V2",
    note: "结构优化",
    image: "/assets/projects/ag1/exploration/v2.png",
    copy: "优化信息层级与布局，聚焦核心内容，提升可读性。",
  },
  {
    version: "V3",
    note: "最终方案",
    image: "/assets/projects/ag1/exploration/v3.png",
    copy: "聚焦关键信息，保持视野简洁；快速浏览即可获取所需内容。",
  },
];

const scoringBefore = ["Hole Main", "Score", "Scorecard", "Edit", "Score"];
const scoringAfter = ["Hole Main", "Score Input", "Putts"];
const scoringBeforeZh = ["选择球洞", "记分", "记录推杆", "编辑", "记分", "同步"];
const scoringAfterZh = ["球洞主页", "分数输入", "推杆", "确认"];

const takeaways = [
  { icon: "target", title: "CLARITY OVER DENSITY", copy: "Less information,\nbetter decisions." },
  { icon: "depth", title: "DEPTH TO BREADTH", copy: "Reduce steps,\nkeep players in the moment." },
  { icon: "context", title: "CONTEXT DRIVEN", copy: "Surface what matters,\nwhen it matters." },
  { icon: "feedback", title: "FEEDBACK MATTERS", copy: "Every action needs a clear,\nimmediate response." },
  { icon: "ar", title: "DESIGNED FOR AR", copy: "Respect the real world,\neliminate what distracts." },
];

const takeawaysZh = [
  { icon: "target", title: "聚焦核心信息", copy: "更少信息，\n更高可读性。" },
  { icon: "context", title: "情境驱动", copy: "在需要的时机\n呈现重要信息。" },
  { icon: "feedback", title: "即时反馈", copy: "每个操作都有清晰反馈，\n增强控制感。" },
  { icon: "depth", title: "简化操作步骤", copy: "减少操作，\n让球手专注当下。" },
  { icon: "ar", title: "为 AR 而设计", copy: "兼顾真实世界，\n减少干扰。" },
];

function ExplorationSectionRule({ children, className = "" }) {
  return <div className={`exploration-section-rule ${className}`}><span /><h3>{children}</h3><span /></div>;
}

function ExplorationModuleTitle({ number, title, question }) {
  return (
    <header className="exploration-module-title">
      <div><span>{number}</span><h3>{title}</h3></div>
      {question && <p>{question}</p>}
    </header>
  );
}

function ScoreFlow({ title, steps, copy }) {
  return (
    <article className="exploration-score-flow">
      <h4>{title}</h4>
      <div>
        {steps.map((step, index) => (
          <span className="exploration-flow-step" key={`${title}-${step}-${index}`}>
            <strong>{step}</strong>
            {index < steps.length - 1 && <i aria-hidden="true">↓</i>}
          </span>
        ))}
      </div>
      <p>{copy}</p>
    </article>
  );
}

function ExplorationPinGrid({ position = "top-left", active = false, confirmed = false }) {
  return (
    <div className={`exploration-pin-grid pin-${position} ${active ? "is-active" : ""}`}>
      <span /><span /><span /><span />
      <i aria-hidden="true">⚑</i>
      {confirmed && <b aria-label="Confirmed">✓</b>}
    </div>
  );
}

function ActionButton({ icon, label, active = false }) {
  return (
    <span className={`exploration-action ${active ? "is-active" : ""}`}>
      <i aria-hidden="true">{icon}</i>
      <strong>{label}</strong>
    </span>
  );
}

function ExplorationSketch({ type }) {
  if (type === "free") {
    return <div className="exploration-sketch sketch-free"><i className="sketch-course" /><b className="sketch-flag">⚑</b><span className="sketch-crosshair">+</span></div>;
  }
  if (type === "region") {
    return <div className="exploration-sketch sketch-region"><i className="sketch-course" /><span className="sketch-v" /><span className="sketch-h" /><b className="sketch-flag">⚑</b></div>;
  }
  return <div className="exploration-sketch"><ExplorationPinGrid position="top-right" /></div>;
}

function HorizonDesignExplorationPage() {
  const { language } = useLanguage();
  const isZh = language === "zh";
  const versions = isZh ? explorationVersionsZh : explorationVersions;
  const beforeSteps = isZh ? scoringBeforeZh : scoringBefore;
  const afterSteps = isZh ? scoringAfterZh : scoringAfter;
  const takeawayItems = isZh ? takeawaysZh : takeaways;

  return (
    <section
      className={`horizon-case-page horizon-design-exploration-page ${isZh ? "horizon-design-exploration-page--zh" : ""}`.trim()}
      aria-labelledby="design-exploration-title"
    >
      <div className={`design-exploration-artboard ${isZh ? "design-exploration-artboard--zh" : ""}`.trim()}>
        <header className="design-exploration-header">
          <p>06</p>
          <div>
            <h2 id="design-exploration-title">{isZh ? "持续打磨体验" : "REFINING THE EXPERIENCE"}</h2>
            <h3>{isZh ? "设计探索与微交互" : <>Design Exploration &amp; Micro-interactions</>}</h3>
          </div>
          <span aria-hidden="true" />
          <p>
            {isZh ? (
              <>
                探索信息层级、交互深度与反馈机制，<br />
                通过多轮迭代优化，打造更加流畅、直观且沉浸的 AR 体验。
              </>
            ) : (
              "Exploring how information hierarchy, interaction depth and feedback evolved into a clearer AR experience."
            )}
          </p>
        </header>

        <ExplorationSectionRule className="design-exploration-rule">
          {isZh ? "设计探索" : "DESIGN EXPLORATION"}
        </ExplorationSectionRule>

        <section className="design-exploration-top">
          <article className="hud-hierarchy-exploration">
            <ExplorationModuleTitle
              number="01"
              title={isZh ? "HUD 层级探索" : "HUD HIERARCHY EXPLORATION"}
              question={isZh ? "如何在有限视野内优先呈现最关键信息？" : "How might we prioritize the most critical information within a limited field of view?"}
            />
            <div className="exploration-version-row">
              {versions.map((item, index) => (
                <article className="exploration-version" key={item.version}>
                  <figure>
                    <CaseStudyImage src={item.image} alt={`${item.version} ${isZh ? "Horizon" : "AG1"} HUD`} />
                    <figcaption><strong>{item.version}</strong><span>{item.note}</span></figcaption>
                  </figure>
                  <p>{item.copy}</p>
                  {index < versions.length - 1 && <i className="exploration-version-arrow" aria-hidden="true">›</i>}
                </article>
              ))}
            </div>
          </article>

          <article className="scoring-flow-exploration">
            <ExplorationModuleTitle
              number="02"
              title={isZh ? "计分流程探索" : "SCORING FLOW EXPLORATION"}
              question={isZh ? <>如何在保持计分准确性的同时，<br />减少交互步骤？</> : <>How might we minimize interaction depth<br />while keeping scoring accurate and quick?</>}
            />
            <div className="scoring-flow-columns">
              <ScoreFlow
                title={isZh ? "调整前" : "BEFORE"}
                steps={beforeSteps}
                copy={isZh ? <>步骤较多，容易打断<br />比赛节奏。</> : <>Too many steps<br />between play and scoring.</>}
              />
              {isZh ? <i className="exploration-score-change" aria-hidden="true">→</i> : null}
              <ScoreFlow
                title={isZh ? "调整后" : "AFTER"}
                steps={afterSteps}
                copy={isZh ? <>精简流程，减少不必要的步骤，<br />让球手更专注于比赛。</> : <>Direct editing reduces<br />interaction depth and keeps<br />the player in rhythm.</>}
              />
            </div>
          </article>

          <article className="pin-exploration">
            <ExplorationModuleTitle
              number="03"
              title={isZh ? "果岭与旗杆位置探索" : "GREEN – PIN POSITION EXPLORATION"}
              question={isZh ? "如何更快速、直观地设置旗杆位置？" : <>How might we minimize pin placement fast and<br />precise with minimal input?</>}
            />
            <div className="pin-exploration-options">
              <article>
                <h4>{isZh ? "A. 自由放置" : "A: Free Placement"}</h4>
                <ExplorationSketch type="free" />
                <p>{isZh ? <>触控选择目标位置，<br />灵活高效。</> : <>Difficult to control<br />with touchpad.<br />Low precision.</>}</p>
              </article>
              <article>
                <h4>{isZh ? "B. 区域移动" : "B: Region Move"}</h4>
                <ExplorationSketch type="region" />
                <p>{isZh ? <>在区域内快速移动，<br />兼顾速度与精度。</> : <>Better, but still<br />requires fine control<br />and more steps.</>}</p>
              </article>
              <article>
                <h4>{isZh ? "C. 2 × 2 网格选择" : <>Selected Direction:<br />2 × 2 Pin Grid</>}</h4>
                <ExplorationSketch type="selected" />
                <p>{isZh ? <>清晰直观的选择方式，<br />适合大多数场景。</> : <>Fast, precise, and<br />easy to understand.<br />Perfect for swipe input.</>}</p>
              </article>
            </div>
          </article>
        </section>

        <ExplorationSectionRule className="micro-interactions-rule">
          {isZh ? "微交互" : "MICRO-INTERACTIONS"}
        </ExplorationSectionRule>

        <section className="micro-interactions-row">
          <article className="micro-focus-state">
            <ExplorationModuleTitle number="01" title={isZh ? "焦点状态（滑动）" : "FOCUS STATE (SWIPE)"} />
            {isZh ? (
              <div className="focus-state-actions">
                <ActionButton icon="⊕" label="击球" />
                <ActionButton icon="▧" label="记分" />
                <ActionButton icon="≡" label="菜单" active />
                <ActionButton icon="⚑" label="果岭" />
                <ActionButton icon="⊙" label="地图" />
                <ActionButton icon="⚙" label="设置" />
                <ActionButton icon="•••" label="更多" />
              </div>
            ) : (
              <div className="focus-state-frames">
                <div><ActionButton icon="⊕" label="Shot" /><ActionButton icon="▧" label="Score" /><ActionButton icon="≡" label="Menu" active /><ActionButton icon="⌁" label="Green" /></div>
                <b aria-hidden="true">→</b>
                <div><ActionButton icon="⊕" label="Shot" /><ActionButton icon="▧" label="Score" active /><ActionButton icon="≡" label="Menu" /><ActionButton icon="⌁" label="Green" /></div>
              </div>
            )}
            <p>{isZh ? <>清晰的焦点反馈，<br />让下一步操作更明确。</> : <>Current focus is highlighted so<br />the next action is predictable.</>}</p>
          </article>

          <article className="micro-select-feedback">
            <ExplorationModuleTitle number="02" title={isZh ? "选择反馈（点击）" : "SELECT FEEDBACK (CLICK)"} />
            <div className="select-feedback-frames">
              <ActionButton icon={isZh ? "+" : "⌁"} label={isZh ? "待机" : "Idle"} />
              <b aria-hidden="true">→</b>
              <ActionButton icon={isZh ? "⚑" : "⌁"} label={isZh ? "选中" : "Active"} active />
              <b aria-hidden="true">→</b>
              <ActionButton icon={isZh ? "✓" : "⌁"} label={isZh ? "确认" : "Enter"} />
            </div>
            <p>{isZh ? <>即时的视觉反馈，<br />降低操作不确定性。</> : <>Immediate feedback confirms that<br />the system received the input.</>}</p>
          </article>

          <article className="micro-score-adjustment">
            <ExplorationModuleTitle number="03" title={isZh ? "成绩调整" : "SCORE ADJUSTMENT"} />
            {isZh ? (
              <div className="score-adjustment-pairs">
                <span><small>记分</small><i>−</i><strong>0</strong><i>＋</i></span>
                <span><small>推杆</small><i>−</i><strong>+1</strong><i>＋</i></span>
              </div>
            ) : (
              <div className="score-adjustment-frames">
                <span><small>SCORE</small><strong>0</strong></span><b>→</b>
                <span className="is-emphasis"><small>SCORE</small><strong>+1</strong></span><b>→</b>
                <span><small>SCORE</small><strong>+1</strong></span>
              </div>
            )}
            <p>{isZh ? <>数字变化有清晰反馈，<br />让确认更安心。</> : <>Number briefly scales and brightens<br />to acknowledge the change.</>}</p>
          </article>

          <article className="micro-pin-selection">
            <ExplorationModuleTitle number="04" title={isZh ? "旗杆位置选择" : "PIN POSITION SELECTION"} />
            <div className="pin-selection-frames">
              <ExplorationPinGrid position="top-left" /><b>→</b><ExplorationPinGrid position="top-right" active /><b>→</b><ExplorationPinGrid position="bottom-left" confirmed />
            </div>
            <p>{isZh ? <>移动路径清晰，位置一目了然，<br />确认更简单。</> : <>Movement is clear, position is obvious,<br />confirmation is simple.</>}</p>
          </article>
        </section>

        <section className="design-takeaways" aria-labelledby="design-takeaways-title">
          <h3 id="design-takeaways-title">{isZh ? <>设计<br />关键洞察</> : <>DESIGN<br />TAKEAWAYS</>}</h3>
          <div>
            {takeawayItems.map((item) => (
              <article key={item.title}>
                <span className={`exploration-takeaway-icon takeaway-${item.icon}`} aria-hidden="true"><i /><b /></span>
                <div><h4>{item.title}</h4><p>{item.copy.split("\n").map((line) => <span key={line}>{line}</span>)}</p></div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}

const completeExperienceAssets = {
  home: "/assets/projects/ag1/complete-experience/home.png",
  courseList: "/assets/projects/ag1/complete-experience/course-list.png",
  courseOverview: "/assets/projects/ag1/complete-experience/course-overview.png",
  holeMain: "/assets/projects/ag1/complete-experience/hole-main.png",
  directionAssist: "/assets/projects/ag1/complete-experience/direction-assist.png",
  shotView: "/assets/projects/ag1/complete-experience/shot-view.png",
  greenPreview: "/assets/projects/ag1/complete-experience/green-preview.png",
  pinPosition: "/assets/projects/ag1/complete-experience/pin-position.png",
  scoreInput: "/assets/projects/ag1/complete-experience/score-input.png",
  scorecard: "/assets/projects/ag1/complete-experience/scorecard.png",
};

function CompleteExperienceFigure({ src, label, className = "" }) {
  return (
    <figure className={`complete-ui-figure ${className}`}>
      <div className="complete-ui-frame">
        <CaseStudyImage src={src} alt={`${label} final Horizon UI`} />
      </div>
      <figcaption>{label}</figcaption>
    </figure>
  );
}

function CompleteExperienceGroupHeader({ number, title, children }) {
  return (
    <header className="complete-group-header">
      <h3><span>{number}</span>{title}</h3>
      <p>{children}</p>
    </header>
  );
}

function HorizonCompleteExperiencePage() {
  return (
    <section className="horizon-case-page horizon-complete-experience-page" aria-labelledby="complete-experience-title">
      <div className="complete-experience-artboard">
        <header className="complete-experience-header">
          <p aria-hidden="true">07</p>
          <span aria-hidden="true" />
          <div>
            <h2 id="complete-experience-title">COMPLETE EXPERIENCE</h2>
            <h3>The Horizon UI System</h3>
            <p>A complete view of the Horizon interface, organized around entry, on-course play,<br />green reading and scoring.</p>
          </div>
        </header>

        <section className="complete-experience-group complete-entry-group" aria-labelledby="complete-entry-title">
          <CompleteExperienceGroupHeader number="01" title="ENTRY & SETUP">
            Start from the system home,<br />select a course, and enter<br />the round overview.
          </CompleteExperienceGroupHeader>
          <div className="complete-entry-gallery" id="complete-entry-title">
            <CompleteExperienceFigure src={completeExperienceAssets.home} label="HOME" />
            <CompleteExperienceFigure src={completeExperienceAssets.courseList} label="COURSE LIST" />
            <CompleteExperienceFigure src={completeExperienceAssets.courseOverview} label="COURSE OVERVIEW" />
          </div>
        </section>

        <section className="complete-experience-group complete-play-group" aria-labelledby="complete-play-title">
          <CompleteExperienceGroupHeader number="02" title="ON-COURSE PLAY">
            Core information and directional<br />assistance stay close to the<br />main playing view.
          </CompleteExperienceGroupHeader>
          <div className="complete-play-gallery" id="complete-play-title">
            <CompleteExperienceFigure src={completeExperienceAssets.holeMain} label="HOLE MAIN" className="complete-hole-main" />
            <div className="complete-play-stack">
              <CompleteExperienceFigure src={completeExperienceAssets.directionAssist} label="DIRECTION ASSIST" />
              <CompleteExperienceFigure src={completeExperienceAssets.shotView} label="SHOT VIEW" />
            </div>
          </div>
        </section>

        <div className="complete-experience-bottom">
          <section className="complete-experience-group complete-green-group" aria-labelledby="complete-green-title">
            <CompleteExperienceGroupHeader number="03" title="GREEN READING">
              Preview the green and quickly<br />place the flag using a<br />four-zone pin selection.
            </CompleteExperienceGroupHeader>
            <div className="complete-green-gallery" id="complete-green-title">
              <CompleteExperienceFigure src={completeExperienceAssets.greenPreview} label="GREEN PREVIEW" />
              <CompleteExperienceFigure src={completeExperienceAssets.pinPosition} label="PIN POSITION (2×2)" />
            </div>
          </section>

          <section className="complete-experience-group complete-scoring-group" aria-labelledby="complete-scoring-title">
            <CompleteExperienceGroupHeader number="04" title="SCORING">
              Record score and putts in<br />the flow, then review<br />personal and team results.
            </CompleteExperienceGroupHeader>
            <div className="complete-scoring-gallery" id="complete-scoring-title">
              <CompleteExperienceFigure src={completeExperienceAssets.scoreInput} label="SCORE INPUT" />
              <CompleteExperienceFigure src={completeExperienceAssets.scorecard} label="OWN CARD / TEAM CARD" className="complete-scorecard" />
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}

function HorizonCaseStudy({ project, onClose, onNext, active }) {
  const dialogRef = useRef(null);
  const { scrollRef, returnFromHero } = useSharedProjectDetailScroll(onClose);
  useProjectDialog(returnFromHero, dialogRef, active);

  return (
    <motion.div
      ref={dialogRef}
      className="detail-overlay horizon-case-study"
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} 项目详情`}
      tabIndex={-1}
    >
      <header className="detail-nav horizon-case-nav" aria-label="项目详情导航">
        <div className="detail-nav-group">
          <button className="pill-button" type="button" onClick={returnFromHero}>/返回</button>
          <button className="pill-button" type="button" onClick={onNext}>下一个</button>
        </div>
        <div className="detail-nav-group detail-nav-group-right">
          <button className="pill-button" type="button" onClick={returnFromHero}>Chen</button>
          <a className="pill-button" href="#contact" onClick={returnFromHero}>联系</a>
          <LanguageSwitcher />
        </div>
      </header>

      <SharedProjectDetailScrollShell project={project} scrollRef={scrollRef}>
          <main className="horizon-pages-scroll">
            <HorizonOverviewPage />
            <HorizonResearchPage />
            <HorizonJourneyPage />
            <HorizonPrinciplesPage />
            <HorizonUserFlowPage />
            <HorizonFovHudPage />
            <HorizonDesignExplorationPage />
            <HorizonCompleteExperiencePage />
          </main>

          <aside className="horizon-project-intro" aria-label="MILESEEY Horizon project information">
            <div className="horizon-project-info">
            <header className="horizon-project-info-header">
              <h2>MILESEEY HORIZON</h2>
              <p className="horizon-project-meta">[2025–2026] AR GOLF INTERACTION SYSTEM</p>
            </header>

            <section className="horizon-project-info-block">
              <h3>ROLE</h3>
              <p>UX / INTERACTION DESIGNER</p>
            </section>

            <section className="horizon-project-info-block horizon-project-info-project">
              <h3>PROJECT</h3>
              <p>
                MILESEEY HORIZON IS A WEARABLE AR SYSTEM DESIGNED TO BRING ESSENTIAL GOLF INFORMATION DIRECTLY INTO
                THE PLAYER’S FIELD OF VIEW.
              </p>
              <p>
                I LED THE UX AND INTERACTION DESIGN ACROSS THE ON-COURSE EXPERIENCE, TRANSLATING DISTANCE, HAZARDS,
                COURSE MAPS, GREEN INFORMATION AND SCORING INTO A COMPACT MONOCHROME HUD. THE SYSTEM WAS DESIGNED
                AROUND LIMITED FOV, MINIMAL INPUT AND LOW-DISTRACTION INTERACTION, HELPING GOLFERS ACCESS THE RIGHT
                INFORMATION WITHOUT LOSING FOCUS ON THE COURSE.
              </p>
            </section>

            <section className="horizon-project-info-block">
              <h3>SKILLS &amp; DELIVERABLES</h3>
              <p>
                USER RESEARCH, UX STRATEGY, INFORMATION ARCHITECTURE, INTERACTION DESIGN, USER FLOW, AR HUD / FOV
                DESIGN, UI DESIGN, PROTOTYPING, USABILITY TESTING
              </p>
            </section>
            </div>
          </aside>
      </SharedProjectDetailScrollShell>
    </motion.div>
  );
}

const TOOLS_PROTOTYPE_URL = "/prototypes/tools/index.html";

function ToolsPrototypeSection() {
  const [frameVersion, setFrameVersion] = React.useState(0);
  const [isExpanded, setIsExpanded] = React.useState(false);
  const frameShellRef = React.useRef(null);

  React.useEffect(() => {
    if (!isExpanded) {
      frameShellRef.current?.scrollTo({ top: 0, left: 0 });
    }
  }, [isExpanded]);

  const restartPrototype = React.useCallback(() => {
    try {
      Object.keys(window.localStorage)
        .filter((key) => key.startsWith("tools-app-"))
        .forEach((key) => window.localStorage.removeItem(key));
    } catch {
      // The iframe can still be reloaded if storage is unavailable.
    }

    setFrameVersion((version) => version + 1);
  }, []);

  return (
    <section className="tools-prototype-section" aria-labelledby="tools-prototype-title">
      <header className="tools-prototype-header">
        <p className="tools-prototype-label">INTERACTIVE PROTOTYPE</p>
        <h2 id="tools-prototype-title">Explore the workflow.</h2>
        <p className="tools-prototype-description">
          A functional prototype built to validate key measurement, project and documentation workflows through
          direct interaction.
        </p>
      </header>

      <div className={`tools-prototype-preview-frame ${isExpanded ? "is-expanded" : "is-collapsed"}`}>
        <div className="tools-prototype-preview-inner">
          <div
            id="tools-prototype-panel"
            className={`tools-prototype-device ${isExpanded ? "is-expanded" : "is-collapsed"}`}
          >
            <div ref={frameShellRef} className="tools-prototype-frame">
              <iframe
                key={frameVersion}
                className="tools-prototype-iframe"
                src={TOOLS_PROTOTYPE_URL}
                title="Interactive MILESEEY Tools App prototype"
                loading="lazy"
                allow="camera; microphone; fullscreen; clipboard-write"
              />

              {!isExpanded && (
                <button
                  type="button"
                  className="tools-prototype-live-trigger"
                  aria-label="Expand the interactive Tools prototype"
                  aria-controls="tools-prototype-panel"
                  aria-expanded="false"
                  onClick={() => setIsExpanded(true)}
                >
                  <span className="tools-prototype-live-entry">
                    <span className="tools-prototype-live-label">
                      <Circle className="tools-prototype-live-dot" size={7} weight="fill" aria-hidden="true" />
                      LIVE PROTOTYPE
                    </span>
                    <span className="tools-prototype-live-cta">
                      Try the interactive prototype
                      <ArrowRight className="tools-prototype-live-arrow" size={18} aria-hidden="true" />
                    </span>
                    <HandTap className="tools-prototype-live-icon" size={30} weight="regular" aria-hidden="true" />
                  </span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <button
        type="button"
        className="tools-prototype-toggle"
        aria-controls="tools-prototype-panel"
        aria-expanded={isExpanded}
        onClick={() => setIsExpanded((expanded) => !expanded)}
      >
        {isExpanded ? "Collapse Prototype" : "Expand Prototype"}
        {isExpanded ? <ArrowUp size={17} aria-hidden="true" /> : <ArrowDown size={17} aria-hidden="true" />}
      </button>

      <div className="tools-prototype-actions" aria-label="Prototype controls">
        <button type="button" onClick={restartPrototype}>Restart Prototype</button>
        <a
          href={TOOLS_PROTOTYPE_URL}
          target="_blank"
          rel="noreferrer"
          aria-label="Open the Tools prototype in a new window"
        >
          Open Fullscreen <span aria-hidden="true">↗</span>
        </a>
      </div>
    </section>
  );
}

function ToolsProjectOverview() {
  return (
    <section className="tools-project" aria-label="MILESEEY Tools Project Overview">
      <section className="tools-behance-hero" aria-labelledby="tools-overview-title">
        <div className="tools-behance-copy">
          <p className="tools-kicker">MOBILE MEASUREMENT / PROJECT WORKSPACE</p>
          <h2 id="tools-overview-title"><span>MILESEEY</span><span>TOOLS</span></h2>
          <p className="tools-behance-tagline">FROM MEASUREMENT TO PROJECT.</p>
        </div>

        <div className="tools-behance-visual tools-overview-composition" aria-label="MILESEEY Tools Home and Project Overview interfaces">
          <figure className="tools-overview-floorplan" aria-hidden="true">
            <CaseStudyImage src="/assets/projects/tools/floor-plan-workspace.png" alt="" />
          </figure>

          <span className="tools-overview-measure tools-overview-measure--top" aria-hidden="true">6.72</span>
          <span className="tools-overview-measure tools-overview-measure--side" aria-hidden="true">8.40</span>
          <span className="tools-overview-coordinate" aria-hidden="true">X: 4.25<br />Y: 7.18</span>

          <figure className="tools-overview-ui tools-overview-ui--home">
            <CaseStudyImage
              loading="eager"
              src="/assets/projects/tools/tools-home-connected.png"
              alt="MILESEEY Tools connected Home screen"
            />
          </figure>

          <figure className="tools-overview-ui tools-overview-ui--project">
            <CaseStudyImage
              loading="eager"
              src="/assets/projects/tools/tools-project-overview.png"
              alt="MILESEEY Tools New Project Overview screen"
            />
          </figure>
        </div>
      </section>

      <ToolsPrototypeSection />

      <section className="tools-introduction" aria-labelledby="tools-introduction-title">
        <div className="tools-introduction__lead">
          <h3 id="tools-introduction-title">Introduction</h3>
          <p className="tools-introduction__copy">MILESEEY Tools is a mobile workspace designed to connect physical measurement with digital project workflows. It brings device connection, floor planning, on-site documentation and project management into one continuous experience.</p>
        </div>

        <div className="tools-project-info">
          <article>
            <span>01</span>
            <h4>Project Goal</h4>
            <strong>Connect measurement, documentation and project management within one continuous workflow.</strong>
          </article>
          <article>
            <span>02</span>
            <h4>My Role</h4>
            <p className="tools-project-info__list">UX Strategy · Interaction Design · UI Design · Prototyping</p>
          </article>
          <article>
            <span>03</span>
            <h4>Scope</h4>
            <p className="tools-project-info__list">Device Connection · Floor Planning · On-site Documentation · Project Management</p>
          </article>
        </div>
      </section>
    </section>
  );
}

function ToolsUnderstandingProblem() {
  return (
    <section className="tools-problem-section" aria-labelledby="tools-problem-title">
      <div className="tools-problem-shell">
        <header className="tools-problem-header">
          <p className="tools-problem-label"><span>02</span> — Understanding the Problem</p>
          <h2 id="tools-problem-title">
            <span>The tools were there.</span>
            <span>The workflow wasn&apos;t.</span>
          </h2>
          <p className="tools-problem-intro">
            On-site measurement often involves multiple tools, devices and types of project data. Measurements,
            floor plans, photos and records need to move together throughout the job, yet these tasks are often
            handled separately — creating friction in data flow, device clarity and project continuity.
          </p>
        </header>

        <div className="tools-problem-list">
          <article className="tools-problem-item tools-problem-item--workflow">
            <div className="tools-problem-copy">
              <span className="tools-problem-number">01</span>
              <div>
                <h3>Fragmented Workflow</h3>
                <p>
                  Measurements, floor plans, photos and forms are often handled as separate tasks. Users need to
                  repeatedly switch between different tools and contexts while working on site.
                </p>
              </div>
            </div>
            <figure className="tools-problem-visual tools-problem-visual--workflow">
              <CaseStudyImage
                src="/assets/projects/tools/tools-problem-project-overview.png"
                alt="Project overview showing floor plans, photos, forms and team tabs"
              />
            </figure>
          </article>

          <article className="tools-problem-item tools-problem-item--device">
            <div className="tools-problem-copy">
              <span className="tools-problem-number">02</span>
              <div>
                <h3>Unclear Data Source</h3>
                <p>
                  On site, users may work with more than one measurement device. When multiple devices are available,
                  the source of each measurement needs to remain clear and easy to identify.
                </p>
              </div>
            </div>
            <figure className="tools-problem-visual tools-problem-visual--device">
              <CaseStudyImage
                src="/assets/projects/tools/tools-problem-device.png"
                alt="Connected devices showing device names and identifiers"
              />
            </figure>
          </article>

          <article className="tools-problem-item tools-problem-item--continuity">
            <div className="tools-problem-copy">
              <span className="tools-problem-number">03</span>
              <div>
                <h3>Weak Project Continuity</h3>
                <p>
                  Field work does not end with a single measurement. Users need to return to ongoing projects, track
                  progress, retrieve records and clearly distinguish active and completed work over time.
                </p>
              </div>
            </div>
            <figure className="tools-problem-visual tools-problem-visual--continuity">
              <CaseStudyImage
                src="/assets/projects/tools/tools-problem-project-list.png"
                alt="Project list showing search, filters and active and completed project states"
              />
            </figure>
          </article>
        </div>

      </div>
    </section>
  );
}

const toolsInsightMappings = [
  {
    number: "01",
    problem: "Fragmented Workflow",
    decision: "Project-centered Workspace",
    explanation:
      "Floor plans, photos, forms and measurements are organized around a single project rather than separate tools.",
  },
  {
    number: "02",
    problem: "Unclear Data Source",
    decision: "Connected Device Layer",
    explanation:
      "Connected devices become part of the workflow, helping measurements stay associated with a clear source.",
  },
  {
    number: "03",
    problem: "Weak Project Continuity",
    decision: "Clear Project Lifecycle",
    explanation:
      "Projects move through clear states so users can continue, complete and retrieve work over time.",
  },
];

function ToolsStructureNode({ className, icon: Icon, label, central = false }) {
  return (
    <div className={`tools-structure-node ${className}`}>
      <Icon aria-hidden="true" weight="thin" />
      <span>{label}</span>
      {central ? <span className="tools-structure-node__focus" aria-hidden="true" /> : null}
    </div>
  );
}

function ToolsFromInsightToStructure() {
  const { language } = useLanguage();

  return (
    <section className="tools-structure-section" aria-labelledby="tools-structure-title">
      <div className="tools-structure-shell">
        <header className="tools-structure-header">
          <p className="tools-structure-label"><span>03</span> — From Insight to Structure</p>
          <h2 id="tools-structure-title">
            <span>From scattered tasks</span>
            <span>to one project-centered workspace.</span>
          </h2>
          <p className="tools-structure-intro">
            Instead of organizing the app around separate tools, the experience is structured around the project,
            connecting devices, measurements, floor plans and field records within one continuous workspace.
          </p>
        </header>

        <div className="tools-insight-mappings" aria-label="Insights translated into product structure">
          {toolsInsightMappings.map((item) => (
            <article className="tools-insight-mapping" key={item.number}>
              <span className="tools-insight-mapping__number">{item.number}</span>
              <h3 className="tools-insight-mapping__problem">{item.problem}</h3>
              <ArrowRight className="tools-insight-mapping__arrow" aria-hidden="true" weight="thin" />
              <h3 className="tools-insight-mapping__decision">{item.decision}</h3>
              <p className="tools-insight-mapping__explanation">{item.explanation}</p>
            </article>
          ))}
        </div>

        <div
          className="tools-product-structure"
          role="img"
          aria-label="Project-centered workspace connecting Home, Device, Floor Plan, Photos, Form and Team"
        >
          <span className="tools-structure-link tools-structure-link--home" aria-hidden="true" />
          <span className="tools-structure-link tools-structure-link--device" aria-hidden="true" />
          <span className="tools-structure-link tools-structure-link--floor" aria-hidden="true" />
          <span className="tools-structure-link tools-structure-link--down" aria-hidden="true" />
          <span className="tools-structure-link tools-structure-link--branch" aria-hidden="true" />
          <span className="tools-structure-link tools-structure-link--photos" aria-hidden="true" />
          <span className="tools-structure-link tools-structure-link--form" aria-hidden="true" />
          <span className="tools-structure-link tools-structure-link--team" aria-hidden="true" />

          <ToolsStructureNode className="tools-structure-node--home" icon={House} label="HOME" />
          <ToolsStructureNode className="tools-structure-node--device" icon={DeviceMobile} label="DEVICE" />
          <ToolsStructureNode
            className="tools-structure-node--project"
            icon={FolderOpen}
            label="PROJECT"
            central
          />
          <ToolsStructureNode className="tools-structure-node--floor" icon={Blueprint} label="FLOOR PLAN" />
          <ToolsStructureNode className="tools-structure-node--photos" icon={Camera} label="PHOTOS" />
          <ToolsStructureNode className="tools-structure-node--form" icon={FileText} label="FORM" />
          <ToolsStructureNode className="tools-structure-node--team" icon={UsersThree} label="TEAM" />
        </div>

        <section className="tools-lifecycle" aria-labelledby="tools-lifecycle-title">
          <h3 id="tools-lifecycle-title">Project Lifecycle</h3>
          <div className="tools-lifecycle-main">
            <div className="tools-lifecycle-state">
              <PlusCircle aria-hidden="true" weight="thin" />
              <span>Create</span>
            </div>
            <ArrowRight className="tools-lifecycle-arrow" aria-hidden="true" weight="thin" />
            <div className="tools-lifecycle-state tools-lifecycle-state--active">
              <Pulse aria-hidden="true" weight="thin" />
              <span>Active</span>
            </div>
            <ArrowRight className="tools-lifecycle-arrow" aria-hidden="true" weight="thin" />
            <div className="tools-lifecycle-state">
              <CheckCircle aria-hidden="true" weight="thin" />
              <span>Complete</span>
            </div>
          </div>

          <div className="tools-lifecycle-branches" aria-label="Favorite and Trash are supporting project states">
            <span className="tools-lifecycle-branches__line" aria-hidden="true" />
            <span className="tools-lifecycle-branches__stem tools-lifecycle-branches__stem--create" aria-hidden="true" />
            <span className="tools-lifecycle-branches__stem tools-lifecycle-branches__stem--active" aria-hidden="true" />
            <span className="tools-lifecycle-branches__stem tools-lifecycle-branches__stem--complete" aria-hidden="true" />
            <span className="tools-lifecycle-branches__stem tools-lifecycle-branches__stem--favorite" aria-hidden="true" />
            <span className="tools-lifecycle-branches__stem tools-lifecycle-branches__stem--trash" aria-hidden="true" />
            <div className="tools-lifecycle-support tools-lifecycle-support--favorite">
              <Star aria-hidden="true" weight="thin" />
              <span>Favorite</span>
            </div>
            <div className="tools-lifecycle-support tools-lifecycle-support--trash">
              <Trash aria-hidden="true" weight="thin" />
              <span>Trash</span>
            </div>
          </div>
        </section>

        <blockquote className="tools-structure-summary">
          <Quotes className="tools-structure-summary__quote tools-structure-summary__quote--open" aria-hidden="true" weight="fill" />
          <p>
            <span>The project became the structure</span>
            <span>
              {language === "zh" ? (
                <>将所有任务<em>连接</em>起来。</>
              ) : (
                <>that <em>connected</em> them.</>
              )}
            </span>
          </p>
          <Quotes className="tools-structure-summary__quote tools-structure-summary__quote--close" aria-hidden="true" weight="fill" />
        </blockquote>
      </div>
    </section>
  );
}

const toolsCoreSummaryItems = [
  { label: "Device", icon: DeviceMobile },
  { label: "Floor Plan", icon: Blueprint },
  { label: "Photos", icon: Camera },
  { label: "Forms", icon: FileText },
  { label: "Team", icon: UsersThree },
];

function ToolsCoreExperience() {
  return (
    <section className="tools-core-section" aria-labelledby="tools-core-title">
      <div className="tools-core-shell">
        <header className="tools-core-header">
          <p className="tools-core-label"><span>04</span> — Core Experience</p>
          <h2 id="tools-core-title">
            <span>One workflow.</span>
            <span>From site to project.</span>
          </h2>
          <p className="tools-core-intro">
            A continuous experience connects project setup, device measurement, floor planning and field records
            without breaking the user&apos;s working context.
          </p>
        </header>

        <div className="tools-core-stages">
          <article className="tools-core-stage tools-core-stage--project">
            <div className="tools-core-stage-copy">
              <span className="tools-core-stage-number">01</span>
              <h3><span>Start with</span><span>a Project</span></h3>
              <span className="tools-core-stage-accent" aria-hidden="true" />
              <p>Every task begins within a project context.</p>
            </div>
            <figure className="tools-core-stage-visual tools-core-stage-visual--project">
              <CaseStudyImage
                src="/assets/projects/tools/core-experience-project-context.png"
                alt="Project list and project overview showing creation and entry into a project context"
              />
            </figure>
          </article>

          <article className="tools-core-stage tools-core-stage--measure">
            <div className="tools-core-stage-copy">
              <span className="tools-core-stage-number">02</span>
              <h3><span>Measure as</span><span>you work</span></h3>
              <span className="tools-core-stage-accent" aria-hidden="true" />
              <p>Measurements become part of the drawing workflow instead of remaining isolated device data.</p>
            </div>
            <figure className="tools-core-stage-visual tools-core-stage-visual--measure">
              <CaseStudyImage
                src="/assets/projects/tools/core-experience-measure-draw.png"
                alt="Connected devices beside a floor plan drawing workspace with active measurements"
              />
            </figure>
          </article>

          <article className="tools-core-stage tools-core-stage--organize">
            <div className="tools-core-stage-copy">
              <span className="tools-core-stage-number">03</span>
              <h3><span>Keep everything</span><span>in one Project</span></h3>
              <span className="tools-core-stage-accent" aria-hidden="true" />
              <p>Floor plans, records and field documentation stay organized within a single project.</p>
            </div>
            <figure className="tools-core-stage-visual tools-core-stage-visual--organize">
              <CaseStudyImage
                src="/assets/projects/tools/core-experience-project-overview.png"
                alt="Project overview organizing a floor plan, photos and forms in one project"
              />
            </figure>
          </article>
        </div>

        <aside className="tools-core-summary" aria-label="One connected project experience">
          <div className="tools-core-summary-copy">
            <span className="tools-core-summary-icon" aria-hidden="true">
              <Lightbulb weight="thin" />
            </span>
            <div>
              <p>ONE EXPERIENCE</p>
              <h3>
                <span>Everything you do on site,</span>
                <span>stays connected to your project.</span>
              </h3>
            </div>
          </div>
          <span className="tools-core-summary-divider" aria-hidden="true" />
          <div className="tools-core-summary-flow" aria-label="Device to Floor Plan to Photos to Forms to Team">
            {toolsCoreSummaryItems.map(({ label, icon: Icon }, index) => (
              <React.Fragment key={label}>
                <div className="tools-core-summary-node">
                  <Icon aria-hidden="true" weight="thin" />
                  <span>{label}</span>
                </div>
                {index < toolsCoreSummaryItems.length - 1 ? (
                  <ArrowRight className="tools-core-summary-arrow" aria-hidden="true" weight="thin" />
                ) : null}
              </React.Fragment>
            ))}
          </div>
        </aside>
      </div>
    </section>
  );
}

const toolsMeasureSteps = [
  { label: "Select Wall", icon: Selection },
  { label: "Measure Popup", icon: DeviceMobile },
  { label: "Switch Device", icon: ArrowsLeftRight },
  { label: "Confirm Dimension", icon: CheckCircle },
];

const toolsDrawingStates = [
  { number: "1", label: "Scan Room", image: "drawing-state-01.png" },
  { number: "2", label: "Create Floor Plan", image: "drawing-state-02.png" },
  { number: "3", label: "Select Element", image: "drawing-state-03.png" },
  { number: "4", label: "Measure", image: "drawing-state-04.png" },
  { number: "5", label: "Update Dimension", image: "drawing-state-05.png" },
];

const toolsDrawingTools = [
  { label: "Insert", image: "tool-insert.png" },
  { label: "Separate", image: "tool-separate.png" },
  { label: "Add Wall", image: "tool-add-wall.png" },
  { label: "Wall Type", image: "tool-wall-type.png" },
  { label: "Move", image: "tool-move.png" },
  { label: "Size", image: "tool-size.png" },
  { label: "Duplicate", image: "tool-duplicate.png" },
  { label: "Delete", image: "tool-delete.png" },
];

function ToolsMeasureSmarter() {
  const assetRoot = "/assets/projects/tools/measure-smarter";

  return (
    <section className="tools-measure-section" aria-labelledby="tools-measure-title">
      <div className="tools-measure-shell">
        <header className="tools-measure-header">
          <p className="tools-measure-label"><span>05</span> — Measure Smarter</p>
          <h2 id="tools-measure-title">Measure Smarter.</h2>
          <p className="tools-measure-intro">
            Connecting devices, measurements and floor plans in one continuous workflow.
            <br />
            From real-world measurement to accurate digital drawings.
          </p>
        </header>

        <article className="tools-measure-module tools-measure-module--connected">
          <div className="tools-measure-module-copy">
            <span className="tools-measure-module-number">01</span>
            <h3><span>Connected</span><span>Measurement</span></h3>
            <span className="tools-measure-module-accent" aria-hidden="true" />
            <p>
              Tap a wall to update its dimension. A measurement popup appears with the connected device. Switch
              devices instantly, capture the value, and the dimension is updated in real time.
            </p>
          </div>

          <div className="tools-connected-artboard" aria-label="Connected measurement and device switching">
            <div className="tools-connected-stage">
              <figure className="tools-connected-device-shot">
                <CaseStudyImage src={`${assetRoot}/device-connection.png`} alt="My Device showing S50C and X Tape Mini" />
              </figure>

              <figure className="tools-connected-floor-shot">
                <CaseStudyImage
                  src={`${assetRoot}/floor-plan-base.png`}
                  alt="Floor Plan 1 with a selected wall and 2.99 meter dimension"
                />
              </figure>

              <figure className="tools-connected-s50c-popup">
                <CaseStudyImage
                  src={`${assetRoot}/s50c-popup.png`}
                  alt="S50C measurement popup showing a 2.99 meter value"
                />
              </figure>

              <figure className="tools-connected-tape-popup">
                <CaseStudyImage
                  src={`${assetRoot}/tape-popup.png`}
                  alt="X Tape Mini measurement popup showing the same 2.99 meter value"
                />
              </figure>

              <ArrowsClockwise className="tools-connected-switch-cue" aria-hidden="true" weight="light" />
            </div>

            <div className="tools-connected-flow" aria-label="Select Wall, Measure Popup, Switch Device, Confirm Dimension">
              {toolsMeasureSteps.map(({ label, icon: Icon }, index) => (
                <React.Fragment key={label}>
                  <div className="tools-connected-flow-node">
                    <Icon aria-hidden="true" weight="thin" />
                    <span>{label}</span>
                  </div>
                  {index < toolsMeasureSteps.length - 1 ? (
                    <ArrowRight className="tools-connected-flow-arrow" aria-hidden="true" weight="thin" />
                  ) : null}
                </React.Fragment>
              ))}
            </div>
          </div>
        </article>

        <article className="tools-measure-module tools-measure-module--drawing">
          <div className="tools-measure-module-copy">
            <span className="tools-measure-module-number">02</span>
            <h3><span>Drawing</span><span>Workspace</span></h3>
            <span className="tools-measure-module-accent" aria-hidden="true" />
            <p>
              Scan, draw and edit seamlessly. Measurements captured on site become accurate dimensions in the floor
              plan.
            </p>
          </div>

          <div className="tools-drawing-visual">
            <div className="tools-drawing-sequence" aria-label="Drawing workspace interaction sequence">
              {toolsDrawingStates.map((state, index) => (
                <div className="tools-drawing-step" key={state.label}>
                  <figure className="tools-drawing-state">
                    <figcaption><span>{state.number}</span>{state.label}</figcaption>
                    <CaseStudyImage src={`${assetRoot}/${state.image}`} alt={`${state.number}. ${state.label}`} />
                  </figure>
                  {index < toolsDrawingStates.length - 1 ? (
                    <ArrowRight className="tools-drawing-arrow" aria-hidden="true" weight="thin" />
                  ) : null}
                </div>
              ))}
            </div>

            <div className="tools-drawing-tool-row" aria-label="Drawing workspace editing tools">
              {toolsDrawingTools.map((tool) => (
                <figure className="tools-drawing-tool" key={tool.label}>
                  <CaseStudyImage src={`${assetRoot}/${tool.image}`} alt={tool.label} />
                </figure>
              ))}
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}

function ToolsCaptureOrganize() {
  const assetRoot = "/assets/projects/tools/capture-organize";

  return (
    <section className="tools-capture-section" aria-labelledby="tools-capture-title">
      <div className="tools-capture-shell">
        <header className="tools-capture-header">
          <p className="tools-capture-label"><span>06</span> — Capture &amp; Organize</p>
          <h2 id="tools-capture-title">
            <span>Capture every detail.</span>
            <span>Keep everything organized.</span>
          </h2>
          <p className="tools-capture-intro">
            From site photos and measurement records to structured project data, everything captured on site stays
            organized within the project.
          </p>
        </header>

        <div className="tools-capture-modules">
          <article className="tools-capture-module tools-capture-module--site">
            <div className="tools-capture-module-copy">
              <span className="tools-capture-module-number">01</span>
              <h3>Capture On Site</h3>
              <span className="tools-capture-module-accent" aria-hidden="true" />
              <p>Capture site photos, annotate dimensions and save them directly into a project.</p>
            </div>

            <div className="tools-capture-site-visual" aria-label="Take Photo, Annotate and Measure, then Save to Project">
              <figure className="tools-capture-photo-step">
                <figcaption>Take Photo</figcaption>
                <CaseStudyImage src={`${assetRoot}/photo-edit-raw.png`} alt="Raw on-site photo ready for annotation" />
              </figure>
              <ArrowRight className="tools-capture-sequence-arrow" aria-hidden="true" weight="thin" />
              <figure className="tools-capture-photo-step">
                <figcaption>Annotate &amp; Measure</figcaption>
                <CaseStudyImage src={`${assetRoot}/photo-edit-annotated.png`} alt="On-site photo annotated with dimensions" />
              </figure>
              <ArrowRight className="tools-capture-sequence-arrow" aria-hidden="true" weight="thin" />
              <figure className="tools-capture-photo-step tools-capture-photo-step--save">
                <figcaption>Saved to Project</figcaption>
                <CaseStudyImage src={`${assetRoot}/save-to-project.png`} alt="Save to project sheet for the annotated site photo" />
                <CaseStudyImage
                  className="tools-capture-create-popup"
                  src={`${assetRoot}/create-new-project-popup.png`}
                  alt="Create New Project popup available from the save flow"
                />
              </figure>
            </div>
          </article>

          <article className="tools-capture-module tools-capture-module--record">
            <div className="tools-capture-module-copy">
              <span className="tools-capture-module-number">02</span>
              <h3>Record the Data</h3>
              <span className="tools-capture-module-accent" aria-hidden="true" />
              <p>
                Measurements from devices are recorded automatically in tables. Edit, calculate and export with ease.
                No more manual transcription.
              </p>
            </div>

            <div className="tools-capture-record-visual" aria-label="Measurement data captured from a device and recorded in a form table">
              <figure className="tools-capture-device">
                <figcaption>Measurement</figcaption>
                <CaseStudyImage src={`${assetRoot}/measurement-device.png`} alt="Laser measurement device showing 3.425 meters" />
                <p>Data captured<br />from device</p>
              </figure>
              <ArrowRight className="tools-capture-record-arrow" aria-hidden="true" weight="thin" />
              <figure className="tools-capture-form-detail">
                <CaseStudyImage src={`${assetRoot}/form-table-detail.png`} alt="Form table with measurements, calculations and export controls" />
              </figure>
            </div>
          </article>

          <article className="tools-capture-module tools-capture-module--team">
            <div className="tools-capture-module-copy">
              <span className="tools-capture-module-number">03</span>
              <h3>Organize by Team</h3>
              <span className="tools-capture-module-accent" aria-hidden="true" />
              <p>Project collaboration stays visible and organized with clear member roles and invite actions.</p>
            </div>

            <div className="tools-capture-team-visual" aria-label="Team page connected to its project photos">
              <figure className="tools-capture-team-page">
                <CaseStudyImage src={`${assetRoot}/team-page.png`} alt="Project Team page with member roles and Invite Member action" />
              </figure>
              <span className="tools-capture-team-link" aria-hidden="true" />
              <figure className="tools-capture-photos-page">
                <CaseStudyImage src={`${assetRoot}/photos-page.png`} alt="Project Photos page with Take Photo and Upload Photo actions" />
              </figure>
            </div>
          </article>
        </div>

        <blockquote className="tools-capture-summary">
          <Quotes className="tools-capture-summary__quote tools-capture-summary__quote--open" aria-hidden="true" weight="fill" />
          <p>
            <span>Everything you capture on site</span>
            <span>finds its place in the <em>project</em>.</span>
          </p>
          <Quotes className="tools-capture-summary__quote tools-capture-summary__quote--close" aria-hidden="true" weight="fill" />
        </blockquote>
      </div>
    </section>
  );
}

function ToolsFinalExperience() {
  const assetRoot = "/assets/projects/tools/final-experience";

  return (
    <section className="tools-final-section" aria-labelledby="tools-final-title">
      <div className="tools-final-shell">
        <header className="tools-final-header">
          <p className="tools-final-label"><span>07</span> — Final Experience</p>
          <h2 id="tools-final-title">
            <span>One workspace.</span>
            <span>From measurement to project.</span>
          </h2>
          <p className="tools-final-intro">
            A connected experience that brings devices, floor plans, field records and project management together in
            one continuous workspace.
          </p>
        </header>

        <div className="tools-final-stage-viewport">
          <div className="tools-final-stage" aria-label="Five key MILESEEY Tools product screens">
            <figure className="tools-final-phone tools-final-phone--home">
              <CaseStudyImage src={`${assetRoot}/home.png`} alt="MILESEEY Tools Home with connected device and project actions" />
            </figure>

            <figure className="tools-final-phone tools-final-phone--overview">
              <CaseStudyImage src={`${assetRoot}/project-overview.png`} alt="New Project overview with active status and floor plan in progress" />
            </figure>

            <figure className="tools-final-phone tools-final-phone--annotation">
              <CaseStudyImage src={`${assetRoot}/photo-annotation.png`} alt="Photo annotation workspace with site dimensions and drawing tools" />
            </figure>

            <figure className="tools-final-phone tools-final-phone--device">
              <CaseStudyImage src={`${assetRoot}/device.png`} alt="My Device page with S50C and X Speaker connection actions" />
            </figure>

            <figure className="tools-final-phone tools-final-phone--photos">
              <CaseStudyImage src={`${assetRoot}/project-photos.png`} alt="Project Photos page with capture, upload and photo record actions" />
            </figure>

            <blockquote className="tools-final-summary">
              <Quotes className="tools-final-summary__quote tools-final-summary__quote--open" aria-hidden="true" weight="fill" />
              <p>
                <span>Everything comes together</span>
                <span>in one <em>connected</em> workspace.</span>
              </p>
              <Quotes className="tools-final-summary__quote tools-final-summary__quote--close" aria-hidden="true" weight="fill" />
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}

function ToolsCaseStudy({ project, onClose, onNext, active }) {
  const dialogRef = useRef(null);
  const { scrollRef, returnFromHero } = useSharedProjectDetailScroll(onClose);
  useProjectDialog(returnFromHero, dialogRef, active);

  return (
    <motion.div
      ref={dialogRef}
      className="detail-overlay tools-case-study"
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} 项目详情`}
      tabIndex={-1}
    >
      <header className="detail-nav horizon-case-nav s50c-case-nav" aria-label="项目详情导航">
        <div className="detail-nav-group">
          <button className="pill-button" type="button" onClick={returnFromHero}>/返回</button>
          <button className="pill-button" type="button" onClick={onNext}>下一个</button>
        </div>
        <div className="detail-nav-group detail-nav-group-right">
          <button className="pill-button" type="button" onClick={returnFromHero}>Chen</button>
          <a className="pill-button" href="#contact" onClick={returnFromHero}>联系</a>
          <LanguageSwitcher />
        </div>
      </header>

      <SharedProjectDetailScrollShell
        project={project}
        scrollRef={scrollRef}
        scrollClassName="tools-project-shell-scroll"
      >
          <main className="horizon-pages-scroll tools-project-scroll">
            <div className="tools-case-study-content">
              <ToolsProjectOverview />
              <ToolsUnderstandingProblem />
              <ToolsFromInsightToStructure />
              <ToolsCoreExperience />
              <ToolsMeasureSmarter />
              <ToolsCaptureOrganize />
              <ToolsFinalExperience />
            </div>
          </main>

          <aside className="horizon-project-intro" aria-label="MILESEEY Tools project information">
            <div className="horizon-project-info">
            <header className="horizon-project-info-header">
              <h2>MILESEEY TOOLS</h2>
              <p className="horizon-project-meta">[2025–2026] MOBILE MEASUREMENT &amp; PROJECT WORKSPACE</p>
              <p className="tools-project-tagline">FROM MEASUREMENT TO PROJECT.</p>
            </header>

            <section className="horizon-project-info-block">
              <h3>ROLE</h3>
              <p>UX / INTERACTION DESIGNER</p>
            </section>

            <section className="horizon-project-info-block horizon-project-info-project">
              <h3>PROJECT</h3>
              <p>
                MILESEEY Tools is a connected mobile workspace designed to bring device-based measurement,
                drawing, photo documentation and project management into one continuous workflow.
              </p>
              <p>
                I led the UX and interaction design across the core app experience, structuring device
                connection, measurement input, floor-plan drawing, photo annotation and project organization
                into a clear and flexible system. The experience was designed around multi-device workflows
                and on-site use, helping users capture the right data, understand where it comes from and keep
                measurements, drawings and photos organized within each project.
              </p>
            </section>

            </div>
          </aside>
      </SharedProjectDetailScrollShell>
    </motion.div>
  );
}

function S50CChallengePoint({ point }) {
  return (
    <article className={`s50c-challenge-point s50c-challenge-point--${point.key}`}>
      <span className="s50c-challenge-point__number">{point.number}</span>
      <div>
        <h3>{point.title}</h3>
        <p>{point.description}</p>
      </div>
    </article>
  );
}

function S50CJourneyIcon({ type }) {
  return <span className={`s50c-journey-icon s50c-journey-icon--${type}`} aria-hidden="true" />;
}

function S50CMeasurementJourney({ journey }) {
  return (
    <section className="s50c-measurement-journey" aria-labelledby="s50c-journey-title">
      <h3 id="s50c-journey-title">{journey.title}</h3>
      <div className="s50c-journey-steps">
        {journey.steps.map((step, index) => (
          <React.Fragment key={step.key}>
            <article className="s50c-journey-step">
              <S50CJourneyIcon type={step.icon} />
              <h4>{step.title}</h4>
              <p>{step.description}</p>
            </article>
            {index < journey.steps.length - 1 ? <span className="s50c-journey-arrow" aria-hidden="true">→</span> : null}
          </React.Fragment>
        ))}
      </div>
      <div className="s50c-journey-themes" aria-label={journey.themes.join(", ")}>
        {journey.themes.map((theme) => <span key={theme}>{theme}</span>)}
      </div>
    </section>
  );
}

function S50CChallengeSection() {
  const { language } = useLanguage();

  if (language === "zh") {
    const points = [
      {
        number: "01",
        key: "target",
        title: "目标可见性",
        description: "我是否正在对准正确的测量目标？",
      },
      {
        number: "02",
        key: "task",
        title: "任务复杂度",
        description: "当前测量进行到哪一步？",
      },
      {
        number: "03",
        key: "context",
        title: "测量语境",
        description: "这个数值对应的对象与含义是什么？",
      },
    ];
    const journeySteps = [
      { key: "see", title: "识别", description: "我能清楚识别目标吗？", icon: Eye },
      { key: "aim", title: "瞄准", description: "我是否对准了正确的测量点？", icon: Crosshair },
      { key: "measure", title: "测量", description: "当前测量进行到哪一步？", icon: XCircle },
      { key: "verify", title: "确认", description: "测量结果是否符合预期？", icon: CheckCircle },
      { key: "record", title: "记录", description: "之后还能理解这条数据吗？", icon: ListNumbers },
    ];

    return (
      <section
        className="s50c-overview-visual s50c-challenge-section s50c-challenge-section--zh"
        aria-labelledby="s50c-challenge-title-zh"
        data-i18n-skip
      >
        <div className="s50c-challenge-frame--zh">
          <header className="s50c-challenge-header s50c-challenge-header--zh">
            <span>02 /</span>
            <h2 id="s50c-challenge-title-zh">理解核心挑战</h2>
          </header>

          <div className="s50c-challenge-artboard s50c-challenge-artboard--zh">
            <CaseStudyImage
              className="s50c-challenge-background--zh"
              src="/assets/projects/s50c/challenge/challenge-building-background.png"
              alt="施工中的建筑场景"
            />
            <div className="s50c-challenge-shade--zh" aria-hidden="true" />
            <span className="s50c-challenge-sightline--zh" aria-hidden="true" />
            <Crosshair className="s50c-challenge-target--zh" weight="light" aria-hidden="true" />
            <CaseStudyImage
              className="s50c-challenge-product--zh"
              src="/assets/projects/s50c/challenge/challenge-hand-device.png"
              alt="手持 S50C 激光测距仪"
            />
            <CaseStudyImage
              className="s50c-challenge-measurement-ui--zh"
              src="/assets/projects/s50c/challenge/challenge-measurement-ui.png"
              alt="显示 26.445 英尺的真实设备测量界面"
            />

            <div className="s50c-challenge-points s50c-challenge-points--zh" aria-label="三项核心测量挑战">
              {points.map((point) => <S50CChallengePoint point={point} key={point.key} />)}
            </div>

            <section className="s50c-measurement-journey s50c-measurement-journey--zh" aria-labelledby="s50c-journey-title-zh">
              <header>
                <MapPin weight="regular" aria-hidden="true" />
                <h3 id="s50c-journey-title-zh">测量旅程</h3>
              </header>
              <div className="s50c-journey-steps s50c-journey-steps--zh">
                {journeySteps.map((step, index) => {
                  const JourneyIcon = step.icon;
                  return (
                    <React.Fragment key={step.key}>
                      <article className="s50c-journey-step s50c-journey-step--zh">
                        <span className="s50c-journey-icon-frame--zh" aria-hidden="true">
                          <JourneyIcon weight="light" />
                        </span>
                        <h4>{step.title}</h4>
                        <p>{step.description}</p>
                      </article>
                      {index < journeySteps.length - 1 ? (
                        <ArrowRight className="s50c-journey-arrow--zh" weight="light" aria-hidden="true" />
                      ) : null}
                    </React.Fragment>
                  );
                })}
              </div>
              <div className="s50c-journey-themes s50c-journey-themes--zh" aria-label="可见性，引导，语境">
                <span>可见性</span>
                <span>引导</span>
                <span>语境</span>
              </div>
            </section>
          </div>
        </div>
      </section>
    );
  }

  const copy = s50cCopy.challenge;

  return (
    <section className="s50c-overview-visual s50c-challenge-section" aria-labelledby="s50c-challenge-title">
      <header className="s50c-challenge-header">
        <span>{copy.section} /</span>
        <h2 id="s50c-challenge-title">{copy.title}</h2>
      </header>
      <div className="s50c-challenge-artboard">
        <CaseStudyImage
          className="s50c-challenge-scene"
          src="/assets/projects/s50c/challenge/challenge-scene-text-free.png"
          alt="A hand uses the S50C to measure a target on a building site"
        />
        <div className="s50c-challenge-points" aria-label="Key measurement challenges">
          {copy.points.map((point) => <S50CChallengePoint point={point} key={point.key} />)}
        </div>
        <S50CMeasurementJourney journey={copy.journey} />
      </div>
    </section>
  );
}

function S50CStructureCard({ group }) {
  return (
    <article className={`s50c-structure-card s50c-structure-card--${group.key}`}>
      <header>
        <span>{group.number}</span>
        <h3>{group.title}</h3>
      </header>
      <ul>
        {group.items.map((item) => <li key={item}>{item}</li>)}
      </ul>
    </article>
  );
}

function S50CStructureSection() {
  const copy = s50cCopy.structure;

  return (
    <section className="s50c-overview-visual s50c-structure-section" aria-labelledby="s50c-structure-title">
      <div className="s50c-structure-artboard">
      <header className="s50c-structure-header">
        <div><span>{copy.section} /</span><h2 id="s50c-structure-title">{copy.title}</h2></div>
        <p>{copy.introduction}</p>
      </header>

      <section className="s50c-capabilities" aria-labelledby="s50c-capabilities-title">
        <h3 id="s50c-capabilities-title">{copy.capabilitiesTitle}</h3>
        <div className="s50c-capability-grid">
          {copy.capabilities.map((capability) => (
            <figure key={capability.label}>
              <CaseStudyImage src={`/assets/projects/s50c/structure/icons/${capability.icon}`} alt="" />
              <figcaption>{capability.label}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="s50c-structure-principles" aria-labelledby="s50c-principles-title">
        <h3 id="s50c-principles-title">{copy.principlesTitle}</h3>
        {copy.principles.map((principle) => (
          <article key={principle.title}>
            <span aria-hidden="true">{principle.icon}</span>
            <div><h4>{principle.title}</h4><p>{principle.description}</p></div>
          </article>
        ))}
      </section>

      <div className="s50c-device-composite" aria-label="S50C device with active measurement interface">
        <CaseStudyImage className="s50c-device-composite__body" src="/assets/projects/s50c/structure/device-front.png" alt="S50C front product render" />
        <div className="s50c-device-composite__screen-mask">
          <CaseStudyImage className="s50c-device-composite__screen" src="/assets/projects/s50c/structure/measurement-ui.png" alt="S50C measurement interface" />
        </div>
      </div>

      <div className="s50c-structure-groups">
        {copy.groups.map((group) => <S50CStructureCard group={group} key={group.key} />)}
      </div>

      <section className="s50c-structure-logic" aria-labelledby="s50c-logic-title">
        <h3 id="s50c-logic-title">{copy.logic.title}</h3>
        <div className="s50c-logic-flow">
          {copy.logic.flow.map((item, index) => (
            <React.Fragment key={item}><span>{item}</span>{index < copy.logic.flow.length - 1 ? <b aria-hidden="true">→</b> : null}</React.Fragment>
          ))}
        </div>
        <div className="s50c-logic-columns">
          {copy.logic.columns.map((column) => (
            <article key={column.number}>
              <span>{column.number}</span>
              <h4>{column.title}</h4>
              <p>{column.description}</p>
            </article>
          ))}
        </div>
      </section>
      </div>
    </section>
  );
}

const s50cInteractionPrincipleIcons = {
  primary: Selection,
  direction: ArrowsLeftRight,
  access: Star,
};

const s50cInteractionLogicIcons = {
  input: Selection,
  state: DeviceMobile,
  feedback: CheckCircle,
};

function S50CInteractionButtonImage({ name, alt = "" }) {
  return <CaseStudyImage src={`/assets/projects/s50c/interaction/buttons/${name}.png?v=2`} alt={alt} />;
}

function S50CInteractionSection() {
  const copy = s50cCopy.interaction;

  return (
    <section className="s50c-overview-visual s50c-interaction-section" aria-labelledby="s50c-interaction-title">
      <div className="s50c-interaction-artboard">
        <header className="s50c-interaction-header">
          <div><span>{copy.section} /</span><h2 id="s50c-interaction-title">{copy.title}</h2></div>
          <p>{copy.introduction}</p>
        </header>

        <p className="s50c-interaction-intro">{copy.intro}</p>

        <article className="s50c-interaction-core">
          <h3>{copy.coreAction.title}</h3>
          <div>
            <S50CInteractionButtonImage name="measure" alt="Measure and confirm button" />
            <span><strong>{copy.coreAction.label}</strong><small>{copy.coreAction.description}</small></span>
          </div>
        </article>

        <article className="s50c-interaction-navigation">
          <h3>{copy.navigation.title}</h3>
          <div className="s50c-interaction-navigation__content">
            {copy.navigation.controls.map((control) => (
              <figure key={control.key}>
                <S50CInteractionButtonImage name={control.key} alt={`${control.label} physical button`} />
                <figcaption>{control.label}</figcaption>
              </figure>
            ))}
            <p>{copy.navigation.description}</p>
          </div>
        </article>

        <div className="s50c-interaction-device" aria-label="S50C device with 35.294 foot measurement interface">
          <CaseStudyImage className="s50c-interaction-device__body" src="/assets/projects/s50c/structure/device-front.png" alt="S50C front product render" />
          <div className="s50c-interaction-device__screen-mask">
            <CaseStudyImage className="s50c-interaction-device__screen" src="/assets/projects/s50c/interaction/measurement-ui.png" alt="S50C measurement interface showing 35.294 feet" />
          </div>
        </div>

        <svg className="s50c-interaction-connectors" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <g className="s50c-interaction-connectors__lines">
            <path className="s50c-interaction-connector s50c-interaction-connector--core" d="M 36 41 H 41 V 47.8 H 51" />
          </g>
          <g className="s50c-interaction-connectors__points">
            <circle cx="51" cy="47.8" r="0.42" />
          </g>
        </svg>

        <section className="s50c-interaction-shortcuts" aria-labelledby="s50c-shortcuts-title">
          <h3 id="s50c-shortcuts-title">{copy.shortcuts.title}</h3>
          <div>
            {copy.shortcuts.items.map((item) => (
              <article key={item.key}>
                <S50CInteractionButtonImage name={item.key} alt={`${item.title} physical button`} />
                <span><h4>{item.title}</h4><p>{item.description}</p></span>
              </article>
            ))}
          </div>
        </section>

        <section className="s50c-interaction-principles" aria-labelledby="s50c-control-principles-title">
          <h3 id="s50c-control-principles-title">{copy.principles.title}</h3>
          {copy.principles.items.map((item) => {
            const Icon = s50cInteractionPrincipleIcons[item.key];
            return <article key={item.key}><Icon aria-hidden="true" /><span><h4>{item.title}</h4><p>{item.description}</p></span></article>;
          })}
        </section>

        <section className="s50c-interaction-logic" aria-labelledby="s50c-interaction-logic-title">
          <h3 id="s50c-interaction-logic-title">{copy.logic.title}</h3>
          <div>
            {copy.logic.stages.map((stage, index) => {
              const Icon = s50cInteractionLogicIcons[stage.key];
              return (
                <React.Fragment key={stage.key}>
                  <article><h4>{stage.title}</h4><Icon aria-hidden="true" /><p>{stage.description}</p></article>
                  {index < copy.logic.stages.length - 1 ? <b aria-hidden="true">→</b> : null}
                </React.Fragment>
              );
            })}
          </div>
        </section>

      </div>
    </section>
  );
}

const s50cMeasurementBenefitIcons = {
  visible: Eye,
  aiming: Crosshair,
  result: Lightning,
};

function S50CMeasurementDevice() {
  return (
    <div className="s50c-measurement-device" aria-label="S50C device showing the camera-assisted measurement interface">
      <div className="s50c-measurement-device__canvas">
        <CaseStudyImage className="s50c-measurement-device__body" src="/assets/projects/s50c/structure/device-front.png" alt="S50C front product render" />
        <div className="s50c-measurement-device__screen-mask">
          <CaseStudyImage src="/assets/projects/s50c/measurement/camera-ui.png" alt="Camera measurement interface showing the building target" />
        </div>
      </div>
    </div>
  );
}

function S50CMeasurementExperienceSection() {
  const copy = s50cCopy.measurementExperience;

  return (
    <section className="s50c-overview-visual s50c-measurement-section" aria-labelledby="s50c-measurement-title">
      <div className="s50c-measurement-artboard">
        <header className="s50c-measurement-header">
          <div><span>{copy.section} /</span><h2 id="s50c-measurement-title">{copy.title}</h2></div>
          <p>{copy.introduction}</p>
        </header>

        <p className="s50c-measurement-intro">{copy.intro}</p>

        <div className="s50c-measurement-flow" aria-label="Target, measure, and verify flow">
          {copy.steps.map((step, index) => (
            <React.Fragment key={step.key}>
              <article className="s50c-measurement-step">
                <header><span>{step.number}</span><h3>{step.title}</h3></header>
                <p>{step.description}</p>
                <CaseStudyImage src={`/assets/projects/s50c/measurement/${step.image}`} alt={step.alt} />
              </article>
              {index < copy.steps.length - 1 ? <ArrowRight className="s50c-measurement-flow__arrow" aria-hidden="true" /> : null}
            </React.Fragment>
          ))}
        </div>

        <div className="s50c-measurement-details">
          <section className="s50c-camera-assisted" aria-label="Camera-assisted measurement">
            <div className="s50c-camera-assisted__content">
              <S50CMeasurementDevice />
              <div className="s50c-camera-benefits">
                {copy.cameraAssisted.benefits.map((benefit) => {
                  const Icon = s50cMeasurementBenefitIcons[benefit.key];
                  return <article key={benefit.key}><Icon aria-hidden="true" /><div><h4>{benefit.title}</h4><p>{benefit.description}</p></div></article>;
                })}
              </div>
            </div>
          </section>

          <section className="s50c-measurement-feedback" aria-label="Measurement feedback">
            <div className="s50c-feedback-states">
              {copy.feedback.states.map((state, index) => (
                <React.Fragment key={state.key}>
                  <article><h4>{state.title}</h4><p>{state.description}</p><CaseStudyImage src={`/assets/projects/s50c/measurement/${state.image}`} alt={state.alt} /></article>
                  {index < copy.feedback.states.length - 1 ? <ArrowRight aria-hidden="true" /> : null}
                </React.Fragment>
              ))}
            </div>
          </section>
        </div>

      </div>
    </section>
  );
}

function S50CFinalExperienceSection() {
  const copy = s50cCopy.finalExperience;
  const screenByKey = Object.fromEntries(copy.screens.map((screen) => [screen.key, screen]));
  const renderScreen = (key) => {
    const screen = screenByKey[key];
    return (
      <figure className={`s50c-final-screen s50c-final-screen--${key}`} key={key}>
        <CaseStudyImage src={`/assets/projects/s50c/final-experience/${screen.image}`} alt={screen.alt} />
      </figure>
    );
  };

  return (
    <section className="s50c-overview-visual s50c-final-section" aria-labelledby="s50c-final-title">
      <header className="s50c-final-header">
        <div><span>{copy.section} /</span><h2 id="s50c-final-title">{copy.title}</h2></div>
        <p>{copy.introduction}</p>
        <p>{copy.description}</p>
      </header>

      <div className="s50c-final-showcase" aria-label="S50C final interface showcase">
        <div className="s50c-final-row s50c-final-row--primary">
          {renderScreen("camera")}
          {renderScreen("single")}
          {renderScreen("menu")}
          {renderScreen("indirect")}
        </div>
        <div className="s50c-final-row s50c-final-row--secondary">
          {renderScreen("continuous")}
          {renderScreen("special")}
          {renderScreen("settings")}
          {renderScreen("history")}
        </div>
      </div>
    </section>
  );
}

function S50CProjectOverview({ project, onClose, onNext, active }) {
  const dialogRef = useRef(null);
  const { scrollRef, returnFromHero } = useSharedProjectDetailScroll(onClose);
  useProjectDialog(returnFromHero, dialogRef, active);

  return (
    <motion.div
      ref={dialogRef}
      className="detail-overlay horizon-case-study s50c-case-study"
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} 项目概述`}
      tabIndex={-1}
    >
      <header className="detail-nav horizon-case-nav s50c-case-nav" aria-label="项目详情导航">
        <div className="detail-nav-group">
          <button className="pill-button" type="button" onClick={returnFromHero}>/返回</button>
          <button className="pill-button" type="button" onClick={onNext}>下一个</button>
        </div>
        <div className="detail-nav-group detail-nav-group-right">
          <button className="pill-button" type="button" onClick={returnFromHero}>Chen</button>
          <a className="pill-button" href="#contact" onClick={returnFromHero}>联系</a>
          <LanguageSwitcher />
        </div>
      </header>

      <SharedProjectDetailScrollShell
        project={project}
        scrollRef={scrollRef}
        scrollClassName="s50c-project-scroll"
        caseClassName="s50c-overview-layout"
      >
          <main className="s50c-pages-scroll" aria-label="MILESEEY S50C portfolio sections">
          <section className="s50c-overview-visual s50c-hero-section" aria-label="MILESEEY S50C project visual">
            <div className="s50c-hero-artboard">
              <CaseStudyImage
                className="s50c-project-visual"
                src="/assets/projects/s50c/hero/reference-v2.png"
                alt="MILESEEY S50C portfolio hero with product render, measurement interfaces, and core features"
              />
              <h2 className="s50c-hero-title" aria-label="MILESEEY S50C">MILESEEY S50C</h2>
            </div>
          </section>

          <S50CChallengeSection />

          <S50CStructureSection />

          <S50CInteractionSection />

          <S50CMeasurementExperienceSection />

          <S50CFinalExperienceSection />
          </main>

          <aside className="horizon-project-intro s50c-project-intro" aria-label="MILESEEY S50C project information">
            <div className="horizon-project-info s50c-project-info">
            <header className="horizon-project-info-header">
              <h2><span>MILESEEY</span><span>S50C</span></h2>
              <p className="horizon-project-meta">[2025] EMBEDDED MEASUREMENT SYSTEM</p>
            </header>

            <section className="horizon-project-info-block">
              <h3>ROLE</h3>
              <p>UX / INTERACTION DESIGNER</p>
            </section>

            <section className="horizon-project-info-block horizon-project-info-project">
              <h3>PROJECT</h3>
              <p>
                MILESEEY S50C is a camera-assisted laser measurement system designed to make
                long-range targeting, measurement and record review clearer and more reliable.
              </p>
              <p>
                I led the UX and interaction design across the embedded device experience,
                structuring camera-assisted targeting, measurement flows, P2P guidance, records
                and device settings into a clear and consistent interface system. The experience
                was designed around physical-button input, limited screen space and outdoor
                measurement conditions, helping users complete complex tasks with fewer steps and
                clearer feedback.
              </p>
            </section>
            </div>
          </aside>
      </SharedProjectDetailScrollShell>
    </motion.div>
  );
}

function StandardProjectDetail({ project, onClose, onNext, active }) {
  const dialogRef = useRef(null);
  useProjectDialog(onClose, dialogRef, active);

  return (
    <motion.div
      ref={dialogRef}
      className="detail-overlay"
      style={{ "--detail-bg": project.detailBackground }}
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} 项目详情`}
      tabIndex={-1}
    >
      <header className="detail-nav" aria-label="项目详情导航">
        <div className="detail-nav-group">
          <button className="pill-button" type="button" onClick={onClose}>
            /返回
          </button>
          <button className="pill-button" type="button" onClick={onNext}>
            下一个
          </button>
        </div>
        <div className="detail-nav-group detail-nav-group-right">
          <button className="pill-button" type="button" onClick={onClose}>
            Chen
          </button>
          <a className="pill-button" href="#contact" onClick={onClose}>
            联系
          </a>
          <LanguageSwitcher />
        </div>
      </header>

      <div className="detail-scroll">
        <div className="detail-layout">
          <div className={`detail-media-column ${project.mediaClass}`}>
            {project.gallery.map((item, index) => (
              <motion.figure
                className="detail-media-frame"
                key={item.src}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-8% 0px" }}
                transition={{ duration: 0.5, delay: index === 0 ? 0.08 : 0 }}
              >
                <CaseStudyImage src={item.src} alt={item.alt} loading={index === 0 ? "eager" : "lazy"} />
                <figcaption>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <span>{item.alt}</span>
                </figcaption>
              </motion.figure>
            ))}
          </div>

          <aside className="detail-copy">
            <p className="detail-kicker">
              {project.year} · {project.type}
            </p>
            <h2>
              {project.displayLines.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </h2>

            <dl className="detail-facts">
              <div>
                <dt>角色</dt>
                <dd>{project.role}</dd>
              </div>
              <div>
                <dt>项目</dt>
                <dd>{project.description}</dd>
              </div>
              <div>
                <dt>关键约束与取舍</dt>
                <dd>{project.decision}</dd>
              </div>
              <div>
                <dt>技能与交付</dt>
                <dd>{project.deliverables}</dd>
              </div>
            </dl>

            <div className="detail-index" aria-label={`第 ${project.face + 1} 个项目，共 3 个`}>
              {String(project.face + 1).padStart(2, "0")} / 03
            </div>
          </aside>
        </div>
      </div>
    </motion.div>
  );
}

export function ProjectDetail({ project, onClose, onNext, active = true }) {
  if (project.id === "ag1") {
    return <HorizonCaseStudy project={project} onClose={onClose} onNext={onNext} active={active} />;
  }

  if (project.id === "tools") {
    return <ToolsCaseStudy project={project} onClose={onClose} onNext={onNext} active={active} />;
  }

  if (project.id === "s50c") {
    return <S50CProjectOverview project={project} onClose={onClose} onNext={onNext} active={active} />;
  }

  return <StandardProjectDetail project={project} onClose={onClose} onNext={onNext} active={active} />;
}
