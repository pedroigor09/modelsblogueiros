'use client';

import { motion } from 'framer-motion';
import { Award, CheckCircle2, Star, Zap, Crown, Flame, Sparkles, Palette, Users, Heart } from 'lucide-react';

interface ShineBadgeProps {
  type: 'verified' | 'badge' | 'style';
  text?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const badgeIcons = {
  'Top Creator': Crown,
  'Top Influencer': Star,
  'Mega Influencer': Flame,
  'Innovator': Zap,
  'Style Icon': Award,
  'Trendsetter': Star,
  'Clean Aesthetic': Palette,
  'verified': CheckCircle2,
  // Estilos/Categorias
  'Afrofuturismo': Sparkles,
  'Streetwear': Users,
  'Fashion': Heart,
  'Fashion & Lifestyle': Heart,
  'Minimal': Palette,
  'Vanguarda': Zap,
  'Urban': Users,
  'Sofisticação': Award,
  'Urban Energy': Flame,
  'Bold Fashion': Star,
  'Unique': Sparkles,
  'Creative': Palette,
  // Specialties
  'Minimalismo sofisticado': Palette,
};

// Gradientes polidos baseados no design que você mostrou
const badgeStyles = {
  'verified': {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    shadow: '0 6px 20px rgba(102, 126, 234, 0.4)',
    hoverShadow: '0 8px 25px rgba(102, 126, 234, 0.6)',
  },
  'Top Creator': {
    background: 'linear-gradient(135deg, #f7971e 0%, #ffd200 100%)',
    shadow: '0 6px 20px rgba(247, 151, 30, 0.4)',
    hoverShadow: '0 8px 25px rgba(247, 151, 30, 0.6)',
  },
  'Top Influencer': {
    background: 'linear-gradient(135deg, #f7971e 0%, #ffd200 100%)',
    shadow: '0 6px 20px rgba(247, 151, 30, 0.4)',
    hoverShadow: '0 8px 25px rgba(247, 151, 30, 0.6)',
  },
  'Mega Influencer': {
    background: 'linear-gradient(135deg, #ff4500 0%, #ff6347 50%, #ffa500 100%)',
    shadow: '0 6px 20px rgba(255, 69, 0, 0.4)',
    hoverShadow: '0 8px 25px rgba(255, 69, 0, 0.6)',
  },
  'Innovator': {
    background: 'linear-gradient(135deg, #32ff32 0%, #65ff65 50%, #98ff98 100%)',
    shadow: '0 6px 20px rgba(50, 255, 50, 0.4)',
    hoverShadow: '0 8px 25px rgba(50, 255, 50, 0.6)',
  },
  'Style Icon': {
    background: 'linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%)',
    shadow: '0 6px 20px rgba(139, 92, 246, 0.4)',
    hoverShadow: '0 8px 25px rgba(139, 92, 246, 0.6)',
  },
  'Trendsetter': {
    background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    shadow: '0 6px 20px rgba(240, 147, 251, 0.4)',
    hoverShadow: '0 8px 25px rgba(240, 147, 251, 0.6)',
  },
  'Clean Aesthetic': {
    background: 'linear-gradient(135deg, #2c3e50 0%, #bdc3c7 50%, #ecf0f1 100%)',
    shadow: '0 6px 20px rgba(44, 62, 80, 0.4)',
    hoverShadow: '0 8px 25px rgba(44, 62, 80, 0.6)',
  },
  // Estilos/Categorias
  'Afrofuturismo': {
    background: 'linear-gradient(135deg, #D4AF37 0%, #FF8C42 100%)',
    shadow: '0 6px 20px rgba(212, 175, 55, 0.4)',
    hoverShadow: '0 8px 25px rgba(212, 175, 55, 0.6)',
  },
  'Streetwear': {
    background: 'linear-gradient(135deg, #4A90E2 0%, #8B6F47 100%)',
    shadow: '0 6px 20px rgba(74, 144, 226, 0.4)',
    hoverShadow: '0 8px 25px rgba(74, 144, 226, 0.6)',
  },
  'Fashion': {
    background: 'linear-gradient(135deg, #E74C3C 0%, #F39C12 100%)',
    shadow: '0 6px 20px rgba(231, 76, 60, 0.4)',
    hoverShadow: '0 8px 25px rgba(231, 76, 60, 0.6)',
  },
  'Fashion & Lifestyle': {
    background: 'linear-gradient(135deg, #FF1493 0%, #FFB6D9 100%)',
    shadow: '0 6px 20px rgba(255, 20, 147, 0.4)',
    hoverShadow: '0 8px 25px rgba(255, 20, 147, 0.6)',
  },
  'Minimal': {
    background: 'linear-gradient(135deg, #34495E 0%, #95A5A6 100%)',
    shadow: '0 6px 20px rgba(52, 73, 94, 0.4)',
    hoverShadow: '0 8px 25px rgba(52, 73, 94, 0.6)',
  },
  'Vanguarda': {
    background: 'linear-gradient(135deg, #00CED1 0%, #00FFFF 100%)',
    shadow: '0 6px 20px rgba(0, 206, 209, 0.4)',
    hoverShadow: '0 8px 25px rgba(0, 206, 209, 0.6)',
  },
  'Urban': {
    background: 'linear-gradient(135deg, #4169E1 0%, #00BFFF 100%)',
    shadow: '0 6px 20px rgba(65, 105, 225, 0.4)',
    hoverShadow: '0 8px 25px rgba(65, 105, 225, 0.6)',
  },
  'Sofisticação': {
    background: 'linear-gradient(135deg, #000000 0%, #FFD700 100%)',
    shadow: '0 6px 20px rgba(255, 215, 0, 0.4)',
    hoverShadow: '0 8px 25px rgba(255, 215, 0, 0.6)',
  },
  'Urban Energy': {
    background: 'linear-gradient(135deg, #D97520 0%, #F39C12 100%)',
    shadow: '0 6px 20px rgba(217, 117, 32, 0.4)',
    hoverShadow: '0 8px 25px rgba(217, 117, 32, 0.6)',
  },
  'Bold Fashion': {
    background: 'linear-gradient(135deg, #90EE90 0%, #FF8C00 100%)',
    shadow: '0 6px 20px rgba(144, 238, 144, 0.4)',
    hoverShadow: '0 8px 25px rgba(144, 238, 144, 0.6)',
  },
  'Unique': {
    background: 'linear-gradient(135deg, #000000 0%, #FF8C00 100%)',
    shadow: '0 6px 20px rgba(255, 140, 0, 0.4)',
    hoverShadow: '0 8px 25px rgba(255, 140, 0, 0.6)',
  },
  'Creative': {
    background: 'linear-gradient(135deg, #8B4513 0%, #F5F5DC 100%)',
    shadow: '0 6px 20px rgba(139, 69, 19, 0.4)',
    hoverShadow: '0 8px 25px rgba(139, 69, 19, 0.6)',
  },
  // Specialties especiais
  'Minimalismo sofisticado': {
    background: 'linear-gradient(135deg, #34495E 0%, #95A5A6 50%, #BDC3C7 100%)',
    shadow: '0 6px 20px rgba(52, 73, 94, 0.3)',
    hoverShadow: '0 8px 25px rgba(52, 73, 94, 0.5)',
  },
};

const sizeClasses = {
  sm: {
    container: 'h-7 px-3 text-xs min-w-[80px]',
    icon: 'w-3 h-3',
  },
  md: {
    container: 'h-8 px-4 text-sm min-w-[100px]',
    icon: 'w-4 h-4',
  },
  lg: {
    container: 'h-10 px-5 text-base min-w-[120px]',
    icon: 'w-5 h-5',
  },
};

export const ShineBadge = ({ 
  type, 
  text, 
  size = 'sm',
  className = '' 
}: ShineBadgeProps) => {
  const isVerified = type === 'verified';
  const isStyle = type === 'style';
  const badgeText = isVerified ? 'Verificado' : text;
  const IconComponent = badgeIcons[text as keyof typeof badgeIcons] || badgeIcons.verified;
  
  const sizeConfig = sizeClasses[size];
  const styleKey = isVerified ? 'verified' : (text as keyof typeof badgeStyles) || 'verified';
  const badgeStyle = badgeStyles[styleKey] || badgeStyles.verified;

  return (
    <>
      <style jsx>{`
        @keyframes shine {
          0% {
            left: -80px;
          }
          40% {
            left: calc(100% + 20px);
          }
          100% {
            left: calc(100% + 20px);
          }
        }
        
        .shine-badge::before {
          content: '';
          position: absolute;
          height: 250%;
          width: 30px;
          top: 0;
          left: -60px;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
          transform: rotate(45deg) translateY(-35%);
          animation: shine 3s ease infinite;
        }
      `}</style>
      
      <motion.div
        className={`
          shine-badge relative inline-flex items-center justify-center gap-2
          ${sizeConfig.container} ${isStyle ? 'rounded-full' : 'rounded-xl'} font-semibold text-white 
          cursor-pointer overflow-hidden transition-all duration-300 ease-out
          ${isStyle ? 'uppercase tracking-wider' : ''}
          ${className}
        `}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ 
          scale: 1.05,
          y: -2
        }}
        transition={{ duration: 0.2 }}
        style={{
          background: badgeStyle.background,
          boxShadow: `${badgeStyle.shadow}, inset 0 1px 0 rgba(255, 255, 255, 0.2)`,
        }}
        onMouseEnter={(e) => {
          const element = e.currentTarget as HTMLElement;
          element.style.boxShadow = `${badgeStyle.hoverShadow}, inset 0 1px 0 rgba(255, 255, 255, 0.3)`;
        }}
        onMouseLeave={(e) => {
          const element = e.currentTarget as HTMLElement;
          element.style.boxShadow = `${badgeStyle.shadow}, inset 0 1px 0 rgba(255, 255, 255, 0.2)`;
        }}
      >
        <IconComponent className={sizeConfig.icon} />
        {badgeText && <span className="font-semibold tracking-wide">{badgeText}</span>}
      </motion.div>
    </>
  );
};