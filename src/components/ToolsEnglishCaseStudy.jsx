import React from "react";
import { motion } from "motion/react";
import "./ToolsEnglishCaseStudy.css";
import {
  Blueprint,
  BluetoothConnected,
  Camera,
  Cube,
  DeviceMobile,
  DotsThree,
  FilePdf,
  FileText,
  FileXls,
  FolderOpen,
  Info,
  Ruler,
  Stack,
  User,
  UsersThree,
} from "@phosphor-icons/react";
import { toolsCaseCopyEn } from "../content/toolsCaseCopyEn";

function CaseStudyImage({ loading = "lazy", decoding = "async", ...props }) {
  return React.createElement("img", { loading, decoding, ...props });
}

function enClasses(...classNames) {
  return classNames
    .filter(Boolean)
    .flatMap((className) => (
      className.endsWith("--zh")
        ? [className, className.replace(/--zh$/, "--en")]
        : [className]
    ))
    .join(" ");
}

function AccentSentence({ text }) {
  const hasPeriod = text.endsWith(".");
  const sentence = hasPeriod ? text.slice(0, -1) : text;
  return (
    <>
      {sentence}
      {hasPeriod ? <span aria-hidden="true">.</span> : null}
    </>
  );
}

const toolsProblemFloorImagesEn = [
  { src: "/assets/projects/tools/measure-smarter/drawing-state-02.png", width: 133, height: 270 },
  { src: "/assets/projects/tools/measure-smarter/drawing-state-03.png", width: 134, height: 270 },
  { src: "/assets/projects/tools/measure-smarter/drawing-state-05.png", width: 137, height: 270 },
];

const toolsProblemFloorsEn = toolsCaseCopyEn.problem.flow.project.floors.map((floor, index) => ({
  ...floor,
  ...toolsProblemFloorImagesEn[index],
}));

const toolsProblemMembersEn = toolsCaseCopyEn.problem.flow.project.members.map((label, index) => ({
  label,
  tone: ["blue", "teal", "violet"][index],
}));

const toolsProblemPhotosEn = [
  {
    src: "/assets/projects/tools/capture-organize/photo-edit-raw.png",
    width: 393,
    height: 852,
    alt: "Interior renovation Site Photo",
    position: "interior",
  },
  {
    src: "/assets/projects/s50c/context/concrete-site.png",
    width: 1536,
    height: 1024,
    alt: "Concrete construction Site Photo",
    position: "concrete",
  },
  {
    src: "/assets/projects/s50c/challenge/challenge-building-background.png",
    width: 1448,
    height: 1086,
    alt: "Building construction Site Photo",
    position: "building",
  },
];

