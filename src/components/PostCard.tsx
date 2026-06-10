import Link from "next/link";
import type { PostMeta } from "@/lib/posts";

export default function PostCard({ post }: { post: PostMeta }) {
  return (
    <article className="post-card">
      <header className="post-header">
        <h2 className="post-title">
          <Link href={`/posts/${post.slug}`}>{post.title}</Link>
        </h2>
        <div className="post-meta">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{verticalAlign:"middle",marginRight:4}}><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
          <span>{post.date}</span>
        </div>
      </header>
      {post.description && (
        <div className="post-excerpt">{post.description}</div>
      )}
      {post.tags.length > 0 && (
        <div className="post-tags">
          {post.tags.map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
      )}
    </article>
  );
}
