import React from 'react';

export interface Blogger {
  id: number;
  name: string;
  category: string;
  featured: string;
  image: string;
  active?: boolean;
}

export interface ShowcaseRefs {
  loadingOverlayRef: React.RefObject<HTMLDivElement | null>;
  loadingCounterRef: React.RefObject<HTMLSpanElement | null>;
  fixedContainerRef: React.RefObject<HTMLDivElement | null>;
  debugInfoRef: React.RefObject<HTMLDivElement | null>;
  headerRef: React.RefObject<HTMLDivElement | null>;
  contentRef: React.RefObject<HTMLDivElement | null>;
  footerRef: React.RefObject<HTMLDivElement | null>;
  leftColumnRef: React.RefObject<HTMLDivElement | null>;
  rightColumnRef: React.RefObject<HTMLDivElement | null>;
  featuredRef: React.RefObject<HTMLDivElement | null>;
  progressFillRef: React.RefObject<HTMLDivElement | null>;
  currentSectionRef: React.RefObject<HTMLSpanElement | null>;
}

export interface ShowcaseState {
  currentSection: React.MutableRefObject<number>;
  isAnimating: React.MutableRefObject<boolean>;
  isSnapping: React.MutableRefObject<boolean>;
  lastProgress: React.MutableRefObject<number>;
  scrollDirection: React.MutableRefObject<number>;
  sectionPositions: React.MutableRefObject<number[]>;
  splitTexts: React.MutableRefObject<{ [key: string]: any }>;
  lenis: React.MutableRefObject<any>;
}