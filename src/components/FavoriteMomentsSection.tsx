import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Reveal } from './Reveal';
import './FavoriteMomentsSection.css';

interface MomentCardData {
  id: string;
  image: string;
  alt: string;
  description: string;
}

const LEFT_MOMENTS: MomentCardData[] = [
  {
    id: 'celestial-day',
    image: '/moment-celestial.jpg',
    alt: 'Scent Stellar Celestial Flacon in Paris Morning Sunlight',
    description:
      'Crisp, radiant floral notes crafted for effortless everyday confidence.',
  },
  {
    id: 'ash-night',
    image: '/moment-ash.jpg',
    alt: 'Scent Stellar Ash Flacon with Golden Mist in Candlelight',
    description:
      'Deep, smoky woods and golden amber crafted for the night.',
  },
];

const CENTER_MOMENT: MomentCardData = {
  id: 'zentus-hero',
  image: '/moment-zentus.jpg',
  alt: 'Scent Stellar Zentus Flacon Spritzing Golden Fragrance Mist in Luxury Hall',
  description:
    'Refined noble oudh and bergamot to elevate your presence.',
};

const RIGHT_MOMENTS: MomentCardData[] = [
  {
    id: 'flora-rose',
    image: '/moment-flora.jpg',
    alt: 'Scent Stellar Flora Flacon Spritzing Rose Mist Overlooking Eiffel Tower',
    description:
      'Grasse centifolia roses and pink pepper for radiant elegance.',
  },
  {
    id: 'chrome-aquatic',
    image: '/moment-chrome.jpg',
    alt: 'Scent Stellar Chrome Flacon with Fresh Radiant Mist',
    description:
      'Fresh silver cedar and cool aquatic notes with modern sillage.',
  },
];

export const FavoriteMomentsSection: React.FC = () => {
  return (
    <section className="moments-section" id="favorite-fragrances">
      <div className="moments-container">
        {/* ====================================================================
            SECTION HEADER: Pill Badge & Heading with Pink Italic Highlight
            ==================================================================== */}
        <Reveal direction="up" duration={0.8} distance={30} amount={0.2}>
          <header className="moments-header">
            <span className="moments-badge">FAVORITE FRAGRANCES</span>
            <h2 className="moments-title">
              Refined Scents <span className="moments-pink-italic">for Every Moment</span>
            </h2>
            <p className="moments-subtitle">
              Curated olfactory journeys crafted to evoke unforgettable impressions.
            </p>
          </header>
        </Reveal>

        {/* ====================================================================
            5-CARD BENTO GRID (Left 2 Stacked + Center 1 Tall Hero + Right 2 Stacked)
            ==================================================================== */}
        <div className="moments-bento-grid">
          {/* Left Column: 2 Stacked Cards */}
          <div className="moments-col moments-left-col">
            <Reveal direction="up" duration={0.7} distance={25} zoomScale={1.03} delay={0.08} amount={0.15}>
              <article className="moment-card">
                <img
                  src={LEFT_MOMENTS[0].image}
                  alt={LEFT_MOMENTS[0].alt}
                  className="moment-card-img"
                  loading="lazy"
                />
                <div className="moment-card-overlay" />
                <div className="moment-card-content">
                  <p className="moment-card-desc">{LEFT_MOMENTS[0].description}</p>
                  <button
                    className="moment-arrow-btn"
                    aria-label={`Explore ${LEFT_MOMENTS[0].id}`}
                    title="Explore Fragrance"
                  >
                    <ArrowRight size={14} />
                  </button>
                </div>
              </article>
            </Reveal>

            <Reveal direction="up" duration={0.7} distance={25} zoomScale={1.03} delay={0.32} amount={0.15}>
              <article className="moment-card">
                <img
                  src={LEFT_MOMENTS[1].image}
                  alt={LEFT_MOMENTS[1].alt}
                  className="moment-card-img"
                  loading="lazy"
                />
                <div className="moment-card-overlay" />
                <div className="moment-card-content">
                  <p className="moment-card-desc">{LEFT_MOMENTS[1].description}</p>
                  <button
                    className="moment-arrow-btn"
                    aria-label={`Explore ${LEFT_MOMENTS[1].id}`}
                    title="Explore Fragrance"
                  >
                    <ArrowRight size={14} />
                  </button>
                </div>
              </article>
            </Reveal>
          </div>

          {/* Center Column: 1 Tall Hero Card */}
          <div className="moments-col moments-center-col">
            <Reveal
              direction="up"
              duration={0.75}
              distance={25}
              zoomScale={1.03}
              delay={0.18}
              amount={0.15}
              className="center-hero-reveal"
            >
              <article className="moment-card center-hero-card">
                <img
                  src={CENTER_MOMENT.image}
                  alt={CENTER_MOMENT.alt}
                  className="moment-card-img"
                  loading="lazy"
                />
                <div className="moment-card-overlay center-overlay" />
                <div className="moment-card-content">
                  <p className="moment-card-desc hero-desc">
                    {CENTER_MOMENT.description}
                  </p>
                  <button
                    className="moment-arrow-btn"
                    aria-label="Explore Zentus Hero"
                    title="Explore Fragrance"
                  >
                    <ArrowRight size={14} />
                  </button>
                </div>
              </article>
            </Reveal>
          </div>

          {/* Right Column: 2 Stacked Cards */}
          <div className="moments-col moments-right-col">
            <Reveal direction="up" duration={0.7} distance={25} zoomScale={1.03} delay={0.24} amount={0.15}>
              <article className="moment-card">
                <img
                  src={RIGHT_MOMENTS[0].image}
                  alt={RIGHT_MOMENTS[0].alt}
                  className="moment-card-img"
                  loading="lazy"
                />
                <div className="moment-card-overlay" />
                <div className="moment-card-content">
                  <p className="moment-card-desc">{RIGHT_MOMENTS[0].description}</p>
                  <button
                    className="moment-arrow-btn"
                    aria-label={`Explore ${RIGHT_MOMENTS[0].id}`}
                    title="Explore Fragrance"
                  >
                    <ArrowRight size={14} />
                  </button>
                </div>
              </article>
            </Reveal>

            <Reveal direction="up" duration={0.7} distance={25} zoomScale={1.03} delay={0.42} amount={0.15}>
              <article className="moment-card">
                <img
                  src={RIGHT_MOMENTS[1].image}
                  alt={RIGHT_MOMENTS[1].alt}
                  className="moment-card-img"
                  loading="lazy"
                />
                <div className="moment-card-overlay" />
                <div className="moment-card-content">
                  <p className="moment-card-desc">{RIGHT_MOMENTS[1].description}</p>
                  <button
                    className="moment-arrow-btn"
                    aria-label={`Explore ${RIGHT_MOMENTS[1].id}`}
                    title="Explore Fragrance"
                  >
                    <ArrowRight size={14} />
                  </button>
                </div>
              </article>
            </Reveal>
          </div>
        </div>

        {/* ====================================================================
            BOTTOM CTA BUTTON: Discover Collection
            ==================================================================== */}
        <Reveal direction="up" duration={0.8} distance={20} delay={0.55} amount={0.2}>
          <div className="moments-footer-cta">
            <a href="#recommendations" className="moments-discover-btn">
              <span>Discover Collection</span>
              <ArrowRight size={15} className="discover-arrow-icon" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
