/**
 * Category Component
 * 카테고리 표시 컴포넌트
 */

import Link from 'next/link';

export interface CategoryBadgeProps {
  name: string;
  slug: string;
  count?: number;
  className?: string;
}

export function CategoryBadge({ name, slug, count, className = '' }: CategoryBadgeProps) {
  return (
    <Link
      href={`/blog/category/${slug}`}
      className={`
        inline-flex items-center gap-1
        text-sm font-medium
        text-accent-primary hover:text-accent-hover
        uppercase tracking-wider
        transition-colors duration-200
        ${className}
      `}
    >
      <span>{name}</span>
      {count !== undefined && (
        <span className="text-text-tertiary font-normal normal-case">({count})</span>
      )}
    </Link>
  );
}

export interface CategoryListProps {
  categories: Array<{ name: string; slug: string; count?: number }>;
  className?: string;
}

export function CategoryList({ categories, className = '' }: CategoryListProps) {
  if (!categories.length) return null;

  return (
    <div className={`flex flex-wrap gap-4 ${className}`}>
      {categories.map((category) => (
        <CategoryBadge key={category.slug} {...category} />
      ))}
    </div>
  );
}
