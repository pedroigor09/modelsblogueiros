export interface Blogger {
  id: string;
  name: string;
  image: string;
  nameColor?: string; // Cor específica para o nome (sobrescreve primary)
  quoteColor?: string; // Cor específica para a quote (pode ser degradê)
  colorPalette: {
    primary: string;
    secondary: string;
    tertiary: string;
  };
  gallery: string[];
  description: string;
  style: string; // Nicho/estilo específico
  quote: string; // Frase marcante
  location?: string;
  specialty?: string; // Especialidade/diferencial
  instagram?: {
    followers: number;
    username?: string;
    engagement?: number; // Taxa de engajamento em %
  };
  verified?: boolean;
  badge?: string; // Badge especial
}

export interface MousePosition {
  x: number;
  y: number;
}

export interface ColorTransition {
  from: string;
  to: string;
  duration: number;
}

export interface ScrollProgress {
  current: number;
  total: number;
  direction: 'up' | 'down';
}