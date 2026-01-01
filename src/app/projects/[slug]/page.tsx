/**
 * Project Detail Page
 * 프로젝트 상세 페이지
 */

import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ArrowLeft, ExternalLink, Github, Calendar } from 'lucide-react';

import { getApiClient } from '@/infrastructure/api';
import { createProjectRepository } from '@/infrastructure/repositories';
import { TechStack, ProjectLinks } from '@/presentation/components/project';

export const dynamic = 'force-dynamic';

interface ProjectDetailPageProps {
  params: Promise<{ slug: string }>;
}

async function getProject(slug: string) {
  try {
    const apiClient = getApiClient();
    const repository = createProjectRepository(apiClient);
    return await repository.getProject(slug);
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: ProjectDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const response = await getProject(slug);

  if (!response) {
    return {
      title: 'Project Not Found',
    };
  }

  const project = response.data;

  return {
    title: project.title,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      type: 'article',
      images: project.thumbnail ? [{ url: project.thumbnail, alt: project.title }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: project.title,
      description: project.description,
      images: project.thumbnail ? [project.thumbnail] : undefined,
    },
  };
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { slug } = await params;
  const response = await getProject(slug);

  if (!response) {
    notFound();
  }

  const project = response.data;

  return (
    <div className="animate-fade-in-up">
      {/* Back Link */}
      <div className="max-w-5xl mx-auto px-5 md:px-10 pt-8">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Projects
        </Link>
      </div>

      {/* Hero Image */}
      {project.thumbnail && (
        <div className="max-w-5xl mx-auto px-5 md:px-10 mt-8">
          <div className="aspect-video relative rounded-lg overflow-hidden">
            <Image
              src={project.thumbnail}
              alt={project.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      )}

      {/* Content */}
      <div className="max-w-3xl mx-auto px-5 md:px-10 py-12">
        {/* Header */}
        <header className="mb-8">
          <h1 className="font-heading text-3xl md:text-4xl font-semibold text-text-primary mb-4">
            {project.title}
          </h1>

          {/* Meta */}
          <div className="flex items-center gap-4 text-sm text-text-tertiary mb-4">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              <time dateTime={project.created_at}>{formatDate(project.created_at)}</time>
            </div>
          </div>

          {/* Description */}
          <p className="text-lg text-text-secondary mb-6">
            {project.description}
          </p>

          {/* Tech Stack */}
          <TechStack techs={project.tech_stack} className="mb-6" />

          {/* Links */}
          <div className="flex gap-4">
            {project.demo_url && (
              <a
                href={project.demo_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-text-primary text-bg-primary font-medium rounded-lg hover:opacity-90 transition-opacity"
              >
                <ExternalLink className="w-4 h-4" />
                Live Demo
              </a>
            )}
            {project.github_url && (
              <a
                href={project.github_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 border border-border-secondary text-text-primary font-medium rounded-lg hover:border-text-primary transition-colors"
              >
                <Github className="w-4 h-4" />
                Source Code
              </a>
            )}
          </div>
        </header>

        {/* Content */}
        {project.content && (
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <div dangerouslySetInnerHTML={{ __html: project.content }} />
          </div>
        )}

        {/* Image Gallery */}
        {project.images && project.images.length > 0 && (
          <div className="mt-12">
            <h2 className="font-heading text-2xl font-semibold text-text-primary mb-6">
              Screenshots
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.images.map((image, index) => (
                <div
                  key={index}
                  className="aspect-video relative rounded-lg overflow-hidden"
                >
                  <Image
                    src={image}
                    alt={`${project.title} screenshot ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
