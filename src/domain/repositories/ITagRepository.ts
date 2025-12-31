import type { ApiResponse, Tag } from '@/domain/entities';

/**
 * Tag Repository Interface
 * 태그 데이터 접근을 위한 추상화 레이어
 */

export interface ITagRepository {
  /**
   * 태그 목록 조회
   */
  getTags(): Promise<ApiResponse<Tag[]>>;
}
