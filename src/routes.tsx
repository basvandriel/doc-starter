import type { ComponentType } from "react";
import type { RouteRecord } from "vite-react-ssg";
import { Head } from "vite-react-ssg";
import Layout from "./components/Layout";
import Home from "./pages/Home";

// Lazily import each doc — each becomes its own code-split chunk.
// Because these are concrete paths (not `:param` patterns), vite-react-ssg
// pre-renders every one of them automatically at build time.
const docModules = import.meta.glob<{
  default: ComponentType;
  frontmatter?: { title?: string; description?: string };
}>("/docs/**/*.md") as Record<
  string,
  () => Promise<{
    default: ComponentType;
    frontmatter?: { title?: string; description?: string };
  }>
>;

const docRoutes: RouteRecord[] = Object.keys(docModules).map((filePath) => {
  const slug = filePath.replace("/docs/", "").replace(/\.mdx?$/, "");
  return {
    path: `/${slug}`,
    lazy: async () => {
      const mod = await docModules[filePath]();
      const MDXContent = mod.default;
      const pageTitle = mod.frontmatter?.title;
      const pageDescription = mod.frontmatter?.description;
      function DocPage() {
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
      }
      return { Component: DocPage };
    },
  };
});

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
