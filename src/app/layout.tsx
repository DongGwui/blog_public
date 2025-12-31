import type { Metadata } from 'next';

import './globals.css';

import { ThemeProvider, QueryProvider } from '@/presentation/providers';
import { Header, Footer } from '@/presentation/components/layout';

export const metadata: Metadata = {
  title: {
    default: 'Blog',
    template: '%s | Blog',
  },
  description: '개발 블로그 - 기술, 프로젝트, 그리고 생각을 공유합니다.',
  keywords: ['블로그', '개발', '프로그래밍', 'TypeScript', 'React', 'Next.js'],
  authors: [{ name: 'Blog Author' }],
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    siteName: 'Blog',
  },
  twitter: {
    card: 'summary_large_image',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-screen flex flex-col antialiased">
        <ThemeProvider defaultTheme="system">
          <QueryProvider>
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
