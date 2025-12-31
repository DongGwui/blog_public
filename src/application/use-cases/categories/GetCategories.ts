/**
 * GetCategories Use Case
 * 카테고리 목록 조회
 */

import type { ApiResponse, Category } from '@/domain/entities';
import type { ICategoryRepository } from '@/domain/repositories';

export interface GetCategoriesUseCase {
  execute(): Promise<ApiResponse<Category[]>>;
}

export function createGetCategoriesUseCase(
  categoryRepository: ICategoryRepository
): GetCategoriesUseCase {
  return {
    async execute(): Promise<ApiResponse<Category[]>> {
      return categoryRepository.getCategories();
    },
  };
}
