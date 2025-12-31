# Implementation Plan: Blog Public (Clean Architecture)

**Status**: 🔄 In Progress
**Started**: 2026-01-01
**Last Updated**: 2026-01-01

---

**CRITICAL INSTRUCTIONS**: After completing each phase:
1. Check off completed task checkboxes
2. Run all quality gate validation commands
3. Verify ALL quality gate items pass
4. Update "Last Updated" date above
5. Document learnings in Notes section
6. Only then proceed to next phase

**DO NOT skip quality gates or proceed with failing checks**

---

## Overview

### Feature Description
Next.js 14 App Router 기반 개인 블로그 프론트엔드. 클린 아키텍처 원칙을 적용하여 유지보수성과 테스트 용이성을 확보합니다.

### Success Criteria
- [ ] 모든 블로그 페이지가 정상 동작 (목록, 상세, 카테고리, 태그)
- [ ] 프로젝트 페이지가 정상 동작
- [ ] 검색 기능이 정상 동작
- [ ] 다크모드/라이트모드 전환 동작
- [ ] 반응형 디자인 적용
- [ ] Lighthouse 성능 점수 90+ 달성
- [ ] 테스트 커버리지 80% 이상

### User Impact
방문자가 블로그 글을 읽고, 프로젝트를 확인하고, 검색할 수 있는 사이트 제공

---

## Architecture Decisions

| Decision | Rationale | Trade-offs |
|----------|-----------|------------|
| Clean Architecture 4-Layer | 관심사 분리, 테스트 용이성, 유지보수성 향상 | 초기 설정 복잡도 증가, 파일 수 증가 |
| Next.js 14 App Router | 최신 React Server Components, 성능 최적화 | 러닝 커브, 일부 라이브러리 호환성 |
| TanStack Query | 서버 상태 관리, 캐싱, 자동 리페칭 | 번들 사이즈 증가 |
| Tailwind CSS | 유틸리티 퍼스트, 빠른 개발, 작은 번들 | HTML 클래스 복잡도 |
| Shiki | 정적 코드 하이라이팅, 빌드 타임 처리 | gray-matter와 함께 사용 시 설정 필요 |

---

## Design System: Editorial Minimalist

> 상세 디자인 사양은 [DESIGN_SYSTEM.md](../DESIGN_SYSTEM.md) 참조

### Design Philosophy
**"Less, but better"** - 매거진/에디토리얼 스타일의 세련된 미니멀리즘

### Typography
| Element | Font | Weight |
|---------|------|--------|
| Heading | Cormorant Garamond (Noto Serif KR) | 500-600 |
| Body | Source Sans 3 (Pretendard) | 400-500 |
| Code | JetBrains Mono | 400 |

### Color Palette

**Light Mode:**
- Background: `#FAFAF9` (warm white)
- Text: `#1C1917` (almost black)
- Accent: `#0D7377` (deep teal)

**Dark Mode:**
- Background: `#0F0F0F` (deep black)
- Text: `#FAFAF9` (almost white)
- Accent: `#14B8A6` (soft teal)

### Key Design Elements
- **Generous Whitespace**: 넓은 여백으로 콘텐츠 강조
- **Serif Headings**: 우아한 Serif 폰트로 에디토리얼 느낌
- **Subtle Animations**: 부드러운 페이드인, 호버 언더라인
- **Content Width**: 본문 최대 70ch로 가독성 확보
- **Theme**: System default 기반, 수동 토글 지원

### Visual Hierarchy
```
Page Title (H1): 56px / Serif / Bold
Section (H2): 36px / Serif / Semi-bold
Subsection (H3): 24px / Serif / Medium
Body: 18px / Sans-serif / Regular
Caption: 12px / Sans-serif / Regular
```

---

## Dependencies

### Required Before Starting
- [ ] Node.js 18+ 설치
- [ ] Backend API 서버 실행 가능 (localhost:8080)

### External Dependencies
```json
{
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.0.0",
    "react-dom": "^18.0.0",
    "@tanstack/react-query": "^5.0.0",
    "axios": "^1.6.0",
    "@giscus/react": "^3.0.0",
    "shiki": "^1.0.0"
  },
  "devDependencies": {
    "typescript": "^5.0.0",
    "tailwindcss": "^3.4.0",
    "@types/react": "^18.0.0",
    "@types/node": "^20.0.0",
    "jest": "^29.0.0",
    "@testing-library/react": "^14.0.0",
    "eslint": "^8.0.0",
    "prettier": "^3.0.0"
  }
}
```

---

## Test Strategy

