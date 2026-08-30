# 严琛个人作品集复刻计划

状态：第四步素材审核已通过，按用户要求自动继续。  
参考图锁定版本：`references/locked/v1/`  
构建负责人：`identity-skill` 内置 `references/frontend-app-builder.md`（本机未安装独立 builder）。

## 1. 站点范围与视觉基线

- 单页中文个人作品集，顺序为 Hero → Selected Works → Contact。
- Selected Works 内包含项目选择状态与项目详情覆盖层/详情状态，不新增独立路由。
- 视觉基线：Belen Jones 式大字号编辑排版、实心/描边项目标题、右上胶囊导航、项目色满屏背景与中央 WebGL 项目立方体。Selected Works 的实心立方体使用黑色基底，并以整面 `cover` 的真实项目截图形成主要视觉重量。
- 当前项目数为 3；立方体固定提供 4 个绕竖轴旋转的项目侧面：`01 AG1`、`02 S50C`、`03 TOOLS APP`、`04 项目待更新`。顶面与底面中性且不可选择。
- 第四面是诚实的空状态，不生成虚构项目或占位截图。

## 2. 锁定设计系统

### 色彩 token

- `--ink: #080a09`
- `--paper: #efeaea`
- `--works-ag1: #daddd4`
- `--detail-ag1: #e0ecdc`
- `--contact: #ece3e2`
- `--project-s50c: #dce8ee`
- `--project-tools: #eeeae2`
- `--signal-ag1: #00f51a`
- `--signal-s50c: #18bfc2`
- `--signal-tools: #14b8c4`
- `--white: #ffffff`

### 字体角色

- Display：优先 `Arial Black` / `Noto Sans SC` / `PingFang SC` 重黑回退；英文用粗窄 grotesk 气质。
- Body：`PingFang SC` / `Noto Sans SC` / system sans。
- Label/Nav：`IBM Plex Mono` 气质的等宽回退；不依赖远程字体才能完成首版。
- 大标题使用紧行距、较小字距；非当前项目用描边字，当前项目用实心字。

### Chrome 与组件族

- 桌面右上：白色胶囊导航，柔和投影；当前页使用黑色 1px 描边。
- 移动端：顶部四格细边框导航，替代桌面胶囊组。
- 不新增 bento、渐变、光晕、玻璃拟态、无意义图标或装饰卡片。

## 3. Reference-to-build map

### Hero

- Reference：`references/locked/v1/01-hero.png`
- Render contract：`C0 code-native + WebGL`。
- Three-second message：严琛是专注智能硬件与配套应用的交互 / UX 设计师。
- Personal evidence：三个真实项目名与 3 项目 / 4 侧面的映射。
- Authored move：线框立方体预告作品导航，滚动进入作品区后填入真实项目纹理。
- Code layer：姓名、职业标题、定位文案、导航、项目面按钮、向下提示、线框立方体及动效。
- Shared material：none。
- Integrated scene：none。
- Independent media：none。
- Must preserve：左侧超大姓名与描边职业标题、右侧单只立方体、四面 selector、暖灰白背景。
- Responsive：桌面左右分布；移动端姓名在上、立方体居中、顶部四格导航。
- Topology：`section-specific`；Hero 的标题网格和立方体 runway 不与其他 section 共用定位。

### Selected Works

