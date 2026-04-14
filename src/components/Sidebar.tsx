import { NavLink } from "react-router-dom";
import { docsGroups } from "../content";

const linkClass =
  "inline-block border-l border-transparent text-sm/6 text-slate-600 hover:border-slate-300 hover:text-slate-900 dark:text-slate-400 dark:hover:border-slate-600 dark:hover:text-slate-200 aria-[current]:border-sky-500 aria-[current]:font-semibold aria-[current]:text-slate-900 dark:aria-[current]:border-sky-400 dark:aria-[current]:text-slate-100 pl-5 sm:pl-4 transition-colors";

const railClass =
  "flex flex-col gap-2 border-l border-slate-200 dark:border-slate-800";

export default function Sidebar() {
  return (
    <nav className="flex flex-col gap-8">
      {/* ── Introduction (home) ───────────────── */}
      <div className="flex flex-col gap-3">
        <h3 className="font-mono text-sm/6 font-medium tracking-widest text-slate-400 uppercase sm:text-xs/6 dark:text-slate-500">
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
          <h3 className="font-mono text-sm/6 font-medium tracking-widest text-slate-400 uppercase sm:text-xs/6 dark:text-slate-500">
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
