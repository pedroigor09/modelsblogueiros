'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CustomEase } from 'gsap/CustomEase';
import { SplitText } from 'gsap/SplitText';

// Registrar plugins GSAP
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, CustomEase, SplitText);
  CustomEase.create("customEase", "M0,0 C0.86,0 0.07,1 1,1");
}

// Dados dos bloggers adaptados
const bloggersData = [
  {
    id: 0,
    name: "Africanique",
    category: "Afrofuturism",
    featured: "Fashion Revolution",
    image: "/africanique.jpg",
    active: true
  },
  {
    id: 1,
    name: "Deivisson",
    category: "Street Style",
    featured: "Urban Vibes",
    image: "/deivisson1.jpg"
  },
  {
    id: 2,
    name: "Laissa",
    category: "Minimalism",
    featured: "Clean Aesthetics",
    image: "/laissa.jpg"
  },
  {
    id: 3,
    name: "Kevin",
    category: "Editorial",
    featured: "High Fashion",
    image: "/kevin.jpg"
  },
  {
    id: 4,
    name: "Renatinha",
    category: "Vintage",
    featured: "Retro Dreams",
    image: "/renatinha.jpg"
  },
  {
    id: 5,
    name: "Thiago Vitt",
    category: "Avant-garde",
    featured: "Art Direction",
    image: "/thiagovitt.jpg"
  }
];

