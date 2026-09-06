import React from "react";
import { ArrowRight, Lightbulb } from "@phosphor-icons/react";
import { motion, useReducedMotion } from "motion/react";
import { useLanguage } from "../i18n/LanguageContext";
import "./ToolsCompetitiveAnalysis.css";
import {
  toolsCompetitiveAnalysisCopy,
  toolsCompetitiveCapabilityStates,
} from "../content/toolsCompetitiveAnalysisCopy";

function localeClasses(locale, className) {
  return `${className} ${className}--${locale}`;
}

function CompetitiveBlueprint({ locale }) {
  return (
    <svg
      className={localeClasses(locale, "tools-competitive__blueprint")}
      viewBox="0 0 920 520"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
    >
      <g fill="none" vectorEffect="non-scaling-stroke">
        <path d="M74 113H344V63H581V113H829V405H694V457H437V408H74Z" />
        <path d="M344 113V246H217V408M581 113V272H694V405M437 246V408" />
        <path d="M74 245H217M217 246h220M437 272h257" />
        <path d="M316 63v50M608 113v55M694 349h135" />
        <path d="M344 198a48 48 0 0 1 48 48M581 222a50 50 0 0 0 50 50M437 342a66 66 0 0 1 66 66" />
        <path d="M54 88H849M50 433H860M100 40V478M804 37V475" strokeDasharray="4 9" />
        <path d="M74 89V61M344 55V35M581 55V35M829 89V61M49 113H25M49 408H25" />
        <path d="M74 48H344M344 22H581M581 48H829M14 113V408" />
      </g>
    </svg>
  );
}

function AccentHeadline({ lines, locale }) {
  return lines.map((line, index) => {
    const isLast = index === lines.length - 1;
    const punctuation = isLast ? line.slice(-1) : "";
    const hasAccent = isLast && (punctuation === "." || punctuation === "。");
    const content = hasAccent ? line.slice(0, -1) : line;

    return (
      <React.Fragment key={line}>
        <span className={localeClasses(locale, "tools-competitive__headline-line")}>
          {content}
          {hasAccent ? (
            <span className={localeClasses(locale, "tools-competitive__headline-accent")}>
              {punctuation}
            </span>
          ) : null}
        </span>
        {!isLast ? " " : null}
      </React.Fragment>
    );
  });
}

function ProductImage({ image, className, locale }) {
  return (
    <img
      className={`${localeClasses(locale, "tools-competitive__product-image")} ${className || ""}`.trim()}
      src={image.src}
      alt={image.alt || ""}
      width={image.width}
      height={image.height}
      loading="lazy"
      decoding="async"
    />
  );
}

