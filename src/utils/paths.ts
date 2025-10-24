// Helper para caminhos de assets no GitHub Pages
export const getAssetPath = (path: string): string => {
  const basePath = process.env.NODE_ENV === 'production' ? '/modelsblogueiros' : '';
  return `${basePath}${path}`;
};

// Helper para verificar se estamos em produção
export const isProduction = (): boolean => {
  return process.env.NODE_ENV === 'production';
};