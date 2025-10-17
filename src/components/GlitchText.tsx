'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface GlitchTextProps {
  text: string;
  primaryColor: string;
  secondaryColor: string;
  glitchType: 'shake' | 'split' | 'wave' | 'distort' | 'cyber' | 'matrix';
  className?: string;
}

const GlitchText: React.FC<GlitchTextProps> = ({
  text,
  primaryColor,
  secondaryColor,
  glitchType,
  className = ''
}) => {
  const [isGlitching, setIsGlitching] = useState(false);
  const [glitchChars, setGlitchChars] = useState(text);

  // Caracteres para efeitos cyber/matrix
  const glitchSymbols = ['█', '▓', '▒', '░', '▄', '▀', '■', '□', '▪', '▫', '◤', '◥', '◢', '◣'];
  const cyberChars = ['0', '1', 'X', 'Ø', '∆', '◊', '♦', '◈', '◇', '◆'];

  // Função para gerar glitch aleatório
  const generateGlitch = () => {
    if (glitchType === 'matrix' || glitchType === 'cyber') {
      return text
        .split('')
        .map(char => {
          if (char === ' ') return ' ';
          return Math.random() < 0.3 
            ? (glitchType === 'matrix' ? glitchSymbols : cyberChars)[Math.floor(Math.random() * (glitchType === 'matrix' ? glitchSymbols : cyberChars).length)]
            : char;
        })
        .join('');
    }
    return text;
  };

  // Trigger glitch periodicamente
  useEffect(() => {
    const interval = setInterval(() => {
      setIsGlitching(true);
      setGlitchChars(generateGlitch());
      
      setTimeout(() => {
        setIsGlitching(false);
        setGlitchChars(text);
      }, 150);
    }, 3000 + Math.random() * 2000); // Intervalo aleatório entre 3-5s

    return () => clearInterval(interval);
  }, [text, glitchType]);

  const getGlitchVariants = () => {
    switch (glitchType) {
      case 'shake':
        return {
          normal: { x: 0, y: 0, rotate: 0 },
          glitch: {
            x: [-2, 2, -1, 1, 0],
            y: [-1, 1, -2, 0, 1],
            rotate: [-0.5, 0.5, -0.2, 0.2, 0],
            transition: { duration: 0.15, repeat: 2 }
          }
        };
      
      case 'split':
        return {
          normal: { scaleX: 1, skewX: 0 },
          glitch: {
            scaleX: [1, 1.02, 0.98, 1.01, 1],
            skewX: [0, 2, -1, 1, 0],
            transition: { duration: 0.2, repeat: 1 }
          }
        };
      
      case 'wave':
        return {
          normal: { y: 0, scaleY: 1 },
          glitch: {
            y: [0, -3, 3, -1, 0],
            scaleY: [1, 1.05, 0.95, 1.02, 1],
            transition: { duration: 0.25, repeat: 1 }
          }
        };
      
      case 'distort':
        return {
          normal: { scaleX: 1, scaleY: 1, rotate: 0 },
          glitch: {
            scaleX: [1, 1.1, 0.9, 1.05, 1],
            scaleY: [1, 0.9, 1.1, 0.95, 1],
            rotate: [0, 1, -1, 0.5, 0],
            transition: { duration: 0.3, repeat: 1 }
          }
        };
      
      case 'cyber':
        return {
          normal: { opacity: 1, scale: 1 },
          glitch: {
            opacity: [1, 0.8, 1, 0.9, 1],
            scale: [1, 1.02, 0.98, 1.01, 1],
            transition: { duration: 0.2, repeat: 2 }
          }
        };
      
      case 'matrix':
        return {
          normal: { opacity: 1, y: 0 },
          glitch: {
            opacity: [1, 0.5, 1, 0.7, 1],
            y: [0, -2, 2, -1, 0],
            transition: { duration: 0.25, repeat: 1 }
          }
        };
      
      default:
        return {
          normal: { x: 0 },
          glitch: { x: [-1, 1, -1, 1, 0] }
        };
    }
  };

  const variants = getGlitchVariants();

  return (
    <div className={`relative inline-block ${className}`}>
      {/* Texto principal */}
      <motion.h2
        className="relative z-10"
        style={{ color: primaryColor }}
        animate={isGlitching ? 'glitch' : 'normal'}
        variants={variants}
      >
        {glitchChars}
      </motion.h2>

      {/* Layers de glitch coloridos */}
      {isGlitching && (
        <>
          {/* Layer vermelha */}
          <motion.h2
            className="absolute top-0 left-0 opacity-70 pointer-events-none"
            style={{ 
              color: '#ff0040',
              transform: 'translate(-1px, -1px)',
              mixBlendMode: 'screen'
            }}
            animate={{
              x: [-1, 1, -2, 0],
              opacity: [0.7, 0.3, 0.8, 0.5],
            }}
            transition={{ duration: 0.1, repeat: 3 }}
          >
            {glitchChars}
          </motion.h2>

          {/* Layer ciano */}
          <motion.h2
            className="absolute top-0 left-0 opacity-70 pointer-events-none"
            style={{ 
              color: '#00ffff',
              transform: 'translate(1px, 1px)',
              mixBlendMode: 'screen'
            }}
            animate={{
              x: [1, -1, 2, 0],
              opacity: [0.7, 0.4, 0.6, 0.3],
            }}
            transition={{ duration: 0.1, repeat: 3 }}
          >
            {glitchChars}
          </motion.h2>

          {/* Layer da cor secundária */}
          <motion.h2
            className="absolute top-0 left-0 opacity-50 pointer-events-none"
            style={{ 
              color: secondaryColor,
              transform: 'translate(0.5px, -0.5px)',
              mixBlendMode: 'multiply'
            }}
            animate={{
              x: [0.5, -0.5, 1, 0],
              y: [-0.5, 0.5, -1, 0],
              opacity: [0.5, 0.2, 0.7, 0.3],
            }}
            transition={{ duration: 0.15, repeat: 2 }}
          >
            {glitchChars}
          </motion.h2>
        </>
      )}

      {/* Efeito de escaneamento */}
      {isGlitching && (glitchType === 'cyber' || glitchType === 'matrix') && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `linear-gradient(90deg, transparent 0%, ${primaryColor}20 50%, transparent 100%)`,
            width: '200%',
          }}
          animate={{
            x: ['-100%', '100%'],
          }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        />
      )}
    </div>
  );
};

export default GlitchText;