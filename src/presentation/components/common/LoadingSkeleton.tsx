/**
 * LoadingSkeleton Components
 * 로딩 상태 스켈레톤 UI
 */

export interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className = '' }: SkeletonProps) {
  return (
    <div
      className={`animate-pulse bg-bg-tertiary rounded ${className}`}
      aria-hidden="true"
    />
  );
}

export function PostCardSkeleton() {
  return (
    <div className="py-8 border-b border-border-primary animate-fade-in-up">
      {/* Date */}
      <Skeleton className="h-4 w-24 mb-4" />

      {/* Title */}
      <Skeleton className="h-7 w-3/4 mb-3" />

      {/* Excerpt */}
      <div className="space-y-2 mb-4">
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-5/6" />
      </div>

      {/* Tags and meta */}
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-5 w-16" />
        </div>
        <Skeleton className="h-4 w-20" />
      </div>
    </div>
  );
}

export function PostListSkeleton({ count = 5 }: { count?: number }) {
  return (
    <div>
      {Array.from({ length: count }).map((_, index) => (
        <PostCardSkeleton key={index} />
      ))}
    </div>
  );
}

export function ProjectCardSkeleton() {
  return (
    <div className="animate-fade-in-up">
      {/* Thumbnail */}
      <Skeleton className="aspect-video w-full rounded-lg mb-4" />

      {/* Title */}
      <Skeleton className="h-6 w-3/4 mb-2" />

      {/* Description */}
      <div className="space-y-2 mb-4">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-4/5" />
      </div>

      {/* Tech stack */}
      <div className="flex gap-2 mb-4">
        <Skeleton className="h-6 w-16 rounded-full" />
        <Skeleton className="h-6 w-20 rounded-full" />
        <Skeleton className="h-6 w-14 rounded-full" />
      </div>

      {/* Links */}
      <div className="flex gap-4">
        <Skeleton className="h-5 w-16" />
        <Skeleton className="h-5 w-16" />
      </div>
    </div>
  );
}

export function ProjectGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {Array.from({ length: count }).map((_, index) => (
        <ProjectCardSkeleton key={index} />
      ))}
    </div>
  );
}

export function PostDetailSkeleton() {
  return (
    <article className="max-w-3xl mx-auto animate-fade-in-up">
      {/* Category */}
      <Skeleton className="h-5 w-24 mb-4" />

      {/* Title */}
      <Skeleton className="h-12 w-full mb-2" />
      <Skeleton className="h-12 w-3/4 mb-6" />

      {/* Meta */}
      <div className="flex gap-4 mb-8">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-4 w-16" />
      </div>

      {/* Tags */}
      <div className="flex gap-2 mb-12">
        <Skeleton className="h-6 w-20" />
        <Skeleton className="h-6 w-24" />
        <Skeleton className="h-6 w-16" />
      </div>

      {/* Content */}
      <div className="space-y-4">
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-5/6" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-4/5" />

        <Skeleton className="h-8 w-1/2 mt-8" />

        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-3/4" />

        <Skeleton className="h-40 w-full rounded-lg mt-6" />

        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-5/6" />
      </div>
    </article>
  );
}
