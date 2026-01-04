'use client';

/**
 * PostComments Component
 * Giscus 기반 댓글 컴포넌트
 */

import Giscus from '@giscus/react';

import { useTheme } from '@/presentation/hooks';

export interface PostCommentsProps {
  className?: string;
}

export function PostComments({ className = '' }: PostCommentsProps) {
  const { resolvedTheme } = useTheme();

  const repo = process.env.NEXT_PUBLIC_GISCUS_REPO;
  const repoId = process.env.NEXT_PUBLIC_GISCUS_REPO_ID;
  const category = process.env.NEXT_PUBLIC_GISCUS_CATEGORY;
  const categoryId = process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID;

  // Giscus 설정이 없으면 렌더링하지 않음
  if (!repo || !repoId || !category || !categoryId) {
    return null;
  }

  return (
    <section className={className}>
      <Giscus
        repo={repo as `${string}/${string}`}
        repoId={repoId}
        category={category}
        categoryId={categoryId}
        mapping="pathname"
        strict="0"
        reactionsEnabled="0"
        emitMetadata="0"
        inputPosition="bottom"
        theme={resolvedTheme === 'dark' ? 'noborder_dark' : 'noborder_light'}
        lang="ko"
        loading="lazy"
      />
    </section>
  );
}
