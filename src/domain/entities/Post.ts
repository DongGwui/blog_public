/**
 * Post Entity
 * 블로그 글을 나타내는 도메인 엔티티
 */

export interface TagBrief {
  id: number;
  name: string;
  slug: string;
}

export interface PostNavItem {
  slug: string;
  title: string;
}

/**
 * 글 목록에서 사용되는 Post 타입 (content 미포함)
 */
export interface PostListItem {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  category_id: number | null;
  category_name: string;
  category_slug: string;
  status: PostStatus;
  view_count: number;
  reading_time: number;
  thumbnail: string | null;
  tags: TagBrief[];
  created_at: string;
  published_at: string | null;
}

/**
 * 글 상세에서 사용되는 Post 타입 (content 포함)
 */
export interface Post extends PostListItem {
  content: string;
  prev_post: PostNavItem | null;
  next_post: PostNavItem | null;
  updated_at: string | null;
}

/**
 * 글 상태
 */
export type PostStatus = 'published' | 'draft';

/**
 * Post 엔티티 유효성 검증
 */
export function isValidPost(post: unknown): post is Post {
  if (!post || typeof post !== 'object') return false;

  const p = post as Record<string, unknown>;

  return (
    typeof p.id === 'number' &&
    typeof p.title === 'string' &&
    typeof p.slug === 'string' &&
    typeof p.content === 'string' &&
    typeof p.excerpt === 'string' &&
    (p.status === 'published' || p.status === 'draft')
  );
}

/**
 * PostListItem 엔티티 유효성 검증
 */
export function isValidPostListItem(post: unknown): post is PostListItem {
  if (!post || typeof post !== 'object') return false;

  const p = post as Record<string, unknown>;

  return (
    typeof p.id === 'number' &&
    typeof p.title === 'string' &&
    typeof p.slug === 'string' &&
    typeof p.excerpt === 'string' &&
    (p.status === 'published' || p.status === 'draft')
  );
}
