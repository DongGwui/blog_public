/**
 * Pagination DTOs
 * 페이지네이션 관련 데이터 전송 객체
 */

/**
 * 페이지네이션 요청 DTO
 */
export interface PaginationRequestDTO {
  page?: number;
  perPage?: number;
}

/**
 * 페이지네이션 응답 DTO
 */
export interface PaginationResponseDTO {
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
}

/**
 * 페이지네이션이 포함된 목록 응답 DTO
 */
export interface PaginatedListDTO<T> {
  data: T[];
  pagination: PaginationResponseDTO;
}

/**
 * 기본 페이지네이션 값
 */
export const DEFAULT_PAGE = 1;
export const DEFAULT_PER_PAGE = 10;
export const MAX_PER_PAGE = 100;

/**
 * 페이지네이션 파라미터 정규화
 */
export function normalizePagination(params?: PaginationRequestDTO): {
  page: number;
  perPage: number;
} {
  const page = Math.max(params?.page ?? DEFAULT_PAGE, 1);
  const perPage = Math.min(Math.max(params?.perPage ?? DEFAULT_PER_PAGE, 1), MAX_PER_PAGE);

  return { page, perPage };
}
