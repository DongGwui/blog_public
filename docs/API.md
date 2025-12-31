# Blog Public API Documentation

## Overview

Blog Public 프론트엔드에서 사용하는 백엔드 API 문서입니다.

### Base URL
```
Development: http://localhost:8080/api/public
Production:  https://api.dltmxm.link/api/public
```

### Tech Stack
- **Framework**: Go (Gin)
- **Database**: PostgreSQL 16
- **Cache**: Redis 7
- **Storage**: MinIO (이미지)

---

## Response Format

### Success Response
```json
{
  "data": { ... },
  "meta": {
    "page": 1,
    "per_page": 10,
    "total": 45,
    "total_pages": 5
  }
}
```

- `data`: 응답 데이터 (단일 객체 또는 배열)
- `meta`: 페이지네이션 정보 (목록 API에서만 포함)

### Error Response
```json
{
  "error": {
    "code": "NOT_FOUND",
    "message": "Post not found"
  }
}
```

### Error Codes
| Code | HTTP Status | Description |
|------|-------------|-------------|
| `BAD_REQUEST` | 400 | 잘못된 요청 파라미터 |
| `NOT_FOUND` | 404 | 리소스를 찾을 수 없음 |
| `VALIDATION_ERROR` | 422 | 유효성 검증 실패 |
| `INTERNAL_ERROR` | 500 | 서버 내부 오류 |

---

## Pagination

### Query Parameters
| Parameter | Type | Default | Max | Description |
|-----------|------|---------|-----|-------------|
| `page` | int | 1 | - | 페이지 번호 |
| `per_page` | int | 10 | 100 | 페이지당 항목 수 |

### Response Meta
```typescript
interface PaginationMeta {
  page: number;       // 현재 페이지
  per_page: number;   // 페이지당 항목 수
  total: number;      // 전체 항목 수
  total_pages: number; // 전체 페이지 수
}
```

---

## Endpoints

---

## Posts (글)

### GET /posts
글 목록 조회 (published 상태만)

**Query Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `page` | int | No | 페이지 번호 (default: 1) |
| `per_page` | int | No | 페이지당 항목 수 (default: 10, max: 100) |
| `category` | int | No | 카테고리 ID로 필터링 |
| `tag` | int | No | 태그 ID로 필터링 |

**Response:**
```json
{
  "data": [
    {
      "id": 1,
      "title": "글 제목",
      "slug": "post-slug",
      "excerpt": "글 요약...",
      "category_id": 1,
      "category_name": "Development",
      "category_slug": "development",
      "status": "published",
      "view_count": 150,
      "reading_time": 5,
      "thumbnail": "https://...",
      "tags": [
        { "id": 1, "name": "TypeScript", "slug": "typescript" },
        { "id": 2, "name": "React", "slug": "react" }
      ],
      "created_at": "2024-01-15T09:00:00Z",
      "published_at": "2024-01-15T10:00:00Z"
    }
  ],
  "meta": {
    "page": 1,
    "per_page": 10,
    "total": 45,
    "total_pages": 5
  }
}
```

---

### GET /posts/{slug}
글 상세 조회

**Path Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `slug` | string | 글의 URL slug |

**Response:**
```json
{
  "data": {
    "id": 1,
    "title": "글 제목",
    "slug": "post-slug",
    "content": "# Markdown Content\n\n글 본문...",
    "excerpt": "글 요약...",
    "category_id": 1,
    "category_name": "Development",
    "category_slug": "development",
    "status": "published",
    "view_count": 150,
    "reading_time": 5,
    "thumbnail": "https://...",
    "tags": [
      { "id": 1, "name": "TypeScript", "slug": "typescript" }
    ],
    "prev_post": {
      "slug": "previous-post",
      "title": "이전 글 제목"
    },
    "next_post": {
      "slug": "next-post",
      "title": "다음 글 제목"
    },
    "created_at": "2024-01-15T09:00:00Z",
    "published_at": "2024-01-15T10:00:00Z",
    "updated_at": "2024-01-16T12:00:00Z"
  }
}
```

