'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface GlitchTextProps {
  text: string;
  primaryColor: string;
  secondaryColor: string;
  glitchType: 'vhs' | 'cassette' | 'neon' | 'retro' | 'cyber' | 'analog';
  className?: string;
}

const GlitchText: React.FC<GlitchTextProps> = ({
  text,
  primaryColor,
  secondaryColor,
  glitchType,
  className = ''
}) => {
  return (
    <div 
      className={`relative inline-block ${className}`}
      style={{ 
        filter: 'contrast(1.1) brightness(1.05)',
      }}
    >
      {/* Camada principal do texto */}
      <span
        className="relative z-10 inline-block font-black"
        style={{ 
          color: primaryColor,
          textShadow: `
            0 0 8px ${primaryColor}60,
            0 0 15px ${primaryColor}40,
            2px 2px 4px rgba(0,0,0,0.5)
          `,
        }}
      >
        {text}
      </span>

      {/* Camada RGB Red Shift - ANIMAÇÃO CONTÍNUA COM GLITCH INTENSO */}
      <motion.span
        className="absolute top-0 left-0 z-0 inline-block font-black pointer-events-none"
        style={{ 
          color: '#ff0066',
          mixBlendMode: 'screen',
        }}
        animate={{
          x: [-6, -8, -4, -7, -9, -5],
          y: [-3, -2, -4, -3, -1, -3],
          opacity: [0.9, 0.7, 1, 0.8, 0.9, 0.85],
        }}
        transition={{
          duration: 0.4,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "linear",
        }}
      >
        {text}
      </motion.span>

      {/* Camada RGB Cyan Shift - ANIMAÇÃO CONTÍNUA COM GLITCH INTENSO */}
      <motion.span
        className="absolute top-0 left-0 z-0 inline-block font-black pointer-events-none"
        style={{ 
          color: '#00ffff',
          mixBlendMode: 'screen',
        }}
        animate={{
          x: [6, 8, 4, 7, 9, 5],
          y: [3, 2, 4, 3, 1, 3],
          opacity: [0.9, 1, 0.7, 0.85, 0.9, 0.8],
        }}
        transition={{
          duration: 0.4,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "linear",
          delay: 0.1,
        }}
      >
        {text}
      </motion.span>

      {/* Camada RGB Green - GLITCH INTERMITENTE INTENSO */}
      <motion.span
        className="absolute top-0 left-0 z-5 inline-block font-black pointer-events-none"
        style={{ 
          color: '#00ff00',
          mixBlendMode: 'screen',
        }}
        animate={{
          opacity: [0, 0.7, 0, 0.9, 0, 0.6, 0],
          x: [0, -3, 3, -2, 2, 0],
          y: [0, 2, -2, 0, -2, 0],
        }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
          ease: "linear",
          delay: 0.2,
        }}
      >
        {text}
      </motion.span>

      {/* Efeito de "corte" horizontal - MAIS FREQUENTE */}
      <motion.div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        animate={{
          opacity: [0, 0, 1, 0, 0, 0.9, 0, 0.7, 0],
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          times: [0, 0.2, 0.22, 0.24, 0.5, 0.52, 0.54, 0.7, 1],
        }}
      >
        <div
          className="absolute w-full bg-white"
          style={{
            height: '3px',
            top: '40%',
            mixBlendMode: 'overlay',
            boxShadow: '0 0 15px rgba(0,255,255,1), 0 0 25px rgba(255,0,102,0.8)',
          }}
        />
      </motion.div>
    </div>
  );
};

export default GlitchText;
