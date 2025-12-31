/**
 * Category Repository Implementation
 * API를 통한 카테고리 데이터 접근 구현체
 */

import type { ApiResponse, Category } from '@/domain/entities';
import type { ICategoryRepository } from '@/domain/repositories';
import type { ApiClient } from '@/infrastructure/api/ApiClient';

export function createCategoryRepository(apiClient: ApiClient): ICategoryRepository {
  return {
    async getCategories(): Promise<ApiResponse<Category[]>> {
      return apiClient.get<ApiResponse<Category[]>>('/categories');
    },
  };
}
