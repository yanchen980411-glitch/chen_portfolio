# Fidelity Ledger — 严琛个人作品集 v1

## Hero

<!-- identity-section:hero status=pass -->

- Reference: `references/locked/v1/01-hero.png`
- Render evidence: `qa/screenshots/desktop/hero.png`、`qa/screenshots/ultrawide/hero.png`、`qa/screenshots/mobile/hero.png`
- Same-input comparison: `qa/comparisons/hero.jpg`
- Must-preserve anchors: 超大姓名；描边职业标题；暖灰白背景；右侧单一线框正方体；四个外部项目面 selector；底部滚动提示与角色元数据。
- Gate evidence: 三秒内可读出姓名、角色与智能硬件方向；没有生成式人物或无依据品牌证据；桌面左右构图和移动端纵向重排均无交叠；04 明确为“项目待更新”。
- Measured deviation: 本机中文字面比参考略窄，职业标题整体高度约小 5–8%；没有改变第一焦点、换行逻辑或留白用途。
- Decision: `pass`。字体回退属于允许偏差。

## Works

<!-- identity-section:works status=pass -->

- Reference: `references/locked/v1/02-selected-works.png`
- Render evidence: `qa/screenshots/desktop/works.png`、`qa/screenshots/desktop/works-faces.png`（01–04 四面状态）、`qa/screenshots/ultrawide/works.png`、`qa/screenshots/mobile/works.png`
- Same-input comparison: `qa/comparisons/works.jpg`
- Must-preserve anchors: 单一连续正方体；AG1、S50C、Tools App 原图直接构成三个项目面；中性无项目内容的顶/底；实心当前标题与描边非当前标题；04 诚实空状态。
- Gate evidence: 三组真实项目素材以居中 `cover` UV 铺满各自的正方形侧面，不拉伸、不重复、无贴纸式白框；黑色实体和克制棱线仍清楚表达真实立方体。拖拽、滚轮、方向键与触屏均单步吸附；01–03 可进入，04 不打开；详情画廊仍以 `contain` 完整展示原图。
- Measured deviation: 用户通过浏览器标注明确删除底部控制组、右上索引说明、原型标签、时钟与斜线装饰，并在 2026-08-15 进一步批准“更大、黑色、图片铺满整面”。最终桌面与超宽视口的立方体视觉体量提高；375px 证据中左前缘保留约 14px 安全边距，完整落在视口内。方图 `cover` 会裁去 S50C 与 Tools App 的部分长边，但中心识别区、项目标题轨道、原始素材来源、四面模型与交互路径保持。
- Decision: `pass`，含用户批准的 `intentional deviation`。受控裁切只用于立方体导航预览；详情媒体不裁切，也没有生成新项目或改变证据含义。

## Project Detail

<!-- identity-section:project-detail status=pass -->

- Reference: `references/locked/v1/03-project-detail.png`
- Render evidence: `qa/screenshots/desktop/detail.png`、`qa/screenshots/ultrawide/detail.png`、`qa/screenshots/mobile/detail.png`
- Same-input comparison: `qa/comparisons/detail.jpg`
- Must-preserve anchors: 媒体优先的 60/40 双栏；右侧项目身份与角色；真实截图序列；返回/下一个；移动端说明在上、媒体在下。
- Gate evidence: 15 张素材按原始比例完整显示；AG1 4:3、S50C 3:4、Tools 手机长图均无裁切；内容只陈述可由材料支持的职责与设计取舍，无虚构指标；详情横向滚动已清零。
- Measured deviation: 参考首图选用主要操作界面，实际纵向画廊按内容清单从首页开始，但同一组真实 AG1 证据和媒体重量未改变；该顺序在 `restoration-plan` 中已锁定。
- Decision: `pass`。

## Contact

<!-- identity-section:contact status=pass -->

- Reference: `references/locked/v1/04-contact.png`
- Render evidence: `qa/screenshots/desktop/contact.png`、`qa/screenshots/ultrawide/contact.png`、`qa/screenshots/mobile/contact.png`
- Same-input comparison: `qa/comparisons/contact.jpg`
- Must-preserve anchors: 左侧描边宣言；线框正方体；四面 legend；右侧黑色联系面板；白色实心邮件 CTA；右上导航。
- Gate evidence: 联系任务是唯一高对比动作；邮箱来自用户材料，电话未公开；移动端首个 844 CSS px 视口可见主 CTA；没有表单传输或虚构社交链接。
- Measured deviation: 实现加入低调“复制邮箱”备选，属于可访问性补充；卡片正文比参考略小，但仍保持清晰层级和对比度。
- Decision: `pass`。

## Cross-section checks

- Colors/tokens: `pass`
- Typography/hierarchy: `pass`
- Source asset fidelity and crop: `pass`
- Desktop/wide/mobile overlap: `pass`
- Core navigation and interactions: `pass`
- Reduced-motion path and focus visibility: `pass`
- Browser console errors/warnings: `pass`（0 条页面 error / warn）
- Production build: `pass`
- Sites worker tests: `pass`（4 / 4）
