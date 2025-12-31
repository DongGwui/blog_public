'use client';

/**
 * usePosts Hook
 * 글 목록 조회를 위한 TanStack Query 훅
 */

import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import type { ApiResponse, PostListItem } from '@/domain/entities';
import type { GetPostsParams } from '@/domain/repositories';
import { getApiClient } from '@/infrastructure/api';
import { createPostRepository } from '@/infrastructure/repositories';

export const postsKeys = {
  all: ['posts'] as const,
  lists: () => [...postsKeys.all, 'list'] as const,
  list: (params?: GetPostsParams) => [...postsKeys.lists(), params] as const,
  details: () => [...postsKeys.all, 'detail'] as const,
  detail: (slug: string) => [...postsKeys.details(), slug] as const,
  search: (query: string) => [...postsKeys.all, 'search', query] as const,
  byCategory: (slug: string) => [...postsKeys.all, 'category', slug] as const,
  byTag: (slug: string) => [...postsKeys.all, 'tag', slug] as const,
};

export interface UsePostsOptions {
  page?: number;
  perPage?: number;
  categoryId?: number;
  tagId?: number;
  enabled?: boolean;
}

export function usePosts(options: UsePostsOptions = {}) {
  const { page = 1, perPage = 10, categoryId, tagId, enabled = true } = options;

  const params: GetPostsParams = {
    page,
    perPage,
    categoryId,
    tagId,
  };

  return useQuery({
    queryKey: postsKeys.list(params),
    queryFn: async () => {
      const apiClient = getApiClient();
      const repository = createPostRepository(apiClient);
      return repository.getPosts(params);
    },
    enabled,
  });
}

export interface UsePostsByCategoryOptions {
  categorySlug: string;
  page?: number;
  perPage?: number;
  enabled?: boolean;
}

export function usePostsByCategory(options: UsePostsByCategoryOptions) {
  const { categorySlug, page = 1, perPage = 10, enabled = true } = options;

  return useQuery({
    queryKey: postsKeys.byCategory(categorySlug),
    queryFn: async () => {
      const apiClient = getApiClient();
      const repository = createPostRepository(apiClient);
      return repository.getPostsByCategory(categorySlug, { page, perPage });
    },
    enabled: enabled && !!categorySlug,
  });
}

export interface UsePostsByTagOptions {
  tagSlug: string;
  page?: number;
  perPage?: number;
  enabled?: boolean;
}

export function usePostsByTag(options: UsePostsByTagOptions) {
  const { tagSlug, page = 1, perPage = 10, enabled = true } = options;

  return useQuery({
    queryKey: postsKeys.byTag(tagSlug),
    queryFn: async () => {
      const apiClient = getApiClient();
      const repository = createPostRepository(apiClient);
      return repository.getPostsByTag(tagSlug, { page, perPage });
    },
    enabled: enabled && !!tagSlug,
  });
}
