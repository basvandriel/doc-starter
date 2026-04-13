// Eagerly import all doc modules so their frontmatter exports (title, description)
// are available at bundle time for the sidebar and home page.
// The MDX component (default export) is also included, but doc pages are small
// and this avoids a separate manifest generation step.

import type { ComponentType } from "react";

export interface DocEntry {
  slug: string;
  title: string;
  description: string | undefined;
  path: string;
}

const docModules = import.meta.glob<{
  default: ComponentType;
  frontmatter?: { title?: string; description?: string };
}>("/docs/**/*.md", { eager: true }) as Record<
  string,
  {
    default: ComponentType;
    frontmatter?: { title?: string; description?: string };
  }
>;

export const docsManifest: DocEntry[] = Object.entries(docModules)
  .map(([filePath, mod]) => {
    const slug = filePath.replace("/docs/", "").replace(/\.mdx?$/, "");
    return {
      slug,
      title: mod.frontmatter?.title ?? slug,
      description: mod.frontmatter?.description,
      path: `/${slug}`,
    };
  })
  .sort((a, b) => a.slug.localeCompare(b.slug));
