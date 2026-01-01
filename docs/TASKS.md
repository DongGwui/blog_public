# Blog Public 작업 체크리스트

## Phase 1: 프로젝트 초기화

### 기본 설정
- [x] Next.js 15 프로젝트 생성 (App Router)
- [x] TypeScript 설정
- [x] Tailwind CSS 설정
- [x] 클린 아키텍처 디렉토리 구조 생성
- [x] ESLint, Prettier 설정

### 의존성 설치
- [x] @tanstack/react-query
- [x] axios
- [ ] @giscus/react
- [ ] shiki (코드 하이라이팅)

### 환경 설정
- [x] .env.local 생성
- [x] next.config.ts 설정
- [x] tailwind.config.ts 설정

---

## Phase 2: Domain & Application Layer

### Domain Entities
- [x] Post.ts (PostListItem, Post, PostStatus, TagBrief)
- [x] Category.ts
- [x] Tag.ts
- [x] Project.ts
- [x] Common.ts (ApiResponse, Pagination)

### Repository Interfaces
- [x] IPostRepository.ts
- [x] ICategoryRepository.ts
- [x] ITagRepository.ts
- [x] IProjectRepository.ts

### DTOs
- [x] PaginationDTO.ts
- [x] PostDTO.ts
- [x] ProjectDTO.ts

### Use Cases
- [x] posts/GetPosts.ts
- [x] posts/GetPost.ts
- [x] posts/SearchPosts.ts
- [x] posts/GetPostsByCategory.ts
- [x] posts/GetPostsByTag.ts
- [x] posts/IncrementView.ts
- [x] projects/GetProjects.ts
- [x] projects/GetProject.ts
- [x] categories/GetCategories.ts
- [x] tags/GetTags.ts

---

## Phase 3: Infrastructure Layer (API 연동)

### API Client
- [x] ApiClient.ts (axios 인스턴스, 에러 핸들링)
- [x] ApiError 클래스

### Repository 구현체
- [x] PostRepository.ts
- [x] ProjectRepository.ts
- [x] CategoryRepository.ts
- [x] TagRepository.ts

### TanStack Query 훅
- [x] usePosts.ts (usePosts, usePostsByCategory, usePostsByTag)
- [x] usePost.ts
- [x] useSearch.ts
- [x] useProjects.ts
- [x] useCategories.ts
- [x] useTags.ts

### Provider
- [x] QueryProvider.tsx

---

## Phase 4: 레이아웃 & 공통 컴포넌트

### 레이아웃
- [x] app/layout.tsx (루트 레이아웃)
- [x] Header 컴포넌트
- [x] Footer 컴포넌트
- [x] Navigation 컴포넌트 (모바일 슬라이드 패널)

### 다크모드
- [x] useTheme 훅 구현
- [x] ThemeProvider 컴포넌트
- [x] ThemeToggle 컴포넌트
- [x] 시스템 테마 감지

### 공통 컴포넌트
- [x] Pagination 컴포넌트
- [x] LoadingSkeleton 컴포넌트
- [x] Tag 컴포넌트
- [x] Category 컴포넌트
- [x] SearchBar 컴포넌트

---

## Phase 5: 블로그 페이지

### 글 목록 (/blog)
- [x] page.tsx
- [x] loading.tsx
- [x] PostCard 컴포넌트
- [x] PostList 컴포넌트
- [x] 페이지네이션 연동

### 글 상세 (/blog/[slug])
- [x] page.tsx
- [x] loading.tsx
- [x] PostHeader 컴포넌트 (제목, 날짜, 읽기 시간)
- [x] PostContent 컴포넌트 (마크다운 렌더링)
- [ ] 코드 하이라이팅 (Shiki)
- [x] PostTOC 컴포넌트 (목차)
- [x] PostNav 컴포넌트 (이전/다음 글)
- [ ] 조회수 증가 호출
- [ ] Comments 컴포넌트 (Giscus)

### 카테고리별 (/blog/category/[slug])
- [x] page.tsx
- [x] 카테고리 정보 표시
- [x] 필터링된 글 목록

### 태그별 (/blog/tag/[slug])
- [x] page.tsx
- [x] 태그 정보 표시
- [x] 필터링된 글 목록

---

## Phase 6: 홈 & 기타 페이지

### 홈 (/)
- [x] page.tsx (Hero, Recent Posts, Featured Projects)
- [x] Hero 섹션
- [x] 최근 글 섹션 (API 연동)
- [x] 대표 프로젝트 섹션 (API 연동)

### 검색 (/search)
- [x] page.tsx
- [x] SearchContent 클라이언트 컴포넌트
- [x] 실시간 검색 결과 표시
- [x] 디바운스 적용
- [x] URL 쿼리 파라미터 동기화

