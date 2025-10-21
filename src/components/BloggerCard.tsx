'use client';

import { motion } from 'framer-motion';
import { Blogger } from '@/types';
import { Instagram, MapPin, TrendingUp, Award, CheckCircle2 } from 'lucide-react';

interface BloggerCardProps {
  blogger: Blogger;
  isActive: boolean;
  onClick: () => void;
}

const formatFollowers = (count: number): string => {
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1)}M`;
  }
  if (count >= 1000) {
    return `${(count / 1000).toFixed(0)}K`;
  }
  return count.toString();
};

export const BloggerCard = ({ blogger, isActive, onClick }: BloggerCardProps) => {
  return (
    <motion.div
      className={`
        relative flex-shrink-0 w-80 h-[500px] rounded-2xl overflow-hidden cursor-pointer
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
      <div className="relative h-[60%] overflow-hidden">
        <div
          className="w-full h-full bg-gray-200 bg-cover bg-center"
          style={{
            backgroundImage: `url(${blogger.image})`,
          }}
        />
        
        {/* Overlay gradiente */}
        <div 
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.7) 100%)`,
          }}
        />

        {/* Badge no topo */}
        {blogger.badge && (
          <motion.div
            className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold text-white backdrop-blur-md"
            style={{
              background: `linear-gradient(135deg, ${blogger.colorPalette.primary}, ${blogger.colorPalette.secondary})`,
            }}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Award className="inline w-3 h-3 mr-1" />
            {blogger.badge}
          </motion.div>
        )}

        {/* Verificado */}
        {blogger.verified && (
          <div className="absolute top-3 left-3 bg-blue-500 rounded-full p-1">
            <CheckCircle2 className="w-4 h-4 text-white" />
          </div>
        )}
      </div>

      {/* Informações */}
      <div className="relative h-[40%] p-5 bg-white backdrop-blur-sm flex flex-col justify-between">
        {/* Nome e estilo */}
        <div>
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-1">
                {blogger.name}
              </h3>
              <p className="text-xs font-semibold uppercase tracking-wider"
                style={{ color: blogger.colorPalette.primary }}>
                {blogger.style}
              </p>
            </div>
          </div>
          
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {blogger.description}
          </p>

          {/* Quote em itálico */}
          <p className="text-xs italic text-gray-500 mb-3 line-clamp-2 border-l-2 pl-2"
            style={{ borderColor: blogger.colorPalette.secondary }}>
            "{blogger.quote}"
          </p>
        </div>

        {/* Stats e Info */}
        <div className="space-y-2">
          {/* Localização e Especialidade */}
          <div className="flex items-center gap-3 text-xs text-gray-600">
            {blogger.location && (
              <div className="flex items-center gap-1">
                <MapPin className="w-3 h-3" style={{ color: blogger.colorPalette.primary }} />
                <span>{blogger.location}</span>
              </div>
            )}
            {blogger.specialty && (
              <div className="flex-1 truncate">
                <span className="font-medium">• {blogger.specialty}</span>
              </div>
            )}
          </div>

          {/* Instagram Stats */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Instagram className="w-4 h-4" style={{ color: blogger.colorPalette.primary }} />
              <span className="text-sm font-bold text-gray-800">
                {formatFollowers(blogger.instagram?.followers || 0)}
              </span>
              <span className="text-xs text-gray-500">seguidores</span>
            </div>

            {blogger.instagram?.engagement && (
              <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-gray-100">
                <TrendingUp className="w-3 h-3 text-green-600" />
                <span className="text-xs font-semibold text-green-600">
                  {blogger.instagram.engagement}%
                </span>
              </div>
            )}
          </div>

          {/* Paleta de cores */}
          <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
            <span className="text-xs text-gray-500 mr-1">Paleta:</span>
            <div className="flex space-x-2">
              <div
                className="w-5 h-5 rounded-full border-2 border-white shadow-md"
                style={{ backgroundColor: blogger.colorPalette.primary }}
              />
              <div
                className="w-5 h-5 rounded-full border-2 border-white shadow-md"
                style={{ backgroundColor: blogger.colorPalette.secondary }}
              />
              <div
                className="w-5 h-5 rounded-full border-2 border-white shadow-md"
                style={{ backgroundColor: blogger.colorPalette.tertiary }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Indicador de ativo */}
      {isActive && (
        <motion.div
          className="absolute -top-2 -left-2 w-6 h-6 rounded-full shadow-lg flex items-center justify-center"
          style={{
            background: `linear-gradient(135deg, ${blogger.colorPalette.primary}, ${blogger.colorPalette.tertiary})`,
          }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.2 }}
        >
          <div className="w-3 h-3 bg-white rounded-full" />
        </motion.div>
      )}

      {/* Borda colorida quando ativo */}
      {isActive && (
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            border: `3px solid ${blogger.colorPalette.primary}`,
            boxShadow: `0 0 20px ${blogger.colorPalette.primary}40`,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </motion.div>
  );
};