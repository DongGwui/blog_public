import type { ApiResponse, Project, ProjectListItem } from '@/domain/entities';

/**
 * Project Repository Interface
 * 프로젝트 데이터 접근을 위한 추상화 레이어
 */

export interface GetProjectsParams {
  featured?: boolean;
}

export interface IProjectRepository {
  /**
   * 프로젝트 목록 조회
   */
  getProjects(params?: GetProjectsParams): Promise<ApiResponse<ProjectListItem[]>>;

  /**
   * 프로젝트 상세 조회
   */
  getProject(slug: string): Promise<ApiResponse<Project>>;
}
