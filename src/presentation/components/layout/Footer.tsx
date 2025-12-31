/**
 * Footer Component
 * 사이트 푸터
 */

import Link from 'next/link';
import { Github, Mail } from 'lucide-react';

const SOCIAL_LINKS = [
  {
    label: 'GitHub',
    href: 'https://github.com',
    icon: Github,
  },
  {
    label: 'Email',
    href: 'mailto:contact@example.com',
    icon: Mail,
  },
];

const FOOTER_LINKS = [
  { label: 'Blog', href: '/blog' },
  { label: 'Projects', href: '/projects' },
  { label: 'About', href: '/about' },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border-primary bg-bg-primary">
      <div className="max-w-5xl mx-auto px-5 md:px-10 py-12">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          {/* Links */}
          <nav className="flex flex-wrap gap-6">
            {FOOTER_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-text-secondary hover:text-text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {SOCIAL_LINKS.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-text-tertiary hover:text-text-primary transition-colors"
                aria-label={social.label}
              >
                <social.icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-border-primary">
          <p className="text-sm text-text-tertiary text-center">
            &copy; {currentYear} Blog. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
