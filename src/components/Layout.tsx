import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function Layout() {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-400 antialiased">
      {/* ── Header ───────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-40 h-14 border-b border-white/5 bg-slate-900/90 backdrop-blur">
        <div className="flex h-full items-center gap-6 px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <a href="/" className="flex shrink-0 items-center gap-2.5">
            <span className="flex h-6 w-6 items-center justify-center rounded-[5px] bg-linear-to-br from-sky-400 to-indigo-500 text-[11px] font-bold text-white">
              S
            </span>
            <span className="text-sm font-semibold text-white tracking-tight">
              Syntax
            </span>
          </a>

          {/* Search */}
          <div className="hidden flex-1 lg:flex">
            <button
              type="button"
              className="flex w-full max-w-sm items-center gap-2 rounded-md border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-slate-500 transition hover:border-white/20 hover:bg-white/10 focus:outline-none"
            >
              <svg
                className="h-4 w-4 shrink-0"
                fill="none"
                viewBox="0 0 20 20"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
              <span>Search docs…</span>
              <kbd className="ml-auto font-sans   text-[10px] tracking-widest text-slate-600">
                ⌘K
              </kbd>
            </button>
          </div>

          {/* GitHub */}
          <a
            href="https://github.com"
            className="ml-auto text-slate-500 transition hover:text-white lg:ml-0"
            aria-label="GitHub"
          >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z" />
            </svg>
          </a>
        </div>
      </header>

      {/* ── Body ─────────────────────────────────────────────────────── */}
      <div className="flex">
        {/* Sidebar column */}
        <aside className="hidden w-64 shrink-0 lg:block">
          <div className="sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto border-r border-white/5 px-6 py-10">
            <Sidebar />
          </div>
        </aside>

        {/* Content column */}
        <main className="min-w-0 flex-1">
          <div className="mx-auto max-w-3xl px-6 py-12 sm:px-8 lg:px-12">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
