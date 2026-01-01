import type { Metadata } from 'next';

import './globals.css';

import { ThemeProvider, QueryProvider } from '@/presentation/providers';
import { Header, Footer } from '@/presentation/components/layout';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://blog.example.com';
const siteName = process.env.NEXT_PUBLIC_SITE_NAME || 'Blog';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteName,
    template: `%s | ${siteName}`,
  },
  description: '개발 블로그 - 기술, 프로젝트, 그리고 생각을 공유합니다.',
  keywords: ['블로그', '개발', '프로그래밍', 'TypeScript', 'React', 'Next.js'],
  authors: [{ name: 'Blog Author' }],
  creator: 'Blog Author',
  publisher: siteName,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: siteUrl,
    siteName: siteName,
    title: siteName,
    description: '개발 블로그 - 기술, 프로젝트, 그리고 생각을 공유합니다.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: siteName,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteName,
    description: '개발 블로그 - 기술, 프로젝트, 그리고 생각을 공유합니다.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // google: 'your-google-verification-code',
    // naver: 'your-naver-verification-code',
  },
  alternates: {
    canonical: siteUrl,
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
