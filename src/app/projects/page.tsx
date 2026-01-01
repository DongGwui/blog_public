/**
 * Projects List Page
 * 프로젝트 목록 페이지
 */

import type { Metadata } from 'next';

import { getApiClient } from '@/infrastructure/api';
import { createProjectRepository } from '@/infrastructure/repositories';
import { ProjectGrid } from '@/presentation/components/project';

export const metadata: Metadata = {
  title: 'Projects',
  description: '개발 프로젝트 포트폴리오',
};

export const dynamic = 'force-dynamic';

async function getProjects() {
  try {
    const apiClient = getApiClient();
    const repository = createProjectRepository(apiClient);
    const response = await repository.getProjects();
    return response?.data || [];
  } catch {
    return [];
  }
}

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="animate-fade-in-up">
      <div className="max-w-5xl mx-auto px-5 md:px-10 py-16">
        {/* Page Header */}
        <header className="mb-12">
          <h1 className="font-heading text-3xl md:text-4xl font-semibold text-text-primary mb-4">
            Projects
          </h1>
          <p className="text-text-secondary">
            개발한 프로젝트들을 소개합니다.
          </p>
        </header>

        {/* Project Grid */}
        <ProjectGrid projects={projects} />
      </div>
    </div>
  );
}
