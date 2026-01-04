import type { ApiResponse, PostListItem } from '@/domain/entities';
import type { IPostRepository } from '@/domain/repositories';

import { createSearchPostsUseCase } from '@/application/use-cases/posts';

describe('SearchPosts Use Case', () => {
  const mockPosts: PostListItem[] = [
    {
      id: 1,
      title: 'TypeScript Guide',
      slug: 'typescript-guide',
      excerpt: 'A comprehensive guide to TypeScript',
      category_id: 1,
      category_name: 'Development',
      category_slug: 'development',
      status: 'published',
      view_count: 100,
      reading_time: 10,
      thumbnail: null,
      thumbnail_sm: null,
      thumbnail_md: null,
      tags: [],
      created_at: '2024-01-15T00:00:00Z',
      published_at: '2024-01-15T00:00:00Z',
    },
  ];

  const mockResponse: ApiResponse<PostListItem[]> = {
    data: mockPosts,
    meta: {
      page: 1,
      per_page: 10,
      total: 1,
      total_pages: 1,
    },
  };

  const createMockRepository = (): IPostRepository => ({
    getPosts: jest.fn(),
    getPost: jest.fn(),
    searchPosts: jest.fn().mockResolvedValue(mockResponse),
    incrementView: jest.fn(),
    getPostsByCategory: jest.fn(),
    getPostsByTag: jest.fn(),
  });

  it('should call repository with search query', async () => {
    const mockRepo = createMockRepository();
    const useCase = createSearchPostsUseCase(mockRepo);

    const result = await useCase.execute({ query: 'typescript' });

    expect(mockRepo.searchPosts).toHaveBeenCalledWith({
      query: 'typescript',
      page: 1,
      perPage: 10,
    });
    expect(result).toEqual(mockResponse);
  });

  it('should call repository with custom pagination', async () => {
    const mockRepo = createMockRepository();
    const useCase = createSearchPostsUseCase(mockRepo);

    await useCase.execute({ query: 'typescript', page: 2, perPage: 20 });

    expect(mockRepo.searchPosts).toHaveBeenCalledWith({
      query: 'typescript',
      page: 2,
      perPage: 20,
    });
  });

  it('should trim whitespace from query', async () => {
    const mockRepo = createMockRepository();
    const useCase = createSearchPostsUseCase(mockRepo);

    await useCase.execute({ query: '  typescript  ' });

    expect(mockRepo.searchPosts).toHaveBeenCalledWith(
      expect.objectContaining({
        query: 'typescript',
      })
    );
  });

  it('should normalize invalid page to 1', async () => {
    const mockRepo = createMockRepository();
    const useCase = createSearchPostsUseCase(mockRepo);

    await useCase.execute({ query: 'test', page: -1 });

    expect(mockRepo.searchPosts).toHaveBeenCalledWith(
      expect.objectContaining({
        page: 1,
      })
    );
  });

  it('should cap perPage to 100', async () => {
    const mockRepo = createMockRepository();
    const useCase = createSearchPostsUseCase(mockRepo);

    await useCase.execute({ query: 'test', perPage: 500 });

    expect(mockRepo.searchPosts).toHaveBeenCalledWith(
      expect.objectContaining({
        perPage: 100,
      })
    );
  });
});
