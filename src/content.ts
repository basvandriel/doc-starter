import type { ComponentType } from "react";
import type { DocFrontmatter } from "./content-utils";
import { slugFromFilePath, slugToTitle } from "./content-utils";

export interface DocEntry {
  slug: string;
  title: string;
  description?: string;
  group?: string;
  path: string;
  confluencePageId?: string;
}

export function buildDocEntry(
  slug: string,
  frontmatter: DocFrontmatter,
): DocEntry {
  return {
    slug,
    title: frontmatter.title ?? slugToTitle(slug),
    description: frontmatter.description,
    group: frontmatter.group,
    path: `/${slug}`,
    confluencePageId: frontmatter.confluencePageId,
  };
}

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

export const docsGroups: { title: string; links: DocEntry[] }[] = (() => {
  const map = new Map<string, DocEntry[]>();
  for (const entry of docsManifest) {
    const key = entry.group ?? "Docs";
    if (!map.has(key)) map.set(key, []);
    map.get(key)!.push(entry);
  }
  return Array.from(map.entries()).map(([title, links]) => ({ title, links }));
})();
