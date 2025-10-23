'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Heart, MessageCircle, ExternalLink } from 'lucide-react';

interface InstagramPost {
  id: string;
  caption: string;
  media_type: string;
  media_url: string;
  permalink: string;
  timestamp: string;
  like_count?: number;
  comments_count?: number;
}

interface InstagramFeedResponse {
  username: string;
  posts: InstagramPost[];
  isMock?: boolean;
}

interface InstagramFeedProps {
  username?: string;
  primaryColor: string;
  secondaryColor: string;
  maxPosts?: number;
}

export default function InstagramFeed({ 
  username, 
  primaryColor, 
  secondaryColor,
  maxPosts = 6 
}: InstagramFeedProps) {
  const [posts, setPosts] = useState<InstagramPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isMock, setIsMock] = useState(false);

  useEffect(() => {
    if (!username) {
      setLoading(false);
      return;
    }

    const fetchInstagramPosts = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/instagram/${username}`);
        
        if (!response.ok) {
          // Silently fail and show mock posts
          setError('API não disponível');
          return;
        }
        const data: InstagramFeedResponse = await response.json();
        setPosts(data.posts.slice(0, maxPosts));
        setIsMock(data.isMock || false);
        setError(null);
      } catch (err) {
        // Silently fail and show mock posts
        setError('API não disponível');
      } finally {
        setLoading(false);
      }
    };

    fetchInstagramPosts();
  }, [username, maxPosts]);

  if (!username) {
    return null;
  }

  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {[...Array(maxPosts)].map((_, i) => (
          <motion.div
            key={i}
            className="aspect-square rounded-2xl overflow-hidden"
            style={{ 
              background: `linear-gradient(135deg, ${primaryColor}20, ${secondaryColor}20)` 
            }}
            animate={{
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: i * 0.1
            }}
          />
        ))}
      </div>
    );
  }

  if (error) {
    // Mock data com posts cinematográficos
    const mockPosts = [
      {
        id: 'mock1',
        caption: 'Estilo único em cada detalhe ✨',
        media_type: 'IMAGE',
        media_url: '',
        permalink: `https://instagram.com/${username}`,
        timestamp: new Date().toISOString(),
        like_count: Math.floor(Math.random() * 5000) + 1000,
        comments_count: Math.floor(Math.random() * 500) + 50,
      },
      {
        id: 'mock2',
        caption: 'Criando tendências, inspirando pessoas 🔥',
        media_type: 'IMAGE',
        media_url: '',
        permalink: `https://instagram.com/${username}`,
        timestamp: new Date().toISOString(),
        like_count: Math.floor(Math.random() * 5000) + 1000,
        comments_count: Math.floor(Math.random() * 500) + 50,
      },
      {
        id: 'mock3',
        caption: 'Autenticidade é o nosso poder 💫',
        media_type: 'IMAGE',
        media_url: '',
        permalink: `https://instagram.com/${username}`,
        timestamp: new Date().toISOString(),
        like_count: Math.floor(Math.random() * 5000) + 1000,
        comments_count: Math.floor(Math.random() * 500) + 50,
      },
    ];

    return (
      <div className="space-y-6">
        <motion.div
          className="flex items-center justify-between"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 
            className="text-3xl font-bold"
            style={{ color: primaryColor }}
          >
            📸 Últimos Posts
            <span className="ml-3 text-xs px-3 py-1 rounded-full bg-amber-100 text-amber-700 font-normal">
              Preview Mode
            </span>
          </h3>
          <a
            href={`https://instagram.com/${username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="relative flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all hover:scale-105 overflow-hidden group shine-button"
            style={{
              background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
              color: 'white'
            }}
          >
            {/* Force refresh - Animated Border Effect */}
            <div className="absolute inset-0 rounded-xl overflow-hidden">
              <div 
                className="absolute top-0 left-0 w-full h-0.5 animate-slide-right"
                style={{ 
                  background: `linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent)`
                }}
              />
              <div 
                className="absolute top-0 right-0 w-0.5 h-full animate-slide-down"
                style={{ 
                  background: `linear-gradient(180deg, transparent, rgba(255,255,255,0.8), transparent)`,
                  animationDelay: '0.25s'
                }}
              />
              <div 
                className="absolute bottom-0 right-0 w-full h-0.5 animate-slide-left"
                style={{ 
                  background: `linear-gradient(270deg, transparent, rgba(255,255,255,0.8), transparent)`,
                  animationDelay: '0.5s'
                }}
              />
              <div 
                className="absolute bottom-0 left-0 w-0.5 h-full animate-slide-up"
                style={{ 
                  background: `linear-gradient(360deg, transparent, rgba(255,255,255,0.8), transparent)`,
                  animationDelay: '0.75s'
                }}
              />
            </div>

            {/* Shine Effect */}
            <div 
              className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: 'linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.3) 50%, transparent 70%)',
                animation: 'shine 2s ease-in-out infinite'
              }}
            />

            <span className="relative z-10">Ver perfil</span>
            <ExternalLink className="w-4 h-4 relative z-10" />
          </a>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {mockPosts.map((post, index) => (
            <motion.a
              key={post.id}
              href={post.permalink}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square rounded-2xl overflow-hidden cursor-pointer cinematic-card"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.1,
                type: "spring"
              }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              style={{
                background: `linear-gradient(135deg, ${primaryColor}40, ${secondaryColor}40, ${primaryColor}20)`,
                position: 'relative'
              }}
            >
              {/* Animated Border Effect */}
              <div className="absolute inset-0 rounded-2xl overflow-hidden">
                <div 
                  className="absolute top-0 left-0 w-full h-1 animate-slide-right"
                  style={{ 
                    background: `linear-gradient(90deg, transparent, ${primaryColor}, transparent)`,
                    animationDelay: `${index * 0.2}s`
                  }}
                />
                <div 
                  className="absolute top-0 right-0 w-1 h-full animate-slide-down"
                  style={{ 
                    background: `linear-gradient(180deg, transparent, ${secondaryColor}, transparent)`,
                    animationDelay: `${index * 0.2 + 0.25}s`
                  }}
                />
                <div 
                  className="absolute bottom-0 right-0 w-full h-1 animate-slide-left"
                  style={{ 
                    background: `linear-gradient(270deg, transparent, ${primaryColor}, transparent)`,
                    animationDelay: `${index * 0.2 + 0.5}s`
                  }}
                />
                <div 
                  className="absolute bottom-0 left-0 w-1 h-full animate-slide-up"
                  style={{ 
                    background: `linear-gradient(360deg, transparent, ${secondaryColor}, transparent)`,
                    animationDelay: `${index * 0.2 + 0.75}s`
                  }}
                />
              </div>

              {/* Gradient Background with Animation */}
              <div 
                className="absolute inset-2 rounded-xl animate-pulse-glow"
                style={{
                  background: `radial-gradient(circle at ${30 + index * 20}% ${40 + index * 15}%, ${primaryColor}60, ${secondaryColor}30, transparent 70%)`,
                  filter: 'blur(0.5px)'
                }}
              />

              {/* Content */}
              <div className="relative w-full h-full flex flex-col items-center justify-center p-4 text-center z-10">
                <motion.div
                  className="text-white space-y-3"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                >
                  <div className="flex items-center justify-center gap-2">
                    <Heart className="w-6 h-6 fill-white" />
                    <span className="text-xl font-bold">
                      {post.like_count?.toLocaleString('pt-BR')}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-center gap-2">
                    <MessageCircle className="w-6 h-6" />
                    <span className="text-xl font-bold">
                      {post.comments_count?.toLocaleString('pt-BR')}
                    </span>
                  </div>

                  <p className="text-sm mt-2 font-medium">
                    {post.caption}
                  </p>
                </motion.div>
              </div>

              {/* Hover Glow Effect */}
              <motion.div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: `linear-gradient(135deg, ${primaryColor}20, ${secondaryColor}20)`,
                  boxShadow: `0 0 30px ${primaryColor}40, 0 0 60px ${secondaryColor}20`
                }}
                whileHover={{
                  boxShadow: `0 0 40px ${primaryColor}60, 0 0 80px ${secondaryColor}40`
                }}
              />
            </motion.a>
          ))}
        </div>

        <style jsx>{`
          @keyframes slide-right {
            0% { transform: translateX(-100%); }
            50%, 100% { transform: translateX(100%); }
          }
          @keyframes slide-down {
            0% { transform: translateY(-100%); }
            50%, 100% { transform: translateY(100%); }
          }
          @keyframes slide-left {
            0% { transform: translateX(100%); }
            50%, 100% { transform: translateX(-100%); }
          }
          @keyframes slide-up {
            0% { transform: translateY(100%); }
            50%, 100% { transform: translateY(-100%); }
          }
          @keyframes pulse-glow {
            0%, 100% { opacity: 0.7; }
            50% { opacity: 1; }
          }
          @keyframes shine {
            0% { transform: translateX(-100%) rotate(45deg); }
            100% { transform: translateX(100%) rotate(45deg); }
          }
          .animate-slide-right { animation: slide-right 2s linear infinite; }
          .animate-slide-down { animation: slide-down 2s linear infinite; }
          .animate-slide-left { animation: slide-left 2s linear infinite; }
          .animate-slide-up { animation: slide-up 2s linear infinite; }
          .animate-pulse-glow { animation: pulse-glow 3s ease-in-out infinite; }
        `}</style>
      </div>
    );
  }

  if (posts.length === 0) {
    return null;
  }

  return (
    <div className="space-y-6">
      <motion.div
        className="flex items-center justify-between"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h3 
          className="text-3xl font-bold"
          style={{ color: primaryColor }}
        >
          📸 Últimos Posts
          {isMock && (
            <span className="ml-3 text-xs px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 font-normal">
              Demo Mode
            </span>
          )}
        </h3>
        <a
          href={`https://instagram.com/${username}`}
          target="_blank"
          rel="noopener noreferrer"
          className="relative flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all hover:scale-105 overflow-hidden group shine-button"
          style={{
            background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
            color: 'white'
          }}
        >
          {/* Animated Border Effect */}
          <div className="absolute inset-0 rounded-xl overflow-hidden">
            <div 
              className="absolute top-0 left-0 w-full h-0.5 animate-slide-right"
              style={{ 
                background: `linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent)`
              }}
            />
            <div 
              className="absolute top-0 right-0 w-0.5 h-full animate-slide-down"
              style={{ 
                background: `linear-gradient(180deg, transparent, rgba(255,255,255,0.8), transparent)`,
                animationDelay: '0.25s'
              }}
            />
            <div 
              className="absolute bottom-0 right-0 w-full h-0.5 animate-slide-left"
              style={{ 
                background: `linear-gradient(270deg, transparent, rgba(255,255,255,0.8), transparent)`,
                animationDelay: '0.5s'
              }}
            />
            <div 
              className="absolute bottom-0 left-0 w-0.5 h-full animate-slide-up"
              style={{ 
                background: `linear-gradient(360deg, transparent, rgba(255,255,255,0.8), transparent)`,
                animationDelay: '0.75s'
              }}
            />
          </div>

          {/* Shine Effect */}
          <div 
            className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background: 'linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.3) 50%, transparent 70%)',
              animation: 'shine 2s ease-in-out infinite'
            }}
          />

          <span className="relative z-10">Ver perfil</span>
          <ExternalLink className="w-4 h-4 relative z-10" />
        </a>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {posts.map((post, index) => (
          <motion.a
            key={post.id}
            href={post.permalink}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative aspect-square rounded-2xl overflow-hidden cursor-pointer"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ 
              duration: 0.5, 
              delay: index * 0.1,
              type: "spring"
            }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
          >
            {/* Imagem do post */}
            <div className="relative w-full h-full">
              <Image
                src={post.media_url}
                alt={post.caption?.substring(0, 100) || 'Instagram post'}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>

            {/* Overlay com informações */}
            <motion.div
              className="absolute inset-0 flex flex-col items-center justify-center p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: `linear-gradient(135deg, ${primaryColor}E6, ${secondaryColor}E6)`
              }}
            >
              <div className="text-white space-y-3 text-center">
                {post.like_count !== undefined && (
                  <div className="flex items-center justify-center gap-2">
                    <Heart className="w-6 h-6 fill-white" />
                    <span className="text-xl font-bold">
                      {post.like_count.toLocaleString('pt-BR')}
                    </span>
                  </div>
                )}
                
                {post.comments_count !== undefined && (
                  <div className="flex items-center justify-center gap-2">
                    <MessageCircle className="w-6 h-6" />
                    <span className="text-xl font-bold">
                      {post.comments_count.toLocaleString('pt-BR')}
                    </span>
                  </div>
                )}

                {post.caption && (
                  <p className="text-sm line-clamp-3 mt-2">
                    {post.caption}
                  </p>
                )}
              </div>
            </motion.div>

            {/* Border animado */}
            <motion.div
              className="absolute inset-0 rounded-2xl border-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ borderColor: primaryColor }}
            />
          </motion.a>
        ))}
      </div>
    </div>
  );
}