- Reference：`references/locked/v1/02-selected-works.png`
- Render contract：`C2 independent-media + WebGL`。
- Three-second message：当前项目是 AG1；放大的正方体侧面是项目导航；共 3 个真实项目和 1 个待更新侧面。
- Personal evidence：用户提供的真实 AG1、S50C、Tools App 界面。
- Authored move：滚轮/拖动/方向键旋转 90° 到下一项目面；标题实心状态、背景色、编号与纹理同步。
- Code layer：项目标题轨道、元数据、背景、导航、WebGL 立方体与空项目面。项目切换保留在标题、立方体拖拽/滚轮/键盘/触屏行为中，不再显示额外控制面板。
- Independent media：每项目一张首图作为 WebGL texture，均为 `source`；前三张纹理保持原始比例，以居中 UV `cover` 裁切铺满完整正方形侧面，不拉伸、不平铺。
- Must preserve：一只等边立方体；Selected Works 中视觉占比更大且基底为黑色；截图直接属于整个侧面、无白色相框或设备外壳；顶/底保持无项目内容的中性实色；04 面为黑底反白的 code-native 空状态。
- Exclusion zone：立方体侧面允许用户批准的居中 `cover` 裁切，但项目识别核心区域不得被文字、线条或另一个项目遮挡；详情截图完整 UI 边界不得裁切。
- Responsive：桌面左标题/右侧放大立方体；移动端标题缩短置顶、立方体居中，以左右滑动切换。
- Topology：`section-specific`；只共享按钮与 typography primitive。

### Project Detail

- Reference：`references/locked/v1/03-project-detail.png`
- Render contract：`C2 independent-media`。
- Three-second message：AG1 项目、作者角色、界面证据与核心设计取舍。
- Personal evidence：真实界面截图；经材料支持的硬件约束、流程和交付。
- Authored move：桌面 60/40 媒体/粘性说明；同一项目截图纵向序列。
- Code layer：导航、标题、年份、类型、角色、项目说明、取舍、技能/交付、媒体容器和返回行为。
- Independent media：当前项目全部真实截图，均 `contain`。
- Must preserve：媒体优先、说明次之、无编造指标；界面图注保留为代码文字。
- Responsive：移动端信息在上、截图在下；顶部四格导航固定。
- Topology：`section-specific`；独立双栏/单列布局。

### Contact

- Reference：`references/locked/v1/04-contact.png`
- Render contract：`C0 code-native + WebGL`。
- Three-second message：联系严琛并发送邮件。
- Personal evidence：姓名、交互 / UX 角色和智能硬件方向。
- Authored move：作品立方体在结尾退回线框；黑色联系面板成为唯一高对比任务。
- Code layer：全部文字、导航、面板、邮件 CTA、复制邮箱备选、线框立方体和项目 legend。
- Independent media：none。
- Must preserve：左侧描边宣言、右侧黑面板、白色主 CTA、单只线框立方体。
- Responsive：联系面板移至标题下方，CTA 全宽，立方体在面板之后。
- Topology：`section-specific`。

## 4. 素材 manifest

所有 PNG 都是用户提供的真实项目界面，图片层级均为 `independent-media`，状态均为 `source → ready`。详情画廊继续使用固定比例容器与 `object-fit: contain`；三张立方体首图使用 WebGL 居中 `cover` UV，仅在立方体侧面做显示裁切，源文件不变。不从参考图裁切素材，不生成替代图。

