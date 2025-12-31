/**
 * IncrementView Use Case
 * 조회수 증가
 */

import type { IPostRepository } from '@/domain/repositories';

import type { IncrementViewRequestDTO, IncrementViewResponseDTO } from '@/application/dto';

export interface IncrementViewUseCase {
  execute(request: IncrementViewRequestDTO): Promise<IncrementViewResponseDTO>;
}

export function createIncrementViewUseCase(postRepository: IPostRepository): IncrementViewUseCase {
  return {
    async execute(request: IncrementViewRequestDTO): Promise<IncrementViewResponseDTO> {
      if (!request.slug) {
        throw new Error('Slug is required');
      }

      const result = await postRepository.incrementView(request.slug);

      return {
        viewCount: result.view_count,
      };
    },
  };
}
