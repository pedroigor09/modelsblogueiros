import { useEffect, useRef } from 'react';
import { ShowcaseRefs, ShowcaseState } from './types';
import { initGSAP, initLenis, cleanupGSAP } from './gsap-config';
import { resetComponentState } from './state-manager';
import { animateLoadingCounter, animateColumnsEntry } from './loading-animations';
import { setupSectionPositions, setupSplitTexts, setupScrollTriggers, snapToSection } from './scroll-manager';
import { changeSection, animateFeaturedTexts, animateBackgrounds, animateNavigation } from './section-animations';
import { updateProgressNumbers, updateDebugInfo, setupDebug, setupNavigation } from './utils';

export const useShowcase = () => {
  const loadingOverlayRef = useRef<HTMLDivElement>(null);
  const loadingCounterRef = useRef<HTMLSpanElement>(null);
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
    loadingOverlayRef,
    loadingCounterRef,
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
    if (refs.loadingOverlayRef.current) {
      refs.loadingOverlayRef.current.style.display = 'flex';
      refs.loadingOverlayRef.current.style.transform = 'translateY(0)';
      refs.loadingOverlayRef.current.style.opacity = '1';
    }
    
    setTimeout(() => {
      initGSAP();
      
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
        
        animateLoadingCounter(refs, () => {
          animateColumnsEntry();
        });
      });
    }, 100);
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
    
    const initializeAfterDelay = () => {
      setTimeout(() => {
        if (document.fonts) {
          document.fonts.ready.then(() => {
            initPage();
          });
        } else {
          initPage();
        }
      }, 500); 
    };

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initializeAfterDelay);
    } else {
      initializeAfterDelay();
    }

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('pageshow', handlePageShow);
      window.removeEventListener('load', handleLoad);
      document.removeEventListener('DOMContentLoaded', initializeAfterDelay);
      cleanupGSAP();
    };
  }, [refs, state]); 

  return { refs };
};