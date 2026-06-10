import { getAllPosts, getPost } from "@/lib/posts";
import { notFound } from "next/navigation";
import MarkdownRenderer from "@/components/MarkdownRenderer";

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <div className="post-detail">
      <header>
        <h1>{post.title}</h1>
        <div className="post-meta">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{verticalAlign:"middle",marginRight:4}}><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
          <span>{post.date}</span>
        </div>
      </header>

      <div className="prose prose-stone max-w-none">
        <MarkdownRenderer content={post.content} />
      </div>

      {post.tags.length > 0 && (
        <div className="post-tags">
          {post.tags.map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
      )}

      <div style={{marginTop:"2rem",paddingTop:"1rem",borderTop:"1px solid #eee",fontSize:"0.85rem"}}>
        <a href="/" style={{color:"var(--hty-primary-color)",textDecoration:"none"}}>&larr; 返回首页</a>
      </div>
    </div>
  );
}
