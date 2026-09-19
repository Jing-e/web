# 蓉城印象 · 成都文旅探索网站

> web课程作业 · 原生 HTML5 + CSS3 + JavaScript (ES6+) 实现的文旅探索网站，纯静态结构，可一键部署到 Gitee Pages。

一座来了就不想走的城市 —— 从景点推荐、蓉城风物，到留言板与心愿单，探索成都的山水、历史与烟火。

## 在线预览

- **Gitee Pages**：`https://zeng-jing0306.gitee.io/web/`（部署方式见下文）
- **本地预览**：直接双击 `index.html`，或用本地服务器 `python -m http.server` 后访问 `http://localhost:8000`

## 技术栈

| 层 | 技术 | 说明 |
|---|---|---|
| 结构 | HTML5 | 语义化标签 `<header>/<nav>/<main>/<section>/<footer>` |
| 样式 | CSS3 | CSS 变量、Flexbox、Grid、`@media (max-width: 768px)` 响应式 |
| 交互 | 原生 JavaScript (ES6+) | 无任何框架依赖，零构建 |
| 存储 | `localStorage` | 留言板、心愿单数据持久化 |
| 部署 | Gitee Pages | 纯静态，无需服务器 |

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

## 部署到 Gitee Pages

1. **新建仓库**：登录 [Gitee](https://gitee.com)，点击右上角「+」→「新建仓库」，仓库名如 `chengdu-travel`，设为「公开」。
2. **上传代码**：
   ```bash
   git remote add origin https://gitee.com/<用户名>/chengdu-travel.git
   git push -u origin master
   ```
   （也可在网页端「上传文件」直接把本地文件拖入仓库。）
3. **开启 Pages**：进入仓库 →「服务」→「Gitee Pages」→ 部署分支选 `master`、目录选「根目录」→ 点击「启动」。
4. **访问地址**：启动成功后生成 `https://<用户名>.gitee.io/chengdu-travel/`，即可在线访问。

> **备选方案**（Gitee Pages 需实名认证或审核受限时）：
> - **GitHub Pages**：同样方式推到 GitHub，在 Settings → Pages 开启，得到 `https://<用户名>.github.io/<仓库名>/`；
> - **Vercel / Netlify**：导入 Git 仓库或直接拖入项目文件夹，自动生成 `https://xxx.vercel.app`；
> - **本地演示**：直接把整个文件夹拷贝到 U 盘 / 教室电脑，双击 `index.html` 即可演示（无需联网部署）。

## 说明

本项目仅用于课程学习与演示，图片素材版权归原作者所有（Unsplash License）。
