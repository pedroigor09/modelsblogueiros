import { useEffect, useRef } from 'react';
import { ShowcaseRefs, ShowcaseState } from './types';
import { initGSAP, initLenis, cleanupGSAP } from './gsap-config';
import { resetComponentState } from './state-manager';
import { animateColumnsEntry } from './loading-animations';
import { setupSectionPositions, setupSplitTexts, setupScrollTriggers, snapToSection } from './scroll-manager';
import { changeSection, animateFeaturedTexts, animateBackgrounds, animateNavigation } from './section-animations';
import { updateProgressNumbers, updateDebugInfo, setupDebug, setupNavigation } from './utils';

export const useShowcase = () => {
  const isInitialized = useRef(false);
  const fixedContainerRef = useRef<HTMLDivElement>(null);
  const debugInfoRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const leftColumnRef = useRef<HTMLDivElement>(null);
  const rightColumnRef = useRef<HTMLDivElement>(null);
  const featuredRef = useRef<HTMLDivElement>(null);
  const progressFillRef = useRef<HTMLDivElement>(null);
  const currentSectionRef = useRef<HTMLSpanElement>(null);

  const currentSection = useRef(0);
  const isAnimating = useRef(false);
  const isSnapping = useRef(false);
  const lastProgress = useRef(0);
  const scrollDirection = useRef(0);
  const sectionPositions = useRef<number[]>([]);
  const splitTexts = useRef<{ [key: string]: unknown }>({});
  const lenis = useRef<unknown>(null);

  const refs: ShowcaseRefs = {
    loadingOverlayRef: useRef<HTMLDivElement>(null),
    loadingCounterRef: useRef<HTMLSpanElement>(null),
    fixedContainerRef,
    debugInfoRef,
    headerRef,
    contentRef,
    footerRef,
    leftColumnRef,
    rightColumnRef,
    featuredRef,
    progressFillRef,
    currentSectionRef,
  };

  const state: ShowcaseState = {
    currentSection,
    isAnimating,
    isSnapping,
    lastProgress,
    scrollDirection,
    sectionPositions,
    splitTexts,
    lenis,
  };

  const initPage = async () => {
    
    setTimeout(() => {
      const isMobile = window.innerWidth <= 768 || 'ontouchstart' in window;
      
      initGSAP();
      
      if (isMobile) {
        
        setupSectionPositions(state);
        setupSplitTexts(state);
        
        state.currentSection.current = 0;
        
        setTimeout(() => {
          const artists = document.querySelectorAll('.artist');
          const categories = document.querySelectorAll('.category');
          
          artists.forEach(artist => artist.classList.add('loaded'));
          categories.forEach(category => category.classList.add('loaded'));
        }, 500);
        
        changeSection(
          0, 
          refs,
          state,
          () => updateProgressNumbers(state, refs),
          (info: string) => updateDebugInfo(info, refs),
          (prev: number, next: number, isDown: boolean) => animateFeaturedTexts(prev, next, isDown, state),
          (prev: number, next: number, isDown: boolean) => animateBackgrounds(prev, next, isDown, state),
          animateNavigation
        );
        
        setupNavigation(state, () => {}); // Função vazia para snapToSection no mobile
        
        setupDebug(refs);
        updateProgressNumbers(state, refs);
        
        setTimeout(() => {
          animateColumnsEntry();
        }, 500);
        
      } else {
        
        initLenis().then((lenisInstance) => {
          lenis.current = lenisInstance;
          
          setupSectionPositions(state);
          setupSplitTexts(state);
          
          setupScrollTriggers(
            refs,
            state,
            (info: string) => updateDebugInfo(info, refs),
            (targetSection: number) => snapToSection(
              targetSection,
              state,
              (newSection: number) => changeSection(
                newSection,
                refs,
                state,
                () => updateProgressNumbers(state, refs),
                (info: string) => updateDebugInfo(info, refs),
                (prev: number, next: number, isDown: boolean) => animateFeaturedTexts(prev, next, isDown, state),
                (prev: number, next: number, isDown: boolean) => animateBackgrounds(prev, next, isDown, state),
                animateNavigation
              )
            ),
            (newSection: number) => changeSection(
              newSection,
              refs,
              state,
              () => updateProgressNumbers(state, refs),
              (info: string) => updateDebugInfo(info, refs),
              (prev: number, next: number, isDown: boolean) => animateFeaturedTexts(prev, next, isDown, state),
              (prev: number, next: number, isDown: boolean) => animateBackgrounds(prev, next, isDown, state),
              animateNavigation
            )
          );
          
          setupNavigation(state, (targetSection: number) => 
            snapToSection(
              targetSection,
              state,
              (newSection: number) => changeSection(
                newSection,
                refs,
                state,
                () => updateProgressNumbers(state, refs),
                (info: string) => updateDebugInfo(info, refs),
                (prev: number, next: number, isDown: boolean) => animateFeaturedTexts(prev, next, isDown, state),
                (prev: number, next: number, isDown: boolean) => animateBackgrounds(prev, next, isDown, state),
                animateNavigation
              )
            )
          );
          
          setupDebug(refs);
          updateProgressNumbers(state, refs);
          
          setTimeout(() => {
            const artists = document.querySelectorAll('.artist');
            const categories = document.querySelectorAll('.category');
            
            artists.forEach(artist => artist.classList.add('loaded'));
            categories.forEach(category => category.classList.add('loaded'));
            
            animateColumnsEntry();
          }, 500);
        });
      }
    }, 100);
  };

  const startShowcase = () => {
    if (!isInitialized.current) {
      isInitialized.current = true;
      initPage();
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }

    resetComponentState(refs, state);
    
    const handleBeforeUnload = () => {
      cleanupGSAP();
    };
    
    const handlePageShow = (event: PageTransitionEvent) => {
      if (event.persisted) {
        setTimeout(() => {
          resetComponentState(refs, state);
          initPage();
        }, 100);
      }
    };

    const handleLoad = () => {
      window.scrollTo(0, 0);
    };
    
    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('pageshow', handlePageShow);
    window.addEventListener('load', handleLoad);
    

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('pageshow', handlePageShow);
      window.removeEventListener('load', handleLoad);
      cleanupGSAP();
    };
  }, [refs, state]); 

  return { refs, startShowcase };
};