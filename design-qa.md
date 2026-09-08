# Design QA — About Me

## Target

- Reference: `/Users/ccchen/Desktop/about me.png`
- Reference frame: 941 × 1672 px
- Implementation: `http://127.0.0.1:4173/about`

## Comparison

The reference and a 941 px implementation capture were placed side by side in one comparison image at `/private/tmp/about-comparison.png`.

## Fidelity review

- Layout: passed — left profile rail, 205 px main-content start, 579 px content area, four faint vertical guides, and the three continuous sections align with the supplied frame.
- Spacing: passed — About, approach, contact strip, Education boundary, entry rows, and Work boundary preserve the supplied vertical rhythm.
- Typography: passed — neutral Helvetica-family stack, matching title hierarchy, body density, weight, wrapping, and compact resume copy.
- Color and surfaces: passed — white background, black typography, faint gray 1 px rules, no cards, shadows, gradients, or added decoration.
- Content: passed — all supplied profile, contact, education, course, and work-experience content is rendered as real HTML.
- Icons: passed — only the supplied-layout connect arrow is present, using the project's existing icon library.
- Responsiveness: passed — desktop expands the editorial grid to within 72 px of the viewport edge while preserving the 205 px profile rail and typography; smaller viewports continue to scale the 941 px reference canvas without horizontal overflow.
- Interaction: passed — Homepage ABOUT ME retains the existing two-click behavior, `/about` loads, contact links work, and the existing `/返回` control returns to `/`.
- Accessibility: passed — semantic sections/headings/articles, keyboard-native links/buttons, and labelled navigation are present.
- Implementation shortcuts: passed — the reference is not used as an image or background in the page.

## Verification

- Production build: passed (`vite build`)
- Browser route: passed (`/about`)
- Widescreen browser capture: passed (1278 × 863 px; content and guide grid now extend across the viewport)
- Homepage two-click entry: passed
- Return navigation: passed
- Visual comparison: passed

## Homepage About Me face

- Source: `/Users/ccchen/Desktop/流程/about 展示页.png` (1491 × 1055 px)
- Asset: `public/assets/about/about-me-cover.png`
- Comparison: `/private/tmp/about-face-comparison.png`
- Mapping: passed — the exact supplied bitmap is loaded as the fourth Three.js face texture; no HTML overlay or generated placeholder remains.
- Orientation: passed — the texture is upright, not mirrored, and preserves the supplied `about me.` / `nice to meet you!` composition.
- Coverage: passed — aspect-preserving cover fills the existing face; the small crop is limited to blank image area and all supplied text remains visible.
- Isolation: passed — cuboid geometry, camera, transforms, animation, and the other three face textures are unchanged.
- Interaction: passed — selecting ABOUT ME rotates to the textured face, and clicking it still opens `/about`.

## S50C / Horizon right-panel parity

- Reference: the live Horizon `.horizon-project-intro` at 1280 × 720 px.
- Comparison: `/private/tmp/right-panel-comparison.png`.
- Shared container: passed — both panels use the same pale-blue surface, `93.6px 46.72px 34px` padding, and 430 px information max-width.
- Alignment: passed — both information columns start at the same `x = 859.515625px` coordinate in the same viewport.
- Title typography: passed — font family, 51.2 px size, 600 weight, 46.08 px line height, 1.28 px letter spacing, uppercase transform, and outline treatment match.
- Metadata typography: passed — font family, 8 px size, 500 weight, 12.4 px line height, and 0.76 px letter spacing match.
- Label typography: passed — font family, 8.064 px size, 760 weight, 10.8864 px line height, 0.72576 px letter spacing, and color match.
- Body typography: passed — font family, 8 px size, 470 weight, 12.48 px line height, 0.44 px letter spacing, uppercase transform, and color match.
- Section rhythm: passed — standard sections use 33 px top spacing and PROJECT uses the shared 39 px project spacing.
- Divider treatment: passed — the S50C placeholder-only divider was removed, matching Horizon's section treatment.
- Content: passed — requested S50C role, platform, scope, and two PROJECT paragraphs are present; legacy placeholder text is absent.
- Isolation: passed — S50C left portfolio content, split ratio, independent scrolling, fixed right panel, navigation, and every other project remain unchanged.
- Production build: passed (`vite build`).
- Browser verification: passed — computed-style parity checks returned true for title, metadata, labels, body, padding, background, max-width, and X alignment.

## Tools / Horizon right-panel parity

- Reference: the live Horizon `.horizon-project-intro` at 1280 × 720 px.
- Comparison: `/private/tmp/tools-right-panel-comparison.png`.
- Shared implementation: passed — Tools uses the same `horizon-project-intro`, `horizon-project-info`, and `horizon-project-info-block` classes; no new Tools typography or layout system was introduced.
- Container: passed — both panels use the same pale-blue surface, `93.6px 46.72px 34px` padding, and 430 px information max-width.
- Alignment: passed — both information columns and titles begin at `x = 859.515625px`, with titles at `y = 93.59375px` in the same viewport.
- Title typography: passed — font family, 51.2 px size, 600 weight, 46.08 px line height, 1.28 px letter spacing, uppercase transform, and outline treatment match.
- Metadata typography: passed — font family, 8 px size, 500 weight, 12.4 px line height, and 0.76 px letter spacing match.
- Label typography: passed — font family, 8.064 px size, 760 weight, 10.8864 px line height, 0.72576 px letter spacing, and color match.
- Body typography: passed — font family, 8 px size, 470 weight, 12.48 px line height, 0.44 px letter spacing, uppercase transform, and color match.
- Section rhythm: passed — standard sections use the shared 33 px top spacing and PROJECT uses the shared 39 px project spacing; paragraph gaps inherit Horizon's 15 px rule.
- Divider treatment: passed — Tools uses the same unboxed Horizon section treatment with no added dividers.
- Content: passed — requested metadata, tagline, role, platform, scope, two PROJECT paragraphs, and SKILLS & DELIVERABLES copy are present with natural wrapping.
- Isolation: passed — Tools left portfolio, split ratio, scrolling, navigation, images, animations, Horizon, S50C, and About Me are unchanged.
- Production build: passed (`vite build`).
- Browser verification: passed — computed-style parity checks returned true for title, metadata, labels, body, padding, background, max-width, X alignment, and title Y alignment.

## S50C project-number removal

- Browser annotation: passed — the `02 / 03` label is no longer rendered in the S50C right panel.
- DOM: passed — `.s50c-project-number` count is `0`.
- Header alignment: passed — the S50C title now begins at `x = 859.515625px`, `y = 93.59375px`, matching the shared Horizon right-panel header origin.
- Isolation: passed — S50C left content, right-panel copy, layout, scrolling, and all other projects are unchanged.
- Production build: passed (`vite build`).

## Homepage About Me texture composition refinement

- Source texture: `public/assets/about/about-me-cover.png` (1491 × 1055 px).
- Updated texture: `public/assets/about/about-me-cover-v2.png` (1491 × 1055 px).
- Visual comparison: `/private/tmp/about-face-comparison.png`.
- Title placement: passed — the complete two-line `about me.` title now occupies the right half of the face, reducing overlap with the homepage project index.
- Secondary phrase: passed — `nice to meet you!` is enlarged while remaining within the lower-left portion of the texture.
- Texture fidelity: passed — the off-white surface, black typography, exact wording, punctuation, and full-bleed face treatment are preserved.
- Isolation: passed — cuboid geometry, camera, transforms, animation, and the other three project textures are unchanged; only the fourth face source path changed.
- Interaction: passed — ABOUT ME still rotates into view on the first click and opens `/about` on the second click.
- Production build: passed (`vite build`).
- Browser verification: passed — the final ABOUT ME face is open at `http://127.0.0.1:4173/` and the title no longer overlaps the left-side index as heavily.

## Spatial page-transition reconstruction

- Source visual truth: `/Users/ccchen/Desktop/录屏2026-08-25 17.24.21.mov`.
- Source frame evidence: `/private/tmp/ref-1.70.m4v.png`, `/private/tmp/ref-4.15.m4v.png`, and `/private/tmp/ref-5.65.m4v.png` (1000 × 647 px captures from the reference recording).
- Browser-rendered implementation evidence: `qa/screenshots/transitions/opening-mid.png` (1280 × 866 px), `qa/screenshots/transitions/next-mid.png` (1280 × 866 px), and `qa/screenshots/transitions/closing-mid.png` (1265 × 856 px).
- Combined comparison input: `qa/screenshots/transitions/reference-vs-prototype.png` (1280 × 1374 px). Each row places the reference state and implementation state together.
- CSS viewport: approximately 1280 × 866 px at device scale factor 1. Source frames include their original browser chrome, so the comparison was normalized by aspect-fit inside equal 640 × 430 px cells and judged at the transition-structure level rather than by page-content identity.
- States compared: project opening at ~170 ms, Next Project cuboid state at ~180 ms, and Return to Homepage at ~190 ms.

### Fidelity surfaces

- Fonts and typography: passed — existing portfolio typography was not altered; homepage titles remain visible behind the spatial layer during opening/closing as in the reference.
- Spacing and layout rhythm: passed — the active face expands from the homepage cuboid slot, Next Project contracts to a centered cuboid before re-expansion, and Return targets the original homepage cuboid bounds.
- Colors and visual tokens: passed — each project keeps its existing background token; Next Project hands the full-screen background from the current project to the next during rotation.
- Image quality and asset fidelity: passed — all existing project-face textures remain unchanged and are rendered on the true Three.js cuboid surfaces; no placeholder, CSS drawing, or duplicated raster layer was introduced.
- Copy and content: passed — the transition implementation changes no page copy, labels, navigation text, or project content.
- Focused region comparison: not required because the requested fidelity target is whole-frame spatial motion, not a typography, icon, or dense-UI detail. The three key transition states are all readable in the full-view combined comparison.

### Comparison history

- Iteration 1 finding [P2]: the Next Project transition briefly showed a project-colored rectangle behind the cuboid, breaking the reference's uniform background handover.
- Fix: removed the transition-stage background fill and left color interpolation solely on the full-screen transition backdrop while retaining transparent WebGL output.
- Post-fix evidence: `qa/screenshots/transitions/next-mid.png` and the middle row of `qa/screenshots/transitions/reference-vs-prototype.png` show one continuous background with a centered, correctly dimensional cuboid and no rectangular artifact.
- No P0/P1/P2 findings remain. Residual visual differences are expected because the reference site and this portfolio use different content, imagery, aspect ratio, and browser chrome.

### Interaction and runtime verification

- Opening: passed — `idle → opening → project`; detail navigation remains hidden during the body of the expansion and appears at the end.
- Next Project: passed — `project → switching → project`; current page contracts, flat panel reforms into a true cuboid, face rotation changes the project, then the next detail expands.
- Return: passed — `project → closing → idle`; homepage typography returns before the shrinking detail completes and the cuboid settles back into its homepage slot.
- About Me: passed — the same opening/closing architecture reaches `/about` and returns to `/`.
- Input lock: passed — `.project-detail-stage`, `.works-section`, and `.spatial-project-transition` all compute to `pointer-events: none` while `switching`.
- Console errors: passed — browser application log query returned no warnings or errors.
- Production build: passed (`vite build`).

final result: passed

## Shared bilingual Contact Modal

- Source visual truth: `/Users/ccchen/Desktop/视觉效果.png` (1536 × 1024 px), with `/var/folders/lx/w3v6wpwj2vjbnt5kcmfzfybh0000gn/T/codex-clipboard-d4a52b2c-0c90-4267-8a1a-769b9da549aa.png` as the interaction-pattern reference.
- Final desktop implementation evidence: `/Users/ccchen/Documents/ChatGPT/portfolio/chen_portfolio/verification/contact-modal-home-zh-1536x1024-final.png` (1536 × 1024 px).
- Full-view comparison input: `/Users/ccchen/Documents/ChatGPT/portfolio/chen_portfolio/verification/contact-modal-comparison-full.png`.
- Focused card comparison input: `/Users/ccchen/Documents/ChatGPT/portfolio/chen_portfolio/verification/contact-modal-comparison-focused.png`.
- State: homepage About Me selection, Contact Modal open, Chinese; live English and Chinese switching were also exercised while the same modal remained mounted.

### Fidelity review

