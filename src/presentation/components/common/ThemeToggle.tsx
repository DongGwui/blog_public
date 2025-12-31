'use client';

/**
 * ThemeToggle Component
 * 다크모드/라이트모드 전환 버튼
 */

import { Sun, Moon } from 'lucide-react';

import { useThemeContext } from '@/presentation/providers/ThemeProvider';

export interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className = '' }: ThemeToggleProps) {
  const { resolvedTheme, toggleTheme } = useThemeContext();
  const isDark = resolvedTheme === 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`
        relative p-2 rounded-lg
        text-text-secondary hover:text-text-primary
        hover:bg-bg-secondary
        transition-all duration-200
        focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary
        ${className}
      `}
      aria-label={isDark ? '라이트 모드로 전환' : '다크 모드로 전환'}
    >
      <div className="relative w-5 h-5">
        <Sun
          className={`
            absolute inset-0 w-5 h-5
            transition-all duration-300
            ${isDark ? 'opacity-0 rotate-90 scale-0' : 'opacity-100 rotate-0 scale-100'}
          `}
        />
        <Moon
          className={`
            absolute inset-0 w-5 h-5
            transition-all duration-300
            ${isDark ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-0'}
          `}
        />
      </div>
    </button>
  );
}
