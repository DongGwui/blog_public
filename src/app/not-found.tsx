'use client';

/**
 * 404 Not Found Page
 * 페이지를 찾을 수 없을 때 표시되는 페이지
 */

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Home, Search, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-[60vh] flex items-center justify-center animate-fade-in-up">
      <div className="max-w-md mx-auto px-5 text-center">
        {/* 404 Number */}
        <h1 className="font-heading text-8xl md:text-9xl font-bold text-text-primary mb-4">
          404
        </h1>

        {/* Title */}
        <h2 className="font-heading text-2xl md:text-3xl font-semibold text-text-primary mb-4">
          Page Not Found
        </h2>

        {/* Description */}
        <p className="text-text-secondary mb-8">
          요청하신 페이지를 찾을 수 없습니다.
          <br />
          주소를 확인하시거나 아래 링크를 이용해주세요.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-text-primary text-bg-primary font-medium rounded-lg hover:opacity-90 transition-opacity"
          >
            <Home className="w-4 h-4" />
            홈으로 가기
          </Link>
          <Link
            href="/search"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-border-secondary text-text-primary font-medium rounded-lg hover:border-text-primary transition-colors"
          >
            <Search className="w-4 h-4" />
            검색하기
          </Link>
        </div>

        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="mt-6 inline-flex items-center gap-2 text-sm text-text-tertiary hover:text-text-primary transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          이전 페이지로 돌아가기
        </button>
      </div>
    </div>
  );
}