### Testing Approach
**TDD Principle**: Write tests FIRST, then implement to make them pass

### Test Pyramid for This Feature
| Test Type | Coverage Target | Purpose |
|-----------|-----------------|---------|
| **Unit Tests** | >=80% | Domain entities, Use cases, Utils |
| **Integration Tests** | Critical paths | API 연동, Repository 구현체 |
| **E2E Tests** | Key user flows | 페이지 네비게이션, 검색 플로우 |

### Test File Organization
```
__tests__/
├── unit/
│   ├── domain/
│   │   └── entities/
│   ├── application/
│   │   └── use-cases/
│   └── infrastructure/
│       └── repositories/
├── integration/
│   └── api/
└── e2e/
    └── pages/
```

---

## Implementation Phases

---

### Phase 1: Project Initialization & Clean Architecture Foundation
**Goal**: Next.js 14 프로젝트 생성 및 클린 아키텍처 디렉토리 구조 설정
**Status**: ✅ Completed

#### Tasks

**RED: Write Failing Tests First**
- [ ] **Test 1.1**: Domain entity 기본 타입 테스트 작성
  - File: `__tests__/unit/domain/entities/Post.test.ts`
  - Expected: Tests FAIL - Post entity 없음
  - Details: Post 타입 검증, 필수 필드 체크

**GREEN: Implement to Make Tests Pass**
- [ ] **Task 1.2**: Next.js 14 프로젝트 생성
  - Command: `npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"`
  - Note: 현재 디렉토리에 생성

- [ ] **Task 1.3**: 클린 아키텍처 디렉토리 구조 생성
  ```
  src/
  ├── domain/
  │   ├── entities/
  │   └── repositories/
  ├── application/
  │   ├── use-cases/
  │   └── dto/
  ├── infrastructure/
  │   ├── api/
  │   └── repositories/
  └── presentation/
      ├── components/
      ├── hooks/
      └── providers/
  ```

- [ ] **Task 1.4**: 개발 의존성 설치
  - Jest, Testing Library, ESLint plugins, Prettier

- [ ] **Task 1.5**: 설정 파일 구성
  - `jest.config.js`
  - `.prettierrc`
  - `tsconfig.json` paths 설정
  - `.env.local` 생성

- [ ] **Task 1.6**: Domain Entities 타입 정의
  - File: `src/domain/entities/Post.ts`
  - File: `src/domain/entities/Category.ts`
  - File: `src/domain/entities/Tag.ts`
  - File: `src/domain/entities/Project.ts`
  - File: `src/domain/entities/index.ts`

**REFACTOR: Clean Up Code**
- [ ] **Task 1.7**: ESLint, Prettier 적용 및 코드 정리

#### Quality Gate

**TDD Compliance**:
- [ ] Tests were written FIRST and initially failed
- [ ] Production code written to make tests pass
- [ ] Code improved while tests still pass

**Build & Tests**:
- [ ] `npm run build` - 빌드 성공
- [ ] `npm test` - 모든 테스트 통과
- [ ] `npm run lint` - 린트 에러 없음

**Validation Commands**:
```bash
npm run build
npm test
npm run lint
npm run format:check
```

**Manual Test Checklist**:
- [ ] `npm run dev` 로 개발 서버 정상 실행
- [ ] localhost:3000 접속 가능
- [ ] TypeScript 에러 없음

---

### Phase 2: Domain Layer & Application Layer
**Goal**: 핵심 비즈니스 로직과 Use Cases 구현
**Status**: ✅ Completed

#### Tasks

**RED: Write Failing Tests First**
- [ ] **Test 2.1**: Repository 인터페이스 테스트
  - File: `__tests__/unit/domain/repositories/IPostRepository.test.ts`
  - Expected: FAIL - 인터페이스 미구현

- [ ] **Test 2.2**: GetPosts Use Case 테스트
  - File: `__tests__/unit/application/use-cases/GetPosts.test.ts`
  - Expected: FAIL - Use case 미구현
  - Details: Mock repository 사용, 페이지네이션 테스트

- [ ] **Test 2.3**: GetPost Use Case 테스트
  - File: `__tests__/unit/application/use-cases/GetPost.test.ts`
  - Expected: FAIL

- [ ] **Test 2.4**: SearchPosts Use Case 테스트
  - File: `__tests__/unit/application/use-cases/SearchPosts.test.ts`
  - Expected: FAIL

**GREEN: Implement to Make Tests Pass**
- [ ] **Task 2.5**: Repository 인터페이스 정의
  - File: `src/domain/repositories/IPostRepository.ts`
  - File: `src/domain/repositories/IProjectRepository.ts`
  - File: `src/domain/repositories/ICategoryRepository.ts`
  - File: `src/domain/repositories/ITagRepository.ts`

