# Design System: Editorial Minimalist

## Design Philosophy

**"Less, but better"** - 매거진/에디토리얼 스타일의 세련된 미니멀리즘. 콘텐츠가 주인공이 되고, 디자인은 콘텐츠를 돋보이게 하는 역할.

### Core Principles
1. **Content First**: 글이 주인공, UI는 배경
2. **Generous Whitespace**: 넉넉한 여백으로 숨 쉬는 레이아웃
3. **Typography as Design**: 타이포그래피가 곧 디자인
4. **Subtle Interactions**: 과하지 않은 미세한 인터랙션
5. **Timeless over Trendy**: 유행을 타지 않는 클래식한 아름다움

---

## Typography

### Font Stack

```css
:root {
  /* Heading: Cormorant Garamond - 우아한 Serif */
  --font-heading: 'Cormorant Garamond', 'Noto Serif KR', Georgia, serif;

  /* Body: Source Sans 3 - 가독성 좋은 Sans-serif */
  --font-body: 'Source Sans 3', 'Pretendard', -apple-system, sans-serif;

  /* Code: JetBrains Mono - 개발자 친화적 Monospace */
  --font-mono: 'JetBrains Mono', 'Fira Code', monospace;
}
```

### Font Loading (Google Fonts)
```
Cormorant Garamond: 400, 500, 600, 700
Source Sans 3: 400, 500, 600
JetBrains Mono: 400, 500
Noto Serif KR: 400, 700 (한글 Serif)
Pretendard: 400, 500, 600 (한글 Sans)
```

### Type Scale

| Element | Desktop | Mobile | Weight | Line Height |
|---------|---------|--------|--------|-------------|
| **H1 (Page Title)** | 3.5rem (56px) | 2.5rem (40px) | 600 | 1.1 |
| **H2 (Section)** | 2.25rem (36px) | 1.75rem (28px) | 600 | 1.2 |
| **H3 (Subsection)** | 1.5rem (24px) | 1.25rem (20px) | 500 | 1.3 |
| **H4** | 1.25rem (20px) | 1.125rem (18px) | 500 | 1.4 |
| **Body** | 1.125rem (18px) | 1rem (16px) | 400 | 1.75 |
| **Body Small** | 0.875rem (14px) | 0.875rem (14px) | 400 | 1.6 |
| **Caption** | 0.75rem (12px) | 0.75rem (12px) | 400 | 1.5 |
| **Code** | 0.9rem (14.4px) | 0.85rem (13.6px) | 400 | 1.6 |

### Typography Guidelines
- **Headings**: Cormorant Garamond, letter-spacing: -0.02em
- **Body Text**: Source Sans 3, max-width: 70ch for optimal readability
- **Korean Text**: 한글은 Noto Serif KR / Pretendard 자동 적용
- **Code**: JetBrains Mono with ligatures enabled

---

## Color Palette

### Light Mode

```css
:root {
  /* Background */
  --bg-primary: #FAFAF9;      /* 따뜻한 화이트 */
  --bg-secondary: #F5F5F4;    /* 약간 어두운 배경 */
  --bg-tertiary: #EEEEEC;     /* 카드, 코드 블록 배경 */

  /* Text */
  --text-primary: #1C1917;    /* 거의 검정 */
  --text-secondary: #57534E;  /* 회색 텍스트 */
  --text-tertiary: #A8A29E;   /* 연한 회색 */

  /* Accent: Deep Teal (차분하고 신뢰감 있는 컬러) */
  --accent-primary: #0D7377;  /* 메인 악센트 */
  --accent-hover: #0A5C5F;    /* 호버 상태 */
  --accent-light: #E6F3F3;    /* 연한 악센트 배경 */

  /* Borders */
  --border-primary: #E7E5E4;
  --border-secondary: #D6D3D1;

  /* Semantic */
  --success: #059669;
  --warning: #D97706;
  --error: #DC2626;

  /* Code Syntax (Light) */
  --code-bg: #F8F8F8;
  --code-keyword: #7C3AED;
  --code-string: #059669;
  --code-comment: #9CA3AF;
  --code-function: #0D7377;
}
```

### Dark Mode

