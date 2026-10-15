# 蓉城印象 · 成都文旅探索网站

> web课程作业 · 原生 HTML5 + CSS3 + JavaScript (ES6+) 实现的文旅探索网站，纯静态结构，可部署到任意静态托管平台。

一座来了就不想走的城市 —— 从景点推荐、蓉城风物，到留言板与心愿单，探索成都的山水、历史与烟火。

## 在线预览

- **在线网址**：<https://jing-e.github.io/web/>
- **本地预览**：直接双击 `index.html`，或用本地服务器 `python -m http.server` 后访问 `http://localhost:8000`

## 技术栈

| 层 | 技术 | 说明 |
|---|---|---|
| 结构 | HTML5 | 语义化标签 `<header>/<nav>/<main>/<section>/<footer>` |
| 样式 | CSS3 | CSS 变量、Flexbox、Grid、`@media (max-width: 768px)` 响应式 |
| 交互 | 原生 JavaScript (ES6+) | 无任何框架依赖，零构建 |
| 存储 | `localStorage` | 留言板、心愿单数据持久化 |
| 部署 | 静态托管（EdgeOne Pages / GitHub Pages） | 纯静态，无需服务器 |

## 功能一览

1. **首页轮播图** —— 自动播放 / 上一张·下一张 / 圆点指示 / 悬停暂停 / 触摸滑动
2. **景点分类筛选** —— 全部 / 自然风光 / 历史文化 / 城市地标 / 美食打卡，DOM 动态切换
3. **景点详情弹窗** —— 点击「查看详情」弹出模态框，支持关闭按钮 / 遮罩 / ESC 关闭
4. **留言板** —— 昵称 + 留言，`localStorage` 持久化，支持删除
5. **心愿单** —— 点击卡片 ♡ 收藏，右侧面板展示，支持移除，`localStorage` 持久化
6. **响应式适配** —— 移动端汉堡菜单、单列网格、自适应排版

## 目录结构

```
├── index.html          # 首页（语义化骨架 + 所有区块）
├── css/
│   └── style.css       # 全局样式（变量 / 布局 / 组件 / 响应式）
├── js/
│   └── main.js         # 核心交互（轮播 / 筛选 / 弹窗 / localStorage）
├── images/             # 本地图片资源目录（预留，可替换 Unsplash 外链）
├── pages/              # 预留子页面目录（如需拆分多页）
└── README.md           # 本文档
```

## 运行方式

```bash
# 方式一：直接打开
双击 index.html

# 方式二：本地静态服务器（推荐，可避免部分浏览器 file:// 限制）
cd 项目根目录
python -m http.server 8000
# 浏览器访问 http://localhost:8000
```

## 图片说明与替换

当前页面使用 **Unsplash 免版权外链**（真实高清图片），并已配置规范的 `alt` 描述与 JS 图片兜底（外链失效时显示品牌占位图）。

若需替换为本地资源：

1. 将图片放入 `images/` 目录，命名如 `panda.jpg`、`qingcheng.jpg`；
2. 修改 `js/main.js` 中 `ATTRACTIONS` 数组的 `img` 字段，以及 `index.html` 中轮播图 / 风物卡的 `src`，改为 `images/xxx.jpg`；
3. 类名与 `data-*` 属性均已规范化，替换不影响交互逻辑。

## Git 提交记录（Angular 规范）

本仓库已通过 Git 管理并提交，核心提交如下：

```bash
git init
git add .
git commit -m "feat: 完成成都文旅探索网站全部功能"
```

> 若答辩需要体现「分步开发轨迹」，可在实际开发过程中按以下节奏逐次提交：
> `feat(structure): 初始化项目目录与语义化页面骨架` → `feat(carousel): 实现首页自动/手动轮播图组件` → `feat(filter): 实现景点卡片分类筛选与模态详情弹窗` → `feat(storage): 实现留言板与心愿单 localStorage 持久化` → `feat(responsive): 响应式适配与视觉优化`

## 部署与在线访问

> ⚠️ **Gitee Pages 已于 2025 年停止服务**，Gitee 仓库仅用于代码托管与版本控制，不再提供 Pages 静态托管。

### 仓库地址

- **Gitee 仓库（作业提交）**：`https://gitee.com/zeng-jing0306/web`
- **GitHub 仓库（部署源）**：`https://github.com/Jing-e/web`

### 在线访问（静态托管）

本项目为纯静态站点，已部署在 **GitHub Pages**，可随时访问：

> **<https://jing-e.github.io/web/>**

如需更换托管平台，可参考以下方案：

**方案一：腾讯云 EdgeOne Pages（国内访问更快，可选升级）**

1. 注册 [腾讯云](https://cloud.tencent.com) 并完成实名认证；
2. 进入 EdgeOne Pages 控制台，新建项目；
3. 从 GitHub 导入 `Jing-e/web` 仓库（或直接上传本项目文件夹）；
4. 部署完成后获得 `https://xxx.edgeone.app` 形式的访问地址。

> 提示：`github.io` 在国内访问速度不稳定，若需现场演示，建议补部署 EdgeOne 作为国内访问入口。

**方案二：本地演示（无需联网）**

直接把整个文件夹拷贝到 U 盘 / 教室电脑，双击 `index.html` 即可演示。

## 说明

本项目仅用于课程学习与演示，图片素材版权归原作者所有（Unsplash License）。
