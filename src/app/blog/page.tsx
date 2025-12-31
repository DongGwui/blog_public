/**
 * Blog List Page
 * 블로그 글 목록 페이지
 */

import type { Metadata } from 'next';

import { getApiClient } from '@/infrastructure/api';
import { createPostRepository } from '@/infrastructure/repositories';
import { PostList } from '@/presentation/components/post';
import { Pagination } from '@/presentation/components/common';

export const metadata: Metadata = {
  title: 'Blog',
  description: '개발, 기술, 그리고 프로젝트에 대한 글을 공유합니다.',
};

interface BlogPageProps {
  searchParams: Promise<{ page?: string }>;
}

async function getPosts(page: number) {
  const apiClient = getApiClient();
  const repository = createPostRepository(apiClient);
  return repository.getPosts({ page, perPage: 10 });
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const params = await searchParams;
  const page = parseInt(params.page || '1', 10);
  const { data: posts, meta } = await getPosts(page);

  return (
    <div className="animate-fade-in-up">
      <div className="max-w-3xl mx-auto px-5 md:px-10 py-16">
        {/* Page Header */}
        <header className="mb-12">
          <h1 className="font-heading text-3xl md:text-4xl font-semibold text-text-primary mb-4">
            Blog
          </h1>
          <p className="text-text-secondary">
            개발, 기술, 그리고 프로젝트에 대한 이야기를 공유합니다.
          </p>
        </header>

        {/* Post List */}
        <PostList posts={posts} />

        {/* Pagination */}
        {meta && (
          <Pagination
            currentPage={meta.page}
            totalPages={meta.total_pages}
            basePath="/blog"
            className="mt-12"
          />
        )}
      </div>
    </div>
  );
}
