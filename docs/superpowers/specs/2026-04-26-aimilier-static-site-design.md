# Aimilier Static Site Design

## Goal

Build the first version of `aimilier.cn` as a playful personal website for a 9-year-old child to learn web pages with an adult. The site should feel like a soft fairy-tale picture book, stay easy to understand, and run on GitHub Pages without npm or a build step.

## Audience And Tone

The primary audience is the child and family visitors. The experience should feel warm, gentle, cute, and exploratory rather than technical. The design should make it easy to explain what each file does: HTML is the page, CSS is the look, JavaScript is the behavior, and Markdown is the article content.

## Technical Direction

- Use static `HTML + CSS + JavaScript`.
- Do not use Vite, npm, React, Vue, or a heavy CSS framework in the first version.
- Use `logo/logo.png` as the brand logo.
- Use `logo/bg.png` as the page background texture.
- Use GitHub Pages as the deployment target.
- Use a small browser-side Markdown renderer from CDN, such as `marked`, because this avoids npm while keeping articles in Markdown.
- Keep the structure easy to migrate later if the project grows.

## Site Structure

The first visit opens on a cover welcome screen. The user clicks an enter button to move into the reading experience.

The reading experience behaves like a slide deck:

- One article is shown at a time.
- Previous and next buttons move through articles.
- A menu button opens an article index.
- The article index uses card-style entries.
- Desktop layout aims for about six cards per row when there is enough space.
- Smaller screens automatically reduce the number of cards per row.

## Content Model

Article content will live in Markdown files under `posts/`.

The first version uses a manually maintained article manifest, for example `posts/index.json`. Each entry includes:

- `id`
- `title`
- `date`
- `summary`
- `tags`
- `cover`
- `file`

This is the safest approach for GitHub Pages because browsers cannot automatically scan a folder on a static host. The project may later add tooling to generate this manifest automatically, but the first version keeps it explicit and teachable.

## Proposed Files

- `index.html`: page shell and semantic layout.
- `styles/main.css`: fairy-tale visual system, layout, responsive cards, reading view.
- `scripts/posts.js`: load the post manifest and Markdown files.
- `scripts/app.js`: UI state, navigation, menu, rendering.
- `posts/index.json`: article manifest.
- `posts/welcome.md`: first sample article.
- `posts/my-first-story.md`: second sample article.
- `README.md`: simple instructions for local preview and GitHub Pages.

## UX Details

The cover screen should show the logo, a short welcome sentence, and a friendly enter button.

The reading screen should keep the article area calm and clear. Decorative effects should be light in version one: soft shadows, rounded cards, pastel colors, gentle paper-like background, and simple transitions.

The menu should feel like opening a small storybook shelf. Article cards should show title, date, summary, and tags. Clicking a card closes the menu and opens that article.

## Error Handling

If the article list cannot load, show a friendly message explaining that the story list did not open.

If a Markdown file cannot load, show a friendly message for that article instead of leaving the page blank.

## Accessibility

The first version should include:

- Real buttons for clickable actions.
- Keyboard focus styles.
- Readable contrast.
- Responsive layout for mobile and desktop.
- Meaningful image alt text.

## Testing And Verification

Because this is a static project with browser behavior, verification should include:

- Loading the page through a local static server.
- Confirming the cover screen enters the reader.
- Confirming previous and next navigation works.
- Confirming the menu opens and closes.
- Confirming selecting a card loads the matching Markdown article.
- Confirming the page works from relative paths suitable for GitHub Pages.

## Out Of Scope For Version One

- npm or build tooling.
- Automated folder scanning for Markdown posts.
- Admin editing UI.
- Complex animation effects.
- Search, comments, accounts, or backend services.
