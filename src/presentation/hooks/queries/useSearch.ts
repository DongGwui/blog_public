'use client';

/**
 * useSearch Hook
 * 글 검색을 위한 TanStack Query 훅
 */

import { useQuery } from '@tanstack/react-query';

import { getApiClient } from '@/infrastructure/api';
import { createPostRepository } from '@/infrastructure/repositories';
import { postsKeys } from './usePosts';

export interface UseSearchOptions {
  query: string;
  page?: number;
  perPage?: number;
  enabled?: boolean;
}

export function useSearch(options: UseSearchOptions) {
  const { query, page = 1, perPage = 10, enabled = true } = options;

  return useQuery({
    queryKey: postsKeys.search(query),
    queryFn: async () => {
      const apiClient = getApiClient();
      const repository = createPostRepository(apiClient);
      return repository.searchPosts({ query, page, perPage });
    },
    enabled: enabled && !!query && query.trim().length > 0,
  });
}
