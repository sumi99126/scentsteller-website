import React from 'react';
import { Reveal } from './Reveal';
import './AboutSection.css';

export const AboutSection: React.FC = () => {
  return (
    <section className="about-stellar-section" id="about">
      <div className="about-stellar-container">
        {/* ====================================================================
            LEFT: Asymmetric Luxury 3-Image Collage (Staggered Fade-in from Left)
            ==================================================================== */}
        <div className="about-collage-wrap">
          {/* Left Stack: Grasse Centifolia Harvest + Lifestyle Fragrance Muse */}
          <div className="collage-left-stack">
            {/* Card 1: Hand-Harvested Centifolia Roses & Flacon */}
            <Reveal direction="left" distance={36} duration={0.9} delay={0} zoomScale={0.96}>
              <div className="collage-card card-wood-bottle">
                <img
                  src="/about-stellar-rose.jpg"
                  alt="Grasse Centifolia Rose Harvest and Artisanal Scent Stellar Flacon"
                  className="collage-img"
                  loading="lazy"
                />
              </div>
            </Reveal>

            {/* Card 2: Lifestyle Muse with Silk Slip Gown (Overlapping) */}
            <Reveal direction="left" distance={36} duration={0.9} delay={0.16} zoomScale={0.96}>
              <div className="collage-card card-woman-portrait">
                <img
                  src="/about-stellar-muse.jpg"
                  alt="Sensory Application of Scent Stellar Haute Parfumerie"
                  className="collage-img"
                  loading="lazy"
                />
              </div>
            </Reveal>
          </div>

          {/* Right Stack: Golden Crystal Masterpiece Flacon on Draped Silk */}
          <div className="collage-right-stack">
            {/* Card 3: Luminous Golden Amber Flacon in Morning Sunlight */}
            <Reveal direction="left" distance={36} duration={0.9} delay={0.32} zoomScale={0.96}>
              <div className="collage-card card-golden-flacon">
                <img
                  src="/about-stellar-crystal.jpg"
                  alt="Scent Stellar Golden Amber Extrait De Parfum Crystal Flacon"
                  className="collage-img"
                  loading="lazy"
                />
              </div>
            </Reveal>
          </div>
        </div>

        {/* ====================================================================
            RIGHT: Editorial Narrative & Brand Philosophy (Fade-in from Right)
            ==================================================================== */}
        <div className="about-narrative-col">
          <Reveal direction="right" distance={40} duration={1.0} delay={0.15}>
            <span className="about-eyebrow">ABOUT SCENTS STELLAR</span>

            <h2 className="about-editorial-title">
              Artistry in Every Note, <br />
              <span className="about-italic-highlight">Crafted for Eternity</span>
            </h2>

            <p className="about-editorial-text">
              <strong>Rooted in the legacy of Grasse and Paris</strong>, Scent Stellar
              harmonizes rare botanical absolutes, noble woods, and radiant amber.
              Each creation is a bespoke extrait — crafted to leave an unforgettable,
              effortless signature.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
