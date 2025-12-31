/**
 * GetTags Use Case
 * 태그 목록 조회
 */

import type { ApiResponse, Tag } from '@/domain/entities';
import type { ITagRepository } from '@/domain/repositories';

export interface GetTagsUseCase {
  execute(): Promise<ApiResponse<Tag[]>>;
}

export function createGetTagsUseCase(tagRepository: ITagRepository): GetTagsUseCase {
  return {
    async execute(): Promise<ApiResponse<Tag[]>> {
      return tagRepository.getTags();
    },
  };
}
