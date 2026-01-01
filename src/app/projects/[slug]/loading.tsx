/**
 * Project Detail Loading
 * 프로젝트 상세 페이지 로딩 UI
 */

export default function ProjectDetailLoading() {
  return (
    <div className="animate-fade-in-up">
      {/* Back Link Skeleton */}
      <div className="max-w-5xl mx-auto px-5 md:px-10 pt-8">
        <div className="h-5 w-32 bg-bg-secondary rounded animate-pulse" />
      </div>

      {/* Hero Image Skeleton */}
      <div className="max-w-5xl mx-auto px-5 md:px-10 mt-8">
        <div className="aspect-video bg-bg-secondary rounded-lg animate-pulse" />
      </div>

      {/* Content Skeleton */}
      <div className="max-w-3xl mx-auto px-5 md:px-10 py-12">
        {/* Title */}
        <div className="h-10 w-3/4 bg-bg-secondary rounded animate-pulse mb-4" />

        {/* Meta */}
        <div className="h-5 w-32 bg-bg-secondary rounded animate-pulse mb-4" />

        {/* Description */}
        <div className="space-y-2 mb-6">
          <div className="h-5 w-full bg-bg-secondary rounded animate-pulse" />
          <div className="h-5 w-2/3 bg-bg-secondary rounded animate-pulse" />
        </div>

        {/* Tech Stack */}
        <div className="flex gap-2 mb-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-7 w-20 bg-bg-secondary rounded-full animate-pulse" />
          ))}
        </div>

        {/* Buttons */}
        <div className="flex gap-4 mb-8">
          <div className="h-10 w-32 bg-bg-secondary rounded-lg animate-pulse" />
          <div className="h-10 w-32 bg-bg-secondary rounded-lg animate-pulse" />
        </div>

        {/* Content */}
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-5 w-full bg-bg-secondary rounded animate-pulse" />
          ))}
        </div>
      </div>
    </div>
  );
}
