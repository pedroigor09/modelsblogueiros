'use client';

import React, { useEffect, useState } from 'react';
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
  const [isGlitching, setIsGlitching] = useState(false);
  const [scanLines, setScanLines] = useState(false);
  const [analogDistortion, setAnalogDistortion] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Controle de hidratação
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Trigger diferentes tipos de glitch
  useEffect(() => {
    if (!isMounted) return;
    
    const glitchInterval = setInterval(() => {
      setIsGlitching(true);
      
      // Ativar scan lines de forma determinística baseada no tempo
      const now = Date.now();
      if (now % 10 < 1) { // 10% das vezes, mais previsível
        setScanLines(true);
      }
      
      // Ativar distorção analógica de forma determinística
      if (now % 7 < 1) { // ~14% das vezes, mais previsível
        setAnalogDistortion(true);
      }
      
      setTimeout(() => {
        setIsGlitching(false);
        setScanLines(false);
        setAnalogDistortion(false);
      }, 150); // Duração fixa
    }, 5000); // Intervalo fixo

    return () => clearInterval(glitchInterval);
  }, [isMounted]);

  const getVHSColors = () => {
    const vhsEffects = [
      { red: '#ff0080', cyan: '#00ffff', green: '#00ff41' }, // Classic VHS
      { red: '#ff3366', cyan: '#33ccff', green: '#66ff33' }, // Neon VHS
      { red: '#ff0040', cyan: '#0080ff', green: '#40ff00' }, // Retro VHS
      { red: '#ff6600', cyan: '#0066ff', green: '#66ff00' }, // Warm VHS
      { red: '#ff0066', cyan: '#6600ff', green: '#ff6600' }, // Purple VHS
      { red: '#ff4400', cyan: '#00aaff', green: '#44ff00' }, // Electric VHS
    ];
    
    const index = Math.abs(text.length) % vhsEffects.length;
    return vhsEffects[index];
  };

  const vhsColors = getVHSColors();

  return (
    <div className={`relative inline-block ${className}`} style={{ perspective: '1000px' }}>
      {/* CSS para efeitos VHS */}
      <style jsx>{`
        @keyframes vhs-flicker {
          0% { opacity: 1; }
          2% { opacity: 0.8; }
          4% { opacity: 1; }
          8% { opacity: 0.9; }
          10% { opacity: 1; }
          12% { opacity: 0.7; }
          14% { opacity: 1; }
          16% { opacity: 0.85; }
          18% { opacity: 1; }
          22% { opacity: 0.9; }
          24% { opacity: 1; }
          100% { opacity: 1; }
        }
        
        @keyframes scan-lines {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
        
        @keyframes horizontal-shake {
          0% { transform: translateX(0); }
          10% { transform: translateX(-2px) skewX(1deg); }
          20% { transform: translateX(2px) skewX(-1deg); }
          30% { transform: translateX(-1px) skewX(0.5deg); }
          40% { transform: translateX(1px) skewX(-0.5deg); }
          50% { transform: translateX(-0.5px) skewX(0.2deg); }
          60% { transform: translateX(0.5px) skewX(-0.2deg); }
          70% { transform: translateX(-0.2px) skewX(0.1deg); }
          80% { transform: translateX(0.2px) skewX(-0.1deg); }
          90% { transform: translateX(-0.1px) skewX(0deg); }
          100% { transform: translateX(0) skewX(0deg); }
        }

        @keyframes rgb-shift {
          0% { transform: translate(0); }
          20% { transform: translate(-1px, 1px); }
          40% { transform: translate(-1px, -1px); }
          60% { transform: translate(1px, 1px); }
          80% { transform: translate(1px, -1px); }
          100% { transform: translate(0); }
        }

        .vhs-container {
          position: relative;
          overflow: visible; /* Mudou de hidden para visible */
        }

        .vhs-container::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: repeating-linear-gradient(
            0deg,
            transparent,
            transparent 3px,
            rgba(0, 255, 255, 0.01) 3px,
            rgba(0, 255, 255, 0.01) 4px
          );
          pointer-events: none;
          z-index: 100;
          opacity: 0.3; /* Reduzido */
        }

        .glitch-active {
          animation: vhs-flicker 0.1s ease-in-out;
        }

        .horizontal-glitch {
          animation: horizontal-shake 0.15s ease-in-out;
        }

        .scan-lines-active::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(
            transparent 50%, 
            rgba(0, 255, 255, 0.05) 50%, 
            rgba(0, 255, 255, 0.05) 51%, 
            transparent 51%
          );
          background-size: 100% 6px;
          animation: scan-lines 0.08s linear;
          pointer-events: none;
          z-index: 50;
          opacity: 0.4;
        }
      `}</style>

      <div className={`vhs-container ${isGlitching ? 'glitch-active' : ''} ${analogDistortion ? 'horizontal-glitch' : ''} ${scanLines ? 'scan-lines-active' : ''}`}>
        
        {/* Texto principal com efeito neon */}
        <motion.h2
          className="relative z-10"
          style={{ 
            color: primaryColor,
            textShadow: `
              0 0 3px ${primaryColor}60,
              0 0 6px ${primaryColor}40,
              0 0 9px ${primaryColor}20
            `,
            filter: isGlitching ? 'brightness(1.1) contrast(1.1)' : 'brightness(1.05)',
          }}
          animate={isGlitching ? {
            textShadow: [
              `0 0 3px ${primaryColor}60, 0 0 6px ${primaryColor}40`,
              `0 0 5px ${vhsColors.red}40, 0 0 10px ${vhsColors.red}20`,
              `0 0 4px ${vhsColors.cyan}40, 0 0 8px ${vhsColors.cyan}20`,
              `0 0 3px ${primaryColor}60, 0 0 6px ${primaryColor}40`,
            ]
          } : {}}
          transition={{ duration: 0.08 }}
        >
          {text}
        </motion.h2>

        {/* Layer RGB Shift - Vermelha */}
        {isGlitching && (
          <motion.h2
            className="absolute top-0 left-0 pointer-events-none"
            style={{ 
              color: vhsColors.red,
              opacity: 0.4, // Reduzido
              mixBlendMode: 'screen',
              zIndex: 5
            }}
            animate={{
              x: [-1, 1, -0.5, 0.5, 0],
              y: [0, -0.5, 0.5, 0],
              scaleX: [1, 1.01, 0.99, 1],
            }}
            transition={{ duration: 0.08, repeat: 1 }}
          >
            {text}
          </motion.h2>
        )}

        {/* Layer RGB Shift - Ciano */}
        {isGlitching && (
          <motion.h2
            className="absolute top-0 left-0 pointer-events-none"
            style={{ 
              color: vhsColors.cyan,
              opacity: 0.3, // Reduzido
              mixBlendMode: 'screen',
              zIndex: 4
            }}
            animate={{
              x: [1, -1, 0.5, -0.5, 0],
              y: [0.5, 0, -0.5, 0],
              scaleX: [1, 0.99, 1.01, 1],
            }}
            transition={{ duration: 0.08, repeat: 1, delay: 0.02 }}
          >
            {text}
          </motion.h2>
        )}

        {/* Layer RGB Shift - Verde (Removido para menos poluição visual) */}

        {/* Linhas de interferência horizontal - Muito sutil */}
        {isGlitching && (
          <motion.div
            className="absolute pointer-events-none"
            style={{
              top: '40%', // Posição fixa em vez de aleatória
              left: 0,
              right: 0,
              height: '1px',
              background: `linear-gradient(90deg, transparent, ${vhsColors.cyan}30, transparent)`,
              opacity: 0.5,
              zIndex: 20
            }}
            animate={{
              x: ['-100%', '100%'],
              opacity: [0, 0.5, 0],
            }}
            transition={{ 
              duration: 0.2, 
              ease: 'easeInOut'
            }}
          />
        )}

        {/* Blocos de interferência VHS - Muito reduzidos */}
        {isGlitching && analogDistortion && (
          <motion.div
            className="absolute pointer-events-none"
            style={{
              top: '50%', // Posição fixa
              left: '20%', // Posição fixa
              width: '10%',
              height: '2px',
              background: vhsColors.cyan,
              opacity: 0.3,
              zIndex: 15
            }}
            animate={{
              scaleX: [1, 1.2, 0.8, 1],
              opacity: [0.3, 0.5, 0.1, 0.3],
              x: [0, 2, -2, 0],
            }}
            transition={{ duration: 0.1 }}
          />
        )}

        {/* Efeito de static/ruído - Muito sutil */}
        {isGlitching && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(circle at 50% 50%, ${primaryColor}05 0%, transparent 70%)`,
              opacity: 0.1,
              mixBlendMode: 'overlay',
              zIndex: 10
            }}
            animate={{
              opacity: [0.1, 0.2, 0.05],
              scale: [1, 1.01, 1],
            }}
            transition={{ duration: 0.08 }}
          />
        )}
      </div>
    </div>
  );
};

export default GlitchText;