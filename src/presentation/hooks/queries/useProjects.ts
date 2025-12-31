'use client';

/**
 * useProjects Hook
 * 프로젝트 목록/상세 조회를 위한 TanStack Query 훅
 */

import { useQuery } from '@tanstack/react-query';

import { getApiClient } from '@/infrastructure/api';
import { createProjectRepository } from '@/infrastructure/repositories';

export const projectsKeys = {
  all: ['projects'] as const,
  lists: () => [...projectsKeys.all, 'list'] as const,
  list: (featured?: boolean) => [...projectsKeys.lists(), { featured }] as const,
  details: () => [...projectsKeys.all, 'detail'] as const,
  detail: (slug: string) => [...projectsKeys.details(), slug] as const,
};

export interface UseProjectsOptions {
  featured?: boolean;
  enabled?: boolean;
}

export function useProjects(options: UseProjectsOptions = {}) {
  const { featured, enabled = true } = options;

  return useQuery({
    queryKey: projectsKeys.list(featured),
    queryFn: async () => {
      const apiClient = getApiClient();
      const repository = createProjectRepository(apiClient);
      return repository.getProjects({ featured });
    },
    enabled,
  });
}

export interface UseProjectOptions {
  slug: string;
  enabled?: boolean;
}

export function useProject(options: UseProjectOptions) {
  const { slug, enabled = true } = options;

  return useQuery({
    queryKey: projectsKeys.detail(slug),
    queryFn: async () => {
      const apiClient = getApiClient();
      const repository = createProjectRepository(apiClient);
      return repository.getProject(slug);
    },
    enabled: enabled && !!slug,
  });
}
