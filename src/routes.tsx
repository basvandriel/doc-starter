import type { ComponentType } from "react";
import type { RouteRecord } from "vite-react-ssg";
import { Head } from "vite-react-ssg";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import { docModules } from "./content";

const docRoutes: RouteRecord[] = Object.entries(docModules).map(
  ([filePath, mod]) => {
    const slug = filePath.replace("/docs/", "").replace(/\.mdx?$/, "");

    function DocPage() {
      const MDXContent = mod.default;
      const pageTitle = mod.frontmatter?.title;
      const pageDescription = mod.frontmatter?.description;
      const githubRepo = import.meta.env.VITE_GITHUB_REPO ?? "basvandriel/doc-starter";
      const githubBranch = import.meta.env.VITE_GITHUB_BRANCH ?? "main";
      const editBase =
        import.meta.env.VITE_GITHUB_EDIT_BASE ??
        `https://github.com/${githubRepo}/blob/${githubBranch}`;
      const editUrl = `${editBase}${filePath}`;
      const fileName = filePath.replace("/docs/", "");

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
          <div className="mt-12 overflow-hidden rounded-[1.75rem] border border-slate-200/60 bg-slate-50/80 dark:border-slate-800/60 dark:bg-slate-950/80">
            <div className="grid gap-5 p-6 sm:grid-cols-[auto_minmax(0,1fr)] sm:items-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-[1.2rem] bg-slate-100 text-slate-700 ring-1 ring-slate-200/80 dark:bg-slate-900 dark:text-slate-300 dark:ring-white/10">
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-5 w-5 opacity-85"
                >
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.387.6.113.82-.263.82-.583 0-.287-.01-1.05-.015-2.06-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.757-1.333-1.757-1.09-.745.083-.73.083-.73 1.205.085 1.84 1.238 1.84 1.238 1.07 1.835 2.807 1.305 3.492.998.108-.775.42-1.305.763-1.605-2.665-.303-5.466-1.332-5.466-5.93 0-1.31.467-2.38 1.235-3.22-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.3 1.23a11.47 11.47 0 0 1 3.003-.404 11.45 11.45 0 0 1 3.003.404c2.29-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.873.118 3.176.77.84 1.233 1.91 1.233 3.22 0 4.61-2.804 5.625-5.476 5.92.432.372.816 1.103.816 2.222 0 1.605-.015 2.898-.015 3.293 0 .323.216.7.825.58C20.565 21.798 24 17.3 24 12c0-6.63-5.37-12-12-12Z" />
                </svg>
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-slate-900 dark:text-white">
                  Help improve this page
                </p>
                <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
                  This documentation is open source. If you spot a typo, missing
                  step, or outdated example, submit a GitHub edit and make it
                  better for everyone.
                </p>
                <div className="mt-5 flex flex-wrap items-center gap-3">
                  <a
                    href={editUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-700 underline-offset-4 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
                  >
                    <span>Edit page on GitHub</span>
                    <svg
                      viewBox="0 0 20 20"
                      fill="none"
                      stroke="currentColor"
                      className="h-4 w-4"
                      strokeWidth="1.5"
                    >
                      <path
                        d="M5 10h10m0 0l-3-3m3 3l-3 3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </a>
                  <span className="rounded-full border border-slate-200 bg-slate-100 px-3 py-1 text-xs text-slate-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
                    {fileName}
                  </span>
                </div>
              </div>
            </div>
          </div>
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
