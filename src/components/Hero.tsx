import React, { useState, useEffect } from 'react';
import { ArrowRight, Star } from 'lucide-react';
import { Reveal } from './Reveal';
import './Hero.css';

export interface FragranceProduct {
  id: string;
  index: string;
  name: string;
  volume: string;
  accords: string;
  subtitle: string;
  description: string;
  bottleImg: string;
  accentColor: string;
  auraGradient: string;
  bgGradient: string;
}

export const FRAGRANCES: FragranceProduct[] = [
  {
    id: 'flora',
    index: '01',
    name: 'Flora',
    volume: '100 ML • EDP',
    accords: 'Blushing Rose & Peony',
    subtitle: 'Centifolia Rose • Velvet Peony • Pink Pepper',
    description:
      'Grasse centifolia roses, velvet peony, and pink pepper crafted for effortless elegance.',
    bottleImg: '/bottle-flora.png',
    accentColor: '#c75168',
    bgGradient: 'linear-gradient(135deg, #FAF1ED 0%, #F8E6EA 42%, #F3D7DE 100%)',
    auraGradient:
      'radial-gradient(ellipse at 66% 38%, rgba(235, 140, 160, 0.42) 0%, rgba(248, 210, 220, 0.22) 50%, transparent 75%), radial-gradient(ellipse at 25% 15%, rgba(245, 185, 195, 0.3) 0%, transparent 60%)',
  },
  {
    id: 'ash',
    index: '02',
    name: 'Ash',
    volume: '100 ML • EDP',
    accords: 'Charred Wood & Amber',
    subtitle: 'Smoky Cedarwood • Bourbon • Dark Amber',
    description:
      'A nocturnal fusion of charred birchwood, bourbon, and dark amber crafted for a lasting impression.',
    bottleImg: '/bottle-ash.png',
    accentColor: '#b8863b',
    bgGradient: 'linear-gradient(135deg, #FAF4EB 0%, #F5E8D6 42%, #EBD5BC 100%)',
    auraGradient:
      'radial-gradient(ellipse at 66% 38%, rgba(215, 155, 75, 0.4) 0%, rgba(185, 130, 60, 0.2) 50%, transparent 75%), radial-gradient(ellipse at 25% 15%, rgba(225, 175, 110, 0.28) 0%, transparent 60%)',
  },
  {
    id: 'bloom',
    index: '03',
    name: 'Bloom',
    volume: '100 ML • EDP',
    accords: 'Exotic Orchid & Nectar',
    subtitle: 'Nocturnal Orchid • Honey Nectar • Sandalwood',
    description:
      'Nocturnal orchids laced with honey nectar and warm sandalwood for moments of pure distinction.',
    bottleImg: '/bottle-bloom.png',
    accentColor: '#ae4d6f',
    bgGradient: 'linear-gradient(135deg, #FAF1EE 0%, #F6E3DB 42%, #EDCCBF 100%)',
    auraGradient:
      'radial-gradient(ellipse at 66% 38%, rgba(205, 125, 155, 0.42) 0%, rgba(245, 195, 170, 0.22) 50%, transparent 75%), radial-gradient(ellipse at 25% 15%, rgba(235, 155, 175, 0.28) 0%, transparent 60%)',
  },
];

interface HeroProps {
  selectedIdx?: number;
  onSelectFragrance?: (idx: number) => void;
}

