import {
  isValidProject,
  isValidProjectListItem,
  Project,
  ProjectListItem,
} from '@/domain/entities/Project';

describe('Project Entity', () => {
  const validProjectListItem: ProjectListItem = {
    id: 1,
    title: 'Blog Project',
    slug: 'blog-project',
    description: 'A personal blog built with Next.js',
    tech_stack: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    thumbnail: 'https://example.com/thumbnail.jpg',
    thumbnail_sm: 'https://example.com/thumbnail_sm.jpg',
    thumbnail_md: 'https://example.com/thumbnail_md.jpg',
    is_featured: true,
    sort_order: 1,
  };

  const validProject: Project = {
    ...validProjectListItem,
    content: '# Blog Project\n\nDetailed project description.',
    demo_url: 'https://blog.example.com',
    github_url: 'https://github.com/user/blog',
    images: [
      'https://example.com/image1.png',
      'https://example.com/image2.png',
    ],
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-15T00:00:00Z',
  };

  describe('ProjectListItem type', () => {
    it('should have required properties', () => {
      expect(validProjectListItem.id).toBe(1);
      expect(validProjectListItem.title).toBe('Blog Project');
      expect(validProjectListItem.slug).toBe('blog-project');
      expect(validProjectListItem.is_featured).toBe(true);
    });

    it('should have tech_stack array', () => {
      expect(Array.isArray(validProjectListItem.tech_stack)).toBe(true);
      expect(validProjectListItem.tech_stack).toHaveLength(3);
      expect(validProjectListItem.tech_stack).toContain('Next.js');
    });

    it('should allow null for thumbnail', () => {
      const projectWithoutThumbnail: ProjectListItem = {
        ...validProjectListItem,
        thumbnail: null,
      };
      expect(projectWithoutThumbnail.thumbnail).toBeNull();
    });
  });

  describe('Project type', () => {
    it('should extend ProjectListItem with content', () => {
      expect(validProject.content).toBeDefined();
      expect(validProject.content).toContain('Blog Project');
    });

    it('should have URLs and images', () => {
      expect(validProject.demo_url).toBeDefined();
      expect(validProject.github_url).toBeDefined();
      expect(Array.isArray(validProject.images)).toBe(true);
    });

    it('should allow null for URLs', () => {
      const projectWithoutUrls: Project = {
        ...validProject,
        demo_url: null,
        github_url: null,
      };
      expect(projectWithoutUrls.demo_url).toBeNull();
      expect(projectWithoutUrls.github_url).toBeNull();
    });
  });

  describe('isValidProject', () => {
    it('should return true for valid project', () => {
      expect(isValidProject(validProject)).toBe(true);
    });

    it('should return false for null', () => {
      expect(isValidProject(null)).toBe(false);
    });

    it('should return false for undefined', () => {
      expect(isValidProject(undefined)).toBe(false);
    });

    it('should return false for non-object', () => {
      expect(isValidProject('string')).toBe(false);
      expect(isValidProject(123)).toBe(false);
    });

    it('should return false for missing required fields', () => {
      const invalidProject = { id: 1, title: 'Test' };
      expect(isValidProject(invalidProject)).toBe(false);
    });

    it('should return false if tech_stack is not array', () => {
      const invalidProject = {
        ...validProject,
        tech_stack: 'not-an-array',
      };
      expect(isValidProject(invalidProject)).toBe(false);
    });

    it('should return false if images is not array', () => {
      const invalidProject = {
        ...validProject,
        images: 'not-an-array',
      };
      expect(isValidProject(invalidProject)).toBe(false);
    });

    it('should return false if is_featured is not boolean', () => {
      const invalidProject = {
        ...validProject,
        is_featured: 'yes',
      };
      expect(isValidProject(invalidProject)).toBe(false);
    });
  });

  describe('isValidProjectListItem', () => {
    it('should return true for valid project list item', () => {
      expect(isValidProjectListItem(validProjectListItem)).toBe(true);
    });

    it('should return false for invalid data', () => {
      expect(isValidProjectListItem(null)).toBe(false);
      expect(isValidProjectListItem({})).toBe(false);
    });
  });
});
