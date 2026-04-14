export interface DocFrontmatter {
  title?: string;
  description?: string;
  group?: string;
  confluencePageId?: string;
}

export interface DocEntry {
  slug: string;
  title: string;
  description?: string;
  group?: string;
  path: string;
  confluencePageId?: string;
}

export function slugFromFilePath(filePath: string) {
  return filePath.replace(/^\/docs\//, "").replace(/\.mdx?$/i, "");
}

export function slugToTitle(slug: string) {
  return slug
    .split("/")
    .map((segment) =>
      segment
        .replace(/[-_]/g, " ")
        .replace(/\b\w/g, (char) => char.toUpperCase()),
    )
    .join(" / ");
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
