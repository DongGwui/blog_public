import { isValidTag, Tag } from '@/domain/entities/Tag';

describe('Tag Entity', () => {
  const validTag: Tag = {
    id: 1,
    name: 'TypeScript',
    slug: 'typescript',
    post_count: 12,
    created_at: '2024-01-01T00:00:00Z',
  };

  describe('Tag type', () => {
    it('should have required properties', () => {
      expect(validTag.id).toBe(1);
      expect(validTag.name).toBe('TypeScript');
      expect(validTag.slug).toBe('typescript');
      expect(validTag.post_count).toBe(12);
    });
  });

  describe('isValidTag', () => {
    it('should return true for valid tag', () => {
      expect(isValidTag(validTag)).toBe(true);
    });

    it('should return false for null', () => {
      expect(isValidTag(null)).toBe(false);
    });

    it('should return false for undefined', () => {
      expect(isValidTag(undefined)).toBe(false);
    });

    it('should return false for non-object', () => {
      expect(isValidTag('string')).toBe(false);
      expect(isValidTag(123)).toBe(false);
    });

    it('should return false for missing required fields', () => {
      const invalidTag = { id: 1, name: 'Test' };
      expect(isValidTag(invalidTag)).toBe(false);
    });

    it('should return false for wrong types', () => {
      const invalidTag = {
        ...validTag,
        id: 'not-a-number',
      };
      expect(isValidTag(invalidTag)).toBe(false);
    });
  });
});
