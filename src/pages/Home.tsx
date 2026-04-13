import { Link } from "react-router-dom";
import { Head } from "vite-react-ssg";
import { docsManifest } from "../docs-index";

const features = [
  {
    label: "MDX-ready",
    description:
      "Write docs in plain Markdown or extend them with React components inline.",
  },
  {
    label: "Static generation",
    description:
      "Every page is pre-rendered at build time — no server required.",
  },
  {
    label: "Tailwind styling",
    description: "Purely utility-based. No custom CSS layers to fight against.",
  },
];

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

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <div className="space-y-5 pb-12">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-sky-500">
          Documentation template
        </p>
        <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
          Write docs.{" "}
          <span className="bg-linear-to-r from-sky-400 to-indigo-400 bg-clip-text text-transparent">
            Ship fast.
          </span>
        </h1>
        <p className="max-w-xl text-base leading-7 text-slate-400">
          A minimal Vite + React + MDX starter with a polished docs layout,
          responsive sidebar, and SSG out of the box.
        </p>
        <div className="flex flex-wrap items-center gap-3 pt-1">
          <Link
            to={docsManifest[0]?.path ?? "/"}
            className="inline-flex items-center gap-1.5 rounded-full bg-sky-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-sky-400"
          >
            Get started
            <svg
              className="h-3.5 w-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
          <a
            href="https://github.com"
            className="inline-flex items-center gap-1.5 rounded-full border border-white/10 px-5 py-2.5 text-sm font-medium text-slate-300 transition hover:border-white/20 hover:text-white"
          >
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z" />
            </svg>
            View on GitHub
          </a>
        </div>
      </div>

      {/* ── Feature grid ─────────────────────────────────────────────── */}
      <div className="grid gap-px border border-white/5 bg-white/5 sm:grid-cols-3">
        {features.map((f) => (
          <div key={f.label} className="bg-slate-900 p-6">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-500">
              {f.label}
            </p>
            <p className="mt-3 text-sm leading-6 text-slate-400">
              {f.description}
            </p>
          </div>
        ))}
      </div>

      {/* ── Docs listing ─────────────────────────────────────────────── */}
      <div className="mt-16 space-y-4">
        <h2 className="text-[11px] font-semibold uppercase tracking-widest text-slate-500">
          Pages
        </h2>
        <div className="divide-y divide-white/5">
          {docsManifest.map((doc) => (
            <Link
              key={doc.slug}
              to={doc.path}
              className="group flex items-center justify-between py-4"
            >
              <div className="space-y-0.5">
                <p className="text-sm font-medium text-slate-300 transition group-hover:text-white">
                  {doc.title}
                </p>
                <p className="text-sm text-slate-500">
                  {doc.description ?? "View documentation."}
                </p>
              </div>
              <svg
                className="h-4 w-4 shrink-0 text-slate-600 transition group-hover:text-sky-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
