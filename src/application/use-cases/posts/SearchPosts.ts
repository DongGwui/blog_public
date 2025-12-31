/**
 * SearchPosts Use Case
 * 글 검색
 */

import type { ApiResponse, PostListItem } from '@/domain/entities';
import type { IPostRepository } from '@/domain/repositories';

import type { SearchPostsRequestDTO } from '@/application/dto';
import { normalizePagination } from '@/application/dto';

export interface SearchPostsUseCase {
  execute(request: SearchPostsRequestDTO): Promise<ApiResponse<PostListItem[]>>;
}

export function createSearchPostsUseCase(postRepository: IPostRepository): SearchPostsUseCase {
  return {
    async execute(request: SearchPostsRequestDTO): Promise<ApiResponse<PostListItem[]>> {
      if (!request.query || request.query.trim().length === 0) {
        throw new Error('Search query is required');
      }

      const { page, perPage } = normalizePagination(request);

      return postRepository.searchPosts({
        query: request.query.trim(),
        page,
        perPage,
      });
    },
  };
}
