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

const setupMobileNavigation = (state: ShowcaseState) => {
  const artists = document.querySelectorAll('.artist');
  const categories = document.querySelectorAll('.category');
  const backgrounds = document.querySelectorAll('.background-image');
  const featuredContents = document.querySelectorAll('.featured-content');
  
  
  const changeMobileSection = (targetIndex: number) => {
    state.currentSection.current = targetIndex;
    
    backgrounds.forEach((bg, index) => {
      const bgElement = bg as HTMLElement;
      
      if (index === targetIndex) {
        bgElement.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        bgElement.style.opacity = '0';
        bgElement.style.transform = 'scale(1.05)';
        bgElement.style.zIndex = '2';
        bg.classList.add('active');
        
        setTimeout(() => {
          bgElement.style.opacity = '1';
          bgElement.style.transform = 'scale(1)';
        }, 50);
      } else {
        bgElement.style.transition = 'all 0.6s ease-out';
        bgElement.style.opacity = '0';
        bgElement.style.transform = 'scale(0.95)';
        bgElement.style.zIndex = '0';
        bg.classList.remove('active');
      }
    });
    
    artists.forEach((artist, index) => {
      const artistElement = artist as HTMLElement;
      
      if (index === targetIndex) {
        artistElement.style.transition = 'all 0.7s cubic-bezier(0.34, 1.56, 0.64, 1)';
        artistElement.style.opacity = '0';
        artistElement.style.transform = 'translateX(-30px)';
        artistElement.style.paddingLeft = '0px';
        artist.classList.add('active');
        
        setTimeout(() => {
          artistElement.style.opacity = '1';
          artistElement.style.transform = 'translateX(0)';
          artistElement.style.paddingLeft = '15px';
        }, 100);
      } else {
        artistElement.style.transition = 'all 0.5s ease-out';
        artistElement.style.opacity = '0.3';
        artistElement.style.transform = 'translateX(0)';
        artistElement.style.paddingLeft = '0';
        artist.classList.remove('active');
      }
    });
    
    categories.forEach((category, index) => {
      const categoryElement = category as HTMLElement;
      
      if (index === targetIndex) {
        categoryElement.style.transition = 'all 0.7s cubic-bezier(0.34, 1.56, 0.64, 1)';
        categoryElement.style.opacity = '0';
        categoryElement.style.transform = 'translateX(30px)';
        categoryElement.style.paddingRight = '0px';
        category.classList.add('active');
        
        setTimeout(() => {
          categoryElement.style.opacity = '1';
          categoryElement.style.transform = 'translateX(0)';
          categoryElement.style.paddingRight = '15px';
        }, 150);
      } else {
        categoryElement.style.transition = 'all 0.5s ease-out';
        categoryElement.style.opacity = '0.3';
        categoryElement.style.transform = 'translateX(0)';
        categoryElement.style.paddingRight = '0';
        category.classList.remove('active');
      }
    });
    
    featuredContents.forEach((content, index) => {
      const contentElement = content as HTMLElement;
      
      if (index === targetIndex) {
        contentElement.style.transition = 'all 0.9s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        contentElement.style.visibility = 'visible';
        contentElement.style.opacity = '0';
        contentElement.style.transform = 'translateY(20px) scale(0.95)';
        content.classList.add('active');
        
        setTimeout(() => {
          contentElement.style.opacity = '1';
          contentElement.style.transform = 'translateY(0) scale(1)';
        }, 200);
      } else {
        contentElement.style.transition = 'all 0.4s ease-out';
        contentElement.style.opacity = '0';
        contentElement.style.transform = 'translateY(-10px) scale(0.98)';
        
        setTimeout(() => {
          contentElement.style.visibility = 'hidden';
        }, 400);
        
        content.classList.remove('active');
      }
    });
  };
  
  artists.forEach((artist, index) => {
    const newArtist = artist.cloneNode(true);
    artist.parentNode?.replaceChild(newArtist, artist);
    
    (newArtist as HTMLElement).classList.add('loaded');
    (newArtist as HTMLElement).style.opacity = index === 0 ? '1' : '0.3';
    
    newArtist.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      
      const artistElement = newArtist as HTMLElement;
      artistElement.style.transform = 'scale(1.05)';
      artistElement.style.transition = 'transform 0.15s ease-out';
      
      setTimeout(() => {
        artistElement.style.transform = 'scale(1)';
        changeMobileSection(index);
      }, 150);
    });
    
    (newArtist as HTMLElement).style.cursor = 'pointer';
  });
  
  categories.forEach((category, index) => {
    const newCategory = category.cloneNode(true);
    category.parentNode?.replaceChild(newCategory, category);
    
    (newCategory as HTMLElement).classList.add('loaded');
    (newCategory as HTMLElement).style.opacity = index === 0 ? '1' : '0.3';
    
    newCategory.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      
      const categoryElement = newCategory as HTMLElement;
      categoryElement.style.transform = 'scale(1.05)';
      categoryElement.style.transition = 'transform 0.15s ease-out';
      
      setTimeout(() => {
        categoryElement.style.transform = 'scale(1)';
        changeMobileSection(index);
      }, 150);
    });
    
    (newCategory as HTMLElement).style.cursor = 'pointer';
  });
  
  setTimeout(() => {
    changeMobileSection(0);
  }, 100);  
};

export const setupNavigation = (
  state: ShowcaseState,
  snapToSection: (targetSection: number) => void
) => {
  const isMobile = window.innerWidth <= 768 || 'ontouchstart' in window;
  
  setTimeout(() => {
    if (isMobile) {
      setupMobileNavigation(state);
      return;
    }
    
    const artists = document.querySelectorAll('.artist');
    const categories = document.querySelectorAll('.category');
    
    
    artists.forEach((artist, index) => {
      const newArtist = artist.cloneNode(true);
      artist.parentNode?.replaceChild(newArtist, artist);
      
      (newArtist as HTMLElement).classList.add('loaded');
      (newArtist as HTMLElement).style.opacity = index === 0 ? '1' : '0.3';
      
      newArtist.addEventListener('click', (e) => {
        e.preventDefault();
        if (index !== state.currentSection.current && !state.isAnimating.current) {
          snapToSection(index);
        }
      });
      
      (newArtist as HTMLElement).style.cursor = 'pointer';
    });
    
    categories.forEach((category, index) => {
      const newCategory = category.cloneNode(true);
      category.parentNode?.replaceChild(newCategory, category);
      
      (newCategory as HTMLElement).classList.add('loaded');
      (newCategory as HTMLElement).style.opacity = index === 0 ? '1' : '0.3';
      
      newCategory.addEventListener('click', (e) => {
        e.preventDefault();
        if (index !== state.currentSection.current && !state.isAnimating.current) {
          snapToSection(index);
        }
      });
      
      (newCategory as HTMLElement).style.cursor = 'pointer';
    });
    

  }, 1000);
};