**Error:**
- `404 NOT_FOUND`: 글을 찾을 수 없음

---

### GET /posts/search
글 검색

**Query Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `q` | string | **Yes** | 검색어 (제목, 본문 검색) |
| `page` | int | No | 페이지 번호 |
| `per_page` | int | No | 페이지당 항목 수 |

**Response:** `/posts`와 동일한 형식

**Error:**
- `400 BAD_REQUEST`: `q` 파라미터 누락

---

### POST /posts/{slug}/view
글 조회수 증가

**Path Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `slug` | string | 글의 URL slug |

**Note:**
- IP 기반 중복 방지 (Redis 사용)
- 같은 IP에서 일정 시간 내 중복 요청 시 조회수 증가하지 않음

**Response:**
```json
{
  "data": {
    "view_count": 151
  }
}
```

---

## Categories (카테고리)

### GET /categories
카테고리 목록 조회

**Response:**
```json
{
  "data": [
    {
      "id": 1,
      "name": "Development",
      "slug": "development",
      "description": "개발 관련 글",
      "sort_order": 1,
      "post_count": 15,
      "created_at": "2024-01-01T00:00:00Z"
    },
    {
      "id": 2,
      "name": "DevOps",
      "slug": "devops",
      "description": null,
      "sort_order": 2,
      "post_count": 8,
      "created_at": "2024-01-01T00:00:00Z"
    }
  ]
}
```

---

### GET /categories/{slug}/posts
특정 카테고리의 글 목록 조회

**Path Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `slug` | string | 카테고리 slug |

**Query Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `page` | int | No | 페이지 번호 |
| `per_page` | int | No | 페이지당 항목 수 |

**Response:** `/posts`와 동일한 형식

**Error:**
- `404 NOT_FOUND`: 카테고리를 찾을 수 없음

---

## Tags (태그)

### GET /tags
태그 목록 조회

**Response:**
```json
{
  "data": [
    {
      "id": 1,
      "name": "TypeScript",
      "slug": "typescript",
      "post_count": 12,
      "created_at": "2024-01-01T00:00:00Z"
    },
    {
      "id": 2,
      "name": "React",
      "slug": "react",
      "post_count": 8,
      "created_at": "2024-01-01T00:00:00Z"
    }
  ]
}
```

---

### GET /tags/{slug}/posts
특정 태그의 글 목록 조회

**Path Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `slug` | string | 태그 slug |

**Query Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `page` | int | No | 페이지 번호 |
| `per_page` | int | No | 페이지당 항목 수 |

**Response:** `/posts`와 동일한 형식

**Error:**
- `404 NOT_FOUND`: 태그를 찾을 수 없음

---

## Projects (프로젝트)

### GET /projects
프로젝트 목록 조회

**Query Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `featured` | bool | No | `true`면 featured 프로젝트만 조회 |

**Response:**
```json
{
  "data": [
    {
      "id": 1,
      "title": "프로젝트 이름",
      "slug": "project-slug",
      "description": "프로젝트 간단 설명",
      "tech_stack": ["Go", "React", "PostgreSQL"],
      "thumbnail": "https://...",
      "is_featured": true,
      "sort_order": 1
    }
  ]
}
```

---

### GET /projects/{slug}
프로젝트 상세 조회

**Path Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `slug` | string | 프로젝트 slug |

**Response:**
```json
{
  "data": {
    "id": 1,
    "title": "프로젝트 이름",
    "slug": "project-slug",
    "description": "프로젝트 간단 설명",
    "content": "# 프로젝트 상세 설명\n\nMarkdown 형식...",
    "tech_stack": ["Go", "React", "PostgreSQL"],
    "demo_url": "https://demo.example.com",
    "github_url": "https://github.com/user/repo",
    "thumbnail": "https://...",
    "images": [
      "https://.../image1.png",
      "https://.../image2.png"
    ],
    "is_featured": true,
    "sort_order": 1,
    "created_at": "2024-01-01T00:00:00Z",
    "updated_at": "2024-01-15T00:00:00Z"
  }
}
```

