import type { ComponentType } from "react";
import type { RouteRecord } from "vite-react-ssg";
import { Head } from "vite-react-ssg";
import Layout from "./components/Layout";
import Home from "./pages/Home";

// Single eager glob — source of truth for both the sidebar manifest and routes.
// Eager loading is fine: docs are small, and SSG bundles everything anyway.
const docModules = import.meta.glob<{
  default: ComponentType;
  frontmatter?: { title?: string; description?: string };
}>("/docs/**/*.md", { eager: true });

export interface DocEntry {
  slug: string;
  title: string;
  description: string | undefined;
  path: string;
}

export const docsManifest: DocEntry[] = Object.entries(docModules)
  .map(([filePath, mod]) => {
    const slug = filePath.replace("/docs/", "").replace(/\.mdx?$/, "");
    return {
      slug,
      title: mod.frontmatter?.title ?? slug,
      description: mod.frontmatter?.description,
      path: `/docs/${slug}`,
    };
  })
  .sort((a, b) => a.slug.localeCompare(b.slug));

function makeDocPage(mod: (typeof docModules)[string]) {
  const MDXContent = mod.default;
  const pageTitle = mod.frontmatter?.title;
  const pageDescription = mod.frontmatter?.description;
  return function DocPage() {
    return (
      <>
        <Head>
          <title>{pageTitle ? `${pageTitle} — Docs` : "Docs"}</title>
          {pageDescription && (
            <meta name="description" content={pageDescription} />
          )}
        </Head>
        <article className="prose prose-slate max-w-none">
          <MDXContent />
        </article>
      </>
    );
  };
}

const docRoutes: RouteRecord[] = Object.entries(docModules).map(
  ([filePath, mod]) => {
    const slug = filePath.replace("/docs/", "").replace(/\.mdx?$/, "");
    return {
      path: `/docs/${slug}`,
      Component: makeDocPage(mod),
    };
  },
);

export const routes: RouteRecord[] = [
  {
    path: "/",
    element: <Layout />,
    entry: "src/components/Layout.tsx",
    children: [
      {
        index: true,
        Component: Home,
      },
      ...docRoutes,
    ],
  },
];
