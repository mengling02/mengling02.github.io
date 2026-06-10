// GitHub API client — used in the admin panel on the client side

export interface CommitResult {
  success: boolean;
  url?: string;
  error?: string;
}

export async function commitNewPost(
  token: string,
  repoOwner: string,
  repoName: string,
  title: string,
  content: string,
  branch = "main"
): Promise<CommitResult> {
  const dateStr = new Date().toISOString().split("T")[0];
  const slug = title
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();

  const frontMatter = [
    "---",
    `title: "${title}"`,
    `date: ${dateStr}`,
    "tags: []",
    "---",
    "",
  ].join("\n");

  const fileContent = frontMatter + content;
  const encoded = btoa(unescape(encodeURIComponent(fileContent)));
  const filePath = `posts/${slug}.md`;
  const apiUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${filePath}`;

  const res = await fetch(apiUrl, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "User-Agent": "blog-admin",
    },
    body: JSON.stringify({
      message: `feat: 发布新文章 "${title}"`,
      content: encoded,
      branch,
    }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: res.statusText }));
    return { success: false, error: err.message || "提交失败" };
  }

  const data = await res.json();
  return { success: true, url: data.content?.html_url };
}
