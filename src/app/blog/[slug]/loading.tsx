/**
 * Blog Post Loading State
 * 블로그 글 상세 로딩 상태
 */

import { PostDetailSkeleton } from '@/presentation/components/common';

export default function BlogPostLoading() {
  return (
    <div className="max-w-5xl mx-auto px-5 md:px-10 py-16">
      <PostDetailSkeleton />
    </div>
  );
}
