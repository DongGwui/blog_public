/**
 * ProjectCard Component
 * 프로젝트 목록에서 사용되는 카드 컴포넌트
 */

import Link from 'next/link';
import Image from 'next/image';
import { ExternalLink, Github } from 'lucide-react';

import type { ProjectListItem, Project } from '@/domain/entities';

export interface ProjectCardProps {
  project: ProjectListItem;
  className?: string;
}

export function ProjectCard({ project, className = '' }: ProjectCardProps) {
  return (
    <article
      className={`group bg-bg-secondary rounded-lg overflow-hidden border border-border-primary hover:border-border-secondary transition-all hover:-translate-y-1 hover:shadow-lg ${className}`}
    >
      {/* Thumbnail */}
      <Link href={`/projects/${project.slug}`} className="block aspect-video relative overflow-hidden">
        {project.thumbnail ? (
          <Image
            src={project.thumbnail}
            alt={project.title}
            fill
            className="object-cover transition-transform group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-bg-tertiary flex items-center justify-center">
            <span className="text-text-tertiary text-sm">No Image</span>
          </div>
        )}
      </Link>

      {/* Content */}
      <div className="p-5">
        {/* Title */}
        <h3 className="mb-2">
          <Link
            href={`/projects/${project.slug}`}
            className="font-heading text-lg font-semibold text-text-primary hover:text-accent-primary transition-colors"
          >
            {project.title}
          </Link>
        </h3>

        {/* Description */}
        <p className="text-sm text-text-secondary line-clamp-2 mb-4">
          {project.description}
        </p>

        {/* Tech Stack */}
        <TechStack techs={project.tech_stack} className="mb-4" />
      </div>
    </article>
  );
}

export interface TechStackProps {
  techs: string[];
  className?: string;
  limit?: number;
}

export function TechStack({ techs, className = '', limit = 4 }: TechStackProps) {
  const displayTechs = limit ? techs.slice(0, limit) : techs;
  const remaining = techs.length - displayTechs.length;

  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {displayTechs.map((tech) => (
        <span
          key={tech}
          className="px-2 py-1 text-xs rounded-full border border-border-primary text-text-tertiary"
        >
          {tech}
        </span>
      ))}
      {remaining > 0 && (
        <span className="px-2 py-1 text-xs text-text-tertiary">
          +{remaining}
        </span>
      )}
    </div>
  );
}

export interface ProjectLinksProps {
  demoUrl?: string | null;
  githubUrl?: string | null;
  className?: string;
}

export function ProjectLinks({ demoUrl, githubUrl, className = '' }: ProjectLinksProps) {
  if (!demoUrl && !githubUrl) return null;

  return (
    <div className={`flex gap-4 ${className}`}>
      {demoUrl && (
        <a
          href={demoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm text-text-secondary hover:text-accent-primary transition-colors"
        >
          <ExternalLink className="w-4 h-4" />
          Demo
        </a>
      )}
      {githubUrl && (
        <a
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm text-text-secondary hover:text-accent-primary transition-colors"
        >
          <Github className="w-4 h-4" />
          GitHub
        </a>
      )}
    </div>
  );
}

export interface ProjectGridProps {
  projects: ProjectListItem[];
  className?: string;
}

export function ProjectGrid({ projects, className = '' }: ProjectGridProps) {
  if (!projects.length) {
    return (
      <div className={`py-16 text-center ${className}`}>
        <p className="text-text-secondary">아직 등록된 프로젝트가 없습니다.</p>
      </div>
    );
  }

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}>
      {projects.map((project, index) => (
        <ProjectCard
          key={project.id}
          project={project}
          className={`animate-fade-in-up animation-delay-${(index % 6) * 100}`}
        />
      ))}
    </div>
  );
}
