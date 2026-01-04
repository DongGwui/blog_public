/**
 * Blog Post Detail Page
 * 블로그 글 상세 페이지
 */

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { getApiClient } from '@/infrastructure/api';
import { createPostRepository } from '@/infrastructure/repositories';
import {
  PostHeader,
  PostContent,
  PostTOC,
  PostNav,
  PostComments,
  ViewCounter,
} from '@/presentation/components/post';

export const dynamic = 'force-dynamic';

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

async function getPost(slug: string) {
  try {
    const apiClient = getApiClient();
    const repository = createPostRepository(apiClient);
    return await repository.getPost(slug);
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const response = await getPost(slug);

  if (!response) {
    return {
      title: '글을 찾을 수 없습니다',
    };
  }

  const post = response.data;
  const ogImage = post.thumbnail || '/og-image.png';

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.published_at || post.created_at,
      modifiedTime: post.updated_at || undefined,
      tags: post.tags?.map((tag) => tag.name) || [],
      images: [{ url: ogImage, alt: post.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [ogImage],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const response = await getPost(slug);

  if (!response) {
    notFound();
  }

  const post = response.data;

  return (
    <div className="animate-fade-in-up">
      {/* 조회수 증가 */}
      <ViewCounter slug={slug} />

      <div className="max-w-5xl mx-auto px-5 md:px-10 py-16">
        <div className="lg:grid lg:grid-cols-[1fr_250px] lg:gap-12">
          {/* Main Content */}
          <article className="max-w-3xl">
            <PostHeader post={post} />
            <PostContent content={post.content} />

            {/* Post Navigation */}
            <PostNav
              prevPost={post.prev_post}
              nextPost={post.next_post}
              className="mt-16 pt-8 border-t border-border-primary"
            />

            {/* Comments */}
            <PostComments className="mt-16 pt-8 border-t border-border-primary" />
          </article>

          {/* Sidebar - TOC */}
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <PostTOC content={post.content} />
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