- [ ] **Task 2.6**: DTO 정의
  - File: `src/application/dto/PaginationDTO.ts`
  - File: `src/application/dto/PostListDTO.ts`
  - File: `src/application/dto/PostDetailDTO.ts`

- [ ] **Task 2.7**: Post 관련 Use Cases 구현
  - File: `src/application/use-cases/posts/GetPosts.ts`
  - File: `src/application/use-cases/posts/GetPost.ts`
  - File: `src/application/use-cases/posts/SearchPosts.ts`
  - File: `src/application/use-cases/posts/GetPostsByCategory.ts`
  - File: `src/application/use-cases/posts/GetPostsByTag.ts`
  - File: `src/application/use-cases/posts/IncrementView.ts`

- [ ] **Task 2.8**: Project 관련 Use Cases 구현
  - File: `src/application/use-cases/projects/GetProjects.ts`
  - File: `src/application/use-cases/projects/GetProject.ts`

- [ ] **Task 2.9**: Category/Tag Use Cases 구현
  - File: `src/application/use-cases/categories/GetCategories.ts`
  - File: `src/application/use-cases/tags/GetTags.ts`

**REFACTOR: Clean Up Code**
- [ ] **Task 2.10**: Use Case 패턴 통일, 중복 제거

#### Quality Gate

**TDD Compliance**:
- [ ] Tests were written FIRST
- [ ] All Use Cases have corresponding tests
- [ ] Coverage >=80% for application layer

**Build & Tests**:
- [ ] `npm test` - 모든 테스트 통과
- [ ] 타입 에러 없음

**Validation Commands**:
```bash
npm test -- --coverage --collectCoverageFrom='src/domain/**/*.ts' --collectCoverageFrom='src/application/**/*.ts'
npm run lint
npm run type-check
```

---

### Phase 3: Infrastructure Layer (API Integration)
**Goal**: API 클라이언트 및 Repository 구현체 완성
**Status**: ✅ Completed

#### Tasks

**RED: Write Failing Tests First**
- [ ] **Test 3.1**: API Client 테스트
  - File: `__tests__/unit/infrastructure/api/ApiClient.test.ts`
  - Expected: FAIL
  - Details: axios mock 사용, 에러 핸들링 테스트

- [ ] **Test 3.2**: PostRepository 구현체 테스트
  - File: `__tests__/integration/repositories/PostRepository.test.ts`
  - Expected: FAIL
  - Details: MSW 또는 mock server 사용

**GREEN: Implement to Make Tests Pass**
- [ ] **Task 3.3**: API Client 구현
  - File: `src/infrastructure/api/ApiClient.ts`
  - Details: axios 인스턴스, interceptors, 에러 핸들링

- [ ] **Task 3.4**: Repository 구현체
  - File: `src/infrastructure/repositories/PostRepository.ts`
  - File: `src/infrastructure/repositories/ProjectRepository.ts`
  - File: `src/infrastructure/repositories/CategoryRepository.ts`
  - File: `src/infrastructure/repositories/TagRepository.ts`

- [ ] **Task 3.5**: TanStack Query 훅 구현
  - File: `src/presentation/hooks/queries/usePosts.ts`
  - File: `src/presentation/hooks/queries/usePost.ts`
  - File: `src/presentation/hooks/queries/useSearch.ts`
  - File: `src/presentation/hooks/queries/useProjects.ts`
  - File: `src/presentation/hooks/queries/useCategories.ts`
  - File: `src/presentation/hooks/queries/useTags.ts`

- [ ] **Task 3.6**: Query Provider 설정
  - File: `src/presentation/providers/QueryProvider.tsx`

**REFACTOR: Clean Up Code**
- [ ] **Task 3.7**: API 에러 핸들링 통일, 타입 안전성 강화

#### Quality Gate

**Build & Tests**:
- [ ] API 연동 테스트 통과 (mock server)
- [ ] `npm test` 통과

**Validation Commands**:
```bash
npm test
npm run lint
```

**Manual Test Checklist**:
- [ ] Backend API 연결 테스트 (실제 서버)
- [ ] 네트워크 에러 핸들링 확인

---

### Phase 4: Layout & Common Components (Design System 적용)
**Goal**: Editorial Minimalist 디자인 시스템 적용, 기본 레이아웃과 다크모드, 공통 컴포넌트 구현
**Status**: ✅ Completed

> **Design Reference**: [DESIGN_SYSTEM.md](../DESIGN_SYSTEM.md)