| Final path | Project | Role | Source | Ratio | Usage |
| --- | --- | --- | --- | --- | --- |
| `public/assets/projects/ag1/ag1-home.png` | AG1 | 详情 01 | `AG1 主要界面/首页.png` | 4:3 | contain |
| `public/assets/projects/ag1/ag1-core-play.png` | AG1 | 立方体首图 / 详情 02 | `AG1 主要界面/主要操作界面.png` | 4:3 | cube cover / detail contain |
| `public/assets/projects/ag1/ag1-course-overview.png` | AG1 | 详情 03 | `AG1 主要界面/球场全览.png` | 4:3 | contain |
| `public/assets/projects/ag1/ag1-scorecard.png` | AG1 | 详情 04 | `AG1 主要界面/成绩.png` | 4:3 | contain |
| `public/assets/projects/s50c/s50c-home.png` | S50C | 详情 01 | `S50C 主要界面/首页.png` | 3:4 | contain |
| `public/assets/projects/s50c/s50c-single-measure.png` | S50C | 详情 02 | `S50C 主要界面/单次测量.png` | 3:4 | contain |
| `public/assets/projects/s50c/s50c-measure-result-light.png` | S50C | 立方体首图 / 详情 03 | `S50C 主要界面/白色背景测量.png` | 3:4 | cube cover / detail contain |
| `public/assets/projects/s50c/s50c-function-customize.png` | S50C | 详情 04 | `S50C 主要界面/功能自定义.png` | 3:4 | contain |
| `public/assets/projects/s50c/s50c-settings.png` | S50C | 详情 05 | `S50C 主要界面/设置.png` | 3:4 | contain |
| `public/assets/projects/tools/tools-home-connected.png` | Tools App | 立方体首图 / 详情 01 | `app 主要界面/首页—已连接.png` | 393:852 | cube cover / detail contain |
| `public/assets/projects/tools/tools-project-list.png` | Tools App | 详情 02 | `app 主要界面/项目页面——normal.png` | 393:852 | contain |
| `public/assets/projects/tools/tools-create-project.png` | Tools App | 详情 03 | `app 主要界面/创建项目.png` | 393:852 | contain |
| `public/assets/projects/tools/tools-project-overview.png` | Tools App | 详情 04 | `app 主要界面/项目详情页- overview-2.png` | 393:852 | contain |
| `public/assets/projects/tools/tools-project-team.png` | Tools App | 详情 05 / publish-review | `app 主要界面/项目详情页- Teams-1.png` | 393:852 | contain |
| `public/assets/projects/tools/tools-account.png` | Tools App | 详情 06 / publish-review | `app 主要界面/我的账户.png` | 393:947 | contain |

### 真实性与公开风险

- AG1、S50C 的距离、日期、比分等只作为原型界面数据，不在 live copy 中写成真实测量或结果指标。
- Tools App 的头像、姓名、邮箱、地点与团队数据属于原型演示内容。用户已允许公开截图；第一版保留原图但不在网页文字中复述这些信息，正式发布前仍标记 `publish-review`。
- 电话不公开；联系区使用简历中的邮箱，附加“复制邮箱”作为邮件客户端失败备选。

## 5. 交互与动效锁定

- 作品区滚轮每次只切换一个 90° 项目面；触控横滑同理。
- 拖动时立方体实时旋转；松手后用低回弹 spring 吸附到最近的 90°。
- `←/→`、四面按钮与 Enter/Space 都可操作；焦点可见。
- 01–03 点击当前面进入详情；04 只显示空状态，不打开虚构项目。
- 详情以覆盖层/同页状态出现，`/返回` 恢复作品区同一面。
- 尊重 `prefers-reduced-motion`：禁用惯性和大幅过渡，仅保留即时状态切换。
- 动画只使用 transform/opacity；WebGL 渲染循环避免每帧对象分配。

## 6. 允许偏差与 QA

- 允许：移动端重排；远程字体不可用时使用锁定的本地回退；联系邮箱的复制按钮属于无障碍低风险补充。
- 用户标注偏差（2026-08-15）：Selected Works 删除底部控制说明、右上索引说明、原型标签、时钟与右下斜线装饰，并扩大立方体视觉占比。该偏差由用户直接批准，保留项目主体、真实截图、四面数据模型和核心切换/进入行为。
- 用户增量反馈（2026-08-15）：Selected Works 立方体再温和放大，实体基底改为黑色，01–03 原始截图以不拉伸的居中 `cover` 铺满各自完整侧面。详情画廊仍完整 `contain`；这项调整只改变立方体展示裁切与视觉重量，不改变项目证据、四面模型或交互。
- 禁止：把立方体改回棱柱；把截图包进设备外壳；生成项目素材；新增 section、路由、指标、客户或案例主张。
- QA viewports：桌面 `1672×941`、超宽 `2200×1200`、移动 `390×844`。
- 每个 section 均需独立截图并与锁定参考图对照；最终运行 evidence verifier。
