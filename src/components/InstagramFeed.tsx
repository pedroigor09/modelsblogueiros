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
          throw new Error('Erro ao buscar posts do Instagram');
        }
        const data: InstagramFeedResponse = await response.json();
        setPosts(data.posts.slice(0, maxPosts));
        setIsMock(data.isMock || false);
        setError(null);
      } catch (err) {
        console.error('Erro ao carregar feed do Instagram:', err);
        setError('Não foi possível carregar o feed');
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
    return (
      <div 
        className="p-8 rounded-2xl text-center"
        style={{ 
          background: `linear-gradient(135deg, ${primaryColor}10, ${secondaryColor}10)`,
          borderLeft: `4px solid ${primaryColor}`
        }}
      >
        <p className="text-gray-600">{error}</p>
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
          className="flex items-center gap-2 px-4 py-2 rounded-full font-semibold transition-all hover:scale-105"
          style={{
            background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
            color: 'white'
          }}
        >
          Ver perfil
          <ExternalLink className="w-4 h-4" />
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
