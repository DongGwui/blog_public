/**
 * PostContent Component
 * 글 본문 콘텐츠 렌더링 컴포넌트 (마크다운 지원)
 */

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import Image from 'next/image';

export interface PostContentProps {
  content: string;
  className?: string;
}

export function PostContent({ content, className = '' }: PostContentProps) {
  return (
    <div
      className={`
        prose prose-lg max-w-none
        prose-headings:font-heading prose-headings:font-semibold
        prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4
        prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
        prose-p:text-text-primary prose-p:leading-relaxed
        prose-a:text-accent-primary prose-a:no-underline hover:prose-a:underline
        prose-strong:text-text-primary prose-strong:font-semibold
        prose-code:text-accent-primary prose-code:bg-bg-tertiary prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none
        prose-pre:bg-code-bg prose-pre:rounded-lg prose-pre:overflow-x-auto
        prose-blockquote:border-l-accent-primary prose-blockquote:bg-bg-secondary prose-blockquote:py-1 prose-blockquote:not-italic
        prose-img:rounded-lg prose-img:shadow-md
        prose-li:text-text-primary
        prose-hr:border-border-primary
        ${className}
      `}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          img: ({ src, alt }) => {
            if (!src || typeof src !== 'string') return null;
            return (
              <span className="block my-6">
                <Image
                  src={src}
                  alt={alt || ''}
                  width={800}
                  height={600}
                  className="rounded-lg shadow-md w-full h-auto"
                  unoptimized={src.startsWith('http')}
                />
              </span>
            );
          },
          a: ({ href, children }) => (
            <a
              href={href}
              target={href?.startsWith('http') ? '_blank' : undefined}
              rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
            >
              {children}
            </a>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
