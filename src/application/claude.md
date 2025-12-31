# Application Layer

## 개요

Application 레이어는 비즈니스 로직을 오케스트레이션하는 계층입니다.
Use Case를 통해 도메인 로직을 실행하고, DTO를 통해 데이터를 변환합니다.

## 디렉토리 구조

```
application/
├── dto/            # Data Transfer Objects
│   ├── PaginationDTO.ts
│   ├── PostDTO.ts
│   ├── ProjectDTO.ts
│   └── index.ts
└── use-cases/      # 비즈니스 유스케이스
    ├── posts/
    │   ├── GetPosts.ts
    │   ├── GetPost.ts
    │   ├── SearchPosts.ts
    │   └── index.ts
    ├── projects/
    │   └── ...
    ├── categories/
    │   └── ...
    └── tags/
        └── ...
```

## 코딩 컨벤션

### DTO 정의

```typescript
// Request DTO
export interface GetPostsRequestDTO extends PaginationRequestDTO {
  categoryId?: number;
  tagId?: number;
}

// Response DTO (필요시)
export interface IncrementViewResponseDTO {
  viewCount: number;  // camelCase로 변환
}
```

### Use Case 패턴

```typescript
// 인터페이스 정의
export interface GetPostsUseCase {
  execute(request?: GetPostsRequestDTO): Promise<ApiResponse<PostListItem[]>>;
}

// 팩토리 함수로 생성 (의존성 주입)
export function createGetPostsUseCase(
  postRepository: IPostRepository
): GetPostsUseCase {
  return {
    async execute(request?: GetPostsRequestDTO) {
      const { page, perPage } = normalizePagination(request);
      return postRepository.getPosts({ page, perPage });
    },
  };
}
```

## 규칙

1. **의존성 주입**: Use Case는 팩토리 함수를 통해 리포지토리를 주입받음
2. **단일 책임**: 하나의 Use Case는 하나의 비즈니스 작업만 수행
3. **DTO 사용**: 외부 레이어와의 데이터 교환은 DTO를 통해 수행
4. **도메인 레이어만 의존**: Infrastructure나 Presentation에 의존하지 않음
5. **네이밍**:
   - Use Case: 동사 + 명사 (GetPosts, SearchPosts)
   - DTO: 명사 + RequestDTO/ResponseDTO

## Pagination 헬퍼

```typescript
import { normalizePagination } from '@/application/dto';

// 페이지네이션 파라미터 정규화
const { page, perPage } = normalizePagination(request);
// page: 기본값 1, perPage: 기본값 10
```

## 새 Use Case 추가 시

1. `use-cases/[도메인]/` 에 새 파일 생성
2. Use Case 인터페이스 정의
3. 팩토리 함수 구현
4. `index.ts`에서 export
5. 필요시 DTO 추가
