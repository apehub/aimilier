# Aimilier Static Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a zero-npm static GitHub Pages site for `aimilier.cn` with a fairy-tale cover, slide-style Markdown article reader, and card-style article index.

**Architecture:** `index.html` provides the semantic shell, `styles/main.css` owns all visual design, `scripts/posts.js` owns Markdown/post loading, and `scripts/app.js` owns UI state and rendering. Articles are Markdown files listed manually in `posts/index.json` so the site works on GitHub Pages.

**Tech Stack:** Static HTML, CSS, vanilla JavaScript, browser `fetch`, CDN `marked` for Markdown rendering, GitHub Pages.

---

### Task 1: Static Shell And Content Files

**Files:**
- Create: `index.html`
- Create: `posts/index.json`
- Create: `posts/welcome.md`
- Create: `posts/my-first-story.md`
- Create: `README.md`

- [ ] **Step 1: Create the HTML shell**

Create `index.html` with a cover screen, app header, reader section, menu dialog, and CDN `marked` script loaded before local scripts.

- [ ] **Step 2: Create sample Markdown content**

Create two Markdown posts so navigation and rendering can be verified immediately.

- [ ] **Step 3: Create the article manifest**

Create `posts/index.json` with `id`, `title`, `date`, `summary`, `tags`, and `file` for each sample post.

- [ ] **Step 4: Add README instructions**

Create `README.md` explaining zero-npm local preview and GitHub Pages usage.

### Task 2: Data Loading And Rendering Logic

**Files:**
- Create: `scripts/posts.js`
- Create: `scripts/app.js`

- [ ] **Step 1: Implement post loading helpers**

`scripts/posts.js` exports helpers on `window.AimilierPosts`: `loadPostIndex`, `loadMarkdownPost`, and `safeMarkdownToHtml`.

- [ ] **Step 2: Implement UI state and rendering**

`scripts/app.js` loads the manifest, tracks the current post index, renders article HTML, renders card index, and wires buttons for enter, previous, next, menu open, menu close, and card selection.

- [ ] **Step 3: Implement friendly error states**

If the manifest or article file fails to load, render a friendly message inside the reader instead of a blank page.

### Task 3: Fairy-Tale Visual System

**Files:**
- Create: `styles/main.css`

- [ ] **Step 1: Add global visual tokens**

Define pastel colors, readable fonts, background texture from `logo/bg.png`, rounded panels, and soft shadows.

- [ ] **Step 2: Style the cover and reader**

Make the cover feel like a picture book entrance and the reader feel like a soft paper card.

- [ ] **Step 3: Style the card index**

Use responsive CSS grid with `repeat(auto-fit, minmax(150px, 1fr))` so desktop can fit around six cards per row while mobile remains readable.

- [ ] **Step 4: Add accessibility styles**

Add focus outlines, button states, responsive layout, and reduced-motion support.

### Task 4: Verification

**Files:**
- Verify: `index.html`
- Verify: `scripts/posts.js`
- Verify: `scripts/app.js`
- Verify: `styles/main.css`
- Verify: `posts/index.json`

- [ ] **Step 1: Run local static server**

Run `python -m http.server 8000` from the project root.

- [ ] **Step 2: Check browser behavior manually**

Open `http://localhost:8000`, confirm the cover enters the reader, previous/next buttons move between posts, menu opens and closes, and card clicks load the selected article.

- [ ] **Step 3: Run lightweight file checks**

Run a small local check to confirm required files exist and `posts/index.json` is valid JSON.
