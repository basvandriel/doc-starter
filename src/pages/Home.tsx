import { Link } from "react-router-dom";
import { Head } from "vite-react-ssg";
import { docsManifest } from "../docs-index";

export default function Home() {
  return (
    <>
      <Head>
        <title>Docs</title>
        <meta
          name="description"
          content="Documentation site built with Vite, React, MDX, and Tailwind CSS."
        />
      </Head>
      <div>
        <h1 className="text-4xl font-bold text-slate-900 mb-4">Welcome</h1>
        <p className="text-xl text-slate-500 mb-12 leading-relaxed">
          A minimal docs starter built with Vite, React, MDX, and Tailwind CSS.
          Every page is statically generated at build time.
        </p>
        <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-4">
          Documentation
        </h2>
        <ul className="space-y-3">
          {docsManifest.map((doc) => (
            <li key={doc.slug}>
              <Link
                to={doc.path}
                className="block rounded-lg border border-slate-200 p-5 hover:border-slate-300 hover:shadow-sm transition-all"
              >
                <p className="font-medium text-slate-900">{doc.title}</p>
                {doc.description && (
                  <p className="mt-1 text-sm text-slate-500">
                    {doc.description}
                  </p>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
