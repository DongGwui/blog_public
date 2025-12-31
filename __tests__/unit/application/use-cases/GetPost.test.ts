import type { ApiResponse, Post } from '@/domain/entities';
import type { IPostRepository } from '@/domain/repositories';

import { createGetPostUseCase } from '@/application/use-cases/posts';

describe('GetPost Use Case', () => {
  const mockPost: Post = {
    id: 1,
    title: 'Test Post',
    slug: 'test-post',
    content: '<p>Test content</p>',
    excerpt: 'Test excerpt',
    category_id: 1,
    category_name: 'Development',
    category_slug: 'development',
    status: 'published',
    view_count: 100,
    reading_time: 5,
    thumbnail: null,
    tags: [{ id: 1, name: 'TypeScript', slug: 'typescript' }],
    prev_post: null,
    next_post: { title: 'Next Post', slug: 'next-post' },
    created_at: '2024-01-15T00:00:00Z',
    updated_at: '2024-01-15T00:00:00Z',
    published_at: '2024-01-15T00:00:00Z',
  };

  const mockResponse: ApiResponse<Post> = {
    data: mockPost,
  };

  const createMockRepository = (): IPostRepository => ({
    getPosts: jest.fn(),
    getPost: jest.fn().mockResolvedValue(mockResponse),
    searchPosts: jest.fn(),
    incrementView: jest.fn(),
    getPostsByCategory: jest.fn(),
    getPostsByTag: jest.fn(),
  });

  it('should call repository with slug', async () => {
    const mockRepo = createMockRepository();
    const useCase = createGetPostUseCase(mockRepo);

    const result = await useCase.execute({ slug: 'test-post' });

    expect(mockRepo.getPost).toHaveBeenCalledWith('test-post');
    expect(result).toEqual(mockResponse);
  });

  it('should return post data from repository', async () => {
    const mockRepo = createMockRepository();
    const useCase = createGetPostUseCase(mockRepo);

    const result = await useCase.execute({ slug: 'test-post' });

    expect(result.data).toEqual(mockPost);
    expect(result.data.title).toBe('Test Post');
    expect(result.data.slug).toBe('test-post');
  });

  it('should handle post with navigation links', async () => {
    const mockRepo = createMockRepository();
    const useCase = createGetPostUseCase(mockRepo);

    const result = await useCase.execute({ slug: 'test-post' });

    expect(result.data.prev_post).toBeNull();
    expect(result.data.next_post).toEqual({
      title: 'Next Post',
      slug: 'next-post',
    });
  });

  it('should throw error when slug is empty', async () => {
    const mockRepo = createMockRepository();
    const useCase = createGetPostUseCase(mockRepo);

    await expect(useCase.execute({ slug: '' })).rejects.toThrow('Slug is required');
  });
});
