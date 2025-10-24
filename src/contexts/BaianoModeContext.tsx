'use client';

import React, { createContext, useContext, useState, useRef, useEffect } from 'react';
import { getAssetPath } from '@/utils/paths';

interface BaianoModeContextType {
  isBaianoMode: boolean;
  toggleBaianoMode: () => void;
  isTransitioning: boolean;
}

const BaianoModeContext = createContext<BaianoModeContextType | undefined>(undefined);

export function BaianoModeProvider({ children }: { children: React.ReactNode }) {
  const [isBaianoMode, setIsBaianoMode] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Precarregar o áudio
    audioRef.current = new Audio(getAssetPath('/reidosfaixa.mp3'));
    audioRef.current.loop = true;
    audioRef.current.volume = 0.7;
  }, []);

  const toggleBaianoMode = () => {
    setIsTransitioning(true);
    
    // Efeito de tremor da tela
    document.body.style.animation = 'shake 0.8s ease-in-out';
    
    setTimeout(() => {
      setIsBaianoMode(!isBaianoMode);
      
      if (!isBaianoMode) {
        // Ativando modo baiano - tocar música
        audioRef.current?.play().catch(console.error);
      } else {
        // Desativando modo baiano - parar música
        audioRef.current?.pause();
        if (audioRef.current) {
          audioRef.current.currentTime = 0;
        }
      }
      
      setTimeout(() => {
        document.body.style.animation = '';
        setIsTransitioning(false);
      }, 200);
    }, 400);
  };

  return (
    <BaianoModeContext.Provider value={{
      isBaianoMode,
      toggleBaianoMode,
      isTransitioning
    }}>
      {children}
    </BaianoModeContext.Provider>
  );
}

export function useBaianoMode() {
  const context = useContext(BaianoModeContext);
  if (context === undefined) {
    throw new Error('useBaianoMode must be used within a BaianoModeProvider');
  }
  return context;
}