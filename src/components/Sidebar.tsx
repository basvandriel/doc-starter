import { NavLink } from "react-router-dom";
import { docsManifest } from "../docs-index";

export default function Sidebar() {
  return (
    <nav className="text-sm">
      <h5 className="mb-4 text-[11px] font-semibold uppercase tracking-widest text-slate-500">
        Documentation
      </h5>

      {/* The parent border-l creates the guide rail; each child overlaps it with -ml-px */}
      <ul className="space-y-1 border-l border-slate-800">
        {docsManifest.map((doc) => (
          <li key={doc.slug}>
            <NavLink
              to={doc.path}
              className={({ isActive }) =>
                isActive
                  ? "-ml-px block border-l-2 border-sky-500 pl-4 py-1.5 font-medium text-sky-400"
                  : "-ml-px block border-l-2 border-transparent pl-4 py-1.5 text-slate-500 transition hover:border-slate-600 hover:text-slate-300"
              }
            >
              {doc.title}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
