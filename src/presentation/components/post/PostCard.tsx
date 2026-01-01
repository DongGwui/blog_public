/**
 * PostCard Component
 * 글 목록에서 사용되는 카드 컴포넌트
 */

import Link from 'next/link';
import { Calendar, Clock } from 'lucide-react';

import type { PostListItem, TagBrief } from '@/domain/entities';

export interface PostCardProps {
  post: PostListItem;
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

export function PostCard({ post, className = '' }: PostCardProps) {
  const displayDate = post.published_at || post.created_at;

  return (
    <article className={`py-8 border-b border-border-primary ${className}`}>
      {/* Date */}
      <div className="flex items-center gap-2 text-sm text-text-tertiary mb-3">
        <Calendar className="w-4 h-4" />
        <time dateTime={displayDate}>{formatDate(displayDate)}</time>
      </div>

      {/* Title */}
      <h3 className="mb-3">
        <Link
          href={`/blog/${post.slug}`}
          className="font-heading text-xl md:text-2xl font-semibold text-text-primary hover:text-accent-primary transition-colors"
        >
          {post.title}
        </Link>
      </h3>

      {/* Excerpt */}
      <p className="text-text-secondary line-clamp-2 mb-4">{post.excerpt}</p>

      {/* Footer: Tags and Reading Time */}
      <div className="flex items-center justify-between">
        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {post.tags?.slice(0, 3).map((tag) => (
            <Link
              key={tag.slug}
              href={`/blog/tag/${tag.slug}`}
              className="text-xs text-text-tertiary hover:text-text-primary transition-colors"
            >
              #{tag.name}
            </Link>
          ))}
        </div>

        {/* Reading Time */}
        <div className="flex items-center gap-1 text-sm text-text-tertiary">
          <Clock className="w-4 h-4" />
          <span>{post.reading_time} min read</span>
        </div>
      </div>
    </article>
  );
}

export interface PostListProps {
  posts: PostListItem[];
  className?: string;
}

export function PostList({ posts, className = '' }: PostListProps) {
  if (!posts.length) {
    return (
      <div className={`py-16 text-center ${className}`}>
        <p className="text-text-secondary">아직 작성된 글이 없습니다.</p>
      </div>
    );
  }

  return (
    <div className={className}>
      {posts.map((post, index) => (
        <PostCard
          key={post.id}
          post={post}
          className={`animate-fade-in-up animation-delay-${(index % 5) * 100}`}
        />
      ))}
    </div>
  );
}
