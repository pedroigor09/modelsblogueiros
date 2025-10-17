import { ShowcaseRefs, ShowcaseState } from './types';
import { bloggersData } from './data';

export const updateProgressNumbers = (state: ShowcaseState) => {
  // Implementar lógica de atualização dos números de progresso se necessário
  console.log(`Progress: ${state.currentSection.current + 1}/${bloggersData.length}`);
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
  const artists = document.querySelectorAll('.artist');
  const categories = document.querySelectorAll('.category');
  
  artists.forEach((artist, index) => {
    artist.addEventListener('click', () => {
      if (index !== state.currentSection.current) {
        snapToSection(index);
      }
    });
  });
  
  categories.forEach((category, index) => {
    category.addEventListener('click', () => {
      if (index !== state.currentSection.current) {
        snapToSection(index);
      }
    });
  });
};