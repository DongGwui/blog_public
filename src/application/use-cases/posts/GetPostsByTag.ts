/**
 * GetPostsByTag Use Case
 * 태그별 글 목록 조회
 */

import type { ApiResponse, PostListItem } from '@/domain/entities';
import type { IPostRepository } from '@/domain/repositories';

import type { GetPostsByTagRequestDTO } from '@/application/dto';
import { normalizePagination } from '@/application/dto';

export interface GetPostsByTagUseCase {
  execute(request: GetPostsByTagRequestDTO): Promise<ApiResponse<PostListItem[]>>;
}

export function createGetPostsByTagUseCase(postRepository: IPostRepository): GetPostsByTagUseCase {
  return {
    async execute(request: GetPostsByTagRequestDTO): Promise<ApiResponse<PostListItem[]>> {
      if (!request.tagSlug) {
        throw new Error('Tag slug is required');
      }

      const { page, perPage } = normalizePagination(request);

      return postRepository.getPostsByTag(request.tagSlug, {
        page,
        perPage,
      });
    },
  };
}
