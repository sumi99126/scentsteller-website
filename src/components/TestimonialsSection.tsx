import React, { useState, useEffect, useRef } from 'react';
import { Quote, Star } from 'lucide-react';
import { Reveal } from './Reveal';
import './TestimonialsSection.css';

interface TestimonialItem {
  id: string;
  quote: string;
  author: string;
  handle: string;
  role: string;
  avatar: string;
}

const TESTIMONIALS: TestimonialItem[] = [
  {
    id: 'guy-hawkins',
    quote:
      'Impressed by the craftsmanship and attention to detail. Flora lasts effortlessly from day to night with unmatched royal elegance.',
    author: 'Guy Hawkins',
    handle: '@guyhawkins',
    role: 'Verified Collector',
    avatar: '/avatar-guy.jpg',
  },
  {
    id: 'karla-lynn',
    quote:
      'A seamless luxury experience from start to finish. Zentus is by far the richest oud and bergamot blend I have ever owned. Highly recommend!',
    author: 'Karla Lynn',
    handle: '@karlalynn98',
    role: 'Fragrance Connoisseur',
    avatar: '/avatar-karla.jpg',
  },
  {
    id: 'jane-cooper',
    quote:
      'Reliable, mesmerizing, and truly regal. Ash Doré garners compliments everywhere I go. Made finding my signature scent effortless!',
    author: 'Jane Cooper',
    handle: '@janecooper',
    role: 'Patron of Elegance',
    avatar: '/avatar-jane.jpg',
  },
  {
    id: 'elena-rostova',
    quote:
      'An unforgettable sensory experience. Celestial is pure perfection in a flacon, fresh yet intensely magnetic with lingering sillage.',
    author: 'Elena Rostova',
    handle: '@elenarostova',
    role: 'Perfume Enthusiast',
    avatar: '/avatar-elena.jpg',
  },
  {
    id: 'marcus-vance',
    quote:
      'The projection and longevity are extraordinary. True artisanal perfumery that commands admiration and presence in any room.',
    author: 'Marcus Vance',
    handle: '@marcusvance',
    role: 'Luxury Fragrance Critic',
    avatar: '/avatar-marcus.jpg',
  },
];

// Tripled list to enable continuous seamless looping without gaps
const EXTENDED_TESTIMONIALS = [
  ...TESTIMONIALS,
  ...TESTIMONIALS,
  ...TESTIMONIALS,
];

