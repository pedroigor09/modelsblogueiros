'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';

interface InstagramStatsProps {
  followers: number;
  primaryColor: string;
  delay?: number;
}

const InstagramStats: React.FC<InstagramStatsProps> = ({ 
  followers, 
  primaryColor, 
  delay = 0 
}) => {
  const [displayCount, setDisplayCount] = useState(0);
  const [isGlitching, setIsGlitching] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const controls = useAnimation();

  // Formatação dos números
  const formatFollowers = (num: number) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(0)}K`;
    }
    return num.toString();
  };

  // Animação do contador
  useEffect(() => {
    if (!isInView) return;

    const timer = setTimeout(() => {
      const duration = 2000; // 2 segundos para a animação
      const steps = 60; // 60 frames
      const increment = followers / steps;
      let currentCount = 0;
      let step = 0;

      const animate = () => {
        if (step < steps) {
          currentCount += increment;
          setDisplayCount(Math.floor(currentCount));
          
          // Efeito glitch aleatório
          if (Math.random() < 0.1) {
            setIsGlitching(true);
            setTimeout(() => setIsGlitching(false), 100);
          }
          
          step++;
          requestAnimationFrame(animate);
        } else {
          setDisplayCount(followers);
        }
      };
      
      animate();
    }, delay);

    return () => clearTimeout(timer);
  }, [isInView, followers, delay]);

  // Animação do ícone
  useEffect(() => {
    if (isInView) {
      controls.start({
        scale: [1, 1.2, 1],
        rotate: [0, 360],
        transition: {
          duration: 2,
          ease: "easeOut",
          delay: delay / 1000,
        }
      });
    }
  }, [isInView, controls, delay]);

  return (
    <div ref={ref} className="flex flex-col items-center space-y-4">
      {/* Ícone do Instagram */}
      <motion.div
        animate={controls}
        className="relative"
      >
        {/* Partículas flutuantes */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full opacity-60"
            style={{
              background: `linear-gradient(45deg, ${primaryColor}, #E1306C)`,
              left: `${50 + Math.cos((i * 60) * Math.PI / 180) * 40}px`,
              top: `${50 + Math.sin((i * 60) * Math.PI / 180) * 40}px`,
            }}
            animate={{
              y: [0, -10, 0],
              x: [0, Math.cos((i * 60) * Math.PI / 180) * 5, 0],
              opacity: [0.6, 1, 0.6],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 2 + (i * 0.2),
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.1,
            }}
          />
        ))}

        {/* Pulso de fundo */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background: `linear-gradient(45deg, ${primaryColor}, #E1306C, #F56040, #FCAF45)`,
          }}
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        {/* Ícone principal */}
        <motion.div
          className="relative w-16 h-16 rounded-full flex items-center justify-center"
          style={{
            background: `linear-gradient(45deg, ${primaryColor}, #E1306C, #F56040, #FCAF45)`,
            boxShadow: `0 0 30px ${primaryColor}40, 0 0 60px ${primaryColor}20`,
          }}
          whileHover={{ 
            scale: 1.1,
            boxShadow: `0 0 40px ${primaryColor}60, 0 0 80px ${primaryColor}30`,
          }}
          whileTap={{ scale: 0.95 }}
        >
          {/* Ícone SVG do Instagram */}
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-white"
          >
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" stroke="currentColor" strokeWidth="2"/>
            <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
            <path d="M16.5 7.5h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </motion.div>

        {/* Brilho cinematográfico */}
        <motion.div
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            background: `conic-gradient(from 0deg, transparent, ${primaryColor}60, transparent)`,
          }}
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </motion.div>

      {/* Contador com efeito glitch */}
      <motion.div
        className="relative"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: (delay / 1000) + 0.5, duration: 0.8 }}
      >
        {/* Efeito holográfico de fundo */}
        <motion.div
          className="absolute inset-0 rounded-lg blur-sm"
          style={{
            background: `linear-gradient(45deg, ${primaryColor}20, transparent, ${primaryColor}10)`,
            transform: 'scale(1.1)',
          }}
          animate={{
            background: [
              `linear-gradient(45deg, ${primaryColor}20, transparent, ${primaryColor}10)`,
              `linear-gradient(135deg, ${primaryColor}15, transparent, ${primaryColor}25)`,
              `linear-gradient(45deg, ${primaryColor}20, transparent, ${primaryColor}10)`,
            ],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Texto principal */}
        <motion.span
          className={`relative z-10 text-2xl font-bold bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent ${
            isGlitching ? 'animate-pulse' : ''
          }`}
          style={{
            fontFamily: 'monospace',
            textShadow: isGlitching ? `2px 2px 0px ${primaryColor}40, 0 0 10px ${primaryColor}30` : `0 0 20px ${primaryColor}20`,
            filter: isGlitching ? 'blur(0.5px)' : 'none',
          }}
        >
          {formatFollowers(displayCount)}
        </motion.span>

        {/* Efeito glitch overlay */}
        {isGlitching && (
          <>
            <motion.span
              className="absolute top-0 left-0 text-2xl font-bold text-red-500 opacity-70"
              style={{
                fontFamily: 'monospace',
                transform: 'translate(-1px, -1px)',
              }}
              animate={{
                x: [-1, 1, -1],
                opacity: [0.7, 0.3, 0.7],
              }}
              transition={{ duration: 0.1 }}
            >
              {formatFollowers(displayCount)}
            </motion.span>
            <motion.span
              className="absolute top-0 left-0 text-2xl font-bold text-blue-500 opacity-70"
              style={{
                fontFamily: 'monospace',
                transform: 'translate(1px, 1px)',
              }}
              animate={{
                x: [1, -1, 1],
                opacity: [0.7, 0.3, 0.7],
              }}
              transition={{ duration: 0.1 }}
            >
              {formatFollowers(displayCount)}
            </motion.span>
          </>
        )}

        {/* Label */}
        <motion.div
          className="text-xs uppercase tracking-wider text-gray-500 mt-1 text-center"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: (delay / 1000) + 1, duration: 0.5 }}
        >
          Seguidores
        </motion.div>
      </motion.div>
    </div>
  );
};

export default InstagramStats;