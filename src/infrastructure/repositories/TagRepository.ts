/**
 * Tag Repository Implementation
 * API를 통한 태그 데이터 접근 구현체
 */

import type { ApiResponse, Tag } from '@/domain/entities';
import type { ITagRepository } from '@/domain/repositories';
import type { ApiClient } from '@/infrastructure/api/ApiClient';

export function createTagRepository(apiClient: ApiClient): ITagRepository {
  return {
    async getTags(): Promise<ApiResponse<Tag[]>> {
      return apiClient.get<ApiResponse<Tag[]>>('/tags');
    },
  };
}
