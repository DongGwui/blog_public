/**
 * Home Page
 * 블로그 홈페이지
 */

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import { getApiClient } from '@/infrastructure/api';
import { createPostRepository, createProjectRepository } from '@/infrastructure/repositories';
import { PostCard } from '@/presentation/components/post';
import { ProjectCard } from '@/presentation/components/project';

// 빌드 시 정적 생성을 방지하고 런타임에 렌더링
export const dynamic = 'force-dynamic';

async function getRecentPosts() {
  try {
    const apiClient = getApiClient();
    const repository = createPostRepository(apiClient);
    const response = await repository.getPosts({ page: 1, perPage: 5 });
    return { data: response?.data || [], meta: response?.meta || null };
  } catch {
    return { data: [], meta: null };
  }
}

async function getFeaturedProjects() {
  try {
    const apiClient = getApiClient();
    const repository = createProjectRepository(apiClient);
    const response = await repository.getProjects();
    const projects = response?.data || [];
    // featured 프로젝트만 필터링하거나 상위 3개만 표시
    const featured = projects.filter((p) => p.is_featured).slice(0, 3);
    return featured.length > 0 ? featured : projects.slice(0, 3);
  } catch {
    return [];
  }
}

export default async function Home() {
  const [postsResponse, projects] = await Promise.all([
    getRecentPosts(),
    getFeaturedProjects(),
  ]);

  const posts = postsResponse.data;

  return (
    <div className="animate-fade-in-up">
      {/* Hero Section */}
      <section className="py-24 md:py-32">
        <div className="max-w-3xl mx-auto px-5 md:px-10 text-center">
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-semibold text-text-primary mb-6">
            Welcome to My Blog
          </h1>
          <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto mb-8">
            개발, 기술, 그리고 프로젝트에 대한 이야기를 공유합니다.
            새로운 것을 배우고 성장하는 여정을 함께해요.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/blog"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-text-primary text-bg-primary font-medium rounded-lg hover:opacity-90 transition-opacity"
            >
              블로그 보기
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/projects"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-border-secondary text-text-primary font-medium rounded-lg hover:border-text-primary transition-colors"
            >
              프로젝트 보기
            </Link>
          </div>
        </div>
      </section>

      {/* Recent Posts Section */}
      <section className="py-16 border-t border-border-primary">
        <div className="max-w-3xl mx-auto px-5 md:px-10">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-heading text-2xl md:text-3xl font-semibold text-text-primary">
              Recent Posts
            </h2>
            <Link
              href="/blog"
              className="text-sm text-text-secondary hover:text-accent-primary transition-colors flex items-center gap-1"
            >
              View all
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          {posts.length > 0 ? (
            <div>
              {posts.map((post, index) => (
                <PostCard
                  key={post.id}
                  post={post}
                  className={`animate-fade-in-up animation-delay-${index * 100}`}
                />
              ))}
            </div>
          ) : (
            <p className="text-text-secondary py-8">
              아직 작성된 글이 없습니다. 곧 새로운 글이 올라올 예정이에요!
            </p>
          )}
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-16 border-t border-border-primary">
        <div className="max-w-5xl mx-auto px-5 md:px-10">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-heading text-2xl md:text-3xl font-semibold text-text-primary">
              Featured Projects
            </h2>
            <Link
              href="/projects"
              className="text-sm text-text-secondary hover:text-accent-primary transition-colors flex items-center gap-1"
            >
              View all
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          {projects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  className={`animate-fade-in-up animation-delay-${index * 100}`}
                />
              ))}
            </div>
          ) : (
            <p className="text-text-secondary py-8">
              아직 등록된 프로젝트가 없습니다. 곧 프로젝트들이 추가될 예정이에요!
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
