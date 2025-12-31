'use client';

/**
 * Query Provider
 * TanStack Query 설정 및 Provider
 */

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState, type ReactNode } from 'react';

export interface QueryProviderProps {
  children: ReactNode;
}

export function QueryProvider({ children }: QueryProviderProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // 5분간 데이터 신선도 유지
            staleTime: 1000 * 60 * 5,
            // 30분간 캐시 유지
            gcTime: 1000 * 60 * 30,
            // 윈도우 포커스 시 리페치 비활성화
            refetchOnWindowFocus: false,
            // 재연결 시 리페치 비활성화
            refetchOnReconnect: false,
            // 실패 시 3번 재시도
            retry: 3,
            // 재시도 딜레이 (지수 백오프)
            retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
          },
          mutations: {
            // 뮤테이션 실패 시 재시도 없음
            retry: false,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {process.env.NODE_ENV === 'development' && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </QueryClientProvider>
  );
}
