/**
 * Search Page
 * 글 검색 페이지
 */

import type { Metadata } from 'next';

import { SearchContent } from './SearchContent';

export const metadata: Metadata = {
  title: 'Search',
  description: '블로그 글 검색',
};

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const query = params.q || '';

  return (
    <div className="animate-fade-in-up">
      <div className="max-w-3xl mx-auto px-5 md:px-10 py-16">
        {/* Page Header */}
        <header className="mb-12">
          <h1 className="font-heading text-3xl md:text-4xl font-semibold text-text-primary mb-4">
            Search
          </h1>
          <p className="text-text-secondary">
            블로그에서 원하는 글을 검색해보세요.
          </p>
        </header>

        {/* Search Content */}
        <SearchContent initialQuery={query} />
      </div>
    </div>
  );
}
