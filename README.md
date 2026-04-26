# Aimilier

`aimilier.cn` 是一个和小朋友一起制作的个人网站项目。

第一版特点：

- 纯静态页面
- 不需要 npm
- 适合 GitHub Pages
- 用 Markdown 写文章
- 用 JavaScript 读取文章并展示成幻灯片

## 本地预览

因为浏览器直接打开 `index.html` 时可能不能读取 Markdown 文件，建议在项目根目录启动一个本地静态服务器：

```powershell
python -m http.server 8000
```

然后打开：

```text
http://localhost:8000
```

## 新增文章

1. 在 `posts/年/月/` 目录新建一个 `.md` 文件，例如 `posts/2026/04/20260426-my-story.md`。
2. 在 Markdown 文件顶部写最少的元数据：

```markdown
---
date: 2026-04-26
tags:
  - 故事
  - 练习
---

# 文章标题

这里开始写正文。
```

3. 在 `posts/index.json` 里添加这个 Markdown 文件路径。
4. 刷新网页，就可以在文章目录里看到它。

## 部署到 GitHub Pages

把这个仓库推送到 GitHub 后，在仓库设置里启用 GitHub Pages，选择从主分支部署即可。
