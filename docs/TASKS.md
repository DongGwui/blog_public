# Blog Public 작업 체크리스트

## Phase 1: 프로젝트 초기화

### 기본 설정
- [ ] Next.js 14 프로젝트 생성 (App Router)
- [ ] TypeScript 설정
- [ ] Tailwind CSS 설정
- [ ] 디렉토리 구조 생성
- [ ] ESLint, Prettier 설정

### 의존성 설치
- [ ] @tanstack/react-query
- [ ] axios
- [ ] @giscus/react
- [ ] shiki (코드 하이라이팅)

### 환경 설정
- [ ] .env.local 생성
- [ ] next.config.js 설정
- [ ] tailwind.config.js 설정

---

## Phase 2: 레이아웃 & 공통 컴포넌트

### 레이아웃
- [ ] app/layout.tsx (루트 레이아웃)
- [ ] Header 컴포넌트
- [ ] Footer 컴포넌트
- [ ] Navigation 컴포넌트

### 다크모드
- [ ] useTheme 훅 구현
- [ ] ThemeToggle 컴포넌트
- [ ] 시스템 테마 감지

### 공통 컴포넌트
- [ ] Pagination 컴포넌트
- [ ] LoadingSkeleton 컴포넌트
- [ ] Tag 컴포넌트
- [ ] Category 컴포넌트
- [ ] SearchBar 컴포넌트

---

## Phase 3: API 연동

### 설정
- [ ] lib/api.ts (axios 인스턴스)
- [ ] types/index.ts (타입 정의)
- [ ] lib/queries.ts (TanStack Query 훅)

### API 함수
- [ ] getPosts (글 목록)
- [ ] getPost (글 상세)
- [ ] searchPosts (검색)
- [ ] incrementView (조회수)
- [ ] getCategories
- [ ] getTags
- [ ] getProjects
- [ ] getProject

---

## Phase 4: 블로그 페이지

### 글 목록 (/blog)
- [ ] page.tsx
- [ ] PostCard 컴포넌트
- [ ] 페이지네이션 연동
- [ ] 로딩 상태 처리
- [ ] 빈 상태 처리

### 글 상세 (/blog/[slug])
- [ ] page.tsx
- [ ] PostHeader 컴포넌트 (제목, 날짜, 읽기 시간)
- [ ] PostContent 컴포넌트 (마크다운 렌더링)
- [ ] 코드 하이라이팅 (Shiki)
- [ ] PostTOC 컴포넌트 (목차)
- [ ] PostNav 컴포넌트 (이전/다음 글)
- [ ] 조회수 증가 호출
- [ ] Comments 컴포넌트 (Giscus)

### 카테고리별 (/blog/category/[slug])
- [ ] page.tsx
- [ ] 카테고리 정보 표시
- [ ] 필터링된 글 목록

### 태그별 (/blog/tag/[slug])
- [ ] page.tsx
- [ ] 태그 정보 표시
- [ ] 필터링된 글 목록

---

## Phase 5: 홈 & 기타 페이지

### 홈 (/)
- [ ] page.tsx
- [ ] 최근 글 섹션
- [ ] 대표 프로젝트 섹션
- [ ] 간단한 소개

### 검색 (/search)
- [ ] page.tsx
- [ ] 검색 결과 표시
- [ ] 검색어 하이라이팅 (선택)
- [ ] 페이지네이션

### About (/about)
- [ ] page.tsx
- [ ] 자기소개 내용
- [ ] 기술 스택 표시

### 404 페이지
- [ ] not-found.tsx

---

## Phase 6: 프로젝트 페이지

### 프로젝트 목록 (/projects)
- [ ] page.tsx
- [ ] ProjectCard 컴포넌트
- [ ] TechStack 컴포넌트

### 프로젝트 상세 (/projects/[slug])
- [ ] page.tsx
- [ ] 상세 정보 표시
- [ ] 이미지 갤러리 (선택)
- [ ] 링크 (데모, GitHub)

---

## Phase 7: SEO & 최적화

### 메타데이터
- [ ] 기본 메타데이터 설정
- [ ] 동적 메타데이터 (글, 프로젝트)
- [ ] Open Graph 이미지
- [ ] Twitter Card

### 정적 생성
- [ ] generateStaticParams (글)
- [ ] generateStaticParams (프로젝트)
- [ ] ISR 설정

### 기타
- [ ] sitemap.xml 생성
- [ ] robots.txt
- [ ] RSS 피드 (선택)

---

## Phase 8: 반응형 & 마무리

### 반응형 디자인
- [ ] 모바일 네비게이션
- [ ] 글 목록 반응형
- [ ] 글 상세 반응형
- [ ] 프로젝트 목록 반응형

### 최종 점검
- [ ] 모든 페이지 테스트
- [ ] 다크모드 테스트
- [ ] 모바일 테스트
- [ ] 성능 최적화 (Lighthouse)

---

## Phase 9: 배포 준비

### Docker
- [ ] Dockerfile 작성
- [ ] docker-compose.yml (개발용)

### 배포
- [ ] 환경 변수 정리
- [ ] 빌드 테스트
- [ ] Traefik 라벨 설정

---

## 진행 상태

| Phase | 상태 | 예상 기간 |
|-------|------|-----------|
| Phase 1: 초기화 | ⬜ 대기 | 0.5일 |
| Phase 2: 레이아웃 | ⬜ 대기 | 1일 |
| Phase 3: API 연동 | ⬜ 대기 | 0.5일 |
| Phase 4: 블로그 | ⬜ 대기 | 2일 |
| Phase 5: 홈 & 기타 | ⬜ 대기 | 1일 |
| Phase 6: 프로젝트 | ⬜ 대기 | 0.5일 |
| Phase 7: SEO | ⬜ 대기 | 0.5일 |
| Phase 8: 반응형 | ⬜ 대기 | 1일 |
| Phase 9: 배포 | ⬜ 대기 | 0.5일 |

**총 예상: 약 1.5주**

**상태**: ⬜ 대기 | 🔄 진행중 | ✅ 완료