- Placement and scale: passed — the desktop card is right-aligned beneath the existing Contact / Language controls, measures 560 px wide, and keeps a 20–32 px visual gap from the controls. Mobile measures 358 px at a 390 px viewport with exactly 16 px side margins and no horizontal overflow.
- Typography and copy: passed — `Hello!`, the exact Chinese and English biographies, Email / Phone labels, contact values, and the final English tagline are all live text. The Chinese paragraph measures four lines at the desktop target, within the requested 4–6-line range.
- Surfaces and color: passed — the card uses a white surface, 32 px radius, low-contrast border, restrained shadow, dark navy/gray typography, pale pink icon circles, and the existing About pink accent. The background remains visible through a 5.5% dim layer without a heavy dialog blackout.
- Contact controls: passed — the open Contact pill retains its white surface and receives only a restrained pink ring/glow; the Language pill is visually unchanged. The close affordance is a gray Phosphor X with no automatic pink focus ring on initial open.
- Contact items: passed — two lightweight vertical bordered rows use real Phosphor icons and native `mailto:yanchen04112023@163.com` / `tel:+8613966222278` links. No raster UI, custom SVG, or placeholder artwork was introduced.
- Motion: passed — overlay opacity plus card opacity, `translateY(-8px)`, and `scale(.98)` use a 260 ms non-bouncy easing for both entry and exit.
- Responsiveness: passed — the verified 390 × 844 browser state kept the card below the controls, preserved readable wrapping, used 16 px side margins, and produced `documentElement.scrollWidth === 390`.

### Interaction and locale verification

- Shared mounting: passed — one `ContactModal` is mounted at the App root and is opened by the homepage, About Me, Horizon, S50C, and Tools controls; no per-page modal copies exist.
- Locale: passed — the component consumes the existing `LanguageContext`; Chinese → English and English → Chinese update the already-open modal immediately without refresh or close/reopen. The language menu is portaled only for stacking, while its state and handlers remain the existing global implementation.
- Close paths: passed — X, repeated Contact click, outside pointer press, and Escape all close the modal and clear the active ring.
- Navigation isolation: passed — URL and page scroll positions remain unchanged. Escape closes only the Contact Modal while the Horizon project dialog remains open.
- Project coverage: passed — About Me, Horizon, S50C, and Tools each opened the same exact modal in place; closing it left the underlying page/project mounted.
- Legacy Contact flow: passed — no normal Contact control renders the old full-screen Contact section, route, anchor, scroll handler, or page-transition entry.
- Clean runtime: passed — a fresh `/about` tab completed open → live English switch → close with no console errors.
- Build/runtime: passed — `pnpm run build`, `pnpm run test:sites`, and `git diff --check` complete successfully; Vite reports only its pre-existing large-chunk advisory.

### Comparison history

- Pass 1 finding [P1]: the modal layer visually and interactively covered the existing language menu, preventing the required live locale switch while the card was open.
- Fix: made the light dim layer non-intercepting, added a capture-phase outside-click guard, and rendered the existing language menu in a top-level portal without duplicating language state or changing its design.
- Pass 2 finding [P2]: programmatic focus gave the gray close X a pink focus ring on initial open, unlike the supplied target; the Chinese biography also wrapped to only three lines.
- Fix: moved initial focus to the dialog container while retaining keyboard-visible focus on the X, and reduced the biography measure to 430 px. The final desktop capture shows a neutral gray X and exactly four body lines.
- No actionable P0/P1/P2 findings remain.

final result: passed

## About Me internal detail page reconstruction

- Source visual truth: `/Users/ccchen/Desktop/about me内容.png` (1024 × 1536 px).
- Browser implementation: `http://127.0.0.1:4173/about`.
- Desktop evidence: `/Users/ccchen/Documents/ChatGPT/portfolio/chen_portfolio/verification/about-me-desktop-final.png` (1009 × 1237 px browser capture) and `/Users/ccchen/Documents/ChatGPT/portfolio/chen_portfolio/verification/about-me-reference-top-crop.png` (1009 × 1237 px normalized reference crop).
- Responsive evidence: `/Users/ccchen/Documents/ChatGPT/portfolio/chen_portfolio/verification/about-me-mobile-final.png` (375 × 812 px capture from a 390 × 844 CSS viewport).
- State: direct `/about`, Chinese default; English and Chinese language states both exercised through the visible language switcher before returning to Chinese.

### Full-view and focused comparison

- Full-view composition: passed — the implementation follows the reference's white editorial canvas, spacious introduction, five numbered horizontal modules, restrained pink accents, pale rules, and final footer; no full-page reference bitmap is used.
- Focused module comparison: passed — the What I Do cards, horizontal Journey timeline, four-step AI workflow, pill-like tool tags, and two contact cards reproduce the reference hierarchy and spacing with independently editable DOM content.
- Browser capture note: the in-app browser excludes part of its chrome and caps the physical capture to 1009 × 1237 px even when the CSS viewport is set to 1024 × 1536. DOM geometry was therefore checked in addition to the paired image comparison; the canvas height is approximately 1581 px, Contact spans y ≈ 1318–1506, and the footer follows at y ≈ 1506–1553 without horizontal overflow.

### Required fidelity surfaces

- Fonts and typography: passed — the About page uses the locally bundled Poppins files already present in the repository, with Chinese system fallbacks, a dark navy hierarchy, muted blue-gray secondary copy, and reference-like weight and line-height relationships.
- Spacing and layout: passed — the 1120 px maximum canvas, 54 px desktop gutter, four-column card grid, five-point timeline, equal workflow distribution, section dividers, and compact lower-page rhythm closely follow the supplied 1024 px frame.
- Colors and surfaces: passed — the page is white with `#ff4f87` pink accents, soft pink icon circles, pale gray dividers and borders, and no legacy green styling, gradient surfaces, or heavy shadows.
- Copy and content: passed — Chinese intro, section titles, four capability cards, five timeline entries, workflow labels, tool tags, email, and phone match the supplied requirements. The page contains exactly the `01`–`05` modules, two contact methods, no legacy `My Skills`, no internal navigation, and no large `ABOUT ME` heading.
- Icons: passed — all visible line icons come from the existing Phosphor icon package, use one consistent stroke family, and remain editable React elements rather than raster artwork or hand-drawn SVG substitutes.
- Responsiveness: passed — at 390 × 844 CSS px the capability cards, timeline, workflow, and contact cards collapse to one column with no horizontal overflow; desktop retains the reference's horizontal information architecture.
- Accessibility and interaction: passed — semantic headings, sections, ordered lists, native email/telephone links, sensible labels, visible content at text wrap, and reduced-motion-safe CSS are preserved. Contact hrefs resolve to `mailto:yanchen04112023@163.com` and `tel:+8613966222278`.
- Scope isolation: passed — only `src/components/AboutPage.jsx` and the About-specific style block in `src/styles.css` changed. The home cover, project routes, opening/closing transition architecture, homepage navigation, Horizon, S50C, and Tools remain outside this implementation.
- Runtime: passed — the page reports no browser errors or warnings, and the production build completes successfully with only Vite's pre-existing large-chunk advisory.

### Comparison history

- Pass 1 finding [P2]: the page initially retained the previous About resume structure and its unrelated green/black visual language, so the hierarchy and content did not match the supplied design.
- Fix: rebuilt the internal page as five semantic React sections, added the exact bilingual content model, loaded the existing local Poppins assets, and isolated all new styling under `.about-page` selectors.
- Pass 2 finding [P3]: the desktop introduction and Tools section made the lower half denser than the reference.
- Fix: calibrated the introduction height and section padding so the 01–05 rhythm and footer land close to the 1536 px reference while remaining responsive.
- No actionable P0/P1/P2 findings remain.

final result: passed

## Unified homepage and project-detail top navigation pills

- Source visual truth: `/var/folders/lx/w3v6wpwj2vjbnt5kcmfzfybh0000gn/T/codex-clipboard-c52ca3b4-13e5-48f2-8184-d450653574d3.png` for the homepage pills and `/var/folders/lx/w3v6wpwj2vjbnt5kcmfzfybh0000gn/T/codex-clipboard-1e6d03fb-c672-45c5-bab1-83db59b8990e.png` for the detail-page pills.
- Browser-rendered implementation evidence: `qa/screenshots/top-nav/home-after.png`, `qa/screenshots/top-nav/horizon-detail-after.png`, and `qa/screenshots/top-nav/tools-detail-mobile-after.png`.
- Combined comparison input: `qa/screenshots/top-nav/reference-vs-implementation.png`, assembled by `qa/screenshots/top-nav/comparison.html` so the source and rendered states are judged together.
- Desktop viewport: 2048 × 1065 CSS px at device scale factor 1. The homepage screenshot is 2033 × 1057 px because the browser capture excludes its 15 px scrollbar; it was normalized to the 2048 × 1066 px source frame only inside the comparison page. The detail reference is a 2048 × 324 px top strip and was compared with the matching 2048 × 324 px top strip of the 2048 × 1065 px implementation.
- Responsive viewport: 390 × 844 CSS px at device scale factor 1.
- States: homepage / Chinese; Horizon, S50C, and Tools Section 00 detail covers / Chinese; Tools detail / English; desktop and narrow-screen navigation.

### Full-view and focused comparison

- Full-view comparison: passed — the homepage retains its complete existing cube, title rail, background, and content composition while the upper-right navigation is reduced to two independent white pills.
- Focused top-navigation comparison: passed — the implementation matches the references' separate white pill anatomy, black text, fully rounded corners, subtle low-contrast outline, soft shallow shadow, and generous horizontal spacing on both sides of the detail view.
- Button count: passed — homepage navigation contains only Contact and Language; Horizon, S50C, Tools, and the standard detail shell each contain Back, Next, Contact, and Language, with no Work or Chen control.

### Required fidelity surfaces

- Fonts and typography: passed — all buttons preserve the site's established mono/PingFang stack, use 700 weight, 17 px desktop type, a compact one-line label, and 11 px type at the narrow breakpoint. The reference's different brand typeface is intentionally not copied because the user required the current site font family to remain unchanged.
- Spacing and layout rhythm: passed — desktop pills measure 58 px high with 30 px horizontal padding, 999 px radius, and 18 px gaps at the 2048 px viewport; the navigation uses the existing responsive safe gutter. At 390 px, the independent pills measure 40 px high with 6–8 px gaps and all four detail controls remain fully inside the viewport.
- Colors and visual tokens: passed — the pills use a near-white 96% surface, black text, a 14% black border, and a restrained two-layer ambient/inset shadow; no dark active fill remains. Hover lifts by 1 px and slightly strengthens the shadow; active returns to the resting position.
- Image quality and asset fidelity: passed — this change introduces no image, icon, background, or project-media change. The screenshots only document the implementation.
- Copy and content: passed — only the explicitly requested Work and Chen top controls were removed. Contact, Language, Back, and Next preserve their language-aware labels and handlers; project titles, page content, imagery, routes, and ordering remain unchanged.
- Accessibility and interaction: passed — controls remain native buttons/links, the language control retains `aria-haspopup` and menu semantics, and a visible 2 px keyboard focus outline was added. Chinese → English → Chinese switching was exercised successfully.
- Runtime: passed — the production build and Sites worker suite complete successfully, and the final browser console contains no errors or warnings.

### Comparison history

- Initial finding [P2]: the homepage had three controls including a dark active Work pill, and detail pages had five controls including Chen; the prior 42 px / 13 px buttons looked smaller, flatter, and more tightly grouped than the references.
- Fix: removed only the two specified controls, standardized the shared pill dimensions, border, white surface, shadow, gaps, and interaction states, and replaced the mobile segmented container with independent pills.
- Post-fix evidence: `home-after.png` and `horizon-detail-after.png` show the requested two-control and four-control layouts; DOM checks confirm the same four labels for Horizon, S50C, and Tools. `tools-detail-mobile-after.png` confirms every control remains within the 390 px viewport.
- No actionable P0/P1/P2 findings remain.

final result: passed

## Homepage titles, centered composition, and 3D framing

- Visual reference: `/var/folders/lx/w3v6wpwj2vjbnt5kcmfzfybh0000gn/T/codex-clipboard-4d4e8f60-37a6-4799-b3b5-9e21c5923a12.png` (2048 × 1117 px).
- Final browser evidence: `verification/homepage-final.png` at 1280 × 720 CSS px.
- Combined comparison input: `verification/homepage-reference-comparison.png`.
- Motion evidence: `verification/homepage-entry-final.mp4` (1280 × 720, 5.735 s).

