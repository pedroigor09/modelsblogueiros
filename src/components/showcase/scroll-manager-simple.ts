import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { ShowcaseRefs, ShowcaseState } from './types';
import { bloggersData } from './data';

let currentSection = 0;
let isAnimating = false;
let isSnapping = false;
let lastProgress = 0;
let scrollDirection = 0;
let sectionPositions: number[] = [];

export const setupSectionPositions = (state: ShowcaseState) => {
  const fixedSectionElement = document.querySelector('.fixed-section') as HTMLElement;
  if (!fixedSectionElement) return;
  
  const fixedSectionTop = fixedSectionElement.offsetTop;
  const fixedSectionHeight = fixedSectionElement.offsetHeight;
  
  currentSection = 0;
  isAnimating = false;
  isSnapping = false;
  lastProgress = 0;
  sectionPositions = [];
  
  const totalSections = bloggersData.length; // 13 seções (0-12)
  for (let i = 0; i < totalSections; i++) {
    sectionPositions.push(fixedSectionTop + (fixedSectionHeight * i) / totalSections);
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

  gsap.set(refs.fixedContainerRef.current, {
    height: "100vh"
  });

  const mainScrollTrigger = ScrollTrigger.create({
    trigger: ".fixed-section",
    start: "top top",
    end: "bottom bottom",
    pin: ".fixed-container",
    pinSpacing: true,
    onUpdate: (self) => {
      if (isSnapping) return; // Parar durante snap, como no template
      
      const progress = self.progress;
      const progressDelta = progress - lastProgress;
      
      if (Math.abs(progressDelta) > 0.001) {
        scrollDirection = progressDelta > 0 ? 1 : -1;
      }
      
      const maxSection = bloggersData.length - 1; // 12 para Matheus Santos
      const targetSection = Math.min(maxSection, Math.floor(progress * bloggersData.length));
      
      if (targetSection !== currentSection && !isAnimating) {
        const nextSection = currentSection + (targetSection > currentSection ? 1 : -1);
        snapToSection(nextSection);
      }
      
      lastProgress = progress;
      
      const sectionProgress = currentSection / maxSection;
      if (refs.progressFillRef.current) {
        refs.progressFillRef.current.style.width = `${sectionProgress * 100}%`;
      }
      
      updateDebugInfo(`Section: ${currentSection}, Target: ${targetSection}, Progress: ${progress.toFixed(3)}, Direction: ${scrollDirection}`);
    }
  });

  ScrollTrigger.create({
    trigger: ".end-section",
    start: "top center",
    end: "bottom bottom",
    onUpdate: (self) => {
      const isOnLastSection = currentSection === (bloggersData.length - 1);
      
      if (self.progress > 0.1 && isOnLastSection) {
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
      
      if (self.progress > 0.1 && isOnLastSection) {
        const newHeight = Math.max(0, 100 - ((self.progress - 0.1) / 0.9) * 100);
        
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
      
      updateDebugInfo(`End Section - Height: ${refs.fixedContainerRef.current?.style.height}, Progress: ${self.progress.toFixed(2)}, Last Section: ${isOnLastSection}`);
    }
  });
};

export const snapToSection = (
  targetSection: number,
  state: ShowcaseState,
  changeSection: (newSection: number) => void
) => {
  const maxSection = bloggersData.length - 1;
  
  // Validação simples como no template
  if (
    targetSection < 0 ||
    targetSection > maxSection ||
    targetSection === currentSection ||
    isAnimating
  ) return;
  
  isSnapping = true;
  
  // Iniciar transição visual
  changeSection(targetSection);
  
  // Atualizar seção atual
  currentSection = targetSection;
  
  // Fazer snap para posição - EXATAMENTE como no template
  const targetPosition = sectionPositions[targetSection];
  
  (state.lenis.current as any)?.scrollTo(targetPosition, {
    duration: 0.6,
    easing: (t: number) => 1 - Math.pow(1 - t, 3),
    lock: true,
    onComplete: () => {
      isSnapping = false;
    }
  });
};