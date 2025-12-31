/**
 * Tag Component
 * 태그 표시 컴포넌트
 */

import Link from 'next/link';

export interface TagProps {
  name: string;
  slug: string;
  count?: number;
  size?: 'sm' | 'md';
  className?: string;
}

export function Tag({ name, slug, count, size = 'sm', className = '' }: TagProps) {
  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-3 py-1',
  };

  return (
    <Link
      href={`/blog/tag/${slug}`}
      className={`
        inline-flex items-center gap-1
        text-text-tertiary hover:text-text-primary
        transition-colors duration-200
        ${sizeClasses[size]}
        ${className}
      `}
    >
      <span>#</span>
      <span>{name}</span>
      {count !== undefined && (
        <span className="text-text-tertiary">({count})</span>
      )}
    </Link>
  );
}

export interface TagListProps {
  tags: Array<{ name: string; slug: string; count?: number }>;
  size?: 'sm' | 'md';
  className?: string;
}

export function TagList({ tags, size = 'sm', className = '' }: TagListProps) {
  if (!tags.length) return null;

  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {tags.map((tag) => (
        <Tag key={tag.slug} {...tag} size={size} />
      ))}
    </div>
  );
}