#### Tasks

**RED: Write Failing Tests First**
- [ ] **Test 4.1**: useTheme 훅 테스트
  - File: `__tests__/unit/presentation/hooks/useTheme.test.ts`
  - Expected: FAIL
  - Details: 테마 토글, localStorage 저장, 시스템 테마 감지

- [ ] **Test 4.2**: Pagination 컴포넌트 테스트
  - File: `__tests__/unit/presentation/components/Pagination.test.tsx`
  - Expected: FAIL

**GREEN: Implement to Make Tests Pass**

**Design Foundation:**
- [ ] **Task 4.3**: Tailwind 설정 확장
  - File: `tailwind.config.ts`
  - Details:
    - Font families: heading (Cormorant Garamond), body (Source Sans 3), mono (JetBrains Mono)
    - Custom colors: CSS 변수 연동
    - Typography plugin 설정
    ```typescript
    fontFamily: {
      heading: ['Cormorant Garamond', 'Noto Serif KR', 'Georgia', 'serif'],
      body: ['Source Sans 3', 'Pretendard', 'system-ui', 'sans-serif'],
      mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
    }
    ```

- [ ] **Task 4.4**: 전역 스타일 & CSS 변수
  - File: `app/globals.css`
  - Details:
    - Google Fonts import (Cormorant Garamond, Source Sans 3, JetBrains Mono, Noto Serif KR, Pretendard)
    - CSS 변수 정의 (Light/Dark mode colors)
    - Base typography styles
    - Animation keyframes (fadeInUp, underline slide)
    - prefers-reduced-motion 대응

- [ ] **Task 4.5**: Theme Provider & Hook
  - File: `src/presentation/providers/ThemeProvider.tsx`
  - File: `src/presentation/hooks/useTheme.ts`
  - Details:
    - System default 감지 (`prefers-color-scheme`)
    - localStorage 저장 (`theme` key)
    - `data-theme` attribute 토글
    - Smooth color transition (0.3s)

- [ ] **Task 4.6**: Root Layout 구현
  - File: `app/layout.tsx`
  - Details:
    - Providers 래핑 (ThemeProvider, QueryProvider)
    - 기본 메타데이터
    - Google Fonts 최적화 (`next/font` or link preconnect)
    - Body class: `font-body bg-primary text-primary`

**Layout Components:**
- [ ] **Task 4.7**: Header 컴포넌트
  - File: `src/presentation/components/layout/Header.tsx`
  - Design Spec:
    - Height: 64px (desktop), 56px (mobile)
    - Position: sticky top-0
    - Background: blur backdrop (`backdrop-blur-md`)
    - Logo: Site name in `font-heading`, weight 600
    - Nav links: hover underline animation (slide from left)
    - ThemeToggle: Sun/Moon icon with rotation

- [ ] **Task 4.8**: Footer 컴포넌트
  - File: `src/presentation/components/layout/Footer.tsx`
  - Design Spec:
    - Minimal design, border-top
    - Copyright, social links
    - `text-tertiary` color

- [ ] **Task 4.9**: Navigation 컴포넌트
  - File: `src/presentation/components/layout/Navigation.tsx`
  - File: `src/presentation/components/layout/MobileNav.tsx`
  - Design Spec:
    - Desktop: Horizontal nav, text-based
    - Mobile: Hamburger menu, slide-in panel
    - Active state: accent color + underline

**Common Components:**
- [ ] **Task 4.10**: ThemeToggle 컴포넌트
  - File: `src/presentation/components/common/ThemeToggle.tsx`
  - Design Spec:
    - Icon: Sun (light) / Moon (dark)
    - Animation: 180deg rotation on toggle
    - Accessible: aria-label, keyboard support

- [ ] **Task 4.11**: Pagination 컴포넌트
  - File: `src/presentation/components/common/Pagination.tsx`
  - Design Spec:
    - Text-based: "← Previous  1 2 [3] 4 5  Next →"
    - Current page: Bold, no underline
    - Other pages: hover underline
    - Gap: 16px between numbers

- [ ] **Task 4.12**: Tag & Category 컴포넌트
  - File: `src/presentation/components/common/Tag.tsx`
  - File: `src/presentation/components/common/Category.tsx`
  - Design Spec:
    - Tag: Small, `text-tertiary`, hover → `text-primary`
    - Category: Uppercase, letter-spacing 0.05em, accent color

- [ ] **Task 4.13**: SearchBar 컴포넌트
  - File: `src/presentation/components/common/SearchBar.tsx`
  - Design Spec:
    - Minimal border, focus ring accent
    - Search icon (Lucide)
    - Placeholder: `text-tertiary`