```css
[data-theme="dark"] {
  /* Background */
  --bg-primary: #0F0F0F;      /* 깊은 검정 */
  --bg-secondary: #171717;    /* 약간 밝은 배경 */
  --bg-tertiary: #262626;     /* 카드, 코드 블록 배경 */

  /* Text */
  --text-primary: #FAFAF9;    /* 거의 흰색 */
  --text-secondary: #A8A29E;  /* 회색 텍스트 */
  --text-tertiary: #78716C;   /* 어두운 회색 */

  /* Accent: Soft Teal (다크모드에서 더 밝게) */
  --accent-primary: #14B8A6;
  --accent-hover: #2DD4BF;
  --accent-light: #134E4A;

  /* Borders */
  --border-primary: #262626;
  --border-secondary: #404040;

  /* Code Syntax (Dark) */
  --code-bg: #1E1E1E;
  --code-keyword: #C084FC;
  --code-string: #34D399;
  --code-comment: #6B7280;
  --code-function: #14B8A6;
}
```

---

## Spacing System

### Base Unit: 4px

```css
:root {
  --space-1: 0.25rem;   /* 4px */
  --space-2: 0.5rem;    /* 8px */
  --space-3: 0.75rem;   /* 12px */
  --space-4: 1rem;      /* 16px */
  --space-5: 1.25rem;   /* 20px */
  --space-6: 1.5rem;    /* 24px */
  --space-8: 2rem;      /* 32px */
  --space-10: 2.5rem;   /* 40px */
  --space-12: 3rem;     /* 48px */
  --space-16: 4rem;     /* 64px */
  --space-20: 5rem;     /* 80px */
  --space-24: 6rem;     /* 96px */
}
```

### Layout Spacing

| Element | Value |
|---------|-------|
| Page padding (desktop) | 64px (space-16) |
| Page padding (mobile) | 20px (space-5) |
| Section gap | 96px (space-24) |
| Card padding | 24px (space-6) |
| List item gap | 32px (space-8) |
| Inline element gap | 8px (space-2) |

---

## Layout & Grid

### Container Widths

```css
:root {
  --container-sm: 640px;   /* 좁은 텍스트 */
  --container-md: 768px;   /* 본문 콘텐츠 */
  --container-lg: 1024px;  /* 넓은 콘텐츠 */
  --container-xl: 1280px;  /* 전체 레이아웃 */
}
```

### Page Layouts

#### Home Page
```
┌─────────────────────────────────────────────┐
│  Header (fixed, blur backdrop)              │
├─────────────────────────────────────────────┤
│                                             │
│  Hero Section                               │
│  - 짧은 소개                                │
│                                             │
├─────────────────────────────────────────────┤
│                                             │
│  Recent Posts (3-5개)                       │
│  ┌─────────────────────────────────────┐   │
│  │ Post Card (horizontal)              │   │
│  └─────────────────────────────────────┘   │
│                                             │
├─────────────────────────────────────────────┤
│                                             │
│  Featured Projects (2-3개)                  │
│  ┌────────┐  ┌────────┐  ┌────────┐        │
│  │ Card   │  │ Card   │  │ Card   │        │
│  └────────┘  └────────┘  └────────┘        │
│                                             │
├─────────────────────────────────────────────┤
│  Footer                                     │
└─────────────────────────────────────────────┘
```

#### Blog List (/blog)
```
┌─────────────────────────────────────────────┐
│  Header                                     │
├─────────────────────────────────────────────┤
│                                             │
│  Page Title: "Blog"                         │
│  Optional: Category/Tag filters             │
│                                             │
├─────────────────────────────────────────────┤
│                                             │
│  Post List                                  │
│  ┌─────────────────────────────────────┐   │
│  │ Date | Title (large, serif)         │   │
│  │ Excerpt...                           │   │
│  │ Tags                                 │   │
│  └─────────────────────────────────────┘   │
│  ─────────── divider line ───────────────  │
│  ┌─────────────────────────────────────┐   │
│  │ Next Post...                        │   │
│  └─────────────────────────────────────┘   │
│                                             │
├─────────────────────────────────────────────┤
│  Pagination                                 │
├─────────────────────────────────────────────┤
│  Footer                                     │
└─────────────────────────────────────────────┘
```

