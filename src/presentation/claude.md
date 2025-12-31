# Presentation Layer

## 개요

Presentation 레이어는 UI 컴포넌트, React 훅, Provider를 담당합니다.
사용자 인터페이스와 상태 관리를 처리하며, Infrastructure 레이어와 연결됩니다.

## 디렉토리 구조

```
presentation/
├── components/     # React 컴포넌트
│   ├── common/     # 공통 UI 컴포넌트
│   │   ├── ThemeToggle.tsx
│   │   ├── Pagination.tsx
│   │   ├── Tag.tsx
│   │   ├── Category.tsx
│   │   ├── SearchBar.tsx
│   │   ├── LoadingSkeleton.tsx
│   │   └── index.ts
│   ├── layout/     # 레이아웃 컴포넌트
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── index.ts
│   └── post/       # 포스트 관련 컴포넌트
│       ├── PostCard.tsx
│       ├── PostHeader.tsx
│       ├── PostContent.tsx
│       ├── PostTOC.tsx
│       ├── PostNav.tsx
│       └── index.ts
├── hooks/          # 커스텀 훅
│   ├── queries/    # TanStack Query 훅
│   │   ├── usePosts.ts
│   │   ├── usePost.ts
│   │   ├── useSearch.ts
│   │   ├── useProjects.ts
│   │   ├── useCategories.ts
│   │   ├── useTags.ts
│   │   └── index.ts
│   ├── useTheme.ts
│   └── index.ts
└── providers/      # Context Provider
    ├── QueryProvider.tsx
    ├── ThemeProvider.tsx
    └── index.ts
```

## 코딩 컨벤션

### 컴포넌트

```typescript
/**
 * PostCard Component
 * 글 목록에서 사용되는 카드 컴포넌트
 */

import type { PostListItem } from '@/domain/entities';

export interface PostCardProps {
  post: PostListItem;
  className?: string;
}

export function PostCard({ post, className = '' }: PostCardProps) {
  return (
    <article className={`py-8 border-b border-border-primary ${className}`}>
      {/* ... */}
    </article>
  );
}
```

### TanStack Query 훅

```typescript
'use client';

import { useQuery } from '@tanstack/react-query';
import { getApiClient } from '@/infrastructure/api';
import { createPostRepository } from '@/infrastructure/repositories';

// Query Key 팩토리
export const postsKeys = {
  all: ['posts'] as const,
  lists: () => [...postsKeys.all, 'list'] as const,
  list: (params?: GetPostsParams) => [...postsKeys.lists(), params] as const,
  detail: (slug: string) => [...postsKeys.all, 'detail', slug] as const,
};

export function usePosts(options: UsePostsOptions = {}) {
  return useQuery({
    queryKey: postsKeys.list(params),
    queryFn: async () => {
      const apiClient = getApiClient();
      const repository = createPostRepository(apiClient);
      return repository.getPosts(params);
    },
    enabled: options.enabled ?? true,
  });
}
```

## 스타일링 규칙

### Tailwind CSS 사용

```typescript
// 디자인 시스템 변수 사용
<div className="text-text-primary bg-bg-primary border-border-primary">

// 반응형 디자인
<h1 className="text-3xl md:text-4xl">

// 애니메이션
<div className="animate-fade-in-up animation-delay-100">
```

### 색상 변수

| 변수 | 용도 |
|------|------|
| `text-primary` | 기본 텍스트 |
| `text-secondary` | 보조 텍스트 |
| `text-tertiary` | 부가 텍스트 |
| `bg-primary` | 기본 배경 |
| `bg-secondary` | 보조 배경 |
| `border-primary` | 기본 테두리 |
| `accent-primary` | 강조 색상 |

## 규칙

1. **클라이언트 컴포넌트**: 훅 사용 시 `'use client'` 지시어 필수
2. **Props 인터페이스**: 컴포넌트마다 `*Props` 인터페이스 정의
3. **className 지원**: 모든 컴포넌트에 `className` prop 지원
4. **Query Key 팩토리**: 일관된 캐시 관리를 위해 팩토리 패턴 사용
5. **lucide-react**: 아이콘은 lucide-react 라이브러리 사용
6. **한글 메시지**: 사용자 메시지는 한글로 작성

## 새 컴포넌트 추가 시

1. 적절한 디렉토리에 파일 생성 (common/layout/post 등)
2. Props 인터페이스 정의
3. JSDoc 주석 추가
4. `index.ts`에서 export

## 새 훅 추가 시

1. `hooks/queries/` 에 파일 생성
2. Query Key 팩토리 정의
3. Options 인터페이스 정의
4. `'use client'` 지시어 추가
5. `index.ts`에서 export
