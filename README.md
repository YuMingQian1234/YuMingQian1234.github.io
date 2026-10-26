# Mingqian Yu · 个人主页

Mingqian Yu 的个人主页，部署在 GitHub Pages：

**<https://yumingqian1234.github.io/>**

纯 HTML / CSS / JavaScript 手写，没有构建步骤、没有第三方依赖，修改后 push 即可更新。

当前研究兴趣：**LLM Pretraining、Looped Transformer、高效推理、生成与多模态**。

![页面预览](assets/preview.jpg)

## 页面内容

- 首屏：个人介绍、研究关键词、GitHub / arXiv / Hugging Face 入口
- 关于：教育背景、研究兴趣、快速了解
- 研究方向：大模型与推理、生成与多模态、数据与工程
- 论文发表：一作论文列表（作者、发表平台、arXiv / PDF / 代码链接）
- 经历：SJTU AI Lab、PKU MIPL、YueXin Tech 实习，以及教育经历
- 联系：GitHub、arXiv、SportsCom 数据集

## 论文发表

目前两篇第一作者论文，均发布在 arXiv 预印本平台：

1. **T-LoopFormer: Token-Level Elastic-Depth Looped Transformers for Latent Reasoning with Dynamic Routing**
   - 作者：Mingqian Yu, Wenpeng Zhang, Shaobo Cui, Peilin Zhao
   - 平台：arXiv preprint · cs.AI · 2026
   - 链接：[arXiv:2609.15160](https://arxiv.org/abs/2609.15160) · [PDF](https://arxiv.org/pdf/2609.15160) · [代码](https://github.com/YuMingQian1234/T-LoopFormer)

2. **ContraFM-S2O: Flow Matching-Based One-step SAR-to-Optical Image Translation Model with Contrastive Learning**
   - 作者：Mingqian Yu, Wei-kuan Chiang, Qiurui Wang, Peilin Zhao
   - 平台：arXiv preprint · cs.CV · 2026
   - 链接：[arXiv:2609.31378](https://arxiv.org/abs/2609.31378) · [PDF](https://arxiv.org/pdf/2609.31378)

> 如果论文后续被会议或期刊接收，直接修改 `index.html` 里 `#papers` 区块的 `pub-venue` 和链接即可。

## 目录结构

```
.
├── index.html          # 页面内容（主要改这里）
├── favicon.svg         # 站点图标
├── .nojekyll           # 告诉 GitHub Pages 不要用 Jekyll 处理
├── assets/
│   ├── style.css       # 样式、配色、响应式
│   ├── main.js         # 主题切换、动效、导航等交互
│   ├── avatar.jpg      # 头像
│   ├── og-card.html    # 生成分享图的源文件
│   ├── og.png          # 社交平台分享卡片（1200×630）
│   └── preview.jpg     # README 中的页面预览
└── README.md
```

## 本地预览

直接双击 `index.html` 即可，或在目录下运行：

```bash
python -m http.server 8000
```

然后访问 <http://localhost:8000>。

## 更新内容

页面部署在 `main` 分支，GitHub Pages 会自动构建。修改后执行：

```bash
git add .
git commit -m "Update personal site"
git push
```

等 1–2 分钟刷新 <https://yumingqian1234.github.io/> 即可。

## 可修改的地方

### 1. 文字与链接

主要修改 `index.html`。所有外链都集中在页面上，替换时搜索对应 URL 即可：

| 内容 | 位置 |
| --- | --- |
| 姓名、学校、研究方向 | 首屏、关于、页脚 |
| GitHub | `https://github.com/YuMingQian1234` |
| T-LoopFormer 论文 | `https://arxiv.org/abs/2609.15160` |
| SportsCom 数据集 | `https://huggingface.co/datasets/Yumq123/SportsCom` |
| 实习与教育经历 | `#journey` 时间线 |

### 2. 头像

替换 `assets/avatar.jpg` 即可，建议使用正方形图片（≥ 800×800）。页面会自动裁剪成 4:5 的肖像比例。

### 3. 加回邮箱

目前页面没有公开邮箱。如果想加，把 `index.html` 联系区的按钮换成：

```html
<a class="btn btn-primary" href="mailto:you@example.com">发一封邮件</a>
```

并在「快速了解」里加一行邮箱即可。

### 4. 配色

打开 `assets/style.css`，文件顶部的 `:root` 是浅色主题，`[data-theme="dark"]` 是深色主题。改这几个变量就能整体换肤：

```css
--accent: #e8491d;   /* 主色 */
--violet: #6b4ef5;   /* 辅助色 */
--bg: #f6f2ea;       /* 背景 */
```

### 5. 社交分享图

- 直接替换 `assets/og.png` 即可。
- 想重新生成：用浏览器打开 `assets/og-card.html`，截图 1200×630，或用 Edge 无头模式：

```bash
msedge --headless --window-size=1200,630 --screenshot=assets/og.png assets/og-card.html
```

## 部署说明

仓库名必须是 `<用户名>.github.io`。当前仓库已经配置为：

- 分支：`main`
- GitHub Pages：从 `main` 分支根目录部署
- 站点地址：<https://yumingqian1234.github.io/>

如果 Pages 没有自动刷新，去 **Settings → Pages** 确认 Source 是 **Deploy from a branch**、分支 `main`、目录 `/ (root)`。

## 功能

- 响应式布局，适配桌面 / 平板 / 手机
- 浅色 / 深色主题，跟随系统并记住选择
- 入场动画、滚动显隐、数字增长、角色轮播
- 滚动进度条、导航高亮、移动端全屏菜单
- 尊重 `prefers-reduced-motion`
- 语义化标签、键盘焦点样式、跳转主要内容链接
- 无第三方字体、图标、统计脚本

## License

页面代码可自由使用和修改。页面中的个人信息来自公开 GitHub 资料，更新时请以本人最新信息为准。
