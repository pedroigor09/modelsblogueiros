import { gsap } from 'gsap';
import { ShowcaseRefs } from './types';

export const animateLoadingCounter = (
  refs: Pick<ShowcaseRefs, 'loadingOverlayRef' | 'loadingCounterRef'>,
  onComplete: () => void
) => {
  
  if (!refs.loadingOverlayRef.current || !refs.loadingCounterRef.current) {
    return;
  }
  
  gsap.set(refs.loadingOverlayRef.current, {
    display: 'flex',
    y: 0,
    opacity: 1
  });
  
  
  let counter = 0;
  const counterInterval = setInterval(() => {
    counter += Math.random() * 3 + 1; 
    if (counter >= 100) {
      counter = 100;
      clearInterval(counterInterval);
      
      setTimeout(() => {
        const loadingCounter = refs.loadingOverlayRef.current!.querySelector('.loading-counter');
        if (loadingCounter) {
          gsap.to(loadingCounter, {
            opacity: 0,
            y: -20,
            duration: 0.6,
            ease: "power2.inOut"
          });
        }
        
        const loadingText = refs.loadingOverlayRef.current!.children[0];
        if (loadingText) {
          gsap.to(loadingText, {
            opacity: 0,
            y: -20,
            duration: 0.6,
            ease: "power2.inOut",
            onComplete: () => {
              gsap.to(refs.loadingOverlayRef.current, {
                y: "-100%",
                duration: 1.2,
                ease: "power3.inOut",
                delay: 0.3,
                onComplete: () => {
                  if (refs.loadingOverlayRef.current) {
                    refs.loadingOverlayRef.current.style.display = "none";
                  }
                  onComplete();
                }
              });
            }
          });
        }
      }, 200); 
    }
    
    if (refs.loadingCounterRef.current) {
      refs.loadingCounterRef.current.textContent = `[${counter.toFixed(0).padStart(2, "0")}]`;
    }
  }, 30); 
};

export const animateColumnsEntry = () => {
  
  requestAnimationFrame(() => {
    const artistItems = document.querySelectorAll('.artist');
    const categoryItems = document.querySelectorAll('.category');
    
    
    artistItems.forEach((item, index) => {
      item.classList.remove('loaded', 'active');
      gsap.set(item, { 
        opacity: 0, 
        transform: 'translateY(20px)'
      });
    });
    
    categoryItems.forEach((item, index) => {
      item.classList.remove('loaded', 'active');
      gsap.set(item, { 
        opacity: 0, 
        transform: 'translateY(20px)'
      });
    });
    
    setTimeout(() => {
      
      artistItems.forEach((item, index) => {
        setTimeout(() => {
          item.classList.add('loaded');
          if (index === 0) {
            item.classList.add('active'); 
          }
        }, index * 60); 
      });
      
      categoryItems.forEach((item, index) => {
        setTimeout(() => {
          item.classList.add('loaded');
          if (index === 0) {
            item.classList.add('active'); 
          }
        }, index * 60 + 200); 
      });
    }, 100);
  });
};