#### Blog Post Detail (/blog/[slug])
```
┌─────────────────────────────────────────────┐
│  Header                                     │
├─────────────────────────────────────────────┤
│                                             │
│  ┌─────────────────┬─────────────────────┐ │
│  │                 │   TOC (sticky)      │ │
│  │  Post Title     │   - Heading 1       │ │
│  │  (large serif)  │   - Heading 2       │ │
│  │                 │   - Heading 3       │ │
│  │  Meta info      │                     │ │
│  │  Date | 읽기시간 │                     │ │
│  │                 │                     │ │
│  │  ─────────────  │                     │ │
│  │                 │                     │ │
│  │  Content        │                     │ │
│  │  (max-width:    │                     │ │
│  │   70ch)         │                     │ │
│  │                 │                     │ │
│  │  ...            │                     │ │
│  │                 │                     │ │
│  └─────────────────┴─────────────────────┘ │
│                                             │
├─────────────────────────────────────────────┤
│  Post Navigation (이전/다음)                │
├─────────────────────────────────────────────┤
│  Comments (Giscus)                          │
├─────────────────────────────────────────────┤
│  Footer                                     │
└─────────────────────────────────────────────┘
```

---

## Components

### Header

```
┌─────────────────────────────────────────────┐
│  Logo          Nav Links          Theme     │
│  (serif)   Blog  Projects  About   Toggle   │
└─────────────────────────────────────────────┘
```

**Specifications:**
- Height: 64px (desktop), 56px (mobile)
- Background: `bg-primary` with blur backdrop (`backdrop-blur-md`)
- Position: `sticky top-0`
- Border: 1px bottom border, subtle
- Logo: Site name in Cormorant Garamond, weight 600
- Nav links: hover underline animation (slide in from left)

### Post Card (List View)

```
┌─────────────────────────────────────────────┐
│  2024.01.15                                 │
│                                             │
│  Title of the Blog Post                     │
│  (large, serif, hover: accent color)        │
│                                             │
│  A brief excerpt of the post content that   │
│  gives readers a preview of what to         │
│  expect...                                  │
│                                             │
│  #tag1  #tag2  #tag3        5 min read     │
└─────────────────────────────────────────────┘
```

**Specifications:**
- Date: Caption size, text-tertiary
- Title: H3 size, font-heading, hover transition to accent
- Excerpt: Body size, text-secondary, max 2-3 lines
- Tags: Small size, text-tertiary, hover: text-primary
- Divider: 1px border-primary between cards

### Project Card

```
┌─────────────────────────────────────────────┐
│  ┌───────────────────────────────────────┐ │
│  │                                       │ │
│  │         Thumbnail Image               │ │
│  │         (aspect-ratio: 16/9)          │ │
│  │                                       │ │
│  └───────────────────────────────────────┘ │
│                                             │
│  Project Title                              │
│                                             │
│  Brief description of the project...        │
│                                             │
│  Tech Stack: React, TypeScript, Node.js     │
│                                             │
│  [Demo]  [GitHub]                           │
└─────────────────────────────────────────────┘
```

**Specifications:**
- Image: Rounded corners (8px), subtle shadow on hover
- Title: H4 size, font-heading
- Description: Body small, text-secondary
- Tech stack: Pills/tags style
- Links: Text buttons with arrow icon

### Tag / Category Badge

```css
/* Tag (작은 라벨) */
.tag {
  font-size: var(--text-caption);
  color: var(--text-tertiary);
  padding: var(--space-1) var(--space-2);
  border-radius: 4px;
  transition: color 0.2s;
}
.tag:hover {
  color: var(--text-primary);
}

/* Category (더 눈에 띄는 스타일) */
.category {
  font-size: var(--text-small);
  color: var(--accent-primary);
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
```

### Button Styles

```css
/* Primary Button */
.btn-primary {
  background: var(--text-primary);
  color: var(--bg-primary);
  padding: var(--space-3) var(--space-6);
  font-weight: 500;
  border-radius: 4px;
  transition: opacity 0.2s;
}
.btn-primary:hover {
  opacity: 0.85;
}

/* Secondary Button (outline) */
.btn-secondary {
  background: transparent;
  color: var(--text-primary);
  border: 1px solid var(--border-secondary);
  padding: var(--space-3) var(--space-6);
  font-weight: 500;
  border-radius: 4px;
  transition: border-color 0.2s;
}
.btn-secondary:hover {
  border-color: var(--text-primary);
}

/* Text Button (link style) */
.btn-text {
  color: var(--text-primary);
  font-weight: 500;
  text-decoration: underline;
  text-underline-offset: 4px;
}
```

### Code Block

```
┌─────────────────────────────────────────────┐
│  filename.ts                          Copy  │
├─────────────────────────────────────────────┤
│                                             │
│  const greeting = "Hello, World!";          │
│  console.log(greeting);                     │
│                                             │
└─────────────────────────────────────────────┘
```

