/**
 * GetPost Use Case
 * 글 상세 조회
 */

import type { ApiResponse, Post } from '@/domain/entities';
import type { IPostRepository } from '@/domain/repositories';

import type { GetPostRequestDTO } from '@/application/dto';

export interface GetPostUseCase {
  execute(request: GetPostRequestDTO): Promise<ApiResponse<Post>>;
}

export function createGetPostUseCase(postRepository: IPostRepository): GetPostUseCase {
  return {
    async execute(request: GetPostRequestDTO): Promise<ApiResponse<Post>> {
      if (!request.slug) {
        throw new Error('Slug is required');
      }

      return postRepository.getPost(request.slug);
    },
  };
}
