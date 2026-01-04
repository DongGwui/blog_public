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
import { PostContent } from '@/presentation/components/post';

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

          {/* Properties (Notion Style) */}
          <div className="space-y-3 text-sm">
            {/* Description */}
            <div className="flex items-start gap-4">
              <span className="w-20 shrink-0 text-text-tertiary">Summary</span>
              <p className="text-text-secondary leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* Tech Stack */}
            <div className="flex items-start gap-4">
              <span className="w-20 shrink-0 text-text-tertiary">Tech</span>
              <div className="flex flex-wrap gap-1.5">
                {project.tech_stack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 text-xs text-text-secondary bg-bg-secondary rounded"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Links */}
            {(project.demo_url || project.github_url) && (
              <div className="flex items-center gap-4">
                <span className="w-20 shrink-0 text-text-tertiary">Links</span>
                <div className="flex items-center gap-3">
                  {project.demo_url && (
                    <a
                      href={project.demo_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-text-secondary hover:text-text-primary underline underline-offset-2 decoration-border-primary hover:decoration-text-primary transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      Demo
                    </a>
                  )}
                  {project.github_url && (
                    <a
                      href={project.github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-text-secondary hover:text-text-primary underline underline-offset-2 decoration-border-primary hover:decoration-text-primary transition-colors"
                    >
                      <Github className="w-3.5 h-3.5" />
                      GitHub
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        </header>

        {/* Content */}
        {project.content && (
          <PostContent content={project.content} />
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
