import React from "react";
import {
  ArrowRight,
  Browser,
  CheckCircle,
  Cube,
  EnvelopeSimple,
  Lightbulb,
  MagnifyingGlass,
  Note,
  Phone,
  Stack,
  UsersThree,
} from "@phosphor-icons/react";
import { useLanguage } from "../i18n/LanguageContext";
import { DetailControls } from "./DetailControls";

const whatIDo = [
  {
    icon: UsersThree,
    zh: { title: "用户研究", lines: ["从真实需求中", "发现问题与机会"] },
    en: { title: "User Research", lines: ["Discover needs, problems", "and opportunities"] },
  },
  {
    icon: Stack,
    zh: { title: "交互设计", lines: ["梳理信息结构", "与核心流程"] },
    en: { title: "Interaction Design", lines: ["Shape information systems", "and core flows"] },
  },
  {
    icon: Cube,
    zh: { title: "AI 辅助原型", lines: ["借助 AI 工具", "加速探索与验证"] },
    en: { title: "AI Prototyping", lines: ["Use AI to accelerate", "exploration and validation"] },
  },
  {
    icon: Browser,
    zh: { title: "UI 设计", lines: ["在细节与视觉中", "完成清晰表达"] },
    en: { title: "UI Design", lines: ["Create clarity through", "visual detail"] },
  },
];

const journey = [
  {
    date: "2016.09 – 2020.07",
    zh: { title: ["南京传媒学院"], role: "视觉传达设计" },
    en: { title: ["Nanjing University", "of Media and Communication"], role: "Visual Communication Design" },
    active: true,
  },
  {
    date: "2023.09 – 2024.11",
    zh: { title: ["Goldsmiths,", "University of London"], role: "用户体验工程" },
    en: { title: ["Goldsmiths,", "University of London"], role: "User Experience Engineering" },
  },
  {
    date: "2024.07 – 2024.10",
    zh: { title: ["Soleil Ski App", "Experience Redesign"], role: "UX 设计师" },
    en: { title: ["Soleil Ski App", "Experience Redesign"], role: "UX Designer" },
  },
  {
    date: "2024.10 – 2025.01",
    zh: { title: ["Tesla 特斯拉"], role: "交互设计实习生" },
    en: { title: ["Tesla"], role: "Interaction Design Intern" },
  },
  {
    date: "2025.06 – Present",
    zh: { title: ["深圳市迈测科技", "股份有限公司"], role: "交互设计师" },
    en: { title: ["Shenzhen Mileseey", "Technology Co., Ltd."], role: "Interaction Designer" },
    active: true,
  },
];

const workflow = [
  { icon: MagnifyingGlass, title: "Research", zh: "信息整理 / 需求洞察", en: "Synthesis / User insights" },
  { icon: Lightbulb, title: "Explore", zh: "机会定义 / 方案探索", en: "Opportunity / Exploration" },
  { icon: Note, title: "Prototype", zh: "快速原型 / 交互验证", en: "Rapid prototypes / Testing" },
  { icon: CheckCircle, title: "Validate", zh: "方案迭代 / 沟通交付", en: "Iteration / Delivery" },
];

const tools = [
  "Figma",
  "Photoshop",
  "Illustrator",
  "Axure",
  "Adobe XD",
  "ChatGPT",
  "Codex",
  "React",
  "Embedded UI",
  "Mobile App",
  "AR / HUD",
  "User Research",
  "Interaction Design",
  "Prototyping",
  "AI-Assisted Design",
];

const copy = {
  zh: {
    intro: [
      "你好，我是严琛。",
      "我在不同设备与场景之间设计体验，",
      "希望让技术的使用过程更自然、更清晰，也更贴近真实的人。",
    ],
    supporting: "拥有交互设计 / UX 背景，持续在真实场景中探索更顺畅的体验方式。",
    sideNote: ["设计让复杂的技术", "更接近真实的人。"],
    headings: ["我在做什么", "成长经历", "AI 在我的工作流程中", "工具与关键词", "联系我"],
    captions: [
      "从问题出发，创造更好的使用体验。",
      "持续学习，在不同的阶段探索更大的可能。",
      "让 AI 成为更高效的设计伙伴。",
      "合适的工具，更好地实现想法。",
      "如果你想聊设计、项目合作，或新的机会，欢迎联系我。",
    ],
    email: "邮箱",
    phone: "电话",
  },
  en: {
    intro: [
      "Hello, I’m Yan Chen.",
      "I design experiences across devices and contexts,",
      "making technology feel more natural, clear, and human.",
    ],
    supporting: "With a background in interaction design and UX, I explore smoother experiences in real contexts.",
    sideNote: ["Design brings complex technology", "closer to real people."],
    headings: ["我在做什么", "成长经历", "AI 在我的工作流程中", "工具与关键词", "联系我"],
    captions: [
      "Start with the problem. Create a better experience.",
      "Keep learning and explore wider possibilities at every stage.",
      "Make AI a more effective design partner.",
      "The right tools help ideas become real.",
      "For design, collaboration, or new opportunities, let’s talk.",
    ],
    email: "Email",
    phone: "Phone",
  },
};

function SectionHeading({ id, number, title, titleZh, caption }) {
  return (
    <header className="about-section-heading">
      <div className="about-section-title-row">
        <span className="about-section-number">{number}</span>
        <span className="about-section-rule" aria-hidden="true" />
        <h2 id={id}>{title}</h2>
        <span className="about-section-title-zh">/ {titleZh}</span>
      </div>
      <p>{caption}</p>
    </header>
  );
}

