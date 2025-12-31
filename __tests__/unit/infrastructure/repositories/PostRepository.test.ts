import type { ApiResponse, PostListItem, Post } from '@/domain/entities';
import type { ApiClient } from '@/infrastructure/api/ApiClient';

import { createPostRepository } from '@/infrastructure/repositories/PostRepository';

describe('PostRepository', () => {
  const mockPostList: PostListItem[] = [
    {
      id: 1,
      title: 'Test Post',
      slug: 'test-post',
      excerpt: 'Test excerpt',
      category_id: 1,
      category_name: 'Development',
      category_slug: 'development',
      status: 'published',
      view_count: 100,
      reading_time: 5,
      thumbnail: null,
      tags: [],
      created_at: '2024-01-15T00:00:00Z',
      published_at: '2024-01-15T00:00:00Z',
    },
  ];

  const mockPost: Post = {
    ...mockPostList[0],
    content: '<p>Test content</p>',
    prev_post: null,
    next_post: null,
    updated_at: null,
  };

  const createMockApiClient = (): jest.Mocked<ApiClient> => ({
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
  });

  describe('getPosts', () => {
    it('should call API with correct path', async () => {
      const mockApiClient = createMockApiClient();
      const mockResponse: ApiResponse<PostListItem[]> = { data: mockPostList };
      mockApiClient.get.mockResolvedValue(mockResponse);

      const repository = createPostRepository(mockApiClient);
      const result = await repository.getPosts();

      expect(mockApiClient.get).toHaveBeenCalledWith('/posts', { params: {} });
      expect(result).toEqual(mockResponse);
    });

    it('should pass pagination params', async () => {
      const mockApiClient = createMockApiClient();
      mockApiClient.get.mockResolvedValue({ data: mockPostList });

      const repository = createPostRepository(mockApiClient);
      await repository.getPosts({ page: 2, perPage: 20 });

      expect(mockApiClient.get).toHaveBeenCalledWith('/posts', {
        params: { page: 2, per_page: 20 },
      });
    });

    it('should pass category filter', async () => {
      const mockApiClient = createMockApiClient();
      mockApiClient.get.mockResolvedValue({ data: mockPostList });

      const repository = createPostRepository(mockApiClient);
      await repository.getPosts({ categoryId: 1 });

      expect(mockApiClient.get).toHaveBeenCalledWith('/posts', {
        params: { category_id: 1 },
      });
    });

    it('should pass tag filter', async () => {
      const mockApiClient = createMockApiClient();
      mockApiClient.get.mockResolvedValue({ data: mockPostList });

      const repository = createPostRepository(mockApiClient);
      await repository.getPosts({ tagId: 5 });

      expect(mockApiClient.get).toHaveBeenCalledWith('/posts', {
        params: { tag_id: 5 },
      });
    });
  });

  describe('getPost', () => {
    it('should call API with correct slug', async () => {
      const mockApiClient = createMockApiClient();
      const mockResponse: ApiResponse<Post> = { data: mockPost };
      mockApiClient.get.mockResolvedValue(mockResponse);

      const repository = createPostRepository(mockApiClient);
      const result = await repository.getPost('test-post');

      expect(mockApiClient.get).toHaveBeenCalledWith('/posts/test-post');
      expect(result).toEqual(mockResponse);
    });
  });

  describe('searchPosts', () => {
    it('should call API with search query', async () => {
      const mockApiClient = createMockApiClient();
      mockApiClient.get.mockResolvedValue({ data: mockPostList });

      const repository = createPostRepository(mockApiClient);
      await repository.searchPosts({ query: 'typescript' });

      expect(mockApiClient.get).toHaveBeenCalledWith('/posts/search', {
        params: { q: 'typescript' },
      });
    });

    it('should pass pagination params with search', async () => {
      const mockApiClient = createMockApiClient();
      mockApiClient.get.mockResolvedValue({ data: mockPostList });

      const repository = createPostRepository(mockApiClient);
      await repository.searchPosts({ query: 'test', page: 2, perPage: 10 });

      expect(mockApiClient.get).toHaveBeenCalledWith('/posts/search', {
        params: { q: 'test', page: 2, per_page: 10 },
      });
    });
  });

  describe('incrementView', () => {
    it('should call POST API for view count', async () => {
      const mockApiClient = createMockApiClient();
      mockApiClient.post.mockResolvedValue({ view_count: 101 });

      const repository = createPostRepository(mockApiClient);
      const result = await repository.incrementView('test-post');

      expect(mockApiClient.post).toHaveBeenCalledWith('/posts/test-post/view');
      expect(result).toEqual({ view_count: 101 });
    });
  });

  describe('getPostsByCategory', () => {
    it('should call API with category slug', async () => {
      const mockApiClient = createMockApiClient();
      mockApiClient.get.mockResolvedValue({ data: mockPostList });

      const repository = createPostRepository(mockApiClient);
      await repository.getPostsByCategory('development');

      expect(mockApiClient.get).toHaveBeenCalledWith('/categories/development/posts', {
        params: {},
      });
    });

    it('should pass pagination params', async () => {
      const mockApiClient = createMockApiClient();
      mockApiClient.get.mockResolvedValue({ data: mockPostList });

      const repository = createPostRepository(mockApiClient);
      await repository.getPostsByCategory('development', { page: 2, perPage: 15 });

      expect(mockApiClient.get).toHaveBeenCalledWith('/categories/development/posts', {
        params: { page: 2, per_page: 15 },
      });
    });
  });

  describe('getPostsByTag', () => {
    it('should call API with tag slug', async () => {
      const mockApiClient = createMockApiClient();
      mockApiClient.get.mockResolvedValue({ data: mockPostList });

      const repository = createPostRepository(mockApiClient);
      await repository.getPostsByTag('typescript');

      expect(mockApiClient.get).toHaveBeenCalledWith('/tags/typescript/posts', {
        params: {},
      });
    });
  });
});
