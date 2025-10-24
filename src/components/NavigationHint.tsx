'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

export const NavigationHint = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detectar se é mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768 || 'ontouchstart' in window);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Esconder após 10 segundos
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 10000);

    return () => {
      window.removeEventListener('resize', checkMobile);
      clearTimeout(timer);
    };
  }, []);

  // Também esconder quando o usuário interagir
  useEffect(() => {
    const handleInteraction = () => setIsVisible(false);
    
    if (isMobile) {
      window.addEventListener('touchstart', handleInteraction);
    } else {
      window.addEventListener('wheel', handleInteraction);
    }

    return () => {
      window.removeEventListener('touchstart', handleInteraction);
      window.removeEventListener('wheel', handleInteraction);
    };
  }, [isMobile]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Overlay escuro sutil */}
          <motion.div 
            className="absolute inset-0 bg-black/30"
            animate={{ opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
          
          {/* Círculo pulsante de fundo */}
          <motion.div
            className="absolute w-96 h-96 rounded-full bg-gradient-to-r from-yellow-400/20 via-orange-400/20 to-red-400/20 blur-3xl"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          />
          
          {/* Container da animação */}
          <div className="relative z-10">
            {isMobile ? (
              // Animação para mobile (swipe)
              <MobileSwipeHint />
            ) : (
              // Animação para desktop (scroll)
              <DesktopScrollHint />
            )}
            
            {/* Texto explicativo */}
            <motion.div
              className="mt-8 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <motion.p
                className="text-white text-lg font-medium drop-shadow-lg"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                {isMobile ? 'Arraste para navegar' : 'Role para navegar'}
              </motion.p>
              <motion.p
                className="text-white/80 text-sm mt-1 drop-shadow-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                {isMobile ? 'Deslize para cima ou para baixo' : 'Use o scroll do mouse'}
              </motion.p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Componente da mão para mobile
const MobileSwipeHint = () => {
  return (
    <div className="relative w-32 h-48 flex flex-col items-center justify-center">
      {/* Container da mão */}
      <div className="relative">
        {/* Mão */}
        <motion.div
          className="text-6xl relative z-10"
          initial={{ y: 20, scale: 0.8 }}
          animate={{ 
            y: [-20, 20, -20],
            scale: [0.8, 1, 0.8]
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          👆
        </motion.div>
        
        {/* Efeito de brilho na mão */}
        <motion.div
          className="absolute inset-0 text-6xl blur-md opacity-50"
          initial={{ y: 20, scale: 0.8 }}
          animate={{ 
            y: [-20, 20, -20],
            scale: [0.8, 1, 0.8]
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          👆
        </motion.div>
      </div>
      
      {/* Rastro de movimento */}
      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.6, 0] }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div className="flex flex-col items-center space-y-3">
          <motion.div 
            className="w-1 h-12 bg-gradient-to-b from-yellow-400 to-transparent rounded-full"
            animate={{ scaleY: [0, 1, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div 
            className="w-1 h-8 bg-gradient-to-b from-orange-400 to-transparent rounded-full"
            animate={{ scaleY: [0, 1, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
          />
          <motion.div 
            className="w-1 h-6 bg-gradient-to-b from-red-400 to-transparent rounded-full"
            animate={{ scaleY: [0, 1, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
          />
        </div>
      </motion.div>
      
      {/* Partículas de movimento */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-white rounded-full"
          style={{
            left: '50%',
            top: '30%',
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            y: [0, 60, 120],
            opacity: [0, 1, 0],
            scale: [0, 1, 0]
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeOut",
            delay: i * 0.3
          }}
        />
      ))}
    </div>
  );
};

// Componente da mão para desktop
const DesktopScrollHint = () => {
  return (
    <div className="relative w-32 h-48 flex flex-col items-center justify-center">
      {/* Mouse/trackpad representação */}
      <motion.div
        className="relative w-16 h-24 border-4 border-white rounded-2xl flex justify-center pt-3 bg-black/20 backdrop-blur-sm"
        initial={{ scale: 0.9 }}
        animate={{ scale: [0.9, 1.1, 0.9] }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        {/* Brilho do mouse */}
        <motion.div
          className="absolute inset-0 border-4 border-yellow-400/50 rounded-2xl blur-sm"
          animate={{ opacity: [0, 1, 0] }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Scroll wheel */}
        <motion.div
          className="w-2 h-6 bg-white rounded-full relative z-10"
          initial={{ y: 0 }}
          animate={{ 
            y: [0, 8, 0],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Efeito de brilho no scroll wheel */}
        <motion.div
          className="absolute w-2 h-6 bg-yellow-400 rounded-full blur-sm opacity-70"
          style={{ top: '12px', left: '50%', transform: 'translateX(-50%)' }}
          animate={{ 
            y: [0, 8, 0],
            opacity: [0, 0.7, 0]
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>
      
      {/* Setas indicando movimento com efeito cascata */}
      <motion.div
        className="mt-6 flex flex-col items-center space-y-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="text-white text-xl"
            initial={{ opacity: 0, y: -10 }}
            animate={{ 
              opacity: [0, 1, 0.3, 0],
              y: [0, 5, 10, 15]
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeOut",
              delay: i * 0.2
            }}
          >
            ⬇
          </motion.div>
        ))}
      </motion.div>
      
      {/* Partículas de scroll */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-yellow-400 rounded-full"
          style={{
            left: '50%',
            top: '40%',
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            y: [0, 80],
            opacity: [0, 1, 0],
            scale: [0, 1, 0]
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeOut",
            delay: i * 0.15
          }}
        />
      ))}
    </div>
  );
};