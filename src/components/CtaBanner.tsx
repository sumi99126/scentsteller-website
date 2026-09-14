import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Reveal } from './Reveal';
import './CtaBanner.css';

interface CtaBannerProps {
  onExploreClick?: () => void;
}

export const CtaBanner: React.FC<CtaBannerProps> = ({ onExploreClick }) => {
  const handleScrollToCollection = () => {
    if (onExploreClick) {
      onExploreClick();
      return;
    }
    const collectionSection = document.getElementById('collection') || document.getElementById('recommendations');
    if (collectionSection) {
      collectionSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="cta-banner-section" aria-label="Haute Collection Showcase">
      <div className="cta-banner-container">
        {/* Sleek Minimal Luxury Card */}
        <div className="cta-banner-card">
          {/* Subtle Ambient Light Overlay */}
          <div className="cta-overlay-gradient" />

          {/* Left Column: Refined Typography & Action - Fade from left */}
          <div className="cta-content-col">
            <Reveal direction="left" distance={40} duration={0.9} amount={0.2}>
              <h2 className="cta-heading">
                DISCOVER THE FRAGRANCE THAT <br />
                <span className="cta-highlight-pink">DEFINES YOUR PRESENCE</span>
              </h2>

              <p className="cta-subheading">
                Micro-batched extraits crafted with noble Cambodian oudh, pure Taif roses, and rare amber.
              </p>

              <button
                type="button"
                className="cta-action-btn"
                onClick={handleScrollToCollection}
                aria-label="Explore Collection"
              >
                <span>EXPLORE COLLECTION</span>
                <ArrowRight size={15} className="cta-btn-arrow" />
              </button>
            </Reveal>
          </div>

          {/* Right Showcase: Sleek Flacon Trio (Celestial, Flora, Zentus) - Fade up staggered */}
          <div className="cta-flacons-stage" aria-hidden="true">
            {/* Left Bottle: Celestial */}
            <div className="cta-bottle-wrap bottle-celestial-wrap">
              <Reveal direction="up" distance={35} duration={0.85} delay={0.15} amount={0.15}>
                <img
                  src="/bottle-celestial.png"
                  alt="Scent Stellar Celestial"
                  className="cta-bottle-img celestial-bottle"
                  loading="lazy"
                />
                <div className="cta-bottle-shadow" />
              </Reveal>
            </div>

            {/* Center Master Bottle: Flora */}
            <div className="cta-bottle-wrap bottle-flora-wrap">
              <Reveal direction="up" distance={45} duration={0.9} delay={0.3} amount={0.15}>
                <img
                  src="/bottle-flora.png"
                  alt="Scent Stellar Flora"
                  className="cta-bottle-img flora-bottle"
                  loading="lazy"
                />
                <div className="cta-bottle-shadow master-shadow" />
                <div className="cta-bottle-glow" />
              </Reveal>
            </div>

            {/* Right Bottle: Zentus */}
            <div className="cta-bottle-wrap bottle-zentus-wrap">
              <Reveal direction="up" distance={35} duration={0.85} delay={0.45} amount={0.15}>
                <img
                  src="/bottle-zentus.png"
                  alt="Scent Stellar Zentus"
                  className="cta-bottle-img zentus-bottle"
                  loading="lazy"
                />
                <div className="cta-bottle-shadow" />
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
