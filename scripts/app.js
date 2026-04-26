document.addEventListener("DOMContentLoaded", () => {
  const elements = {
    app: document.querySelector("#app"),
    closeMenuButton: document.querySelector("#closeMenuButton"),
    cover: document.querySelector("#cover"),
    enterButton: document.querySelector("#enterButton"),
    nextButton: document.querySelector("#nextButton"),
    openMenuButton: document.querySelector("#openMenuButton"),
    pageIndicator: document.querySelector("#pageIndicator"),
    postGrid: document.querySelector("#postGrid"),
    postMenu: document.querySelector("#postMenu"),
    prevButton: document.querySelector("#prevButton"),
    reader: document.querySelector("#reader"),
  };

  const state = {
    currentIndex: 0,
    posts: [],
  };

  elements.enterButton.addEventListener("click", enterSite);
  elements.prevButton.addEventListener("click", showPreviousPost);
  elements.nextButton.addEventListener("click", showNextPost);
  elements.openMenuButton.addEventListener("click", openMenu);
  elements.closeMenuButton.addEventListener("click", closeMenu);
  elements.postMenu.addEventListener("click", closeMenuFromBackdrop);

  init();

  async function init() {
    try {
      state.posts = await window.AimilierPosts.loadPostIndex();
      renderPostGrid();
      await renderCurrentPost();
    } catch (error) {
      renderReaderMessage("故事列表没有打开", "请检查 posts/index.json 是否存在并且格式正确。");
      console.error(error);
    }
  }

  function enterSite() {
    elements.cover.classList.add("is-hidden");
    elements.app.classList.remove("is-hidden");
    elements.openMenuButton.focus();
  }

  async function renderCurrentPost() {
    const post = state.posts[state.currentIndex];

    if (!post) {
      renderReaderMessage("这里还没有故事", "在 posts 文件夹里添加 Markdown 文章后，它们会出现在这里。");
      updatePageIndicator();
      return;
    }

    elements.reader.innerHTML = '<div class="reader-status">这一页正在展开...</div>';

    try {
      const markdown = await window.AimilierPosts.loadMarkdownPost(post);
      const html = window.AimilierPosts.safeMarkdownToHtml(markdown);

      elements.reader.innerHTML = `<div class="post-content">${html}</div>`;
    } catch (error) {
      renderReaderMessage(post.title, "这篇故事暂时没有打开，请检查 Markdown 文件路径。");
      console.error(error);
    }

    updatePageIndicator();
    updateNavigationButtons();
  }

  function renderReaderMessage(title, text) {
    elements.reader.innerHTML = `
      <div class="reader-empty">
        <h2>${title}</h2>
        <p>${text}</p>
      </div>
    `;
  }

  function renderPostGrid() {
    elements.postGrid.innerHTML = state.posts
      .map((post, index) => {
        const tags = post.tags.map((tag) => `<span>${tag}</span>`).join("");

        return `
          <button class="post-card" type="button" data-index="${index}">
            <span class="post-card-date">${formatDate(post.date)}</span>
            <strong>${post.title}</strong>
            <em>${post.summary}</em>
            <span class="tag-list">${tags}</span>
          </button>
        `;
      })
      .join("");

    elements.postGrid.querySelectorAll(".post-card").forEach((card) => {
      card.addEventListener("click", async () => {
        state.currentIndex = Number(card.dataset.index);
        closeMenu();
        await renderCurrentPost();
      });
    });
  }

  async function showPreviousPost() {
    if (state.currentIndex <= 0) {
      return;
    }

    state.currentIndex -= 1;
    await renderCurrentPost();
  }

  async function showNextPost() {
    if (state.currentIndex >= state.posts.length - 1) {
      return;
    }

    state.currentIndex += 1;
    await renderCurrentPost();
  }

  function openMenu() {
    if (typeof elements.postMenu.showModal === "function") {
      elements.postMenu.showModal();
      return;
    }

    elements.postMenu.setAttribute("open", "");
  }

  function closeMenu() {
    if (elements.postMenu.open) {
      elements.postMenu.close();
    }
  }

  function closeMenuFromBackdrop(event) {
    if (event.target === elements.postMenu) {
      closeMenu();
    }
  }

  function updatePageIndicator() {
    const total = state.posts.length;
    const current = total === 0 ? 0 : state.currentIndex + 1;
    elements.pageIndicator.textContent = `${current} / ${total}`;
  }

  function updateNavigationButtons() {
    elements.prevButton.disabled = state.currentIndex <= 0;
    elements.nextButton.disabled = state.currentIndex >= state.posts.length - 1;
  }

  function formatDate(dateText) {
    if (!dateText) {
      return "没有日期";
    }

    return dateText.replaceAll("-", ".");
  }
});
