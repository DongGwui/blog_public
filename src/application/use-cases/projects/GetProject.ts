/**
 * GetProject Use Case
 * 프로젝트 상세 조회
 */

import type { ApiResponse, Project } from '@/domain/entities';
import type { IProjectRepository } from '@/domain/repositories';

import type { GetProjectRequestDTO } from '@/application/dto';

export interface GetProjectUseCase {
  execute(request: GetProjectRequestDTO): Promise<ApiResponse<Project>>;
}

export function createGetProjectUseCase(projectRepository: IProjectRepository): GetProjectUseCase {
  return {
    async execute(request: GetProjectRequestDTO): Promise<ApiResponse<Project>> {
      if (!request.slug) {
        throw new Error('Slug is required');
      }

      return projectRepository.getProject(request.slug);
    },
  };
}
