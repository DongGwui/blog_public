/**
 * Common Types
 * API 응답에서 공통으로 사용되는 타입들
 */

/**
 * 페이지네이션 메타 정보
 */
export interface PaginationMeta {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
}

/**
 * API 성공 응답 타입
 */
export interface ApiResponse<T> {
  data: T;
  meta?: PaginationMeta;
}

/**
 * API 에러 응답 타입
 */
export interface ApiError {
  error: {
    code: string;
    message: string;
  };
}

/**
 * API 에러 코드
 */
export type ApiErrorCode = 'BAD_REQUEST' | 'NOT_FOUND' | 'VALIDATION_ERROR' | 'INTERNAL_ERROR';

/**
 * 조회수 응답 타입
 */
export interface ViewCountResponse {
  view_count: number;
}
