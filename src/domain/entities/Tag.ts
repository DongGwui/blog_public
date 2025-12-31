/**
 * Tag Entity
 * 블로그 태그를 나타내는 도메인 엔티티
 */

export interface Tag {
  id: number;
  name: string;
  slug: string;
  post_count: number;
  created_at: string;
}

/**
 * Tag 엔티티 유효성 검증
 */
export function isValidTag(tag: unknown): tag is Tag {
  if (!tag || typeof tag !== 'object') return false;

  const t = tag as Record<string, unknown>;

  return (
    typeof t.id === 'number' &&
    typeof t.name === 'string' &&
    typeof t.slug === 'string' &&
    typeof t.post_count === 'number'
  );
}
