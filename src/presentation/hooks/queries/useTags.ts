'use client';

/**
 * useTags Hook
 * 태그 목록 조회를 위한 TanStack Query 훅
 */

import { useQuery } from '@tanstack/react-query';

import { getApiClient } from '@/infrastructure/api';
import { createTagRepository } from '@/infrastructure/repositories';

export const tagsKeys = {
  all: ['tags'] as const,
  list: () => [...tagsKeys.all, 'list'] as const,
};

export interface UseTagsOptions {
  enabled?: boolean;
}

export function useTags(options: UseTagsOptions = {}) {
  const { enabled = true } = options;

  return useQuery({
    queryKey: tagsKeys.list(),
    queryFn: async () => {
      const apiClient = getApiClient();
      const repository = createTagRepository(apiClient);
      return repository.getTags();
    },
    enabled,
    staleTime: 1000 * 60 * 5, // 5분간 캐시
  });
}
