export interface DocFrontmatter {
  title?: string;
  description?: string;
  group?: string;
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
