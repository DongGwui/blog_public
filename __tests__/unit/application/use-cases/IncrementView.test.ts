import type { IPostRepository } from '@/domain/repositories';

import { createIncrementViewUseCase } from '@/application/use-cases/posts';

describe('IncrementView Use Case', () => {
  const createMockRepository = (): IPostRepository => ({
    getPosts: jest.fn(),
    getPost: jest.fn(),
    searchPosts: jest.fn(),
    incrementView: jest.fn().mockResolvedValue({ view_count: 101 }),
    getPostsByCategory: jest.fn(),
    getPostsByTag: jest.fn(),
  });

  it('should call repository with slug', async () => {
    const mockRepo = createMockRepository();
    const useCase = createIncrementViewUseCase(mockRepo);

    await useCase.execute({ slug: 'test-post' });

    expect(mockRepo.incrementView).toHaveBeenCalledWith('test-post');
  });

  it('should call repository with different slug', async () => {
    const mockRepo = createMockRepository();
    const useCase = createIncrementViewUseCase(mockRepo);

    await useCase.execute({ slug: 'another-post' });

    expect(mockRepo.incrementView).toHaveBeenCalledWith('another-post');
  });

  it('should return view count from repository', async () => {
    const mockRepo = createMockRepository();
    (mockRepo.incrementView as jest.Mock).mockResolvedValue({ view_count: 42 });
    const useCase = createIncrementViewUseCase(mockRepo);

    const result = await useCase.execute({ slug: 'test-post' });

    expect(result.viewCount).toBe(42);
  });

  it('should throw error when slug is empty', async () => {
    const mockRepo = createMockRepository();
    const useCase = createIncrementViewUseCase(mockRepo);

    await expect(useCase.execute({ slug: '' })).rejects.toThrow('Slug is required');
  });
});
