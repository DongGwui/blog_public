/**
 * GetProjects Use Case
 * 프로젝트 목록 조회
 */

import type { ApiResponse, ProjectListItem } from '@/domain/entities';
import type { IProjectRepository } from '@/domain/repositories';

import type { GetProjectsRequestDTO } from '@/application/dto';

export interface GetProjectsUseCase {
  execute(request?: GetProjectsRequestDTO): Promise<ApiResponse<ProjectListItem[]>>;
}

export function createGetProjectsUseCase(
  projectRepository: IProjectRepository
): GetProjectsUseCase {
  return {
    async execute(request?: GetProjectsRequestDTO): Promise<ApiResponse<ProjectListItem[]>> {
      return projectRepository.getProjects({
        featured: request?.featured,
      });
    },
  };
}