- [ ] **Task 4.14**: LoadingSkeleton 컴포넌트
  - File: `src/presentation/components/common/LoadingSkeleton.tsx`
  - Design Spec:
    - Pulse animation
    - Match actual content layout
    - Rounded corners (4-8px)

**REFACTOR: Clean Up Code**
- [ ] **Task 4.15**: 접근성(a11y) 개선
  - Focus visible outline (2px accent)
  - Skip to main content link
  - Color contrast WCAG AA 확인
  - Keyboard navigation 테스트

#### Quality Gate

**Build & Tests**:
- [ ] 컴포넌트 테스트 통과
- [ ] 다크모드 토글 동작
- [ ] `npm run build` 성공

**Validation Commands**:
```bash
npm test
npm run build
```

**Manual Test Checklist**:
- [ ] Header/Footer 정상 표시
- [ ] 다크모드 토글 동작
- [ ] 모바일 네비게이션 동작
- [ ] 페이지네이션 동작

---

### Phase 5: Blog Pages (Design System 적용)
**Goal**: 블로그 목록, 상세, 카테고리/태그 페이지 구현 (Editorial Minimalist 디자인)
**Status**: Pending

> **Design Reference**: [DESIGN_SYSTEM.md](../DESIGN_SYSTEM.md)

#### Tasks

**RED: Write Failing Tests First**
- [ ] **Test 5.1**: PostCard 컴포넌트 테스트
  - File: `__tests__/unit/presentation/components/PostCard.test.tsx`
- [ ] **Test 5.2**: PostContent 마크다운 렌더링 테스트
  - File: `__tests__/unit/presentation/components/PostContent.test.tsx`

**GREEN: Implement to Make Tests Pass**

**Blog List Page:**
- [ ] **Task 5.3**: 글 목록 페이지 (/blog)
  - File: `app/blog/page.tsx`
  - File: `app/blog/loading.tsx`
  - Design Spec:
    - Page title: "Blog" in H1, Serif, centered or left
    - Container: max-width 768px
    - Post list with divider lines between cards

- [ ] **Task 5.4**: PostCard 컴포넌트
  - File: `src/presentation/components/post/PostCard.tsx`
  - Design Spec:
    ```
    ┌─────────────────────────────────────────┐
    │  2024.01.15  (caption, text-tertiary)   │
    │                                          │
    │  Title of the Blog Post                  │
    │  (H3, font-heading, hover: accent)       │
    │                                          │
    │  Excerpt text 2-3 lines...               │
    │  (body, text-secondary)                  │
    │                                          │
    │  #tag1  #tag2        5 min read          │
    └─────────────────────────────────────────┘
    ```
    - Divider: 1px `border-primary` between cards
    - Hover: Title color → accent
    - Animation: fadeInUp on page load (staggered)

**Blog Detail Page:**
- [ ] **Task 5.5**: 글 상세 페이지 레이아웃
  - File: `app/blog/[slug]/page.tsx`
  - File: `app/blog/[slug]/loading.tsx`
  - Design Spec:
    - Two-column layout (desktop): Content + TOC sidebar
    - Single column (mobile): TOC hidden or collapsible
    - Content max-width: 70ch

- [ ] **Task 5.6**: PostHeader 컴포넌트
  - File: `src/presentation/components/post/PostHeader.tsx`
  - Design Spec:
    - Title: H1 (56px desktop, 40px mobile), Serif
    - Meta: Date | Reading time | View count
    - Category badge (if exists)
    - Tags list below meta
    - Spacing: 48px bottom margin

- [ ] **Task 5.7**: PostContent 컴포넌트
  - File: `src/presentation/components/post/PostContent.tsx`
  - Design Spec:
    - Prose styling via `@tailwindcss/typography`
    - Headings: Serif font
    - Paragraphs: 18px, line-height 1.75
    - Links: accent color, underline on hover
    - Images: rounded 8px, subtle shadow
    - Blockquotes: left border accent, italic
    - Lists: proper spacing, custom bullets

- [ ] **Task 5.8**: PostTOC 컴포넌트 (목차)
  - File: `src/presentation/components/post/PostTOC.tsx`
  - Design Spec:
    - Position: sticky top-20 (desktop sidebar)
    - Style: Small text, text-secondary
    - Active heading: accent color, bold
    - Scroll spy integration
    - Hidden on mobile (or collapsible)

- [ ] **Task 5.9**: PostNav 컴포넌트 (이전/다음)
  - File: `src/presentation/components/post/PostNav.tsx`
  - Design Spec:
    - Full-width, two columns
    - Previous (left) / Next (right)
    - Show title + arrow icon
    - Hover: slight translateY, shadow

