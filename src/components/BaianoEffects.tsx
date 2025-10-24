'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useBaianoMode } from '@/contexts/BaianoModeContext';
import { 
  Sun, 
  Palmtree, 
  Music, 
  Star, 
  Heart, 
  Sparkles, 
  Coffee,
  Crown,
  Flame,
  Zap,
  Camera,
  Mic,
  Drum,
  Guitar,
  Film,
  Aperture,
  Radio,
  Headphones,
  PartyPopper,
  Trophy,
  Gem,
  Rainbow,
  Waves,
  Mountain
} from 'lucide-react';

export default function BaianoEffects() {
  const { isBaianoMode } = useBaianoMode();

  const floatingIcons = [
    // Elementos naturais e culturais
    { icon: Sun, color: '#FFD700', delay: 0 },
    { icon: Palmtree, color: '#228B22', delay: 0.2 },
    { icon: Waves, color: '#00CED1', delay: 0.4 },
    { icon: Mountain, color: '#8B4513', delay: 0.6 },
    { icon: Rainbow, color: '#FF69B4', delay: 0.8 },
    
    // Música e cultura
    { icon: Music, color: '#FF6347', delay: 1 },
    { icon: Drum, color: '#8B4513', delay: 1.2 },
    { icon: Guitar, color: '#FFD700', delay: 1.4 },
    { icon: Mic, color: '#9370DB', delay: 1.6 },
    { icon: Radio, color: '#FF4500', delay: 1.8 },
    { icon: Headphones, color: '#32CD32', delay: 2 },
    
    // Cinema e fotografia
    { icon: Camera, color: '#4169E1', delay: 2.2 },
    { icon: Film, color: '#DC143C', delay: 2.4 },
    { icon: Aperture, color: '#FF8C00', delay: 2.6 },
    
    // Festa e celebração
    { icon: PartyPopper, color: '#FF1493', delay: 2.8 },
    { icon: Star, color: '#FFD700', delay: 3 },
    { icon: Crown, color: '#FFD700', delay: 3.2 },
    { icon: Trophy, color: '#FFD700', delay: 3.4 },
    { icon: Gem, color: '#9370DB', delay: 3.6 },
    
    // Energia e efeitos
    { icon: Heart, color: '#FF69B4', delay: 3.8 },
    { icon: Sparkles, color: '#FF69B4', delay: 4 },
    { icon: Flame, color: '#FF4500', delay: 4.2 },
    { icon: Zap, color: '#FFFF00', delay: 4.4 },
    { icon: Coffee, color: '#8B4513', delay: 4.6 },
  ];

  const culturalEmoji = [
    // Cultura baiana e brasileira
    '😎', '🥳', '🎉', '🌴', '☀️', '🎵', '🎶', '🎊', '✨', '🔥',
    // Música e dança
    '🎸', '🥁', '🎺', '🎤', '💃', '🕺', '🎭', '🎪', 
    // Cinema e arte
    '🎬', '📸', '🎨', '🖌️', '🎪', '🎠', 
    // Festa e celebração
    '🎊', '🎈', '🍾', '🥂', '🏆', '👑', '💎', '⭐',
    // Natureza tropical
    '🌺', '🌸', '🌴', '🥥', '🍍', '🦜', '🐚', '🌊',
    // Energia e diversão
    '⚡', '💥', '🌟', '✨', '💫', '🌈', '🔆', '💖'
  ];

  return (
    <AnimatePresence>
      {isBaianoMode && (
        <>
          {/* Background Overlay com efeito ensolarado cinematográfico */}
          <motion.div
            className="fixed inset-0 pointer-events-none z-30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            style={{
              background: `
                radial-gradient(circle at 20% 20%, rgba(255, 215, 0, 0.15) 0%, transparent 60%),
                radial-gradient(circle at 80% 30%, rgba(255, 140, 0, 0.12) 0%, transparent 55%),
                radial-gradient(circle at 40% 80%, rgba(255, 69, 0, 0.1) 0%, transparent 50%),
                radial-gradient(circle at 60% 10%, rgba(255, 20, 147, 0.08) 0%, transparent 45%),
                linear-gradient(45deg, rgba(255, 215, 0, 0.05) 0%, rgba(255, 69, 0, 0.05) 50%, rgba(255, 20, 147, 0.05) 100%)
              `,
              mixBlendMode: 'soft-light'
            }}
          />

          {/* Filtro cinematográfico Rockstar Games */}
          <motion.div
            className="fixed inset-0 pointer-events-none z-29"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2 }}
            style={{
              background: `
                linear-gradient(0deg, rgba(255, 215, 0, 0.02) 0%, transparent 20%, transparent 80%, rgba(255, 69, 0, 0.02) 100%),
                repeating-linear-gradient(90deg, 
                  transparent 0px, 
                  rgba(255, 255, 255, 0.01) 1px, 
                  transparent 2px, 
                  transparent 10px
                )
              `,
              filter: 'blur(0.3px)',
              mixBlendMode: 'overlay'
            }}
          />

          {/* Ícones Flutuantes */}
          {floatingIcons.map((item, index) => (
            <motion.div
              key={index}
              className="fixed pointer-events-none z-40"
              initial={{ 
                x: Math.random() * window.innerWidth,
                y: window.innerHeight + 100,
                rotate: 0,
                scale: 0
              }}
              animate={{ 
                x: [
                  Math.random() * window.innerWidth,
                  Math.random() * window.innerWidth,
                  Math.random() * window.innerWidth
                ],
                y: [
                  window.innerHeight + 100,
                  Math.random() * window.innerHeight,
                  -100
                ],
                rotate: [0, 360, 720],
                scale: [0, 1, 0.8, 0]
              }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{
                duration: 8 + Math.random() * 4,
                delay: item.delay,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              <item.icon 
                size={24 + Math.random() * 16} 
                color={item.color}
                style={{ 
                  filter: 'drop-shadow(0 0 8px rgba(0,0,0,0.3))',
                  animation: `pulse ${2 + Math.random()}s ease-in-out infinite alternate`
                }}
              />
            </motion.div>
          ))}

          {/* Emojis com Óculos Flutuantes */}
          {culturalEmoji.map((emoji, index) => (
            <motion.div
              key={`emoji-${index}`}
              className="fixed pointer-events-none z-40 text-4xl"
              initial={{ 
                x: Math.random() * window.innerWidth,
                y: window.innerHeight + 100,
                rotate: 0,
                scale: 0
              }}
              animate={{ 
                x: [
                  Math.random() * window.innerWidth,
                  Math.random() * window.innerWidth + (Math.random() - 0.5) * 200
                ],
                y: [
                  window.innerHeight + 100,
                  Math.random() * (window.innerHeight - 200) + 100,
                  -100
                ],
                rotate: [0, 180 + Math.random() * 180],
                scale: [0, 1.2, 1, 0]
              }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{
                duration: 6 + Math.random() * 3,
                delay: index * 0.3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <span style={{ 
                textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                transform: `rotate(${Math.random() * 20 - 10}deg)`
              }}>
                {emoji}
              </span>
            </motion.div>
          ))}

          {/* Árvores nas laterais */}
          <motion.div
            className="fixed left-0 bottom-0 pointer-events-none z-35"
            initial={{ x: -200, opacity: 0 }}
            animate={{ x: 0, opacity: 0.8 }}
            exit={{ x: -200, opacity: 0 }}
            transition={{ duration: 1.5, delay: 0.5 }}
          >
            <Palmtree 
              size={120} 
              color="#228B22"
              style={{ 
                filter: 'drop-shadow(4px 4px 8px rgba(0,0,0,0.3))',
                transform: 'rotate(-15deg)'
              }}
            />
          </motion.div>

          <motion.div
            className="fixed right-0 bottom-0 pointer-events-none z-35"
            initial={{ x: 200, opacity: 0 }}
            animate={{ x: 0, opacity: 0.8 }}
            exit={{ x: 200, opacity: 0 }}
            transition={{ duration: 1.5, delay: 0.7 }}
          >
            <Palmtree 
              size={100} 
              color="#32CD32"
              style={{ 
                filter: 'drop-shadow(-4px 4px 8px rgba(0,0,0,0.3))',
                transform: 'rotate(10deg)'
              }}
            />
          </motion.div>

          {/* Sol Radiante cinematográfico */}
          <motion.div
            className="fixed top-10 right-10 pointer-events-none z-40"
            initial={{ scale: 0, rotate: 0 }}
            animate={{ 
              scale: [0, 1.3, 1.1, 1],
              rotate: [0, 360]
            }}
            exit={{ scale: 0 }}
            transition={{ 
              scale: { duration: 2, ease: "backOut" },
              rotate: { duration: 12, repeat: Infinity, ease: "linear" }
            }}
          >
            <Sun 
              size={90} 
              color="#FFD700"
              style={{ 
                filter: 'drop-shadow(0 0 30px rgba(255, 215, 0, 0.9)) drop-shadow(0 0 60px rgba(255, 140, 0, 0.6))',
              }}
            />
          </motion.div>

          {/* Câmera cinematográfica flutuante */}
          <motion.div
            className="fixed top-20 left-20 pointer-events-none z-40"
            initial={{ scale: 0, rotate: -45 }}
            animate={{ 
              scale: [0, 1, 0.9],
              rotate: [-45, 15, -15, 10],
              y: [0, -10, 10, 0]
            }}
            exit={{ scale: 0 }}
            transition={{ 
              scale: { duration: 1.8 },
              rotate: { duration: 4, repeat: Infinity, ease: "easeInOut" },
              y: { duration: 3, repeat: Infinity, ease: "easeInOut" }
            }}
          >
            <Camera 
              size={60} 
              color="#4169E1"
              style={{ 
                filter: 'drop-shadow(0 0 15px rgba(65, 105, 225, 0.7))',
              }}
            />
          </motion.div>

          {/* Microfone no canto inferior esquerdo */}
          <motion.div
            className="fixed bottom-20 left-20 pointer-events-none z-40"
            initial={{ scale: 0, y: 100 }}
            animate={{ 
              scale: [0, 1.1, 1],
              y: [100, 0, -5, 0],
              rotate: [0, 5, -5, 0]
            }}
            exit={{ scale: 0, y: 100 }}
            transition={{ 
              scale: { duration: 1.5, delay: 0.5 },
              y: { duration: 2, repeat: Infinity, ease: "easeInOut" },
              rotate: { duration: 2.5, repeat: Infinity, ease: "easeInOut" }
            }}
          >
            <Mic 
              size={50} 
              color="#9370DB"
              style={{ 
                filter: 'drop-shadow(0 0 12px rgba(147, 112, 219, 0.8))',
              }}
            />
          </motion.div>

          {/* Partículas de festa cinematográficas */}
          {[...Array(25)].map((_, i) => (
            <motion.div
              key={`particle-${i}`}
              className="fixed rounded-full pointer-events-none z-35"
              style={{
                width: `${8 + Math.random() * 12}px`,
                height: `${8 + Math.random() * 12}px`,
                background: `linear-gradient(45deg, ${
                  ['#FFD700', '#FF6347', '#FF69B4', '#9370DB', '#32CD32', '#00CED1', '#FF4500'][i % 7]
                }, ${
                  ['#FFA500', '#FF4500', '#FF1493', '#8A2BE2', '#228B22', '#4169E1', '#DC143C'][i % 7]
                })`,
                boxShadow: `0 0 ${10 + Math.random() * 20}px ${
                  ['#FFD700', '#FF6347', '#FF69B4', '#9370DB', '#32CD32', '#00CED1', '#FF4500'][i % 7]
                }80`
              }}
              initial={{ 
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                scale: 0,
                opacity: 0
              }}
              animate={{ 
                x: [
                  Math.random() * window.innerWidth,
                  Math.random() * window.innerWidth,
                  Math.random() * window.innerWidth
                ],
                y: [
                  Math.random() * window.innerHeight,
                  Math.random() * window.innerHeight,
                  Math.random() * window.innerHeight
                ],
                scale: [0, 1.5, 0.8, 0],
                rotate: [0, 180, 360],
                opacity: [0, 1, 0.7, 0]
              }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{
                duration: 5 + Math.random() * 3,
                delay: i * 0.08,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          ))}

          {/* Raios de luz cinematográficos */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={`light-ray-${i}`}
              className="fixed pointer-events-none z-30"
              style={{
                width: '2px',
                height: `${200 + Math.random() * 400}px`,
                background: `linear-gradient(to bottom, 
                  transparent 0%, 
                  ${['#FFD700', '#FF6347', '#FF69B4', '#9370DB'][i % 4]}60 20%, 
                  ${['#FFD700', '#FF6347', '#FF69B4', '#9370DB'][i % 4]}80 50%, 
                  ${['#FFD700', '#FF6347', '#FF69B4', '#9370DB'][i % 4]}60 80%, 
                  transparent 100%
                )`,
                transformOrigin: 'top center',
                left: `${10 + (i * 12)}%`,
                top: '0'
              }}
              initial={{ 
                scaleY: 0,
                rotate: Math.random() * 20 - 10,
                opacity: 0
              }}
              animate={{ 
                scaleY: [0, 1, 0.8, 0],
                rotate: [
                  Math.random() * 20 - 10,
                  Math.random() * 30 - 15,
                  Math.random() * 20 - 10
                ],
                opacity: [0, 0.8, 0.6, 0]
              }}
              exit={{ scaleY: 0, opacity: 0 }}
              transition={{
                duration: 4 + Math.random() * 2,
                delay: i * 0.3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          ))}

          {/* Explosões de cor nos cantos */}
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={`explosion-${i}`}
              className="fixed pointer-events-none z-25"
              style={{
                width: '300px',
                height: '300px',
                borderRadius: '50%',
                background: `radial-gradient(circle, 
                  ${['#FFD700', '#FF6347', '#FF69B4', '#9370DB'][i]}40 0%, 
                  ${['#FFD700', '#FF6347', '#FF69B4', '#9370DB'][i]}20 30%, 
                  transparent 70%
                )`,
                [['top', 'left', 'top', 'bottom'][i]]: i < 2 ? '0' : 'auto',
                [['left', 'right', 'right', 'left'][i]]: i % 2 === 0 ? '0' : 'auto',
                [['bottom', 'bottom', 'top', 'top'][i]]: i >= 2 ? '0' : 'auto',
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: [0, 1.2, 0.8, 0],
                opacity: [0, 0.6, 0.3, 0]
              }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{
                duration: 6,
                delay: i * 0.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          ))}
        </>
      )}
    </AnimatePresence>
  );
}