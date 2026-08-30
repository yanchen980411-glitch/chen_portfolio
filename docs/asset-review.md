# 素材审核与复刻执行 brief

状态：accepted（用户要求生成第一版并默认继续，故审查通过后自动进入复刻）。

## 审核结果

- Hero：0 张 section raster；所有文字、导航与线框立方体为 code-native / WebGL。
- Selected Works：3 张真实项目首图，已整理到 `public/assets/projects/`；立方体几何与第 4 空面由 WebGL/code 负责。
- Project Detail：15 张真实项目截图已整理完毕，均保持原始像素和宽高比，统一使用 `object-fit: contain`。
- Contact：0 张 section raster；联系面板、CTA 与线框立方体为 code-native / WebGL。
- 未生成任何项目图片，未从锁定参考图切片，未修改用户源文件。

## 路径与检查

- AG1：`public/assets/projects/ag1/`，4 张，600×450，accepted。
- S50C：`public/assets/projects/s50c/`，5 张，450×600，accepted。
- Tools App：`public/assets/projects/tools/`，6 张，393×852 或 393×947，accepted with publish-review。
- 第 4 面：`code-native`，文案为“项目待更新”，不需要 placeholder raster。

## 构建执行

- 使用 Product Design `prototype` 模板，React + Vite。
- 3D 使用一只真实 WebGL 正方体；Selected Works 实体为黑色并温和放大，前三张真实首图以居中 `cover` UV 铺满各自完整侧面；四个侧面按 90° 切换，顶部/底部不承载项目内容。
- 交互动效使用物理感但低回弹的旋转吸附；正文与页面转场只使用 transform/opacity。
- 逐 section 实现并在 `1672×941`、`2200×1200`、`390×844` 验证。
- 详情中的真实截图不裁切；立方体首图只做经用户批准的居中 `cover` 显示裁切，源文件不变。所有截图不互相遮挡，不使用 AI 生成替代物。

## 已知发布风险

- Tools App 的团队页与账户页包含原型头像、姓名和邮箱等演示信息；用户已允许公开截图，首版保留，但正式发布前仍建议再次检查。
- 电话不公开。