### Fidelity review

- Homepage labels: passed — both language states render exactly `ABOUT ME`, `HORIZON`, `S50C GREEN LASER`, and `TOOLS APP`; project IDs, detail names, routes, and mappings remain unchanged.
- Typography: passed — all four buttons resolve to the same 100.896 px font size at the verification viewport, approximately 20% above the previous 84.1 px desktop size; the longest label remains on one line.
- Vertical alignment: passed — the title group bounds are y = 170.64–549.36 px, with centerY = 360 px in a 720 px viewport.
- Entrance endpoint: passed — the intro drives `--home-intro-title-offset` while the base centering transform remains intact; measured bounds before and after cleanup are identical, so there is no endpoint jump or duplicate title layer.
- Model projection: passed — the final silhouette sits at approximately x = 22–83% and y = 7–98% of the verification viewport, closely matching the supplied 21–83% / 7–98% composition target.
- Perspective: passed — the home-only camera distance, world position, and X/Y presentation rotations increase top-face exposure and preserve a readable right side without applying a 2D stretch.
- Asset fidelity: passed — cover sources, texture fitting, panel geometry, material colors, and the black top/bottom bands were not modified.
- Scope isolation: passed — the new framing is enabled only by the homepage `homeComposition` prop; contact and project-switch cubes retain their original tilt and camera behavior.
- Interaction regression: passed — HORIZON selection and second-click detail entry work; `/返回` returns to the homepage; keyboard ArrowDown on the real cube advances to S50C; Chinese/English switching preserves all four homepage labels.
- Runtime/build: passed — `pnpm run build` completes successfully. Vite reports only its pre-existing large-chunk advisory.

### Comparison history

- Pass 1: enlarged and centered the title group; expanded the home canvas framing and adjusted the real Three.js camera/root. The model was slightly too wide and touched the lower viewport edge.
- Pass 2: increased top-face exposure and corrected the scene offset while keeping the original cover and black bands intact.
- Pass 3: refined home-only camera distance and world position until the outer silhouette aligned with the supplied percentage bounds; no P0/P1/P2 visual or interaction findings remain.

final result: passed

## Portfolio 首次加载与首页入场

- 动效参考：`/Users/ccchen/Desktop/portfolio-loading-preview (3).mp4`（2048 × 1394 px，60 fps，7.00 s）。
- 浏览器实现：`http://127.0.0.1:4173/`；最终 QA viewport 为 1063 × 876 CSS px。
- 验收录屏：`verification/portfolio-loading-entry-verification.mp4`（1062 × 876 px，6.30 s，H.264）。
- 并排对照：`verification/portfolio-loading-comparison.png`，包含 Loading、名字闪烁与标题滑入三个关键状态。

### Timeline and motion

- Loading：passed — 首帧由 `index.html` 的轻量 preboot DOM 直接绘制纯黑背景与中央细框，不会先闪出首页；进度使用指定正弦曲线单调递增，关键资源未完成时停在 99%，资源就绪后才显示 100%。
- 中央框：passed — 桌面基准为 162.4 × 38.8 px、1.2 px 白色直角描边；文字为小尺寸白色等宽字体，并随视口比例缩放，移动端单独保证可读尺寸。
- 名字闪烁：passed — 文案严格为 `CHEN YAN`；边框保持稳定，仅文字执行 400 ms 渐暗 + 400 ms 渐亮，共两次，之后再以 400 ms 最终消失。
- 背景揭示：passed — 名字结束后，黑色遮罩与边框在 600 ms 内退场，终点为真实 About Me 首页背景 `#F3D3DA`。
- 首页内容：passed — Cube 与右上导航随后用 400 ms 同步淡入；标题容器在此阶段仍完全位于视口上方。
- 标题运动：passed — 60 ms 间隔后，四行标题作为单一 DOM 容器以 600 ms `easeOutCubic` 从视口外上方滑入；无逐行错峰、缩放、弹跳或回弹，最终清除内联 transform 并回到原布局。

### Fidelity surfaces

- 字体与标题：passed — Loading / CHEN YAN 使用等宽字体；首页四行标题继续复用原有字体、字号、字重、描边与覆盖 Cube 时的视觉关系。
- 间距与位置：passed — 中央框始终以 viewport 正中心定位；Cube、导航与标题的最终尺寸、位置和透视均来自原首页布局，没有复制节点或过渡替身。
- 颜色：passed — Loading 为纯黑 `#000000`；首页揭示终点实测为 `rgb(243, 211, 218)`，与指定 `#F3D3DA` 一致。
- 资源：passed — 结束 Loading 前等待 `document.fonts.ready`、About Me 当前 Cube 面纹理及首次 WebGL 渲染；不等待项目详情页素材，慢速资源不会触发计时超时跳过。
- 响应式：passed — 桌面按 2048 × 1394 参考比例缩放中央框和文字，760 px 以下使用可读的 126 × 34 px 规格；所有入场运动只使用 opacity 与 transform。

### Interaction and runtime

- 首次范围：passed — 仅初始路径 `/` 或完整刷新首页时播放；直接访问 `/about` 不挂载 Loading，且 `data-home-boot` 不存在。
- 默认状态：passed — 动画结束后选中项为 ABOUT ME，Cube 的 aria label 为“当前为 ABOUT ME”，背景保持 `#F3D3DA`。
- 不重播：passed — 中文 → English → 中文切换、ABOUT ME 打开与 `/返回` 全部保持 intro phase 为 `complete`，没有重新出现遮罩。
- 清理：passed — 完成后遮罩节点卸载，`body` overflow 恢复，`inert` 解除，preboot 与 React RAF 均停止，临时 opacity / transform / `will-change` 全部移除。
- 浏览器日志：passed — 仅有 Vite 连接和 React DevTools 提示，无 error 或 warning。
- Production build：passed — `vite build --configLoader native`。
- Sites worker suite：passed — 4 tests，0 failures。

### Comparison history

- Pass 1 [P2]：中央框在 1337 × 875 viewport 下略高于参考比例，关键资源兜底计时器也可能在极慢网络下提前继续。
- Fix：将桌面框高度下限校准到 24 px；移除 12 秒 fail-open，改为严格等待关键资源；名字节点在时间轴边界直接更新，避免额外双 RAF 延后。
- Pass 2：并排对照确认中央框、名字透明度、背景揭示和标题整组运动的视觉关系；交互回归确认没有遮罩残留或重复播放。
- No actionable P0/P1/P2 findings remain.

final result: passed

## Homepage S50C label and model horizontal alignment

- Source visual truth: the browser-rendered homepage baseline plus the user's explicit target that the model's left front tip align with the vertical stem of `T` in `ABOUT ME`.
- Baseline evidence: `verification/homepage-s50c-shift-before.png`.
- Implementation evidence: `verification/homepage-s50c-shift-final.png`.
- Full-view comparison evidence: `verification/homepage-s50c-shift-comparison.png`.
- Browser CSS viewport: 1280 × 720 px; source and implementation captures: 1265 × 712 px at the same browser capture density and state.
- State: `/`, Chinese, intro complete, `ABOUT ME` selected, default cuboid rotation.

### Findings

- Copy/content: passed — the homepage labels are exactly `ABOUT ME`, `HORIZON`, `S50C`, and `TOOLS APP` in both Chinese and English states; only the home display constant changed.
- Typography: passed — the existing display family, 100.896 px desktop size, weight, outline treatment, line height, and left alignment are unchanged.
- Spacing/layout rhythm: passed — the four-line title group retains its existing 360 px vertical center in the 720 px viewport and introduces no horizontal overflow.
- Model alignment: passed — the whole Three.js presentation root moved horizontally; the left front tip now lands at the `T` stem instead of near the preceding `U`.
- Colors/tokens: passed — background, title fill/outline, mix-blend behavior, model materials, lighting, and colors are unchanged.
- Image/asset fidelity: passed — cover textures, crop logic, geometry, proportions, and the original black bands remain untouched.
- Motion/interaction: passed — model scale, Y position, X/Y rotations, camera, and perspective are unchanged; HORIZON selection, detail opening, spatial transition, and `/返回` all complete successfully from the new horizontal baseline.
- Responsive behavior: passed — the adjustment is a Three.js world-coordinate translation rather than a fixed 110 px CSS offset, so it scales with the rendered scene; the tested viewport has zero horizontal overflow.
- Focused comparison: not required — the label and alignment target are clearly readable in the full-view same-state comparison.
- Runtime/build: passed — production build succeeds and all 4 Sites worker tests pass; only the existing Vite large-chunk advisory remains.

### Comparison history

- Pass 1: changed the label to `S50C` and shifted the home presentation root from -0.21 to 0.04 world units; the tip remained slightly left of the `T` stem.
- Pass 2: refined only the home X coordinate to 0.18 world units; the tip aligns with the `T` stem while size, vertical bounds, rotation, perspective, textures, and black bands remain identical.
- No actionable P0/P1/P2 findings remain.

final result: passed

## S50C 中文版第 02 页

- 视觉参考：`/Users/ccchen/Desktop/01.png`（1447 × 1087 px）。
- 浏览器实现：`s50c-challenge-zh-final.png`；viewport 为 1337 × 875 CSS px。
- 同比例对照：`s50c-challenge-comparison-final.png`（参考图与实现画板均归一到 1447 × 1087 px）。
- 英文回归：`s50c-challenge-en-regression.png`。
- 状态：`zh-CN`，MILESEEY S50C，第 02 页。

### Full-view comparison

- 构图与比例：passed — 中文专属画板使用参考图 1447:1087 比例；黑色页眉、建筑主视觉、左下手持设备、三组挑战、真实测量界面与底部旅程面板按相同纵向节奏排列。
- 主视觉图层：passed — 建筑背景、手持 S50C 与 26.445 ft 测量界面为三个独立图片节点；目标点与斜向连接线均为独立网页元素，产品层没有任何色相滤镜，实体测量键保留原绿色。
- 信息层级：passed — 01 / 02 / 03 圆形编号、挑战标题和说明均为可编辑 DOM；三组信息分别落在画面左中、中央与右侧区域。
- 测量旅程：passed — 半透明深色面板、标题、五个步骤、五个 Phosphor 图标、四个箭头、三组关键词、描边与装饰线全部由 React / HTML / CSS 构建。
- 色彩：passed — 中文画板通过 `--s50c-challenge-accent: #13b2ba` 统一控制页码、标题、目标、连接线、图标、关键词和重点描边。

### Focused checks

- 指定文案：passed — 主标题、三组挑战、五步旅程及“可见性 / 引导 / 语境”均与本次中文规范一致，并用 `data-i18n-skip` 防止全局翻译器再次替换。
- 图片边界：passed — 3 个图片节点全部加载完成，中文根画板 `scrollWidth === clientWidth`，没有横向溢出。
- 非整图实现：passed — DOM 中不存在对参考图 `01.png` 的引用；画板包含 8 个独立 article、代码化图标与分离的视觉图层，可单独编辑任何文案、位置或颜色。
- 英文隔离：passed — 切换 English 后不渲染 `.s50c-challenge-section--zh`，英文标题仍为 `UNDERSTANDING THE CHALLENGE`，场景素材仍为原 `/assets/projects/s50c/challenge/challenge-scene-text-free.png`。
- 页面隔离：passed — 新增规则全部限定在 `.s50c-challenge-section--zh`、`.s50c-challenge-frame--zh` 与其后代选择器中；S50C 其他章节和其他项目选择器未改。
- 生产构建：passed — `vite build --configLoader native` 与 Sites 构建准备脚本均成功。

### Comparison history

- Pass 1 [P1]：原页面虽然叠加了 DOM 文案，但建筑、产品、目标线与设备界面仍合并在同一场景图中，无法满足独立素材与可维护结构要求。
- Fix：生成干净建筑底图与透明手持设备图层，裁取原始 26.445 ft 设备界面，并用中文专属 React 分支重建挑战标注、目标系统和旅程面板。
- Pass 2：按 1447 × 1087 同比例对照校准页眉高度、产品比例、目标连线、三组信息与旅程面板高度；浏览器实测无溢出且所有图片完成加载。
- No actionable P0/P1/P2 findings remain.

final result: passed

## Horizon 中文版第 05 页

