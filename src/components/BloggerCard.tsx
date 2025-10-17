'use client';

import { motion } from 'framer-motion';
import { Blogger } from '@/types';

interface BloggerCardProps {
  blogger: Blogger;
  isActive: boolean;
  onClick: () => void;
}

export const BloggerCard = ({ blogger, isActive, onClick }: BloggerCardProps) => {
  return (
    <motion.div
      className={`
        relative flex-shrink-0 w-80 h-96 rounded-2xl overflow-hidden cursor-pointer
        ${isActive ? 'scale-105 shadow-2xl' : 'scale-95 shadow-lg'}
      `}
      onClick={onClick}
      whileHover={{ scale: isActive ? 1.08 : 1.02 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      {/* Background com gradiente da paleta */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          background: `linear-gradient(135deg, ${blogger.colorPalette.primary} 0%, ${blogger.colorPalette.secondary} 50%, ${blogger.colorPalette.tertiary} 100%)`,
        }}
      />

      {/* Imagem do blogger */}
      <div className="relative h-3/4 overflow-hidden">
        <div
          className="w-full h-full bg-gray-200 bg-cover bg-center"
          style={{
            backgroundImage: `url(${blogger.image})`,
          }}
        />
        
        {/* Overlay sutil */}
        <div className="absolute inset-0 bg-black bg-opacity-10" />
      </div>

      {/* Informações */}
      <div className="relative h-1/4 p-4 bg-white backdrop-blur-sm">
        <h3 className="text-xl font-bold text-gray-800 mb-2">
          {blogger.name}
        </h3>
        
        <p className="text-sm text-gray-600 mb-3">
          {blogger.description}
        </p>

        {/* Paleta de cores */}
        <div className="flex space-x-2">
          <div
            className="w-4 h-4 rounded-full border border-gray-200"
            style={{ backgroundColor: blogger.colorPalette.primary }}
          />
          <div
            className="w-4 h-4 rounded-full border border-gray-200"
            style={{ backgroundColor: blogger.colorPalette.secondary }}
          />
          <div
            className="w-4 h-4 rounded-full border border-gray-200"
            style={{ backgroundColor: blogger.colorPalette.tertiary }}
          />
        </div>
      </div>

      {/* Indicador de ativo */}
      {isActive && (
        <motion.div
          className="absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full shadow-lg flex items-center justify-center"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.2 }}
        >
          <div className="w-3 h-3 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full" />
        </motion.div>
      )}
    </motion.div>
  );
};