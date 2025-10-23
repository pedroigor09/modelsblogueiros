'use client';

import { useRef } from 'react';
import { motion, useTransform, useScroll } from 'framer-motion';
import Image from 'next/image';
import { MapPin, TrendingUp } from 'lucide-react';
import { Blogger } from '../types';
import InstagramStats from './InstagramStats';
import GlitchText from './GlitchText';
import InstagramFeed from './InstagramFeed';
import { ShineBadge } from './ShineBadge';

interface VibeGalleryProps {
  blogger: Blogger;
  isActive: boolean;
  onClick: () => void;
  index: number;
}

export default function VibeGallery({ blogger, index }: VibeGalleryProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -200]);

  const isEven = index % 2 === 0;

  const getGlitchType = (index: number): 'vhs' | 'cassette' | 'neon' | 'retro' | 'cyber' | 'analog' => {
    const effects: Array<'vhs' | 'cassette' | 'neon' | 'retro' | 'cyber' | 'analog'> = [
      'vhs', 'cassette', 'neon', 'retro', 'cyber', 'analog'
    ];
    return effects[index % effects.length];
  };

  const getGlitchColors = () => {
    const colors = [
      { primary: '#ff0080', secondary: '#00ffff' }, // Neon Pink/Cyan
      { primary: '#ff4000', secondary: '#00ff80' }, // Orange/Green
      { primary: '#8000ff', secondary: '#ffff00' }, // Purple/Yellow
      { primary: '#ff0040', secondary: '#40ff00' }, // Red/Lime
      { primary: '#0080ff', secondary: '#ff8000' }, // Blue/Orange
      { primary: '#ff00ff', secondary: '#00ff00' }, // Magenta/Green
    ];
    return colors[index % colors.length];
  };

  const glitchColors = getGlitchColors();

  return (
    <motion.section
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden py-24"
      style={{ 
        background: `linear-gradient(135deg, ${blogger.colorPalette.primary}08, ${blogger.colorPalette.secondary}05, white)`
      }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      viewport={{ once: true }}
    >
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center ${!isEven ? 'lg:grid-flow-col-dense' : ''}`}>
          
          <motion.div 
            className={`space-y-8 ${!isEven ? 'lg:col-start-2' : ''}`}
            initial={{ opacity: 0, x: isEven ? -100 : 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, delay: 0.3 }}
            viewport={{ once: true }}
          >
            {/* Nome com Badge e Verificação */}
            <div className="relative">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <GlitchText
                  text={blogger.name}
                  primaryColor={blogger.nameColor || blogger.colorPalette.primary}
                  secondaryColor={glitchColors.secondary}
                  glitchType={getGlitchType(index)}
                  className="text-6xl lg:text-8xl xl:text-9xl font-black leading-none tracking-tight mb-4"
                />
              </motion.div>
              
              {/* Badges e Verificação */}
              <div className="flex items-center gap-3 mt-4 flex-wrap">
                {blogger.verified && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5, type: "spring" }}
                  >
                    <ShineBadge 
                      type="verified" 
                      size="md"
                    />
                  </motion.div>
                )}
                
                {blogger.badge && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.7, type: "spring" }}
                  >
                    <ShineBadge 
                      type="badge" 
                      text={blogger.badge} 
                      size="md"
                    />
                  </motion.div>
                )}
                
                {/* Badge especial para specialties únicas */}
                {blogger.specialty && ['Minimalismo sofisticado'].includes(blogger.specialty) && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.9, type: "spring" }}
                  >
                    <ShineBadge 
                      type="badge" 
                      text={blogger.specialty} 
                      size="sm"
                    />
                  </motion.div>
                )}
              </div>
            </div>
            
            {/* Linha decorativa com estilo */}
            <motion.div 
              className="h-2 rounded-full mb-8"
              style={{ 
                background: `linear-gradient(90deg, ${blogger.colorPalette.primary}, ${blogger.colorPalette.secondary}, ${blogger.colorPalette.tertiary})`
              }}
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              transition={{ duration: 1.5, delay: 0.8 }}
              viewport={{ once: true }}
            />

            {/* Estilo/Nicho */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <ShineBadge 
                type="style" 
                text={blogger.style} 
                size="md"
              />
            </motion.div>

            <motion.p 
              className="text-2xl lg:text-3xl text-gray-700 leading-relaxed font-light"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.7 }}
              viewport={{ once: true }}
            >
              {blogger.description}
            </motion.p>

            {/* Quote - usando a quote do blogger */}
            <motion.blockquote 
              className="relative text-xl lg:text-2xl italic font-medium leading-relaxed pl-8 border-l-4"
              style={{ 
                borderColor: blogger.colorPalette.secondary,
                color: blogger.quoteColor ? 'transparent' : (blogger.nameColor || blogger.colorPalette.primary),
                background: blogger.quoteColor ? blogger.quoteColor : 'transparent',
                WebkitBackgroundClip: blogger.quoteColor ? 'text' : 'initial',
                backgroundClip: blogger.quoteColor ? 'text' : 'initial'
              }}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.9 }}
              viewport={{ once: true }}
            >
              <span className="text-4xl absolute -top-2 -left-2 opacity-30">"</span>
              {blogger.quote}
              <span className="text-4xl absolute -bottom-6 -right-2 opacity-30">"</span>
            </motion.blockquote>

            {/* Localização e Especialidade */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.0 }}
              viewport={{ once: true }}
            >
              {blogger.location && (
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="w-5 h-5" style={{ color: blogger.colorPalette.primary }} />
                  <span className="font-medium">{blogger.location}</span>
                </div>
              )}
              
              {blogger.specialty && (
                <div className="flex items-center gap-2 text-gray-600">
                  <div className="w-5 h-5 rounded-full" style={{ backgroundColor: blogger.colorPalette.secondary }} />
                  <span className="font-medium">{blogger.specialty}</span>
                </div>
              )}
            </motion.div>

            {/* Paleta de cores */}
            <motion.div 
              className="flex items-center space-x-6"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 1.1 }}
              viewport={{ once: true }}
            >
              <span className="text-lg font-semibold text-gray-600">Paleta:</span>
              {[blogger.colorPalette.primary, blogger.colorPalette.secondary, blogger.colorPalette.tertiary].map((color, i) => (
                <motion.div
                  key={i}
                  className="w-16 h-16 rounded-full shadow-xl cursor-pointer border-4 border-white"
                  style={{ backgroundColor: color }}
                  whileHover={{ 
                    scale: 1.3, 
                    y: -10,
                    boxShadow: `0 20px 40px ${color}60`,
                    rotate: 360
                  }}
                  transition={{ duration: 0.4 }}
                />
              ))}
            </motion.div>

            {/* Instagram Stats com Engajamento */}
            {blogger.instagram && (
              <motion.div
                className="mt-8 space-y-3"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1.3 }}
                viewport={{ once: true }}
              >
                <InstagramStats 
                  followers={blogger.instagram.followers} 
                  primaryColor={blogger.colorPalette.primary}
                  delay={index * 200}
                />
                
                {blogger.instagram.engagement && (
                  <motion.div
                    className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 1.5 }}
                    viewport={{ once: true }}
                  >
                    <TrendingUp className="w-6 h-6 text-green-600" />
                    <div>
                      <p className="text-sm text-gray-600 font-medium">Taxa de Engajamento</p>
                      <p className="text-2xl font-bold text-green-600">{blogger.instagram.engagement}%</p>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )}

            {/* Feed do Instagram */}
            {blogger.instagram?.username && (
              <motion.div
                className="mt-12"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1.7 }}
                viewport={{ once: true }}
              >
                <InstagramFeed
                  username={blogger.instagram.username}
                  primaryColor={blogger.colorPalette.primary}
                  secondaryColor={blogger.colorPalette.secondary}
                  maxPosts={6}
                />
              </motion.div>
            )}
          </motion.div>

          <motion.div 
            className={`${!isEven ? 'lg:col-start-1 lg:row-start-1' : ''}`}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="grid grid-cols-2 gap-6 lg:gap-8">
              <motion.div
                className="col-span-2 relative aspect-[16/10] rounded-3xl overflow-hidden group"
                style={{ y: y1 }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.5 }}
              >
                <Image
                  src={blogger.gallery[0]}
                  alt={`${blogger.name} - Principal`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  priority
                />
                <motion.div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `linear-gradient(45deg, ${blogger.colorPalette.primary}40, transparent 70%)`
                  }}
                />
              </motion.div>

              <motion.div
                className="relative aspect-square rounded-3xl overflow-hidden group"
                style={{ y: y2 }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.5 }}
              >
                <Image
                  src={blogger.gallery[1]}
                  alt={`${blogger.name} - Look 1`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <motion.div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `linear-gradient(135deg, ${blogger.colorPalette.secondary}40, transparent 70%)`
                  }}
                />
              </motion.div>

              <motion.div
                className="relative aspect-square rounded-3xl overflow-hidden group"
                style={{ y: y3 }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.5 }}
              >
                <Image
                  src={blogger.gallery[2]}
                  alt={`${blogger.name} - Look 2`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <motion.div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `linear-gradient(225deg, ${blogger.colorPalette.tertiary}40, transparent 70%)`
                  }}
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
