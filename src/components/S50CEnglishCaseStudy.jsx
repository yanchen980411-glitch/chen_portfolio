import React from "react";
import {
  ArrowRight,
  ArrowsClockwise,
  Blueprint,
  Camera,
  CheckCircle,
  ClockCounterClockwise,
  Crosshair,
  DeviceMobile,
  Eye,
  FileText,
  FloppyDisk,
  FolderOpen,
  Gear,
  HandTap,
  Heart,
  Lightbulb,
  Lightning,
  ListNumbers,
  MagnifyingGlassPlus,
  MapPin,
  Mountains,
  Pulse,
  Quotes,
  Ruler,
  Selection,
  ShareNetwork,
  Stack,
  UsersThree,
  XCircle,
} from "@phosphor-icons/react";
import {
  s50cEnContent,
  s50cEnPageSequence as s50cEnPageOrder,
} from "../content/s50cEnContent";
import "./S50CEnglishCaseStudy.css";

const iconByName = {
  "arrows-clockwise": ArrowsClockwise,
  blueprint: Blueprint,
  camera: Camera,
  "check-circle": CheckCircle,
  "clock-counter-clockwise": ClockCounterClockwise,
  crosshair: Crosshair,
  "device-mobile": DeviceMobile,
  eye: Eye,
  "file-text": FileText,
  "floppy-disk": FloppyDisk,
  "folder-open": FolderOpen,
  gear: Gear,
  "hand-tap": HandTap,
  heart: Heart,
  lightbulb: Lightbulb,
  lightning: Lightning,
  "list-numbers": ListNumbers,
  "magnifying-glass-plus": MagnifyingGlassPlus,
  "map-pin": MapPin,
  mountains: Mountains,
  pulse: Pulse,
  ruler: Ruler,
  selection: Selection,
  "share-network": ShareNetwork,
  stack: Stack,
  "x-circle": XCircle,
};

function iconFor(name, fallback = FileText) {
  return iconByName[name] ?? fallback;
}

function CaseStudyImage({ loading = "lazy", decoding = "async", ...props }) {
  return <img loading={loading} decoding={decoding} {...props} />;
}

function LineBreaks({ lines }) {
  return lines.map((line, index) => (
    <React.Fragment key={`${line}-${index}`}>
      {line}
      {index < lines.length - 1 ? <br /> : null}
    </React.Fragment>
  ));
}

function S50COverviewInsightEn({ title, Icon, children, className = "" }) {
  return (
    <section className={`s50c-overview-insight--zh ${className}`.trim()}>
      <header>
        <Icon weight="light" aria-hidden="true" />
        <h3>{title}</h3>
      </header>
      {children}
    </section>
  );
}

