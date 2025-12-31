# Blog Public 프로젝트

## 프로젝트 개요

개인 블로그의 공개 프론트엔드. 방문자가 글을 읽고, 프로젝트를 확인하고, 검색할 수 있는 사이트입니다.

### 핵심 정보

| 항목 | 내용 |
|------|------|
| 프레임워크 | Next.js 14+ (App Router) |
| 언어 | TypeScript |
| 스타일링 | Tailwind CSS |
| 상태 관리 | TanStack Query |
| 댓글 | Giscus (GitHub Discussions) |
| 접근 | Cloudflare Tunnel (공개) |
| 도메인 | blog.dltmxm.link |

### API 연결

```
개발: http://localhost:8080/api/public
프로덕션: https://api.dltmxm.link/api/public
```

> **상세 API 문서**: [API.md](./API.md)

---

## 기술 스택 상세

### 필수 의존성

```json
{
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.0.0",
    "react-dom": "^18.0.0",
    "@tanstack/react-query": "^5.0.0",
    "axios": "^1.6.0",
    "@giscus/react": "^3.0.0",
    "shiki": "^1.0.0",
    "gray-matter": "^4.0.0",
    "reading-time": "^1.5.0"
  },
  "devDependencies": {
    "typescript": "^5.0.0",
    "tailwindcss": "^3.4.0",
    "@types/react": "^18.0.0",
    "@types/node": "^20.0.0"
  }
}
```

---

## 디렉토리 구조

```
blog-public/
├── app/
│   ├── layout.tsx               # 루트 레이아웃
│   ├── page.tsx                 # 홈페이지
│   ├── blog/
│   │   ├── page.tsx             # 글 목록
│   │   ├── [slug]/
│   │   │   └── page.tsx         # 글 상세
│   │   ├── category/
│   │   │   └── [slug]/
│   │   │       └── page.tsx     # 카테고리별 글
│   │   └── tag/
│   │       └── [slug]/
│   │           └── page.tsx     # 태그별 글
│   ├── projects/
│   │   ├── page.tsx             # 프로젝트 목록
│   │   └── [slug]/
│   │       └── page.tsx         # 프로젝트 상세
│   ├── about/
│   │   └── page.tsx             # 자기소개
│   ├── search/
│   │   └── page.tsx             # 검색 결과
│   └── not-found.tsx            # 404 페이지
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── Navigation.tsx
│   ├── post/
│   │   ├── PostCard.tsx         # 글 카드 (목록용)
│   │   ├── PostContent.tsx      # 글 본문 (마크다운)
│   │   ├── PostHeader.tsx       # 글 헤더 (제목, 날짜)
│   │   ├── PostTOC.tsx          # 목차
│   │   └── PostNav.tsx          # 이전/다음 글
│   ├── project/
│   │   ├── ProjectCard.tsx
│   │   └── TechStack.tsx
│   ├── common/
│   │   ├── Pagination.tsx
│   │   ├── SearchBar.tsx
│   │   ├── Tag.tsx
│   │   ├── Category.tsx
│   │   ├── ThemeToggle.tsx
│   │   └── LoadingSkeleton.tsx
│   └── Comments.tsx             # Giscus 래퍼
├── lib/
│   ├── api.ts                   # API 클라이언트
│   ├── queries.ts               # TanStack Query 훅
│   └── utils.ts                 # 유틸리티 함수
├── styles/
│   └── globals.css              # 전역 스타일
├── types/
│   └── index.ts                 # 타입 정의
├── hooks/
│   └── useTheme.ts              # 다크모드 훅
├── public/
│   └── ...                      # 정적 파일
├── docs/
│   ├── SPEC.md
│   ├── TASKS.md
│   ├── PAGES.md
│   └── COMPONENTS.md
├── Dockerfile
├── docker-compose.dev.yml
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
└── package.json
```

---

## 페이지 구조

| 경로 | 페이지 | 데이터 |
|------|--------|--------|
| `/` | 홈 | 최근 글 5개, 대표 프로젝트 |
| `/blog` | 글 목록 | 페이지네이션, 10개/페이지 |
| `/blog/[slug]` | 글 상세 | SSG + ISR |
| `/blog/category/[slug]` | 카테고리별 | 필터링된 목록 |
| `/blog/tag/[slug]` | 태그별 | 필터링된 목록 |
| `/projects` | 프로젝트 목록 | 정렬된 목록 |
| `/projects/[slug]` | 프로젝트 상세 | 상세 정보 |
| `/about` | 자기소개 | 정적 또는 API |
| `/search` | 검색 결과 | 쿼리 파라미터 |

---

## 주요 기능

### 글 목록
- 페이지네이션 (10개/페이지)
- 카테고리/태그 필터링
- 썸네일, 제목, 요약, 날짜 표시
- 읽기 시간 표시

### 글 상세
- 마크다운 렌더링
- 코드 하이라이팅 (Shiki)
- 목차 자동 생성 (TOC)
- 이전/다음 글 네비게이션
- Giscus 댓글
- 조회수 표시

### 검색
- 제목 + 본문 검색
- 결과 페이지네이션