export const Hero: React.FC<HeroProps> = ({
  selectedIdx: controlledIdx,
  onSelectFragrance,
}) => {
  const [internalIdx, setInternalIdx] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  const selectedIdx = controlledIdx !== undefined ? controlledIdx : internalIdx;
  const setIndex = onSelectFragrance || setInternalIdx;

  // Auto-rotate fragrances smoothly every 4.5 seconds
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setIndex((selectedIdx + 1) % FRAGRANCES.length);
    }, 4500);

    return () => clearInterval(interval);
  }, [isPaused, selectedIdx, setIndex]);

  const current = FRAGRANCES[selectedIdx];

  return (
    <section
      className={`hero-showcase-section theme-${current.id}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="hero-showcase-container">
        {/* ====================================================================
            LEFT COLUMN: Staggered Fade-in from Left (0.15s stagger)
            ==================================================================== */}
        <div className="hero-editorial-col">
          {/* Subtle Prestige Tag (Clean Text, No Icon) */}
          <Reveal direction="left" distance={40} duration={1.0} delay={0}>
            <div className="brand-prestige-badge">
              <span>MAISON DE PARFUM • PARIS & GRASSE</span>
            </div>
          </Reveal>

          {/* Simple Brand-Aligned Luxury Headline */}
          <Reveal direction="left" distance={40} duration={1.0} delay={0.15}>
            <h1 className="hero-editorial-title">
              Luxury Fragrance, <br />
              <span className="title-highlight" style={{ color: current.accentColor }}>
                Crafted For You.
              </span>
            </h1>
          </Reveal>

          {/* Clean Short Text */}
          <Reveal direction="left" distance={40} duration={1.0} delay={0.30}>
            <p className="hero-clean-description">
              {current.description}
            </p>
          </Reveal>

          {/* 2 Sleek Luxury Action Buttons */}
          <Reveal direction="left" distance={40} duration={1.0} delay={0.45}>
            <div className="hero-btn-group">
              <button className="btn-luxury-discover" aria-label="Discover Collection">
                <span>Discover Collection</span>
                <ArrowRight size={16} className="btn-arrow-icon" />
              </button>

              <button className="btn-luxury-contact" aria-label="Contact Us">
                <span>Contact Us</span>
              </button>
            </div>
          </Reveal>

          {/* Subtle Luxury Social Proof Note */}
          <Reveal direction="left" distance={40} duration={1.0} delay={0.60}>
            <div className="hero-rating-note">
              <div className="rating-stars-row">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={13} fill="#b89058" color="#b89058" />
                ))}
              </div>
              <span className="rating-text">4.9/5 Rating by 2,800+ Connoisseurs</span>
            </div>
          </Reveal>
        </div>

        {/* ====================================================================
            RIGHT COLUMN: Main Bottle from Bottom (delay 0.2s) + Staggered Thumbs
            ==================================================================== */}
        <div className="hero-stage-col">
          {/* Central Bottle Presentation Container */}
          <div className="stage-bottle-center">
            {/* Ultra-Light Frosted Glass Effect Arch Backdrop */}
            <div className="stage-luxury-arch" />

            {/* Luminous Ambient Halo Glow */}
            <div
              key={`aura-${current.id}`}
              className="stage-halo-light"
              style={{
                background: `radial-gradient(circle, ${current.accentColor}36 0%, ${current.accentColor}12 50%, transparent 72%)`,
              }}
            />

            {/* Bottle Container with Natural Glass Contact Shadow: Fade in from bottom */}
            <Reveal direction="up" distance={60} duration={1.0} delay={0.20} className="w-full">
              <div className="bottle-presentation-box" key={`flacon-${current.id}`}>
                <img
                  src={current.bottleImg}
                  alt={`Scent Stellar ${current.name} Eau De Parfum`}
                  className="stage-active-bottle"
                />

                {/* Natural, Realistic Soft Studio Ground Shadows */}
                <div className="natural-bottle-shadow" />
                <div className="natural-ambient-shadow" />
              </div>
            </Reveal>
          </div>

          {/* Vertical Fragrance List: Staggered from bottom (0.1s apart after main bottle) */}
          <div className="vertical-perfume-list" role="tablist" aria-label="Fragrance Selection">
            {FRAGRANCES.map((frag, idx) => {
              const isActive = idx === selectedIdx;
              return (
                <Reveal
                  key={frag.id}
                  direction="up"
                  distance={30}
                  duration={0.7}
                  delay={0.40 + idx * 0.1}
                >
                  <button
                    type="button"
                    className={`v-perfume-item ${isActive ? 'active' : ''}`}
                    onClick={() => setIndex(idx)}
                    aria-selected={isActive}
                    role="tab"
                    title={`Select ${frag.name}`}
                  >
                    <div className="v-item-bottle-wrap">
                      <img
                        src={frag.bottleImg}
                        alt={frag.name}
                        className="v-item-bottle-img"
                      />
                    </div>
                    <span className="v-item-bottle-name">{frag.name}</span>
                    {isActive && (
                      <span
                        className="v-item-active-dot"
                        style={{ background: frag.accentColor }}
                      />
                    )}
                  </button>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
