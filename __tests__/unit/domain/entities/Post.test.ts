import {
  isValidPost,
  isValidPostListItem,
  Post,
  PostListItem,
  PostStatus,
} from '@/domain/entities/Post';

describe('Post Entity', () => {
  const validPostListItem: PostListItem = {
    id: 1,
    title: 'Test Post',
    slug: 'test-post',
    excerpt: 'This is a test post excerpt',
    category_id: 1,
    category_name: 'Development',
    category_slug: 'development',
    status: 'published',
    view_count: 100,
    reading_time: 5,
    thumbnail: 'https://example.com/image.jpg',
    thumbnail_sm: 'https://example.com/image_sm.jpg',
    thumbnail_md: 'https://example.com/image_md.jpg',
    tags: [
      { id: 1, name: 'TypeScript', slug: 'typescript' },
      { id: 2, name: 'React', slug: 'react' },
    ],
    created_at: '2024-01-15T09:00:00Z',
    published_at: '2024-01-15T10:00:00Z',
  };

  const validPost: Post = {
    ...validPostListItem,
    content: '# Hello World\n\nThis is the post content.',
    prev_post: { slug: 'previous-post', title: 'Previous Post' },
    next_post: { slug: 'next-post', title: 'Next Post' },
    updated_at: '2024-01-16T12:00:00Z',
  };

  describe('PostListItem type', () => {
    it('should have required properties', () => {
      expect(validPostListItem.id).toBe(1);
      expect(validPostListItem.title).toBe('Test Post');
      expect(validPostListItem.slug).toBe('test-post');
      expect(validPostListItem.status).toBe('published');
    });

    it('should have tags array', () => {
      expect(Array.isArray(validPostListItem.tags)).toBe(true);
      expect(validPostListItem.tags).toHaveLength(2);
      expect(validPostListItem.tags[0].name).toBe('TypeScript');
    });

    it('should allow null for optional fields', () => {
      const postWithNulls: PostListItem = {
        ...validPostListItem,
        category_id: null,
        thumbnail: null,
        published_at: null,
      };
      expect(postWithNulls.category_id).toBeNull();
      expect(postWithNulls.thumbnail).toBeNull();
    });
  });

  describe('Post type', () => {
    it('should extend PostListItem with content', () => {
      expect(validPost.content).toBeDefined();
      expect(validPost.content).toContain('Hello World');
    });

    it('should have navigation properties', () => {
      expect(validPost.prev_post).toBeDefined();
      expect(validPost.next_post).toBeDefined();
      expect(validPost.prev_post?.slug).toBe('previous-post');
    });

    it('should allow null for navigation', () => {
      const postWithoutNav: Post = {
        ...validPost,
        prev_post: null,
        next_post: null,
      };
      expect(postWithoutNav.prev_post).toBeNull();
      expect(postWithoutNav.next_post).toBeNull();
    });
  });

  describe('PostStatus type', () => {
    it('should only allow published or draft', () => {
      const publishedStatus: PostStatus = 'published';
      const draftStatus: PostStatus = 'draft';

      expect(publishedStatus).toBe('published');
      expect(draftStatus).toBe('draft');
    });
  });

  describe('isValidPost', () => {
    it('should return true for valid post', () => {
      expect(isValidPost(validPost)).toBe(true);
    });

    it('should return false for null', () => {
      expect(isValidPost(null)).toBe(false);
    });

    it('should return false for undefined', () => {
      expect(isValidPost(undefined)).toBe(false);
    });

    it('should return false for non-object', () => {
      expect(isValidPost('string')).toBe(false);
      expect(isValidPost(123)).toBe(false);
    });

    it('should return false for missing required fields', () => {
      const invalidPost = { id: 1, title: 'Test' };
      expect(isValidPost(invalidPost)).toBe(false);
    });

    it('should return false for wrong types', () => {
      const invalidPost = {
        ...validPost,
        id: 'not-a-number',
      };
      expect(isValidPost(invalidPost)).toBe(false);
    });

    it('should return false for invalid status', () => {
      const invalidPost = {
        ...validPost,
        status: 'invalid',
      };
      expect(isValidPost(invalidPost)).toBe(false);
    });
  });

  describe('isValidPostListItem', () => {
    it('should return true for valid post list item', () => {
      expect(isValidPostListItem(validPostListItem)).toBe(true);
    });

    it('should return false for invalid data', () => {
      expect(isValidPostListItem(null)).toBe(false);
      expect(isValidPostListItem({})).toBe(false);
    });
  });
});
