'use client';

import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

// Registrar o plugin ScrollTrigger
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const ParallaxTransition = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  // Transformações parallax
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animação das frases flutuantes
      gsap.fromTo('.floating-word',
        {
          opacity: 0,
          y: 100,
          rotation: -10
        },
        {
          opacity: 1,
          y: 0,
          rotation: 0,
          duration: 1,
          stagger: 0.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.floating-words-container',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const floatingWords = [
    { text: 'autenticidade', color: '#ff6b6b' },
    { text: 'confiança', color: '#4ecdc4' },
    { text: 'voz', color: '#ff9a9e' },
    { text: 'estilo', color: '#667eea' },
    { text: 'personalidade', color: '#ffd93d' },
    { text: 'criatividade', color: '#6bcf7f' }
  ];

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-white to-gray-50"
    >
      {/* Elementos parallax em camadas */}
      <motion.div
        style={{ y: y1 }}
        className="absolute top-20 left-10 w-64 h-64 rounded-full bg-gradient-to-br from-pink-100 to-purple-100 opacity-30 blur-3xl"
      />

      <motion.div
        style={{ y: y2 }}
        className="absolute bottom-32 right-10 w-96 h-96 rounded-full bg-gradient-to-br from-blue-100 to-cyan-100 opacity-25 blur-3xl"
      />

      <motion.div
        style={{ y: y3 }}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full bg-gradient-to-br from-yellow-100 to-orange-100 opacity-20 blur-2xl"
      />

      {/* Container das palavras flutuantes */}
      <motion.div 
        style={{ opacity }}
        className="floating-words-container relative z-10 max-w-6xl mx-auto px-6"
      >
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-16">
          {floatingWords.map((word, index) => (
            <motion.div
              key={word.text}
              className="floating-word text-center"
              style={{
                y: useTransform(scrollYProgress, [0, 1], [0, -30 * (index % 3 + 1)])
              }}
            >
              <h3 
                className="text-3xl md:text-5xl font-bold mb-4"
                style={{ color: word.color }}
              >
                {word.text}
              </h3>
              <div 
                className="w-20 h-1 mx-auto rounded-full"
                style={{ backgroundColor: word.color }}
              />
            </motion.div>
          ))}
        </div>

        {/* Texto central */}
        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-6">
            Mais que moda
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Cada pessoa carrega consigo uma narrativa única, expressa através das escolhas que faz, 
            das cores que veste, do jeito que se apresenta ao mundo.
          </p>
        </motion.div>
      </motion.div>

      {/* Elementos decorativos animados */}
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        animate={{ 
          rotate: [0, 360],
          scale: [1, 1.1, 1]
        }}
        transition={{ 
          duration: 20, 
          repeat: Infinity, 
          ease: 'linear' 
        }}
      >
        <div className="w-2 h-2 bg-gray-400 rounded-full" />
      </motion.div>
    </section>
  );
};