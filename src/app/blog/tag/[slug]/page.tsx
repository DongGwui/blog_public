/**
 * Tag Posts Page
 * 태그별 글 목록 페이지
 */

import type { Metadata } from 'next';

import { getApiClient } from '@/infrastructure/api';
import { createPostRepository } from '@/infrastructure/repositories';
import { PostList } from '@/presentation/components/post';
import { Pagination } from '@/presentation/components/common';

export const dynamic = 'force-dynamic';

interface TagPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
}

async function getPostsByTag(tagSlug: string, page: number) {
  try {
    const apiClient = getApiClient();
    const repository = createPostRepository(apiClient);
    const response = await repository.getPostsByTag(tagSlug, { page, perPage: 10 });
    return { data: response?.data || [], meta: response?.meta || null };
  } catch {
    return { data: [], meta: null };
  }
}

export async function generateMetadata({
  params,
}: TagPageProps): Promise<Metadata> {
  const { slug } = await params;
  const description = `#${slug} 태그가 포함된 글 목록입니다.`;

  return {
    title: `#${slug}`,
    description,
    openGraph: {
      title: `#${slug} - Blog`,
      description,
      type: 'website',
    },
    twitter: {
      card: 'summary',
      title: `#${slug} - Blog`,
      description,
    },
  };
}

export default async function TagPage({ params, searchParams }: TagPageProps) {
  const { slug } = await params;
  const resolvedSearchParams = await searchParams;
  const page = parseInt(resolvedSearchParams.page || '1', 10);

  const { data: posts, meta } = await getPostsByTag(slug, page);

  // Get tag name from first post or slug
  const tagName =
    posts.length > 0 && posts[0].tags.find((t) => t.slug === slug)
      ? posts[0].tags.find((t) => t.slug === slug)!.name
      : slug;

  return (
    <div className="animate-fade-in-up">
      <div className="max-w-3xl mx-auto px-5 md:px-10 py-16">
        {/* Page Header */}
        <header className="mb-12">
          <p className="text-sm text-text-tertiary mb-2">Tag</p>
          <h1 className="font-heading text-3xl md:text-4xl font-semibold text-text-primary mb-4">
            #{tagName}
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
            basePath={`/blog/tag/${slug}`}
            className="mt-12"
          />
        )}
      </div>
    </div>
  );
}
