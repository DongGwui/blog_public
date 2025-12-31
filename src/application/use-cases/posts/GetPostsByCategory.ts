/**
 * GetPostsByCategory Use Case
 * 카테고리별 글 목록 조회
 */

import type { ApiResponse, PostListItem } from '@/domain/entities';
import type { IPostRepository } from '@/domain/repositories';

import type { GetPostsByCategoryRequestDTO } from '@/application/dto';
import { normalizePagination } from '@/application/dto';

export interface GetPostsByCategoryUseCase {
  execute(request: GetPostsByCategoryRequestDTO): Promise<ApiResponse<PostListItem[]>>;
}

export function createGetPostsByCategoryUseCase(
  postRepository: IPostRepository
): GetPostsByCategoryUseCase {
  return {
    async execute(request: GetPostsByCategoryRequestDTO): Promise<ApiResponse<PostListItem[]>> {
      if (!request.categorySlug) {
        throw new Error('Category slug is required');
      }

      const { page, perPage } = normalizePagination(request);

      return postRepository.getPostsByCategory(request.categorySlug, {
        page,
        perPage,
      });
    },
  };
}
