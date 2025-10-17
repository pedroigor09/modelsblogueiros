export interface Blogger {
  id: string;
  name: string;
  image: string;
  colorPalette: {
    primary: string;
    secondary: string;
    tertiary: string;
  };
  gallery: string[];
  description: string;
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