function IconBadge({ icon: Icon }) {
  return (
    <span className="about-icon-badge" aria-hidden="true">
      <Icon size={31} weight="regular" />
    </span>
  );
}

export function AboutPage({ onBack, onNext, onContact, isContactOpen }) {
  const { language } = useLanguage();
  const locale = language === "en" ? "en" : "zh";
  const text = copy[locale];

  return (
    <>
      <DetailControls
        className="horizon-case-nav"
        onBack={onBack}
        onNext={onNext}
        onContact={onContact}
        isContactOpen={isContactOpen}
      />
      <main className={`about-page about-page--${locale}`} aria-label="About Me" data-i18n-skip>
      <div className="about-page-canvas">
        <section className="about-intro" aria-labelledby="about-intro-title">
          <div className="about-intro-copy">
            <p className="about-identity"><strong>严琛</strong><span>/</span>Yan Chen</p>
            <h1 id="about-intro-title">
              {text.intro.map((line) => <span key={line}>{line}</span>)}
            </h1>
            <span className="about-intro-accent" aria-hidden="true" />
            <p className="about-intro-supporting">{text.supporting}</p>
          </div>
          <aside className="about-intro-decoration" aria-hidden="true">
            <div className="about-decor-note"><i />{text.sideNote.map((line) => <span key={line}>{line}</span>)}</div>
            <div className="about-decor-english"><b>/</b><span>DESIGN<br />FOR A MORE<br />INTELLIGENT<br />EVERYDAY</span></div>
            <div className="about-decor-orbit"><i />INTERACTION · DESIGN</div>
          </aside>
        </section>

        <section className="about-section about-what" aria-labelledby="about-what-title">
          <SectionHeading id="about-what-title" number="01" title="What I Do" titleZh={text.headings[0]} caption={text.captions[0]} />
          <div className="about-what-grid">
            {whatIDo.map((item) => {
              const itemCopy = item[locale];
              return (
                <article className="about-what-card" key={item.en.title}>
                  <IconBadge icon={item.icon} />
                  <h3>{itemCopy.title}</h3>
                  <p>{itemCopy.lines.map((line) => <span key={line}>{line}</span>)}</p>
                </article>
              );
            })}
          </div>
        </section>

        <section className="about-section about-journey" aria-labelledby="about-journey-title">
          <SectionHeading id="about-journey-title" number="02" title="Journey" titleZh={text.headings[1]} caption={text.captions[1]} />
          <ol className="about-timeline">
            {journey.map((item, index) => {
              const itemCopy = item[locale];
              return (
                <li className={item.active ? "is-active" : ""} key={`${item.date}-${index}`}>
                  <span className="about-timeline-index">{String(index + 1).padStart(2, "0")}</span>
                  <time>{item.date}</time>
                  <span className="about-timeline-dot" aria-hidden="true" />
                  <h3>{itemCopy.title.map((line) => <span key={line}>{line}</span>)}</h3>
                  <p>{itemCopy.role}</p>
                </li>
              );
            })}
          </ol>
        </section>

        <section className="about-section about-ai" aria-labelledby="about-ai-title">
          <SectionHeading id="about-ai-title" number="03" title="AI in My Workflow" titleZh={text.headings[2]} caption={text.captions[2]} />
          <ol className="about-workflow">
            {workflow.map((item, index) => (
              <React.Fragment key={item.title}>
                <li>
                  <IconBadge icon={item.icon} />
                  <h3>{item.title}</h3>
                  <p>{item[locale]}</p>
                </li>
                {index < workflow.length - 1 ? <ArrowRight className="about-workflow-arrow" size={25} weight="thin" aria-hidden="true" /> : null}
              </React.Fragment>
            ))}
          </ol>
          <div className="about-ai-toolrail" aria-label="AI workflow tools">ChatGPT <span>·</span> Codex <span>·</span> Figma <span>·</span> React</div>
        </section>

        <section className="about-section about-tools" aria-labelledby="about-tools-title">
          <SectionHeading id="about-tools-title" number="04" title="Tools & Keywords" titleZh={text.headings[3]} caption={text.captions[3]} />
          <ul className="about-tag-list">
            {tools.map((tool) => <li key={tool}>{tool}</li>)}
          </ul>
        </section>

        <section className="about-section about-contact" aria-labelledby="about-contact-title">
          <SectionHeading id="about-contact-title" number="05" title="Contact Me" titleZh={text.headings[4]} caption={text.captions[4]} />
          <div className="about-contact-grid">
            <a className="about-contact-card" href="mailto:yanchen04112023@163.com">
              <IconBadge icon={EnvelopeSimple} />
              <span><strong>{text.email}</strong><em>yanchen04112023@163.com</em></span>
            </a>
            <a className="about-contact-card" href="tel:+8613966222278">
              <IconBadge icon={Phone} />
              <span><strong>{text.phone}</strong><em>+86 13966222278</em></span>
            </a>
          </div>
        </section>

        <footer className="about-footer">
          <span>INTERACTION DESIGNER&nbsp;&nbsp;·&nbsp;&nbsp;PORTFOLIO</span>
          <span><i aria-hidden="true" />THANK YOU FOR VISITING</span>
        </footer>
      </div>
      </main>
    </>
  );
}
