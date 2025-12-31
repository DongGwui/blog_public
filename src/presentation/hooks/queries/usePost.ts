'use client';

/**
 * usePost Hook
 * 글 상세 조회를 위한 TanStack Query 훅
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import type { ApiResponse, Post } from '@/domain/entities';
import { getApiClient } from '@/infrastructure/api';
import { createPostRepository } from '@/infrastructure/repositories';
import { postsKeys } from './usePosts';

export interface UsePostOptions {
  slug: string;
  enabled?: boolean;
}

export function usePost(options: UsePostOptions) {
  const { slug, enabled = true } = options;

  return useQuery({
    queryKey: postsKeys.detail(slug),
    queryFn: async () => {
      const apiClient = getApiClient();
      const repository = createPostRepository(apiClient);
      return repository.getPost(slug);
    },
    enabled: enabled && !!slug,
  });
}

export function useIncrementView() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (slug: string) => {
      const apiClient = getApiClient();
      const repository = createPostRepository(apiClient);
      return repository.incrementView(slug);
    },
    onSuccess: (data, slug) => {
      // 글 상세 쿼리 캐시 업데이트
      queryClient.setQueryData<ApiResponse<Post>>(postsKeys.detail(slug), (old) => {
        if (!old) return old;
        return {
          ...old,
          data: {
            ...old.data,
            view_count: data.view_count,
          },
        };
      });
    },
  });
}
