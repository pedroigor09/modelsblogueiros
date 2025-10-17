'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const CinematicTransition = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const revealTextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!containerRef.current) return;

    // Registrar ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // Estado inicial explícito
    gsap.set(textRef.current, { 
      opacity: 1,
      y: 0,
      scale: 1 
    });
    gsap.set(revealTextRef.current, { 
      opacity: 0,
      y: 50,
      scale: 0.8 
    });

    // Timeline com ScrollTrigger
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 60%",
        end: "bottom 40%",
        scrub: 1.5,
        markers: false
      }
    });

    // Animação simples: fade out primeiro texto, fade in segundo
    tl.to(textRef.current, {
      opacity: 0,
      y: -30,
      scale: 1.1,
      duration: 1
    })
    .to(revealTextRef.current, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 1
    }, "-=0.5");

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
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
        ref={textRef}
        className="absolute inset-0 flex flex-col items-center justify-center z-20"
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
        ref={revealTextRef}
        className="absolute inset-0 flex flex-col items-center justify-center z-30"
      >
        <div className="text-center">
          <h1 className="text-7xl md:text-9xl lg:text-[10rem] font-black text-gray-900 mb-4 tracking-wider leading-none">
            <span className="text-red-600">EXPLORE</span>
          </h1>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-light text-gray-700 tracking-[0.2em]">
            CADA IDENTIDADE
          </h2>
          
          <div className="w-40 h-1 bg-red-500 mx-auto mt-8" />
        </div>
      </div>
    </div>
  );
};

export default CinematicTransition;