function S50COverviewSectionEn() {
  const page = s50cEnContent.pages["01"];

  return (
    <section
      className="s50c-overview-visual s50c-overview-section--zh s50c-overview-section--en"
      aria-labelledby="s50c-overview-title-en"
      data-s50c-en-page="01"
      data-i18n-skip
      lang="en"
    >
      <div className="s50c-overview-artboard--zh">
        <CaseStudyImage className="s50c-overview-background--zh" src={page.backgroundImage} alt="" />
        <span className="s50c-overview-background-shade--zh" aria-hidden="true" />

        <div className="s50c-overview-primary--zh">
          <div className="s50c-overview-story--zh">
            <header className="s50c-overview-title--zh">
              <div><span>01 /</span><h2 id="s50c-overview-title-en">{page.title}</h2></div>
              <h3>{page.statement.join(" ")}</h3>
            </header>

            <div className="s50c-overview-copy--zh">
              {page.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>

            <div className="s50c-overview-features--zh" aria-label="Three project qualities">
              {page.features.map((feature) => {
                const FeatureIcon = iconFor(feature.icon, Ruler);
                return (
                  <article key={feature.key}>
                    <header>
                      <FeatureIcon weight="light" aria-hidden="true" />
                      <small>{feature.number}</small>
                    </header>
                    <h4>{feature.title}</h4>
                    <p>{feature.description}</p>
                  </article>
                );
              })}
            </div>
          </div>

          <aside className="s50c-overview-insights--zh" aria-label="Project background, design challenges, and core value">
            <S50COverviewInsightEn title={page.projectBackground.title} Icon={FileText} className="s50c-overview-background-copy--zh">
              <p>{page.projectBackground.description}</p>
            </S50COverviewInsightEn>

            <S50COverviewInsightEn title={page.designChallenges.title} Icon={Crosshair}>
              <ul>{page.designChallenges.items.map((item) => <li key={item}>{item}</li>)}</ul>
            </S50COverviewInsightEn>

            <S50COverviewInsightEn title={page.coreValue.title} Icon={Lightning}>
              <ul>{page.coreValue.items.map((item) => <li key={item}>{item}</li>)}</ul>
            </S50COverviewInsightEn>
          </aside>
        </div>

        <section className="s50c-overview-scenarios--zh" aria-labelledby="s50c-overview-scenarios-title-en">
          <header>
            <h3 id="s50c-overview-scenarios-title-en">{page.useCases.title}</h3>
            <span>{page.useCases.kicker}</span>
          </header>
          <div>
            {page.useCases.scenarios.map((scenario) => (
              <article className={`s50c-overview-scenario--zh s50c-overview-scenario--${scenario.key}--zh`} key={scenario.key}>
                <CaseStudyImage src={scenario.image} alt={scenario.alt} />
                <h4>{scenario.title}</h4>
                <p>{scenario.description}</p>
              </article>
            ))}

            <aside className="s50c-overview-users--zh" aria-labelledby="s50c-overview-users-title-en">
              <header><UsersThree weight="light" aria-hidden="true" /><h3 id="s50c-overview-users-title-en">{page.typicalUsers.title}</h3></header>
              <blockquote>
                <Quotes weight="fill" aria-hidden="true" />
                <p>{page.typicalUsers.quote}</p>
              </blockquote>
              <div>
                {page.typicalUsers.groups.map((group) => (
                  <p key={group.title}><strong>{group.title}</strong><span>{group.description}</span></p>
                ))}
              </div>
            </aside>
          </div>
        </section>

        <div className="s50c-overview-details--zh">
          <section aria-labelledby="s50c-overview-role-title-en">
            <h3 id="s50c-overview-role-title-en">{page.role.title}</h3>
            <h4>{page.role.label}</h4>
            <ul>{page.role.items.map((item) => <li key={item}>{item}</li>)}</ul>
          </section>

          <section aria-labelledby="s50c-overview-goals-title-en">
            <h3 id="s50c-overview-goals-title-en">{page.goals.title}</h3>
            <ul className="s50c-overview-goals--zh">
              {page.goals.items.map((item) => (
                <li key={item}><CheckCircle weight="light" aria-hidden="true" /><span>{item}</span></li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="s50c-overview-keywords-title-en">
            <h3 id="s50c-overview-keywords-title-en">{page.keywords.title}</h3>
            <div className="s50c-overview-keywords--zh">
              {page.keywords.items.map((item) => <span key={item}>{item}</span>)}
            </div>
          </section>
        </div>

      </div>
    </section>
  );
}

function S50CFieldConstraintEn({ item }) {
  const Icon = iconFor(item.icon, Mountains);

  return (
    <article className="s50c-field-context-constraint--zh">
      <span className="s50c-field-context-constraint-icon--zh" aria-hidden="true">
        <Icon weight="light" />
      </span>
      <div className="s50c-field-context-constraint-copy--zh">
        <h4>{item.title}</h4>
        <p>{item.description}</p>
      </div>
      <div className="s50c-field-context-constraint-meta--zh">
        <strong>{item.number}</strong>
        <span><LineBreaks lines={item.meta} /></span>
      </div>
    </article>
  );
}

function S50CFieldContextSectionEn() {
  const page = s50cEnContent.pages["02"];
  const [measurementValue, measurementUnit] = page.scene.measurement.split(/\s+/);

  return (
    <section
      className="s50c-overview-visual s50c-field-context-section--zh s50c-field-context-section--en"
      aria-labelledby="s50c-field-context-title-en"
      data-s50c-en-page="02"
      data-i18n-skip
      lang="en"
    >
      <div className="s50c-field-context-artboard--zh">
        <header className="s50c-field-context-header--zh">
          <div className="s50c-field-context-heading--zh">
            <div>
              <span>02 /</span>
              <h2 id="s50c-field-context-title-en">{page.title}</h2>
            </div>
            <h3>{page.subtitle}</h3>
          </div>
          <p>{page.introduction}</p>
        </header>

        <div className="s50c-field-context-body--zh">
          <div className="s50c-field-context-media--zh">
            <figure className="s50c-field-context-scene--zh">
              <CaseStudyImage src={page.scene.image} alt={page.scene.alt} />
              <span className="s50c-field-context-scene-shade--zh" aria-hidden="true" />
              <figcaption>
                <strong>{page.scene.statement}</strong>
                <span><LineBreaks lines={page.scene.kicker} /></span>
              </figcaption>
              <div className="s50c-field-context-measurement--zh" aria-label={`${page.scene.measurement} measurement illustration`}>
                <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                  <polyline points="20,88 20,26 70,48 70,84" />
                  <rect x="18.8" y="24.2" width="2.5" height="3.7" />
                  <rect x="18.8" y="86.1" width="2.5" height="3.7" />
                  <rect x="68.8" y="46.2" width="2.5" height="3.7" />
                  <rect x="68.8" y="82.1" width="2.5" height="3.7" />
                </svg>
                <span>{measurementValue} <small>{measurementUnit}</small></span>
              </div>
            </figure>

            <div className="s50c-field-context-thumbnails--zh" aria-label="Three representative measurement settings">
              {page.scenarios.map((scenario) => (
                <figure key={scenario.key} className={`s50c-field-context-thumbnail--zh s50c-field-context-thumbnail--${scenario.key}--zh`}>
                  <CaseStudyImage src={scenario.image} alt={scenario.alt} />
                  <figcaption>
                    <small>{scenario.number}</small>
                    <strong>{scenario.title}</strong>
                    <span>{scenario.description}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>

          <section className="s50c-field-context-constraints--zh" aria-labelledby="s50c-field-context-constraints-title-en">
            <header>
              <h3 id="s50c-field-context-constraints-title-en">{page.constraints.title}</h3>
              <span aria-hidden="true" />
              <small><LineBreaks lines={page.constraints.kicker} /></small>
            </header>
            <div>
              {page.constraints.items.map((item) => <S50CFieldConstraintEn key={item.number} item={item} />)}
            </div>
          </section>
        </div>

        <section className="s50c-field-context-inputs--zh" aria-labelledby="s50c-field-context-inputs-title-en">
          <header>
            <h3 id="s50c-field-context-inputs-title-en">{page.designInputs.title}</h3>
            <span>{page.designInputs.kicker}</span>
          </header>
          <div>
            {page.designInputs.items.map((item) => {
              const Icon = iconFor(item.icon, Crosshair);
              return (
                <article key={item.number} className="s50c-field-context-input--zh">
                  <Icon weight="light" aria-hidden="true" />
                  <div>
                    <small>{item.number}</small>
                    <h4>{item.title}</h4>
                    <p>{item.description}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

      </div>
    </section>
  );
}

function S50CTaskJourneySectionEn() {
  const page = s50cEnContent.pages["03"];

  return (
    <section
      className="s50c-overview-visual s50c-task-journey-section--zh s50c-task-journey-section--en"
      aria-labelledby="s50c-task-journey-title-en"
      data-s50c-en-page="03"
      data-i18n-skip
      lang="en"
    >
      <div className="s50c-task-journey-artboard--zh">
        <header className="s50c-task-journey-header--zh">
          <div>
            <span>03 /</span>
            <h2 id="s50c-task-journey-title-en">{page.title}</h2>
          </div>
          <h3>{page.subtitle}</h3>
          <p>{page.introduction}</p>
        </header>

        <ol className="s50c-task-journey-steps--zh" aria-label="Five stages in a field measurement task">
          {page.steps.map((step, index) => (
            <li className={`s50c-task-journey-step--zh s50c-task-journey-step--${step.key}--zh`} key={step.number}>
              <header>
                <span>{step.number}</span>
                <h3>{step.title}</h3>
              </header>
              <p>{step.description}</p>

              <figure className={`s50c-task-journey-visual--zh s50c-task-journey-visual--${step.visualType}--zh`}>
                <CaseStudyImage src={step.image} alt={step.alt} />
                {step.visualType === "scene" ? (
                  <span className="s50c-task-journey-target--zh" aria-hidden="true">
                    <Crosshair weight="light" />
                  </span>
                ) : null}
              </figure>

              <div className="s50c-task-journey-keywords--zh">
                {step.keywords.map((keyword) => {
                  const Icon = iconFor(keyword.icon, Crosshair);
                  return <span key={keyword.label}><Icon weight="light" aria-hidden="true" />{keyword.label}</span>;
                })}
              </div>

              {index < page.steps.length - 1 ? (
                <>
                  <ArrowRight className="s50c-task-journey-arrow--header--zh" weight="regular" aria-hidden="true" />
                  <ArrowRight className="s50c-task-journey-arrow--media--zh" weight="regular" aria-hidden="true" />
                </>
              ) : null}
            </li>
          ))}
        </ol>

        <section className="s50c-task-journey-considerations--zh" aria-labelledby="s50c-task-journey-considerations-title-en">
          <header>
            <h3 id="s50c-task-journey-considerations-title-en">{page.considerations.title}</h3>
            <span><LineBreaks lines={page.considerations.kicker} /></span>
          </header>
          <div className="s50c-task-journey-consideration-rail--zh">
            <CaseStudyImage
              className="s50c-task-journey-consideration-backdrop--zh"
              src={page.considerations.backdrop}
              alt=""
              aria-hidden="true"
            />
            {page.considerations.items.map((item) => {
              const Icon = iconFor(item.icon, Lightbulb);
              return (
                <article className={`s50c-task-journey-consideration--zh s50c-task-journey-consideration--${item.key}--zh`} key={item.key}>
                  <Icon weight="light" aria-hidden="true" />
                  <div>
                    <h4>{item.title}</h4>
                    <p>{item.description}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

      </div>
    </section>
  );
}

function S50CChallengePointEn({ point }) {
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

function S50CChallengeSectionEn() {
  const page = s50cEnContent.pages["04"];

  return (
    <section
      className="s50c-overview-visual s50c-challenge-section s50c-challenge-section--zh s50c-challenge-section--en"
      aria-labelledby="s50c-challenge-title-en"
      data-s50c-en-page="04"
      data-i18n-skip
      lang="en"
    >
      <div className="s50c-challenge-frame--zh">
        <header className="s50c-challenge-header s50c-challenge-header--zh">
          <span>04 /</span>
          <h2 id="s50c-challenge-title-en">{page.title}</h2>
        </header>

        <div className="s50c-challenge-artboard s50c-challenge-artboard--zh">
          <CaseStudyImage className="s50c-challenge-background--zh" src={page.assets.background.image} alt={page.assets.background.alt} />
          <div className="s50c-challenge-shade--zh" aria-hidden="true" />
          <span className="s50c-challenge-sightline--zh" aria-hidden="true" />
          <Crosshair className="s50c-challenge-target--zh" weight="light" aria-hidden="true" />
          <CaseStudyImage className="s50c-challenge-product--zh" src={page.assets.product.image} alt={page.assets.product.alt} />
          <CaseStudyImage className="s50c-challenge-measurement-ui--zh" src={page.assets.measurementUi.image} alt={page.assets.measurementUi.alt} />

          <div className="s50c-challenge-points s50c-challenge-points--zh" aria-label="Three core measurement challenges">
            {page.challenges.map((point) => <S50CChallengePointEn point={point} key={point.key} />)}
          </div>

          <section className="s50c-measurement-journey s50c-measurement-journey--zh" aria-labelledby="s50c-journey-title-en">
            <header>
              <MapPin weight="regular" aria-hidden="true" />
              <h3 id="s50c-journey-title-en">{page.journey.title}</h3>
            </header>
            <div className="s50c-journey-steps s50c-journey-steps--zh">
              {page.journey.steps.map((step, index) => {
                const JourneyIcon = iconFor(step.icon, Eye);
                return (
                  <React.Fragment key={step.key}>
                    <article className="s50c-journey-step s50c-journey-step--zh">
                      <span className="s50c-journey-icon-frame--zh" aria-hidden="true">
                        <JourneyIcon weight="light" />
                      </span>
                      <h4>{step.title}</h4>
                      <p>{step.description}</p>
                    </article>
                    {index < page.journey.steps.length - 1 ? (
                      <ArrowRight className="s50c-journey-arrow--zh" weight="light" aria-hidden="true" />
                    ) : null}
                  </React.Fragment>
                );
              })}
            </div>
            <div className="s50c-journey-themes s50c-journey-themes--zh" aria-label={page.journey.themes.join(", ")}>
              {page.journey.themes.map((theme) => <span key={theme}>{theme}</span>)}
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}

function S50CStructureCardEn({ group }) {
  const GroupIcon = iconFor(group.icon, Ruler);

  return (
    <article className={`s50c-structure-card--zh s50c-structure-card--${group.key}--zh`}>
      <header>
        <span>{group.number}</span>
        <h3>{group.title}</h3>
      </header>
      <div className="s50c-structure-card-columns--zh">
        {group.columns.map((column, index) => (
          <ul key={`${group.key}-${index}`}>
            {column.map((item) => <li key={item}>{item}</li>)}
          </ul>
        ))}
      </div>
      <GroupIcon className="s50c-structure-card-icon--zh" weight="light" aria-hidden="true" />
    </article>
  );
}

function S50CStructureSectionEn() {
  const page = s50cEnContent.pages["05"];

  return (
    <section
      className="s50c-overview-visual s50c-structure-section s50c-structure-section--zh s50c-structure-section--en"
      aria-labelledby="s50c-structure-title-en"
      data-s50c-en-page="05"
      data-i18n-skip
      lang="en"
    >
      <div className="s50c-structure-artboard s50c-structure-artboard--zh">
        <Blueprint className="s50c-structure-blueprint--zh" weight="thin" aria-hidden="true" />
        <span className="s50c-structure-watermark--zh" aria-hidden="true">S50C</span>

        <header className="s50c-structure-header--zh">
          <div>
            <span>05 /</span>
            <h2 id="s50c-structure-title-en">{page.title}</h2>
          </div>
          <p>{page.introduction}</p>
        </header>

        <section className="s50c-capabilities--zh" aria-labelledby="s50c-capabilities-title-en">
          <h3 id="s50c-capabilities-title-en">{page.capabilities.title}</h3>
          <div className="s50c-capability-grid--zh">
            {page.capabilities.items.map((capability) => (
              <figure key={capability.key}>
                <CaseStudyImage src={`${page.assets.iconRoot}/${capability.icon}`} alt="" />
                <figcaption>{capability.label}</figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section className="s50c-structure-principles--zh" aria-labelledby="s50c-principles-title-en">
          <h3 id="s50c-principles-title-en">{page.principles.title}</h3>
          <div className="s50c-principle-list--zh">
            {page.principles.items.map((principle) => {
              const PrincipleIcon = iconFor(principle.icon, Crosshair);
              return (
                <article className="s50c-principle-card--zh" key={principle.key}>
                  <span className="s50c-principle-icon--zh" aria-hidden="true">
                    <PrincipleIcon weight="light" />
                  </span>
                  <div>
                    <h4>{principle.title}</h4>
                    <p>{principle.description}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <div className="s50c-device-stage--en">
          <div className="s50c-device-composite s50c-device-composite--zh" aria-label="S50C device with an active measurement interface">
            <CaseStudyImage className="s50c-device-composite__body" src={page.assets.device.image} alt={page.assets.device.alt} />
            <div className="s50c-device-composite__screen-mask">
              <CaseStudyImage className="s50c-device-composite__screen" src={page.assets.measurementUi.image} alt={page.assets.measurementUi.alt} />
            </div>
          </div>
        </div>

        <div className="s50c-structure-groups--zh" aria-label="S50C functional structure">
          {page.groups.map((group) => <S50CStructureCardEn group={group} key={group.key} />)}
        </div>

        <section className="s50c-structure-logic--zh" aria-labelledby="s50c-logic-title-en">
          <h3 id="s50c-logic-title-en">{page.experienceStructure.title}</h3>
          <div className="s50c-logic-stages--zh" aria-label="Experience flow from core task to configuration">
            {page.experienceStructure.stages.map((stage) => <span key={stage}>{stage}</span>)}
          </div>
          <div className="s50c-logic-nodes--zh">
            {page.experienceStructure.nodes.map((item, index) => {
              const LogicIcon = iconFor(item.icon, MapPin);
              return (
                <React.Fragment key={item.number}>
                  <article className="s50c-logic-node--zh">
                    <span className="s50c-logic-icon--zh" aria-hidden="true"><LogicIcon weight="light" /></span>
                    <h4><b>{item.number}</b> {item.title}</h4>
                    <p>{item.description}</p>
                  </article>
                  {index < page.experienceStructure.nodes.length - 1 ? (
                    <ArrowRight className="s50c-logic-arrow--zh" weight="light" aria-hidden="true" />
                  ) : null}
                </React.Fragment>
              );
            })}
          </div>
        </section>
      </div>
    </section>
  );
}

function S50CInteractionModuleHeadingEn({ id, title, description }) {
  return (
    <header className="s50c-interaction-module-heading--zh">
      <div><h3 id={id}>{title}</h3><span aria-hidden="true" /></div>
      <p>{description}</p>
    </header>
  );
}

function S50CInteractionSectionEn() {
  const page = s50cEnContent.pages["06"];

  return (
    <section
      className="s50c-overview-visual s50c-interaction-section s50c-interaction-section--zh s50c-interaction-section--en"
      aria-labelledby="s50c-interaction-title-en"
      data-s50c-en-page="06"
      data-i18n-skip
      lang="en"
    >
      <div className="s50c-interaction-artboard s50c-interaction-artboard--zh">
        <header className="s50c-interaction-header--zh">
          <div>
            <span>06 /</span>
            <h2 id="s50c-interaction-title-en">{page.title}</h2>
          </div>
          <p>{page.subtitle}</p>
          <small>{page.introduction}</small>
        </header>

        <div className="s50c-interaction-primary--zh">
          <article className="s50c-interaction-core--zh" aria-labelledby="s50c-core-title-en">
            <S50CInteractionModuleHeadingEn id="s50c-core-title-en" title={page.coreAction.title} description={page.coreAction.description} />
            <div className="s50c-interaction-key-card--zh s50c-interaction-key-card--measure--zh">
              <CaseStudyImage src={page.coreAction.button.image} alt={page.coreAction.button.alt} />
              <div>
                <h4>{page.coreAction.label}</h4>
                <p>{page.coreAction.body}</p>
              </div>
            </div>
          </article>

          <article className="s50c-interaction-navigation--zh" aria-labelledby="s50c-navigation-title-en">
            <S50CInteractionModuleHeadingEn id="s50c-navigation-title-en" title={page.navigation.title} description={page.navigation.description} />
            <div className="s50c-interaction-key-card--zh s50c-interaction-nav-card--zh">
              {page.navigation.controls.map((control) => (
                <figure key={control.key}>
                  <CaseStudyImage src={control.image} alt={control.alt} />
                  <figcaption>
                    <h4>{control.label}</h4>
                    <p>{control.description}</p>
                  </figcaption>
                </figure>
              ))}
            </div>
          </article>
        </div>

        <section className="s50c-interaction-shortcuts--zh" aria-labelledby="s50c-shortcuts-title-en">
          <S50CInteractionModuleHeadingEn id="s50c-shortcuts-title-en" title={page.shortcuts.title} description={page.shortcuts.description} />
          <div className="s50c-interaction-shortcut-list--zh">
            {page.shortcuts.items.map((item) => (
              <article key={item.key}>
                <CaseStudyImage src={item.image} alt={item.alt} />
                <div><h4>{item.title}</h4><p>{item.description}</p></div>
              </article>
            ))}
          </div>
        </section>

        <section className="s50c-interaction-flow--zh" aria-labelledby="s50c-flow-title-en">
          <S50CInteractionModuleHeadingEn id="s50c-flow-title-en" title={page.controlFlow.title} description={page.controlFlow.description} />
          <div className="s50c-interaction-flow-list--zh">
            {page.controlFlow.stages.map((stage, index) => {
              const StageIcon = iconFor(stage.icon, Selection);
              return (
                <React.Fragment key={stage.key}>
                  <article>
                    <header><span>{stage.number}</span><h4>{stage.title}</h4></header>
                    <StageIcon weight="light" aria-hidden="true" />
                    <p>{stage.description}</p>
                  </article>
                  {index < page.controlFlow.stages.length - 1 ? (
                    <ArrowRight className="s50c-interaction-flow-arrow--zh" weight="light" aria-hidden="true" />
                  ) : null}
                </React.Fragment>
              );
            })}
          </div>
        </section>

        <section className="s50c-interaction-principles--zh" aria-labelledby="s50c-control-principles-title-en">
          <S50CInteractionModuleHeadingEn
            id="s50c-control-principles-title-en"
            title={page.designPrinciples.title}
            description={page.designPrinciples.description}
          />
          <div className="s50c-interaction-principle-list--zh">
            {page.designPrinciples.items.map((item) => {
              const PrincipleIcon = iconFor(item.icon, Lightning);
              return (
                <article key={item.key}>
                  <PrincipleIcon weight="light" aria-hidden="true" />
                  <h4>{item.title}</h4>
                  <p>{item.description}</p>
                </article>
              );
            })}
          </div>
        </section>
      </div>
    </section>
  );
}

function S50CMeasurementModuleHeadingEn({ number, title, core, description, id }) {
  return (
    <header className="s50c-measurement-module-heading--zh">
      <div><span>{number}</span><h3 id={id}>{title}</h3><i aria-hidden="true" /></div>
      <strong>{core}</strong>
      <p>{description}</p>
    </header>
  );
}

function S50CMeasurementExperienceSectionEn() {
  const page = s50cEnContent.pages["07"];
  const accuracy = page.modules.find((module) => module.key === "accuracy");
  const stability = page.modules.find((module) => module.key === "stability");
  const context = page.modules.find((module) => module.key === "context");

  return (
    <section
      className="s50c-overview-visual s50c-measurement-section s50c-measurement-section--zh s50c-measurement-section--en"
      aria-labelledby="s50c-measurement-title-en"
      data-s50c-en-page="07"
      data-i18n-skip
      lang="en"
    >
      <div className="s50c-measurement-artboard s50c-measurement-artboard--zh">
        <CaseStudyImage className="s50c-measurement-ambient-building--zh" src={page.ambient.image} alt={page.ambient.alt} />
        <div className="s50c-measurement-ambient-axis--zh" aria-hidden="true">
          <span>{page.ambient.measurement}</span><i /><b />
        </div>

        <header className="s50c-measurement-header--zh">
          <div><span>07 /</span><h2 id="s50c-measurement-title-en">{page.title}</h2></div>
          <p>{page.subtitle}</p>
          <small>{page.introduction}</small>
        </header>

        <div className="s50c-measurement-modules--zh">
          <article className="s50c-measurement-accuracy--zh" aria-labelledby="s50c-accuracy-title-en">
            <S50CMeasurementModuleHeadingEn
              number={accuracy.number}
              title={accuracy.title}
              core={accuracy.core}
              description={accuracy.description}
              id="s50c-accuracy-title-en"
            />
            <div className="s50c-measurement-accuracy-content--zh">
              <CaseStudyImage className="s50c-measurement-camera-ui--zh" src={accuracy.image} alt={accuracy.alt} />
              <div className="s50c-measurement-point-list--zh">
                {accuracy.points.map((point) => {
                  const PointIcon = iconFor(point.icon, Crosshair);
                  return (
                    <article key={point.key}>
                      <span><PointIcon weight="light" aria-hidden="true" /></span>
                      <div><h4>{point.title}</h4><p>{point.description}</p></div>
                    </article>
                  );
                })}
              </div>
            </div>
          </article>

          <article className="s50c-measurement-stability--zh" aria-labelledby="s50c-stability-title-en">
            <S50CMeasurementModuleHeadingEn
              number={stability.number}
              title={stability.title}
              core={stability.core}
              description={stability.description}
              id="s50c-stability-title-en"
            />
            <div className="s50c-measurement-state-list--zh">
              {stability.states.map((state, index) => (
                <React.Fragment key={state.key}>
                  <figure>
                    <CaseStudyImage src={state.image} alt={state.alt} />
                    <figcaption><h4>{state.title}</h4><p>{state.description}</p></figcaption>
                  </figure>
                  {index < stability.states.length - 1 ? (
                    <ArrowRight className="s50c-measurement-state-arrow--zh" weight="light" aria-hidden="true" />
                  ) : null}
                </React.Fragment>
              ))}
            </div>
          </article>

          <article className="s50c-measurement-context--zh" aria-labelledby="s50c-context-title-en">
            <S50CMeasurementModuleHeadingEn
              number={context.number}
              title={context.title}
              core={context.core}
              description={context.description}
              id="s50c-context-title-en"
            />
            <div className="s50c-measurement-context-content--zh">
              <CaseStudyImage className="s50c-measurement-result-ui--zh" src={context.image} alt={context.alt} />
              <div className="s50c-measurement-context-list--zh">
                {context.points.map((point) => {
                  const PointIcon = iconFor(point.icon, Ruler);
                  return (
                    <article key={point.key}>
                      <span><PointIcon weight="light" aria-hidden="true" /></span>
                      <div><h4>{point.title}</h4><p>{point.description}</p></div>
                    </article>
                  );
                })}
              </div>
            </div>
          </article>
        </div>

        <section className="s50c-measurement-highlights--zh" aria-labelledby="s50c-measurement-highlights-title-en">
          <header><h3 id="s50c-measurement-highlights-title-en">{page.highlights.title}</h3><span aria-hidden="true" /></header>
          <p>{page.highlights.description}</p>
          <div>
            {page.highlights.items.map((highlight) => {
              const HighlightIcon = iconFor(highlight.icon, Eye);
              return (
                <article key={highlight.key}>
                  <HighlightIcon weight="light" aria-hidden="true" />
                  <span><h4>{highlight.title}</h4><p>{highlight.description}</p></span>
                </article>
              );
            })}
          </div>
        </section>
      </div>
    </section>
  );
}

function S50CFinalExperienceSectionEn() {
  const page = s50cEnContent.pages["08"];
  const screenByKey = Object.fromEntries(page.screens.map((screen) => [screen.key, screen]));
  const renderGroup = (group) => (
    <section
      className={`s50c-final-group--zh s50c-final-group--zh-${group.key}`}
      aria-label={`${group.label} interfaces`}
      key={group.key}
    >
      <header><span>{group.label}</span><i aria-hidden="true" /></header>
      <div>
        {group.screens.map((key) => {
          const screen = screenByKey[key];
          return (
            <figure className={`s50c-final-screen--zh s50c-final-screen--zh-${key}`} key={key}>
              <CaseStudyImage src={screen.src} alt={screen.alt} />
            </figure>
          );
        })}
      </div>
    </section>
  );

  return (
    <section
      className="s50c-overview-visual s50c-final-section s50c-final-section--zh s50c-final-section--en"
      aria-labelledby="s50c-final-title-en"
      data-s50c-en-page="08"
      data-i18n-skip
      lang="en"
    >
      <div className="s50c-final-artboard--zh">
        <header className="s50c-final-header--zh">
          <div><span>08</span><b>/</b><h2 id="s50c-final-title-en">{page.title}</h2></div>
          <p>{page.statement}</p>
          <small>{page.description}</small>
        </header>

        <div className="s50c-final-gallery--zh" aria-label="S50C final interface system">
          <div className="s50c-final-gallery-row--zh s50c-final-gallery-row--zh-primary">
            {page.groups.slice(0, 2).map(renderGroup)}
          </div>
          <div className="s50c-final-gallery-row--zh s50c-final-gallery-row--zh-secondary">
            {page.groups.slice(2).map(renderGroup)}
          </div>
        </div>
      </div>
    </section>
  );
}

const pageComponentByKey = {
  "01": S50COverviewSectionEn,
  "02": S50CFieldContextSectionEn,
  "03": S50CTaskJourneySectionEn,
  "04": S50CChallengeSectionEn,
  "05": S50CStructureSectionEn,
  "06": S50CInteractionSectionEn,
  "07": S50CMeasurementExperienceSectionEn,
  "08": S50CFinalExperienceSectionEn,
};

export const s50cEnPageSequence = s50cEnPageOrder.map((key) => ({
  key,
  title: s50cEnContent.pages[key].title,
  component: pageComponentByKey[key],
}));

export function S50CEnglishCaseStudy() {
  return (
    <div className="s50c--en" data-s50c-en-case-study lang="en">
      {s50cEnPageSequence.map((page) => {
        const PageComponent = page.component;
        return <PageComponent key={page.key} />;
      })}
    </div>
  );
}

export default S50CEnglishCaseStudy;
