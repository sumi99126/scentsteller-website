import React from 'react';
import { ArrowRight } from 'lucide-react';
import './PromotionalBanners.css';

export const PromotionalBanners: React.FC = () => {
  return (
    <section className="promo-banners-section" id="curated-gifting">
      <div className="promo-banners-container">
        {/* ====================================================================
            BANNER 1 (DARK THEME): Discovery Sets
            ==================================================================== */}
        <article className="promo-banner-card dark-theme">
          <div className="banner-content-col">
            <span className="banner-eyebrow dark">DISCOVERY SETS</span>
            <h3 className="banner-heading dark">
              Find your <br />
              signature scent.
            </h3>
            <p className="banner-desc dark">
              Curated flacons crafted to inspire your unique presence.
            </p>
            <a href="#recommendations" className="banner-cta-btn dark">
              <span>SHOP DISCOVERY SETS</span>
              <ArrowRight size={13} className="banner-arrow-icon" />
            </a>
          </div>

          <div className="banner-visual-col dark">
            <img
              src="/banner-dark-studio.jpg"
              alt="Scent Stellar Luxury Flacons on Illuminated Dark Studio Stage"
              className="banner-bg-img"
              loading="lazy"
            />
            {/* Ambient Backlight Glow for the Discovery Trio */}
            <div className="banner-trio-glow" />

            {/* Curated 3-Bottle Discovery Trio on the Illuminated Stage */}
            <div className="banner-bottles-trio">
              {/* Left Bottle: Zentus (Emerald & Gold) */}
              <div className="trio-bottle-item left-bottle">
                <img
                  src="/bottle-zentus.png"
                  alt="Scent Stellar Zentus Flacon"
                  className="trio-bottle-img"
                  loading="lazy"
                />
                <div className="trio-bottle-shadow" />
              </div>

              {/* Center Hero Bottle: Celestial (Purple & Gold) */}
              <div className="trio-bottle-item center-bottle">
                <img
                  src="/bottle-celestial.png"
                  alt="Scent Stellar Celestial Flacon"
                  className="trio-bottle-img hero-img"
                  loading="lazy"
                />
                <div className="trio-bottle-shadow hero-shadow" />
              </div>

              {/* Right Bottle: Chrome (Silver & Cyan) */}
              <div className="trio-bottle-item right-bottle">
                <img
                  src="/bottle-chrome.png"
                  alt="Scent Stellar Chrome Flacon"
                  className="trio-bottle-img"
                  loading="lazy"
                />
                <div className="trio-bottle-shadow" />
              </div>
            </div>
          </div>
        </article>

        {/* ====================================================================
            BANNER 2 (WARM BEIGE THEME): The Art of Gifting
            ==================================================================== */}
        <article className="promo-banner-card beige-theme">
          <div className="banner-content-col">
            <span className="banner-eyebrow beige">THE ART OF GIFTING</span>
            <h3 className="banner-heading beige">
              Gifts that <br />
              speak elegance.
            </h3>
            <p className="banner-desc beige">
              Handcrafted flacons, beautifully boxed for every occasion.
            </p>
            <a href="#recommendations" className="banner-cta-btn beige">
              <span>SHOP GIFT SETS</span>
              <ArrowRight size={13} className="banner-arrow-icon" />
            </a>
          </div>

          <div className="banner-visual-col beige">
            <img
              src="/banner-gift-box.jpg"
              alt="Scent Stellar Luxury Wrapped Gift Box"
              className="banner-bg-img"
              loading="lazy"
            />
            {/* Real Scent Stellar Bottle Standing Next to the Gift Box */}
            <div className="banner-bottle-float beige">
              <img
                src="/bottle-chrome.png"
                alt="Scent Stellar Chrome Flacon"
                className="banner-real-bottle beige"
                loading="lazy"
              />
              <div className="banner-bottle-shadow beige" />
            </div>
          </div>
        </article>
      </div>
    </section>
  );
};
