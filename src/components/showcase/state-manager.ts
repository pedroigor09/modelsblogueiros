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

  if (refs.loadingCounterRef.current) {
    refs.loadingCounterRef.current.textContent = '[00]';
  }

  setTimeout(() => {
    // Detectar se é mobile
    const isMobile = window.innerWidth <= 768 || 'ontouchstart' in window;
    
    const artistItems = document.querySelectorAll('.artist');
    const categoryItems = document.querySelectorAll('.category');
    const backgroundImages = document.querySelectorAll('.background-image');
    
    // 📱 MOBILE: Fix específico para sincronizar imagem com primeiro nome
    if (isMobile) {
      // Reset completo das imagens no mobile
      backgroundImages.forEach((img, index) => {
        img.classList.remove('active');
        gsap.set(img, { 
          opacity: 0,
          zIndex: 0,
          clearProps: 'transform,clip-path,y' // Limpar possíveis transforms
        });
      });

      // Forçar primeira imagem ativa (Africanique)
      if (backgroundImages[0]) {
        backgroundImages[0].classList.add('active');
        gsap.set(backgroundImages[0], { 
          opacity: 1,
          zIndex: 2
        });
        console.log('� MOBILE: Africanique image synced with name');
      }
    } else {
      // 🖥️ DESKTOP: Reset normal sem alterações
      backgroundImages.forEach((img, index) => {
        img.classList.remove('active');
        gsap.set(img, { 
          opacity: 0,
          zIndex: 0
        });
      });

      if (backgroundImages[0]) {
        backgroundImages[0].classList.add('active');
        gsap.set(backgroundImages[0], { 
          opacity: 1,
          zIndex: 2
        });
      }
    }
    
    artistItems.forEach((item, index) => {
      item.classList.remove('loaded', 'active');
      gsap.set(item, { 
        opacity: 0, 
        transform: 'translateY(20px)',
        clearProps: 'all'
      });
      
      if (index === 0) {
        setTimeout(() => {
          item.classList.add('active');
          // 🔥 FORÇAR estilo visual do primeiro item ativo
          gsap.set(item, { 
            opacity: 1,
            paddingLeft: '15px'
          });
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
          // 🔥 FORÇAR estilo visual do primeiro item ativo
          gsap.set(item, { 
            opacity: 1,
            paddingRight: '15px'
          });
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
    
    console.log('✅ MOBILE FIX: Reset completo - tudo sincronizado com Africanique (índice 0)');
    
    // 📱 MOBILE: Timeout adicional para forçar imagem correta
    if (isMobile) {
      setTimeout(() => {
        const mobileBackgrounds = document.querySelectorAll('.background-image');
        
        // Forçar primeira imagem com estilos inline para garantir
        mobileBackgrounds.forEach((img, index) => {
          if (index === 0) {
            img.classList.add('active');
            (img as HTMLElement).style.opacity = '1';
            (img as HTMLElement).style.zIndex = '2';
            (img as HTMLElement).style.display = 'block';
            (img as HTMLElement).style.visibility = 'visible';
          } else {
            img.classList.remove('active');
            (img as HTMLElement).style.opacity = '0';
            (img as HTMLElement).style.zIndex = '0';
          }
        });
        
        console.log('📱 MOBILE EXTRA: Africanique image forced with inline styles');
      }, 300);
    }
  }, 50); // Delay menor para responsividade
};