**Code Highlighting:**
- [ ] **Task 5.10**: Shiki 코드 하이라이팅
  - File: `src/infrastructure/markdown/highlighter.ts`
  - Design Spec:
    - Theme: Custom (Light: github-light, Dark: github-dark)
    - Code block styling:
      ```
      ┌─────────────────────────────────────┐
      │  filename.ts                  Copy  │
      ├─────────────────────────────────────┤
      │  const x = 1;                       │
      └─────────────────────────────────────┘
      ```
    - Background: `--code-bg`
    - Border-radius: 8px
    - Header with filename + copy button
    - Font: JetBrains Mono

**Comments:**
- [ ] **Task 5.11**: Comments 컴포넌트 (Giscus)
  - File: `src/presentation/components/Comments.tsx`
  - Design Spec:
    - Theme: light/dark 연동
    - Spacing: 64px top margin
    - Lazy loading

**Category & Tag Pages:**
- [ ] **Task 5.12**: 카테고리별 페이지
  - File: `app/blog/category/[slug]/page.tsx`
  - Design: Same as blog list with category header

- [ ] **Task 5.13**: 태그별 페이지
  - File: `app/blog/tag/[slug]/page.tsx`
  - Design: Same as blog list with tag header

**REFACTOR: Clean Up Code**
- [ ] **Task 5.14**: 코드 중복 제거, 성능 최적화, 애니메이션 미세 조정

#### Quality Gate

**Build & Tests**:
- [ ] 블로그 관련 테스트 통과
- [ ] `npm run build` 성공

**Validation Commands**:
```bash
npm test
npm run build
```

**Manual Test Checklist**:
- [ ] 글 목록 정상 표시
- [ ] 글 상세 마크다운 렌더링
- [ ] 코드 하이라이팅 동작
- [ ] 목차(TOC) 동작
- [ ] 댓글(Giscus) 로드
- [ ] 이전/다음 글 네비게이션
- [ ] 카테고리/태그 필터링

---

### Phase 6: Home, Search & Project Pages (Design System 적용)
**Goal**: 홈페이지, 검색 결과, 프로젝트 페이지 구현 (Editorial Minimalist 디자인)
**Status**: Pending

> **Design Reference**: [DESIGN_SYSTEM.md](../DESIGN_SYSTEM.md)

#### Tasks

**RED: Write Failing Tests First**
- [ ] **Test 6.1**: ProjectCard 컴포넌트 테스트
  - File: `__tests__/unit/presentation/components/ProjectCard.test.tsx`

**GREEN: Implement to Make Tests Pass**

**Home Page:**
- [ ] **Task 6.2**: 홈페이지 (/)
  - File: `app/page.tsx`
  - Design Spec:
    ```
    ┌─────────────────────────────────────────────┐
    │  Header                                     │
    ├─────────────────────────────────────────────┤
    │                                             │
    │  Hero Section                               │
    │  ─────────────────────────────────────────  │
    │  Hi, I'm [Name]                             │
    │  (H1, Serif, large)                         │
    │                                             │
    │  A brief introduction about yourself        │
    │  and what you do. Keep it simple.           │
    │  (Body text, max 2-3 lines)                 │
    │                                             │
    ├─────────────────────────────────────────────┤
    │                                             │
    │  Recent Posts                               │
    │  (H2, Serif)                                │
    │  ─────────────────────────────────────────  │
    │  [PostCard - compact version] x 5           │
    │                                             │
    │  View all posts →                           │
    │                                             │
    ├─────────────────────────────────────────────┤
    │                                             │
    │  Featured Projects                          │
    │  (H2, Serif)                                │
    │  ─────────────────────────────────────────  │
    │  ┌────────┐  ┌────────┐  ┌────────┐        │
    │  │Project │  │Project │  │Project │        │
    │  │ Card   │  │ Card   │  │ Card   │        │
    │  └────────┘  └────────┘  └────────┘        │
    │                                             │
    │  View all projects →                        │
    │                                             │
    ├─────────────────────────────────────────────┤
    │  Footer                                     │
    └─────────────────────────────────────────────┘
    ```
    - Hero: centered text, generous padding (96px top/bottom)
    - Sections: 64px gap between sections
    - Animation: fadeInUp with stagger on page load

**Search Page:**
- [ ] **Task 6.3**: 검색 페이지 (/search)
  - File: `app/search/page.tsx`
  - Design Spec:
    - Search input: Large, prominent, auto-focus
    - Results: Same style as blog list (PostCard)
    - Empty state: "No results found" with suggestion
    - Loading: Skeleton matching result layout

