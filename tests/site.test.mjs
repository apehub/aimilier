import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";

const requiredFiles = [
  "index.html",
  "styles/main.css",
  "scripts/posts.js",
  "scripts/app.js",
  "posts/index.json",
  "posts/2026/04/20260426-welcome.md",
  "posts/2026/04/20260426-my-first-story.md",
];

test("site has the required static files", () => {
  for (const file of requiredFiles) {
    assert.equal(existsSync(file), true, `${file} should exist`);
  }
});

test("html shell loads the expected assets and app regions", () => {
  const html = readFileSync("index.html", "utf8");

  assert.match(html, /logo\/logo\.png/);
  assert.match(html, /styles\/main\.css/);
  assert.match(html, /scripts\/posts\.js/);
  assert.match(html, /scripts\/app\.js/);
  assert.match(html, /id="cover"/);
  assert.match(html, /id="reader"/);
  assert.match(html, /id="postMenu"/);
});

test("post manifest points to existing markdown files", () => {
  const manifest = JSON.parse(readFileSync("posts/index.json", "utf8"));

  assert.ok(Array.isArray(manifest.posts), "manifest should expose posts array");
  assert.ok(manifest.posts.length >= 2, "manifest should include sample posts");

  for (const postPath of manifest.posts) {
    assert.equal(typeof postPath, "string");
    assert.match(postPath, /^posts\/\d{4}\/\d{2}\/\d{8}-[\w-]+\.md$/);
    assert.equal(existsSync(postPath), true, `${postPath} should exist`);
  }
});

test("markdown posts keep minimal metadata in front matter", () => {
  const manifest = JSON.parse(readFileSync("posts/index.json", "utf8"));

  for (const postPath of manifest.posts) {
    const markdown = readFileSync(postPath, "utf8");

    assert.match(markdown, /^---\r?\ndate: \d{4}-\d{2}-\d{2}\r?\ntags:\r?\n(?:  - .+\r?\n)+---/);
    assert.match(markdown, /^# .+/m, `${postPath} should have a markdown title`);
  }
});

test("javascript exposes the expected browser modules", () => {
  const postsJs = readFileSync("scripts/posts.js", "utf8");
  const appJs = readFileSync("scripts/app.js", "utf8");

  assert.match(postsJs, /window\.AimilierPosts/);
  assert.match(postsJs, /loadPostIndex/);
  assert.match(postsJs, /loadMarkdownPost/);
  assert.match(postsJs, /parsePostMarkdown/);
  assert.match(postsJs, /safeMarkdownToHtml/);
  assert.match(appJs, /DOMContentLoaded/);
});