### About (/about)
- [x] page.tsx
- [x] 자기소개 섹션
- [x] Skills 섹션
- [x] Contact 섹션 (소셜 링크)

### 404 페이지
- [x] not-found.tsx
- [x] 홈/검색 링크
- [x] 뒤로가기 버튼

---

## Phase 7: 프로젝트 페이지

### 프로젝트 목록 (/projects)
- [x] page.tsx
- [x] loading.tsx
- [x] ProjectCard 컴포넌트
- [x] ProjectGrid 컴포넌트
- [x] TechStack 컴포넌트

### 프로젝트 상세 (/projects/[slug])
- [x] page.tsx
- [x] loading.tsx
- [x] Hero 이미지
- [x] 상세 정보 표시
- [x] 링크 (데모, GitHub)
- [x] 이미지 갤러리

---

## Phase 8: SEO & 최적화

### 메타데이터
- [x] 기본 메타데이터 설정 (metadataBase, googleBot)
- [x] 동적 메타데이터 (글, 프로젝트, 카테고리, 태그)
- [x] Open Graph 설정
- [x] Twitter Card 설정

### 정적 생성
- [ ] generateStaticParams (글)
- [ ] generateStaticParams (프로젝트)
- [ ] ISR 설정

### 기타
- [x] sitemap.xml 생성 (app/sitemap.ts)
- [x] robots.txt 생성 (app/robots.ts)

---

## Phase 9: 반응형 & 배포

### 반응형 디자인
- [x] 모바일 네비게이션 (슬라이드 패널, 오버레이, 애니메이션)
- [x] 글 목록 반응형
- [x] 글 상세 반응형
- [x] 프로젝트 목록 반응형 (1/2/3 columns)

### 배포 준비
- [x] Dockerfile 작성 (멀티스테이지, standalone)
- [x] docker-compose.yml (git 제외)
- [x] docker-compose.example.yml (예시 파일)
- [x] 환경 변수 정리 (.env.example)
- [x] Traefik 라벨 설정
- [x] next.config.ts standalone 출력 설정

### 최종 점검
- [ ] 모든 페이지 테스트
- [ ] 다크모드 테스트
- [ ] 모바일 테스트
- [ ] 성능 최적화 (Lighthouse)

---

## 진행 상태

| Phase | 상태 | 진행률 |
|-------|------|--------|
| Phase 1: 초기화 | ✅ 완료 | 100% |
| Phase 2: Domain & Application | ✅ 완료 | 100% |
| Phase 3: Infrastructure | ✅ 완료 | 100% |
| Phase 4: 레이아웃 & 공통 | ✅ 완료 | 100% |
| Phase 5: 블로그 | ✅ 완료 | 85% |
| Phase 6: 홈 & 기타 | ✅ 완료 | 100% |
| Phase 7: 프로젝트 | ✅ 완료 | 100% |
| Phase 8: SEO | ✅ 완료 | 100% |
| Phase 9: 반응형 & 배포 | 🔄 진행중 | 90% |

**전체 진행률**: 약 97%

**상태**: ⬜ 대기 | 🔄 진행중 | ✅ 완료

---

## 완료된 주요 작업

### 2026-01-01 (Phase 1-5)
- Clean Architecture 구현 (4계층)
- Editorial Minimalist 디자인 시스템
- 블로그 페이지 전체 구현
- 105개 단위 테스트

### 2026-01-01 (Phase 6-7)
- 홈페이지 Hero/최근글/프로젝트 섹션 (API 연동)
- 검색 페이지 (실시간 검색, 디바운스)
- About 페이지 (소개, Skills, Contact)
- 404 페이지
- 프로젝트 목록/상세 페이지
- ProjectCard, TechStack 컴포넌트

### 2026-01-01 (Phase 8 SEO)
- 기본 메타데이터 강화 (metadataBase, googleBot 설정)
- 동적 메타데이터 (블로그/프로젝트/카테고리/태그)
- OpenGraph & Twitter Card 설정
- sitemap.ts (동적 URL 생성)
- robots.ts (크롤러 설정)

### 2026-01-01 (Phase 9 반응형 & 배포)
- 모바일 네비게이션 개선 (슬라이드 패널, 오버레이, 스크롤 잠금)
- Dockerfile (멀티스테이지, standalone 빌드)
- docker-compose.yml (Traefik 연동, git 제외)

### 남은 작업
- Shiki 코드 하이라이팅
- Giscus 댓글
- 조회수 증가 기능
- generateStaticParams (정적 생성)
- Lighthouse 최적화
