'use client';

/**
 * PostTOC Component
 * 글 목차 (Table of Contents) 컴포넌트
 */

import { useEffect, useState } from 'react';

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

export interface PostTOCProps {
  content: string;
  className?: string;
}

function extractHeadings(html: string): TOCItem[] {
  // Simple regex to extract h2 and h3 headings
  const headingRegex = /<h([23])[^>]*id="([^"]*)"[^>]*>([^<]*)<\/h[23]>/gi;
  const headings: TOCItem[] = [];
  let match;

  while ((match = headingRegex.exec(html)) !== null) {
    headings.push({
      level: parseInt(match[1], 10),
      id: match[2],
      text: match[3].trim(),
    });
  }

  return headings;
}

export function PostTOC({ content, className = '' }: PostTOCProps) {
  const [activeId, setActiveId] = useState<string>('');
  const [headings, setHeadings] = useState<TOCItem[]>([]);

  useEffect(() => {
    setHeadings(extractHeadings(content));
  }, [content]);

  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-80px 0px -80% 0px',
        threshold: 0,
      }
    );

    headings.forEach((heading) => {
      const element = document.getElementById(heading.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) {
    return null;
  }

  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -100;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <nav className={`${className}`} aria-label="목차">
      <h4 className="text-sm font-semibold text-text-primary mb-4 uppercase tracking-wider">
        목차
      </h4>
      <ul className="space-y-2">
        {headings.map((heading) => (
          <li
            key={heading.id}
            className={heading.level === 3 ? 'ml-4' : ''}
          >
            <button
              onClick={() => handleClick(heading.id)}
              className={`
                text-left text-sm transition-colors w-full
                ${
                  activeId === heading.id
                    ? 'text-accent-primary font-medium'
                    : 'text-text-tertiary hover:text-text-primary'
                }
              `}
            >
              {heading.text}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
