import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { ShowcaseRefs, ShowcaseState } from './types';
import { bloggersData } from './data';

// Variáveis para controle de throttling
let lastSectionChangeTime = 0;
const SECTION_CHANGE_DELAY = 600; // Mínimo de 600ms entre mudanças de seção

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
      const maxSection = bloggersData.length - 1;
      // Ajustar para que cada seção tenha espaço adequado
      const sectionsProgress = Math.min(0.95, progress); // Limitar a 95% para dar mais espaço
      const targetSection = Math.min(maxSection, Math.floor(sectionsProgress * bloggersData.length));
      
      // Controle mais rigoroso de mudança de seção com throttling
      const currentTime = Date.now();
      const canChangeSection = currentTime - lastSectionChangeTime > SECTION_CHANGE_DELAY;
      
      if (targetSection !== state.currentSection.current && !state.isAnimating.current && canChangeSection) {
        // Prevenir saltos de seção - apenas mudanças sequenciais
        const diff = targetSection - state.currentSection.current;
        let nextSection = state.currentSection.current;
        
        if (Math.abs(diff) === 1) {
          // Mudança sequencial normal
          nextSection = targetSection;
        } else if (Math.abs(diff) > 1) {
          // Tentativa de pular seções - ir apenas para a próxima
          nextSection = state.currentSection.current + (diff > 0 ? 1 : -1);
        }
        
        // Garantir que não saia dos limites
        nextSection = Math.max(0, Math.min(maxSection, nextSection));
        
        // Só mudar se for diferente da atual
        if (nextSection !== state.currentSection.current) {
          lastSectionChangeTime = currentTime;
          snapToSection(nextSection);
        }
      }
      
      state.lastProgress.current = progress;
      
      // Atualizar barra de progresso baseada na seção atual
      const sectionProgressBar = Math.min(1, state.currentSection.current / maxSection);
      if (refs.progressFillRef.current) {
        refs.progressFillRef.current.style.width = `${sectionProgressBar * 100}%`;
      }
      
      updateDebugInfo(`Section: ${state.currentSection.current}/${maxSection}, Target: ${targetSection}, Progress: ${progress.toFixed(3)}, Delta: ${progressDelta.toFixed(4)}`);
    }
  });
  

  // End section scroll handling - só ativa após todos os blogueiros
  ScrollTrigger.create({
    trigger: ".end-section",
    start: "top bottom-=50",
    end: "bottom bottom",
    onUpdate: (self) => {
      // Só permitir transição se estivermos na última seção dos blogueiros
      const isLastBloggerSection = state.currentSection.current >= bloggersData.length - 1;
      
      // Se não estivermos na última seção e o usuário estiver tentando scrollar muito rápido
      if (!isLastBloggerSection && self.progress > 0.05) {
        // Força voltar para a última seção de blogueiros
        const lastSection = bloggersData.length - 1;
        snapToSection(lastSection);
        return;
      }
      
      // Só permitir efeitos de transição se estivermos realmente na última seção
      // E se o progress for significativo (para evitar ativação prematura)
      const shouldActivateTransition = isLastBloggerSection && self.progress > 0.2;
      
      // Handle blur effects
      if (shouldActivateTransition) {
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
      
      // Only start unpinning when we're actually in the end section AND last blogger section
      // E com um threshold maior para garantir que o Jeferson seja visto completamente
      if (self.progress > 0.3 && isLastBloggerSection) {
        const adjustedProgress = (self.progress - 0.3) / 0.7; // Normalizar para 0-1
        const newHeight = Math.max(
          0,
          100 - adjustedProgress * 100
        );
        
        if (refs.fixedContainerRef.current) {
          gsap.to(refs.fixedContainerRef.current, {
            height: `${newHeight}vh`,
            duration: 0.1,
            ease: "power1.out"
          });
        }
        
        const moveY = -adjustedProgress * 200;
        
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
        // Reset positions when scrolling back up or not in last section
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
      
      updateDebugInfo(`End Section - Height: ${refs.fixedContainerRef.current?.style.height}, Progress: ${self.progress.toFixed(2)}, Last Section: ${isLastBloggerSection}, Current: ${state.currentSection.current}`);
    }
  });
};

export const snapToSection = (
  targetSection: number,
  state: ShowcaseState,
  changeSection: (newSection: number) => void
) => {
  const maxSection = bloggersData.length - 1;
  
  // Validar limites da seção
  if (
    targetSection < 0 ||
    targetSection > maxSection ||
    targetSection === state.currentSection.current ||
    state.isAnimating.current
  ) {
    return;
  }
  
  state.isSnapping.current = true;
  changeSection(targetSection);
  
  // Calcular posição baseada na seção atual com mais precisão
  const sectionProgress = targetSection / maxSection;
  const fixedSection = document.querySelector('.fixed-section') as HTMLElement;
  
  if (fixedSection) {
    const fixedSectionHeight = fixedSection.offsetHeight;
    // Ajustar para que o Jeferson tenha mais espaço
    const adjustedProgress = sectionProgress * 0.85; // Usar apenas 85% do espaço total
    const targetPosition = fixedSection.offsetTop + (adjustedProgress * fixedSectionHeight);
    
    (state.lenis.current as any)?.scrollTo(targetPosition, {
      duration: 0.8, // Aumentar duração para mais suavidade
      easing: (t: number) => 1 - Math.pow(1 - t, 4), // Easing mais suave
      lock: true,
      onComplete: () => {
        state.isSnapping.current = false;
      }
    });
  }
};