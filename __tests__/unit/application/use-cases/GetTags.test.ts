import type { ApiResponse, Tag } from '@/domain/entities';
import type { ITagRepository } from '@/domain/repositories';

import { createGetTagsUseCase } from '@/application/use-cases/tags';

describe('GetTags Use Case', () => {
  const mockTags: Tag[] = [
    {
      id: 1,
      name: 'TypeScript',
      slug: 'typescript',
      post_count: 10,
      created_at: '2024-01-01T00:00:00Z',
    },
    {
      id: 2,
      name: 'React',
      slug: 'react',
      post_count: 8,
      created_at: '2024-01-02T00:00:00Z',
    },
    {
      id: 3,
      name: 'Next.js',
      slug: 'nextjs',
      post_count: 5,
      created_at: '2024-01-03T00:00:00Z',
    },
  ];

  const mockResponse: ApiResponse<Tag[]> = {
    data: mockTags,
  };

  const createMockRepository = (): ITagRepository => ({
    getTags: jest.fn().mockResolvedValue(mockResponse),
  });

  it('should call repository to get tags', async () => {
    const mockRepo = createMockRepository();
    const useCase = createGetTagsUseCase(mockRepo);

    const result = await useCase.execute();

    expect(mockRepo.getTags).toHaveBeenCalled();
    expect(result).toEqual(mockResponse);
  });

  it('should return tags list', async () => {
    const mockRepo = createMockRepository();
    const useCase = createGetTagsUseCase(mockRepo);

    const result = await useCase.execute();

    expect(result.data).toHaveLength(3);
    expect(result.data[0].name).toBe('TypeScript');
    expect(result.data[1].name).toBe('React');
    expect(result.data[2].name).toBe('Next.js');
  });

  it('should return tags with post counts', async () => {
    const mockRepo = createMockRepository();
    const useCase = createGetTagsUseCase(mockRepo);

    const result = await useCase.execute();

    expect(result.data[0].post_count).toBe(10);
    expect(result.data[1].post_count).toBe(8);
    expect(result.data[2].post_count).toBe(5);
  });
});