- 视觉参考：`/Users/ccchen/Desktop/流程/AG1中文版/05.png`（1548 × 1016 px）。
- 浏览器实现：`horizon-fov-hud-zh-final.png`；viewport 为 1338 × 876 CSS px，截图 API 输出为 1338 × 876 px。
- 实现画板：799.10 × 524.47 CSS px；根画板 `scrollWidth === clientWidth` 且 `scrollHeight === clientHeight`。
- 同尺度全页对照：`horizon-fov-hud-comparison-final.png`（参考图与实现均归一为 799 × 524 px）。
- 中央 HUD 局部对照：`horizon-fov-hud-central-comparison-final.png`（两侧均归一为 640 × 403 px）。
- 英文回归：`horizon-fov-hud-en-regression.png`。
- 状态：`zh-CN`，MILESEEY Horizon，第 05 页居中显示。

### Full-view comparison

- 构图与比例：passed — 中文画板使用参考图的 1548:1016 比例；顶部标题和四项约束、左侧 HUD 信息层级、中央 HUD、右侧视觉层级、底部布局依据均保持同一纵向节奏。
- 字体与排版：passed — `05`、白色主标题、绿色副标题、两行说明和各层级中文均为可编辑 DOM 文本；小字号正文已在第二轮提高字号与对比度，无异常断行、截断或重叠。
- 间距与布局：passed — 中央 HUD 与参考图保持同等主视觉占比；第二轮将左右分栏边界重新对齐，底部六张说明卡完整落入画板范围。
- 色彩与视觉 token：passed — 中文专属画板复用 Horizon 中文章节的 `#83ff3a` 荧光绿，并使用既有青色分析标注、深黑蓝绿色背景和低对比灰白说明。
- 图片质量：passed — 中央球场地图继续复用现有 `/assets/projects/ag1/overview/hole-interface.png`，只在中文画板内提升亮度和饱和度；未复制、嵌入或裁切参考图作为网页素材。
- 文案与内容：passed — 顶部使用 `Horizon HUD`，未出现 `AG1 HUD`；中央外部标注完整显示“球洞状态及分数”；正式 HUD UI 的 F / C / B、Shot / Score / Menu / Green 等英文保持原样。
- 图标与描边：passed — 延用现有 Horizon FOV 图标、HUD 结构和细线系统；四项约束、A–D 层级、01–04 层级和六项布局依据均完整。
- 固定导航：accepted constraint — `/返回` 与 `下一个` 为用户要求不修改的全局 sticky 导航；同尺度画板对照使用不受导航遮挡的居中滚动状态。
- 响应与边界：passed — 当前桌面 split viewport 无根级溢出；窄屏继续沿用项目既有横向可滚动画板策略，中文只调整画板基准比例。

### English isolation and runtime

- 英文分支继续渲染原始 `HorizonFovHudPage` DOM，显示 `DESIGNING FOR A LIMITED FIELD OF VIEW`、原 `AG1 HUD` 说明和 `HOLE STATUS`，且不带 `.fov-hud-artboard--zh`。
- 新增数据只由 `HorizonFovHudPageZh` 使用；新增布局规则全部位于 `.fov-hud-artboard--zh` / `.horizon-fov-hud-page--zh` 作用域，Horizon 其他章节选择器未修改。
- 中文 → English → 中文切换正常，返回中文后仍显示第 05 页专属结构。
- 浏览器日志只有 Vite 连接、热更新和 React DevTools 提示，无 error 或 warning。
- Production build：passed（`pnpm run build`）。
- Sites worker suite：passed（4 tests，0 failures）。

### Comparison history

- Pass 1 findings [P2]：现有英文画板的全局翻译无法满足 `Horizon HUD` 与完整状态标注文案；中文小字号说明偏暗，左右分栏边界与参考图有可见偏差，球场地图层级略弱。
- Fix：增加中文专属数据与 `data-i18n-skip` 画板；提高中文说明字号和对比度，重新分配左右栏宽度但保持中央 HUD 位置，并仅在中文画板内增强既有地图素材。
- Post-fix evidence：全页同尺度对照和中央 HUD 局部对照确认主要区域比例、信息层级、HUD 结构、绿色关系与指定文案一致；浏览器 DOM 验收确认无溢出且没有 `AG1 HUD`。
- P3：参考图底部的极弱绿色线框地形属于辅助装饰；为避免引入非真实素材或修改公共背景，本次保持克制的深色渐变，不影响信息结构与可读性。
- No actionable P0/P1/P2 findings remain.

final result: passed

## Horizon 中文版第 04 页

- 视觉参考：`/Users/ccchen/Desktop/流程/AG1中文版/04.png`（1672 × 941 px）。
- 浏览器实现：`horizon-user-flow-zh-final.png`；viewport 为 1337 × 875 CSS px，截图 API 输出为 1337 × 875 px。
- 同尺度全页对照：`horizon-user-flow-comparison-final.png`（参考图与实现均归一为 808 × 455 px）。
- 中下部流程局部对照：`horizon-user-flow-detail-comparison-final.png`。
- 英文回归：`horizon-user-flow-en-regression.png`。
- 状态：`zh-CN`，MILESEEY Horizon，第 04 页左侧案例画板对齐视口顶部。

### Full-view comparison

- 构图与比例：passed — 中文画板使用参考图的 1672:941 比例；顶部标题、手势说明、核心比赛流程、两列任务流程和底部更多信息流程保持同一纵向节奏。
- 页面结构：passed — 右上只保留点击 / 滑动 / 双击说明框；中文版 DOM 不包含眼镜素材；球洞主页与四个高频功能使用细线连接。
- 任务流程：passed — 计分与果岭两列的标题、用户目标、四步卡片、箭头、手势说明和底部返回逻辑均与参考图对应。
- 更多信息：passed — 底部流程从菜单直接进入记分卡、团队成绩和返回，不再保留旧版额外的球洞主页卡片。

### Focused fidelity review

- 字体与排版：passed — 主标题、副标题、说明、流程标题、用户目标和步骤标签均为可编辑中文 DOM 文本；字号与权重按 1672 px 画板容器单位缩放，无异常断行或截断。
- 间距与布局节奏：passed — 顶部约占 42%、双任务流程约占 36%、更多信息流程约占 22%；用户目标位于章节标题下方，卡片与底部手势说明保持参考图的层级间距。
- 色彩与视觉 token：passed — 中文专属画板使用深黑绿色基底、Horizon 荧光绿描边与重点、白色标题和低对比说明；英文 token 未改变。
- 图片与图标质量：passed — 仅复用现有球洞地图素材和项目已安装的 Phosphor 图标；参考图未作为背景图嵌入，也未生成或替换产品素材。
- 文案与内容：passed — 标题、说明、核心比赛流程、计分流程、果岭流程、更多信息流程和总结全部显示指定中文版文案；正式设备 UI 标签（SCORE、PUTTS、Pin Position、MENU、SCORECARD）按参考图保留。
- 特别检查：passed — 果岭流程第 2 步没有九宫格；九宫格只出现在第 3 / 4 步；页面右上没有眼镜；根画板 `scrollWidth === clientWidth` 且 `scrollHeight === clientHeight`。
- 英文隔离：passed — 英文状态仍渲染原 `HorizonUserFlowPage` 返回结构，显示 `FROM START TO EVERY SHOT`，不带 `.user-flow-artboard--zh`；新增布局规则全部由 `.user-flow-artboard--zh` / `.horizon-user-flow-page--zh` 限定。
- 运行时：passed — 干净浏览器标签中验证中文 → English → 中文切换，三次状态均无 console error；生产构建与 Sites worker 4 项测试通过。

### Comparison history

- Pass 1 findings [P2]：旧中文依赖全局文本替换，仍保留三处英文说明；旧画板为 3:2，结构与 16:9 参考图不同；顶部仍使用旧流程密度；果岭第 2 步含多余图形；底部从球洞主页开始而非从菜单开始。
- Fix：新增 `HorizonUserFlowPageZh`、中文数据与严格作用域样式；重排为 1672:941 画板；将手势说明独立置于右上；重建计分、果岭与更多信息三条中文流程；移除中文版眼镜与果岭第 2 步网格。
- Pass 2 finding [P2]：首轮实现把两条“用户目标”排在章节标题同行，导致卡片整体比参考图偏上。
- Fix：将用户目标恢复到标题下方，重新对齐任务卡片、手势说明与分隔线；同时去除中文版九宫格默认高亮并固定底部总结宽度。
- Post-fix evidence：全页与局部对照均显示主要分区、卡片尺寸、标题层级和连接线位置与参考图一致；浏览器边界检查无溢出。
- P3：参考图底部的弱绿色线框地形没有对应的真实项目素材，本次保持纯深色底以避免引入生成装饰，不影响流程理解与层级。
- No actionable P0/P1/P2 findings remain.

final result: passed

## Horizon 中文版第 06 页

- 视觉参考：`/Users/ccchen/Desktop/06.png`（1586 × 992 px）。
- 浏览器实现：`horizon-design-exploration-zh-viewport-final.png`；viewport 为 1337 × 875 CSS px，浏览器 DPR 为 2，截图 API 输出已归一为 CSS 像素。
- 实现画板：`horizon-design-exploration-zh-final.png`（808 × 506 px，对应 807.99 × 506.01 CSS px，99:62）。
- 全页同尺度对照：`horizon-design-exploration-comparison-final.png`；参考图以 Lanczos 归一到 808 × 506 px 后与实现并排比较。
- 局部对照：`horizon-design-exploration-top-comparison.png` 与 `horizon-design-exploration-micro-comparison.png`。
- 英文回归截图：`horizon-design-exploration-en-regression.png`。
- 状态：`zh-CN`，MILESEEY Horizon，第 06 页完整画板可见。

### Fidelity review

- 字体与排版：passed — 06、主标题、副标题、两行说明、三组设计探索、四组微交互与五项洞察形成与参考图一致的层级；中文正文保持可读，没有异常截断。
- 间距与布局节奏：passed — 画板采用参考图 99:62 比例；顶部、中部和底部由三条水平线分区，左中右探索列、四个微交互模块和五个底部洞察等宽对齐。
- 色彩：passed — 中文画板使用纯黑基底、白色主信息、灰白说明与 `#83ff3a` Horizon 荧光绿；该绿色与现有 Horizon 中文第 03 页专属色一致。
- 图片与图形质量：passed — V1 / V2 / V3 继续使用现有真实 HUD PNG；未生成或替换产品素材。三张 HUD、流程框、旗杆方案、网格、圆形操作按钮、分割线与底部洞察图标均按统一尺寸和线宽组织。
- 文案：passed — 指定中文标题、问题句、三版 HUD 说明、调整前后步骤、三个旗杆方案、四组微交互说明与五项设计洞察全部显示；说明性英文已清除，正式 HUD 图片内的英文 UI 保持原样。
- 选中态：passed — “菜单”和“选中”只使用双层绿色描边，图标本身保持绿色线性样式；浏览器计算样式确认背景为透明，无实心绿色填充。
- V1：passed — 明确写出“填充较多”，并说明最终方案已取消填充高亮；V2 / V3 清楚呈现结构优化与最终聚焦方向。
- 微交互：passed — 焦点状态包含击球、记分、菜单、果岭、地图、设置、更多；选择反馈包含待机、选中、确认；成绩调整与三步旗杆位置示意完整。
- 底部洞察：passed — 仅保留聚焦核心信息、情境驱动、即时反馈、简化操作步骤、为 AR 而设计五项必要模块，没有额外装饰元素。
- 响应与边界：passed — 目标桌面 split viewport 中完整画板可见；窄屏继续使用项目既有横向可滚动画板策略。
- 运行时：passed — 中文与英文往返切换正常；浏览器控制台无 error / warning。

### English isolation

- 英文分支不带 `horizon-design-exploration-page--zh` 或 `design-exploration-artboard--zh`，继续使用原 16:11 画板、`#00f52a` 色值、原英文文案、原模块结构与原间距。
- 英文画板实测保持 807.99 × 555.49 CSS px，标题仍为 `REFINING THE EXPERIENCE`；切回中文后恢复 99:62 中文画板与“持续打磨体验”。
- 新增视觉规则全部位于 `.design-exploration-artboard--zh ...` 和 `.horizon-design-exploration-page--zh` 作用域；Horizon 其他章节与其他项目选择器未修改。

### Comparison history

