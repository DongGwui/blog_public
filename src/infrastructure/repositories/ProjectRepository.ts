/**
 * Project Repository Implementation
 * API를 통한 프로젝트 데이터 접근 구현체
 */

import type { ApiResponse, Project, ProjectListItem } from '@/domain/entities';
import type { IProjectRepository, GetProjectsParams } from '@/domain/repositories';
import type { ApiClient } from '@/infrastructure/api/ApiClient';

export function createProjectRepository(apiClient: ApiClient): IProjectRepository {
  return {
    async getProjects(params?: GetProjectsParams): Promise<ApiResponse<ProjectListItem[]>> {
      const queryParams: Record<string, string | boolean | undefined> = {};

      if (params?.featured !== undefined) {
        queryParams.featured = params.featured;
      }

      return apiClient.get<ApiResponse<ProjectListItem[]>>('/projects', { params: queryParams });
    },

    async getProject(slug: string): Promise<ApiResponse<Project>> {
      return apiClient.get<ApiResponse<Project>>(`/projects/${slug}`);
    },
  };
}
