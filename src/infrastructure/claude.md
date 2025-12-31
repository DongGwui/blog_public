# Infrastructure Layer

## 개요

Infrastructure 레이어는 외부 시스템(API, 데이터베이스 등)과의 통신을 담당합니다.
Domain 레이어의 리포지토리 인터페이스를 구현하여 실제 데이터 접근 로직을 제공합니다.

## 디렉토리 구조

```
infrastructure/
├── api/            # HTTP 클라이언트
│   ├── ApiClient.ts
│   └── index.ts
└── repositories/   # 리포지토리 구현체
    ├── PostRepository.ts
    ├── ProjectRepository.ts
    ├── CategoryRepository.ts
    ├── TagRepository.ts
    └── index.ts
```

## 코딩 컨벤션

### API Client

```typescript
// 팩토리 함수로 생성
export function createApiClient(config: ApiClientConfig): ApiClient {
  const axiosInstance = axios.create({
    baseURL: config.baseURL,
    timeout: config.timeout ?? 10000,
  });

  return {
    async get<T>(path: string): Promise<T> { /* ... */ },
    async post<T>(path: string, data?: unknown): Promise<T> { /* ... */ },
    // ...
  };
}

// 싱글톤 패턴으로 기본 인스턴스 제공
export function getApiClient(): ApiClient {
  if (!defaultApiClient) {
    const baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api/public';
    defaultApiClient = createApiClient({ baseURL });
  }
  return defaultApiClient;
}
```

### Repository 구현

```typescript
import type { IPostRepository } from '@/domain/repositories';
import type { ApiClient } from '@/infrastructure/api/ApiClient';

// 팩토리 함수로 생성 (의존성 주입)
export function createPostRepository(apiClient: ApiClient): IPostRepository {
  return {
    async getPosts(params?: GetPostsParams) {
      const queryParams: Record<string, string | number | undefined> = {};

      if (params?.page) queryParams.page = params.page;
      if (params?.perPage) queryParams.per_page = params.perPage;

      return apiClient.get<ApiResponse<PostListItem[]>>('/posts', {
        params: queryParams
      });
    },
    // ...
  };
}
```

## API 에러 처리

```typescript
// 커스텀 에러 클래스
export class ApiError extends Error {
  constructor(
    message: string,
    public readonly statusCode: number,
    public readonly data?: unknown
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

// 상태 코드별 에러 메시지
// 400: 잘못된 요청
// 401: 인증 필요
// 403: 접근 거부
// 404: 리소스 없음
// 500: 서버 오류
```

## 규칙

1. **인터페이스 구현**: Domain 레이어의 `I*Repository` 인터페이스를 구현
2. **snake_case 변환**: API 요청 시 camelCase → snake_case 변환
3. **에러 처리**: `ApiError` 클래스로 통일된 에러 처리
4. **환경 변수**: API URL은 `NEXT_PUBLIC_API_URL`에서 가져옴
5. **팩토리 패턴**: 클래스 대신 팩토리 함수 사용하여 의존성 주입 용이하게 함

## API 엔드포인트

| 메서드 | 엔드포인트 | 설명 |
|--------|-----------|------|
| GET | `/posts` | 글 목록 |
| GET | `/posts/:slug` | 글 상세 |
| GET | `/posts/search` | 글 검색 |
| POST | `/posts/:slug/view` | 조회수 증가 |
| GET | `/categories` | 카테고리 목록 |
| GET | `/categories/:slug/posts` | 카테고리별 글 |
| GET | `/tags` | 태그 목록 |
| GET | `/tags/:slug/posts` | 태그별 글 |
| GET | `/projects` | 프로젝트 목록 |
| GET | `/projects/:slug` | 프로젝트 상세 |

## 새 Repository 추가 시

1. `domain/repositories/` 에 인터페이스 먼저 정의
2. `repositories/` 에 구현체 파일 생성
3. 팩토리 함수 구현
4. `index.ts`에서 export
