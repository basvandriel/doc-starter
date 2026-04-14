import type { ComponentType } from "react";
import type { RouteRecord } from "vite-react-ssg";
import { Head } from "vite-react-ssg";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import { docModules } from "./docs-index";

const docRoutes: RouteRecord[] = Object.entries(docModules).map(
  ([filePath, mod]) => {
    const slug = filePath.replace("/docs/", "").replace(/\.mdx?$/, "");

    function DocPage() {
      const MDXContent = mod.default;
      const pageTitle = mod.frontmatter?.title;
      const pageDescription = mod.frontmatter?.description;

      return (
        <>
          <Head>
            <title>{pageTitle ? `${pageTitle} — Syntax` : "Syntax"}</title>
            {pageDescription && (
              <meta name="description" content={pageDescription} />
            )}
          </Head>
          <article className="prose prose-slate prose-sky max-w-none dark:prose-invert">
            <MDXContent />
          </article>
        </>
      );
    }

    return {
      path: `/${slug}`,
      Component: DocPage,
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
