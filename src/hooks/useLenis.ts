'use client';

import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

export const useLenis = () => {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Detectar se é mobile
    const isMobile = window.innerWidth <= 768 || 'ontouchstart' in window;
    
    const lenis = new Lenis({
      duration: isMobile ? 0.8 : 1.2, // Mais rápido no mobile
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: isMobile ? 2.5 : 1, // Mais sensível no touch
      wheelMultiplier: isMobile ? 1 : 1,
      infinite: false,
      gestureOrientation: 'vertical'
    });

    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return lenisRef.current;
};