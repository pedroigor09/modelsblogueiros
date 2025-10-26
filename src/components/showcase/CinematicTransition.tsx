'use client';

import React, { useEffect, useRef, useState } from 'react';

const CinematicTransition = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    if (!containerRef.current) return;

    const handleScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      const elementTop = rect.top;
      const elementHeight = rect.height;
      
      let progress = 0;
      
      
      if (elementTop <= windowHeight * 0.5 && elementTop >= -elementHeight * 0.5) {
        const animationZoneStart = windowHeight * 0.5;
        const animationZoneEnd = -elementHeight * 0.5;
        const totalAnimationDistance = animationZoneStart - animationZoneEnd;
        
        const currentPosition = animationZoneStart - elementTop;
        progress = currentPosition / totalAnimationDistance;
        
        progress = progress * progress * (3 - 2 * progress); // smoothstep function
      } else if (elementTop < -elementHeight * 0.5) {
        progress = 1;
      } else {
        progress = 0;
      }
      
      setScrollProgress(Math.min(1, Math.max(0, progress)));
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Chamar uma vez para inicializar

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen bg-white overflow-hidden flex items-center justify-center"
      style={{ minHeight: '100vh' }}
    >
      {/* Texto poético inicial */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center z-20"
        style={{
          opacity: Math.pow(1 - scrollProgress, 2), // Fade out mais suave
          transform: `translateY(${-scrollProgress * 20}px) scale(${1 + scrollProgress * 0.05})`,
          filter: `blur(${scrollProgress * 2}px)`, // Blur cinematográfico
          transition: 'all 0.1s ease-out'
        }}
      >
        <div className="text-center text-gray-900 max-w-4xl px-8">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-light mb-8 leading-relaxed text-gray-800">
            <span className="block mb-6">Cada momento</span>
            <span className="block text-red-600 italic text-3xl md:text-4xl lg:text-5xl mb-6">
              uma identidade
            </span>
            <span className="block mb-6">Cada olhar</span>
            <span className="block text-red-600 italic text-3xl md:text-4xl lg:text-5xl">
              uma história
            </span>
          </h2>
          
          <div className="w-32 h-1 bg-red-400 mx-auto mt-8" />
        </div>
      </div>

      {/* Texto de revelação final */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center z-30"
        style={{
          opacity: Math.pow(scrollProgress, 1.5), // Fade in mais dramático
          transform: `translateY(${30 - scrollProgress * 30}px) scale(${0.85 + scrollProgress * 0.15})`,
          filter: `blur(${(1 - scrollProgress) * 3}px)`, // Blur reverso
          transition: 'all 0.1s ease-out'
        }}
      >
        <div className="text-center">
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-gray-900 mb-6 tracking-wider leading-none">
            <span className="text-red-600">DESCUBRA</span>
          </h1>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-light text-gray-700 tracking-[0.15em] mb-4">
            CADA PERSONALIDADE
          </h2>
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-light text-gray-600 tracking-[0.1em]">
            CADA ESTILO ÚNICO
          </h3>
          
          <div className="w-40 h-1 bg-red-500 mx-auto mt-8" />
        </div>
      </div>
    </div>
  );
};

export default CinematicTransition;