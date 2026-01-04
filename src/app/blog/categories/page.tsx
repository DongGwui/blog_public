/**
 * Categories Page
 * 카테고리 목록 페이지
 */

import type { Metadata } from 'next';
import Link from 'next/link';

import { getApiClient } from '@/infrastructure/api';
import { createCategoryRepository } from '@/infrastructure/repositories';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Categories',
  description: '블로그 카테고리 목록입니다.',
  openGraph: {
    title: 'Categories - Blog',
    description: '블로그 카테고리 목록입니다.',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Categories - Blog',
    description: '블로그 카테고리 목록입니다.',
  },
};

async function getCategories() {
  try {
    const apiClient = getApiClient();
    const repository = createCategoryRepository(apiClient);
    const response = await repository.getCategories();
    return response?.data || [];
  } catch {
    return [];
  }
}

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <div className="animate-fade-in-up">
      <div className="max-w-3xl mx-auto px-5 md:px-10 py-16">
        {/* Page Header */}
        <header className="mb-12">
          <h1 className="font-heading text-3xl md:text-4xl font-semibold text-text-primary mb-4">
            Categories
          </h1>
          <p className="text-text-secondary">
            {categories.length}개의 카테고리가 있습니다.
          </p>
        </header>

        {/* Category List */}
        {categories.length > 0 ? (
          <div className="grid gap-4">
            {categories.map((category, index) => (
              <Link
                key={category.id}
                href={`/blog/category/${category.slug}`}
                className={`
                  block p-6 rounded-lg border border-border-primary
                  hover:border-accent-primary hover:bg-bg-secondary
                  transition-all duration-200
                  animate-fade-in-up
                `}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-medium text-text-primary mb-1">
                      {category.name}
                    </h2>
                    {category.description && (
                      <p className="text-sm text-text-secondary">
                        {category.description}
                      </p>
                    )}
                  </div>
                  <span className="text-sm text-text-tertiary">
                    {category.post_count}개의 글
                  </span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="py-16 text-center">
            <p className="text-text-secondary">카테고리가 없습니다.</p>
          </div>
        )}
      </div>
    </div>
  );
}
