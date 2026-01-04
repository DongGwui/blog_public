import type { ApiResponse, PostListItem } from '@/domain/entities';
import type { IPostRepository } from '@/domain/repositories';

import { createGetPostsUseCase } from '@/application/use-cases/posts';

describe('GetPosts Use Case', () => {
  const mockPosts: PostListItem[] = [
    {
      id: 1,
      title: 'Test Post 1',
      slug: 'test-post-1',
      excerpt: 'Excerpt 1',
      category_id: 1,
      category_name: 'Development',
      category_slug: 'development',
      status: 'published',
      view_count: 100,
      reading_time: 5,
      thumbnail: null,
      thumbnail_sm: null,
      thumbnail_md: null,
      tags: [],
      created_at: '2024-01-15T00:00:00Z',
      published_at: '2024-01-15T00:00:00Z',
    },
    {
      id: 2,
      title: 'Test Post 2',
      slug: 'test-post-2',
      excerpt: 'Excerpt 2',
      category_id: null,
      category_name: '',
      category_slug: '',
      status: 'published',
      view_count: 50,
      reading_time: 3,
      thumbnail: null,
      thumbnail_sm: null,
      thumbnail_md: null,
      tags: [],
      created_at: '2024-01-16T00:00:00Z',
      published_at: '2024-01-16T00:00:00Z',
    },
  ];

  const mockResponse: ApiResponse<PostListItem[]> = {
    data: mockPosts,
    meta: {
      page: 1,
      per_page: 10,
      total: 2,
      total_pages: 1,
    },
  };

  const createMockRepository = (): IPostRepository => ({
    getPosts: jest.fn().mockResolvedValue(mockResponse),
    getPost: jest.fn(),
    searchPosts: jest.fn(),
    incrementView: jest.fn(),
    getPostsByCategory: jest.fn(),
    getPostsByTag: jest.fn(),
  });

  it('should call repository with default pagination', async () => {
    const mockRepo = createMockRepository();
    const useCase = createGetPostsUseCase(mockRepo);

    const result = await useCase.execute();

    expect(mockRepo.getPosts).toHaveBeenCalledWith({
      page: 1,
      perPage: 10,
      categoryId: undefined,
      tagId: undefined,
    });
    expect(result).toEqual(mockResponse);
  });

  it('should call repository with custom pagination', async () => {
    const mockRepo = createMockRepository();
    const useCase = createGetPostsUseCase(mockRepo);

    await useCase.execute({ page: 2, perPage: 20 });

    expect(mockRepo.getPosts).toHaveBeenCalledWith({
      page: 2,
      perPage: 20,
      categoryId: undefined,
      tagId: undefined,
    });
  });

  it('should call repository with category filter', async () => {
    const mockRepo = createMockRepository();
    const useCase = createGetPostsUseCase(mockRepo);

    await useCase.execute({ categoryId: 1 });

    expect(mockRepo.getPosts).toHaveBeenCalledWith({
      page: 1,
      perPage: 10,
      categoryId: 1,
      tagId: undefined,
    });
  });

  it('should call repository with tag filter', async () => {
    const mockRepo = createMockRepository();
    const useCase = createGetPostsUseCase(mockRepo);

    await useCase.execute({ tagId: 5 });

    expect(mockRepo.getPosts).toHaveBeenCalledWith({
      page: 1,
      perPage: 10,
      categoryId: undefined,
      tagId: 5,
    });
  });

  it('should normalize invalid page to 1', async () => {
    const mockRepo = createMockRepository();
    const useCase = createGetPostsUseCase(mockRepo);

    await useCase.execute({ page: -1 });

    expect(mockRepo.getPosts).toHaveBeenCalledWith(
      expect.objectContaining({
        page: 1,
      })
    );
  });

  it('should cap perPage to 100', async () => {
    const mockRepo = createMockRepository();
    const useCase = createGetPostsUseCase(mockRepo);

    await useCase.execute({ perPage: 500 });

    expect(mockRepo.getPosts).toHaveBeenCalledWith(
      expect.objectContaining({
        perPage: 100,
      })
    );
  });
});
