import { useEffect, useRef } from 'react';
import { ShowcaseRefs, ShowcaseState } from './types';
import { initGSAP, initLenis, cleanupGSAP } from './gsap-config';
import { resetComponentState } from './state-manager';
import { animateLoadingCounter, animateColumnsEntry } from './loading-animations';
import { setupSectionPositions, setupSplitTexts, setupScrollTriggers, snapToSection } from './scroll-manager';
import { changeSection, animateFeaturedTexts, animateBackgrounds, animateNavigation } from './section-animations';
import { updateProgressNumbers, updateDebugInfo, setupDebug, setupNavigation } from './utils';

export const useShowcase = () => {
  // Refs
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

  // Estados
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
    // Garantir que o loading está sempre visível no início
    if (refs.loadingOverlayRef.current) {
      refs.loadingOverlayRef.current.style.display = 'flex';
      refs.loadingOverlayRef.current.style.transform = 'translateY(0)';
      refs.loadingOverlayRef.current.style.opacity = '1';
    }
    
    // Pequeno delay para garantir que o DOM está pronto
    setTimeout(() => {
      // Inicializar GSAP
      initGSAP();
      
      // Inicializar Lenis
      initLenis().then((lenisInstance) => {
        lenis.current = lenisInstance;
        
        // Configurar posições das seções
        setupSectionPositions(state);
        
        // Configurar SplitText para os textos featured
        setupSplitTexts(state);
        
        // Configurar ScrollTriggers
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
              () => updateProgressNumbers(state),
              (info: string) => updateDebugInfo(info, refs),
              (prev: number, next: number, isDown: boolean) => animateFeaturedTexts(prev, next, isDown, state),
              (prev: number, next: number, isDown: boolean) => animateBackgrounds(prev, next, isDown, state),
              animateNavigation
            )
          )
        );
        
        // Configurar navegação por clique
        setupNavigation(state, (targetSection: number) => 
          snapToSection(
            targetSection,
            state,
            (newSection: number) => changeSection(
              newSection,
              refs,
              state,
              () => updateProgressNumbers(state),
              (info: string) => updateDebugInfo(info, refs),
              (prev: number, next: number, isDown: boolean) => animateFeaturedTexts(prev, next, isDown, state),
              (prev: number, next: number, isDown: boolean) => animateBackgrounds(prev, next, isDown, state),
              animateNavigation
            )
          )
        );
        
        // Debug
        setupDebug(refs);
        
        // SEMPRE executar a animação de loading
        animateLoadingCounter(refs, () => {
          animateColumnsEntry();
        });
      });
    }, 100); // Delay para garantir que o componente está montado
  };

  useEffect(() => {
    // Forçar scroll para o topo imediatamente
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }

    // Reset completo de todos os estados e elementos
    resetComponentState(refs, state);
    
    // Listener para reset antes de sair da página
    const handleBeforeUnload = () => {
      cleanupGSAP();
    };
    
    // Listener para quando a página é totalmente carregada
    const handlePageShow = (event: PageTransitionEvent) => {
      if (event.persisted) {
        setTimeout(() => {
          resetComponentState(refs, state);
          initPage();
        }, 100);
      }
    };

    // Listener para garantir que sempre comece do topo
    const handleLoad = () => {
      window.scrollTo(0, 0);
    };
    
    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('pageshow', handlePageShow);
    window.addEventListener('load', handleLoad);
    
    // Simular o comportamento do DOMContentLoaded original
    const initializeAfterDelay = () => {
      setTimeout(() => {
        if (document.fonts) {
          document.fonts.ready.then(() => {
            initPage();
          });
        } else {
          initPage();
        }
      }, 500); // Mesmo delay do código original
    };

    // Se o documento já estiver carregado, inicializar imediatamente
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
  }, [refs, state]); // Adicionando dependências necessárias

  return { refs };
};