- Pass 1 findings [P2]：原中文依赖全局翻译，顶部计分步骤与说明侵入“微交互”分隔线；V1 说明过长；焦点与选择反馈仍使用实心绿色填充。
- Fix：加入中文专属内容数据与结构，压缩计分步骤的垂直节奏，精简 V1 说明；将两处选中态统一为透明底色和外圈描边，并重排底部五项洞察。
- Post-fix evidence：最终全页与两张局部并排对照显示三个分区边界清晰、顶部内容不再覆盖中部分隔线、选中态无填充、五项洞察完整。
- P3：参考图底部的弱绿色地形线属于非必要装饰；按用户要求删除或弱化多余装饰，本次保留纯黑留白。
- No actionable P0/P1/P2 findings remain.

final result: passed

## Horizon 中文版第 01 页

- 视觉参考：`/Users/ccchen/Desktop/01.png`（1535 × 1024 px）。
- 产品源图：`/Users/ccchen/Desktop/1.png`；复制后的产品 asset 与源图 SHA-256 完全一致。
- 实现截图：`horizon-research-zh-final.png`；浏览器 viewport 为 1337 × 875，Chapter 01 artboard 为 798.47 × 532.31 CSS px（3:2）。
- 全页对照：`horizon-research-comparison.png`。
- “设计机会”局部对照：`horizon-research-opportunity-comparison.png`。

### Fidelity review

- 层级与节奏：passed — 标题、顶部说明、左右对比、研究方法与关键洞察遵循参考图的 3:2 构图和信息层级。
- 中文文案：passed — 所有指定文案均按要求更新；“设计机会”未添加 Horizon 前缀；无裁切或异常溢出。
- 产品素材：passed — 中文分支只使用真实正视图，保持原始比例；CSS 仅负责裁切、定位、叠加和克制的绿色环境投影。
- 既有素材：passed — 流程图标、箭头、曲线、三张研究图片、关键洞察图标、球场与 HUD 继续使用原素材。
- HUD：passed — `156 YD`、`GREEN`、`BUNKER`、`98 YD` 保持既有图层。
- 布局边界：passed — artboard 的 `scrollWidth === clientWidth` 且 `scrollHeight === clientHeight`，没有后代元素越界。
- 语言隔离：passed — `zh-CN` 使用 `horizon-research-artboard--zh` 和真实正视图；`en` 不含该 class，继续使用原英文文案与原 overflow-glasses 素材。
- 语言往返：passed — 实测 `zh-CN → en → zh-CN` 后两套 DOM 分支和素材均正确恢复。
- Production build：passed（`pnpm run build`）。
- Sites worker tests：passed（4/4）。

### Comparison history

- Pass 1：建立 3:2 中文构图并替换中文版文案。
- Pass 2：将干净球场与原 HUD 图层分离，移除旧侧视产品在中文版中的残留。
- Pass 3：提高真实正视眼镜的可见范围，将其置于球场图下半部，并修正研究区域最后 3 px 的纵向溢出。
- No P0/P1/P2 findings remain.

final result: passed

## MILESEEY Tools — annotated positioning polish (2026-08-30)

- Source visual truth: Browser Comments 2–3 supplied on 2026-08-30 for the Connected Measurement tape popup and Section 01 Project Overview image at `1159 × 731`.
- Connected before/after evidence: `/Users/yanchen/Documents/ChatGPT/作品集0828/tools-connected-popup-before.png` and `/Users/yanchen/Documents/ChatGPT/作品集0828/tools-connected-popup-after.png`.
- Connected combined comparison input: `/Users/yanchen/Documents/ChatGPT/作品集0828/tools-connected-popup-comparison.png` (`2318 × 775` pixels).
- Overview before/after evidence: `/Users/yanchen/Documents/ChatGPT/作品集0828/tools-overview-adjust-before.png` and `/Users/yanchen/Documents/ChatGPT/作品集0828/tools-overview-adjust-after.png`.
- Overview combined comparison input: `/Users/yanchen/Documents/ChatGPT/作品集0828/tools-overview-adjust-comparison.png` (`2318 × 775` pixels).
- Viewport: `1159 × 731`; each before/after pair uses the same scroll position and interaction state.

### Fidelity review

- Connected popup placement: passed — the X Tape Mini popup moved from `left=410.42px` to `420.36px`, a `9.94px` visible shift. Its `145.56 × 194.48px` size, vertical position, layer order, and source bitmap remain unchanged; the right edge ends at `565.92px`, safely inside the `672.03px` artboard.
- Overview placement: passed — the Project screen is `27.02px` farther left, bottom-aligned, and still rendered from the unchanged `393 × 852` source at its established proportional size. The subtle rotated bottom/right crop remains inside the Overview composition and does not cross into the protected right panel.
- Scope: passed — both changes are inside `@media (min-width:1121px)` and use Tools-specific selectors. The tablet/mobile branch, Tools prototype, later chapters, right project panel, Horizon, S50C, homepage, and navigation are unchanged.
- Responsive behavior: passed — checks at the `1121px` desktop edge, target `1159px`, and `1440px` found no document-level horizontal overflow; the `1120px` tablet branch retains its previous rules.
- Runtime: passed — browser logs contain Vite connection/HMR entries and no warning or error entries.
- Production build: passed — Vite transformed `4987` modules and prepared the Sites build; only the repository's existing large-chunk advisory remained.
- Sites worker suite: passed — `4/4` tests, zero failures.

No actionable P0/P1/P2 findings remain.

final result: passed

## MILESEEY Tools — Final Experience viewport fit (2026-08-30)

- Source visual truth: Browser Comments 1–2 supplied on 2026-08-30 at the `1159 × 731` Tools Final Experience state; the matching pre-change browser capture is `/Users/yanchen/Documents/ChatGPT/作品集0828/tools-final-1159-before.png` (`1159 × 731` pixels).
- Browser-rendered implementation evidence: `/Users/yanchen/Documents/ChatGPT/作品集0828/tools-final-1159-after.png` (`1159 × 731` pixels).
- Combined full-view comparison input: `/Users/yanchen/Documents/ChatGPT/作品集0828/tools-final-1159-comparison.png` (`2318 × 775` pixels), placing the before/source state and implementation in one image.
- Latest Device / Project Photos annotation evidence: `/Users/yanchen/Documents/ChatGPT/作品集0828/tools-final-two-phones-before.png` and `/Users/yanchen/Documents/ChatGPT/作品集0828/tools-final-two-phones-after.png`; combined focused comparison: `/Users/yanchen/Documents/ChatGPT/作品集0828/tools-final-two-phones-comparison.png` (`2318 × 775` pixels).
- CSS viewport: `1159 × 731`; `devicePixelRatio = 1`; `visualViewport.scale = 1`; no density normalization was required.
- State: Tools Project Detail scrolled to the end of Section 07 / Final Experience with the right sticky project-information panel visible.

### Fidelity review

- Fonts and typography: passed — the existing Tools Poppins section hierarchy, label, title, intro, and serif closing statement are unchanged. The full intro and both lines of the closing statement remain readable without overlap or truncation.
- Spacing and layout rhythm: passed — the desktop-only stage scales as one composition, preserving the existing staggered rhythm and centered quote. The Device and Project Photos cards now receive local uniform scales of `1.25` and `1.22`; their rotated boxes overlap by about `48px` vertically at `1159 × 731`, enough to read as one composition without hiding either screen.
- Colors and visual tokens: passed — the white editorial surface, teal accents, pale-blue right panel, phone shadows, and quote treatment are unchanged.
- Image quality and asset fidelity: passed — the same five supplied `393 × 852` UI images render with proportional scaling; no image was cropped internally, stretched, regenerated, replaced, or converted into code-native artwork.
- Copy and content: passed — the Final Experience label, title, introduction, and complete `Everything comes together / in one connected workspace.` statement remain intact. The requested Tools-only `SKILLS & DELIVERABLES` right-panel block is absent while `ROLE` and `PROJECT` remain unchanged.
- Interaction and accessibility: passed — the stage keeps its existing descriptive `aria-label`, every image keeps its meaningful alt text, and the unchanged `/Back` and `Next` controls are visible and enabled.
- Responsive behavior: passed — the requested desktop fit is scoped to `min-width: 1121px`; the existing tablet/mobile horizontal-stage behavior remains untouched. Checks at `1121 × 731`, `1159 × 731`, and `1440 × 900` found zero document-level horizontal overflow.
- Focused-region comparison: not required because the reported mismatch was the whole five-screen composition and complete closing copy, both clearly readable in the full-view combined comparison. No icon, typography-detail, or dense-control asset was altered.

### Comparison history

- Initial finding [P1]: the unscaled `1568px` absolute-position stage was clipped by the approximately `617px` visible desktop left pane, showing only two complete screens and part of a third; the fifth screen exceeded the stage height, and the closing statement ran outside the right clip boundary.
- Fix: on the `>1120px` branch only, restored the stage's full `1568 × 1000` design canvas, scaled the composition to `.67`, shifted its source canvas left by `140px`, set a matching desktop viewport height, and removed the inherited negative top margin so the intro remains unobstructed.
- Post-fix evidence: all five real screens now lie within the visible stage (`rightmost = 639.15px` inside a `671.72px` viewport boundary; lowest = `702.62px` inside `730.97px`), and the complete closing statement ends at `530.36px` inside the same boundary.
- Initial finding [P2]: the Tools right sticky panel still displayed the user-selected `SKILLS & DELIVERABLES` block.
- Fix: removed only that hard-coded block from `ToolsCaseStudy`; Horizon, S50C, translation data, the split shell, and the remaining Tools right-panel sections were not changed.
- Post-fix evidence: the Tools right panel now ends after `ROLE` and `PROJECT`; browser DOM inspection finds no `SKILLS & DELIVERABLES` text.
- Latest annotation [P2]: the two rightmost supporting screens were complete but visibly smaller than the Home / Overview / Annotation group.
- Fix: kept the same real images and phone frames, then enlarged only Device by `25%` and Project Photos by `22%`, moved Device slightly up/left, and retained the Photos card beneath it with restrained overlap. The stage viewport increased from `700px` to `720px` only on the desktop branch.
- Post-fix evidence: Device now measures `144.13 × 282.07px` and Project Photos `132.33 × 256.37px` on screen; the Photos card ends at `725.74px`, the complete statement ends at `605.22px`, and both remain inside the visible `731px` review frame.
- No actionable P0/P1/P2 findings remain.

### Runtime verification

- Browser logs: passed — Vite connection/HMR entries only; no warning or error entries.
- Navigation: passed — `/Back` and `Next` remain visible and enabled.
- Scroll continuity: passed — Final Experience remains the last section in the existing independent left scroll pane; the right project panel remains sticky.
- Production build: passed — Vite transformed `4987` modules and prepared the Sites build; only the repository's existing large-chunk advisory remained.
- Sites worker suite: passed — `4/4` tests, zero failures.

final result: passed

## MILESEEY Tools — Project Overview editorial composition (2026-08-30)

- Source visual truth: `/Users/yanchen/Desktop/ChatGPT Image 2026年8月30日 17_43_18.png` (`1672 × 941` pixels).
- Browser-rendered implementation evidence: `/Users/yanchen/Documents/ChatGPT/作品集0828/tools-overview-1440.png` (`1440 × 900`), `/Users/yanchen/Documents/ChatGPT/作品集0828/tools-overview-1280.png` (`1280 × 800`), and the latest `/Users/yanchen/Documents/ChatGPT/作品集0828/tools-overview-adjust-after.png` (`1159 × 731`).
- Combined full-view comparison input: `/Users/yanchen/Documents/ChatGPT/作品集0828/tools-overview-comparison-full.png`.
- Combined focused comparison inputs: `/Users/yanchen/Documents/ChatGPT/作品集0828/tools-overview-comparison-focused.png`, `/Users/yanchen/Documents/ChatGPT/作品集0828/tools-overview-project-ui-comparison.png`, and the latest bottom-alignment comparison `/Users/yanchen/Documents/ChatGPT/作品集0828/tools-overview-adjust-comparison.png`.
- CSS viewports: `1440 × 900`, `1280 × 800`, and `1159 × 731`; browser `devicePixelRatio = 1`, `visualViewport.scale = 1`, with no density normalization.
- State: Tools Project Detail open, Section 01 / Project Overview aligned to the top of the left case-study pane; right sticky information panel visible and unchanged.
- Normalization note: the supplied reference is a standalone wide composition, while the product constraint preserves the existing `63.5% / 36.5%` case-study/right-panel split. The focused comparison therefore judges the reference's typography/UI hierarchy within the live left pane rather than treating the protected right panel as design drift.

