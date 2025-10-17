import { gsap } from 'gsap';
import { ShowcaseRefs } from './types';

export const animateLoadingCounter = (
  refs: Pick<ShowcaseRefs, 'loadingOverlayRef' | 'loadingCounterRef'>,
  onComplete: () => void
) => {
  console.log('🎬 Iniciando animação de loading...'); // Debug
  
  if (!refs.loadingOverlayRef.current || !refs.loadingCounterRef.current) {
    console.log('❌ Refs não encontradas para loading animation');
    return;
  }
  
  // Garantir que o loading está visível
  gsap.set(refs.loadingOverlayRef.current, {
    display: 'flex',
    y: 0,
    opacity: 1
  });
  
  console.log('✅ Loading overlay configurado e visível');
  
  let counter = 0;
  const counterInterval = setInterval(() => {
    counter += Math.random() * 3 + 1; // Usando a mesma velocidade do original
    if (counter >= 100) {
      counter = 100;
      clearInterval(counterInterval);
      console.log('🎯 Contador chegou a 100, iniciando fade out...');
      
      setTimeout(() => {
        // Animar loading para fora - exatamente como no original
        const loadingCounter = refs.loadingOverlayRef.current!.querySelector('.loading-counter');
        if (loadingCounter) {
          gsap.to(loadingCounter, {
            opacity: 0,
            y: -20,
            duration: 0.6,
            ease: "power2.inOut"
          });
        }
        
        // Animar o texto principal para fora
        const loadingText = refs.loadingOverlayRef.current!.children[0];
        if (loadingText) {
          gsap.to(loadingText, {
            opacity: 0,
            y: -20,
            duration: 0.6,
            ease: "power2.inOut",
            onComplete: () => {
              console.log('🚀 Animando saída do loading overlay...');
              // Slide overlay up como no original
              gsap.to(refs.loadingOverlayRef.current, {
                y: "-100%",
                duration: 1.2,
                ease: "power3.inOut",
                delay: 0.3,
                onComplete: () => {
                  if (refs.loadingOverlayRef.current) {
                    refs.loadingOverlayRef.current.style.display = "none";
                  }
                  console.log('✨ Loading concluído, iniciando animação das colunas...');
                  // Iniciar animação das colunas
                  onComplete();
                }
              });
            }
          });
        }
      }, 200); // Mesmo delay do original
    }
    
    if (refs.loadingCounterRef.current) {
      refs.loadingCounterRef.current.textContent = `[${counter.toFixed(0).padStart(2, "0")}]`;
    }
  }, 30); // Mesmo intervalo do original
};

export const animateColumnsEntry = () => {
  console.log('🎭 Iniciando animação das colunas...');
  
  // Aguardar um frame para garantir que o DOM está atualizado
  requestAnimationFrame(() => {
    const artistItems = document.querySelectorAll('.artist');
    const categoryItems = document.querySelectorAll('.category');
    
    console.log(`🎨 Encontrou ${artistItems.length} artistas e ${categoryItems.length} categorias`);
    
    // Primeiro, garantir que todos estão resetados
    artistItems.forEach((item, index) => {
      item.classList.remove('loaded', 'active');
      gsap.set(item, { 
        opacity: 0, 
        transform: 'translateY(20px)'
      });
      console.log(`🎯 Reset artista ${index}: ${item.textContent}`);
    });
    
    categoryItems.forEach((item, index) => {
      item.classList.remove('loaded', 'active');
      gsap.set(item, { 
        opacity: 0, 
        transform: 'translateY(20px)'
      });
      console.log(`🎯 Reset categoria ${index}: ${item.textContent}`);
    });
    
    // Aguardar um pouco antes de iniciar as animações
    setTimeout(() => {
      console.log('🚀 Iniciando animações escalonadas...');
      
      // Animar artistas primeiro - exatamente como no original
      artistItems.forEach((item, index) => {
        setTimeout(() => {
          item.classList.add('loaded');
          if (index === 0) {
            item.classList.add('active'); // Primeiro item ativo
          }
          console.log(`✨ Animando artista ${index}: ${item.textContent}`);
        }, index * 60); // Mesmo timing do original
      });
      
      // Animar categorias com delay - exatamente como no original
      categoryItems.forEach((item, index) => {
        setTimeout(() => {
          item.classList.add('loaded');
          if (index === 0) {
            item.classList.add('active'); // Primeiro item ativo
          }
          console.log(`✨ Animando categoria ${index}: ${item.textContent}`);
        }, index * 60 + 200); // Mesmo delay do original
      });
    }, 100);
  });
};