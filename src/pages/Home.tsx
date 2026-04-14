import { Link } from "react-router-dom";
import { Head } from "vite-react-ssg";
import { docsManifest } from "../content";

export default function Home() {
  return (
    <>
      <Head>
        <title>Syntax — Documentation template</title>
        <meta
          name="description"
          content="A clean documentation starter built with Vite, React, MDX and Tailwind CSS."
        />
      </Head>

      {/* Intro */}
      <div className="space-y-4 pb-10 border-b border-zinc-200 dark:border-zinc-800">
        <p className="text-xs font-semibold uppercase tracking-widest text-sky-500">
          Documentation
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-white">
          Syntax
        </h1>
        <p className="leading-7 text-zinc-600 dark:text-zinc-400">
          A minimal documentation starter built with Vite, React, MDX and
          Tailwind CSS. Every page is pre-rendered at build time — no server
          required.
        </p>
        <div className="flex items-center gap-5 pt-1 text-sm">
          <Link
            to={docsManifest[0]?.path ?? "/"}
            className="font-medium text-zinc-900 transition hover:text-sky-500 dark:text-white dark:hover:text-sky-400"
          >
            Get started →
          </Link>
          <a
            href="https://github.com"
            className="text-zinc-500 transition hover:text-zinc-700 dark:hover:text-zinc-300"
          >
            GitHub
          </a>
        </div>
      </div>

      {/* Pages */}
      <div className="mt-10 space-y-1">
        <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-600">
          Pages
        </p>
        {docsManifest.map((doc) => (
          <Link
            key={doc.slug}
            to={doc.path}
            className="group flex items-start gap-4 rounded-sm py-3 pr-2 transition"
          >
            <svg
              className="mt-0.5 h-4 w-4 shrink-0 text-zinc-300 transition group-hover:text-sky-500 dark:text-zinc-700"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
              />
            </svg>
            <div>
              <p className="text-sm font-medium text-zinc-700 transition group-hover:text-zinc-900 dark:text-zinc-300 dark:group-hover:text-white">
                {doc.title}
              </p>
              {doc.description && (
                <p className="mt-0.5 text-sm text-zinc-400 dark:text-zinc-600">
                  {doc.description}
                </p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
