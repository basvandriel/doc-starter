import "dotenv/config";
import path from "path";
import fs from "fs/promises";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import html from "remark-html";
import type { DocFrontmatter } from "../src/content-utils";
import { slugFromFilePath, slugToTitle } from "../src/content-utils";

const docsRoot = path.resolve("docs");

interface DocExport {
  slug: string;
  filePath: string;
  title: string;
  description?: string;
  group?: string;
  confluencePageId?: string;
  html: string;
}

async function collectMarkdownFiles(root: string): Promise<string[]> {
  const entries = await fs.readdir(root, { withFileTypes: true });
  const results: string[] = [];

  for (const entry of entries) {
    const resolved = path.join(root, entry.name);
    if (entry.isDirectory()) {
      results.push(...(await collectMarkdownFiles(resolved)));
    } else if (/\.(md|mdx)$/i.test(entry.name)) {
      results.push(resolved);
    }
  }

  return results;
}

async function markdownToHtml(markdown: string) {
  const processed = await unified()
    .use(remarkParse)
    .use(html)
    .process(markdown);
  return String(processed);
}

async function loadDocs() {
  const files = await collectMarkdownFiles(docsRoot);
  const docs = await Promise.all(
    files.map(async (filePath) => {
      const raw = await fs.readFile(filePath, "utf8");
      const { data, content } = matter(raw) as {
        data: DocFrontmatter;
        content: string;
      };
      const slug = slugFromFilePath(path.relative(docsRoot, filePath));
      const title = data.title ?? slugToTitle(slug);
      const body = await markdownToHtml(content);

      return {
        slug,
        filePath: path.relative(process.cwd(), filePath),
        title,
        description: data.description,
        group: data.group,
        confluencePageId: data.confluencePageId,
        html: `<h1>${title}</h1>\n${body}`,
      };
    }),
  );

  return docs.sort((a, b) => a.slug.localeCompare(b.slug));
}

function getEnv(name: string) {
  return process.env[name] ?? undefined;
}

function getAuthHeader(username: string, token: string) {
  return `Basic ${Buffer.from(`${username}:${token}`).toString("base64")}`;
}

async function fetchJson(url: string, options: RequestInit) {
  const res = await fetch(url, options);
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`${res.status} ${res.statusText}: ${text}`);
  }
  return res.json();
}

async function findExistingPage(
  baseUrl: string,
  auth: string,
  spaceKey: string,
  title: string,
) {
  const searchUrl = new URL(
    `/wiki/rest/api/content?title=${encodeURIComponent(title)}&spaceKey=${encodeURIComponent(
      spaceKey,
    )}&expand=version`,
    baseUrl,
  );

  const data = await fetchJson(searchUrl.toString(), {
    headers: {
      Authorization: auth,
      Accept: "application/json",
    },
  });

  return data.results && data.results[0] ? data.results[0] : null;
}

async function getPageById(baseUrl: string, auth: string, id: string) {
  const url = new URL(`/wiki/rest/api/content/${id}?expand=version`, baseUrl);
  try {
    return await fetchJson(url.toString(), {
      headers: {
        Authorization: auth,
        Accept: "application/json",
      },
    });
  } catch {
    return null;
  }
}

async function createPage(
  baseUrl: string,
  auth: string,
  spaceKey: string,
  parentId: string | undefined,
  doc: DocExport,
) {
  const url = new URL("/wiki/rest/api/content", baseUrl);
  const payload: any = {
    type: "page",
    title: doc.title,
    space: { key: spaceKey },
    body: {
      storage: {
        value: doc.html,
        representation: "storage",
      },
    },
  };
  if (parentId) {
    payload.ancestors = [{ id: parentId }];
  }

  return fetchJson(url.toString(), {
    method: "POST",
    headers: {
      Authorization: auth,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
}

async function updatePage(
  baseUrl: string,
  auth: string,
  pageId: string,
  currentVersion: number,
  doc: DocExport,
) {
  const url = new URL(`/wiki/rest/api/content/${pageId}`, baseUrl);
  const payload = {
    id: pageId,
    type: "page",
    title: doc.title,
    version: {
      number: currentVersion + 1,
    },
    body: {
      storage: {
        value: doc.html,
        representation: "storage",
      },
    },
  };

  return fetchJson(url.toString(), {
    method: "PUT",
    headers: {
      Authorization: auth,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
}

async function run() {
  const docs = await loadDocs();
  const baseUrl = getEnv("CONFLUENCE_BASE_URL");
  const username = getEnv("CONFLUENCE_USERNAME");
  const apiToken = getEnv("CONFLUENCE_API_TOKEN");
  const spaceKey = getEnv("CONFLUENCE_SPACE_KEY");
  const parentId = getEnv("CONFLUENCE_PARENT_PAGE_ID");

  console.log(`Found ${docs.length} doc(s) in ${docsRoot}`);

  if (!baseUrl || !username || !apiToken || !spaceKey) {
    console.log("\nMissing Confluence environment configuration.");
    console.log(
      "Run with CONFLUENCE_BASE_URL, CONFLUENCE_USERNAME, CONFLUENCE_API_TOKEN, and CONFLUENCE_SPACE_KEY.",
    );
    console.log("This is a dry run. Document metadata: \n");
    docs.forEach((doc) => {
      console.log(`- ${doc.title} (${doc.filePath})`);
    });
    return;
  }

  const auth = getAuthHeader(username, apiToken);

  for (const doc of docs) {
    const existing =
      doc.confluencePageId &&
      (await getPageById(baseUrl, auth, doc.confluencePageId))
        ? await getPageById(baseUrl, auth, doc.confluencePageId)
        : await findExistingPage(baseUrl, auth, spaceKey, doc.title);

    if (existing) {
      const updated = await updatePage(
        baseUrl,
        auth,
        existing.id,
        existing.version.number,
        doc,
      );
      console.log(`Updated Confluence page: ${updated.title} (${updated.id})`);
    } else {
      const created = await createPage(baseUrl, auth, spaceKey, parentId, doc);
      console.log(`Created Confluence page: ${created.title} (${created.id})`);
    }
  }
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
