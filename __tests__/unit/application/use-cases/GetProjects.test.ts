import type { ApiResponse, ProjectListItem } from '@/domain/entities';
import type { IProjectRepository } from '@/domain/repositories';

import { createGetProjectsUseCase } from '@/application/use-cases/projects';

describe('GetProjects Use Case', () => {
  const mockProjects: ProjectListItem[] = [
    {
      id: 1,
      title: 'Blog Project',
      slug: 'blog-project',
      description: 'A blog built with Next.js',
      tech_stack: ['Next.js', 'TypeScript', 'Tailwind CSS'],
      thumbnail: '/images/blog.png',
      thumbnail_sm: '/images/blog_sm.jpg',
      thumbnail_md: '/images/blog_md.jpg',
      is_featured: true,
      sort_order: 1,
    },
    {
      id: 2,
      title: 'Portfolio Project',
      slug: 'portfolio-project',
      description: 'Personal portfolio website',
      tech_stack: ['React', 'TypeScript'],
      thumbnail: null,
      thumbnail_sm: null,
      thumbnail_md: null,
      is_featured: false,
      sort_order: 2,
    },
  ];

  const mockResponse: ApiResponse<ProjectListItem[]> = {
    data: mockProjects,
    meta: {
      page: 1,
      per_page: 10,
      total: 2,
      total_pages: 1,
    },
  };

  const createMockRepository = (): IProjectRepository => ({
    getProjects: jest.fn().mockResolvedValue(mockResponse),
    getProject: jest.fn(),
  });

  it('should call repository without parameters', async () => {
    const mockRepo = createMockRepository();
    const useCase = createGetProjectsUseCase(mockRepo);

    const result = await useCase.execute();

    expect(mockRepo.getProjects).toHaveBeenCalledWith({
      featured: undefined,
    });
    expect(result).toEqual(mockResponse);
  });

  it('should call repository with featured filter', async () => {
    const mockRepo = createMockRepository();
    const useCase = createGetProjectsUseCase(mockRepo);

    await useCase.execute({ featured: true });

    expect(mockRepo.getProjects).toHaveBeenCalledWith({
      featured: true,
    });
  });

  it('should call repository with featured=false filter', async () => {
    const mockRepo = createMockRepository();
    const useCase = createGetProjectsUseCase(mockRepo);

    await useCase.execute({ featured: false });

    expect(mockRepo.getProjects).toHaveBeenCalledWith({
      featured: false,
    });
  });

  it('should return project list with meta', async () => {
    const mockRepo = createMockRepository();
    const useCase = createGetProjectsUseCase(mockRepo);

    const result = await useCase.execute();

    expect(result.data).toHaveLength(2);
    expect(result.meta?.total).toBe(2);
    expect(result.data[0].is_featured).toBe(true);
  });

  it('should return featured projects', async () => {
    const mockRepo = createMockRepository();
    const useCase = createGetProjectsUseCase(mockRepo);

    const result = await useCase.execute({ featured: true });

    expect(mockRepo.getProjects).toHaveBeenCalledWith({ featured: true });
    expect(result.data[0].is_featured).toBe(true);
  });
});