**Project Pages:**
- [ ] **Task 6.4**: 프로젝트 목록 (/projects)
  - File: `app/projects/page.tsx`
  - Design Spec:
    - Grid layout: 1 column (mobile), 2 columns (tablet), 3 columns (desktop)
    - Gap: 32px
    - Container: max-width 1024px

- [ ] **Task 6.5**: ProjectCard 컴포넌트
  - File: `src/presentation/components/project/ProjectCard.tsx`
  - Design Spec:
    ```
    ┌─────────────────────────────────────────┐
    │  ┌───────────────────────────────────┐ │
    │  │                                   │ │
    │  │      Thumbnail Image              │ │
    │  │      (aspect-ratio: 16/9)         │ │
    │  │                                   │ │
    │  └───────────────────────────────────┘ │
    │                                         │
    │  Project Title  (H4, font-heading)      │
    │                                         │
    │  Brief description of the project       │
    │  (body-small, text-secondary, 2 lines)  │
    │                                         │
    │  React  TypeScript  Node.js  (pills)    │
    │                                         │
    │  [Demo →]  [GitHub →]  (text links)     │
    └─────────────────────────────────────────┘
    ```
    - Image: rounded 8px, hover scale 1.02 + shadow
    - Hover: subtle translateY(-2px)
    - Animation: fadeInUp with stagger

- [ ] **Task 6.6**: TechStack 컴포넌트
  - File: `src/presentation/components/project/TechStack.tsx`
  - Design Spec:
    - Pill style: border, rounded-full, small text
    - Colors: neutral (not colored per tech)
    - Gap: 8px

- [ ] **Task 6.7**: 프로젝트 상세 (/projects/[slug])
  - File: `app/projects/[slug]/page.tsx`
  - Design Spec:
    - Hero: Large thumbnail image (full-width or contained)
    - Title: H1, Serif
    - Description: Body text
    - Tech stack: Pill badges
    - Links: Primary button (Demo), Secondary button (GitHub)
    - Content: Markdown rendered (if any)
    - Image gallery (optional): Grid or carousel

**About Page:**
- [ ] **Task 6.8**: About 페이지 (/about)
  - File: `app/about/page.tsx`
  - Design Spec:
    - Profile section: Optional photo + name + title
    - Bio: Prose styling, max-width 70ch
    - Skills/Experience: Simple list or timeline
    - Contact: Email, social links
    - Tone: Personal, friendly, editorial

**404 Page:**
- [ ] **Task 6.9**: 404 페이지
  - File: `app/not-found.tsx`
  - Design Spec:
    - Large "404" (Serif, bold)
    - Message: "Page not found"
    - Suggestion: Link to home or search
    - Minimal, centered layout

**REFACTOR: Clean Up Code**
- [ ] **Task 6.10**: 페이지 간 컴포넌트 재사용 최적화, 일관된 spacing

#### Quality Gate

**Build & Tests**:
- [ ] 모든 페이지 테스트 통과
- [ ] `npm run build` 성공

**Validation Commands**:
```bash
npm test
npm run build
```

**Manual Test Checklist**:
- [ ] 홈페이지 정상 표시
- [ ] 검색 동작
- [ ] 프로젝트 목록/상세 동작
- [ ] About 페이지 표시
- [ ] 404 페이지 표시

---

### Phase 7: SEO, Responsive & Deployment
**Goal**: SEO 최적화, 반응형 완성, 배포 준비
**Status**: Pending

#### Tasks

**GREEN: Implement**
- [ ] **Task 7.1**: 메타데이터 설정
  - File: `app/layout.tsx` - 기본 메타데이터
  - 각 페이지별 동적 메타데이터 (generateMetadata)

- [ ] **Task 7.2**: Open Graph & Twitter Card
  - 동적 OG 이미지 생성 또는 정적 이미지

- [ ] **Task 7.3**: Static Generation 설정
  - generateStaticParams for blog posts
  - generateStaticParams for projects
  - ISR 설정 (revalidate)

- [ ] **Task 7.4**: sitemap.xml & robots.txt
  - File: `app/sitemap.ts`
  - File: `app/robots.ts`

- [ ] **Task 7.5**: 반응형 디자인 완성
  - 모바일 네비게이션 최적화
  - 글 목록/상세 반응형
  - 프로젝트 카드 반응형

- [ ] **Task 7.6**: Docker 설정
  - File: `Dockerfile`
  - File: `docker-compose.yml`

