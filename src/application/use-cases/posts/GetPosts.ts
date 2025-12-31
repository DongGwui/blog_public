/**
 * GetPosts Use Case
 * 글 목록 조회
 */

import type { ApiResponse, PostListItem } from '@/domain/entities';
import type { IPostRepository } from '@/domain/repositories';

import type { GetPostsRequestDTO } from '@/application/dto';
import { normalizePagination } from '@/application/dto';

export interface GetPostsUseCase {
  execute(request?: GetPostsRequestDTO): Promise<ApiResponse<PostListItem[]>>;
}

export function createGetPostsUseCase(postRepository: IPostRepository): GetPostsUseCase {
  return {
    async execute(request?: GetPostsRequestDTO): Promise<ApiResponse<PostListItem[]>> {
      const { page, perPage } = normalizePagination(request);

      return postRepository.getPosts({
        page,
        perPage,
        categoryId: request?.categoryId,
        tagId: request?.tagId,
      });
    },
  };
}
