import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CustomEase } from 'gsap/CustomEase';
import { SplitText } from 'gsap/SplitText';

export const initGSAP = () => {
  if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger, CustomEase, SplitText);
    CustomEase.create("customEase", "M0,0 C0.86,0 0.07,1 1,1");
  }
};

export const cleanupGSAP = () => {
  ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  gsap.killTweensOf("*");
};

// Inicializar Lenis
export const initLenis = async () => {
  try {
    const { default: Lenis } = await import('lenis');
    
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
    });

    lenis.on('scroll', (e: any) => {
      ScrollTrigger.update();
    });
    
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    
    gsap.ticker.lagSmoothing(0);
    
    return lenis;
  } catch (error) {
    console.error('❌ Erro ao inicializar Lenis:', error);
    return null;
  }
};