**Error:**
- `404 NOT_FOUND`: 프로젝트를 찾을 수 없음

---

## TypeScript Types

프론트엔드에서 사용할 TypeScript 타입 정의:

```typescript
// === Base Types ===

interface PaginationMeta {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
}

interface ApiResponse<T> {
  data: T;
  meta?: PaginationMeta;
}

interface ApiError {
  error: {
    code: string;
    message: string;
  };
}

// === Post Types ===

interface TagBrief {
  id: number;
  name: string;
  slug: string;
}

interface PostNavItem {
  slug: string;
  title: string;
}

interface Post {
  id: number;
  title: string;
  slug: string;
  content?: string;         // 상세 조회에서만 포함
  excerpt: string;
  category_id: number | null;
  category_name: string;
  category_slug: string;
  status: 'published' | 'draft';
  view_count: number;
  reading_time: number;      // 분 단위
  thumbnail: string | null;
  tags: TagBrief[];
  prev_post?: PostNavItem;   // 상세 조회에서만 포함
  next_post?: PostNavItem;   // 상세 조회에서만 포함
  created_at: string;        // ISO 8601
  published_at: string | null;
  updated_at?: string;       // 상세 조회에서만 포함
}

// === Category Types ===

interface Category {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  sort_order: number;
  post_count: number;
  created_at: string;
}

// === Tag Types ===

interface Tag {
  id: number;
  name: string;
  slug: string;
  post_count: number;
  created_at: string;
}

// === Project Types ===

interface ProjectListItem {
  id: number;
  title: string;
  slug: string;
  description: string;
  tech_stack: string[];
  thumbnail: string | null;
  is_featured: boolean;
  sort_order: number;
}

interface Project extends ProjectListItem {
  content: string;           // Markdown 형식
  demo_url: string | null;
  github_url: string | null;
  images: string[];
  created_at: string;
  updated_at: string | null;
}

// === View Count Response ===

interface ViewCountResponse {
  view_count: number;
}
```

---

## Usage Examples

### Fetch Posts with TanStack Query

```typescript
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/infrastructure/api/ApiClient';

// 글 목록 조회
export function usePosts(page = 1, category?: number, tag?: number) {
  return useQuery({
    queryKey: ['posts', { page, category, tag }],
    queryFn: () => apiClient.get('/posts', {
      params: { page, per_page: 10, category, tag }
    }).then(res => res.data),
  });
}

// 글 상세 조회
export function usePost(slug: string) {
  return useQuery({
    queryKey: ['post', slug],
    queryFn: () => apiClient.get(`/posts/${slug}`).then(res => res.data),
    enabled: !!slug,
  });
}

// 검색
export function useSearchPosts(query: string, page = 1) {
  return useQuery({
    queryKey: ['posts', 'search', { q: query, page }],
    queryFn: () => apiClient.get('/posts/search', {
      params: { q: query, page }
    }).then(res => res.data),
    enabled: query.length > 0,
  });
}
```

### Record Post View

```typescript
import { useMutation } from '@tanstack/react-query';

export function useRecordView() {
  return useMutation({
    mutationFn: (slug: string) =>
      apiClient.post(`/posts/${slug}/view`).then(res => res.data),
  });
}

// Usage in component
const recordView = useRecordView();

useEffect(() => {
  if (slug) {
    recordView.mutate(slug);
  }
}, [slug]);
```

---

## Notes

1. **인증**: 모든 Public API는 인증 없이 사용 가능
2. **Rate Limiting**: 현재 구현되어 있지 않음
3. **CORS**: 프론트엔드 도메인 허용 필요
4. **이미지 URL**: MinIO에서 제공, 프로덕션에서는 CDN 사용 권장
5. **Markdown**: 글 본문(`content`)과 프로젝트 상세(`content`)는 Markdown 형식
