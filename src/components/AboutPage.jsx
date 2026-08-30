import React from "react";
import { LanguageSwitcher } from "../i18n/LanguageContext";

const education = [
  { date: "2023.09 — 2024.11", school: "Goldsmiths, University of London", degree: "MSc User Experience Engineering", description: "Focused on user research, UX theory, design methodology, service design methods, web, VR, AI and UX, and UI design.", courses: ["User Research", "Service Design", "UI Design", "UX Theory", "Web UX Design", "", "Design Methodology", "AI and UX"] },
  { date: "2016.09 — 2020.06", school: "Nanjing University of Media and Communication", degree: "BA Visual Communication Design", description: "Built a strong foundation in visual communication through typography, graphic design, photography, digital design, illustration, packaging, and interactive design.", courses: ["Visual Communication Design", "Photography Basics", "Packaging Design", "Typography", "Digital Design Basics", "Interaction Design", "Graphic Design", "Illustration"] },
];

const experience = [
  { date: "2025.06 — now", company: "Shenzhen Mileseey Technology Co., Ltd.", role: "Interaction Designer", lines: ["Led interaction and UI design for smart hardware products and companion digital tools.", "Conducted user research, defined interaction flows, and translated requirements into clear interface solutions.", "Created high-fidelity UI designs, specifications, and assets, and supported cross-functional collaboration with product and engineering teams.", "Improved usability and overall experience across device interfaces and connected app scenarios."] },
  { date: "2024.10 — 2025.01", company: "Tesla (China)", role: "Interaction Design Intern", lines: ["Contributed to the analysis of Model 3 target users and supported user research planning for in-car entertainment experiences.", "Collected research feedback and crafted key opportunities for interaction design improvement.", "Analyzed competitor vehicles from an interaction perspective, focusing on the center display, voice assistant, and built-in applications.", "Studied Tesla’s user interaction habits and designed low-fi, research flow, and prototype concepts for driver interface testing and information display."] },
  { date: "2021.08 — 2022.12", company: "Maikailai Technology Co., Ltd.", role: "Product Assistant Intern", lines: ["Led user research regarding industry pain points and focus groups to understand skincare product expectations and purchasing preferences.", "Prepared competitor reports and cross-function content to make product benefits and usage steps clearer.", "Designed user journey, wireframes, high-fi UI and supported interaction of the three (online store interface).", "Organized training course UX storylines and related packaging and UI design, contributing to stronger product perception and improved sales performance."] },
  { date: "2020.08 — 2021.07", company: "Anhui Huaheng Measurement Co., Ltd.", role: "Graphic Design Intern", lines: ["Participated in the rebranding analysis and helped create visual-design solutions based on user pain points and expectations.", "Designed and promoted a new brand VI system to improve differentiation and market recognition.", "Created the official website interface to make information easier to find and enhanced the overall user experience through iteration.", "Produced targeted promotional materials and WeChat content that increased visibility and user inquiries."] },
];

function SectionLabel({ children }) {
  return <div className="about-section-label"><span aria-hidden="true">•</span>{children}</div>;
}

export function AboutPage({ onBack }) {
  return (
    <main className="about-page" aria-label="About Me">
      <header className="detail-nav about-page-nav" aria-label="About Me navigation">
        <div className="detail-nav-group"><button className="pill-button" type="button" onClick={onBack}>/返回</button></div>
        <div className="detail-nav-group detail-nav-group-right"><LanguageSwitcher /></div>
      </header>
      <div className="about-page-canvas">
        <div className="about-grid-lines" aria-hidden="true"><span /><span /><span /><span /></div>
        <section className="about-intro" aria-labelledby="about-title">
          <aside className="about-profile">
            <div className="about-monogram">YC</div><p className="about-name">Yan Chen</p><p className="about-role">Interaction Designer</p>
          </aside>
          <div className="about-intro-main">
            <h1 id="about-title">About me</h1>
            <p className="about-lead"><span>Hey, I’m Yan Chen, an interaction designer<br />based in Shenzhen, China.</span><span>I design intuitive experiences across<br />digital products, smart hardware<br />and spatial interfaces.</span></p>
            <div className="about-approach"><h2>My approach</h2><p>I believe good design happens when people,<br />technology and context meet.<br /><br />I focus on understanding real needs, simplifying<br />complexity and creating meaningful interactions<br />that solve problems and bring value.</p></div>
            <div className="about-contact-strip" aria-label="Contact details"><a href="mailto:yanchen04112023@163.com">yanchen04112023@163.com</a><a href="tel:+8618711902636">+86 187 1190 2636</a><span>Shenzhen, China</span></div>
          </div>
        </section>
        <section className="about-resume-section about-education" aria-labelledby="education-title">
          <aside><SectionLabel>Education</SectionLabel></aside>
          <div className="about-resume-main"><h2 id="education-title">My Education</h2><div className="about-entries about-education-entries">
            {education.map((item) => <article className="about-entry" key={item.school}><p className="about-entry-date">{item.date}</p><div className="about-entry-copy"><h3>{item.school}</h3><h4>{item.degree}</h4><p>{item.description}</p><p className="about-key-courses">Key Courses:</p><div className="about-course-grid">{item.courses.map((course, index) => <span key={`${course}-${index}`}>{course}</span>)}</div></div></article>)}
          </div></div>
        </section>
        <section className="about-resume-section about-work" aria-labelledby="work-title">
          <aside><SectionLabel>Work experience</SectionLabel></aside>
          <div className="about-resume-main"><h2 id="work-title">My Work Experience</h2><div className="about-entries about-work-entries">
            {experience.map((item) => <article className="about-entry" key={item.company}><p className="about-entry-date">{item.date}</p><div className="about-entry-copy"><h3>{item.company}</h3><h4>{item.role}</h4><p>{item.lines.map((line, index) => <React.Fragment key={line}><span>{line}</span>{index < item.lines.length - 1 ? " " : null}</React.Fragment>)}</p></div></article>)}
          </div></div>
        </section>
      </div>
    </main>
  );
}
