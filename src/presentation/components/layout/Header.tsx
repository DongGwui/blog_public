'use client';

/**
 * Header Component
 * 사이트 헤더 (네비게이션 포함)
 */

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { useState, useCallback } from 'react';

import { ThemeToggle } from '@/presentation/components/common';

const NAV_ITEMS = [
  { label: 'Blog', href: '/blog' },
  { label: 'Projects', href: '/projects' },
  { label: 'About', href: '/about' },
];

export function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen((prev) => !prev);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 bg-bg-primary/80 backdrop-blur-md border-b border-border-primary">
      <div className="max-w-5xl mx-auto px-5 md:px-10">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="font-heading text-xl font-semibold text-text-primary hover:text-accent-primary transition-colors"
          >
            Blog
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  relative py-1 text-sm font-medium transition-colors
                  ${isActive(item.href) ? 'text-text-primary' : 'text-text-secondary hover:text-text-primary'}
                `}
              >
                {item.label}
                <span
                  className={`
                    absolute bottom-0 left-0 h-0.5 bg-current transition-all duration-200
                    ${isActive(item.href) ? 'w-full' : 'w-0 group-hover:w-full'}
                  `}
                />
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-2">
            <ThemeToggle />

            {/* Mobile menu button */}
            <button
              type="button"
              onClick={toggleMobileMenu}
              className="md:hidden p-2 text-text-secondary hover:text-text-primary transition-colors"
              aria-label={isMobileMenuOpen ? '메뉴 닫기' : '메뉴 열기'}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-border-primary bg-bg-primary">
          <nav className="max-w-5xl mx-auto px-5 py-4">
            <ul className="space-y-1">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={closeMobileMenu}
                    className={`
                      block px-4 py-3 rounded-lg transition-colors
                      ${
                        isActive(item.href)
                          ? 'bg-bg-secondary text-text-primary font-medium'
                          : 'text-text-secondary hover:bg-bg-secondary hover:text-text-primary'
                      }
                    `}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
}
