'use client';

/**
 * SearchContent Component
 * 검색 입력과 결과를 표시하는 클라이언트 컴포넌트
 */

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search as SearchIcon, X } from 'lucide-react';

import { useSearch } from '@/presentation/hooks/queries';
import { PostCard } from '@/presentation/components/post';
import { LoadingSkeleton } from '@/presentation/components/common';

interface SearchContentProps {
  initialQuery: string;
}

export function SearchContent({ initialQuery }: SearchContentProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(initialQuery);
  const [debouncedQuery, setDebouncedQuery] = useState(initialQuery);

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
      // Update URL without navigation
      if (query) {
        router.replace(`/search?q=${encodeURIComponent(query)}`, { scroll: false });
      } else {
        router.replace('/search', { scroll: false });
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query, router]);

  const { data, isLoading, isError } = useSearch({
    query: debouncedQuery,
    enabled: debouncedQuery.length >= 2,
  });

  const posts = data?.data || [];

  const handleClear = () => {
    setQuery('');
    setDebouncedQuery('');
    router.replace('/search', { scroll: false });
  };

  return (
    <div>
      {/* Search Input */}
      <div className="relative mb-8">
        <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-tertiary" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="검색어를 입력하세요 (최소 2자)"
          className="w-full pl-12 pr-12 py-4 bg-bg-secondary border border-border-primary rounded-lg text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-accent-primary focus:ring-1 focus:ring-accent-primary transition-colors"
          autoFocus
        />
        {query && (
          <button
            onClick={handleClear}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-text-tertiary hover:text-text-primary transition-colors"
            aria-label="검색어 지우기"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Search Results */}
      <div>
        {/* Loading State */}
        {isLoading && debouncedQuery.length >= 2 && (
          <div className="space-y-8">
            {[...Array(3)].map((_, i) => (
              <LoadingSkeleton key={i} type="post-card" />
            ))}
          </div>
        )}

        {/* Error State */}
        {isError && (
          <div className="py-16 text-center">
            <p className="text-text-secondary">
              검색 중 오류가 발생했습니다. 다시 시도해주세요.
            </p>
          </div>
        )}

        {/* Results */}
        {!isLoading && !isError && debouncedQuery.length >= 2 && (
          <>
            {/* Result Count */}
            <p className="text-sm text-text-tertiary mb-6">
              &ldquo;{debouncedQuery}&rdquo; 검색 결과: {posts.length}개
            </p>

            {posts.length > 0 ? (
              <div>
                {posts.map((post, index) => (
                  <PostCard
                    key={post.id}
                    post={post}
                    className={`animate-fade-in-up animation-delay-${(index % 5) * 100}`}
                  />
                ))}
              </div>
            ) : (
              <div className="py-16 text-center">
                <p className="text-text-secondary mb-2">
                  검색 결과가 없습니다.
                </p>
                <p className="text-sm text-text-tertiary">
                  다른 검색어로 시도해보세요.
                </p>
              </div>
            )}
          </>
        )}

        {/* Initial State */}
        {!isLoading && debouncedQuery.length < 2 && (
          <div className="py-16 text-center">
            <p className="text-text-secondary">
              {query.length > 0 && query.length < 2
                ? '검색어는 최소 2자 이상 입력해주세요.'
                : '검색어를 입력하면 결과가 표시됩니다.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
