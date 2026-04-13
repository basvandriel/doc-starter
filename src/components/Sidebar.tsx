import { NavLink } from "react-router-dom";
import { docsManifest } from "../docs-index";

export default function Sidebar() {
  return (
    <aside className="w-64 shrink-0 border-r border-slate-200 bg-slate-50 px-5 py-8">
      <div className="mb-8">
        <NavLink
          to="/"
          className="text-lg font-bold text-slate-900 no-underline"
        >
          Docs
        </NavLink>
      </div>
      <nav>
        <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
          Documentation
        </p>
        <ul className="space-y-0.5">
          {docsManifest.map((doc) => (
            <li key={doc.slug}>
              <NavLink
                to={doc.path}
                className={({ isActive }) =>
                  `block rounded-md px-3 py-2 text-sm transition-colors ${
                    isActive
                      ? "bg-slate-200 font-medium text-slate-900"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  }`
                }
              >
                {doc.title}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
