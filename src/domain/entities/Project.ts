/**
 * Project Entity
 * 프로젝트를 나타내는 도메인 엔티티
 */

/**
 * 프로젝트 목록에서 사용되는 Project 타입
 */
export interface ProjectListItem {
  id: number;
  title: string;
  slug: string;
  description: string;
  tech_stack: string[];
  thumbnail: string | null;
  is_featured: boolean;
  sort_order: number;
}

/**
 * 프로젝트 상세에서 사용되는 Project 타입
 */
export interface Project extends ProjectListItem {
  content: string;
  demo_url: string | null;
  github_url: string | null;
  images: string[];
  created_at: string;
  updated_at: string | null;
}

/**
 * Project 엔티티 유효성 검증
 */
export function isValidProject(project: unknown): project is Project {
  if (!project || typeof project !== 'object') return false;

  const p = project as Record<string, unknown>;

  return (
    typeof p.id === 'number' &&
    typeof p.title === 'string' &&
    typeof p.slug === 'string' &&
    typeof p.description === 'string' &&
    typeof p.content === 'string' &&
    Array.isArray(p.tech_stack) &&
    Array.isArray(p.images) &&
    typeof p.is_featured === 'boolean'
  );
}

/**
 * ProjectListItem 엔티티 유효성 검증
 */
export function isValidProjectListItem(project: unknown): project is ProjectListItem {
  if (!project || typeof project !== 'object') return false;

  const p = project as Record<string, unknown>;

  return (
    typeof p.id === 'number' &&
    typeof p.title === 'string' &&
    typeof p.slug === 'string' &&
    typeof p.description === 'string' &&
    Array.isArray(p.tech_stack) &&
    typeof p.is_featured === 'boolean'
  );
}
