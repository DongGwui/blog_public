/**
 * Project DTOs
 * 프로젝트 관련 데이터 전송 객체
 */

/**
 * 프로젝트 목록 조회 요청 DTO
 */
export interface GetProjectsRequestDTO {
  featured?: boolean;
}

/**
 * 프로젝트 상세 조회 요청 DTO
 */
export interface GetProjectRequestDTO {
  slug: string;
}
