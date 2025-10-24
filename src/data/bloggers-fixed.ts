import { Blogger } from '@/types';
import { getAssetPath } from '@/utils/paths';

export const mockBloggers: Blogger[] = [
  {
    id: '1',
    name: 'Africanique',
    image: getAssetPath('/africanique.jpg'),
    colorPalette: {
      primary: '#D4AF37',
      secondary: '#8B4513',
      tertiary: '#FF8C42'
    },
    gallery: [
      getAssetPath('/africanique.jpg'),
      getAssetPath('/africanique2.jpg'),
      getAssetPath('/africanique3.jpg')
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
    image: getAssetPath('/deivisson.jpg'),
    colorPalette: {
      primary: '#4A90E2',
      secondary: '#FFFFFF',
      tertiary: '#8B6F47'
    },
    gallery: [
      getAssetPath('/deivisson1.jpg'),
      getAssetPath('/deivisson2.jpg'),
      getAssetPath('/deivisson3.jpg')
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
    image: getAssetPath('/laissa.jpg'),
    colorPalette: {
      primary: '#E74C3C',
      secondary: '#F39C12',
      tertiary: '#E91E63'
    },
    gallery: [
      getAssetPath('/laissa.jpg'),
      getAssetPath('/laissa2.jpg'),
      getAssetPath('/laissa3.jpg')
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
    image: getAssetPath('/kevin.jpg'),
    nameColor: '#00FFFF',
    colorPalette: {
      primary: '#FFFFFF',
      secondary: '#00CED1',
      tertiary: '#D2B48C'
    },
    gallery: [
      getAssetPath('/kevin.jpg'),
      getAssetPath('/kevin2.jpg'),
      getAssetPath('/kevin3.jpg')
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
    image: getAssetPath('/renatinha.jpg'),
    colorPalette: {
      primary: '#FF1493',
      secondary: '#FFB6D9',
      tertiary: '#FFC8DD'
    },
    gallery: [
      getAssetPath('/renatinha.jpg'),
      getAssetPath('/renatinha2.jpg'),
      getAssetPath('/renatinha3.jpg')
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
    image: getAssetPath('/thiagovitt.jpg'),
    colorPalette: {
      primary: '#34495E',
      secondary: '#95A5A6',
      tertiary: '#BDC3C7'
    },
    gallery: [
      getAssetPath('/thiagovitt.jpg'),
      getAssetPath('/thiagovitt2.jpg'),
      getAssetPath('/thiagovitt3.jpg')
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
    image: getAssetPath('/luizfelipe.jpg'),
    nameColor: '#00BFFF',
    colorPalette: {
      primary: '#FFFFFF',
      secondary: '#4169E1',
      tertiary: '#000000'
    },
    gallery: [
      getAssetPath('/luizfelipe.jpg'),
      getAssetPath('/luizfelipe2.jpg'),
      getAssetPath('/luizfelipe3.jpg')
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
    image: getAssetPath('/suane.jpg'),
    nameColor: '#FFFF00',
    quoteColor: 'linear-gradient(135deg, #000000, #FFD700, #000000)',
    colorPalette: {
      primary: '#FFFFFF',
      secondary: '#000000',
      tertiary: '#FFD700'
    },
    gallery: [
      getAssetPath('/suane.jpg'),
      getAssetPath('/suane2.jpg'),
      getAssetPath('/suane3.jpg')
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
    image: getAssetPath('/wall.jpg'),
    colorPalette: {
      primary: '#D97520',
      secondary: '#F39C12',
      tertiary: '#F7DC6F'
    },
    gallery: [
      getAssetPath('/wall.jpg'),
      getAssetPath('/wall2.jpg'),
      getAssetPath('/wall3.jpg')
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
    image: getAssetPath('/ygor.jpg'),
    colorPalette: {
      primary: '#90EE90',
      secondary: '#FF8C00',
      tertiary: '#FFFFFF'
    },
    gallery: [
      getAssetPath('/ygor.jpg'),
      getAssetPath('/ygor2.jpg'),
      getAssetPath('/ygor3.jpg')
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
    image: getAssetPath('/rone.jpg'),
    colorPalette: {
      primary: '#000000',
      secondary: '#FFFFFF',
      tertiary: '#FF8C00'
    },
    gallery: [
      getAssetPath('/rone.jpg'),
      getAssetPath('/rone2.jpg'),
      getAssetPath('/rone3.jpg')
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
    image: getAssetPath('/jef.jpg'),
    nameColor: '#8B4513',
    colorPalette: {
      primary: '#FFFFFF',
      secondary: '#8B4513',
      tertiary: '#F5F5DC'
    },
    gallery: [
      getAssetPath('/jef.jpg'),
      getAssetPath('/jef2.jpg'),
      getAssetPath('/jef3.jpg')
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
  },
  {
    id: '13',
    name: 'Jonathan Silva',
    image: getAssetPath('/jn.jpg'),
    nameColor: '#FF6B35',
    colorPalette: {
      primary: '#FF6B35',
      secondary: '#004E89',
      tertiary: '#FFFFFF'
    },
    gallery: [
      getAssetPath('/jn.jpg'),
      getAssetPath('/jn2.jpg'),
      getAssetPath('/jn3.jpg')
    ],
    description: 'Estilo urbano e autêntico',
    style: 'Street Style',
    quote: 'Autenticidade é o que nos diferencia na multidão.',
    location: 'Salvador, BA',
    specialty: 'Street fashion',
    instagram: {
      followers: 485000,
      username: 'jnathanl8',
      engagement: 8.7
    },
    verified: true,
    badge: 'Style Pioneer'
  },
  {
    id: '14',
    name: 'Matheus Santos',
    image: getAssetPath('/math1.jpg'),
    nameColor: '#9B59B6',
    colorPalette: {
      primary: '#9B59B6',
      secondary: '#F39C12',
      tertiary: '#2C3E50'
    },
    gallery: [
      getAssetPath('/math1.jpg'),
      getAssetPath('/math2.jpg'),
      getAssetPath('/math3.jpg')
    ],
    description: 'Elegância moderna e sofisticada',
    style: 'Sophisticated',
    quote: 'A moda é a armadura para sobreviver à realidade do dia a dia.',
    location: 'Salvador, BA',
    specialty: 'Looks sofisticados',
    instagram: {
      followers: 327000,
      username: 'm4theuscalasass_',
      engagement: 9.2
    },
    verified: true,
    badge: 'Fashion Forward'
  }
];