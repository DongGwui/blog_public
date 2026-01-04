import type { ApiResponse, Project } from '@/domain/entities';
import type { IProjectRepository } from '@/domain/repositories';

import { createGetProjectUseCase } from '@/application/use-cases/projects';

describe('GetProject Use Case', () => {
  const mockProject: Project = {
    id: 1,
    title: 'Blog Project',
    slug: 'blog-project',
    description: 'A blog built with Next.js',
    content: '<p>Full description of the blog project</p>',
    tech_stack: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    thumbnail: '/images/blog.png',
    thumbnail_sm: '/images/blog_sm.jpg',
    thumbnail_md: '/images/blog_md.jpg',
    images: ['/images/blog-1.png', '/images/blog-2.png'],
    github_url: 'https://github.com/example/blog',
    demo_url: 'https://blog.example.com',
    is_featured: true,
    sort_order: 1,
    created_at: '2024-01-15T00:00:00Z',
    updated_at: '2024-01-16T00:00:00Z',
  };

  const mockResponse: ApiResponse<Project> = {
    data: mockProject,
  };

  const createMockRepository = (): IProjectRepository => ({
    getProjects: jest.fn(),
    getProject: jest.fn().mockResolvedValue(mockResponse),
  });

  it('should call repository with slug', async () => {
    const mockRepo = createMockRepository();
    const useCase = createGetProjectUseCase(mockRepo);

    const result = await useCase.execute({ slug: 'blog-project' });

    expect(mockRepo.getProject).toHaveBeenCalledWith('blog-project');
    expect(result).toEqual(mockResponse);
  });

  it('should return project data from repository', async () => {
    const mockRepo = createMockRepository();
    const useCase = createGetProjectUseCase(mockRepo);

    const result = await useCase.execute({ slug: 'blog-project' });

    expect(result.data).toEqual(mockProject);
    expect(result.data.title).toBe('Blog Project');
    expect(result.data.slug).toBe('blog-project');
  });

  it('should return project with tech stack', async () => {
    const mockRepo = createMockRepository();
    const useCase = createGetProjectUseCase(mockRepo);

    const result = await useCase.execute({ slug: 'blog-project' });

    expect(result.data.tech_stack).toContain('Next.js');
    expect(result.data.tech_stack).toContain('TypeScript');
    expect(result.data.tech_stack).toHaveLength(3);
  });

  it('should return project with images', async () => {
    const mockRepo = createMockRepository();
    const useCase = createGetProjectUseCase(mockRepo);

    const result = await useCase.execute({ slug: 'blog-project' });

    expect(result.data.images).toHaveLength(2);
    expect(result.data.thumbnail).toBe('/images/blog.png');
  });

  it('should throw error when slug is empty', async () => {
    const mockRepo = createMockRepository();
    const useCase = createGetProjectUseCase(mockRepo);

    await expect(useCase.execute({ slug: '' })).rejects.toThrow('Slug is required');
  });
});
