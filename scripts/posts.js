(function () {
  async function fetchText(path) {
    const response = await fetch(path);

    if (!response.ok) {
      throw new Error(`Unable to load ${path}`);
    }

    return response.text();
  }

  async function loadPostIndex() {
    const response = await fetch("posts/index.json");

    if (!response.ok) {
      throw new Error("Unable to load the post index.");
    }

    const data = await response.json();

    if (!Array.isArray(data.posts)) {
      throw new Error("The post index is missing its posts list.");
    }

    return Promise.all(data.posts.map(loadPostFromPath));
  }

  async function loadMarkdownPost(post) {
    if (!post || !post.file) {
      throw new Error("The selected post does not have a Markdown file.");
    }

    if (post.body) {
      return post.body;
    }

    const markdown = await fetchText(post.file);
    return parsePostMarkdown(markdown, post.file).body;
  }

  async function loadPostFromPath(file) {
    const markdown = await fetchText(file);
    return parsePostMarkdown(markdown, file);
  }

  function parsePostMarkdown(markdown, file) {
    const parsed = splitFrontMatter(markdown);
    const title = extractTitle(parsed.body) || readableTitleFromFile(file);
    const summary = extractSummary(parsed.body);

    return {
      id: file.replace(/^posts\//, "").replace(/\.md$/, ""),
      file,
      title,
      summary,
      date: parsed.meta.date || "",
      tags: parsed.meta.tags || [],
      body: parsed.body,
    };
  }

  function splitFrontMatter(markdown) {
    if (!markdown.startsWith("---")) {
      return {
        meta: {},
        body: markdown.trim(),
      };
    }

    const match = markdown.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);

    if (!match) {
      return {
        meta: {},
        body: markdown.trim(),
      };
    }

    return {
      meta: parseSimpleYaml(match[1]),
      body: markdown.slice(match[0].length).trim(),
    };
  }

  function parseSimpleYaml(yaml) {
    const meta = {};
    const lines = yaml.split(/\r?\n/);

    for (let index = 0; index < lines.length; index += 1) {
      const line = lines[index];

      if (line.startsWith("date:")) {
        meta.date = line.slice("date:".length).trim();
      }

      if (line.startsWith("tags:")) {
        meta.tags = [];

        while (lines[index + 1] && lines[index + 1].startsWith("  - ")) {
          index += 1;
          meta.tags.push(lines[index].slice("  - ".length).trim());
        }
      }
    }

    return meta;
  }

  function extractTitle(markdown) {
    const titleLine = markdown.split(/\r?\n/).find((line) => line.startsWith("# "));
    return titleLine ? titleLine.slice(2).trim() : "";
  }

  function extractSummary(markdown) {
    const lines = markdown
      .replace(/^# .+$/m, "")
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter((line) => line && !line.startsWith("#") && !line.startsWith(">") && !line.startsWith("- "));

    return lines[0] || "打开这篇小故事。";
  }

  function readableTitleFromFile(file) {
    return file
      .split("/")
      .pop()
      .replace(/^\d{8}-/, "")
      .replace(/\.md$/, "")
      .replaceAll("-", " ");
  }

  function safeMarkdownToHtml(markdown) {
    if (!window.marked || typeof window.marked.parse !== "function") {
      return `<pre>${escapeHtml(markdown)}</pre>`;
    }

    return window.marked.parse(markdown);
  }

  function escapeHtml(value) {
    return value
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  window.AimilierPosts = {
    loadPostIndex,
    loadMarkdownPost,
    parsePostMarkdown,
    safeMarkdownToHtml,
  };
})();
