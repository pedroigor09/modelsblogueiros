import { gsap } from 'gsap';
import { ShowcaseRefs, ShowcaseState } from './types';

export const resetComponentState = (
  refs: ShowcaseRefs,
  state: ShowcaseState
) => {
  // Garantir que a página esteja no topo
  if (typeof window !== 'undefined') {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }

  // Reset estados internos
  state.currentSection.current = 0;
  state.isAnimating.current = false;
  state.isSnapping.current = false;
  state.lastProgress.current = 0;
  state.scrollDirection.current = 0;
  state.sectionPositions.current = [];
  state.splitTexts.current = {};

  // Reset loading overlay
  if (refs.loadingOverlayRef.current) {
    refs.loadingOverlayRef.current.style.display = 'flex';
    refs.loadingOverlayRef.current.style.transform = 'translateY(0)';
    refs.loadingOverlayRef.current.style.opacity = '1';
    
    // Reset elementos internos do loading
    const loadingCounter = refs.loadingOverlayRef.current.querySelector('.loading-counter');
    const loadingChildren = refs.loadingOverlayRef.current.children[0];
    
    if (loadingCounter) {
      gsap.set(loadingCounter, { opacity: 1, y: 0 });
    }
    if (loadingChildren) {
      gsap.set(loadingChildren, { opacity: 1, y: 0 });
    }
  }

  // Reset contador de loading
  if (refs.loadingCounterRef.current) {
    refs.loadingCounterRef.current.textContent = '[00]';
  }

  // Reset elementos das colunas - forçar estado inicial
  setTimeout(() => {
    const artistItems = document.querySelectorAll('.artist');
    const categoryItems = document.querySelectorAll('.category');
    
    artistItems.forEach((item, index) => {
      item.classList.remove('loaded', 'active');
      // Força reset dos estilos inline para estado inicial
      gsap.set(item, { 
        opacity: 0, 
        transform: 'translateY(20px)', // Usar o mesmo valor do CSS original
        clearProps: 'all'
      });
      
      // Primeiro item sempre deve ficar ativo após o reset
      if (index === 0) {
        setTimeout(() => {
          item.classList.add('active');
        }, 50);
      }
    });
    
    categoryItems.forEach((item, index) => {
      item.classList.remove('loaded', 'active');
      // Força reset dos estilos inline para estado inicial
      gsap.set(item, { 
        opacity: 0, 
        transform: 'translateY(20px)', // Usar o mesmo valor do CSS original
        clearProps: 'all'
      });
      
      // Primeiro item sempre deve ficar ativo após o reset
      if (index === 0) {
        setTimeout(() => {
          item.classList.add('active');
        }, 50);
      }
    });

    // Reset featured contents
    const featuredContents = document.querySelectorAll('.featured-content');
    featuredContents.forEach((content, index) => {
      content.classList.remove('active');
      if (index === 0) {
        content.classList.add('active');
      }
      gsap.set(content, { 
        visibility: index === 0 ? "visible" : "hidden",
        opacity: index === 0 ? 1 : 0
      });
    });

    // Reset barra de progresso
    if (refs.progressFillRef.current) {
      refs.progressFillRef.current.style.width = '0%';
    }
  }, 50); // Delay menor para responsividade
};