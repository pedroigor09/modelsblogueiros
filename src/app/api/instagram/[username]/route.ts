import { NextResponse } from 'next/server';

const ACCESS_TOKEN = process.env.INSTAGRAM_ACCESS_TOKEN || '4aab34493f3a6ad3aa1f43e12cab7d97';
const INSTAGRAM_GRAPH_API = 'https://graph.instagram.com';

// Mapeamento de usernames para Business Account IDs
const BUSINESS_ACCOUNT_IDS: Record<string, string> = {
  'deivisson_03': process.env.DEIVISSON_BUSINESS_ID || '',
  'L4issa': process.env.LAISSA_BUSINESS_ID || '',
  'kevinkarmo': process.env.KEVIN_BUSINESS_ID || '',
  'renatinhaap_': process.env.RENATINHA_BUSINESS_ID || '',
  'lfcerq': process.env.LUIZ_BUSINESS_ID || '',
  'suaneff': process.env.SUANE_BUSINESS_ID || '',
  'wallace.rn': process.env.WALLACE_BUSINESS_ID || '',
  'ygoralbuu': process.env.YGOR_BUSINESS_ID || '',
  'rone_lima': process.env.RONE_BUSINESS_ID || '',
  'jefersonsantos._': process.env.JEFERSON_BUSINESS_ID || '',
  'africanique': process.env.AFRICANIQUE_BUSINESS_ID || '',
  'thiagovitt': process.env.THIAGO_BUSINESS_ID || '',
};

// Cache simples em memória
const cache = new Map<string, { data: any; timestamp: number }>();
const CACHE_DURATION = 60 * 60 * 1000; // 1 hora

// Função para testar o token
async function testAccessToken(): Promise<boolean> {
  try {
    const response = await fetch(
      `https://graph.facebook.com/v18.0/me?access_token=${ACCESS_TOKEN}`
    );
    return response.ok;
  } catch {
    return false;
  }
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ username: string }> }
) {
  try {
    const { username } = await params;

    // Verificar cache
    const cached = cache.get(username);
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      return NextResponse.json(cached.data);
    }

    // Verificar se o token é válido
    const isTokenValid = await testAccessToken();
    if (!isTokenValid) {
      console.error('❌ Token de acesso inválido ou expirado');
      return NextResponse.json(
        { 
          error: 'Token inválido',
          message: 'O token de acesso do Instagram está inválido ou expirado. Gere um novo token.',
          username,
          posts: [],
          debug: {
            token: ACCESS_TOKEN ? `${ACCESS_TOKEN.substring(0, 10)}...` : 'Não configurado',
            tokenValid: false
          }
        },
        { status: 401 }
      );
    }

    // Verificar Business Account ID
    const businessAccountId = BUSINESS_ACCOUNT_IDS[username];
    
    if (!businessAccountId) {
      console.warn(`⚠️ Business Account ID não configurado para @${username}`);
      return NextResponse.json(
        { 
          error: 'Business Account ID não configurado',
          message: `Configure o Business Account ID para @${username} no arquivo .env.local`,
          username,
          posts: [],
          debug: {
            token: ACCESS_TOKEN ? `${ACCESS_TOKEN.substring(0, 10)}...` : 'Não configurado',
            tokenValid: true,
            businessAccountId: false,
            availableUsernames: Object.keys(BUSINESS_ACCOUNT_IDS)
          }
        },
        { status: 404 }
      );
    }

    // Tentar buscar do Instagram Graph API
    try {
      console.log(`🔍 Buscando posts do Instagram para @${username} (ID: ${businessAccountId})`);
      
      const response = await fetch(
        `${INSTAGRAM_GRAPH_API}/${businessAccountId}/media?fields=id,caption,media_type,media_url,permalink,timestamp,like_count,comments_count&limit=12&access_token=${ACCESS_TOKEN}`,
        { 
          next: { revalidate: 3600 },
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );

      if (response.ok) {
        const data = await response.json();
        
        if (data.data && data.data.length > 0) {
          const result = {
            username,
            posts: data.data,
            isMock: false,
            debug: {
              businessAccountId,
              postsCount: data.data.length,
              source: 'Instagram Graph API'
            }
          };

          // Armazenar no cache
          cache.set(username, { data: result, timestamp: Date.now() });
          
          console.log(`✅ ${data.data.length} posts carregados do Instagram para @${username}`);
          return NextResponse.json(result);
        } else {
          console.warn(`⚠️ Nenhum post encontrado para @${username}`);
          return NextResponse.json(
            { 
              error: 'Nenhum post encontrado',
              message: `@${username} não possui posts públicos ou a conta não está configurada corretamente`,
              username,
              posts: [],
              debug: {
                businessAccountId,
                apiResponse: data
              }
            },
            { status:404 }
          );
        }
      } else {
        const errorData = await response.json();
        console.error(`❌ Erro da API do Instagram para @${username}:`, errorData);
        
        return NextResponse.json(
          { 
            error: 'Erro da API do Instagram',
            message: errorData.error?.message || 'Erro desconhecido da API do Instagram',
            username,
            posts: [],
            debug: {
              businessAccountId,
              statusCode: response.status,
              apiError: errorData
            }
          },
          { status: response.status }
        );
      }
    } catch (apiError) {
      console.error(`❌ Erro ao chamar Instagram Graph API para @${username}:`, apiError);
      return NextResponse.json(
        { 
          error: 'Erro de conexão',
          message: 'Erro ao conectar com a API do Instagram',
          username,
          posts: [],
          debug: {
            businessAccountId,
            error: apiError instanceof Error ? apiError.message : 'Erro desconhecido'
          }
        },
        { status: 503 }
      );
    }

  } catch (error) {
    console.error('❌ Erro geral ao buscar posts do Instagram:', error);
    return NextResponse.json(
      { 
        error: 'Erro interno',
        message: 'Erro interno do servidor',
        debug: {
          error: error instanceof Error ? error.message : 'Erro desconhecido'
        }
      },
      { status: 500 }
    );
  }
}