export default function CreativeShowcase() {
  const loadingOverlayRef = useRef<HTMLDivElement>(null);
  const loadingCounterRef = useRef<HTMLSpanElement>(null);
  const fixedContainerRef = useRef<HTMLDivElement>(null);
  const debugInfoRef = useRef<HTMLDivElement>(null);
  
  // Refs para elementos principais
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
  const splitTexts = useRef<{ [key: string]: any }>({});
  const lenis = useRef<any>(null);

  useEffect(() => {
    // Forçar scroll para o topo imediatamente
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }

    // Reset completo de todos os estados e elementos
    resetComponentState();
    
    // Listener para reset antes de sair da página
    const handleBeforeUnload = () => {
      // Reset ScrollTrigger e GSAP antes de sair
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      gsap.killTweensOf("*");
    };
    
    // Listener para quando a página é totalmente carregada
    const handlePageShow = (event: PageTransitionEvent) => {
      // Se a página vier do cache (navegação back/forward), reset completo
      if (event.persisted) {
        setTimeout(() => {
          resetComponentState();
          if (document.fonts) {
            document.fonts.ready.then(() => {
              initLenis();
              initPage();
            });
          } else {
            initLenis();
            initPage();
          }
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
    
    // Aguardar fonts carregarem
    const timer = setTimeout(() => {
      if (document.fonts) {
        document.fonts.ready.then(() => {
          initLenis();
          initPage();
        });
      } else {
        initLenis();
        initPage();
      }
    }, 500);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('pageshow', handlePageShow);
      window.removeEventListener('load', handleLoad);
      // Cleanup GSAP e ScrollTrigger
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      gsap.killTweensOf("*");
    };
  }, []);

  const resetComponentState = () => {
    // Garantir que a página esteja no topo
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }

    // Reset estados internos
    currentSection.current = 0;
    isAnimating.current = false;
    isSnapping.current = false;
    lastProgress.current = 0;
    scrollDirection.current = 0;
    sectionPositions.current = [];
    splitTexts.current = {};

    // Reset loading overlay
    if (loadingOverlayRef.current) {
      loadingOverlayRef.current.style.display = 'flex';
      loadingOverlayRef.current.style.transform = 'translateY(0)';
      loadingOverlayRef.current.style.opacity = '1';
      
      // Reset elementos internos do loading
      const loadingCounter = loadingOverlayRef.current.querySelector('.loading-counter');
      const loadingChildren = loadingOverlayRef.current.children[0];
      
      if (loadingCounter) {
        gsap.set(loadingCounter, { opacity: 1, y: 0 });
      }
      if (loadingChildren) {
        gsap.set(loadingChildren, { opacity: 1, y: 0 });
      }
    }

    // Reset contador de loading
    if (loadingCounterRef.current) {
      loadingCounterRef.current.textContent = '[00]';
    }

    // Reset elementos das colunas - remover classes de loaded
    setTimeout(() => {
      const artistItems = document.querySelectorAll('.artist');
      const categoryItems = document.querySelectorAll('.category');
      
      artistItems.forEach((item) => {
        item.classList.remove('loaded', 'active');
        // Força reset dos estilos inline
        gsap.set(item, { 
          opacity: 0, 
          transform: 'translateY(30px)',
          clearProps: 'all'
        });
      });
      
      categoryItems.forEach((item) => {
        item.classList.remove('loaded', 'active');
        // Força reset dos estilos inline
        gsap.set(item, { 
          opacity: 0, 
          transform: 'translateY(30px)',
          clearProps: 'all'
        });
      });

      // Adicionar classe active apenas ao primeiro item de cada coluna
      if (artistItems[0]) {
        setTimeout(() => {
          artistItems[0].classList.add('active');
        }, 100);
      }
      if (categoryItems[0]) {
        setTimeout(() => {
          categoryItems[0].classList.add('active');
        }, 100);
      }

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
      if (progressFillRef.current) {
        progressFillRef.current.style.width = '0%';
      }
    }, 100);
  };

  const initLenis = async () => {
    try {
      // Importação dinâmica do Lenis
      const { default: Lenis } = await import('lenis');
      
      lenis.current = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
      });

      lenis.current.on('scroll', ScrollTrigger.update);
      
      gsap.ticker.add((time) => {
        lenis.current.raf(time * 1000);
      });
      
      gsap.ticker.lagSmoothing(0);
    } catch (error) {
    }
  };

  const initPage = () => {
    // Animação de loading
    animateLoadingCounter();
    
    // Configurar posições das seções
    setupSectionPositions();
    
    // Configurar SplitText para os textos featured
    setupSplitTexts();
    
    // Configurar ScrollTriggers
    setupScrollTriggers();
    
    // Configurar navegação por clique
    setupNavigation();
    
    // Debug
    setupDebug();
  };

  const animateLoadingCounter = () => {
    if (!loadingOverlayRef.current || !loadingCounterRef.current) return;
    
    // Garantir que o loading está visível
    gsap.set(loadingOverlayRef.current, {
      display: 'flex',
      y: 0,
      opacity: 1
    });
    
    let counter = 0;
    const counterInterval = setInterval(() => {
      counter += Math.random() * 4 + 2; // Velocidade um pouco maior
      if (counter >= 100) {
        counter = 100;
        clearInterval(counterInterval);
        
        setTimeout(() => {
          // Animar loading para fora
          const loadingCounter = loadingOverlayRef.current!.querySelector('.loading-counter');
          if (loadingCounter) {
            gsap.to(loadingCounter, {
              opacity: 0,
              y: -20,
              duration: 0.6,
              ease: "power2.inOut"
            });
          }
          
          gsap.to(loadingOverlayRef.current!.children[0], {
            opacity: 0,
            y: -20,
            duration: 0.6,
            ease: "power2.inOut",
            onComplete: () => {
              gsap.to(loadingOverlayRef.current, {
                y: "-100%",
                duration: 1.2,
                ease: "power3.inOut",
                delay: 0.3,
                onComplete: () => {
                  if (loadingOverlayRef.current) {
                    loadingOverlayRef.current.style.display = "none";
                  }
                  // Pequeno delay antes de iniciar a animação das colunas
                  setTimeout(() => {
                    animateColumnsEntry();
                  }, 100);
                }
              });
            }
          });
        }, 300); // Delay um pouco maior para melhor efeito
      }
      
      if (loadingCounterRef.current) {
        loadingCounterRef.current.textContent = `[${counter.toFixed(0).padStart(2, "0")}]`;
      }
    }, 40); // Intervalo ligeiramente maior para melhor controle
  };

  const animateColumnsEntry = () => {
    // Aguardar um frame para garantir que o DOM está atualizado
    requestAnimationFrame(() => {
      const artistItems = document.querySelectorAll('.artist');
      const categoryItems = document.querySelectorAll('.category');
      
      // Primeiro, remover todas as classes loaded para reset
      artistItems.forEach((item) => {
        item.classList.remove('loaded');
      });
      
      categoryItems.forEach((item) => {
        item.classList.remove('loaded');
      });
      
      // Aguardar um pouco antes de iniciar as animações
      setTimeout(() => {
        // Animar artistas primeiro
        artistItems.forEach((item, index) => {
          setTimeout(() => {
            item.classList.add('loaded');
          }, index * 80); // Timing um pouco mais espaçado
        });
        
        // Animar categorias com delay
        categoryItems.forEach((item, index) => {
          setTimeout(() => {
            item.classList.add('loaded');
          }, index * 80 + 300); // Delay maior para melhor efeito
        });
      }, 200);
    });
  };

  const setupSectionPositions = () => {
    const fixedSectionElement = document.querySelector('.fixed-section') as HTMLElement;
    if (!fixedSectionElement) return;
    
    const fixedSectionTop = fixedSectionElement.offsetTop;
    const fixedSectionHeight = fixedSectionElement.offsetHeight;
    
    sectionPositions.current = [];
    for (let i = 0; i < bloggersData.length; i++) {
      sectionPositions.current.push(fixedSectionTop + (fixedSectionHeight * i) / bloggersData.length);
    }
  };

  const setupSplitTexts = () => {
    if (typeof window === 'undefined') return;
    
    try {
      const featuredContents = document.querySelectorAll('.featured-content');
      featuredContents.forEach((content, index) => {
        const h3 = content.querySelector('h3');
        if (h3) {
          splitTexts.current[`featured-${index}`] = new SplitText(h3, {
            type: "words",
            wordsClass: "split-word"
          });
          
          splitTexts.current[`featured-${index}`].words.forEach((word: HTMLElement) => {
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

  const setupScrollTriggers = () => {
    if (!fixedContainerRef.current) return;
    
    gsap.set(fixedContainerRef.current, {
      height: "100vh"
    });

    // ScrollTrigger principal
    ScrollTrigger.create({
      trigger: ".fixed-section",
      start: "top top",
      end: "bottom bottom",
      pin: ".fixed-container",
      pinSpacing: true,
      onUpdate: (self) => {
        if (isSnapping.current) return;
        
        const progress = self.progress;
        const progressDelta = progress - lastProgress.current;
        
        // Detectar direção do scroll
        if (Math.abs(progressDelta) > 0.001) {
          scrollDirection.current = progressDelta > 0 ? 1 : -1;
        }
        
        // Calcular seção atual
        const targetSection = Math.min(bloggersData.length - 1, Math.floor(progress * bloggersData.length));
        
        // Verificar mudança de seção
        if (targetSection !== currentSection.current && !isAnimating.current) {
          const nextSection = currentSection.current + (targetSection > currentSection.current ? 1 : -1);
          snapToSection(nextSection);
        }
        
        lastProgress.current = progress;
        
        // Atualizar barra de progresso
        const sectionProgress = currentSection.current / (bloggersData.length - 1);
        if (progressFillRef.current) {
          progressFillRef.current.style.width = `${sectionProgress * 100}%`;
        }
        
        updateDebugInfo(`Section: ${currentSection.current}, Target: ${targetSection}, Progress: ${progress.toFixed(3)}, Direction: ${scrollDirection.current}`);
      }
    });
  };

  const snapToSection = (targetSection: number) => {
    if (
      targetSection < 0 ||
      targetSection >= bloggersData.length ||
      targetSection === currentSection.current ||
      isAnimating.current
    ) return;
    
    isSnapping.current = true;
    changeSection(targetSection);
    
    const targetPosition = sectionPositions.current[targetSection];
    lenis.current?.scrollTo(targetPosition, {
      duration: 0.6,
      easing: (t: number) => 1 - Math.pow(1 - t, 3),
      lock: true,
      onComplete: () => {
        isSnapping.current = false;
      }
    });
  };

  const changeSection = (newSection: number) => {
    if (newSection === currentSection.current || isAnimating.current) return;
    
    isAnimating.current = true;
    const isScrollingDown = newSection > currentSection.current;
    const previousSection = currentSection.current;
    currentSection.current = newSection;
    
    updateProgressNumbers();
    
    // Atualizar barra de progresso
    const sectionProgress = currentSection.current / (bloggersData.length - 1);
    if (progressFillRef.current) {
      progressFillRef.current.style.width = `${sectionProgress * 100}%`;
    }
    
    updateDebugInfo(`Changing to Section: ${newSection} (${isScrollingDown ? "Down" : "Up"})`);
    
    // Animar textos featured
    animateFeaturedTexts(previousSection, newSection, isScrollingDown);
    
    // Animar backgrounds
    animateBackgrounds(previousSection, newSection, isScrollingDown);
    
    // Animar navegação
    animateNavigation(newSection);
  };

  const animateFeaturedTexts = (previousSection: number, newSection: number, isScrollingDown: boolean) => {
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
      const prevWords = splitTexts.current[`featured-${previousSection}`]?.words;
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
    const newWords = splitTexts.current[`featured-${newSection}`]?.words;
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

  const animateBackgrounds = (previousSection: number, newSection: number, isScrollingDown: boolean) => {
    const duration = 0.64;
    const parallaxAmount = 5;
    const backgrounds = document.querySelectorAll('.background-image');
    
    backgrounds.forEach((bg, i) => {
      bg.classList.remove('previous', 'active');
      
      if (i === newSection) {
        if (isScrollingDown) {
          gsap.set(bg, {
            opacity: 1,
            y: 0,
            clipPath: "inset(100% 0 0 0)"
          });
          gsap.to(bg, {
            clipPath: "inset(0% 0 0 0)",
            duration: duration,
            ease: "customEase"
          });
        } else {
          gsap.set(bg, {
            opacity: 1,
            y: 0,
            clipPath: "inset(0 0 100% 0)"
          });
          gsap.to(bg, {
            clipPath: "inset(0 0 0% 0)",
            duration: duration,
            ease: "customEase"
          });
        }
        bg.classList.add('active');
      } else if (i === previousSection) {
        bg.classList.add('previous');
        gsap.to(bg, {
          y: isScrollingDown ? `${parallaxAmount}%` : `-${parallaxAmount}%`,
          duration: duration,
          ease: "customEase"
        });
        gsap.to(bg, {
          opacity: 0,
          delay: duration * 0.5,
          duration: duration * 0.5,
          ease: "customEase",
          onComplete: () => {
            bg.classList.remove('previous');
            gsap.set(bg, { y: 0 });
            isAnimating.current = false;
          }
        });
      } else {
        gsap.to(bg, {
          opacity: 0,
          duration: duration * 0.3,
          ease: "customEase"
        });
      }
    });
  };

  const animateNavigation = (newSection: number) => {
    const artists = document.querySelectorAll('.artist');
    const categories = document.querySelectorAll('.category');
    
    artists.forEach((artist, i) => {
      if (i === newSection) {
        artist.classList.add('active');
        gsap.to(artist, {
          opacity: 1,
          duration: 0.3,
          ease: "power2.out"
        });
      } else {
        artist.classList.remove('active');
        gsap.to(artist, {
          opacity: 0.3,
          duration: 0.3,
          ease: "power2.out"
        });
      }
    });
    
    categories.forEach((category, i) => {
      if (i === newSection) {
        category.classList.add('active');
        gsap.to(category, {
          opacity: 1,
          duration: 0.3,
          ease: "power2.out"
        });
      } else {
        category.classList.remove('active');
        gsap.to(category, {
          opacity: 0.3,
          duration: 0.3,
          ease: "power2.out"
        });
      }
    });
  };

  const setupNavigation = () => {
    const navigateToSection = (index: number) => {
      if (index === currentSection.current || isAnimating.current || isSnapping.current) return;
      
      isSnapping.current = true;
      const targetPosition = sectionPositions.current[index];
      
      changeSection(index);
      
      lenis.current?.scrollTo(targetPosition, {
        duration: 0.8,
        easing: (t: number) => 1 - Math.pow(1 - t, 3),
        lock: true,
        onComplete: () => {
          isSnapping.current = false;
        }
      });
    };
    
    // Adicionar listeners de click
    const artists = document.querySelectorAll('.artist');
    const categories = document.querySelectorAll('.category');
    
    artists.forEach((artist, index) => {
      artist.addEventListener('click', (e) => {
        e.preventDefault();
        navigateToSection(index);
      });
    });
    
    categories.forEach((category, index) => {
      category.addEventListener('click', (e) => {
        e.preventDefault();
        navigateToSection(index);
      });
    });
  };

  const updateProgressNumbers = () => {
    if (currentSectionRef.current) {
      currentSectionRef.current.textContent = (currentSection.current + 1)
        .toString()
        .padStart(2, "0");
    }
  };

  const setupDebug = () => {
    updateProgressNumbers();
    updateDebugInfo('Current Section: 0 (Initial)');
    
    document.addEventListener('keydown', (e) => {
      if (e.key.toLowerCase() === 'h') {
        if (debugInfoRef.current) {
          debugInfoRef.current.style.display = 
            debugInfoRef.current.style.display === 'none' ? 'block' : 'none';
        }
      }
    });
  };

  const updateDebugInfo = (text: string) => {
    if (debugInfoRef.current) {
      debugInfoRef.current.textContent = text;
    }
  };

  return (
    <div className="creative-showcase">
      {/* Loading Overlay */}
      <div 
        className="loading-overlay" 
        ref={loadingOverlayRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: '#fff',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 9999,
          color: '#000',
          fontSize: '1.5rem',
          fontFamily: 'var(--font-primary)',
          textTransform: 'uppercase',
          letterSpacing: '-0.02em'
        }}
      >
        Loading{' '}
        <span className="loading-counter" ref={loadingCounterRef}>
          [00]
        </span>
      </div>

      {/* Debug Info */}
      <div 
        className="debug-info" 
        ref={debugInfoRef}
        style={{
          position: 'fixed',
          bottom: '10px',
          right: '10px',
          background: 'rgba(255, 255, 255, 0.7)',
          color: '#000',
          padding: '10px',
          fontSize: '12px',
          zIndex: 9000,
          fontFamily: 'monospace',
          display: 'none'
        }}
      >
        Current Section: 0
      </div>

      {/* Main Container */}
      <div className="scroll-container">
        <div className="fixed-section" style={{ height: '600vh', position: 'relative', backgroundColor: '#fff' }}>
          <div 
            className="fixed-container" 
            ref={fixedContainerRef}
            style={{
              position: 'sticky',
              top: 0,
              left: 0,
              width: '100%',
              height: '100vh',
              overflow: 'hidden',
              willChange: 'transform, height',
              transformOrigin: 'top center',
              backgroundColor: '#fff'
            }}
          >
            {/* Background Container */}
            <div 
              className="background-container"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 1,
                overflow: 'hidden',
                backgroundColor: '#000'
              }}
            >
              {bloggersData.map((blogger, index) => (
                <img
                  key={index}
                  src={blogger.image}
                  alt={`Background ${blogger.name}`}
                  className={`background-image ${index === 0 ? 'active' : ''}`}
                  style={{
                    position: 'absolute',
                    top: '-10%',
                    left: 0,
                    width: '100%',
                    height: '120%',
                    objectFit: 'cover',
                    opacity: index === 0 ? 1 : 0,
                    filter: 'brightness(0.8)',
                    willChange: 'transform',
                    transformOrigin: 'center center'
                  }}
                />
              ))}
            </div>

            {/* Grid Container */}
            <div 
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(12, 1fr)',
                gap: '1rem',
                padding: '0 2rem',
                height: '100%',
                position: 'relative',
                zIndex: 2
              }}
            >
              {/* Header */}
              <div 
                className="header"
                ref={headerRef}
                style={{
                  gridColumn: '1 / 13',
                  alignSelf: 'start',
                  paddingTop: '5vh',
                  fontSize: '10vw',
                  lineHeight: '0.8',
                  textAlign: 'center',
                  color: 'rgba(245, 245, 245, 0.9)',
                  willChange: 'transform, filter, opacity'
                }}
              >
                <div className="header-row">Salvador</div>
                <div className="header-row">Bloggers</div>
              </div>

              {/* Content */}
              <div 
                className="content"
                ref={contentRef}
                style={{
                  gridColumn: '1 / 13',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: '100%',
                  position: 'absolute',
                  top: '50%',
                  left: 0,
                  transform: 'translateY(-50%)',
                  padding: '0 2rem',
                  willChange: 'transform'
                }}
              >
                {/* Left Column */}
                <div 
                  className="left-column" 
                  ref={leftColumnRef}
                  style={{
                    width: '40%',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.25rem',
                    textAlign: 'left',
                    willChange: 'filter, opacity',
                    transition: 'filter 0.5s ease, opacity 0.5s ease'
                  }}
                >
                  {bloggersData.map((blogger, index) => (
                    <div
                      key={index}
                      className={`artist ${index === 0 ? 'active' : ''}`}
                      data-index={index}
                      style={{
                        opacity: 0,
                        transform: 'translateY(20px)',
                        transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                        color: 'rgba(245, 245, 245, 0.9)',
                        cursor: 'pointer',
                        position: 'relative',
                        paddingLeft: 0
                      }}
                    >
                      {blogger.name}
                    </div>
                  ))}
                </div>

                {/* Featured */}
                <div 
                  className="featured" 
                  ref={featuredRef}
                  style={{
                    width: '20%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                    fontSize: '1.5vw',
                    position: 'relative',
                    height: '10vh',
                    overflow: 'hidden',
                    willChange: 'filter, opacity',
                    transition: 'filter 0.5s ease, opacity 0.5s ease'
                  }}
                >
                  {bloggersData.map((blogger, index) => (
                    <div
                      key={index}
                      className={`featured-content ${index === 0 ? 'active' : ''}`}
                      data-index={index}
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        opacity: index === 0 ? 1 : 0,
                        visibility: index === 0 ? 'visible' : 'hidden'
                      }}
                    >
                      <h3
                        style={{
                          whiteSpace: 'nowrap',
                          position: 'absolute',
                          top: '50%',
                          left: '50%',
                          transform: 'translate(-50%, -50%)',
                          width: '100%',
                          margin: 0,
                          fontWeight: 500,
                          color: 'rgba(245, 245, 245, 0.9)'
                        }}
                      >
                        {blogger.featured}
                      </h3>
                    </div>
                  ))}
                </div>

                {/* Right Column */}
                <div 
                  className="right-column" 
                  ref={rightColumnRef}
                  style={{
                    width: '40%',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.25rem',
                    textAlign: 'right',
                    willChange: 'filter, opacity',
                    transition: 'filter 0.5s ease, opacity 0.5s ease'
                  }}
                >
                  {bloggersData.map((blogger, index) => (
                    <div
                      key={index}
                      className={`category ${index === 0 ? 'active' : ''}`}
                      data-index={index}
                      style={{
                        opacity: 0,
                        transform: 'translateY(20px)',
                        transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                        color: 'rgba(245, 245, 245, 0.9)',
                        cursor: 'pointer',
                        position: 'relative',
                        paddingRight: 0
                      }}
                    >
                      {blogger.category}
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div 
                className="footer" 
                ref={footerRef}
                style={{
                  gridColumn: '1 / 13',
                  alignSelf: 'end',
                  paddingBottom: '5vh',
                  fontSize: '10vw',
                  lineHeight: '0.8',
                  textAlign: 'center',
                  color: 'rgba(245, 245, 245, 0.9)',
                  willChange: 'transform, filter, opacity',
                  transition: 'filter 0.5s ease, opacity 0.5s ease'
                }}
              >
                <div className="header-row">Style</div>
                <div className="header-row">Icons</div>
                <div 
                  className="progress-indicator"
                  style={{
                    width: '160px',
                    height: '1px',
                    margin: '2vh auto 0',
                    position: 'relative',
                    backgroundColor: 'rgba(245, 245, 245, 0.3)'
                  }}
                >
                  <div 
                    className="progress-numbers"
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      display: 'flex',
                      justifyContent: 'space-between',
                      fontSize: '0.7rem',
                      color: 'rgba(245, 245, 245, 0.9)',
                      fontFamily: 'var(--font-primary)',
                      letterSpacing: '-0.02em',
                      transform: 'translateY(-50%)',
                      margin: '0 -25px'
                    }}
                  >
                    <span ref={currentSectionRef}>01</span>
                    <span>0{bloggersData.length}</span>
                  </div>
                  <div 
                    className="progress-fill" 
                    ref={progressFillRef}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      height: '100%',
                      width: '0%',
                      backgroundColor: 'rgba(245, 245, 245, 0.9)',
                      transition: 'width 0.3s cubic-bezier(0.65, 0, 0.35, 1)'
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* End Section */}
        <div 
          className="end-section"
          style={{
            fontSize: '2rem',
            height: '100vh',
            position: 'relative',
            backgroundColor: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
        </div>
      </div>
    </div>
  );
}