/**
 * Category Entity
 * 블로그 카테고리를 나타내는 도메인 엔티티
 */

export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  sort_order: number;
  post_count: number;
  created_at: string;
}

/**
 * Category 엔티티 유효성 검증
 */
export function isValidCategory(category: unknown): category is Category {
  if (!category || typeof category !== 'object') return false;

  const c = category as Record<string, unknown>;

  return (
    typeof c.id === 'number' &&
    typeof c.name === 'string' &&
    typeof c.slug === 'string' &&
    typeof c.sort_order === 'number' &&
    typeof c.post_count === 'number'
  );
}
