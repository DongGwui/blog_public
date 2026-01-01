/**
 * Projects Loading
 * 프로젝트 목록 페이지 로딩 UI
 */

import { LoadingSkeleton } from '@/presentation/components/common';

export default function ProjectsLoading() {
  return (
    <div className="animate-fade-in-up">
      <div className="max-w-5xl mx-auto px-5 md:px-10 py-16">
        {/* Page Header Skeleton */}
        <header className="mb-12">
          <div className="h-10 w-48 bg-bg-secondary rounded animate-pulse mb-4" />
          <div className="h-5 w-64 bg-bg-secondary rounded animate-pulse" />
        </header>

        {/* Project Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <LoadingSkeleton key={i} type="project-card" />
          ))}
        </div>
      </div>
    </div>
  );
}
