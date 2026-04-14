import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import SearchDialog from "./SearchDialog";
import Sidebar from "./Sidebar";
import ThemeToggle from "./ThemeToggle";

export default function Layout() {
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    function handler(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    }
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <div className="min-h-screen bg-white text-zinc-600 antialiased dark:bg-zinc-950 dark:text-zinc-400">
      <header className="sticky top-0 z-40 flex h-14 items-center border-b border-zinc-200 bg-white px-4 sm:px-6 dark:border-zinc-800 dark:bg-zinc-950">
        <a href="/" className="mr-8 flex shrink-0 items-center gap-2.5">
          <div className="flex h-6 w-6 items-center justify-center rounded bg-sky-500 text-[11px] font-bold leading-none text-white">
            S
          </div>
          <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
            Syntax
          </span>
        </a>

        <button
          type="button"
          onClick={() => setSearchOpen(true)}
          className="hidden h-8 w-full max-w-xs items-center gap-2 rounded-md bg-zinc-100 px-3 text-sm text-zinc-500 ring-1 ring-zinc-300 transition hover:ring-zinc-400 focus:outline-none dark:bg-zinc-900 dark:ring-zinc-700/60 dark:hover:ring-zinc-600 lg:flex"
        >
          <svg
            className="h-3.5 w-3.5 shrink-0"
            fill="none"
            viewBox="0 0 20 20"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
          <span>Search…</span>
          <kbd className="ml-auto font-sans text-[10px] text-zinc-400 dark:text-zinc-600">
            ⌘K
          </kbd>
        </button>

        <div className="ml-auto flex items-center gap-4">
          <ThemeToggle />
          <a
            href="https://github.com"
            className="text-zinc-500 transition hover:text-zinc-700 dark:hover:text-zinc-200"
            aria-label="GitHub"
          >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z" />
            </svg>
          </a>
        </div>
      </header>

      <div className="flex">
        <aside className="hidden w-80 shrink-0 lg:block">
          <div className="sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto border-r border-gray-950/10 px-6 py-8 dark:border-white/10">
            <Sidebar />
          </div>
        </aside>

        <main className="min-w-0 flex-1">
          <div className="mx-auto max-w-2xl px-6 py-14 sm:px-10 lg:px-16">
            <Outlet />
          </div>
        </main>
      </div>

      <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  );
}
