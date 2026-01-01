/**
 * About Page
 * 소개 페이지
 */

import type { Metadata } from 'next';
import { Mail, Github, Linkedin, Twitter } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About',
  description: '블로그 소개 및 자기소개',
};

const socialLinks = [
  {
    name: 'GitHub',
    href: 'https://github.com',
    icon: Github,
  },
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com',
    icon: Linkedin,
  },
  {
    name: 'Twitter',
    href: 'https://twitter.com',
    icon: Twitter,
  },
];

const skills = [
  { category: 'Frontend', items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'] },
  { category: 'Backend', items: ['Node.js', 'Python', 'Go', 'PostgreSQL'] },
  { category: 'DevOps', items: ['Docker', 'Kubernetes', 'AWS', 'CI/CD'] },
  { category: 'Tools', items: ['Git', 'VS Code', 'Figma', 'Notion'] },
];

export default function AboutPage() {
  return (
    <div className="animate-fade-in-up">
      <div className="max-w-3xl mx-auto px-5 md:px-10 py-16">
        {/* Header */}
        <header className="mb-12">
          <h1 className="font-heading text-3xl md:text-4xl font-semibold text-text-primary mb-4">
            About Me
          </h1>
          <p className="text-text-secondary">
            반갑습니다! 저에 대해 간략히 소개합니다.
          </p>
        </header>

        {/* Bio Section */}
        <section className="mb-16">
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p>
              안녕하세요! 저는 소프트웨어 개발자입니다. 새로운 기술을 배우고
              문제를 해결하는 것을 좋아합니다. 이 블로그에서는 개발 경험,
              기술적 인사이트, 그리고 프로젝트에 대한 이야기를 공유합니다.
            </p>
            <p>
              주로 웹 개발 분야에서 활동하며, 프론트엔드와 백엔드 모두에
              관심을 가지고 있습니다. 깔끔하고 유지보수 가능한 코드를 작성하는
              것을 중요하게 생각합니다.
            </p>
            <p>
              개발 외에도 독서, 여행, 그리고 새로운 것을 배우는 것을 즐깁니다.
              궁금한 점이 있으시면 언제든지 연락주세요!
            </p>
          </div>
        </section>

        {/* Skills Section */}
        <section className="mb-16">
          <h2 className="font-heading text-2xl font-semibold text-text-primary mb-6">
            Skills
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {skills.map((skillGroup) => (
              <div key={skillGroup.category}>
                <h3 className="text-sm font-medium text-text-tertiary uppercase tracking-wider mb-3">
                  {skillGroup.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skillGroup.items.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 text-sm bg-bg-secondary text-text-secondary rounded-lg border border-border-primary"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section>
          <h2 className="font-heading text-2xl font-semibold text-text-primary mb-6">
            Contact
          </h2>
          <div className="space-y-4">
            {/* Email */}
            <a
              href="mailto:hello@example.com"
              className="flex items-center gap-3 text-text-secondary hover:text-accent-primary transition-colors"
            >
              <Mail className="w-5 h-5" />
              <span>hello@example.com</span>
            </a>

            {/* Social Links */}
            <div className="flex gap-4 pt-4">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-text-secondary hover:text-accent-primary transition-colors"
                  aria-label={link.name}
                >
                  <link.icon className="w-6 h-6" />
                </a>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
