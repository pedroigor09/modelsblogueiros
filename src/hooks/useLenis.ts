'use client';

import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

export const useLenis = () => {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Detectar se é mobile
    const isMobile = window.innerWidth <= 768 || 'ontouchstart' in window;
    
    const lenis = new Lenis({
      duration: isMobile ? 0.3 : 1.2, // Super rápido no mobile
      easing: (t) => isMobile ? Math.pow(t, 0.5) : Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Easing mais direto no mobile
      touchMultiplier: isMobile ? 6.0 : 1, // Extremamente sensível no touch
      wheelMultiplier: 1,
      infinite: false,
      gestureOrientation: 'vertical',
      smoothWheel: !isMobile, // Desabilitar smooth wheel no mobile
      syncTouch: isMobile, // Sincronizar com touch events no mobile
      lerp: isMobile ? 0.5 : 0.1 // Interpolação mais rápida no mobile
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