'use client';

import { motion } from 'framer-motion';
import VibeGallery from './VibeGallery';
import { Blogger } from '@/types';

interface VibesSectionProps {
  bloggers: Blogger[];
}

export const VibesSection = ({ bloggers }: VibesSectionProps) => {
  return (
    <div className="relative bg-white">
      {/* Título da seção */}
      <section className="py-20 bg-gradient-to-b from-white via-gray-50 to-white">
        <div className="w-full flex flex-col items-center justify-center px-6">
          <div className="w-full max-w-5xl flex flex-col items-center text-center">
            <motion.h2
              className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent mb-8 leading-tight tracking-tight"
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              A Vibe de Cada Um
            </motion.h2>
            
            <motion.p
              className="text-lg md:text-xl lg:text-2xl text-gray-600 max-w-4xl leading-relaxed font-light text-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              Mergulhe no universo visual de cada criador e sinta como suas personalidades 
              transformam simples roupas em declarações de identidade.
            </motion.p>
            
            {/* Linha decorativa */}
            <motion.div 
              className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mt-8 rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: 96 }}
              transition={{ duration: 1, delay: 0.6 }}
              viewport={{ once: true }}
            />
          </div>
        </div>
      </section>

      {/* Galerias individuais */}
      {bloggers.map((blogger, index) => (
        <VibeGallery 
          key={blogger.id} 
          blogger={blogger} 
          isActive={false}
          onClick={() => {}}
          index={index}
        />
      ))}
    </div>
  );
};