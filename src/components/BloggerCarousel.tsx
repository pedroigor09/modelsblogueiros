'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BloggerCard } from './BloggerCard';
import { Blogger } from '@/types';

interface BloggerCarouselProps {
  bloggers: Blogger[];
  onBloggerChange: (blogger: Blogger) => void;
}

export const BloggerCarousel = ({ bloggers, onBloggerChange }: BloggerCarouselProps) => {
  const [activeBloggerIndex, setActiveBloggerIndex] = useState(0);

  useEffect(() => {
    onBloggerChange(bloggers[activeBloggerIndex]);
  }, [activeBloggerIndex, bloggers, onBloggerChange]);

  const handleBloggerClick = (index: number) => {
    setActiveBloggerIndex(index);
  };

  const goToNext = () => {
    setActiveBloggerIndex((prev) => (prev + 1) % bloggers.length);
  };

  const goToPrevious = () => {
    setActiveBloggerIndex((prev) => (prev - 1 + bloggers.length) % bloggers.length);
  };

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background com gradiente do blogger ativo */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeBloggerIndex}
          className="absolute inset-0 -z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          style={{
            background: `linear-gradient(135deg, ${bloggers[activeBloggerIndex]?.colorPalette.primary}15 0%, ${bloggers[activeBloggerIndex]?.colorPalette.secondary}10 50%, ${bloggers[activeBloggerIndex]?.colorPalette.tertiary}15 100%)`,
          }}
        />
      </AnimatePresence>

      <div className="container mx-auto px-6">
        {/* Título */}
        <motion.h2
          className="text-4xl md:text-6xl font-bold text-center mb-16 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          Vozes de Salvador
        </motion.h2>

        {/* Carrossel */}
        <div className="relative">
          {/* Navegação */}
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/80 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center hover:bg-white transition-colors"
            aria-label="Blogger anterior"
          >
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/80 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center hover:bg-white transition-colors"
            aria-label="Próximo blogger"
          >
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Cards container com scroll-snap */}
          <div className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide space-x-6 px-8 pb-4">
            {bloggers.map((blogger, index) => (
              <div key={blogger.id} className="snap-center">
                <BloggerCard
                  blogger={blogger}
                  isActive={index === activeBloggerIndex}
                  onClick={() => handleBloggerClick(index)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Indicadores */}
        <div className="flex justify-center space-x-3 mt-8">
          {bloggers.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveBloggerIndex(index)}
              className={`
                w-3 h-3 rounded-full transition-all duration-300
                ${index === activeBloggerIndex 
                  ? 'bg-gray-800 scale-125' 
                  : 'bg-gray-300 hover:bg-gray-400'
                }
              `}
              aria-label={`Ir para blogger ${index + 1}`}
            />
          ))}
        </div>

        {/* Frase inspiracional */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <p className="text-lg text-gray-600 italic">
            "Cada estilo conta uma história, cada look reflete uma alma"
          </p>
        </motion.div>
      </div>
    </section>
  );
};