import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { docsManifest, type DocEntry } from "../docs-index";

function scoreDoc(doc: DocEntry, query: string): number {
  const q = query.toLowerCase();
  const title = doc.title.toLowerCase();
  const desc = (doc.description ?? "").toLowerCase();

  if (title === q) return 20;
  let score = 0;
  if (title.startsWith(q)) score += 10;
  else if (title.includes(q)) score += 7;
  if (desc.includes(q)) score += 4;
  return score;
}

function runSearch(query: string): DocEntry[] {
  const q = query.trim();
  if (!q) return [];
  return docsManifest
    .map((doc) => ({ doc, score: scoreDoc(doc, q) }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 8)
    .map(({ doc }) => doc);
}

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function SearchDialog({ open, onClose }: Props) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<DocEntry[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  // Focus and reset when opened
  useEffect(() => {
    if (open) {
      setQuery("");
      setResults([]);
      setActiveIndex(0);
      // Defer focus so the element is in the DOM
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  // Update results on query change
  useEffect(() => {
    setResults(runSearch(query));
    setActiveIndex(0);
  }, [query]);

  // Keyboard navigation
  useEffect(() => {
    if (!open) return;
    function handler(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((i) => Math.min(i + 1, results.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((i) => Math.max(i - 1, 0));
      } else if (e.key === "Enter") {
        const doc = results[activeIndex];
        if (doc) {
          navigate(doc.path);
          onClose();
        }
      }
    }
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, results, activeIndex, navigate, onClose]);

  if (!open) return null;

  const isEmpty = query.trim() === "";

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-gray-950/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Dialog */}
      <div className="relative mx-auto mt-[15vh] w-full max-w-lg px-4">
        <div className="overflow-hidden rounded-xl bg-white shadow-2xl ring-1 ring-gray-950/10 dark:bg-gray-900 dark:ring-white/10">
          {/* Search input */}
          <div className="flex items-center gap-3 border-b border-gray-950/10 px-4 dark:border-white/10">
            <svg
              className="h-4 w-4 shrink-0 text-gray-400"
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
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search documentation…"
              className="h-12 w-full bg-transparent text-sm text-gray-900 placeholder-gray-400 focus:outline-none dark:text-white dark:placeholder-gray-500"
            />
            <button
              onClick={onClose}
              className="shrink-0 rounded border border-gray-200 px-1.5 py-0.5 font-mono text-[10px] text-gray-400 dark:border-white/15 dark:text-gray-500"
            >
              Esc
            </button>
          </div>

          {/* Results */}
          {results.length > 0 && (
            <ul className="max-h-72 overflow-y-auto py-2">
              {results.map((doc, i) => (
                <li key={doc.slug}>
                  <button
                    className={`flex w-full flex-col items-start px-4 py-2.5 text-left transition-colors ${
                      i === activeIndex
                        ? "bg-gray-100 dark:bg-white/10"
                        : "hover:bg-gray-50 dark:hover:bg-white/5"
                    }`}
                    onMouseEnter={() => setActiveIndex(i)}
                    onClick={() => {
                      navigate(doc.path);
                      onClose();
                    }}
                  >
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {doc.title}
                    </span>
                    {doc.description && (
                      <span className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">
                        {doc.description}
                      </span>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          )}

          {!isEmpty && results.length === 0 && (
            <p className="px-4 py-8 text-center text-sm text-gray-500 dark:text-gray-400">
              No results for &ldquo;{query}&rdquo;
            </p>
          )}

          {isEmpty && (
            <p className="px-4 py-8 text-center text-sm text-gray-500 dark:text-gray-400">
              Type to search documentation…
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
