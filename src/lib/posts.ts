import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDir = path.join(process.cwd(), "posts");

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  description?: string;
}

export interface Post extends PostMeta {
  content: string;
}

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(postsDir)) return [];
  const files = fs.readdirSync(postsDir).filter((f) => f.endsWith(".md"));

  const posts = files.map((f) => {
    const raw = fs.readFileSync(path.join(postsDir, f), "utf-8");
    const { data } = matter(raw);
    return {
      slug: f.replace(/\.md$/, ""),
      title: data.title || f.replace(/\.md$/, ""),
      date: data.date ? new Date(data.date).toISOString().split("T")[0] : "未知",
      tags: data.tags || [],
      description: data.description || "",
    } as PostMeta;
  });

  return posts.sort((a, b) => b.date.localeCompare(a.date));
}

export function getPost(slug: string): Post | null {
  const filePath = path.join(postsDir, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  return {
    slug,
    title: data.title || slug,
    date: data.date ? new Date(data.date).toISOString().split("T")[0] : "未知",
    tags: data.tags || [],
    description: data.description || "",
    content,
  };
}