export function ToolsProjectOverviewEn() {
  const copy = toolsCaseCopyEn.overview;

  return (
    <section
      className={enClasses("tools-project-overview--zh")}
      data-tools-en-page="01"
      data-i18n-skip
      lang="en"
      aria-labelledby="tools-project-overview-title--en"
    >
      <div className={enClasses("tools-project-overview__artboard--zh")}>
        <header
          className={enClasses("tools-project-overview__marker--zh")}
          aria-label={`${copy.number} ${copy.sectionTitle}`}
        >
          <span>{copy.number}</span>
          <strong>{copy.sectionTitle.toUpperCase()}</strong>
          <i aria-hidden="true" />
        </header>

        <div className={enClasses("tools-project-overview__copy--zh")}>
          <h2 id="tools-project-overview-title--en">
            <span><AccentSentence text={copy.headline} /></span>
          </h2>

          <div className={enClasses("tools-project-overview__body--zh")}>
            {copy.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>

          <div className={enClasses("tools-project-overview__shift--zh")}>
            <i aria-hidden="true" />
            <strong>{copy.shift}</strong>
            <span aria-hidden="true" />
          </div>
        </div>

        <div
          className={enClasses("tools-project-overview__visual--zh")}
          role="group"
          aria-label={copy.visualAria}
        >
          <figure className={enClasses("tools-project-overview__blueprint--zh")} aria-hidden="true">
            <CaseStudyImage src="/assets/projects/tools/floor-plan-workspace.png" alt="" width={393} height={852} />
          </figure>

          <div
            className={enClasses(
              "tools-project-overview__link--zh",
              "tools-project-overview__link--device--zh",
            )}
            aria-hidden="true"
          >
            <span><BluetoothConnected size={24} weight="regular" /></span>
          </div>

          <div
            className={enClasses(
              "tools-project-overview__link--zh",
              "tools-project-overview__link--photo--zh",
            )}
            aria-hidden="true"
          >
            <span><Camera size={23} weight="regular" /></span>
          </div>

          <figure
            className={enClasses(
              "tools-project-overview__ui--zh",
              "tools-project-overview__ui--device--zh",
            )}
          >
            <div className={enClasses("tools-project-overview__device-crop--zh")}>
              <CaseStudyImage
                src="/assets/projects/tools/tools-home-connected.png"
                alt={copy.media.deviceAlt}
                width={393}
                height={852}
              />
            </div>
          </figure>

          <figure
            className={enClasses(
              "tools-project-overview__ui--zh",
              "tools-project-overview__ui--workspace--zh",
            )}
          >
            <CaseStudyImage
              src="/assets/projects/tools/core-experience-measure-draw.png"
              alt={copy.media.workspaceAlt}
              width={705}
              height={352}
            />
          </figure>

          <figure
            className={enClasses(
              "tools-project-overview__ui--zh",
              "tools-project-overview__ui--photos--zh",
            )}
          >
            <CaseStudyImage
              src="/assets/projects/tools/core-experience-project-overview.png"
              alt={copy.media.photosAlt}
              width={614}
              height={327}
            />
          </figure>
        </div>

        <footer
          className={enClasses("tools-project-overview__meta--zh")}
          aria-label="Project role, scope, and platform"
        >
          <article>
            <UsersThree size={27} weight="regular" aria-hidden="true" />
            <div><span>{copy.meta[0].label}</span><strong>{copy.meta[0].value}</strong></div>
          </article>
          <article>
            <Stack size={27} weight="regular" aria-hidden="true" />
            <div><span>{copy.meta[1].label}</span><strong>{copy.meta[1].value}</strong></div>
          </article>
          <article>
            <DeviceMobile size={27} weight="regular" aria-hidden="true" />
            <div><span>{copy.meta[2].label}</span><strong>{copy.meta[2].value}</strong></div>
          </article>
        </footer>
      </div>
    </section>
  );
}

export function ToolsProblemSectionEn() {
  const copy = toolsCaseCopyEn.problem;

  return (
    <section
      className={enClasses("tools-problem--zh")}
      data-tools-en-page="03"
      data-i18n-skip
      lang="en"
      aria-labelledby="tools-problem-title--en"
    >
      <div className={enClasses("tools-problem__artboard--zh")}>
        <CaseStudyImage
          className={enClasses("tools-problem__blueprint--zh")}
          src="/assets/projects/tools/floor-plan-workspace.png"
          alt=""
          width={393}
          height={852}
          aria-hidden="true"
        />

        <header className={enClasses("tools-problem__header--zh")}>
          <div
            className={enClasses("tools-problem__marker--zh")}
            role="group"
            aria-label={`${copy.number} ${copy.sectionTitle}`}
          >
            <span>{copy.number}</span>
            <strong>{copy.sectionTitle}</strong>
            <i aria-hidden="true" />
          </div>

          <h2 id="tools-problem-title--en"><AccentSentence text={copy.headline} /></h2>

          <div className={enClasses("tools-problem__intro--zh")}>
            {copy.intro.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
        </header>

        <div className={enClasses("tools-problem__flow--zh")} role="group" aria-label={copy.flowAria}>
          <svg
            className={enClasses("tools-problem__connections--zh")}
            viewBox="0 0 1000 270"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <defs>
              <marker
                id="tools-problem-arrow--en"
                markerWidth="12"
                markerHeight="12"
                refX="10"
                refY="6"
                orient="auto"
                markerUnits="strokeWidth"
              >
                <path d="M1 1 L10 6 L1 11 Z" />
              </marker>
            </defs>
            <path
              className={enClasses("tools-problem__flow-line--zh")}
              d="M22 112 H975"
              markerEnd="url(#tools-problem-arrow--en)"
            />
            <path
              className={enClasses("tools-problem__warning-line--zh")}
              d="M145 112 V238 M600 112 V238 M840 112 V238"
            />
          </svg>

          <article className={enClasses("tools-problem__device--zh")}>
            <div className={enClasses("tools-problem__device-stage--zh")}>
              <CaseStudyImage
                src="/assets/projects/s50c/structure/device-front.png"
                alt={copy.flow.device.alt}
                width={3000}
                height={1788}
              />
            </div>
            <strong>{copy.flow.device.label}</strong>
          </article>

          <div
            className={enClasses(
              "tools-problem__warning--zh",
              "tools-problem__warning--ownership--zh",
            )}
          >
            <span aria-hidden="true">!</span>
            <strong>{copy.flow.ownershipWarning}</strong>
          </div>

          <article
            className={enClasses("tools-problem__project--zh")}
            aria-label="One Project containing three Floor Plans and three Members"
          >
            <header>
              <span><FolderOpen size={24} weight="fill" aria-hidden="true" /></span>
              <strong>{copy.flow.project.label}</strong>
              <DotsThree size={25} weight="bold" aria-hidden="true" />
            </header>

            <div className={enClasses("tools-problem__project-content--zh")}>
              <div className={enClasses("tools-problem__floors--zh")}>
                {toolsProblemFloorsEn.map((floor) => (
                  <figure key={floor.label}>
                    <div className={enClasses("tools-problem__floor-image--zh")}>
                      <CaseStudyImage src={floor.src} alt="" width={floor.width} height={floor.height} />
                    </div>
                    <figcaption>
                      <Stack size={16} weight="regular" aria-hidden="true" />
                      <span>{floor.label}</span>
                    </figcaption>
                  </figure>
                ))}
              </div>

              <ul className={enClasses("tools-problem__members--zh")} aria-label="Project Members">
                {toolsProblemMembersEn.map((member) => (
                  <li key={member.label}>
                    <span data-tone={member.tone}>
                      <User size={20} weight="fill" aria-hidden="true" />
                    </span>
                    <strong>{member.label}</strong>
                  </li>
                ))}
              </ul>
            </div>
          </article>

          <div
            className={enClasses(
              "tools-problem__warning--zh",
              "tools-problem__warning--permission--zh",
            )}
          >
            <span aria-hidden="true">!</span>
            <strong>{copy.flow.collaborationWarning}</strong>
          </div>

          <article className={enClasses("tools-problem__materials--zh")} aria-label={copy.flow.records.label}>
            <div className={enClasses("tools-problem__photo-stack--zh")}>
              {toolsProblemPhotosEn.map((photo, index) => (
                <figure key={photo.src} style={{ "--photo-index": index }}>
                  <CaseStudyImage
                    className={`is-${photo.position}`}
                    src={photo.src}
                    alt={photo.alt}
                    width={photo.width}
                    height={photo.height}
                  />
                </figure>
              ))}
              <strong>{copy.flow.records.sitePhotos}</strong>
            </div>
            <div className={enClasses("tools-problem__material-row--zh", "tools-problem__material-row--data--zh")}>
              <span><FileXls size={19} weight="fill" aria-hidden="true" /></span>
              <strong>{copy.flow.records.measurementData}</strong>
            </div>
            <div className={enClasses("tools-problem__material-row--zh", "tools-problem__material-row--form--zh")}>
              <span><FileText size={19} weight="fill" aria-hidden="true" /></span>
              <strong>{copy.flow.records.siteForms}</strong>
            </div>
            <span className={enClasses("tools-problem__more--zh")} role="img" aria-label={copy.flow.records.moreAria}>
              <DotsThree size={21} weight="bold" aria-hidden="true" />
            </span>
            <b>{copy.flow.records.label}</b>
          </article>

          <div
            className={enClasses(
              "tools-problem__warning--zh",
              "tools-problem__warning--manual--zh",
            )}
          >
            <span aria-hidden="true">!</span>
            <strong>{copy.flow.consolidationWarning}</strong>
          </div>

          <article
            className={enClasses("tools-problem__delivery--zh")}
            aria-label={copy.flow.delivery.deliverablesLabel}
          >
            <div className={enClasses("tools-problem__report--zh")}>
              <header>
                <FilePdf size={22} weight="fill" aria-hidden="true" />
                <strong>{copy.flow.delivery.reportLabel}</strong>
              </header>
              <figure className={enClasses("tools-problem__report-plan--zh")}>
                <CaseStudyImage
                  src="/assets/projects/tools/floor-plan-workspace.png"
                  alt={copy.flow.delivery.planAlt}
                  width={393}
                  height={852}
                />
              </figure>
              <div className={enClasses("tools-problem__report-lines--zh")} aria-hidden="true">
                <i /><i /><i /><i />
              </div>
              <div className={enClasses("tools-problem__report-photos--zh")}>
                {toolsProblemPhotosEn.map((photo) => (
                  <figure key={`report-${photo.src}`}>
                    <CaseStudyImage
                      className={`is-${photo.position}`}
                      src={photo.src}
                      alt=""
                      width={photo.width}
                      height={photo.height}
                    />
                  </figure>
                ))}
              </div>
              <span className={enClasses("tools-problem__more--zh")} role="img" aria-label={copy.flow.delivery.moreAria}>
                <DotsThree size={18} weight="bold" aria-hidden="true" />
              </span>
            </div>
            <strong>{copy.flow.delivery.deliverablesLabel}</strong>
          </article>
        </div>

        <ol className={enClasses("tools-problem__issues--zh")}>
          {copy.issues.map((issue) => (
            <li key={issue.number}>
              <div><span>{issue.number}</span><strong>{issue.title}</strong></div>
              <p>{issue.copy}</p>
            </li>
          ))}
        </ol>

        <aside className={enClasses("tools-problem__challenge--zh")} aria-label={copy.challenge.label}>
          <div className={enClasses("tools-problem__challenge-main--zh")}>
            <header><strong>{copy.challenge.label}</strong><i aria-hidden="true" /></header>
            <p>
              {copy.challenge.question.slice(0, -1)}
              <span aria-hidden="true">?</span>
            </p>
          </div>
          <div className={enClasses("tools-problem__challenge-summary--zh")}>
            {copy.challenge.summary.map((line) => <span key={line}>{line}</span>)}
          </div>
        </aside>
      </div>
    </section>
  );
}

const toolsStructurePlansEn = toolsProblemFloorsEn.map((floor, index) => ({
  ...floor,
  title: toolsCaseCopyEn.structure.canvas.plans[index].title,
  responsible: toolsCaseCopyEn.structure.canvas.plans[index].responsible,
  alt: toolsCaseCopyEn.structure.canvas.plans[index].alt,
}));

const toolsStructureTypesEn = [
  { label: toolsCaseCopyEn.structure.canvas.recordTypes[0], icon: Ruler },
  { label: toolsCaseCopyEn.structure.canvas.recordTypes[1], icon: Blueprint },
  { label: toolsCaseCopyEn.structure.canvas.recordTypes[2], icon: Camera },
  { label: toolsCaseCopyEn.structure.canvas.recordTypes[3], icon: FileText },
];

function ToolsStructureMemberEn({ member }) {
  return (
    <li>
      <span data-tone={member.tone} aria-hidden="true">
        <User size={20} weight="fill" />
      </span>
      <strong>{member.label}</strong>
    </li>
  );
}

export function ToolsStructureSectionEn() {
  const copy = toolsCaseCopyEn.structure;

  return (
    <section
      className={enClasses("tools-structure--zh")}
      data-tools-en-page="04"
      data-i18n-skip
      lang="en"
      aria-labelledby="tools-structure-title--en"
    >
      <div className={enClasses("tools-structure03__artboard--zh")}>
        <CaseStudyImage
          className={enClasses("tools-structure03__blueprint--zh")}
          src="/assets/projects/tools/floor-plan-workspace.png"
          alt=""
          width={393}
          height={852}
          aria-hidden="true"
        />

        <header
          className={enClasses("tools-structure03__marker--zh")}
          aria-label={`${copy.number} ${copy.sectionTitle}`}
        >
          <span>{copy.number}</span>
          <strong>{copy.sectionTitle}</strong>
          <i aria-hidden="true" />
        </header>

        <div className={enClasses("tools-structure03__layout--zh")}>
          <div className={enClasses("tools-structure03__narrative--zh")}>
            <h2 id="tools-structure-title--en">
              <span><AccentSentence text={copy.headline} /></span>
            </h2>

            <div className={enClasses("tools-structure03__intro--zh")}>
              {copy.intro.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>

            <ol className={enClasses("tools-structure03__principles--zh")}>
              {copy.principles.map((principle) => (
                <li key={principle.number}>
                  <span>{principle.number}</span>
                  <div>
                    <h3>{principle.title}</h3>
                    <p>{principle.copy}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className={enClasses("tools-structure03__visual--zh")} role="group" aria-label={copy.visualAria}>
            <svg
              className={enClasses("tools-structure03__connections--zh")}
              viewBox="0 0 1000 820"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <defs>
                <marker
                  id="tools-structure03-arrow--en"
                  markerWidth="10"
                  markerHeight="10"
                  refX="9"
                  refY="5"
                  orient="auto"
                  markerUnits="strokeWidth"
                >
                  <path d="M1 1 L9 5 L1 9 Z" />
                </marker>
              </defs>
              <path
                className={enClasses("tools-structure03__device-line--zh")}
                d="M54 575 H112 Q132 575 132 552 V296 Q132 275 154 275 H192"
                markerEnd="url(#tools-structure03-arrow--en)"
              />
              <path
                className={enClasses("tools-structure03__delivery-line--zh")}
                d="M842 538 H958"
                markerEnd="url(#tools-structure03-arrow--en)"
              />
            </svg>

            <figure className={enClasses("tools-structure03__device--zh")}>
              <div>
                <CaseStudyImage
                  src="/assets/projects/s50c/structure/device-front.png"
                  alt={copy.canvas.deviceData.alt}
                  width={3000}
                  height={1788}
                />
              </div>
              <figcaption>{copy.canvas.deviceData.label}</figcaption>
            </figure>

            <article
              className={enClasses("tools-structure03__project--zh")}
              aria-labelledby="tools-structure03-project-title--en"
            >
              <header className={enClasses("tools-structure03__project-bar--zh")}>
                <div className={enClasses("tools-structure03__project-name--zh")}>
                  <FolderOpen size={27} weight="fill" aria-hidden="true" />
                  <h3 id="tools-structure03-project-title--en">{copy.canvas.project.title}</h3>
                  <span><i aria-hidden="true" />{copy.canvas.project.status}</span>
                </div>
                <div className={enClasses("tools-structure03__permissions--zh")}>
                  <span>{copy.canvas.permissions.label}</span>
                  <div role="group" aria-label={copy.canvas.permissions.label}>
                    {copy.canvas.permissions.options.map((option) => (
                      <button type="button" aria-pressed={option.selected} disabled key={option.label}>
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
              </header>

              <section
                className={enClasses("tools-structure03__workspace--zh")}
                aria-labelledby="tools-structure03-workspace-title--en"
              >
                <div>
                  <h4 id="tools-structure03-workspace-title--en">{copy.canvas.workspace.title}</h4>
                  <p>{copy.canvas.workspace.description}</p>
                </div>
                <ul aria-label="Project Members">
                  {toolsProblemMembersEn.map((member) => (
                    <ToolsStructureMemberEn key={member.label} member={member} />
                  ))}
                </ul>
              </section>

              <div className={enClasses("tools-structure03__plans--zh")}>
                {toolsStructurePlansEn.map((plan, index) => (
                  <article className={index === 0 ? "is-active" : undefined} key={plan.title}>
                    <figure>
                      <CaseStudyImage src={plan.src} alt="" width={plan.width} height={plan.height} />
                    </figure>
                    <div className={enClasses("tools-structure03__plan-name--zh")}>
                      <h4>{plan.title}</h4>
                      <p>{copy.canvas.responsiblePrefix} {plan.responsible}</p>
                    </div>
                    <ul aria-label={`Records in ${plan.title}`}>
                      {toolsStructureTypesEn.map(({ label, icon: Icon }) => (
                        <li key={label}>
                          <span><Icon size={21} weight="regular" aria-hidden="true" /></span>
                          <strong>{label}</strong>
                        </li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>

              <footer className={enClasses("tools-structure03__project-note--zh")}>
                <Info size={21} weight="regular" aria-hidden="true" />
                <p>{copy.canvas.note}</p>
              </footer>
            </article>

            <aside
              className={enClasses("tools-structure03__delivery--zh")}
              aria-label={copy.canvas.deliverables.label}
            >
              <header>
                <FilePdf size={21} weight="fill" aria-hidden="true" />
                <strong>{copy.canvas.deliverables.label}</strong>
              </header>
              <figure className={enClasses("tools-structure03__delivery-plan--zh")}>
                <CaseStudyImage
                  src="/assets/projects/tools/floor-plan-workspace.png"
                  alt={copy.canvas.deliverables.planAlt}
                  width={393}
                  height={852}
                />
              </figure>
              <div className={enClasses("tools-structure03__delivery-lines--zh")} aria-hidden="true">
                <i /><i /><i />
              </div>
              <div className={enClasses("tools-structure03__delivery-photos--zh")}>
                {toolsProblemPhotosEn.map((photo) => (
                  <figure key={`structure-${photo.src}`}>
                    <CaseStudyImage
                      className={`is-${photo.position}`}
                      src={photo.src}
                      alt={photo.alt}
                      width={photo.width}
                      height={photo.height}
                    />
                  </figure>
                ))}
              </div>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
}

const toolsCoreAssetsEn = [
  {
    image: "/assets/projects/tools/core-experience/step-01-create-project.png",
    width: 393,
    height: 852,
    modifier: "create",
  },
  {
    image: "/assets/projects/tools/core-experience/step-02-select-space-source.png",
    width: 393,
    height: 852,
    modifier: "source",
  },
  {
    image: "/assets/projects/tools/core-experience/step-03-floor-plan-workspace.png",
    width: 393,
    height: 852,
    modifier: "workspace",
  },
];

const toolsCoreStepsEn = toolsCaseCopyEn.coreExperience.steps.map((step, index) => ({
  ...step,
  ...toolsCoreAssetsEn[index],
}));

export function ToolsCoreExperienceEn() {
  const copy = toolsCaseCopyEn.coreExperience;

  return (
    <section
      className={enClasses("tools-core-experience--zh")}
      data-tools-en-page="05"
      data-i18n-skip
      lang="en"
      aria-labelledby="tools-core05-title--en"
    >
      <div className={enClasses("tools-core04__artboard--zh")}>
        <svg
          className={enClasses("tools-core04__blueprint--zh")}
          viewBox="0 0 1448 1086"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
        >
          <g className={enClasses("tools-core04__blueprint-upper--zh")}>
            <path d="M822 92H1394V374H1188V256H1012V374H822Z" />
            <path d="M852 122H1362V344H1218V226H982V344H852Z" />
            <path d="M1012 92V256M1188 92V256M822 212H982M1218 212H1394" />
            <path d="M805 60H1410M805 51V69M1410 51V69M1423 92V374M1414 92H1432M1414 374H1432" />
          </g>
          <g className={enClasses("tools-core04__blueprint-lower--zh")}>
            <path d="M476 518H1054V968H790V874H624V968H476Z" />
            <path d="M514 552H1018V932H824V838H590V932H514Z" />
            <path d="M624 552V838M824 552V838M514 690H590M824 690H1018" />
            <path d="M452 1000H1076M452 989V1011M1076 989V1011" />
          </g>
        </svg>

        <header
          className={enClasses("tools-core04__marker--zh")}
          aria-label={`${copy.number} ${copy.sectionTitle}`}
        >
          <span>{copy.number}</span>
          <strong>{copy.sectionTitle}</strong>
          <i aria-hidden="true" />
        </header>

        <div className={enClasses("tools-core04__header--zh")}>
          <h2 id="tools-core05-title--en">
            <span><AccentSentence text={copy.headline} /></span>
          </h2>
          <p>{copy.intro}</p>
        </div>

        <svg
          className={enClasses("tools-core04__connections--zh")}
          viewBox="0 0 1448 1086"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path d="M99 445V459" />
          <path d="M427 445V459" />
          <path d="M758 414V429" />
          <path d="M321 459C350 459 350 396 386 396" />
          <path d="M650 459C680 459 685 366 716 366" />
          <circle cx="386" cy="396" r="7" />
          <circle cx="716" cy="366" r="7" />
        </svg>

        <div className={enClasses("tools-core04__flow--zh")} role="group" aria-label={copy.flowAria}>
          {toolsCoreStepsEn.map((step) => (
            <article
              className={enClasses(
                "tools-core04__step--zh",
                `tools-core04__step--${step.modifier}--zh`,
              )}
              key={step.number}
            >
              <header className={enClasses("tools-core04__step-heading--zh")}>
                <span>{step.number}</span>
                <h3>{step.title}</h3>
              </header>
              <figure className={enClasses("tools-core04__screen--zh")}>
                <img
                  src={step.image}
                  alt={step.alt}
                  width={step.width}
                  height={step.height}
                  loading="lazy"
                  decoding="async"
                />
              </figure>
              <p>{step.description}</p>
            </article>
          ))}

          <aside className={enClasses("tools-core04__photos--zh")}>
            <figure>
              <img
                src="/assets/projects/tools/core-experience/step-03-project-photos.png"
                alt={copy.photosSupplement.alt}
                width="393"
                height="852"
                loading="lazy"
                decoding="async"
              />
            </figure>
            <p>{copy.photosSupplement.label}</p>
          </aside>
        </div>

        <footer className={enClasses("tools-core04__summary--zh")}>
          <i aria-hidden="true" />
          <strong>{copy.summary}</strong>
        </footer>
      </div>
    </section>
  );
}

const toolsMeasureAssetsEn = [
  {
    image: "/assets/projects/tools/measure-smarter/device-switcher.png",
    width: 363,
    height: 484,
    modifier: "device",
  },
  {
    image: "/assets/projects/tools/core-experience/step-03-floor-plan-workspace.png",
    width: 393,
    height: 852,
    modifier: "workspace",
  },
  {
    image: "/assets/projects/tools/measure-smarter/measurement-calculation.png",
    width: 393,
    height: 389,
    modifier: "calculation",
  },
];

const toolsMeasureStepsEn = toolsCaseCopyEn.measure.steps.map((step, index) => ({
  ...step,
  ...toolsMeasureAssetsEn[index],
}));

export function ToolsMeasureSmarterEn() {
  const copy = toolsCaseCopyEn.measure;

  return (
    <section
      className={enClasses("tools-measure--zh")}
      data-tools-en-page="06"
      data-i18n-skip
      lang="en"
      aria-labelledby="tools-measure06-title--en"
    >
      <div className={enClasses("tools-measure05__artboard--zh")}>
        <svg
          className={enClasses("tools-measure05__blueprint--zh")}
          viewBox="0 0 1448 1086"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
        >
          <g className={enClasses("tools-measure05__blueprint-upper--zh")}>
            <path d="M842 58H1397V398H1189V275H1033V398H842Z" />
            <path d="M875 91H1364V365H1221V242H1001V365H875Z" />
            <path d="M1033 58V275M1189 58V275M842 207H1001M1221 207H1397" />
            <path d="M824 28H1415M824 18V38M1415 18V38M1426 58V398M1416 58H1436M1416 398H1436" />
          </g>
          <g className={enClasses("tools-measure05__blueprint-lower--zh")}>
            <path d="M378 486H1008V1039H753V936H567V1039H378Z" />
            <path d="M415 522H972V1001H789V900H531V1001H415Z" />
            <path d="M567 522V900M789 522V900M415 712H531M789 712H972" />
            <path d="M354 1060H1034M354 1049V1071M1034 1049V1071" />
          </g>
        </svg>

        <header
          className={enClasses("tools-measure05__marker--zh")}
          aria-label={`${copy.number} ${copy.sectionTitle}`}
        >
          <span>{copy.number}</span>
          <strong>{copy.sectionTitle}</strong>
          <i aria-hidden="true" />
        </header>

        <div className={enClasses("tools-measure05__header--zh")}>
          <h2 id="tools-measure06-title--en">
            <span><AccentSentence text={copy.headline} /></span>
          </h2>
          <p>{copy.intro}</p>
        </div>

        <svg
          className={enClasses("tools-measure05__connections--zh")}
          viewBox="0 0 1448 1086"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <defs>
            <marker
              id="tools-measure05-arrow--en"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M0 0L10 5L0 10Z" />
            </marker>
          </defs>
          <path className={enClasses("tools-measure05__connector--zh")} d="M106 393V411" />
          <path
            className={enClasses("tools-measure05__connector--zh")}
            d="M428 522C454 522 455 486 484 486"
            markerEnd="url(#tools-measure05-arrow--en)"
          />
          <path className={enClasses("tools-measure05__connector--zh")} d="M1026 397V420" />
          <path
            className={enClasses("tools-measure05__connector--zh")}
            d="M835 488C882 494 917 516 960 548"
            markerEnd="url(#tools-measure05-arrow--en)"
          />
          <path className={enClasses("tools-measure05__connector--zh")} d="M1011 514V535" />
        </svg>

        <div className={enClasses("tools-measure05__flow--zh")} role="group" aria-label={copy.flowAria}>
          {toolsMeasureStepsEn.map((step) => (
            <article
              className={enClasses(
                "tools-measure05__step--zh",
                `tools-measure05__step--${step.modifier}--zh`,
              )}
              key={step.number}
            >
              <header className={enClasses("tools-measure05__step-heading--zh")}>
                <span>{step.number}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              </header>

              <figure className={enClasses("tools-measure05__screen--zh")}>
                <img
                  src={step.image}
                  alt={step.alt}
                  width={step.width}
                  height={step.height}
                  loading="lazy"
                  decoding="async"
                />
              </figure>

              {step.modifier === "workspace" ? (
                <aside
                  className={enClasses("tools-measure05__spatial-result--zh")}
                  aria-label={copy.spatialResult.ariaLabel}
                >
                  <div>
                    <Cube aria-hidden="true" weight="regular" />
                    <strong>{copy.spatialResult.label}</strong>
                  </div>
                  <Cube aria-hidden="true" weight="thin" />
                  <p>{copy.spatialResult.description}</p>
                </aside>
              ) : null}
            </article>
          ))}
        </div>

        <footer className={enClasses("tools-measure05__summary--zh")}>
          <i aria-hidden="true" />
          <strong>{copy.summary}</strong>
        </footer>
      </div>
    </section>
  );
}

const toolsCaptureAssetsEn = [
  {
    image: "/assets/projects/tools/capture-organize/capture-photo.png",
    width: 393,
    height: 488,
    modifier: "capture",
  },
  {
    image: "/assets/projects/tools/capture-organize/photo-edit-annotated.png",
    width: 393,
    height: 852,
    modifier: "annotate",
  },
  {
    image: "/assets/projects/tools/capture-organize/save-to-project-dialog.png",
    width: 393,
    height: 540,
    modifier: "archive",
  },
];

const toolsCaptureStepsEn = toolsCaseCopyEn.capture.steps.map((step, index) => ({
  ...step,
  ...toolsCaptureAssetsEn[index],
}));

export function ToolsCaptureOrganizeEn() {
  const copy = toolsCaseCopyEn.capture;

  return (
    <section
      className={enClasses("tools-capture-organize--zh")}
      data-tools-en-page="07"
      data-i18n-skip
      lang="en"
      aria-labelledby="tools-capture07-title--en"
    >
      <div className={enClasses("tools-capture06__artboard--zh")}>
        <svg
          className={enClasses("tools-capture06__blueprint--zh")}
          viewBox="0 0 1448 1086"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
        >
          <g className={enClasses("tools-capture06__blueprint-upper--zh")}>
            <path d="M875 4H1424V398H1227V286H1090V398H940V207H875Z" />
            <path d="M916 43H1386V355H1265V247H1052V355H978V169H916Z" />
            <path d="M1090 4V286M1227 4V286M940 207H1090M1227 207H1424" />
            <path d="M851 28H1434M851 17V39M1434 17V39M1405 4V398" />
          </g>
          <g className={enClasses("tools-capture06__blueprint-lower--zh")}>
            <path d="M776 598H1440V1082H1215V952H1022V1082H776Z" />
            <path d="M819 638H1397V1041H1256V912H981V1041H819Z" />
            <path d="M1022 638V912M1215 638V952M819 820H981M1256 820H1397" />
            <path d="M750 1058H1420M750 1047V1069M1420 1047V1069" />
          </g>
        </svg>

        <header
          className={enClasses("tools-capture06__marker--zh")}
          aria-label={`${copy.number} ${copy.sectionTitle}`}
        >
          <span>{copy.number}</span>
          <strong>{copy.sectionTitle}</strong>
          <i aria-hidden="true" />
        </header>

        <div className={enClasses("tools-capture06__header--zh")}>
          <h2 id="tools-capture07-title--en">
            <span><AccentSentence text={copy.headline} /></span>
          </h2>
          <p>{copy.intro}</p>
        </div>

        <svg
          className={enClasses("tools-capture06__connections--zh")}
          viewBox="0 0 1448 1086"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path d="M407 363H470C483 363 487 370 487 384V426" />
          <circle cx="407" cy="363" r="4" />
          <circle cx="487" cy="426" r="4" />
          <path d="M899 363H924C940 363 941 373 941 388V414C941 428 948 438 964 438H991" />
          <circle cx="899" cy="363" r="4" />
          <circle cx="991" cy="438" r="4" />
        </svg>

        <div className={enClasses("tools-capture06__flow--zh")} role="group" aria-label={copy.flowAria}>
          {toolsCaptureStepsEn.map((step) => (
            <article
              className={enClasses(
                "tools-capture06__step--zh",
                `tools-capture06__step--${step.modifier}--zh`,
              )}
              key={step.number}
            >
              <header className={enClasses("tools-capture06__step-heading--zh")}>
                <span>{step.number}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              </header>

              <figure className={enClasses("tools-capture06__screen--zh")}>
                <CaseStudyImage
                  src={step.image}
                  alt={step.alt}
                  width={step.width}
                  height={step.height}
                />
              </figure>
            </article>
          ))}
        </div>

        <footer className={enClasses("tools-capture06__summary--zh")}>
          <i aria-hidden="true" />
          <strong><AccentSentence text={copy.summary} /></strong>
        </footer>
      </div>
    </section>
  );
}

const toolsFinalExperiencePanelAssetsEn = [
  {
    key: "home",
    image: "/assets/projects/tools/final-experience/home-multi-device.png",
    width: 393,
    height: 852,
    revealOrder: 0,
  },
  {
    key: "project",
    image: "/assets/projects/tools/final-experience/project-detail.png",
    width: 393,
    height: 852,
    revealOrder: 1,
  },
  {
    key: "floor-card",
    copyKey: "floorCard",
    image: "/assets/projects/tools/final-experience/floor-plan-card.png",
    width: 361,
    height: 104,
    revealOrder: 6,
  },
  {
    key: "drawing",
    image: "/assets/projects/tools/core-experience/step-03-floor-plan-workspace.png",
    width: 393,
    height: 852,
    revealOrder: 2,
  },
  {
    key: "switcher",
    image: "/assets/projects/tools/measure-smarter/device-switcher.png",
    width: 363,
    height: 484,
    revealOrder: 5,
  },
  {
    key: "measurement",
    image: "/assets/projects/tools/measure-smarter/measurement-calculation.png",
    width: 393,
    height: 389,
    revealOrder: 4,
  },
  {
    key: "collaboration",
    image: "/assets/projects/tools/final-experience/invite-collaboration.png",
    width: 393,
    height: 852,
    revealOrder: 3,
  },
];

const toolsFinalExperiencePanelsEn = toolsFinalExperiencePanelAssetsEn.map((panel) => ({
  ...panel,
  alt: toolsCaseCopyEn.finalExperience.panels[panel.copyKey || panel.key].alt,
}));

export function ToolsFinalExperienceEn() {
  const copy = toolsCaseCopyEn.finalExperience;
  const headlineLead = copy.headline.replace(/Project\.$/, "");

  return (
    <section
      className={enClasses("tools-final-experience--zh")}
      data-tools-en-page="08"
      data-i18n-skip
      lang="en"
      aria-labelledby="tools-final08-title--en"
    >
      <div className={enClasses("tools-final07__artboard--zh")}>
        <svg
          className={enClasses("tools-final07__blueprint--zh")}
          viewBox="0 0 1448 1086"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
        >
          <g className={enClasses("tools-final07__blueprint-upper--zh")}>
            <path d="M916 -12H1456V360H1332V268H1186V360H1034V207H916Z" />
            <path d="M952 26H1418V322H1368V230H1150V322H1072V168H952Z" />
            <path d="M1186 -12V268M1332 -12V268M1034 207H1186M1332 207H1456" />
            <path d="M891 8H1432M891 -4V20M1432 -4V20M1400 -12V360" />
            <path d="M991 62H1110V143H991ZM1218 79H1288V151H1218Z" />
          </g>
          <g className={enClasses("tools-final07__blueprint-lower--zh")}>
            <path d="M-40 663H634V1112H480V1004H308V1112H104V913H-40Z" />
            <path d="M0 704H594V1070H520V963H270V1070H144V875H0Z" />
            <path d="M308 704V1004M480 704V1004M144 875H308M480 875H594" />
            <path d="M-14 1088H616M-14 1076V1100M616 1076V1100" />
          </g>
          <g className={enClasses("tools-final07__blueprint-right--zh")}>
            <path d="M858 718H1510V1114H1274V992H1086V1114H858Z" />
            <path d="M902 758H1465V1072H1318V951H1042V1072H902Z" />
            <path d="M1086 758V992M1274 758V992M902 875H1042M1318 875H1465" />
          </g>
        </svg>

        <motion.header
          className={enClasses("tools-final07__header--zh")}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-8% 0px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <div
            className={enClasses("tools-final07__marker--zh")}
            role="group"
            aria-label={`${copy.number} ${copy.sectionTitle}`}
          >
            <span>{copy.number}</span>
            <strong>{copy.sectionTitle}</strong>
            <i aria-hidden="true" />
          </div>
          <h2 id="tools-final08-title--en">
            {headlineLead}
            <span className={enClasses("tools-final07__project-word--zh")}>
              Project<span>.</span>
            </span>
          </h2>
          <p>{copy.intro}</p>
        </motion.header>

        <div className={enClasses("tools-final07__stage--zh")} role="group" aria-label={copy.stageAria}>
          {toolsFinalExperiencePanelsEn.map((panel) => (
            <motion.div
              className={enClasses(
                "tools-final07__panel-motion--zh",
                `tools-final07__panel-motion--${panel.key}--zh`,
              )}
              key={panel.key}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-5% 0px" }}
              transition={{
                duration: 0.52,
                delay: 0.08 + (panel.revealOrder * 0.055),
                ease: "easeOut",
              }}
            >
              <figure
                className={enClasses(
                  "tools-final07__panel--zh",
                  `tools-final07__panel--${panel.key}--zh`,
                )}
              >
                <CaseStudyImage
                  src={panel.image}
                  alt={panel.alt}
                  width={panel.width}
                  height={panel.height}
                />
              </figure>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
