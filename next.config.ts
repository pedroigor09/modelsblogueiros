import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
    ],
  },
  // Configuração para GitHub Pages
  basePath: process.env.NODE_ENV === 'production' ? '/modelsblogueiros' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/modelsblogueiros/' : '',
};

export default nextConfig;
