# App Layer (Next.js App Router)

## 개요

App 레이어는 Next.js 15 App Router를 사용하는 라우팅 및 페이지 계층입니다.
서버 컴포넌트를 기본으로 사용하며, Presentation 레이어의 컴포넌트를 조합하여 페이지를 구성합니다.

## 디렉토리 구조

```
app/
├── layout.tsx          # 루트 레이아웃
├── page.tsx            # 홈페이지 (/)
├── globals.css         # 전역 스타일
├── favicon.ico
└── blog/
    ├── page.tsx        # 블로그 목록 (/blog)
    ├── loading.tsx     # 로딩 UI
    ├── [slug]/
    │   ├── page.tsx    # 글 상세 (/blog/[slug])
    │   └── loading.tsx
    ├── category/
    │   └── [slug]/
    │       └── page.tsx  # 카테고리별 (/blog/category/[slug])
    └── tag/
        └── [slug]/
            └── page.tsx  # 태그별 (/blog/tag/[slug])
```

## 코딩 컨벤션

### 서버 컴포넌트 (기본)

```typescript
/**
 * Blog List Page
 * 블로그 글 목록 페이지
 */

import type { Metadata } from 'next';
import { getApiClient } from '@/infrastructure/api';
import { createPostRepository } from '@/infrastructure/repositories';
import { PostList } from '@/presentation/components/post';

export const metadata: Metadata = {
  title: 'Blog',
  description: '블로그 설명',
};

// 데이터 페칭 함수
async function getPosts(page: number) {
  const apiClient = getApiClient();
  const repository = createPostRepository(apiClient);
  return repository.getPosts({ page, perPage: 10 });
}

// 페이지 컴포넌트 (async 서버 컴포넌트)
export default async function BlogPage({ searchParams }: BlogPageProps) {
  const params = await searchParams;
  const page = parseInt(params.page || '1', 10);
  const { data: posts, meta } = await getPosts(page);

  return (
    <div>
      <PostList posts={posts} />
    </div>
  );
}
```

### 동적 라우트

```typescript
interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function PostDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPost(slug);
  // ...
}
```

### 메타데이터

```typescript
// 정적 메타데이터
export const metadata: Metadata = {
  title: 'Blog',
  description: '설명',
};

// 동적 메타데이터
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);

  return {
    title: post.title,
    description: post.excerpt,
  };
}
```

### Loading UI

```typescript
// loading.tsx
export default function Loading() {
  return <LoadingSkeleton type="post-list" />;
}
```

## 규칙

1. **서버 컴포넌트 기본**: 페이지는 기본적으로 서버 컴포넌트
2. **Metadata API**: SEO를 위해 Metadata export 필수
3. **데이터 페칭**: 서버에서 직접 Repository 호출
4. **Loading UI**: 각 라우트에 loading.tsx 제공
5. **JSDoc 주석**: 페이지 상단에 설명 주석
6. **Params Promise**: Next.js 15에서 params/searchParams는 Promise

## 레이아웃 구조

```typescript
// layout.tsx
import { Header, Footer } from '@/presentation/components/layout';
import { QueryProvider, ThemeProvider } from '@/presentation/providers';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <QueryProvider>
          <ThemeProvider>
            <Header />
            <main>{children}</main>
            <Footer />
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
```

## 스타일링

```typescript
// 페이지 공통 래퍼
<div className="animate-fade-in-up">
  <div className="max-w-3xl mx-auto px-5 md:px-10 py-16">
    {/* 콘텐츠 */}
  </div>
</div>

// 섹션 헤더
<header className="mb-12">
  <h1 className="font-heading text-3xl md:text-4xl font-semibold text-text-primary mb-4">
    제목
  </h1>
  <p className="text-text-secondary">설명</p>
</header>
```

## 라우트 목록

| 경로 | 설명 |
|------|------|
| `/` | 홈페이지 |
| `/blog` | 블로그 목록 |
| `/blog/[slug]` | 글 상세 |
| `/blog/category/[slug]` | 카테고리별 글 |
| `/blog/tag/[slug]` | 태그별 글 |

## 새 페이지 추가 시

1. 적절한 디렉토리에 `page.tsx` 생성
2. Metadata export 추가
3. 서버 컴포넌트로 데이터 페칭
4. Presentation 컴포넌트 조합
5. loading.tsx 추가 (선택적)
