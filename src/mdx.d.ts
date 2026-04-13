// Type declarations for MDX/markdown modules processed by @mdx-js/rollup
// with remark-frontmatter + remark-mdx-frontmatter.
// remark-mdx-frontmatter v4 exports all frontmatter as a single `frontmatter` object.

declare module "*.mdx" {
  import type { ComponentType } from "react";
  const component: ComponentType;
  export default component;
  export const frontmatter:
    | { title?: string; description?: string }
    | undefined;
}

declare module "*.md" {
  import type { ComponentType } from "react";
  const component: ComponentType;
  export default component;
  export const frontmatter:
    | { title?: string; description?: string }
    | undefined;
}
