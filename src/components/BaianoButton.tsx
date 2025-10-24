'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Music } from 'lucide-react';
import { useBaianoMode } from '@/contexts/BaianoModeContext';

export default function BaianoButton() {
  const { isBaianoMode, toggleBaianoMode, isTransitioning } = useBaianoMode();

  return (
    <motion.div
      className="fixed right-6 bottom-6 z-50"
      initial={{ x: 100, y: 100, opacity: 0 }}
      animate={{ x: 0, y: 0, opacity: 1 }}
      transition={{ delay: 1, type: "spring", stiffness: 100 }}
    >
      <motion.button
        onClick={toggleBaianoMode}
        disabled={isTransitioning}
        className={`
          relative group overflow-hidden rounded-xl p-4 font-bold text-white shadow-2xl
          transition-all duration-500 transform-gpu
          ${isBaianoMode 
            ? 'bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500' 
            : 'bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-800'
          }
        `}
        whileHover={{ 
          scale: 1.15, 
          rotate: isBaianoMode ? [0, -8, 8, 0] : [0, -3, 3, 0],
          boxShadow: isBaianoMode 
            ? "0 0 40px rgba(255, 193, 7, 0.9), 0 0 80px rgba(255, 152, 0, 0.7), 0 0 120px rgba(255, 69, 0, 0.5)"
            : "0 0 40px rgba(99, 102, 241, 0.9), 0 0 80px rgba(139, 69, 19, 0.6)"
        }}
        whileTap={{ scale: 0.9 }}
        animate={isTransitioning ? { 
          scale: [1, 1.3, 0.8, 1.2, 1],
          rotate: [0, -15, 15, -8, 0],
          boxShadow: [
            "0 0 20px rgba(255, 255, 255, 0.5)",
            "0 0 60px rgba(255, 215, 0, 0.8)",
            "0 0 100px rgba(255, 69, 0, 0.9)",
            "0 0 80px rgba(255, 20, 147, 0.7)",
            "0 0 40px rgba(99, 102, 241, 0.8)"
          ]
        } : (!isBaianoMode ? {
          scale: [1, 1.05, 1],
          y: [0, -2, 0]
        } : {})}
        transition={{ 
          duration: isTransitioning ? 0.8 : 3,
          repeat: (!isBaianoMode && !isTransitioning) ? Infinity : 0,
          ease: "easeInOut"
        }}
      >
        {/* Sparkles animados */}
        <AnimatePresence>
          {isBaianoMode && (
            <>
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-yellow-300 rounded-full"
                  initial={{ scale: 0, x: 0, y: 0 }}
                  animate={{
                    scale: [0, 1, 0],
                    x: [0, Math.random() * 60 - 30],
                    y: [0, Math.random() * 60 - 30],
                    rotate: [0, 360]
                  }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.3,
                    ease: "easeOut"
                  }}
                  style={{
                    left: '50%',
                    top: '50%',
                  }}
                />
              ))}
            </>
          )}
        </AnimatePresence>

        {/* Border animado */}
        <div className="absolute inset-0 rounded-xl overflow-hidden">
          <div 
            className={`absolute top-0 left-0 w-full h-1 animate-slide-right ${
              isBaianoMode ? 'bg-gradient-to-r from-transparent via-yellow-300 to-transparent' 
                          : 'bg-gradient-to-r from-transparent via-blue-300 to-transparent'
            }`}
          />
          <div 
            className={`absolute top-0 right-0 w-1 h-full animate-slide-down ${
              isBaianoMode ? 'bg-gradient-to-b from-transparent via-orange-300 to-transparent' 
                          : 'bg-gradient-to-b from-transparent via-purple-300 to-transparent'
            }`}
            style={{ animationDelay: '0.25s' }}
          />
          <div 
            className={`absolute bottom-0 right-0 w-full h-1 animate-slide-left ${
              isBaianoMode ? 'bg-gradient-to-l from-transparent via-red-300 to-transparent' 
                          : 'bg-gradient-to-l from-transparent via-indigo-300 to-transparent'
            }`}
            style={{ animationDelay: '0.5s' }}
          />
          <div 
            className={`absolute bottom-0 left-0 w-1 h-full animate-slide-up ${
              isBaianoMode ? 'bg-gradient-to-t from-transparent via-yellow-300 to-transparent' 
                          : 'bg-gradient-to-t from-transparent via-blue-300 to-transparent'
            }`}
            style={{ animationDelay: '0.75s' }}
          />
        </div>

        {/* Conteúdo do botão */}
        <div className="relative z-10 flex flex-col items-center gap-2">
          <motion.div
            animate={isBaianoMode ? { 
              rotate: [0, 360],
              scale: [1, 1.2, 1]
            } : {}}
            transition={{ 
              duration: isBaianoMode ? 2 : 0, 
              repeat: isBaianoMode ? Infinity : 0,
              ease: "linear"
            }}
          >
            {isBaianoMode ? (
              <Sun className="w-8 h-8 text-yellow-100" />
            ) : (
              <Music className="w-8 h-8 text-blue-100" />
            )}
          </motion.div>
          
          <div className="text-center">
            <span className="text-sm font-bold tracking-wide block">
              {isBaianoMode ? 'FESTA!' : 'BAIANO'}
            </span>
            {!isBaianoMode && (
              <span className="text-xs opacity-90 block mt-1">
                MODO
              </span>
            )}
          </div>
        </div>

        {/* Efeito de shine */}
        <div 
          className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: isBaianoMode 
              ? 'linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.4) 50%, transparent 70%)'
              : 'linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.2) 50%, transparent 70%)',
            animation: 'shine 2s ease-in-out infinite'
          }}
        />
      </motion.button>

      <style jsx>{`
        @keyframes slide-right {
          0% { transform: translateX(-100%); }
          50%, 100% { transform: translateX(100%); }
        }
        @keyframes slide-down {
          0% { transform: translateY(-100%); }
          50%, 100% { transform: translateY(100%); }
        }
        @keyframes slide-left {
          0% { transform: translateX(100%); }
          50%, 100% { transform: translateX(-100%); }
        }
        @keyframes slide-up {
          0% { transform: translateY(100%); }
          50%, 100% { transform: translateY(-100%); }
        }
        @keyframes shine {
          0% { transform: translateX(-100%) rotate(45deg); }
          100% { transform: translateX(100%) rotate(45deg); }
        }
        .animate-slide-right { animation: slide-right 2s linear infinite; }
        .animate-slide-down { animation: slide-down 2s linear infinite; }
        .animate-slide-left { animation: slide-left 2s linear infinite; }
        .animate-slide-up { animation: slide-up 2s linear infinite; }
      `}</style>
    </motion.div>
  );
}