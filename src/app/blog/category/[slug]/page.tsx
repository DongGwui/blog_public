/**
 * Category Posts Page
 * 카테고리별 글 목록 페이지
 */

import type { Metadata } from 'next';

import { getApiClient } from '@/infrastructure/api';
import { createPostRepository } from '@/infrastructure/repositories';
import { PostList } from '@/presentation/components/post';
import { Pagination } from '@/presentation/components/common';

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
}

async function getPostsByCategory(categorySlug: string, page: number) {
  const apiClient = getApiClient();
  const repository = createPostRepository(apiClient);
  return repository.getPostsByCategory(categorySlug, { page, perPage: 10 });
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;

  // Capitalize first letter for display
  const categoryName = slug.charAt(0).toUpperCase() + slug.slice(1);

  return {
    title: `${categoryName} - Blog`,
    description: `${categoryName} 카테고리의 글 목록입니다.`,
  };
}

export default async function CategoryPage({
  params,
  searchParams,
}: CategoryPageProps) {
  const { slug } = await params;
  const resolvedSearchParams = await searchParams;
  const page = parseInt(resolvedSearchParams.page || '1', 10);

  const { data: posts, meta } = await getPostsByCategory(slug, page);

  // Get category name from first post or slug
  const categoryName =
    posts.length > 0 && posts[0].category_name
      ? posts[0].category_name
      : slug.charAt(0).toUpperCase() + slug.slice(1);

  return (
    <div className="animate-fade-in-up">
      <div className="max-w-3xl mx-auto px-5 md:px-10 py-16">
        {/* Page Header */}
        <header className="mb-12">
          <p className="text-sm text-accent-primary uppercase tracking-wider mb-2">
            Category
          </p>
          <h1 className="font-heading text-3xl md:text-4xl font-semibold text-text-primary mb-4">
            {categoryName}
          </h1>
          {meta && (
            <p className="text-text-secondary">
              {meta.total}개의 글이 있습니다.
            </p>
          )}
        </header>

        {/* Post List */}
        <PostList posts={posts} />

        {/* Pagination */}
        {meta && meta.total_pages > 1 && (
          <Pagination
            currentPage={meta.page}
            totalPages={meta.total_pages}
            basePath={`/blog/category/${slug}`}
            className="mt-12"
          />
        )}
      </div>
    </div>
  );
}
