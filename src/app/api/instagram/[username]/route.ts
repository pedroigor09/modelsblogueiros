import { NextResponse } from 'next/server';

const ACCESS_TOKEN = process.env.INSTAGRAM_ACCESS_TOKEN || '4aab34493f3a6ad3aa1f43e12cab7d97';
const BUSINESS_ACCOUNT_ID = process.env.INSTAGRAM_BUSINESS_ACCOUNT_ID;
const INSTAGRAM_GRAPH_API = 'https://graph.instagram.com';

// Cache simples em memória (em produção, use Redis ou similar)
const cache = new Map<string, { data: any; timestamp: number }>();
const CACHE_DURATION = 60 * 60 * 1000; // 1 hora

export async function GET(
  request: Request,
  { params }: { params: { username: string } }
) {
  try {
    const { username } = params;

    // Verificar cache
    const cached = cache.get(username);
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      return NextResponse.json(cached.data);
    }

    // Tentar usar a Graph API real se configurada
    if (BUSINESS_ACCOUNT_ID && ACCESS_TOKEN) {
      try {
        const response = await fetch(
          `${INSTAGRAM_GRAPH_API}/${BUSINESS_ACCOUNT_ID}/media?fields=id,caption,media_type,media_url,permalink,timestamp,like_count,comments_count&limit=12&access_token=${ACCESS_TOKEN}`,
          { next: { revalidate: 3600 } } // Revalidar a cada 1 hora
        );

        if (response.ok) {
          const data = await response.json();
          
          const result = {
            username,
            posts: data.data || []
          };

          // Armazenar no cache
          cache.set(username, { data: result, timestamp: Date.now() });

          return NextResponse.json(result);
        }
      } catch (apiError) {
        console.error('Erro ao chamar Instagram Graph API:', apiError);
        // Continuar para os dados mock se a API falhar
      }
    }

    // MOCK DATA para desenvolvimento/fallback
    const mockPosts = generateMockPosts(username);

    const result = {
      username,
      posts: mockPosts,
      isMock: true // Indicador de que são dados mock
    };

    // Armazenar no cache
    cache.set(username, { data: result, timestamp: Date.now() });

    return NextResponse.json(result);

  } catch (error) {
    console.error('Erro ao buscar posts do Instagram:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar posts do Instagram' },
      { status: 500 }
    );
  }
}

// Função para gerar posts mock baseados no username
function generateMockPosts(username: string) {
  const captions = [
    'Novo look de hoje! 🔥✨',
    'Salvador sempre inspirando 🌴☀️',
    'Detalhes que fazem a diferença 👌',
    'Streetwear vibes 🎨',
    'Produção do dia 💫',
    'Conforto e estilo ❤️',
    'Cores de Salvador 🌈',
    'Vibe única 😎',
    'Moda é arte 🎭',
    'Estilo autêntico 💯',
    'Salvador mood 🏖️',
    'Criatividade sem limites 🚀'
  ];

  const images = [
    '/africanique.jpg',
    '/deivisson1.jpg',
    '/kevin1.jpg',
    '/luiz1.jpg',
    '/suane1.jpg',
    '/ygor1.jpg',
    '/rone1.jpg',
    '/jef1.jpg',
    '/laissa.jpg',
    '/renatinha.jpg',
    '/thiagovitt.jpg',
    '/wall.jpg'
  ];

  return Array.from({ length: 12 }, (_, i) => ({
    id: `${username}_${i + 1}`,
    caption: captions[i] || `Post ${i + 1} de ${username}`,
    media_type: 'IMAGE',
    media_url: images[i % images.length],
    permalink: `https://instagram.com/${username}/p/mock_${i + 1}`,
    timestamp: new Date(Date.now() - i * 86400000).toISOString(),
    like_count: Math.floor(Math.random() * 20000) + 5000,
    comments_count: Math.floor(Math.random() * 500) + 100
  }));
}