### Fidelity review

- Fonts and typography: passed — the left rail uses the existing Tools Poppins family, `600` display weight, two fixed title lines, tracked uppercase kicker, and a smaller uppercase tagline. The removed descriptive paragraph does not leave a density gap or cause a third title line at any tested desktop width.
- Spacing and layout rhythm: passed — the left rail occupies `38%` of Section 01. The dominant Project image remains `392.09 × 850.022px` before the existing `.72` page zoom, preserving the source ratio. It is now bottom-aligned to the composition, shifted about `27.02px` left and `32.92px` down on screen at `1159 × 731`, while the Home screen remains in front at the lower-left.
- Colors and visual tokens: passed — the composition remains near-white, black, and pale gray. Tools teal comes from the two real UI bitmaps; exterior measurement text is neutral gray and the floor-plan layer computes to `opacity: .085`.
- Image quality and asset fidelity: passed — exactly two independent real UI source images render at their natural `393 × 852` dimensions: `tools-home-connected.png` and `tools-project-overview.png`. The background uses the existing `floor-plan-workspace.png`; no AI redraw, merged screenshot, inline SVG, CSS drawing, or third device mockup was introduced.
- Copy and content: passed — the visible left copy is limited to `MOBILE MEASUREMENT / PROJECT WORKSPACE`, `MILESEEY / TOOLS`, and `FROM MEASUREMENT TO PROJECT.` The former overview deck is absent from the DOM. UI text and data remain untouched inside the original raster assets.
- Interaction and accessibility: passed — `/Back` and `Next` remain visible native buttons and are not disabled; meaningful alt text remains on both UI figures, while the floor-plan and measurement accents are decorative and hidden from assistive technology.
- Responsive behavior: passed — at `1159`, `1280`, and `1440px` the title stays on two lines, Project remains larger than Home, neither UI covers the left copy, the floor plan stays faint, and horizontal overflow remains `0`. The Project image scales proportionally from `850.022px` to `939.388px` and `1057.57px` in unzoomed CSS height at those widths, with its rendered ratio matching the natural `393 / 852` ratio to within `0.000003`.
- Protected areas: passed — the right information panel remains sticky at `top: 0` and full viewport height; the Prototype, Introduction, and all six later Tools sections remain present and scroll normally. The shared Tools Cube, fullscreen Hero, animated cover, spatial transition, Horizon, S50C, and About Me implementations were not modified by this scoped Overview change.

### Comparison history

- Initial finding [P2]: the first browser pass inherited the Tools desktop `zoom: .72`, leaving the new Overview only `662.4px` high in a `900px` viewport and exposing the next Prototype section below it. The smaller Home UI also sat behind the Project UI, reducing the intended two-layer composition.
- Fix: compensated Section 01's desktop minimum height with `calc(100svh / .72)`, moved the Project screen farther right, and raised the Home screen above the Project layer while keeping both source images independent.
- Post-fix evidence: all three final screenshots show a full-height editorial Overview, a `45–55%` Home-to-Project size relationship, restrained overlap, intentional right/bottom cropping, and no visible next-section leak.
- Latest annotation [P2]: at `1159 × 731`, the Project bitmap's computed image height was `973.893px`, leaving too little whitespace above the dominant UI.
- Fix: changed only the desktop Project figure to `width: clamp(394px, 34.07vw, 494px)`, `top: 11.5%`, and `left: 41%`. The image continues to use `width: 100%; height: auto`, so no content compression or source crop was introduced inside the bitmap.
- Post-fix evidence: the browser reports `850.022px` computed image height, `392.09px` width, the same natural aspect ratio, a `116.753px` unzoomed top offset, preserved right-edge crop, and no horizontal overflow. The combined before/after input shows the requested smaller, lower Project UI with visibly increased top whitespace.
- Latest annotation [P2]: the Project screen still needed to move slightly left and settle directly onto the bottom of the Overview composition.
- Fix: on the desktop branch only, replaced the percentage top offset with `top:auto; bottom:0`, moved `left` from `41%` to `35%`, and lowered the Project layer beneath the foreground Home/measurement accents without changing image width or aspect ratio.
- Post-fix evidence: at the same `scrollTop = 779.5` comparison state, the rotated Project box moved from `left=451.12px, top=31.25px` to `left=424.10px, top=64.17px`; its lower rotated corner is clipped by only about `4.31px`, giving the requested natural bottom crop. Checks at `1121 × 731`, `1159 × 731`, and `1440 × 900` produced no document-level horizontal overflow.
- No actionable P0/P1/P2 findings remain. No focused icon comparison was needed because the task preserves the original UI bitmaps and introduces no external icon component.

### Runtime verification

- Production build: passed (`pnpm run build`).
- Sites worker suite: passed (`4/4`, zero failures).
- Browser logs: passed — Vite connection and HMR messages only; no warning or error entries.
- Scroll continuity: passed — Prototype, Introduction, Problem, Structure, Core, Measure, Capture, and Final content remain in the same scroll container; the right panel stays pinned while the left content advances.

final result: passed

## Selected Works ProjectCube viewport fit

- Source visual truth: Browser Comment 1 supplied on 2026-08-30, showing the Horizon cube at a `1159 × 731` CSS viewport with the lower cuboid edge cut by the canvas.
- Browser-rendered implementation evidence: `qa/screenshots/project-cube-fit/project-cube-fit-1159x731.png` (`1144 × 722` captured pixels), `qa/screenshots/project-cube-fit/project-cube-fit-820x900.png` (`805 × 884` captured pixels), `qa/screenshots/project-cube-fit/project-cube-fit-390x844.png` (`375 × 812` captured pixels), and `qa/screenshots/project-cube-fit/tools-cube-after-clean-1159x731.png` (`1144 × 722` captured pixels).
- CSS viewports: `1159 × 731`, `820 × 900`, and `390 × 844`; the in-app browser screenshots exclude the native scrollbar gutter from their pixel output, so no density resampling was applied.
- States: Selected Works / Horizon, all four snapped cube faces, Tools animated face, ENTER, and RETURN.
- Full-view comparison: passed — the supplied annotated desktop state and revised desktop capture use the same route, active Horizon face, language, layout, and viewport. The revised cube retains the approved oversized composition while showing the complete top, side, front, and lower edges.
- Focused-region comparison: not required — the reported mismatch was the large cuboid silhouette itself, and every affected edge is clearly readable in the full-view capture.

### Fidelity and regression review

- Initial finding [P2]: the desktop filled-home camera used `z = 5`; with the established presentation tilt, the cuboid projection extended about 38 px below the WebGL viewport. CSS overflow changes could not restore pixels already clipped by the camera frustum.
- Fix: replaced the duplicated fixed desktop/mobile camera values with one aspect-aware filled-home camera calculation. Wide desktop canvases use `z = 5.9`, narrow desktop/tablet canvases receive progressively more contain distance, portrait canvases are capped safely, and mobile uses `z = 7.5`. The fullscreen flat-cover camera remains unchanged.
- Fix: centered the mobile `128vw` cube stage symmetrically with `right: -14vw` and reduced its height from `55vh` to `50vh`, preventing the complete rendered silhouette from being pushed outside the page crop.
- Post-fix evidence: the `1159 × 731`, `820 × 900`, and `390 × 844` captures show all cuboid edges with visible breathing room. All four lateral faces were rotated through at desktop size without edge loss.
- Fonts and typography: passed — no title, navigation, weight, size, line-height, tracking, or wrapping styles changed.
- Spacing and layout rhythm: passed — the title rail, navigation, section geometry, and intentional title/cube overlap remain unchanged; only the 3D camera fit and mobile cube-stage centering changed.
- Colors and visual tokens: passed — backgrounds, black body, outlines, focus treatment, and project colors remain unchanged.
- Image quality and asset fidelity: passed — existing project textures and Tools animated poster remain unchanged and continue to fill their faces without stretching.
- Copy and content: passed — all project labels and navigation copy are unchanged.
- Interaction and motion: passed — wheel/keyboard face rotation, Tools animated face, ENTER, and RETURN completed without a Vite error overlay or browser console warnings/errors.
- Responsive behavior: passed — desktop landscape, portrait tablet, and phone captures all retain the complete 3D silhouette.
- Production validation: passed — Vite production build completed (`4987` modules, `3.19s`); the existing main-chunk size advisory remains. Sites worker tests passed (`4/4`).

No actionable P0/P1/P2 findings remain. No P3 follow-up is required for this scoped correction.

final result: passed

## MILESEEY Tools — shared animated cover (2026-08-30)

- Source visual truth: `/Users/yanchen/Desktop/ChatGPT Image 2026年8月30日 13_09_13.png` (1672 × 941 px).
- Final shared asset: `public/assets/projects/tools/tools-cover-final.png` (1672 × 941 px).
- Source/asset SHA-256: `7e5a7b8fb97fa9990fee7b50e6087a15850c13a4dc210c556088ae291c3efca6`; the files are byte-identical.
- Homepage evidence: `qa/screenshots/tools-cover/tools-home-1159x731.png`.
- Fullscreen Hero evidence: `qa/screenshots/tools-cover/tools-hero-1159x731.png`.
- Full-view comparison input: `qa/screenshots/tools-cover/tools-cover-comparison-1159x731.png`.
- Focused central-floorplan comparison: `qa/screenshots/tools-cover/tools-cover-comparison-focused.png`.
- Browser viewport: 1159 × 731 CSS px. The source was normalized to the live 1.6 cover artboard with the same left-aligned cover crop before comparison.

### Fidelity review

- Image fidelity: passed — homepage Cube and Tools Section 00 both use the exact supplied bitmap; no regeneration, video, substitute illustration, or bitmap rewrite was introduced.
- Crop and composition: passed — image, SVG, Three.js texture UV, and Hero use the same left-center / xMin crop. The TOOLS title and complete central floorplan remain visible; only non-critical right-edge architecture is cropped by the existing 1.6 display surface.
- Engineering overlay: passed — 15 restrained orange paths remain bounded to the central floorplan, accompanied by four nodes, three short dimension groups, and one small scan point. Lines do not enter the TOOLS title or navigation regions.
- Motion: passed — the shared cover uses one 4000ms CSS loop with staged path drawing, nodes, dimensions, and scan motion. Browser computed styles changed across a 900ms sample and returned to the same loop range after approximately four seconds.
- Reduced motion: passed — `prefers-reduced-motion: reduce` removes the animated SVG overlay and leaves the exact static poster visible.
- Shared implementation: passed — the same `ToolsAnimatedCover` component and `tools-cover-final.png` source are used for Cube and Hero modes; no second animation implementation or new WebGL scene exists.
- Typography, color, spacing, and content: passed — the cover is an image/overlay-only change; homepage typography, project labels, navigation, Tools case-study content, and the right information panel are unchanged.

### Interaction and regression verification

- Homepage Cube: passed — the cover is projectively mapped to the real Tools plane and follows the existing Three.js rotation, perspective, face visibility, and focusable Cube interaction.
- ENTER: passed — the same Cube surface expands through the existing persistent 480ms transition. A 235ms browser capture showed one continuous cover surface with no flash or detached overlay.
- Hero handoff: passed — the fullscreen Hero resolves to one cover only; no duplicate projected Cube layer remains.
- RETURN: passed — `project → closing → idle` restores the same Tools Cube face and projected cover.
- NEXT: passed — Tools → Horizon and Horizon → S50C retain their original assets; neither project renders a Tools animated Hero.
- About Me: passed — the existing two-click entry opens `/about` and returns normally; no Tools overlay is rendered there.
- Accessibility: passed — the Cube overlay is decorative and pointer-transparent, the Hero keeps meaningful alt text, the SVG is hidden from assistive technology, and the Cube surface retains a visible in-bounds focus ring.
- Runtime: passed — no Vite error overlay or transition exception appeared during Cube, ENTER, Hero, NEXT, RETURN, S50C, Horizon, or About smoke tests.
- Production build: passed — Vite transformed 4987 modules and emitted the final asset and namespaced animation CSS; only the repository's existing large-chunk advisory remained.
- Sites worker suite: passed — 4 tests, 0 failures.

### Comparison history

