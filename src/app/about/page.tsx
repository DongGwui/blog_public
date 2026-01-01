/**
 * About Page
 * 소개 페이지
 */

import type { Metadata } from 'next';
import { Mail, Github, Linkedin, Twitter, LucideIcon } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About',
  description: '블로그 소개 및 자기소개',
};

interface SocialLink {
  name: string;
  href: string;
  icon: LucideIcon;
}

function getSocialLinks(): SocialLink[] {
  const links: SocialLink[] = [];

  if (process.env.NEXT_PUBLIC_GITHUB_URL) {
    links.push({
      name: 'GitHub',
      href: process.env.NEXT_PUBLIC_GITHUB_URL,
      icon: Github,
    });
  }

  if (process.env.NEXT_PUBLIC_LINKEDIN_URL) {
    links.push({
      name: 'LinkedIn',
      href: process.env.NEXT_PUBLIC_LINKEDIN_URL,
      icon: Linkedin,
    });
  }

  if (process.env.NEXT_PUBLIC_TWITTER_URL) {
    links.push({
      name: 'Twitter',
      href: process.env.NEXT_PUBLIC_TWITTER_URL,
      icon: Twitter,
    });
  }

  return links;
}

const skills = [
  { category: 'Frontend', items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'] },
  { category: 'Backend', items: ['Node.js', 'Go', 'Kotlin', 'PostgreSQL', 'MongoDB'] },
  { category: 'DevOps', items: ['Docker', 'Kubernetes', 'AWS', 'CI/CD'] },
  { category: 'Tools', items: ['Git', 'VS Code', 'Figma', 'Notion'] },
];

function ContactSection() {
  const email = process.env.NEXT_PUBLIC_EMAIL;
  const socialLinks = getSocialLinks();

  if (!email && socialLinks.length === 0) {
    return null;
  }

  return (
    <section>
      <h2 className="font-heading text-2xl font-semibold text-text-primary mb-6">
        Contact
      </h2>
      <div className="space-y-4">
        {/* Email */}
        {email && (
          <a
            href={`mailto:${email}`}
            className="flex items-center gap-3 text-text-secondary hover:text-accent-primary transition-colors"
          >
            <Mail className="w-5 h-5" />
            <span>{email}</span>
          </a>
        )}

        {/* Social Links */}
        {socialLinks.length > 0 && (
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
        )}
      </div>
    </section>
  );
}

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
              안녕하세요! 저는 서버 개발자입니다.
              새로운 기술을 배우고 복잡한 문제를 구조적으로 해결하는 과정을 즐깁니다.
              이 블로그에서는 실제 개발 경험을 바탕으로 한 기술적 인사이트와 프로젝트 이야기를 공유합니다.
            </p>
            <p>
              웹과 서버 개발을 중심으로 활동하고 있으며, 프론트엔드와 백엔드를 가리지 않고 전체 흐름을 이해하는 개발에 관심이 많습니다.
              Go와 gRPC 기반의 서버 개발, 게임 시스템 설계, SaaS 형태의 웹 서비스 개발 등을 경험했고,
              유지보수성과 확장성을 고려한 설계를 중요하게 생각합니다.
            </p>
            <p>
              개발 외에도 언어 학습(일본어), 새로운 서비스 아이디어 구상, 그리고 기록하고 정리하는 것을 좋아합니다.
              이 공간이 비슷한 고민을 하는 분들께 작은 도움이 되길 바라며, 궁금한 점이 있다면 언제든지 편하게 연락 주세요!
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
        <ContactSection />
      </div>
    </div>
  );
}
