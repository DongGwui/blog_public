'use client';

/**
 * Header Component
 * 사이트 헤더 (네비게이션 포함)
 */

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { useState, useCallback, useEffect } from 'react';

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

  // 모바일 메뉴 열렸을 때 스크롤 잠금
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // 페이지 이동 시 메뉴 닫기
  useEffect(() => {
    closeMobileMenu();
  }, [pathname, closeMobileMenu]);

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

      {/* Mobile Navigation Overlay */}
      <div
        className={`
          fixed inset-0 bg-black/50 z-40 md:hidden
          transition-opacity duration-300
          ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}
        `}
        onClick={closeMobileMenu}
        aria-hidden="true"
      />

      {/* Mobile Navigation Panel */}
      <div
        className={`
          fixed top-0 right-0 bottom-0 w-72 max-w-[80vw] bg-bg-primary z-50 md:hidden
          transform transition-transform duration-300 ease-out
          ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}
          shadow-2xl
        `}
      >
        {/* Close Button */}
        <div className="flex items-center justify-between h-16 px-5 border-b border-border-primary">
          <span className="font-heading text-lg font-semibold text-text-primary">
            Menu
          </span>
          <button
            type="button"
            onClick={closeMobileMenu}
            className="p-2 text-text-secondary hover:text-text-primary transition-colors"
            aria-label="메뉴 닫기"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="px-4 py-6">
          <ul className="space-y-2">
            {NAV_ITEMS.map((item, index) => (
              <li
                key={item.href}
                className={`
                  transform transition-all duration-300
                  ${isMobileMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'}
                `}
                style={{ transitionDelay: isMobileMenuOpen ? `${index * 50}ms` : '0ms' }}
              >
                <Link
                  href={item.href}
                  onClick={closeMobileMenu}
                  className={`
                    block px-4 py-3 rounded-lg transition-colors
                    ${
                      isActive(item.href)
                        ? 'bg-accent-primary/10 text-accent-primary font-medium'
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

        {/* Theme Toggle in Mobile Menu */}
        <div className="absolute bottom-8 left-4 right-4 px-4 py-3 border-t border-border-primary">
          <div className="flex items-center justify-between">
            <span className="text-sm text-text-secondary">테마</span>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
