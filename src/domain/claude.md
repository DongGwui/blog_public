# Domain Layer

## 개요

Domain 레이어는 Clean Architecture의 핵심 계층으로, 비즈니스 로직과 규칙을 정의합니다.
외부 의존성이 없으며, 다른 모든 레이어가 이 레이어에 의존합니다.

## 디렉토리 구조

```
domain/
├── entities/       # 도메인 엔티티 (타입, 인터페이스)
│   ├── Post.ts
│   ├── Category.ts
│   ├── Tag.ts
│   ├── Project.ts
│   ├── Common.ts   # 공통 타입 (ApiResponse, Pagination 등)
│   └── index.ts
└── repositories/   # 리포지토리 인터페이스
    ├── IPostRepository.ts
    ├── ICategoryRepository.ts
    ├── ITagRepository.ts
    ├── IProjectRepository.ts
    └── index.ts
```

## 코딩 컨벤션

### 엔티티 정의

```typescript
// 인터페이스로 엔티티 정의
export interface Post {
  id: number;
  title: string;
  slug: string;
  content: string;
  // ...
}

// 타입 별칭 사용
export type PostStatus = 'published' | 'draft';

// 유효성 검증 함수 (Type Guard)
export function isValidPost(post: unknown): post is Post {
  // 검증 로직
}
```

### 리포지토리 인터페이스

```typescript
// I 접두사로 인터페이스 명시
export interface IPostRepository {
  getPosts(params?: GetPostsParams): Promise<ApiResponse<PostListItem[]>>;
  getPost(slug: string): Promise<ApiResponse<Post>>;
  // ...
}

// 파라미터 타입도 같은 파일에 정의
export interface GetPostsParams {
  page?: number;
  perPage?: number;
}
```

## 규칙

1. **외부 의존성 금지**: React, Next.js, axios 등 외부 라이브러리 import 금지
2. **순수 TypeScript**: 타입과 인터페이스만 정의
3. **불변성**: 엔티티는 불변 객체로 취급
4. **네이밍**:
   - 엔티티: `PascalCase` (Post, Category)
   - 인터페이스: `I` 접두사 (IPostRepository)
   - 타입: `PascalCase` (PostStatus)
5. **snake_case 필드**: API 응답과 일치시키기 위해 엔티티 필드는 `snake_case` 사용

## 새 엔티티 추가 시

1. `entities/` 에 새 파일 생성
2. 인터페이스와 타입 정의
3. 유효성 검증 함수 추가 (선택적)
4. `entities/index.ts` 에서 export
5. 필요시 `repositories/` 에 리포지토리 인터페이스 추가