- Initial finding [P1]: a hidden auxiliary transition Cube explicitly set its descendant cover to `visibility: visible`, allowing a second poster to leak over the fullscreen Hero.
- Fix: projection visibility now uses display/opacity without overriding ancestor visibility, with a scoped hidden-transition safeguard. The final Hero screenshot contains one poster only.
- Initial finding [P2]: the Hero's global image rule centered the bitmap while the SVG and Cube used a left crop, creating potential line offset and handoff drift.
- Fix: the component image selector now has scoped higher specificity and computes to `object-position: 0% 50%`, matching the SVG and Cube UV.
- Initial finding [P2]: peak overlay density and brightness competed with the supplied poster's existing engineering lines.
- Fix: reduced path opacity and glow, removed one node and one dimension group, and retained only the requested restrained engineering accent.
- No actionable P0/P1/P2 findings remain.

final result: passed

## MILESEEY Tools — LIVE Prototype collapsed entry (2026-08-29)

- Source visual truth: `/Users/yanchen/Desktop/ChatGPT Image 2026年8月29日 19_31_26.png`.
- Browser-rendered implementation: `qa/screenshots/tools-prototype-live-entry/implementation-collapsed-1159x787.png`.
- Full-view comparison input: `qa/screenshots/tools-prototype-live-entry/reference-vs-implementation-full.png`.
- Focused card comparison input: `qa/screenshots/tools-prototype-live-entry/reference-vs-implementation-focused.png`.
- Browser viewport: `1159 × 787` CSS px; browser DPR `2`; implementation screenshot normalized to `1159 × 787` pixels.
- Source dimensions: `1446 × 1087` pixels; the full comparison normalizes the source to `1047 × 787` pixels beside the implementation.
- Focused comparison: source crop `400 × 245` pixels; implementation crop `375 × 222` pixels normalized to `414 × 245` pixels.
- State: Tools case study open; signed-in Home screen visible; prototype collapsed; LIVE entry visible; right project-information panel unchanged.

### Full-view comparison

- Scope isolation: passed — the existing Tools header, section spacing, phone position, controls, Introduction boundary, case-study width, and fixed right panel retain their established structure. Page-level differences from the reference outside the LIVE entry are explicitly locked by the task and were not treated as redesign targets.
- Composition: passed — the card remains a small centered overlay within the phone preview and leaves the live App interface visible above and below it.
- Affordance hierarchy: passed — `LIVE PROTOTYPE`, the primary CTA, the hand-tap icon, and the separate Expand control establish a clear interactive reading order without becoming a modal or promotional banner.

### Focused fidelity review

- Fonts and typography: passed — the label and CTA reuse the existing Helvetica Neue utility typography; the label is uppercase at `10px/600` with `0.17em` tracking, and the CTA is `15px/600`, matching the reference hierarchy and single-line treatment.
- Spacing and layout rhythm: passed — the rendered card is `304 × 132px`, exactly 80% of the `380px` visible phone frame, centered at the same relative location as the reference; radius is `18px` and the card sits between Current Device and the Create Project / Quick Capture row.
- Colors and tokens: passed — the implementation reuses Tools teal `#079ead`, near-white `rgba(249, 252, 252, 0.94)`, a 1px translucent teal border, and low-elevation teal-neutral shadows. No gradient or dark surface was introduced.
- Image quality and icon fidelity: passed — the real iframe remains the background; the dot, ArrowRight, ArrowDown/ArrowUp, and HandTap visuals come from the existing Phosphor icon library and remain vector-sharp. No screenshot replacement, generated asset, emoji, CSS drawing, or prototype-internal change was introduced.
- Copy and content: passed — `LIVE PROTOTYPE` and `Try the interactive prototype` match the requested copy; the visual arrow is the matching vector icon.
- Interaction states: passed — the full collapsed preview is a semantic button; hover moves the card upward by 3px, slightly strengthens the shadow, and moves the CTA arrow 3px over 220ms; focus-visible and reduced-motion treatments are present.

### Interaction and runtime verification

- Inline Expand: passed — clicking the card expands the frame from `410px` to the existing `760px` desktop height in place; no modal, route change, or fullscreen action occurs.
- Collapse: passed — the LIVE card disappears while expanded and returns after Collapse.
- State preservation: passed — navigating the iframe to `My Projects`, collapsing, and expanding again preserves `My Projects`; the iframe remains mounted.
- Restart: passed — only Restart changes the iframe key and returns the prototype to `Plan your space`.
- Production browser: passed — the built output reproduced `760px` expanded and `410px` collapsed states, with the LIVE entry returning correctly.
- Console: passed — browser application logs contained no errors or warnings in development or production verification.
- Production build: passed (`vite build --configLoader native`).
- Sites worker suite: passed (4 tests, 0 failures).

### Comparison history

- Initial finding [P2]: after automated interaction inside the expanded iframe, the clipped outer frame could retain a programmatic scroll offset when collapsed, causing the preview to begin at Current Device instead of the top of the Home screen. Evidence: `qa/screenshots/tools-prototype-live-entry/initial-scroll-shift.png`.
- Fix: kept the iframe mounted, added a ref only to the outer clipping frame, and reset that frame's own scroll position to zero whenever the view becomes collapsed. The iframe's route and application state remain untouched.
- Post-fix evidence: `qa/screenshots/tools-prototype-live-entry/implementation-collapsed-1159x787.png` and both final comparison inputs show the correct Home-screen crop with the LIVE entry in place.
- No actionable P0/P1/P2 findings remain. No P3 follow-up is required for the locked scope.

final result: passed

## Horizon 01 Research — editable DOM reconstruction

- Source visual truth: `public/assets/projects/ag1/background-user-research-neutral.png` (1402 × 982 px).
- Browser-rendered English evidence: `qa/screenshots/horizon-research-dom/english-artboard-final2.png` (821 × 575 px).
- Browser-rendered Chinese evidence: `qa/screenshots/horizon-research-dom/chinese-artboard-final.png` (821 × 575 px).
- English reference normalization: the 1402 × 982 source was Lanczos-resampled to 821 × 575 at device scale factor 1 so it matched the live artboard CSS size.
- Full-view comparison: `qa/screenshots/horizon-research-dom/comparison-en-final2.png`.
- Language-state comparison: `qa/screenshots/horizon-research-dom/comparison-language-final.png`.
- Focused difference evidence: `qa/screenshots/horizon-research-dom/language-difference-x4.png`; it isolates the changed English/Chinese glyph regions while imagery, gradients, cards, dividers, and icons remain black/unchanged.
- Browser viewport: 1357 × 893 CSS px at device scale factor 1.
- States: Horizon detail / Research 01 / English and Chinese.

### Fidelity surfaces

- Fonts and typography: passed — all visible copy is semantic live text using the shared Helvetica Neue / Arial / PingFang stack; Chinese receives font-size and weight adaptation only, without a second layout or image source. Minor raster-vs-live antialiasing differences remain as P3.
- Spacing and layout rhythm: passed — the fixed 1402:982 artboard, intro, Traditional Experience, Opportunity, Research, and Insights coordinates align with the master. The language-state artboards measure identically and all 11 image rectangles are exactly equal between English and Chinese.
- Colors and visual tokens: passed — one shared CSS background, glow, card surface, border, and divider system is used by both languages. No locale-specific filter, gradient, dark mask, or background block remains.
- Image quality and asset fidelity: passed — 11 lossless PNG crops were taken directly from the English master without recoloring or regeneration. The course/HUD/glasses scene, research photography, traditional line art, curve, VS mark, and insight icons retain source pixels and aspect ratios.
- Copy and content: passed — the existing `horizonResearchCopy` English and Chinese strings populate the same headings, paragraphs, labels, articles, and list items.
- Accessibility and editability: passed — the visible title is an `h2`; sub-sections use `h3`/`h4`; Research cards are articles; Insights are list items; title and body text compute to `pointer-events: auto` and can be selected independently in Elements/annotations.
- Responsiveness: passed for the established desktop split — the artboard scales as one fixed-ratio container, while all coordinates and extracted images scale from container width and cannot reflow independently across languages.
- Runtime: passed — production build completed and the browser console contained no warnings or errors.

### Comparison history

- Iteration 1 finding [P2]: Chinese typography made the Research photos and Insight icons move down by approximately 0.93 px because their grids followed localized heading line height.
- Fix: anchored both lower visual grids to fixed artboard coordinates while leaving localized text typography adaptable.
- Post-fix evidence: browser image-rectangle comparison returned exact equality for all 11 assets in English and Chinese.
- Iteration 1 finding [P2]: the old localized implementation changed the entire base PNG and added dark cover blocks.
- Fix: removed the locale-dependent full-image source and all `horizon-research-localized-copy` masks; both languages now render one DOM and one CSS visual system.
- Post-fix evidence: outside declared text rectangles, English-vs-Chinese screenshot pixels above a 10-value RGB threshold differ by `0.0%`; mean absolute RGB difference is `0.003277` from screenshot encoding noise.
- No P0/P1/P2 findings remain. P3 differences are limited to expected live-font antialiasing and subpixel rasterization versus the flattened master PNG.

final result: passed

## Unified Cube-to-Cover ENTER motion

- Current-state recording: `/Users/ccchen/Desktop/录屏2026-08-26 12.34.14.mov`.
- Target-motion recording: `/Users/ccchen/Desktop/录屏2026-08-26 12.37.49.mov`.
- Primary implementation: `src/App.jsx` and `src/components/ProjectCube.jsx`.
- Endpoint comparison: `qa/screenshots/enter-motion/reference-vs-implementation.png`.
- Per-project evidence: `qa/screenshots/enter-motion/horizon-before-revised.png`, `qa/screenshots/enter-motion/horizon-mid-220ms-revised.png`, `qa/screenshots/enter-motion/horizon-final-revised.png`, `qa/screenshots/enter-motion/tools-before.png`, `qa/screenshots/enter-motion/tools-mid.png`, `qa/screenshots/enter-motion/tools-final.png`, `qa/screenshots/enter-motion/s50c-before-final.png`, `qa/screenshots/enter-motion/s50c-mid-final.png`, and `qa/screenshots/enter-motion/s50c-final-final.png`.

### Motion and performance review

- Single action: passed — target-face rotation, tilt removal, camera approach, viewport translation, and viewport scaling start together and complete within one 480ms ENTER action.
- Timing continuity: passed — the former readiness/decode/paint pause between face selection and expansion is absent from the project branch; ENTER contains no `setTimeout`, decode wait, or chained rotate-then-expand stage.
- Easing: passed — the cube uses a cubic power3-in-out function and the outer stage uses the matching `[0.65, 0, 0.35, 1]` curve.
- Dimensional continuity: passed — the cuboid remains visibly dimensional through the first 90% of the action, then depth flattens only during the final handoff to the already-mounted Cover.
- Asset readiness: passed — all three project Cover sources are preloaded and decoded while the homepage is mounted; ENTER never awaits decoding.
- Mount stability: passed — the selected project detail and its Section 00 Cover are mounted invisibly before ENTER and revealed only after the transition reaches fullscreen, avoiding a large React mount or content swap mid-motion.
- Transform efficiency: passed — the outer transition uses a single compositor transform while the WebGL scene updates rotation/camera/depth; perspective, width, height, left, and top are not animated frame-by-frame.
- Horizon isolated run: passed — 31 recorded frames, 17.70ms maximum frame gap, 0 frames over 30ms.
- Tools isolated run: passed — 30 recorded frames, 17.70ms maximum frame gap, 0 frames over 30ms.
- S50C isolated run: passed — 30 recorded frames, 17.40ms maximum frame gap, 0 frames over 30ms.
- Cover endpoint: passed — Horizon, Tools, and S50C all hand off at their own Section 00 Cover at scrollTop 0; no case-study content is revealed automatically.
- Navigation isolation: passed — NEXT and RETURN were not redesigned or retimed.
- About Me isolation: passed — its route and entry behavior remain outside this project ENTER path.
- Production build: passed (`vite build --configLoader native`).
- Sites worker suite: passed (4 tests, 0 failures).

final result: passed

## Unified project Cover entry and seamless handoff

