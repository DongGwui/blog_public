/**
 * Blog List Loading State
 * 블로그 목록 로딩 상태
 */

import { PostListSkeleton, Skeleton } from '@/presentation/components/common';

export default function BlogLoading() {
  return (
    <div className="animate-fade-in-up">
      <div className="max-w-3xl mx-auto px-5 md:px-10 py-16">
        {/* Page Header Skeleton */}
        <header className="mb-12">
          <Skeleton className="h-10 w-32 mb-4" />
          <Skeleton className="h-6 w-64" />
        </header>

        {/* Post List Skeleton */}
        <PostListSkeleton count={5} />
      </div>
    </div>
  );
}