**Specifications:**
- Background: `--code-bg`
- Border-radius: 8px
- Padding: 24px
- Header: Filename + Copy button, border-bottom
- Font: JetBrains Mono with ligatures
- Syntax highlighting: Shiki with custom theme

### Pagination

```
             ← Previous    1  2  [3]  4  5    Next →
```

**Specifications:**
- Simple text-based navigation
- Current page: Bold, no underline
- Other pages: Regular weight, hover underline
- Gap between numbers: 16px

---

## Motion & Animations

### Principles
- **Subtle**: 과하지 않게, 자연스럽게
- **Purposeful**: 의미 있는 곳에만
- **Fast**: 200-300ms 이내

### Transitions

```css
:root {
  --transition-fast: 150ms ease;
  --transition-base: 200ms ease;
  --transition-slow: 300ms ease;
}
```

### Key Animations

#### Page Load
```css
/* Fade in + slight slide up */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.page-content {
  animation: fadeInUp 0.4s ease-out;
}
```

#### Link Hover (Underline Slide)
```css
.nav-link {
  position: relative;
}
.nav-link::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 1px;
  background: currentColor;
  transition: width var(--transition-base);
}
.nav-link:hover::after {
  width: 100%;
}
```

#### Card Hover
```css
.card {
  transition: transform var(--transition-base),
              box-shadow var(--transition-base);
}
.card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
}
```

#### Theme Toggle
- Smooth color transition: `transition: background 0.3s, color 0.3s`
- Icon rotate: 180deg rotation on toggle

---

## Responsive Breakpoints

```css
/* Tailwind Default Breakpoints */
--breakpoint-sm: 640px;   /* Mobile landscape */
--breakpoint-md: 768px;   /* Tablet */
--breakpoint-lg: 1024px;  /* Desktop */
--breakpoint-xl: 1280px;  /* Large desktop */
```

### Mobile First Approach
- Base styles: Mobile
- `md:` prefix: Tablet and above
- `lg:` prefix: Desktop and above

### Key Responsive Changes

| Element | Mobile | Tablet | Desktop |
|---------|--------|--------|---------|
| Header | Hamburger menu | Full nav | Full nav |
| Post list | Single column | Single column | Single column |
| Project grid | 1 column | 2 columns | 3 columns |
| TOC | Hidden | Hidden | Sticky sidebar |
| Page padding | 20px | 40px | 64px |

---

## Iconography

### Icon Library
**Lucide Icons** (Recommended)
- Lightweight
- Consistent stroke width
- React component support

### Common Icons
```
- Menu (hamburger): Menu
- Close: X
- Sun (light mode): Sun
- Moon (dark mode): Moon
- Search: Search
- Arrow right: ArrowRight
- External link: ExternalLink
- GitHub: Github
- Calendar: Calendar
- Clock: Clock
- Tag: Tag
- Folder (category): Folder
```

### Icon Specifications
- Size: 20px (default), 24px (header)
- Stroke width: 1.5px
- Color: currentColor (inherits text color)

---

## Accessibility

### Color Contrast
- All text meets WCAG AA standard (4.5:1 for body, 3:1 for large text)
- Interactive elements have visible focus states

### Focus States
```css
:focus-visible {
  outline: 2px solid var(--accent-primary);
  outline-offset: 2px;
}
```

### Keyboard Navigation
- All interactive elements are keyboard accessible
- Skip to main content link
- Logical tab order

### Motion
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Implementation Notes

### Tailwind CSS Configuration

```javascript
// tailwind.config.js
module.exports = {
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      fontFamily: {
        heading: ['Cormorant Garamond', 'Noto Serif KR', 'Georgia', 'serif'],
        body: ['Source Sans 3', 'Pretendard', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      colors: {
        // Custom colors defined in CSS variables
      },
      typography: {
        // Prose styling for markdown content
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
```

### Google Fonts Import

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&family=Noto+Serif+KR:wght@400;700&family=Source+Sans+3:wght@400;500;600&display=swap" rel="stylesheet">
```

---

## Visual Reference

### Mood Board Keywords
- Editorial magazine layouts
- Swiss typography
- Generous whitespace
- Serif elegance meets digital clarity
- Timeless, not trendy
- Content-focused reading experience

### Inspiration References
- [iA Writer](https://ia.net/writer) - Focus on content
- [Medium](https://medium.com) - Reading experience
- [Stripe Blog](https://stripe.com/blog) - Editorial quality
- [New Yorker](https://newyorker.com) - Magazine typography
