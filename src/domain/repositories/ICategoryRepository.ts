import type { ApiResponse, Category } from '@/domain/entities';

/**
 * Category Repository Interface
 * 카테고리 데이터 접근을 위한 추상화 레이어
 */

export interface ICategoryRepository {
  /**
   * 카테고리 목록 조회
   */
  getCategories(): Promise<ApiResponse<Category[]>>;
}