export function ToolsCompetitiveAnalysis() {
  const { language } = useLanguage();
  const locale = language === "en" ? "en" : "zh";
  const copy = toolsCompetitiveAnalysisCopy[locale];
  const reducedMotion = useReducedMotion();
  const pageData = locale === "en"
    ? { "data-tools-en-page": "02" }
    : { "data-tools-zh-page": "02" };

  const reveal = (delay = 0, distance = 18) => (
    reducedMotion
      ? {}
      : {
          initial: { opacity: 0, y: distance },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, amount: 0.14 },
          transition: { duration: 0.62, delay, ease: [0.22, 1, 0.36, 1] },
        }
  );

  return (
    <motion.section
      id={`tools-competitive-analysis--${locale}`}
      className={`tools-competitive tools-competitive--${locale}`}
      data-i18n-skip
      lang={locale === "en" ? "en" : "zh-CN"}
      aria-labelledby={`tools-competitive-title--${locale}`}
      {...pageData}
    >
      <CompetitiveBlueprint locale={locale} />

      <div className={localeClasses(locale, "tools-competitive__artboard")}>
        <motion.header
          className={localeClasses(locale, "tools-competitive__header")}
          {...reveal(0)}
        >
          <div
            className={localeClasses(locale, "tools-competitive__marker")}
            role="group"
            aria-label={`${copy.number} / ${copy.sectionTitle}`}
          >
            <span>{copy.number}</span>
            <b
              className={localeClasses(locale, "tools-competitive__marker-slash")}
              aria-hidden="true"
            >
              /
            </b>
            <strong>{copy.sectionTitle}</strong>
            <i aria-hidden="true" />
          </div>

          <h2
            id={`tools-competitive-title--${locale}`}
            className={localeClasses(locale, "tools-competitive__headline")}
          >
            <AccentHeadline lines={copy.headline} locale={locale} />
          </h2>

          <p className={localeClasses(locale, "tools-competitive__intro")}>
            {copy.intro}
          </p>
        </motion.header>

        <div
          className={localeClasses(locale, "tools-competitive__cards")}
          role="group"
          aria-label={locale === "en" ? "Competitor review" : "竞品观察"}
        >
          {copy.competitors.map((competitor, competitorIndex) => (
            <motion.article
              key={competitor.id}
              className={`${localeClasses(locale, "tools-competitive__card")} tools-competitive__card--${competitor.id}`}
              {...reveal(0.08 + competitorIndex * 0.1, 22)}
            >
              <header className={localeClasses(locale, "tools-competitive__brand")}>
                <img
                  className={localeClasses(locale, "tools-competitive__brand-icon")}
                  src={competitor.icon.src}
                  alt=""
                  width={competitor.icon.width}
                  height={competitor.icon.height}
                  loading="lazy"
                  decoding="async"
                  aria-hidden="true"
                />
                <strong>{competitor.brand}</strong>
              </header>

              <div className={localeClasses(locale, "tools-competitive__gallery")}>
                {competitor.screenshots.map((image, imageIndex) => (
                  <figure
                    key={image.src}
                    className={`${localeClasses(locale, "tools-competitive__screen")} tools-competitive__screen--${imageIndex + 1}`}
                  >
                    <ProductImage image={image} locale={locale} />
                  </figure>
                ))}
              </div>

              <div className={localeClasses(locale, "tools-competitive__analysis")}>
                <h3>
                  <span>{competitor.brand}</span>
                  <span aria-hidden="true">｜</span>
                  <span>{competitor.positioning}</span>
                </h3>
                <p>{competitor.description}</p>
              </div>
            </motion.article>
          ))}
        </div>

        <div className={localeClasses(locale, "tools-competitive__synthesis")}>
          <motion.div
            className={localeClasses(locale, "tools-competitive__matrix-wrap")}
            {...reveal(0.18)}
          >
            <table
              className={localeClasses(locale, "tools-competitive__matrix")}
              aria-label={copy.matrixAria}
            >
              <thead>
                <tr>
                  <th scope="col">{copy.dimensionLabel}</th>
                  {copy.competitors.map((competitor) => (
                    <th scope="col" key={competitor.id}>{competitor.brand}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {copy.dimensions.map((dimension, rowIndex) => (
                  <tr key={dimension}>
                    <th scope="row">{dimension}</th>
                    {copy.competitors.map((competitor, columnIndex) => {
                      const state = toolsCompetitiveCapabilityStates[competitor.id][rowIndex];
                      const stateLabel = copy.legend[state];

                      return (
                        <td key={competitor.id} data-label={competitor.brand}>
                          <span className={localeClasses(locale, "tools-competitive__mobile-product")}>
                            {competitor.brand}
                          </span>
                          <motion.span
                            className={`${localeClasses(locale, "tools-competitive__matrix-mark")} tools-competitive__matrix-mark--${state}`}
                            title={stateLabel}
                            {...(
                              reducedMotion
                                ? {}
                                : {
                                    initial: { opacity: 0, scale: 0.7 },
                                    whileInView: { opacity: 1, scale: 1 },
                                    viewport: { once: true, amount: 0.4 },
                                    transition: {
                                      duration: 0.35,
                                      delay: 0.02 * (rowIndex * copy.competitors.length + columnIndex),
                                    },
                                  }
                            )}
                          >
                            <span className={localeClasses(locale, "tools-competitive__sr")}>
                              {competitor.brand}: {stateLabel}
                            </span>
                          </motion.span>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>

            <div
              className={localeClasses(locale, "tools-competitive__legend")}
              role="group"
              aria-label={copy.legend.label}
            >
              {(["core", "supported", "none"]).map((state) => (
                <span key={state}>
                  <i className={`tools-competitive__legend-mark tools-competitive__legend-mark--${state}`} aria-hidden="true" />
                  {copy.legend[state]}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.aside
            className={localeClasses(locale, "tools-competitive__opportunity")}
            {...reveal(0.38, 20)}
          >
            <div className={localeClasses(locale, "tools-competitive__opportunity-icon")} aria-hidden="true">
              <Lightbulb size={30} weight="regular" />
            </div>
            <div className={localeClasses(locale, "tools-competitive__opportunity-copy")}>
              <h3>{copy.opportunityLabel}</h3>
              <p>{copy.opportunity}</p>
            </div>
            <ArrowRight
              className={localeClasses(locale, "tools-competitive__opportunity-arrow")}
              size={32}
              weight="light"
              aria-hidden="true"
            />
          </motion.aside>
        </div>

        <motion.footer
          className={localeClasses(locale, "tools-competitive__handoff")}
          {...reveal(0.5, 12)}
        >
          <i aria-hidden="true" />
          <strong>{copy.handoff}</strong>
        </motion.footer>
      </div>
    </motion.section>
  );
}

export default ToolsCompetitiveAnalysis;