### UI/UX
- 다크모드 / 라이트모드
- 반응형 디자인
- 로딩 스켈레톤
- SEO 최적화 (메타 태그, OG 이미지)

---

## API 연동

> **상세 API 문서**: [API.md](./API.md)

### 사용 가능한 Public API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/posts` | GET | 글 목록 (페이지네이션, 카테고리/태그 필터) |
| `/posts/{slug}` | GET | 글 상세 (이전/다음 글 포함) |
| `/posts/search` | GET | 글 검색 |
| `/posts/{slug}/view` | POST | 조회수 증가 |
| `/categories` | GET | 카테고리 목록 |
| `/categories/{slug}/posts` | GET | 카테고리별 글 목록 |
| `/tags` | GET | 태그 목록 |
| `/tags/{slug}/posts` | GET | 태그별 글 목록 |
| `/projects` | GET | 프로젝트 목록 |
| `/projects/{slug}` | GET | 프로젝트 상세 |

### API 클라이언트 예시

```typescript
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api/public',
});

// 글 목록 (카테고리/태그는 ID로 필터링)
export const getPosts = (page = 1, category?: number, tag?: number) =>
  api.get('/posts', { params: { page, per_page: 10, category, tag } });

// 글 상세
export const getPost = (slug: string) =>
  api.get(`/posts/${slug}`);

// 글 검색
export const searchPosts = (q: string, page = 1) =>
  api.get('/posts/search', { params: { q, page } });

// 조회수 증가
export const incrementView = (slug: string) =>
  api.post(`/posts/${slug}/view`);

// 카테고리 목록
export const getCategories = () =>
  api.get('/categories');

// 카테고리별 글 목록
export const getPostsByCategory = (slug: string, page = 1) =>
  api.get(`/categories/${slug}/posts`, { params: { page } });

// 태그 목록
export const getTags = () =>
  api.get('/tags');

// 태그별 글 목록
export const getPostsByTag = (slug: string, page = 1) =>
  api.get(`/tags/${slug}/posts`, { params: { page } });

// 프로젝트 목록 (featured 필터 가능)
export const getProjects = (featured?: boolean) =>
  api.get('/projects', { params: featured ? { featured: true } : {} });

// 프로젝트 상세
export const getProject = (slug: string) =>
  api.get(`/projects/${slug}`);
```

---

## 타입 정의 (types/index.ts)

```typescript
export interface Post {
  id: number;
  title: string;
  slug: string;
  content?: string;
  excerpt: string;
  category: Category | null;
  tags: Tag[];
  thumbnail: string | null;
  view_count: number;
  reading_time: number;
  published_at: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  post_count?: number;
}

export interface Tag {
  id: number;
  name: string;
  slug: string;
  post_count?: number;
}

export interface Project {
  id: number;
  title: string;
  slug: string;
  description: string;
  content?: string;
  tech_stack: string[];
  demo_url: string | null;
  github_url: string | null;
  thumbnail: string | null;
  images: string[];
  is_featured: boolean;
}

export interface PaginationMeta {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
}

export interface ApiResponse<T> {
  data: T;
  meta?: PaginationMeta;
}
```

---

## Giscus 댓글 설정

### 사전 준비
1. GitHub 저장소에 Discussions 활성화
2. giscus.app에서 설정 생성

### 컴포넌트 (components/Comments.tsx)

```tsx
'use client';

import Giscus from '@giscus/react';
import { useTheme } from '@/hooks/useTheme';

export default function Comments() {
  const { theme } = useTheme();
  
  return (
    <Giscus
      repo="USERNAME/REPO"
      repoId="R_xxxxxxxxxx"
      category="Comments"
      categoryId="DIC_xxxxxxxxxx"
      mapping="pathname"
      reactionsEnabled="1"
      emitMetadata="0"
      inputPosition="top"
      theme={theme === 'dark' ? 'dark' : 'light'}
      lang="ko"
      loading="lazy"
    />
  );
}
```

---

## 환경 변수

```bash
# .env.local
NEXT_PUBLIC_API_URL=http://localhost:8080/api/public
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

---

## 개발 환경 실행

```bash
# 의존성 설치
npm install

# 개발 서버
npm run dev

# 빌드
npm run build

# 프로덕션 실행
npm start
```

### 확인
```
http://localhost:3000
```

---

## SEO 설정

### 메타데이터 (app/layout.tsx)

```tsx
export const metadata: Metadata = {
  title: {
    default: '블로그 이름',
    template: '%s | 블로그 이름',
  },
  description: '개발 블로그 설명',
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: 'https://blog.dltmxm.link',
    siteName: '블로그 이름',
  },
};
```

### 동적 메타데이터 (글 상세)

```tsx
export async function generateMetadata({ params }): Promise<Metadata> {
  const post = await getPost(params.slug);
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.thumbnail ? [post.thumbnail] : [],
    },
  };
}
```

---

## 참고 문서

| 파일 | 내용 |
|------|------|
| docs/SPEC.md | 상세 사양서 |
| docs/TASKS.md | 작업 체크리스트 |
| docs/PAGES.md | 페이지별 상세 명세 |
| docs/COMPONENTS.md | 컴포넌트 명세 |
