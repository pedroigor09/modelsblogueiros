import { gsap } from 'gsap';
import { ShowcaseRefs, ShowcaseState } from './types';
import { bloggersData } from './data';

export const changeSection = (
  newSection: number,
  refs: ShowcaseRefs,
  state: ShowcaseState,
  updateProgressNumbers: () => void,
  updateDebugInfo: (info: string) => void,
  animateFeaturedTexts: (previousSection: number, newSection: number, isScrollingDown: boolean) => void,
  animateBackgrounds: (previousSection: number, newSection: number, isScrollingDown: boolean) => void,
  animateNavigation: (newSection: number) => void
) => {
  if (newSection === state.currentSection.current || state.isAnimating.current) return;
  
  state.isAnimating.current = true;
  const isScrollingDown = newSection > state.currentSection.current;
  const previousSection = state.currentSection.current;
  state.currentSection.current = newSection;
  
  updateProgressNumbers();
  
  // Atualizar barra de progresso
  const sectionProgress = state.currentSection.current / (bloggersData.length - 1);
  if (refs.progressFillRef.current) {
    refs.progressFillRef.current.style.width = `${sectionProgress * 100}%`;
  }
  
  updateDebugInfo(`Changing to Section: ${newSection} (${isScrollingDown ? "Down" : "Up"})`);
  
  // Animar textos featured
  animateFeaturedTexts(previousSection, newSection, isScrollingDown);
  
  // Animar backgrounds
  animateBackgrounds(previousSection, newSection, isScrollingDown);
  
  // Animar navegação
  animateNavigation(newSection);
};

export const animateFeaturedTexts = (
  previousSection: number,
  newSection: number,
  isScrollingDown: boolean,
  state: ShowcaseState
) => {
  const duration = 0.64;
  
  // Esconder textos que não são relevantes
  const featuredContents = document.querySelectorAll('.featured-content');
  featuredContents.forEach((content, i) => {
    if (i !== newSection && i !== previousSection) {
      content.classList.remove('active');
      gsap.set(content, {
        visibility: "hidden",
        opacity: 0
      });
    }
  });
  
  // Animar texto anterior para fora
  if (previousSection !== null) {
    const prevWords = (state.splitTexts.current[`featured-${previousSection}`] as any)?.words;
    if (prevWords) {
      gsap.to(prevWords, {
        yPercent: isScrollingDown ? -100 : 100,
        opacity: 0,
        duration: duration * 0.6,
        stagger: isScrollingDown ? 0.03 : -0.03,
        ease: "customEase",
        onComplete: () => {
          featuredContents[previousSection].classList.remove('active');
          gsap.set(featuredContents[previousSection], {
            visibility: "hidden"
          });
        }
      });
    }
  }
  
  // Animar novo texto para dentro
  const newWords = (state.splitTexts.current[`featured-${newSection}`] as any)?.words;
  if (newWords) {
    featuredContents[newSection].classList.add('active');
    gsap.set(featuredContents[newSection], {
      visibility: "visible",
      opacity: 1
    });
    
    gsap.set(newWords, {
      yPercent: isScrollingDown ? 100 : -100,
      opacity: 0
    });
    
    gsap.to(newWords, {
      yPercent: 0,
      opacity: 1,
      duration: duration,
      stagger: isScrollingDown ? 0.05 : -0.05,
      ease: "customEase"
    });
  }
};

export const animateBackgrounds = (
  previousSection: number,
  newSection: number,
  isScrollingDown: boolean,
  state: ShowcaseState
) => {
  const duration = 0.8;
  const parallaxAmount = 5;
  const backgrounds = document.querySelectorAll('.background-image');
  
  // Remover classes active e previous de todos os backgrounds
  backgrounds.forEach((bg) => {
    bg.classList.remove('active', 'previous');
  });
  
  // Background atual fica ativo com efeito clipPath
  if (backgrounds[newSection]) {
    backgrounds[newSection].classList.add('active');
    
    if (isScrollingDown) {
      // Animação descendo: cortina vem de baixo para cima
      gsap.set(backgrounds[newSection], {
        opacity: 1,
        y: 0,
        clipPath: "inset(100% 0 0 0)",
        zIndex: 2
      });
      gsap.to(backgrounds[newSection], {
        clipPath: "inset(0% 0 0 0)",
        duration: duration,
        ease: "customEase"
      });
    } else {
      // Animação subindo: cortina vem de cima para baixo
      gsap.set(backgrounds[newSection], {
        opacity: 1,
        y: 0,
        clipPath: "inset(0 0 100% 0)",
        zIndex: 2
      });
      gsap.to(backgrounds[newSection], {
        clipPath: "inset(0 0 0% 0)",
        duration: duration,
        ease: "customEase"
      });
    }
  }
  
  // Background anterior fica como previous com efeito parallax
  if (previousSection !== null && backgrounds[previousSection]) {
    backgrounds[previousSection].classList.add('previous');
    
    // Efeito parallax na imagem anterior
    gsap.to(backgrounds[previousSection], {
      y: isScrollingDown ? `${parallaxAmount}%` : `-${parallaxAmount}%`,
      duration: duration,
      ease: "customEase"
    });
    
    // Fade out da imagem anterior
    gsap.to(backgrounds[previousSection], {
      opacity: 0,
      delay: duration * 0.5,
      duration: duration * 0.5,
      ease: "customEase",
      onComplete: () => {
        backgrounds[previousSection].classList.remove('previous');
        gsap.set(backgrounds[previousSection], {
          y: 0,
          zIndex: 0
        });
        state.isAnimating.current = false;
      }
    });
  } else {
    state.isAnimating.current = false;
  }
  
  // Fade out de todos os outros backgrounds
  backgrounds.forEach((bg, i) => {
    if (i !== newSection && i !== previousSection) {
      gsap.to(bg, {
        opacity: 0,
        duration: duration * 0.3,
        ease: "customEase"
      });
    }
  });
};

export const animateNavigation = (newSection: number) => {
  const artists = document.querySelectorAll('.artist');
  const categories = document.querySelectorAll('.category');
  
  artists.forEach((artist, index) => {
    if (index === newSection) {
      artist.classList.add('active');
    } else {
      artist.classList.remove('active');
    }
  });
  
  categories.forEach((category, index) => {
    if (index === newSection) {
      category.classList.add('active');
    } else {
      category.classList.remove('active');
    }
  });
};