'use client';

import { motion } from 'framer-motion';
import { useMousePosition } from '@/hooks/useMousePosition';
import { mapRange } from '@/utils/animations';

export const HeroSection = () => {
  const mousePosition = useMousePosition();

  // Calcula o movimento parallax baseado na posição do mouse
  const getParallax = () => {
    if (typeof window === 'undefined') return { x: 0, y: 0 };
    const xParallax = mapRange(mousePosition.x, 0, window.innerWidth, -20, 20);
    const yParallax = mapRange(mousePosition.y, 0, window.innerHeight, -20, 20);
    return { x: xParallax, y: yParallax };
  };

  const parallax = getParallax();

  // Calcula as cores baseadas na posição do mouse
  const getBackgroundGradient = () => {
    if (typeof window === 'undefined') {
      return 'linear-gradient(135deg, hsl(200, 70%, 95%) 0%, hsl(250, 60%, 92%) 50%, hsl(300, 65%, 98%) 100%)';
    }
    
    const x = mousePosition.x / window.innerWidth;
    const y = mousePosition.y / window.innerHeight;
    
    const colors = [
      `hsl(${Math.floor(x * 360)}, 70%, 95%)`,
      `hsl(${Math.floor(y * 360)}, 60%, 92%)`,
      `hsl(${Math.floor((x + y) * 180)}, 65%, 98%)`
    ];
    
    return `linear-gradient(135deg, ${colors[0]} 0%, ${colors[1]} 50%, ${colors[2]} 100%)`;
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background animado */}
      <motion.div
        className="absolute inset-0 -z-10"
        style={{
          background: getBackgroundGradient(),
        }}
        animate={{
          background: getBackgroundGradient(),
        }}
        transition={{
          duration: 0.3,
          ease: 'easeOut',
        }}
      />

      {/* Elementos flutuantes para parallax */}
      <motion.div
        className="absolute top-20 left-20 w-32 h-32 rounded-full bg-gradient-to-br from-pink-200 to-purple-200 opacity-30 blur-xl"
        animate={{
          x: parallax.x * 0.5,
          y: parallax.y * 0.3,
        }}
        transition={{
          duration: 0.8,
          ease: 'easeOut',
        }}
      />

      <motion.div
        className="absolute bottom-32 right-32 w-48 h-48 rounded-full bg-gradient-to-br from-blue-200 to-cyan-200 opacity-20 blur-2xl"
        animate={{
          x: parallax.x * -0.7,
          y: parallax.y * 0.5,
        }}
        transition={{
          duration: 1.2,
          ease: 'easeOut',
        }}
      />

      <motion.div
        className="absolute top-1/2 left-1/3 w-24 h-24 rounded-full bg-gradient-to-br from-yellow-200 to-orange-200 opacity-25 blur-lg"
        animate={{
          x: parallax.x * 0.8,
          y: parallax.y * -0.4,
        }}
        transition={{
          duration: 1.0,
          ease: 'easeOut',
        }}
      />

      {/* Conteúdo principal */}
      <div className="text-center z-10 px-6 max-w-4xl">
        <motion.h1
          className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-gray-800 via-gray-900 to-black bg-clip-text text-transparent mb-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          O estilo de Salvador está aqui.
        </motion.h1>

        <motion.p
          className="text-xl md:text-2xl text-gray-700 font-light"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          role e veja quem veste a cidade
        </motion.p>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
        >
          <motion.div
            className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <motion.div
              className="w-1 h-3 bg-gray-400 rounded-full mt-2"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};