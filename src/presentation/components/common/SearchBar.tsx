'use client';

/**
 * SearchBar Component
 * 검색 입력 컴포넌트
 */

import { useState, useCallback, type FormEvent, type ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Search, X } from 'lucide-react';

export interface SearchBarProps {
  placeholder?: string;
  defaultValue?: string;
  onSearch?: (query: string) => void;
  autoFocus?: boolean;
  className?: string;
}

export function SearchBar({
  placeholder = '검색어를 입력하세요...',
  defaultValue = '',
  onSearch,
  autoFocus = false,
  className = '',
}: SearchBarProps) {
  const [query, setQuery] = useState(defaultValue);
  const router = useRouter();

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      const trimmedQuery = query.trim();

      if (onSearch) {
        onSearch(trimmedQuery);
      } else if (trimmedQuery) {
        router.push(`/search?q=${encodeURIComponent(trimmedQuery)}`);
      }
    },
    [query, onSearch, router]
  );

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  }, []);

  const handleClear = useCallback(() => {
    setQuery('');
  }, []);

  return (
    <form onSubmit={handleSubmit} className={`relative ${className}`}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-tertiary" />
        <input
          type="search"
          value={query}
          onChange={handleChange}
          placeholder={placeholder}
          autoFocus={autoFocus}
          className="
            w-full pl-10 pr-10 py-3
            bg-bg-secondary
            border border-border-primary
            rounded-lg
            text-text-primary
            placeholder:text-text-tertiary
            focus:outline-none focus:ring-2 focus:ring-accent-primary focus:border-transparent
            transition-all duration-200
          "
        />
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-text-tertiary hover:text-text-primary transition-colors"
            aria-label="검색어 지우기"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </form>
  );
}
