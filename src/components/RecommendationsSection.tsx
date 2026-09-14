import React, { useState } from 'react';
import { ShoppingBag } from 'lucide-react';
import { Reveal } from './Reveal';
import './RecommendationsSection.css';

export interface RecommendationProduct {
  id: string;
  name: string;
  category: 'floral' | 'woody' | 'oriental';
  categoryLabel: string;
  notes: string;
  pricePKR: string;
  bottleImg: string;
}

export const RECOMMENDATIONS: RecommendationProduct[] = [
  {
    id: 'celestial',
    name: 'CELESTIAL',
    category: 'floral',
    categoryLabel: 'Floral & Fresh',
    notes: 'Violet Orchid • Dark Plum • Amber',
    pricePKR: 'Rs. 3,850',
    bottleImg: '/bottle-celestial.png',
  },
  {
    id: 'zentus',
    name: 'ZENTUS',
    category: 'oriental',
    categoryLabel: 'Oriental & Amber',
    notes: 'Emerald Bergamot • Golden Oud • Vetiver',
    pricePKR: 'Rs. 4,450',
    bottleImg: '/bottle-zentus.png',
  },
  {
    id: 'chrome',
    name: 'CHROME',
    category: 'woody',
    categoryLabel: 'Woody & Leather',
    notes: 'Metallic Iris • Silver Cedar • White Musk',
    pricePKR: 'Rs. 3,950',
    bottleImg: '/bottle-chrome.png',
  },
  {
    id: 'vivenza',
    name: 'VIVENZA',
    category: 'woody',
    categoryLabel: 'Woody & Leather',
    notes: 'Warm Amber • Bourbon Leather • Tonka',
    pricePKR: 'Rs. 4,250',
    bottleImg: '/bottle-vivenza.png',
  },
  {
    id: 'flora',
    name: 'FLORA ÉTERNELLE',
    category: 'floral',
    categoryLabel: 'Floral & Fresh',
    notes: 'Grasse Rose • Velvet Peony • Pink Pepper',
    pricePKR: 'Rs. 3,850',
    bottleImg: '/bottle-flora.png',
  },
  {
    id: 'ash',
    name: 'ASH NOCTURNE',
    category: 'woody',
    categoryLabel: 'Woody & Leather',
    notes: 'Charred Cedar • Bourbon • Dark Amber',
    pricePKR: 'Rs. 4,250',
    bottleImg: '/bottle-ash.png',
  },
  {
    id: 'celestial-oud',
    name: 'CELESTIAL OUD',
    category: 'woody',
    categoryLabel: 'Woody & Leather',
    notes: 'Smoky Agarwood • Saffron • Bulgarian Rose',
    pricePKR: 'Rs. 4,750',
    bottleImg: '/bottle-celestial.png',
  },
  {
    id: 'zentus-imperial',
    name: 'ZENTUS IMPÉRIAL',
    category: 'woody',
    categoryLabel: 'Woody & Leather',
    notes: 'Haitian Vetiver • Black Iris • Noble Leather',
    pricePKR: 'Rs. 4,500',
    bottleImg: '/bottle-zentus.png',
  },
  {
    id: 'soleil',
    name: 'SOLEIL BLANC',
    category: 'floral',
    categoryLabel: 'Floral & Fresh',
    notes: 'Calabrian Bergamot • Neroli • White Musk',
    pricePKR: 'Rs. 3,950',
    bottleImg: '/bottle-flora.png',
  },
  {
    id: 'cuir',
    name: 'CUIR MAJESTÉ',
    category: 'woody',
    categoryLabel: 'Woody & Leather',
    notes: 'Cognac Accord • Birch Tar • Golden Suede',
    pricePKR: 'Rs. 4,600',
    bottleImg: '/bottle-ash.png',
  },
  {
    id: 'ambre',
    name: 'AMBRE STELLAR',
    category: 'oriental',
    categoryLabel: 'Oriental & Amber',
    notes: 'Rare Labdanum • Bourbon Vanilla • Taif Rose',
    pricePKR: 'Rs. 4,400',
    bottleImg: '/bottle-celestial.png',
  },
  {
    id: 'bloom',
    name: 'BLOOM NECTAR',
    category: 'oriental',
    categoryLabel: 'Oriental & Amber',
    notes: 'Nocturnal Orchid • Wild Honey • Sandalwood',
    pricePKR: 'Rs. 4,750',
    bottleImg: '/bottle-bloom.png',
  },
];

