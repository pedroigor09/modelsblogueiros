import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { ShowcaseRefs, ShowcaseState } from './types';
import { bloggersData } from './data';

export const setupSectionPositions = (state: ShowcaseState) => {
  const fixedSectionElement = document.querySelector('.fixed-section') as HTMLElement;
  if (!fixedSectionElement) return;
  
  const fixedSectionTop = fixedSectionElement.offsetTop;
  const fixedSectionHeight = fixedSectionElement.offsetHeight;
  
  state.sectionPositions.current = [];
  // Use bloggersData.length for correct number of sections
  for (let i = 0; i < bloggersData.length; i++) {
    state.sectionPositions.current.push(fixedSectionTop + (fixedSectionHeight * i) / bloggersData.length);
  }
};

export const setupSplitTexts = (state: ShowcaseState) => {
  if (typeof window === 'undefined') return;
  
  try {
    const featuredContents = document.querySelectorAll('.featured-content');
    featuredContents.forEach((content, index) => {
      const h3 = content.querySelector('h3');
      if (h3) {
        state.splitTexts.current[`featured-${index}`] = new SplitText(h3, {
          type: "words",
          wordsClass: "split-word"
        });
        
        (state.splitTexts.current[`featured-${index}`] as any).words.forEach((word: HTMLElement) => {
          const wrapper = document.createElement("div");
          wrapper.className = "word-mask";
          wrapper.style.display = "inline-block";
          wrapper.style.overflow = "hidden";
          word.parentNode!.insertBefore(wrapper, word);
          wrapper.appendChild(word);
          
          if (index !== 0) {
            gsap.set(word, {
              yPercent: 100,
              opacity: 0
            });
          } else {
            gsap.set(word, {
              yPercent: 0,
              opacity: 1
            });
          }
        });
      }
    });
  } catch (error) {
    console.error("SplitText error:", error);
  }
};

export const setupScrollTriggers = (
  refs: ShowcaseRefs,
  state: ShowcaseState,
  updateDebugInfo: (info: string) => void,
  snapToSection: (targetSection: number) => void
) => {
  if (!refs.fixedContainerRef.current) {
    console.error('❌ fixedContainerRef.current não encontrado!');
    return;
  }
  
  
  // Verificar se os elementos existem
  const fixedSection = document.querySelector('.fixed-section');
  const fixedContainer = document.querySelector('.fixed-container');

  gsap.set(refs.fixedContainerRef.current, {
    height: "100vh"
  });

  // ScrollTrigger principal
  const scrollTrigger = ScrollTrigger.create({
    trigger: ".fixed-section",
    start: "top top",
    end: "bottom bottom",
    pin: ".fixed-container",
    pinSpacing: true,
    onUpdate: (self) => {
      if (state.isSnapping.current) return;
      
      const progress = self.progress;
      const progressDelta = progress - state.lastProgress.current;
      
      
      // Detectar direção do scroll
      if (Math.abs(progressDelta) > 0.001) {
        state.scrollDirection.current = progressDelta > 0 ? 1 : -1;
      }
      
      // Calcular seção atual baseado no número de bloggers
      const targetSection = Math.min(bloggersData.length - 1, Math.floor(progress * bloggersData.length));
      
      // Verificar mudança de seção
      if (targetSection !== state.currentSection.current && !state.isAnimating.current) {
        const nextSection = state.currentSection.current + (targetSection > state.currentSection.current ? 1 : -1);
        snapToSection(nextSection);
      }
      
      state.lastProgress.current = progress;
      
      // Atualizar barra de progresso
      const sectionProgress = state.currentSection.current / (bloggersData.length - 1);
      if (refs.progressFillRef.current) {
        refs.progressFillRef.current.style.width = `${sectionProgress * 100}%`;
      }
      
      updateDebugInfo(`Section: ${state.currentSection.current}, Target: ${targetSection}, Progress: ${progress.toFixed(3)}, Direction: ${state.scrollDirection.current}`);
    }
  });
  

  // End section scroll handling - fixed to prevent overlap
  ScrollTrigger.create({
    trigger: ".end-section",
    start: "top center",
    end: "bottom bottom",
    onUpdate: (self) => {
      // Handle blur effects first (always execute)
      if (self.progress > 0.1) {
        refs.footerRef.current?.classList.add("blur");
        refs.leftColumnRef.current?.classList.add("blur");
        refs.rightColumnRef.current?.classList.add("blur");
        refs.featuredRef.current?.classList.add("blur");
      } else {
        refs.footerRef.current?.classList.remove("blur");
        refs.leftColumnRef.current?.classList.remove("blur");
        refs.rightColumnRef.current?.classList.remove("blur");
        refs.featuredRef.current?.classList.remove("blur");
      }
      
      // Only start unpinning when we're actually in the end section
      if (self.progress > 0.1) {
        const newHeight = Math.max(
          0,
          100 - ((self.progress - 0.1) / 0.9) * 100
        );
        
        if (refs.fixedContainerRef.current) {
          gsap.to(refs.fixedContainerRef.current, {
            height: `${newHeight}vh`,
            duration: 0.1,
            ease: "power1.out"
          });
        }
        
        const moveY = (-(self.progress - 0.1) / 0.9) * 200;
        
        if (refs.headerRef.current) {
          gsap.to(refs.headerRef.current, {
            y: moveY * 1.5,
            duration: 0.1,
            ease: "power1.out"
          });
        }
        
        if (refs.contentRef.current) {
          gsap.to(refs.contentRef.current, {
            y: `calc(${moveY}px + (-50%))`,
            duration: 0.1,
            ease: "power1.out"
          });
        }
        
        if (refs.footerRef.current) {
          gsap.to(refs.footerRef.current, {
            y: moveY * 0.5,
            duration: 0.1,
            ease: "power1.out"
          });
        }
      } else {
        // Reset positions when scrolling back up
        if (refs.fixedContainerRef.current) {
          gsap.to(refs.fixedContainerRef.current, {
            height: "100vh",
            duration: 0.1,
            ease: "power1.out"
          });
        }
        
        if (refs.headerRef.current) {
          gsap.to(refs.headerRef.current, {
            y: 0,
            duration: 0.1,
            ease: "power1.out"
          });
        }
        
        if (refs.contentRef.current) {
          gsap.to(refs.contentRef.current, {
            y: "-50%",
            duration: 0.1,
            ease: "power1.out"
          });
        }
        
        if (refs.footerRef.current) {
          gsap.to(refs.footerRef.current, {
            y: 0,
            duration: 0.1,
            ease: "power1.out"
          });
        }
      }
      
      updateDebugInfo(`End Section - Height: ${refs.fixedContainerRef.current?.style.height}, Progress: ${self.progress.toFixed(2)}`);
    }
  });
};

export const snapToSection = (
  targetSection: number,
  state: ShowcaseState,
  changeSection: (newSection: number) => void
) => {
  if (
    targetSection < 0 ||
    targetSection >= bloggersData.length ||
    targetSection === state.currentSection.current ||
    state.isAnimating.current
  ) {
    return;
  }
  
  state.isSnapping.current = true;
  changeSection(targetSection);
  
  const targetPosition = state.sectionPositions.current[targetSection];
  (state.lenis.current as any)?.scrollTo(targetPosition, {
    duration: 0.6,
    easing: (t: number) => 1 - Math.pow(1 - t, 3),
    lock: true,
    onComplete: () => {
      state.isSnapping.current = false;
    }
  });
};