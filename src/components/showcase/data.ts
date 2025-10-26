import { Blogger } from './types';
import { getAssetPath } from '@/utils/paths';

export const bloggersData: Blogger[] = [
  {
    id: 0,
    name: "Africanique",
    category: "Afrofuturism",
    featured: "Fashion Revolution",
    image: getAssetPath("/africanique.jpg"),
    active: true
  },
  {
    id: 1,
    name: "Deivisson",
    category: "Street Style",
    featured: "Urban Vibes",
    image: getAssetPath("/deivisson1.jpg")
  },
  {
    id: 2,
    name: "Laissa",
    category: "Minimalism",
    featured: "Clean Aesthetics",
    image: getAssetPath("/laissa.jpg")
  },
  {
    id: 3,
    name: "Kevin",
    category: "Editorial",
    featured: "High Fashion",
    image: getAssetPath("/kevin.jpg")
  },
  {
    id: 4,
    name: "Renatinha",
    category: "Vintage",
    featured: "Retro Dreams",
    image: getAssetPath("/renatinha.jpg")
  },
  {
    id: 5,
    name: "Thiago Vitt",
    category: "Avant-garde",
    featured: "Art Direction",
    image: getAssetPath("/thiagovitt.jpg")
  },
  {
    id: 6,
    name: "Suane",
    category: "Chic Style",
    featured: "Elegance Redefined",
    image: getAssetPath("/suane.jpg")
  },
  {
    id: 7,
    name: "Luiz Felipe",
    category: "Contemporary",
    featured: "Modern Edge",
    image: getAssetPath("/luizfelipe.jpg")
  },
  {
    id: 8,
    name: "Wallace",
    category: "Urban Energy",
    featured: "Vibrant Looks",
    image: getAssetPath("/wall.jpg")
  },
  {
    id: 9,
    name: "Ygor",
    category: "Bold Fashion",
    featured: "Creative Expression",
    image: getAssetPath("/ygor.jpg")
  },
  {
    id: 10,
    name: "Rone",
    category: "Unique Style",
    featured: "Distinctive Look",
    image: getAssetPath("/rone.jpg")
  },
  {
    id: 11,
    name: "Jeferson",
    category: "Creative Vision",
    featured: "Unlimited Style",
    image: getAssetPath("/jef.jpg")
  },
  {
    id: 12,
    name: "Jonathan Silva",
    category: "Street Style",
    featured: "Urban Authenticity",
    image: getAssetPath("/jn.jpg")
  },
  {
    id: 13,
    name: "Matheus Santos",
    category: "Sophisticated",
    featured: "Modern Elegance",
    image: getAssetPath("/math1.jpg")
  },
  {
    id: 14,
    name: "Ed Kruz",
    category: "Contemporary Urban",
    featured: "Modern Streetwear",
    image: getAssetPath("/ed1.jpg")
  }
];