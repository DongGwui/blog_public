/**
 * PostNav Component
 * 이전/다음 글 네비게이션
 */

import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import type { PostNavItem } from '@/domain/entities';

export interface PostNavProps {
  prevPost: PostNavItem | null;
  nextPost: PostNavItem | null;
  className?: string;
}

export function PostNav({ prevPost, nextPost, className = '' }: PostNavProps) {
  if (!prevPost && !nextPost) {
    return null;
  }

  return (
    <nav
      className={`grid grid-cols-1 md:grid-cols-2 gap-4 ${className}`}
      aria-label="글 네비게이션"
    >
      {/* Previous Post */}
      {prevPost ? (
        <Link
          href={`/blog/${prevPost.slug}`}
          className="group flex flex-col p-6 border border-border-primary rounded-lg hover:border-accent-primary hover:bg-bg-secondary transition-all"
        >
          <span className="flex items-center gap-1 text-sm text-text-tertiary mb-2">
            <ChevronLeft className="w-4 h-4" />
            이전 글
          </span>
          <span className="font-heading font-medium text-text-primary group-hover:text-accent-primary transition-colors line-clamp-2">
            {prevPost.title}
          </span>
        </Link>
      ) : (
        <div />
      )}

      {/* Next Post */}
      {nextPost ? (
        <Link
          href={`/blog/${nextPost.slug}`}
          className="group flex flex-col items-end text-right p-6 border border-border-primary rounded-lg hover:border-accent-primary hover:bg-bg-secondary transition-all"
        >
          <span className="flex items-center gap-1 text-sm text-text-tertiary mb-2">
            다음 글
            <ChevronRight className="w-4 h-4" />
          </span>
          <span className="font-heading font-medium text-text-primary group-hover:text-accent-primary transition-colors line-clamp-2">
            {nextPost.title}
          </span>
        </Link>
      ) : (
        <div />
      )}
    </nav>
  );
}
