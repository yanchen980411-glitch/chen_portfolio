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
