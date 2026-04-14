---
title: Configuration
description: Customize the build pipeline, plugins, and styling
group: Getting started
---

# Configuration

## `vite.config.ts`

The Vite config wires together all plugins:

```ts
export default defineConfig({
  plugins: [
    { enforce: 'pre', ...mdx({ remarkPlugins: [...] }) },
    react({ include: /\.(jsx|js|mdx|md|tsx|ts)$/ }),
    tailwindcss(),
  ],
})
```

| Plugin | Purpose |
|---|---|
| `@mdx-js/rollup` | Compiles `.md` / `.mdx` files to React components |
| `remark-frontmatter` | Parses YAML frontmatter blocks |
| `remark-mdx-frontmatter` | Exports each frontmatter key as a named ES export |
| `@tailwindcss/vite` | Integrates Tailwind CSS v4 |

## Frontmatter

Every doc supports a YAML frontmatter block at the top:

```yaml
---
title: Page Title
description: Short description shown on the home page and in meta tags
---
```

`remark-mdx-frontmatter` turns each key into a named export, so you can
import them anywhere:

```ts
import { title, description } from '../docs/getting-started.md'
```

## Styling

The content area uses Tailwind Typography's `prose` class for readable
markdown rendering. Customise it via `src/index.css`:

```css
@import "tailwindcss";
@plugin "@tailwindcss/typography";

/* Override prose defaults */
.prose { --tw-prose-links: theme(colors.blue.600); }
```

## Base path (GitHub Pages subdirectory)

Set `base` in `vite.config.ts` and pass `basename` to the router:

```ts
// vite.config.ts
export default defineConfig({ base: '/my-repo/' })
```

```tsx
// src/main.tsx
export const createRoot = ViteReactSSG({
  routes,
  basename: import.meta.env.BASE_URL,
})
```

## Static generation

`vite-react-ssg` pre-renders one HTML file per route. Because the doc routes
are concrete paths (not `:param` patterns), they are all picked up
automatically — no `getStaticPaths` configuration needed.

See the [vite-react-ssg docs](https://github.com/Daydreamer-riri/vite-react-ssg)
for advanced SSG options.