export const TestimonialsSection: React.FC = () => {
  // Start in the middle set for seamless bi-directional infinite loop
  const [trackIndex, setTrackIndex] = useState(TESTIMONIALS.length);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);

  // Exact responsive card width calculation so exactly 3 cards display in 1 row on desktop
  const [cardWidth, setCardWidth] = useState<number>(0);
  const [cardGap, setCardGap] = useState<number>(28);

  const activeDotIndex = trackIndex % TESTIMONIALS.length;

  useEffect(() => {
    const updateSize = () => {
      if (!viewportRef.current) return;
      const totalWidth = viewportRef.current.clientWidth;
      if (totalWidth <= 0) return;

      let visible = 3;
      let gap = 28;

      if (window.innerWidth <= 720) {
        visible = 1;
        gap = 16;
      } else if (window.innerWidth <= 1060) {
        visible = 2;
        gap = 22;
      }

      setCardGap(gap);
      const computed = (totalWidth - (visible - 1) * gap) / visible;
      setCardWidth(Math.floor(computed));
    };

    updateSize();

    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined' && viewportRef.current) {
      ro = new ResizeObserver(() => updateSize());
      ro.observe(viewportRef.current);
    }

    window.addEventListener('resize', updateSize);
    return () => {
      if (ro) ro.disconnect();
      window.removeEventListener('resize', updateSize);
    };
  }, []);

  // Auto-advance loop every 3.5 seconds
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      handleNext();
    }, 3500);

    return () => clearInterval(interval);
  }, [isPaused, trackIndex]);

  const handleNext = () => {
    setIsTransitioning(true);
    setTrackIndex((prev) => prev + 1);
  };

  // Seamless snap-back when reaching the edges of the duplicated buffer
  const handleTransitionEnd = () => {
    if (trackIndex >= TESTIMONIALS.length * 2) {
      setIsTransitioning(false);
      setTrackIndex(TESTIMONIALS.length);
    } else if (trackIndex < TESTIMONIALS.length) {
      setIsTransitioning(false);
      setTrackIndex(TESTIMONIALS.length * 2 - 1);
    }
  };

  const jumpToSlide = (index: number) => {
    setIsTransitioning(true);
    setTrackIndex(TESTIMONIALS.length + index);
  };

  return (
    <section className="testimonials-section" id="testimonials">
      {/* Soft light-pink ambient auras */}
      <div className="testimonials-ambient-glow" aria-hidden="true" />
      <div className="testimonials-ambient-glow-secondary" aria-hidden="true" />

      <div className="testimonials-container">
        {/* ====================================================================
            HEADER: Eyebrow Badge & Heading with Pink Italic Highlight
            ==================================================================== */}
        <Reveal direction="up" duration={0.8} distance={30} amount={0.2}>
          <header className="testimonials-header">
            <span className="testimonials-badge">TESTIMONIALS</span>
            <h2 className="testimonials-title">
              Transformative <span className="testimonials-pink-italic">Client Experiences</span>
            </h2>
          </header>
        </Reveal>

        {/* ====================================================================
            CAROUSEL WRAPPER WITH CONTINUOUS INFINITE SLIDING LOOP (3 CARDS PER ROW)
            ==================================================================== */}
        <Reveal
          direction="up"
          duration={0.9}
          distance={35}
          zoomScale={0.97}
          delay={0.15}
          amount={0.15}
          className="testimonials-reveal-wrapper"
          style={{ width: '100%' }}
        >
          <div
            className="testimonials-carousel-wrapper"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Viewport for Sliding Window */}
            <div ref={viewportRef} className="testimonials-viewport">
              <div
                ref={trackRef}
                className="testimonials-track"
                style={{
                  transform: cardWidth > 0
                    ? `translateX(-${trackIndex * (cardWidth + cardGap)}px)`
                    : `translateX(calc(-${trackIndex} * (var(--card-width) + var(--card-gap))))`,
                  gap: cardWidth > 0 ? `${cardGap}px` : undefined,
                  transition: isTransitioning
                    ? 'transform 0.65s cubic-bezier(0.16, 1, 0.3, 1)'
                    : 'none',
                }}
                onTransitionEnd={handleTransitionEnd}
              >
                {EXTENDED_TESTIMONIALS.map((item, index) => {
                  const isCenterCard = index === trackIndex + 1;
                  return (
                    <article
                      key={`${item.id}-${index}`}
                      className={`testimonial-card ${isCenterCard ? 'card-featured' : ''}`}
                      style={cardWidth > 0 ? {
                        width: `${cardWidth}px`,
                        flex: `0 0 ${cardWidth}px`,
                        minWidth: `${cardWidth}px`,
                        maxWidth: `${cardWidth}px`,
                      } : undefined}
                      onClick={() => {
                        setIsTransitioning(true);
                        setTrackIndex(index - 1);
                      }}
                    >
                      {/* Card Main Quote Body */}
                      <div className="testimonial-card-body">
                        {/* Oversized Quote Icon */}
                        <div className="testimonial-quote-icon-wrap" aria-hidden="true">
                          <Quote size={26} className="testimonial-quote-icon" />
                        </div>

                        {/* 5-Star Rating */}
                        <div className="testimonial-stars" aria-label="5 out of 5 stars">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} size={14} className="star-icon-filled" />
                          ))}
                        </div>

                        {/* Quote Text */}
                        <p className="testimonial-quote-text">"{item.quote}"</p>
                      </div>

                      {/* Unique Notched Bottom Shelf for Author Identity (Seamless, No Cut Line) */}
                      <div className="testimonial-author-notch">
                        <div className="author-notch-inner">
                          <img
                            src={item.avatar}
                            alt={item.author}
                            className="author-avatar-img"
                            loading="lazy"
                          />
                          <div className="author-text-meta">
                            <h3 className="author-name">{item.author}</h3>
                            <span className="author-handle">{item.handle}</span>
                          </div>
                        </div>
                        {/* Concave fillet curve filler */}
                        <div className="notch-corner-fillet" aria-hidden="true" />
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>
        </Reveal>

        {/* ====================================================================
            CAROUSEL PAGINATION INDICATOR (5 Dots matching 5 Reviews)
            ==================================================================== */}
        <Reveal direction="up" duration={0.6} distance={15} delay={0.3} amount={0.2}>
          <div className="testimonials-pagination" role="tablist" aria-label="Review Navigation">
            {TESTIMONIALS.map((item, index) => (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={activeDotIndex === index}
                aria-label={`Go to review ${index + 1} - ${item.author}`}
                className={`pagination-dot ${activeDotIndex === index ? 'active' : ''}`}
                onClick={() => jumpToSlide(index)}
              />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
};
