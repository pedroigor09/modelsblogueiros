'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useMousePosition } from '@/hooks/useMousePosition';
import { Blogger } from '@/types';

interface NightFooterProps {
  activeBlogger?: Blogger;
}

export const NightFooter = ({ activeBlogger }: NightFooterProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mousePosition = useMousePosition();
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateCanvasSize = () => {
      if (canvasRef.current) {
        setCanvasSize({
          width: window.innerWidth,
          height: window.innerHeight
        });
      }
    };

    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);

    return () => window.removeEventListener('resize', updateCanvasSize);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvasSize.width;
    canvas.height = canvasSize.height;

    // Limpar canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Cor do glow baseada no blogger ativo
    const glowColor = activeBlogger?.colorPalette.primary || '#667eea';

    // Criar gradiente radial para o glow
    const gradient = ctx.createRadialGradient(
      mousePosition.x, mousePosition.y, 0,
      mousePosition.x, mousePosition.y, 200
    );

    gradient.addColorStop(0, `${glowColor}40`);
    gradient.addColorStop(0.3, `${glowColor}20`);
    gradient.addColorStop(0.6, `${glowColor}10`);
    gradient.addColorStop(1, 'transparent');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Adicionar pequenas partículas ao redor do cursor
    for (let i = 0; i < 5; i++) {
      const angle = (Math.PI * 2 * i) / 5;
      const radius = 50 + Math.sin(Date.now() * 0.005 + i) * 20;
      const x = mousePosition.x + Math.cos(angle) * radius;
      const y = mousePosition.y + Math.sin(angle) * radius;

      ctx.beginPath();
      ctx.arc(x, y, 2, 0, Math.PI * 2);
      ctx.fillStyle = `${glowColor}60`;
      ctx.fill();
    }
  }, [mousePosition, canvasSize, activeBlogger]);

  return (
    <footer className="relative bg-black text-white overflow-hidden">
      {/* Canvas para efeito glow */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-10"
        style={{ mixBlendMode: 'screen' }}
      />

      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, white 1px, transparent 1px),
                           radial-gradient(circle at 80% 50%, white 1px, transparent 1px)`,
          backgroundSize: '100px 100px'
        }} />
      </div>

      <div className="relative z-20 container mx-auto px-6 py-20">
        {/* Conteúdo principal */}
        <div className="text-center mb-16">
          <motion.h2
            className="text-4xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            feito em salvador,
            <br />
            para o mundo
          </motion.h2>

          <motion.p
            className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            viewport={{ once: true }}
          >
            Este projeto nasceu do desejo de celebrar a diversidade e autenticidade 
            do estilo soteropolitano. Cada criador aqui representa uma faceta única 
            da rica cultura fashion de nossa cidade.
          </motion.p>

          {/* Paleta de cores do blogger ativo */}
          {activeBlogger && (
            <motion.div
              className="flex justify-center space-x-4 mb-12"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              viewport={{ once: true }}
            >
              {Object.values(activeBlogger.colorPalette).map((color, index) => (
                <motion.div
                  key={index}
                  className="w-8 h-8 rounded-full border border-white/20"
                  style={{ backgroundColor: color }}
                  whileHover={{ scale: 1.3, rotate: 180 }}
                  transition={{ duration: 0.3 }}
                />
              ))}
            </motion.div>
          )}
        </div>

        {/* Links e informações */}
        <div className="grid md:grid-cols-3 gap-12 mb-16">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-bold mb-4">Projeto</h3>
            <p className="text-gray-400 leading-relaxed">
              Uma celebração visual dos talentos que fazem de Salvador 
              um polo de criatividade e expressão através da moda.
            </p>
          </motion.div>

          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-bold mb-4">Tecnologia</h3>
            <div className="text-gray-400 space-y-2">
              <p>Next.js + TypeScript</p>
              <p>Framer Motion + GSAP</p>
              <p>Tailwind CSS</p>
            </div>
          </motion.div>

          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-bold mb-4">Salvador</h3>
            <p className="text-gray-400 leading-relaxed">
              Cidade que respira cultura, arte e autenticidade. 
              Berço de tendências que ecoam pelo Brasil e pelo mundo.
            </p>
          </motion.div>
        </div>

        {/* Copyright */}
        <motion.div
          className="text-center pt-8 border-t border-gray-800"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-500">
            © 2025 Models Blogueiros • Desenvolvido com 💜 em Salvador
          </p>
        </motion.div>
      </div>

      {/* Elementos decorativos */}
      <motion.div
        className="absolute bottom-10 left-10 w-2 h-2 bg-white rounded-full opacity-60"
        animate={{ 
          scale: [1, 1.5, 1],
          opacity: [0.6, 1, 0.6]
        }}
        transition={{ 
          duration: 3, 
          repeat: Infinity, 
          ease: 'easeInOut' 
        }}
      />

      <motion.div
        className="absolute top-20 right-20 w-1 h-1 bg-white rounded-full opacity-40"
        animate={{ 
          scale: [1, 2, 1],
          opacity: [0.4, 0.8, 0.4]
        }}
        transition={{ 
          duration: 4, 
          repeat: Infinity, 
          ease: 'easeInOut',
          delay: 1 
        }}
      />
    </footer>
  );
};