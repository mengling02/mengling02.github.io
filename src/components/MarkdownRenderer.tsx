import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";

export default function MarkdownRenderer({ content }: { content: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeSlug]}
      components={{
        code({ className, children, ...props }) {
          const isInline = !className;
          if (isInline) {
            return (
              <code
                className="rounded bg-stone-100 px-1.5 py-0.5 text-sm font-normal text-rose-700"
                {...props}
              >
                {children}
              </code>
            );
          }
          return (
            <code className={className} {...props}>
              {children}
            </code>
          );
        },
        pre({ children }) {
          return (
            <pre className="overflow-x-auto rounded-lg border border-stone-200 bg-stone-50 p-4 text-sm">
              {children}
            </pre>
          );
        },
        a({ href, children }) {
          return (
            <a
              href={href}
              target={href?.startsWith("http") ? "_blank" : undefined}
              rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
              className="text-amber-700 underline underline-offset-2 hover:text-amber-900"
            >
              {children}
            </a>
          );
        },
      }}
    />
  );
}
