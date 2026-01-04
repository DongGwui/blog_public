'use client';

/**
 * ViewCounter Component
 * 페이지 진입 시 조회수를 증가시키는 컴포넌트
 */

import { useEffect, useRef } from 'react';

import { useIncrementView } from '@/presentation/hooks/queries';

export interface ViewCounterProps {
  slug: string;
}

export function ViewCounter({ slug }: ViewCounterProps) {
  const { mutate: incrementView } = useIncrementView();
  const hasIncremented = useRef(false);

  useEffect(() => {
    // 중복 호출 방지
    if (hasIncremented.current) return;
    hasIncremented.current = true;

    incrementView(slug);
  }, [slug, incrementView]);

  // UI를 렌더링하지 않음
  return null;
}
