import { Blogger } from '@/types';

export const mockBloggers: Blogger[] = [
  {
    id: '1',
    name: 'Africanique',
    image: '/africanique.jpg',
    colorPalette: {
      primary: '#D4AF37',
      secondary: '#8B4513',
      tertiary: '#FF8C42'
    },
    gallery: [
      '/africanique.jpg',
      '/africanique2.jpg',
      '/africanique3.jpg'
    ],
    description: 'Afrofuturismo e elegância',
    style: 'Afrofuturismo',
    quote: 'Minha cultura é minha passarela.',
    location: 'Salvador, BA',
    specialty: 'Looks afrocentrados',
    instagram: {
      followers: 540000,
      username: 'africanique',
      engagement: 8.5
    },
    verified: true,
    badge: 'Top Creator'
  },
  {
    id: '2',
    name: 'Deivisson',
    image: '/deivisson.jpg',
    colorPalette: {
      primary: '#4A90E2', // Azul
      secondary: '#FFFFFF', // Branco
      tertiary: '#8B6F47'  // Marrom
    },
    gallery: [
      '/deivisson1.jpg',
      '/deivisson2.jpg',
      '/deivisson3.jpg'
    ],
    description: 'Streetwear com atitude',
    style: 'Streetwear',
    quote: 'Estilo não é sobre seguir tendências, é sobre criar sua própria história.',
    location: 'Salvador, BA',
    specialty: 'Street style urbano',
    instagram: {
      followers: 269000,
      username: 'deivisson03',
      engagement: 7.2
    },
    verified: true,
  },
  {
    id: '3',
    name: 'Laissa',
    image: '/laissa.jpg',
    colorPalette: {
      primary: '#E74C3C',
      secondary: '#F39C12',
      tertiary: '#E91E63'
    },
    gallery: [
      '/laissa.jpg',
      '/laissa2.jpg',
      '/laissa3.jpg'
    ],
    description: 'Feminilidade e poder',
    style: 'Fashion',
    quote: 'Empoderamento veste bem em qualquer ocasião.',
    location: 'Salvador, BA',
    specialty: 'Looks femininos poderosos',
    instagram: {
      followers: 138000,
      username: 'L4issa',
      engagement: 9.1
    }
  },
  {
    id: '4',
    name: 'Kevin',
    image: '/kevin.jpg',
    nameColor: '#00FFFF', // Ciano vibrante para o nome
    colorPalette: {
      primary: '#FFFFFF', // Branco
      secondary: '#00CED1', // Ciano
      tertiary: '#D2B48C'  // Bege
    },
    gallery: [
      '/kevin.jpg',
      '/kevin2.jpg',
      '/kevin3.jpg'
    ],
    description: 'Vanguarda e criatividade',
    style: 'Vanguarda',
    quote: 'Salvador pulsa em cada escolha, cada cor, cada textura que abraço.',
    location: 'Salvador, BA',
    specialty: 'Experimentação de texturas',
    instagram: {
      followers: 317000,
      username: 'kevinkarmo',
      engagement: 8.8
    },
    verified: true,
    badge: 'Innovator'
  },
  {
    id: '5',
    name: 'Renatinha',
    image: '/renatinha.jpg',
    colorPalette: {
      primary: '#FF1493', // Pink vibrante
      secondary: '#FFB6D9', // Rosa claro
      tertiary: '#FFC8DD'  // Rosa pastel
    },
    gallery: [
      '/renatinha.jpg',
      '/renatinha2.jpg',
      '/renatinha3.jpg'
    ],
    description: 'Doçura e personalidade',
    style: 'Fashion & Lifestyle',
    quote: 'Moda é arte em movimento, e eu sou tanto a tela quanto o pincel.',
    location: 'Salvador, BA',
    specialty: 'Lifestyle fashion',
    instagram: {
      followers: 711000,
      username: 'renatinhaap',
      engagement: 10.2
    },
    verified: true,
    badge: 'Top Influencer'
  },
  {
    id: '6',
    name: 'Thiago Vitt',
    image: '/thiagovitt.jpg',
    colorPalette: {
      primary: '#34495E',
      secondary: '#95A5A6',
      tertiary: '#BDC3C7'
    },
    gallery: [
      '/thiagovitt.jpg',
      '/thiagovitt2.jpg',
      '/thiagovitt3.jpg'
    ],
    description: 'Minimalismo moderno',
    style: 'Minimal',
    quote: 'Menos é mais quando você sabe o que importa.',
    specialty: 'Minimalismo sofisticado',
    instagram: {
      followers: 67000,
      username: 'thiagovitt',
      engagement: 6.8
    },
    verified: true,
    badge: 'Clean Aesthetic'
  },
  {
    id: '7',
    name: 'Luiz Felipe',
    image: '/luizfelipe.jpg',
    nameColor: '#00BFFF', // Azul choque
    colorPalette: {
      primary: '#FFFFFF', // Branco
      secondary: '#4169E1', // Azul
      tertiary: '#000000'  // Preto
    },
    gallery: [
      '/luizfelipe.jpg',
      '/luizfelipe2.jpg',
      '/luizfelipe3.jpg'
    ],
    description: 'Estilo urbano e autêntico',
    style: 'Urban',
    quote: 'Estilo não é sobre seguir tendências, é sobre criar sua própria história.',
    location: 'Salvador, BA',
    specialty: 'Autenticidade urbana',
    instagram: {
      followers: 205000,
      username: 'lfcerq',
      engagement: 7.5
    }
  },
  {
    id: '8',
    name: 'Suane',
    image: '/suane.jpg',
    nameColor: '#FFFF00', // Amarelo choque para o nome
    quoteColor: 'linear-gradient(135deg, #000000, #FFD700, #000000)', // Degradê preto-ouro-preto
    colorPalette: {
      primary: '#FFFFFF', // Branco
      secondary: '#000000', // Preto
      tertiary: '#FFD700'  // Ouro
    },
    gallery: [
      '/suane.jpg',
      '/suane2.jpg',
      '/suane3.jpg'
    ],
    description: 'Sofisticação e charme',
    style: 'Sofisticação',
    quote: 'Cada roupa que visto carrega um pedaço da minha alma e da minha cidade.',
    location: 'Salvador, BA',
    specialty: 'Elegância urbana',
    instagram: {
      followers: 552000,
      username: 'suaneff',
      engagement: 9.4
    },
    verified: true,
    badge: 'Style Icon'
  },
  {
    id: '9',
    name: 'Wallace',
    image: '/wall.jpg',
    colorPalette: {
      primary: '#D97520', // Laranja queimado
      secondary: '#F39C12', // Laranja médio
      tertiary: '#F7DC6F'  // Amarelo claro
    },
    gallery: [
      '/wall.jpg',
      '/wall2.jpg',
      '/wall3.jpg'
    ],
    description: 'Energia e personalidade',
    style: 'Urban Energy',
    quote: 'Salvador pulsa em cada escolha, cada cor, cada textura que abraço.',
    location: 'Salvador, BA',
    specialty: 'Looks vibrantes',
    instagram: {
      followers: 77600,
      username: 'wallace.rn',
      engagement: 11.3
    }
  },
  {
    id: '10',
    name: 'Ygor',
    image: '/ygor.jpg',
    colorPalette: {
      primary: '#90EE90', // Verde claro
      secondary: '#FF8C00', // Laranja
      tertiary: '#FFFFFF'  // Branco
    },
    gallery: [
      '/ygor.jpg',
      '/ygor2.jpg',
      '/ygor3.jpg'
    ],
    description: 'Ousadia e inovação',
    style: 'Bold Fashion',
    quote: 'Moda é arte em movimento, e eu sou tanto a tela quanto o pincel.',
    location: 'Salvador, BA',
    specialty: 'Alta ousadia',
    instagram: {
      followers: 203000,
      username: 'ygoralbuu',
      engagement: 10.2
    },
    verified: true,
    badge: 'Trendsetter'
  },
  {
    id: '11',
    name: 'Rone',
    image: '/rone.jpg',
    colorPalette: {
      primary: '#000000', // Preto
      secondary: '#FFFFFF', // Branco
      tertiary: '#FF8C00'  // Laranja
    },
    gallery: [
      '/rone.jpg',
      '/rone2.jpg',
      '/rone3.jpg'
    ],
    description: 'Estilo único e marcante',
    style: 'Unique',
    quote: 'Minha moda é minha voz, cada look é uma palavra que escolho falar ao mundo.',
    location: 'Salvador, BA',
    specialty: 'Identidade visual forte',
    instagram: {
      followers: 228000,
      username: 'rone_lima',
      engagement: 7.9
    }
  },
  {
    id: '12',
    name: 'Jeferson',
    image: '/jef.jpg',
    nameColor: '#8B4513', // Marrom choque para o nome
    colorPalette: {
      primary: '#FFFFFF', // Branco
      secondary: '#8B4513', // Marrom
      tertiary: '#F5F5DC'  // Bege claro
    },
    gallery: [
      '/jef.jpg',
      '/jef2.jpg',
      '/jef3.jpg'
    ],
    description: 'Criatividade sem limites',
    style: 'Creative',
    quote: 'Estilo não é sobre seguir tendências, é sobre criar sua própria história.',
    location: 'Salvador, BA',
    specialty: 'Experimentação criativa',
    instagram: {
      followers: 1200000,
      username: 'jefersonsantos._',
      engagement: 12.1
    },
    verified: true,
    badge: 'Mega Influencer'
  }
];