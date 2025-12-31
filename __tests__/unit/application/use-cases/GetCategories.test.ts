import type { ApiResponse, Category } from '@/domain/entities';
import type { ICategoryRepository } from '@/domain/repositories';

import { createGetCategoriesUseCase } from '@/application/use-cases/categories';

describe('GetCategories Use Case', () => {
  const mockCategories: Category[] = [
    {
      id: 1,
      name: 'Development',
      slug: 'development',
      description: 'Programming and development topics',
      sort_order: 1,
      post_count: 15,
      created_at: '2024-01-01T00:00:00Z',
    },
    {
      id: 2,
      name: 'Design',
      slug: 'design',
      description: 'Design and UX topics',
      sort_order: 2,
      post_count: 8,
      created_at: '2024-01-02T00:00:00Z',
    },
  ];

  const mockResponse: ApiResponse<Category[]> = {
    data: mockCategories,
  };

  const createMockRepository = (): ICategoryRepository => ({
    getCategories: jest.fn().mockResolvedValue(mockResponse),
  });

  it('should call repository to get categories', async () => {
    const mockRepo = createMockRepository();
    const useCase = createGetCategoriesUseCase(mockRepo);

    const result = await useCase.execute();

    expect(mockRepo.getCategories).toHaveBeenCalled();
    expect(result).toEqual(mockResponse);
  });

  it('should return categories list', async () => {
    const mockRepo = createMockRepository();
    const useCase = createGetCategoriesUseCase(mockRepo);

    const result = await useCase.execute();

    expect(result.data).toHaveLength(2);
    expect(result.data[0].name).toBe('Development');
    expect(result.data[1].name).toBe('Design');
  });

  it('should return categories with post counts', async () => {
    const mockRepo = createMockRepository();
    const useCase = createGetCategoriesUseCase(mockRepo);

    const result = await useCase.execute();

    expect(result.data[0].post_count).toBe(15);
    expect(result.data[1].post_count).toBe(8);
  });

  it('should return categories with sort order', async () => {
    const mockRepo = createMockRepository();
    const useCase = createGetCategoriesUseCase(mockRepo);

    const result = await useCase.execute();

    expect(result.data[0].sort_order).toBe(1);
    expect(result.data[1].sort_order).toBe(2);
  });
});
