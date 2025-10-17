'use client';

import { useRef } from 'react';
import { motion, useTransform, useScroll } from 'framer-motion';
import Image from 'next/image';
import { Blogger } from '../types';
import InstagramStats from './InstagramStats';
import GlitchText from './GlitchText';

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

  // Definir efeito de glitch único para cada blogger
  const getGlitchType = (index: number): 'vhs' | 'cassette' | 'neon' | 'retro' | 'cyber' | 'analog' => {
    const effects: Array<'vhs' | 'cassette' | 'neon' | 'retro' | 'cyber' | 'analog'> = [
      'vhs', 'cassette', 'neon', 'retro', 'cyber', 'analog'
    ];
    return effects[index % effects.length];
  };

  // Cores personalizadas para glitch baseadas na paleta do blogger
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

  const quotes = [
    "Minha moda é minha voz, cada look é uma palavra que escolho falar ao mundo.",
    "Estilo não é sobre seguir tendências, é sobre criar sua própria história.",
    "Cada roupa que visto carrega um pedaço da minha alma e da minha cidade.",
    "Salvador pulsa em cada escolha, cada cor, cada textura que abraço.",
    "Moda é arte em movimento, e eu sou tanto a tela quanto o pincel."
  ];

  const quote = quotes[index % quotes.length];

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
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <GlitchText
                text={blogger.name}
                primaryColor={blogger.colorPalette.primary}
                secondaryColor={glitchColors.secondary}
                glitchType={getGlitchType(index)}
                className="text-6xl lg:text-8xl xl:text-9xl font-black leading-none tracking-tight mb-4"
              />
            </motion.div>
            
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

            <motion.p 
              className="text-2xl lg:text-3xl text-gray-700 leading-relaxed font-light"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.7 }}
              viewport={{ once: true }}
            >
              {blogger.description}
            </motion.p>

            <motion.blockquote 
              className="relative text-xl lg:text-2xl italic font-medium leading-relaxed pl-8 border-l-4"
              style={{ 
                borderColor: blogger.colorPalette.secondary,
                color: blogger.colorPalette.primary 
              }}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.9 }}
              viewport={{ once: true }}
            >
              <span className="text-4xl absolute -top-2 -left-2 opacity-30">"</span>
              {quote}
              <span className="text-4xl absolute -bottom-6 -right-2 opacity-30">"</span>
            </motion.blockquote>

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

            {/* Instagram Stats */}
            {blogger.instagram && (
              <motion.div
                className="mt-8"
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
