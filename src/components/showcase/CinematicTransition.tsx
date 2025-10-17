'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

const CinematicTransition = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const curtainRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const revealTextRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top center",
        end: "bottom center",
        scrub: 1.5,
        markers: false
      }
    });

    // Animação da cortina descendo
    tl.to(curtainRef.current, {
      y: 0,
      duration: 1,
      ease: "power2.out"
    })
    // Texto poético aparecendo
    .to(textRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out"
    }, "-=0.5")
    // Partículas aparecendo
    .to(particlesRef.current, {
      opacity: 1,
      duration: 0.6
    }, "-=0.3")
    // Cortina subindo e revelando o texto final
    .to(curtainRef.current, {
      y: "-100%",
      duration: 1,
      ease: "power2.in"
    }, "+=0.5")
    .to(textRef.current, {
      opacity: 0,
      y: -50,
      duration: 0.5
    }, "-=0.8")
    .to(revealTextRef.current, {
      opacity: 1,
      scale: 1,
      duration: 1,
      ease: "back.out(1.7)"
    }, "-=0.5");

    // Animação das partículas flutuantes
    gsap.to(".particle", {
      y: "random(-20, 20)",
      x: "random(-10, 10)",
      rotation: "random(-15, 15)",
      duration: "random(2, 4)",
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
      stagger: {
        amount: 2,
        from: "random"
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen bg-gradient-to-b from-black via-gray-900 to-black overflow-hidden flex items-center justify-center"
    >
      {/* Cortina cinematográfica */}
      <div
        ref={curtainRef}
        className="absolute inset-0 bg-gradient-to-b from-red-900 via-red-800 to-black z-20"
        style={{ transform: 'translateY(-100%)' }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-600/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black to-transparent" />
      </div>

      {/* Partículas flutuantes */}
      <div
        ref={particlesRef}
        className="absolute inset-0 opacity-0 z-10"
      >
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="particle absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      {/* Texto poético inicial */}
      <div
        ref={textRef}
        className="absolute inset-0 flex flex-col items-center justify-center z-30 opacity-0"
        style={{ transform: 'translateY(50px)' }}
      >
        <div className="text-center text-white max-w-4xl px-8">
          <h2 className="text-2xl md:text-4xl lg:text-6xl font-light mb-8 leading-relaxed tracking-wide">
            Cada momento<br />
            <span className="italic text-red-300">uma identidade</span><br />
            Cada olhar<br />
            <span className="italic text-red-300">uma história</span>
          </h2>
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-red-400 to-transparent mx-auto" />
        </div>
      </div>

      {/* Texto de revelação final */}
      <div
        ref={revealTextRef}
        className="absolute inset-0 flex flex-col items-center justify-center z-40 opacity-0"
        style={{ transform: 'scale(0.8)' }}
      >
        <div className="text-center">
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black bg-gradient-to-r from-white via-red-200 to-white bg-clip-text text-transparent mb-4 tracking-wider">
            A VIBE
          </h1>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-light text-white/80 tracking-widest">
            DE CADA UM
          </h2>
          <div className="mt-8 w-32 h-0.5 bg-gradient-to-r from-transparent via-red-400 to-transparent mx-auto" />
        </div>
      </div>

      {/* Spotlight effect */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/50 z-15" />
      
      {/* Film grain effect */}
      <div className="absolute inset-0 opacity-10 z-25">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `
              radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(255,255,255,0.1) 0%, transparent 50%),
              radial-gradient(circle at 40% 80%, rgba(255,255,255,0.1) 0%, transparent 50%)
            `,
            animation: 'grain 0.2s steps(10) infinite'
          }}
        />
      </div>

      <style jsx>{`
        @keyframes grain {
          0%, 100% { transform: translate(0, 0) }
          10% { transform: translate(-5%, -10%) }
          20% { transform: translate(-15%, 5%) }
          30% { transform: translate(7%, -25%) }
          40% { transform: translate(-5%, 25%) }
          50% { transform: translate(-15%, 10%) }
          60% { transform: translate(15%, 0%) }
          70% { transform: translate(0%, 15%) }
          80% { transform: translate(3%, 35%) }
          90% { transform: translate(-10%, 10%) }
        }
        
        .bg-gradient-radial {
          background: radial-gradient(circle at center, var(--tw-gradient-stops));
        }
      `}</style>
    </div>
  );
};

export default CinematicTransition;