'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';
import { useBaianoMode } from '@/contexts/BaianoModeContext';

export default function BaianoButton() {
  const { isBaianoMode, toggleBaianoMode, isTransitioning } = useBaianoMode();

  return (
    <motion.div
      className="fixed right-6 bottom-6 z-50"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 2, type: "spring", stiffness: 200, damping: 20 }}
    >
      <motion.button
        onClick={toggleBaianoMode}
        disabled={isTransitioning}
        className={`
          relative group w-14 h-14 rounded-full backdrop-blur-md border transition-all duration-300
          ${isBaianoMode 
            ? 'bg-gradient-to-br from-yellow-500/20 to-orange-600/20 border-yellow-400/50 shadow-lg shadow-yellow-500/25' 
            : 'bg-black/20 border-white/20 hover:border-white/40'
          }
        `}
        whileHover={{ 
          scale: 1.1,
          transition: { type: "spring", stiffness: 400, damping: 10 }
        }}
        whileTap={{ scale: 0.95 }}
        animate={isTransitioning ? { 
          scale: [1, 1.2, 1],
          rotate: [0, 360]
        } : {}}
        transition={{ 
          duration: isTransitioning ? 0.8 : 0.3
        }}
      >
        {/* Pulse Ring quando ativo */}
        <AnimatePresence>
          {isBaianoMode && (
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-yellow-400/60"
              initial={{ scale: 1, opacity: 0.8 }}
              animate={{ 
                scale: [1, 1.8, 1],
                opacity: [0.8, 0, 0.8]
              }}
              exit={{ scale: 1, opacity: 0 }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeOut"
              }}
            />
          )}
        </AnimatePresence>

        {/* Icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            animate={isBaianoMode ? { 
              scale: [1, 1.1, 1]
            } : {}}
            transition={{ 
              duration: 0.6,
              repeat: isBaianoMode ? Infinity : 0,
              ease: "easeInOut"
            }}
          >
            {isBaianoMode ? (
              <Volume2 className="w-6 h-6 text-yellow-400 drop-shadow-lg" />
            ) : (
              <VolumeX className="w-6 h-6 text-white/70 group-hover:text-white transition-colors" />
            )}
          </motion.div>
        </div>

        {/* Glow effect quando ativo */}
        <AnimatePresence>
          {isBaianoMode && (
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-br from-yellow-400/30 to-orange-500/30 blur-md"
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: [0.5, 0.8, 0.5],
                scale: [0.8, 1.1, 0.8]
              }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          )}
        </AnimatePresence>
      </motion.button>
    </motion.div>
  );
}