- Motion references: `/Users/ccchen/Desktop/录屏2026-08-26 10.34.30.mov`, `/Users/ccchen/Desktop/录屏2026-08-26 11.29.17.mov`, and `/Users/ccchen/Desktop/录屏2026-08-26 11.33.27.mov`.
- Browser evidence: `qa/screenshots/project-cover-entry/horizon-cover.png`, `qa/screenshots/project-cover-entry/s50c-cover.png`, and `qa/screenshots/project-cover-entry/tools-cover.png`.
- Verification viewport: 1278 × 866 CSS px.
- Shared source: passed — each fullscreen cover uses the exact `project.cover.src` already used by the matching homepage cuboid face and ENTER transition.
- Horizon structure: passed — the 866 px Cover is Section 00, the existing split case begins at y = 866, and a deliberate 690 px scroll moves both boundaries to y = 176.
- S50C structure: passed — the 866 px Cover is Section 00, the established split case begins at y = 866, and a deliberate 720 px scroll moves both boundaries to y = 146.
- Tools structure: passed — the 866 px Cover is Section 00, the established split case begins at y = 866, and a deliberate 720 px scroll moves both boundaries to y = 146.
- Entry position: passed — all three project scroll containers are reset to `scrollTop = 0`; no timer, snap, or automatic content reveal was introduced.
- Handoff continuity: passed — the target detail DOM is pre-mounted but hidden before the expansion, its Cover image is decoded before motion begins, and the stage is revealed only after the transition surface has filled the viewport.
- Runtime efficiency: passed — the existing transform-based Motion timeline remains the animation driver; the fix introduces no width/height animation, repeated layout loop, or chained `setTimeout` handoff.
- Existing content: passed — Horizon, S50C, and Tools case-study DOM, copy, section order, and visual content remain directly beneath the new/retained Cover.
- Navigation isolation: passed — NEXT and RETURN retain their existing visual design and spatial behavior; only scroll reset and target-cover preparation were added for compatibility.
- About Me isolation: passed — its route, page, cube face, and entry behavior were not modified.
- Console/runtime: passed — browser application logs contained no errors or warnings across the three entries and manual-scroll checks.
- Production build: passed (`vite build --configLoader native`).

final result: passed

## Horizon fullscreen cover and manual case-study reveal

- Source visual truth: `/Users/ccchen/Desktop/录屏2026-08-26 10.34.30.mov`.
- Source frame evidence: `qa/screenshots/horizon-fullscreen-cover/reference-video-cover.png` (frame extracted at approximately 2 seconds).
- Implementation evidence: `qa/screenshots/horizon-fullscreen-cover/02-horizon-cover-scrolltop-0.png` and `qa/screenshots/horizon-fullscreen-cover/03-horizon-case-after-user-scroll.png`.
- Combined comparison input: `qa/screenshots/horizon-fullscreen-cover/04-reference-vs-implementation.png`.
- Browser viewport: 1280 × 720 CSS px at device scale factor 1.

### Fidelity review

- Transition endpoint: passed — the homepage cuboid expands into `.horizon-fullscreen-cover img`, which uses the same `projects[0].cover.src` texture as the Horizon face.
- Fullscreen surface: passed — Section 00 measures exactly 720 px at the 720 px test viewport and uses `100dvh` with a `100vh` fallback.
- Entry state: passed — `.horizon-project-scroll.scrollTop` is `0`, the cover begins at `y = 0`, ends at `y = 720`, and the case study begins at `y = 720`.
- Manual reveal: passed — the Horizon case study and right information panel remain outside the initial viewport until a real wheel/trackpad/touch scroll changes the Horizon scroll container.
- Visual structure: passed — the reference and implementation both resolve the project transition into one complete viewport-height media surface with persistent project controls above it.
- Asset fidelity: passed — the cover uses the existing Horizon homepage texture directly; no regenerated bitmap, duplicate visual, or alternate cover source was introduced.
- Existing content: passed — the original Overview and every following Horizon chapter retain their DOM, copy, images, layout classes, and order after the new cover.
- Navigation: passed — NEXT still opens S50C and RETURN still closes Horizon back to the homepage.
- Isolation: passed — S50C, Tools, and About Me entry routes and detail shells still open normally.
- Console/runtime: passed — no application error was introduced during entry, manual scroll, NEXT, RETURN, or other-project smoke tests.
- Production build: passed (`vite build`).

### Comparison history

- Initial finding [P1]: the Horizon spatial transition handed off directly to the existing Overview content, so the expanded face did not persist as a fullscreen project cover.
- Fix: introduced the Horizon-only `HorizonFullscreenCover`, moved the existing split case study immediately after it inside one Horizon scroll container, and reset that container to zero at entry.
- Initial finding [P1]: the fixed right information panel would have appeared beside a standalone cover if the old shell remained the outer viewport.
- Fix: placed the full cover before the complete split layout, then made the existing right information panel sticky only within the case-study portion.
- No P0/P1/P2 findings remain. The source recording and this portfolio intentionally use different project imagery and typography; the matched target is the spatial handoff, full-viewport cover state, and user-controlled reveal.

final result: passed

## Horizon 中文版第 02 页

- 视觉参考：`/Users/ccchen/Desktop/02.png`（1535 × 1024 px）。
- 浏览器实现：`horizon-journey-zh-final.png`；viewport 为 1337 × 875 CSS px，device scale factor 为 1。
- 实现 artboard：`horizon-journey-zh-artboard.png`（798 × 532 px，对应 798.47 × 532.31 CSS px）。
- 全页同尺度对照：`horizon-journey-comparison.png`。
- HUD 信息卡局部对照：`horizon-journey-hud-comparison.png`。
- 状态：`zh-CN`，MILESEEY Horizon，第 02 页对齐左侧案例页顶部。

### Findings

- 字体与层级：passed — 02、主标题、副标题、说明、阶段标题、行标签与痛点信息保持参考图的层级和中文密度，无异常断行。
- 间距与布局：passed — 五阶段、图片、目标、信息卡、强度曲线和四项痛点继续使用现有 3:2 栅格，主要分区比例与参考图一致。
- 色彩：passed — 深色基底、绿色 HUD、白色说明与橙红痛点保持原设计语言；中文版痛点强调色向参考图靠拢。
- 图片质量：passed — 五张阶段图片、顶部眼镜、球洞地图和需求曲线继续使用现有项目素材，无生成或替换。
- 文案：passed — 指定中文标题、说明、五个阶段、五条目标、五个行标签和四条痛点全部按要求显示；第 03 阶段无“重新”。
- 第 04 信息卡：passed — 使用现有 `complete-experience/green-preview.png`，完整显示 448 / 439 / 426、旗杆轮廓和 Move。
- 第 05 信息卡：passed — 裁切复用现有 `complete-experience/score-input.png`，可见内容仅保留 Score 3 / 4 / 5 与 Putts 2。
- 结尾总结：passed — 中文分支不渲染绿色总结；英文分支继续保留。
- 英文隔离：passed — 实测英文版仍显示原始标题、阶段、目标、标签、原 green/score DOM、TOTAL +1 和底部总结，且不带 `journey-artboard--zh`。
- 布局边界：passed — artboard 的 `scrollWidth === clientWidth` 且 `scrollHeight === clientHeight`；顶部产品图的超出部分由原父级裁切，属于既有构图。
- 固定项目导航：accepted constraint — 截图中的固定返回/下一个按钮属于用户明确要求保留的全局 sticky 导航，不计入第 02 页画板差异。

### Comparison history

- Pass 1：完成中文文案、标签、痛点和第 04 / 第 05 信息卡分支；发现计分卡仍露出 Hole 信息且 Putts 被裁切。
- Pass 2：调整现有计分素材的裁切位置，露出完整 Score 与 Putts；发现顶部仍残留 Hole 圆圈边缘。
- Pass 3：缩小并上移素材裁切区域，最终只保留 Score 3 / 4 / 5 与 Putts 2。
- No P0/P1/P2 findings remain.

final result: passed

## Horizon 中文版第 03 页

- 视觉参考：`/Users/ccchen/Desktop/03.png`（1536 × 1024 px，3:2）。
- 浏览器实现：`horizon-principles-zh-final.png`；viewport 为 1337 × 875 CSS px，浏览器 DPR 为 2，截图 API 输出已归一为 CSS 像素。
- 实现画板：`horizon-principles-zh-artboard.png`（798 × 532 px，对应 798.47 × 532.31 CSS px，3:2）。
- 英文回归基线：`horizon-principles-en-baseline.png`。
- 英文回归结果：`horizon-principles-en-regression.png`。
- 状态：`zh-CN`，MILESEEY Horizon，第 03 页对齐左侧案例画板顶部。

### Full-view comparison

- 构图与比例：passed — 中文画板从旧 1672:941 比例调整为参考图的 3:2；顶部介绍、四原则、分隔线与信息架构四个纵向分区落点与参考图一致。
- 视觉层级：passed — 左上 03、白色主标题、绿色副标题和两行说明形成清晰层级；右上只保留现有 Horizon 产品图和绿色轨迹素材，没有 slogan。
- 设计原则：passed — 4 个原则横向排列，使用细竖线分隔，不增加卡片底色；编号、名称、Phosphor 线性图标、绿色核心句与说明保持扁平且克制。
- 信息架构：passed — “球洞主页”为最大核心节点；历史 / 开始 / 设置、开始 → 球场选择 → 球洞主页、五个下级模块及两个较小的记分子页面全部以细绿色直角连线组织。
- 固定导航：accepted constraint — 浏览器全屏截图左上仍会覆盖既有 `/返回` 与 `下一个` sticky 按钮；这是用户明确要求不修改的全局结构，不计为第 03 页画板差异。

### Focused fidelity review

- 字体与排版：passed — 指定中文标题、副标题、说明、四原则文案及架构标签均为可编辑 DOM 文本；页面无“前两页”，无异常断行或截断。
- 间距与布局节奏：passed — 画板为 3:2，四原则分区与下方架构分区均以容器宽度单位缩放；根画板 `scrollWidth === clientWidth` 且 `scrollHeight === clientHeight`。
- 色彩：passed — 中文专属画板使用深黑绿色基底、白色主信息、低对比灰白说明和 Horizon 荧光绿重点；开始入口只做轻量层级强化。
- 图片与图标质量：passed — 右上复用现有 `overview/horizon-glasses.png` 与 `journey/demand-curve.png`；功能图标复用项目已安装的 Phosphor 图标库，没有生成图、占位图或自制 SVG。
- 文案与内容：passed — 4 个设计原则、5 个球洞主页功能、记分卡 / 团队记分卡及其副标题均与本次中文规范一致；正式名称 Horizon 与 495 YD 保持原样。
- 层级语义：passed — 球洞主页不渲染图片、SVG 或球形装饰；记分卡与团队记分卡使用更小节点并由记分层级线连接。
- 响应与边界：passed — 当前桌面 split viewport 无根级溢出；窄屏沿用项目既有横向可滚动画板策略，中文版仅将最小画板宽度改为对应的 3:2 基准。
- 运行时：passed — 页面加载、中文 → English → 中文切换正常；浏览器控制台无 error / warning。

### English isolation

- 英文分支不带 `principles-artboard--zh`，继续使用原 1672:941 画板、原英文文案、原四原则视觉、原 4 个功能节点和原间距。
- 修改前后的英文截图尺寸均为 1337 × 875；逐通道比较结果为 `changedChannels: 0 / 3,509,625`，`maxDelta: 0`，确认英文第 03 页像素级无变化。
- 新增布局规则全部位于 `.principles-artboard--zh ...` 作用域；Horizon 其他章节与其他项目选择器未修改。

### Comparison history

- Pass 1 findings [P1/P2]：旧中文依赖全局翻译，文案不符合指定内容；画板为 16:9，缺少顶部产品视觉；信息架构只有 4 个下级节点，且层级密度与 3:2 参考图不一致。
- Fix：增加中文专属文案数据与 `data-i18n-skip`；复用原有组件、产品素材和图标库，加入第五个“球道”节点，并用 `.principles-artboard--zh` 重新组织 3:2 分区和连线。
- Post-fix evidence：`horizon-principles-zh-final.png` 与 `horizon-principles-zh-artboard.png` 显示完整 3:2 构图；浏览器 DOM 验收确认 4 个原则、3 个一级入口、5 个主页功能、2 个记分子页面、无 slogan、无“前两页”、无球形装饰、根画板无溢出。
- P3：参考图底部的弱绿色线框地形为可选装饰；为避免引入新的非真实素材，本次保持底部留白，不影响架构层级和可读性。
- No actionable P0/P1/P2 findings remain.

final result: passed
