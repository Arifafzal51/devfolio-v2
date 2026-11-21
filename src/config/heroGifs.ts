export interface HeroGifItem {
  id: string;
  name: string;
  theme: string;
  tagline: string;
  src: string;
  iconName: "Laptop" | "Shapes" | "Palette" | "Disc3" | "Brain" | "Sparkles" | "Compass";
}

export const HERO_GIFS: HeroGifItem[] = [
  {
    id: "tech",
    name: "Tech & Code",
    theme: "tech",
    tagline: "Software architecture & matrix flows",
    src: "/assets/hero-gifs/tech.gif",
    iconName: "Laptop",
  },
  {
    id: "minimalism",
    name: "Minimalism",
    theme: "minimalism",
    tagline: "Pure geometry & kinetic rhythm",
    src: "/assets/hero-gifs/minimalism.gif",
    iconName: "Shapes",
  },
  {
    id: "modern-art",
    name: "Modern Art",
    theme: "modern-art",
    tagline: "Fluid contemporary motion",
    src: "/assets/hero-gifs/modern-art.gif",
    iconName: "Palette",
  },
  {
    id: "music",
    name: "Song & Music",
    theme: "song",
    tagline: "Vinyl vibrations & sonic waves",
    src: "/assets/hero-gifs/music.gif",
    iconName: "Disc3",
  },
  {
    id: "psychology",
    name: "Human Psychology",
    theme: "psychology",
    tagline: "Consciousness, mind & neural networks",
    src: "/assets/hero-gifs/psychology.gif",
    iconName: "Brain",
  },
  {
    id: "perfumes",
    name: "Perfumes",
    theme: "perfumes",
    tagline: "Essence Royale luxury mist & aura",
    src: "/assets/hero-gifs/perfume.gif",
    iconName: "Sparkles",
  },
  {
    id: "travel",
    name: "Travel & Explore",
    theme: "travel",
    tagline: "Endless horizons & wanderlust journeys",
    src: "/assets/hero-gifs/travel.gif",
    iconName: "Compass",
  },
];
