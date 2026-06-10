# 南有乔木的小破站

基于静态博客 + GitHub Pages 的个人博客系统。

## 功能

- 静态博客，加载速度极快
- Markdown 渲染，支持 GFM
- 在线后台管理（本地模式 / GitHub 模式）
- 支持创建、编辑、删除文章
- 支持导入 .md 文件
- 支持标签管理
- GitHub Actions 自动构建部署

## 快速开始

### 1. 本地管理文章

```bash
node server.js
```

浏览器打开 http://localhost:3000/admin.html

### 2. 部署到 GitHub Pages

```bash
# 方式一：使用部署脚本
.\deploy.ps1

# 方式二：手动操作
git add -A
git commit -m "更新博客内容"
git push origin main
```

推送后 GitHub Actions 会自动构建并部署。
访问 https://mengling02.github.io

### 3. 使用在线管理后台

1. 去 [GitHub Settings → Tokens](https://github.com/settings/tokens) 创建 Personal Access Token（勾选 `repo` 权限）
2. 访问 https://mengling02.github.io/admin.html
3. 点击顶部下拉菜单切换到 "☁️ GitHub 模式"
4. 填入 Token 和仓库信息
5. 即可在线管理文章

## 项目结构

```
├── index.html          # 首页
├── admin.html          # 管理后台
├── admin/              # 管理后台入口
├── server.js           # 本地管理服务器
├── deploy.ps1          # 部署脚本
├── .github/workflows/  # GitHub Actions 配置
├── _posts/             # Markdown 源文件
├── 2025/               # 归档页面
├── archives/           # 归档
├── categories/         # 分类
├── tags/               # 标签
├── css/                # 样式
├── js/                 # 脚本
└── images/             # 图片
```
