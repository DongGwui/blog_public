'use client';

/**
 * useCategories Hook
 * 카테고리 목록 조회를 위한 TanStack Query 훅
 */

import { useQuery } from '@tanstack/react-query';

import { getApiClient } from '@/infrastructure/api';
import { createCategoryRepository } from '@/infrastructure/repositories';

export const categoriesKeys = {
  all: ['categories'] as const,
  list: () => [...categoriesKeys.all, 'list'] as const,
};

export interface UseCategoriesOptions {
  enabled?: boolean;
}

export function useCategories(options: UseCategoriesOptions = {}) {
  const { enabled = true } = options;

  return useQuery({
    queryKey: categoriesKeys.list(),
    queryFn: async () => {
      const apiClient = getApiClient();
      const repository = createCategoryRepository(apiClient);
      return repository.getCategories();
    },
    enabled,
    staleTime: 1000 * 60 * 5, // 5분간 캐시
  });
}
