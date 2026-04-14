import { NavLink } from "react-router-dom";
import { docsGroups } from "../content";

const linkClass =
  "inline-block border-l border-transparent text-sm/6 text-gray-600 hover:border-gray-950/25 hover:text-gray-950 dark:text-gray-300 dark:hover:border-white/25 dark:hover:text-white aria-[current]:border-gray-950 aria-[current]:font-semibold aria-[current]:text-gray-950 dark:aria-[current]:border-white dark:aria-[current]:text-white pl-5 sm:pl-4";

const railClass =
  "flex flex-col gap-2 border-l border-[color-mix(in_oklab,_var(--color-gray-950),white_90%)] dark:border-[color-mix(in_oklab,_var(--color-gray-950),white_20%)]";

export default function Sidebar() {
  return (
    <nav className="flex flex-col gap-8">
      {/* ── Introduction (home) ───────────────── */}
      <div className="flex flex-col gap-3">
        <h3 className="font-mono text-sm/6 font-medium tracking-widest text-gray-500 uppercase sm:text-xs/6 dark:text-gray-400">
          Introduction
        </h3>
        <ul className={railClass}>
          <li className="-ml-px">
            <NavLink to="/" end className={linkClass}>
              Overview
            </NavLink>
          </li>
        </ul>
      </div>

      {/* ── Doc groups ───────────────────────── */}
      {docsGroups.map((group) => (
        <div key={group.title} className="flex flex-col gap-3">
          <h3 className="font-mono text-sm/6 font-medium tracking-widest text-gray-500 uppercase sm:text-xs/6 dark:text-gray-400">
            {group.title}
          </h3>
          <ul className={railClass}>
            {group.links.map((doc) => (
              <li key={doc.slug} className="-ml-px">
                <NavLink to={doc.path} className={linkClass}>
                  {doc.title}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  );
}