type FilterCategory = 'all' | 'floral' | 'woody' | 'oriental';

interface FilterTab {
  key: FilterCategory;
  label: string;
}

const FILTER_TABS: FilterTab[] = [
  { key: 'all', label: 'All Creations (8)' },
  { key: 'floral', label: 'Floral & Fresh' },
  { key: 'woody', label: 'Woody & Leather' },
  { key: 'oriental', label: 'Oriental & Amber' },
];

interface RecommendationsSectionProps {
  onAddToCart?: (product: RecommendationProduct) => void;
}

export const RecommendationsSection: React.FC<RecommendationsSectionProps> = ({ onAddToCart }) => {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('all');

  const filteredProducts =
    activeFilter === 'all'
      ? RECOMMENDATIONS
      : RECOMMENDATIONS.filter((item) => item.category === activeFilter);

  return (
    <section className="rec-section" id="recommendations">
      <div className="rec-container">
        {/* ====================================================================
            HEADER: Eyebrow + Title + Staggered Filter Pills
            ==================================================================== */}
        <div className="rec-header-row">
          <Reveal direction="up" distance={30} duration={0.85}>
            <div className="rec-title-col">
              <span className="rec-eyebrow">CURATED FOR ROYALTY</span>
              <h2 className="rec-section-heading">
                <span className="rec-heading-line">Our recommendation for</span>
                <span className="rec-personality-italic">your personality</span>
              </h2>
            </div>
          </Reveal>

          {/* Filter Pills: quick fade + slight scale on mount, staggered 0.05s */}
          <div className="rec-filter-pills" role="tablist">
            {FILTER_TABS.map((tab, idx) => {
              const isActive = activeFilter === tab.key;
              return (
                <Reveal
                  key={tab.key}
                  direction="zoom"
                  zoomScale={0.92}
                  distance={0}
                  duration={0.5}
                  delay={idx * 0.05}
                >
                  <button
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    className={`rec-filter-btn ${isActive ? 'active' : ''}`}
                    onClick={() => setActiveFilter(tab.key)}
                  >
                    {tab.label}
                  </button>
                </Reveal>
              );
            })}
          </div>
        </div>

        {/* ====================================================================
            CARDS GRID: 8 Product Cards staggered by row then column (0.12s)
            ==================================================================== */}
        <div className="rec-cards-grid">
          {filteredProducts.map((product, idx) => (
            <Reveal
              key={product.id}
              direction="up"
              distance={30}
              duration={0.8}
              delay={(idx % 4) * 0.12}
            >
              <article className="lumiere-card">
                {/* Warm Studio Image Area with Surface Shadow */}
                <div className="lumiere-img-box">
                  <div className="lumiere-bottle-wrap">
                    <img
                      src={product.bottleImg}
                      alt={product.name}
                      className="lumiere-bottle-img"
                      loading="lazy"
                    />
                    {/* Realistic horizontal surface shadow matching reference */}
                    <div className="lumiere-ground-shadow" />
                  </div>
                </div>

                {/* Product Info Section */}
                <div className="lumiere-info-box">
                  <h3 className="lumiere-product-name">{product.name}</h3>
                  <p className="lumiere-product-notes">{product.notes}</p>

                  <div className="lumiere-price-row">
                    <span className="lumiere-price">{product.pricePKR}</span>
                    <button
                      type="button"
                      className="lumiere-plus-btn"
                      title="Add to Bag"
                      aria-label={`Add ${product.name} to Bag`}
                      onClick={() => onAddToCart && onAddToCart(product)}
                    >
                      <ShoppingBag size={13} strokeWidth={2.2} />
                    </button>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
