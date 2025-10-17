'use client';

import { useEffect } from 'react';
import { useLenis } from '@/hooks/useLenis';

interface SmoothScrollWrapperProps {
  children: React.ReactNode;
}

export const SmoothScrollWrapper = ({ children }: SmoothScrollWrapperProps) => {
  useLenis();

  return <>{children}</>;
};