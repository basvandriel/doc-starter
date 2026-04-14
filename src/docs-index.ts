// Eagerly import all doc modules so their frontmatter exports (title, description)
// are available at bundle time for the sidebar and home page.
// The MDX component (default export) is also included, but doc pages are small
// and this avoids a separate manifest generation step.

import type { ComponentType } from "react";
import type { DocEntry, DocFrontmatter } from "./lib/docs";
import { slugFromFilePath, buildDocEntry } from "./lib/docs";

export const docModules = import.meta.glob<{
  default: ComponentType;
  frontmatter?: DocFrontmatter;
}>("/docs/**/*.md", { eager: true }) as Record<
  string,
  {
    default: ComponentType;
    frontmatter?: DocFrontmatter;
  }
>;

export const docsManifest: DocEntry[] = Object.entries(docModules)
  .map(([filePath, mod]) =>
    buildDocEntry(slugFromFilePath(filePath), mod.frontmatter ?? {}),
  )
  .sort((a, b) => a.slug.localeCompare(b.slug));

/** Docs grouped by their `group` frontmatter field. Ungrouped docs land in "Docs". */
export const docsGroups: { title: string; links: DocEntry[] }[] = (() => {
  const map = new Map<string, DocEntry[]>();
  for (const entry of docsManifest) {
    const key = entry.group ?? "Docs";
    if (!map.has(key)) map.set(key, []);
    map.get(key)!.push(entry);
  }
  return Array.from(map.entries()).map(([title, links]) => ({ title, links }));
})();
