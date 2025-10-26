import { ShowcaseRefs, ShowcaseState } from './types';
import { bloggersData } from './data';

export const updateProgressNumbers = (state: ShowcaseState, refs?: ShowcaseRefs) => {
  const currentNum = state.currentSection.current + 1;
  const totalNum = bloggersData.length;

  
  if (refs?.currentSectionRef.current) {
    const formattedNum = currentNum.toString().padStart(2, '0');
    refs.currentSectionRef.current.textContent = formattedNum;
  }
  
  if (refs?.progressFillRef.current) {
    const progressPercentage = ((currentNum - 1) / (totalNum - 1)) * 100;
    refs.progressFillRef.current.style.width = `${progressPercentage}%`;
  }
};

export const updateDebugInfo = (info: string, refs: ShowcaseRefs) => {
  if (refs.debugInfoRef.current) {
    refs.debugInfoRef.current.textContent = info;
  }
};

export const setupDebug = (refs: ShowcaseRefs) => {
  if (refs.debugInfoRef.current) {
    refs.debugInfoRef.current.style.position = 'fixed';
    refs.debugInfoRef.current.style.top = '10px';
    refs.debugInfoRef.current.style.left = '10px';
    refs.debugInfoRef.current.style.background = 'rgba(0,0,0,0.8)';
    refs.debugInfoRef.current.style.color = 'white';
    refs.debugInfoRef.current.style.padding = '10px';
    refs.debugInfoRef.current.style.fontSize = '12px';
    refs.debugInfoRef.current.style.zIndex = '9999';
    refs.debugInfoRef.current.style.display = 'none'; // Esconder por padrão
  }
};

export const setupNavigation = (
  state: ShowcaseState,
  snapToSection: (targetSection: number) => void
) => {
  // 📱 Detectar se é mobile
  const isMobile = window.innerWidth <= 768 || 'ontouchstart' in window;
  
  // Aguardar que os elementos estejam no DOM
  setTimeout(() => {
    const artists = document.querySelectorAll('.artist');
    const categories = document.querySelectorAll('.category');
    
    console.log(`🎯 Setup Navigation - Artists found: ${artists.length}, Categories found: ${categories.length}`);
    console.log(`📱 Mobile detected: ${isMobile} - Navigation clicks ${isMobile ? 'DISABLED' : 'ENABLED'}`);
    
    artists.forEach((artist, index) => {
      // Remover listeners existentes primeiro
      const newArtist = artist.cloneNode(true);
      artist.parentNode?.replaceChild(newArtist, artist);
      
      // 🔧 SÓ adicionar cliques se NÃO for mobile
      if (!isMobile) {
        newArtist.addEventListener('click', (e) => {
          e.preventDefault();
          console.log(`🎵 Artist clicked: ${index} (${newArtist.textContent})`);
          if (index !== state.currentSection.current && !state.isAnimating.current) {
            snapToSection(index);
          }
        });
        
        // Cursor pointer apenas no desktop
        (newArtist as HTMLElement).style.cursor = 'pointer';
      } else {
        // 📱 Mobile: PREVENIR cliques completamente
        (newArtist as HTMLElement).style.cursor = 'default';
        (newArtist as HTMLElement).style.pointerEvents = 'none';
        
        // Bloquear eventos de touch também
        newArtist.addEventListener('touchstart', (e) => {
          e.preventDefault();
          e.stopPropagation();
          return false;
        }, { passive: false });
        
        console.log(`📱 Mobile: Navigation BLOCKED for ${newArtist.textContent}`);
      }
    });
    
    categories.forEach((category, index) => {
      // Remover listeners existentes primeiro
      const newCategory = category.cloneNode(true);
      category.parentNode?.replaceChild(newCategory, category);
      
      // 🔧 SÓ adicionar cliques se NÃO for mobile
      if (!isMobile) {
        newCategory.addEventListener('click', (e) => {
          e.preventDefault();
          console.log(`🎨 Category clicked: ${index} (${newCategory.textContent})`);
          if (index !== state.currentSection.current && !state.isAnimating.current) {
            snapToSection(index);
          }
        });
        
        // Cursor pointer apenas no desktop
        (newCategory as HTMLElement).style.cursor = 'pointer';
      } else {
        // 📱 Mobile: PREVENIR cliques completamente
        (newCategory as HTMLElement).style.cursor = 'default';
        (newCategory as HTMLElement).style.pointerEvents = 'none';
        
        // Bloquear eventos de touch também
        newCategory.addEventListener('touchstart', (e) => {
          e.preventDefault();
          e.stopPropagation();
          return false;
        }, { passive: false });
        
        console.log(`📱 Mobile: Navigation BLOCKED for ${newCategory.textContent}`);
      }
    });
    
    console.log(`✅ Navigation setup completed for ${bloggersData.length} sections`);
  }, 1000); // Aguardar 1 segundo para garantir que o DOM esteja pronto
};