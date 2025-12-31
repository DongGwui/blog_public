/**
 * PostHeader Component
 * 글 상세 페이지의 헤더 섹션
 */

import Link from 'next/link';
import { Calendar, Clock, Eye } from 'lucide-react';

import type { Post } from '@/domain/entities';

export interface PostHeaderProps {
  post: Post;
  className?: string;
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function PostHeader({ post, className = '' }: PostHeaderProps) {
  const displayDate = post.published_at || post.created_at;

  return (
    <header className={`mb-12 ${className}`}>
      {/* Category */}
      {post.category_name && (
        <Link
          href={`/blog/category/${post.category_slug}`}
          className="inline-block text-sm font-medium text-accent-primary uppercase tracking-wider mb-4 hover:text-accent-hover transition-colors"
        >
          {post.category_name}
        </Link>
      )}

      {/* Title */}
      <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-semibold text-text-primary mb-6 leading-tight">
        {post.title}
      </h1>

      {/* Meta Info */}
      <div className="flex flex-wrap items-center gap-4 text-sm text-text-secondary mb-6">
        <div className="flex items-center gap-1.5">
          <Calendar className="w-4 h-4" />
          <time dateTime={displayDate}>{formatDate(displayDate)}</time>
        </div>

        <div className="flex items-center gap-1.5">
          <Clock className="w-4 h-4" />
          <span>{post.reading_time} min read</span>
        </div>

        <div className="flex items-center gap-1.5">
          <Eye className="w-4 h-4" />
          <span>{post.view_count.toLocaleString()} views</span>
        </div>
      </div>

      {/* Tags */}
      {post.tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <Link
              key={tag.slug}
              href={`/blog/tag/${tag.slug}`}
              className="px-3 py-1 text-sm text-text-secondary bg-bg-secondary rounded-full hover:text-text-primary hover:bg-bg-tertiary transition-colors"
            >
              #{tag.name}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
