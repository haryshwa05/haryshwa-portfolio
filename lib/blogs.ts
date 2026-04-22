import fs from "fs";
import path from "path";

const BLOGS_DIR = path.join(process.cwd(), "content", "blogs");

export interface BlogFrontmatter {
  title: string;
  date: string;
  description: string;
  tag: string;
  accentColor: string;
  layout: "technical" | "caseStudy";
  status?: string;
}

export interface BlogPost {
  slug: string;
  frontmatter: BlogFrontmatter;
  readTime: string;
  content: string;
}

export interface BlogMeta {
  slug: string;
  frontmatter: BlogFrontmatter;
  readTime: string;
}

/** Parse YAML-style frontmatter between --- delimiters */
function parseFrontmatter(raw: string): { data: Record<string, string>; content: string } {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) return { data: {}, content: raw };

  const yamlBlock = match[1];
  const content = match[2];
  const data: Record<string, string> = {};

  for (const line of yamlBlock.split("\n")) {
    const colonIdx = line.indexOf(":");
    if (colonIdx === -1) continue;
    const key = line.slice(0, colonIdx).trim();
    const value = line.slice(colonIdx + 1).trim().replace(/^["']|["']$/g, "");
    if (key) data[key] = value;
  }

  return { data, content };
}

/** Estimate reading time — 200 wpm */
function calcReadTime(text: string): string {
  const words = text.trim().split(/\s+/).length;
  const mins = Math.ceil(words / 200);
  return `${mins} min read`;
}

export function getAllBlogSlugs(): string[] {
  if (!fs.existsSync(BLOGS_DIR)) return [];
  return fs
    .readdirSync(BLOGS_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export function getBlogBySlug(slug: string): BlogPost | null {
  const filePath = path.join(BLOGS_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = parseFrontmatter(raw);

  return {
    slug,
    frontmatter: data as unknown as BlogFrontmatter,
    readTime: calcReadTime(content),
    content,
  };
}

export function getAllBlogs(): BlogMeta[] {
  const slugs = getAllBlogSlugs();
  return slugs
    .map((slug) => {
      const post = getBlogBySlug(slug);
      if (!post) return null;
      return { slug: post.slug, frontmatter: post.frontmatter, readTime: post.readTime };
    })
    .filter((p): p is BlogMeta => p !== null)
    .sort(
      (a, b) =>
        new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime()
    );
}
