import mdx from "@mdx-js/rollup";
import react from "@vitejs/plugin-react-swc";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

const base = process.env.PUBLIC_URL
  ? new URL(process.env.PUBLIC_URL).pathname.replace(/\/?$/, "/")
  : "/";

export default defineConfig({
  base,
  plugins: [
    // MDX must run before React's JSX transform
    {
      enforce: "pre",
      ...mdx({
        remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter],
      }),
    },
    react({ include: /\.(jsx|js|mdx|md|tsx|ts)$/ }),
    tailwindcss(),
  ],
});
