import { Category, isValidCategory } from '@/domain/entities/Category';

describe('Category Entity', () => {
  const validCategory: Category = {
    id: 1,
    name: 'Development',
    slug: 'development',
    description: 'Development related posts',
    sort_order: 1,
    post_count: 15,
    created_at: '2024-01-01T00:00:00Z',
  };

  describe('Category type', () => {
    it('should have required properties', () => {
      expect(validCategory.id).toBe(1);
      expect(validCategory.name).toBe('Development');
      expect(validCategory.slug).toBe('development');
      expect(validCategory.sort_order).toBe(1);
      expect(validCategory.post_count).toBe(15);
    });

    it('should allow null for description', () => {
      const categoryWithoutDesc: Category = {
        ...validCategory,
        description: null,
      };
      expect(categoryWithoutDesc.description).toBeNull();
    });
  });

  describe('isValidCategory', () => {
    it('should return true for valid category', () => {
      expect(isValidCategory(validCategory)).toBe(true);
    });

    it('should return false for null', () => {
      expect(isValidCategory(null)).toBe(false);
    });

    it('should return false for undefined', () => {
      expect(isValidCategory(undefined)).toBe(false);
    });

    it('should return false for non-object', () => {
      expect(isValidCategory('string')).toBe(false);
      expect(isValidCategory(123)).toBe(false);
    });

    it('should return false for missing required fields', () => {
      const invalidCategory = { id: 1, name: 'Test' };
      expect(isValidCategory(invalidCategory)).toBe(false);
    });

    it('should return false for wrong types', () => {
      const invalidCategory = {
        ...validCategory,
        post_count: 'not-a-number',
      };
      expect(isValidCategory(invalidCategory)).toBe(false);
    });
  });
});
