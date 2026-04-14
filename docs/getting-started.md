---
title: Getting Started
description: Learn how to get up and running in minutes
group: Getting started
---

# Getting Started

Welcome to the doc starter! This site is built with:

- **Vite** — fast build tooling and dev server
- **React** — UI framework
- **MDX** — Markdown with JSX component support
- **Tailwind CSS** — utility-first styling
- **vite-react-ssg** — static site generation (one HTML file per route)

## Installation

Clone the repo and install dependencies:

```bash
npm install
```

## Development

Start the dev server with hot-reload:

```bash
npm run dev
```

## Building

Generate fully static HTML for every page:

```bash
npm run build
```

Output lands in `dist/` — ready to deploy to GitHub Pages, Netlify, Vercel, or any static host.

## Adding a doc page

Create a new `.md` file anywhere inside `docs/`:

```md
---
title: My New Page
description: A brief description shown on the home page
---

# My New Page

Content goes here. You can use **Markdown**, JSX components, and code blocks.
```

That's it — the file is automatically:

1. Discovered via `import.meta.glob`
2. Added to the sidebar and home page link list
3. Pre-rendered as `/docs/my-new-page.html` at build time