- [ ] **Task 7.7**: 환경 변수 정리
  - File: `.env.example`

**REFACTOR: Optimization**
- [ ] **Task 7.8**: Lighthouse 성능 최적화
  - 이미지 최적화 (next/image)
  - 번들 사이즈 분석
  - Core Web Vitals 개선

#### Quality Gate

**Build & Tests**:
- [ ] `npm run build` 성공
- [ ] Lighthouse 점수 90+
- [ ] Docker 빌드 성공

**Validation Commands**:
```bash
npm run build
docker build -t blog-public .
npx lighthouse http://localhost:3000 --output=json
```

**Manual Test Checklist**:
- [ ] 모든 페이지 반응형 확인 (모바일/태블릿/데스크톱)
- [ ] 다크모드 전체 페이지 확인
- [ ] SEO 메타데이터 확인 (개발자 도구)
- [ ] sitemap.xml 접근 가능
- [ ] Docker 컨테이너 정상 실행

---

## Risk Assessment

| Risk | Probability | Impact | Mitigation Strategy |
|------|-------------|--------|---------------------|
| Backend API 불안정 | Medium | High | MSW로 mock server 구성, 에러 바운더리 |
| Shiki 번들 사이즈 | Low | Medium | 동적 import, 필요한 언어만 로드 |
| Giscus 설정 오류 | Low | Low | 문서 참고하여 사전 설정 확인 |
| Next.js 14 호환성 | Low | Medium | 공식 문서 및 GitHub issues 확인 |

---

## Rollback Strategy

### If Phase 1 Fails
- 프로젝트 디렉토리 삭제 후 재시작
- Git reset to initial commit

### If Phase 2-3 Fails
- Git reset to previous phase commit
- 실패한 Use Case/Repository만 재구현

### If Phase 4-6 Fails
- 해당 페이지/컴포넌트만 롤백
- 기존 동작하는 버전으로 복원

### If Phase 7 Fails
- SEO/최적화 변경 사항만 롤백
- Docker 설정 제거 후 기본 배포

---

## Progress Tracking

### Completion Status
- **Phase 1**: ✅ 100% - Project Initialization & Clean Architecture Foundation
- **Phase 2**: ✅ 100% - Domain Layer & Application Layer
- **Phase 3**: ✅ 100% - Infrastructure Layer (API Integration)
- **Phase 4**: ✅ 100% - Layout & Common Components (Design System)
- **Phase 5**: ⏳ 0%
- **Phase 6**: ⏳ 0%
- **Phase 7**: ⏳ 0%

**Overall Progress**: 57% complete (4/7 phases)

---

## Notes & Learnings

### Implementation Notes
- **Phase 1** (2026-01-01): Next.js 14 프로젝트 생성, 클린 아키텍처 디렉토리 구조 설정, Domain Entities 정의, 47개 단위 테스트 작성
- **Phase 2** (2026-01-01): Repository 인터페이스 정의, DTOs 구현, Use Cases 구현 (Posts, Projects, Categories, Tags), 83개 테스트 통과
- **Phase 3** (2026-01-01): API Client 구현 (axios), Repository 구현체, TanStack Query 훅, QueryProvider 설정, 105개 테스트 통과
- **Phase 4** (2026-01-01): ThemeProvider 구현, Header/Footer 레이아웃, 공통 컴포넌트 (ThemeToggle, Pagination, Tag, SearchBar, Skeleton), Root Layout 구성

### Blockers Encountered
- TypeScript tsc 모듈 오류 → node_modules 재설치로 해결
- CSS @import 순서 경고 → Google Fonts import를 tailwindcss 앞으로 이동

### Improvements for Future Plans
- (완료 후 회고)

---

## References

### Documentation
- [Next.js 14 Docs](https://nextjs.org/docs)
- [TanStack Query Docs](https://tanstack.com/query/latest)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Giscus](https://giscus.app)
- [Shiki](https://shiki.matsu.io)

### Project Docs
- [PROJECT.md](../PROJECT.md)
- [TASKS.md](../TASKS.md)

---

## Final Checklist

**Before marking plan as COMPLETE**:
- [ ] All phases completed with quality gates passed
- [ ] Full integration testing performed
- [ ] Documentation updated
- [ ] Performance benchmarks meet targets (Lighthouse 90+)
- [ ] Security review completed
- [ ] Accessibility requirements met
- [ ] All pages work in dark/light mode
- [ ] Responsive design verified
- [ ] Docker deployment tested

---

**Plan Status**: 🔄 In Progress
**Next Action**: Phase 5 시작 - Blog Pages (Design System 적용)
**Blocked By**: None
