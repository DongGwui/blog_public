/**
 * Post DTOs
 * 글 관련 데이터 전송 객체
 */

import type { PaginationRequestDTO } from './PaginationDTO';

/**
 * 글 목록 조회 요청 DTO
 */
export interface GetPostsRequestDTO extends PaginationRequestDTO {
  categoryId?: number;
  tagId?: number;
}

/**
 * 글 검색 요청 DTO
 */
export interface SearchPostsRequestDTO extends PaginationRequestDTO {
  query: string;
}

/**
 * 카테고리별 글 목록 조회 요청 DTO
 */
export interface GetPostsByCategoryRequestDTO extends PaginationRequestDTO {
  categorySlug: string;
}

/**
 * 태그별 글 목록 조회 요청 DTO
 */
export interface GetPostsByTagRequestDTO extends PaginationRequestDTO {
  tagSlug: string;
}

/**
 * 글 상세 조회 요청 DTO
 */
export interface GetPostRequestDTO {
  slug: string;
}

/**
 * 조회수 증가 요청 DTO
 */
export interface IncrementViewRequestDTO {
  slug: string;
}

/**
 * 조회수 증가 응답 DTO
 */
export interface IncrementViewResponseDTO {
  viewCount: number;
}
