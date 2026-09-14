import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ShoppingBag, Search, SlidersHorizontal, ArrowLeft, RotateCcw, Sparkles } from 'lucide-react';
import { RECOMMENDATIONS } from './RecommendationsSection';
import type { RecommendationProduct } from './RecommendationsSection';
import { Reveal, LUXURY_EASE } from './Reveal';
import './CollectionPage.css';

interface CollectionPageProps {
  onAddToCart: (product: RecommendationProduct) => void;
  onBackHome: () => void;
}

type CategoryType = 'all' | 'floral' | 'woody' | 'oriental';
type PriceRangeType = 'all' | 'under4000' | '4000to4500' | 'above4500';
type SortType = 'featured' | 'price-asc' | 'price-desc' | 'name';

const POPULAR_NOTES = ['Rose', 'Oud', 'Amber', 'Bergamot', 'Vetiver', 'Iris', 'Plum', 'Honey'];

export const CollectionPage: React.FC<CollectionPageProps> = ({ onAddToCart, onBackHome }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('all');
  const [selectedPriceRange, setSelectedPriceRange] = useState<PriceRangeType>('all');
  const [selectedNote, setSelectedNote] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<SortType>('featured');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const shouldReduceMotion = useReducedMotion();

  // Helper to extract numeric price
  const parsePrice = (priceStr: string): number => {
    return parseInt(priceStr.replace(/[^0-9]/g, ''), 10) || 0;
  };

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return RECOMMENDATIONS.filter((product) => {
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(q);
        const matchesNotes = product.notes.toLowerCase().includes(q);
        if (!matchesName && !matchesNotes) return false;
      }

      // Category
      if (selectedCategory !== 'all' && product.category !== selectedCategory) {
        return false;
      }

      // Price Range
      const p = parsePrice(product.pricePKR);
      if (selectedPriceRange === 'under4000' && p >= 4000) return false;
      if (selectedPriceRange === '4000to4500' && (p < 4000 || p > 4500)) return false;
      if (selectedPriceRange === 'above4500' && p <= 4500) return false;

      // Note
      if (selectedNote) {
        if (!product.notes.toLowerCase().includes(selectedNote.toLowerCase())) return false;
      }

      return true;
    }).sort((a, b) => {
      const priceA = parsePrice(a.pricePKR);
      const priceB = parsePrice(b.pricePKR);

      if (sortBy === 'price-asc') return priceA - priceB;
      if (sortBy === 'price-desc') return priceB - priceA;
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return 0; // 'featured' keeps default
    });
  }, [searchQuery, selectedCategory, selectedPriceRange, selectedNote, sortBy]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedPriceRange('all');
    setSelectedNote(null);
    setSortBy('featured');
  };

  const hasActiveFilters =
    searchQuery.trim() !== '' ||
    selectedCategory !== 'all' ||
    selectedPriceRange !== 'all' ||
    selectedNote !== null;

  const filterKey = `${selectedCategory}-${selectedPriceRange}-${selectedNote || 'none'}-${sortBy}-${searchQuery}`;

  return (
    <div className="collection-page-root">
      <div className="collection-container">
        {/* ==================================================================
            TOP BAR: Breadcrumb, Title & Search/Sort Toolbar
            ================================================================== */}
        <header className="collection-header">
          {/* Page Header Fade Up on Load */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: LUXURY_EASE }}
          >
            <nav className="collection-breadcrumb" aria-label="Breadcrumb">
              <button
                type="button"
                className="breadcrumb-back-btn"
                onClick={onBackHome}
              >
                <ArrowLeft size={14} />
                <span>Back to Home</span>
              </button>
              <span className="breadcrumb-separator">/</span>
              <span className="breadcrumb-current">Haute Collections</span>
            </nav>

            <div className="collection-title-row">
              <div>
                <h1 className="collection-page-title">
                  <span className="title-line-1">The Haute Fragrance</span>{' '}
                  <span className="collection-pink-italic title-line-2">Collection</span>
                </h1>
                <p className="collection-page-subtitle">
                  Explore our portfolio of micro-batched extraits crafted with noble botanicals and aged oudh.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Controls Bar: Search & Sort - Fade up 0.1s staggered after Header */}
          <motion.div
            className="collection-toolbar"
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.12, ease: LUXURY_EASE }}
          >
            {/* Search Input */}
            <div className="collection-search-wrap">
              <Search size={16} className="search-icon" />
              <input
                type="text"
                className="collection-search-input"
                placeholder="Search by perfume name or notes (e.g. Rose, Oud)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  type="button"
                  className="search-clear-btn"
                  onClick={() => setSearchQuery('')}
                >
                  ×
                </button>
              )}
            </div>

            {/* Sort & Filter: Filter button on the left where showing count was, Sort on the right */}
            <div className="collection-toolbar-right">
              <button
                type="button"
                className="collection-filter-toggle-btn"
                onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
                aria-label="Toggle Filters"
              >
                <SlidersHorizontal size={14} />
                <span>Filters {hasActiveFilters && '•'}</span>
              </button>

              <div className="collection-sort-wrap">
                <label htmlFor="collection-sort" className="sort-label">Sort:</label>
                <select
                  id="collection-sort"
                  className="collection-sort-select"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortType)}
                >
                  <option value="featured">Featured</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="name">Name: A to Z</option>
                </select>
              </div>
            </div>
          </motion.div>
        </header>

        {/* ==================================================================
            MAIN CONTENT AREA: Left Sidebar Filters + Right Products Grid
            ================================================================== */}
        <div className="collection-layout">
          {/* Left Filter Sidebar - Fade in from left on page load */}
          <motion.aside
            className={`collection-sidebar ${isMobileFilterOpen ? 'mobile-open' : ''}`}
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.85, delay: 0.18, ease: LUXURY_EASE }}
          >
            <div className="sidebar-header">
              <div className="sidebar-title-wrap">
                <SlidersHorizontal size={15} />
                <h3 className="sidebar-title">Filters</h3>
              </div>

              {hasActiveFilters && (
                <button
                  type="button"
                  className="sidebar-reset-btn"
                  onClick={handleResetFilters}
                >
                  <RotateCcw size={12} />
                  <span>Reset</span>
                </button>
              )}
            </div>

            {/* Filter Section 1: Olfactory Family */}
            <div className="filter-group">
              <h4 className="filter-group-title">Fragrance Family</h4>
              <div className="filter-options-list">
                <button
                  type="button"
                  className={`filter-option-btn ${selectedCategory === 'all' ? 'active' : ''}`}
                  onClick={() => setSelectedCategory('all')}
                >
                  <span>All Families</span>
                  <span className="filter-count">8</span>
                </button>
                <button
                  type="button"
                  className={`filter-option-btn ${selectedCategory === 'floral' ? 'active' : ''}`}
                  onClick={() => setSelectedCategory('floral')}
                >
                  <span>Floral & Fresh</span>
                  <span className="filter-count">2</span>
                </button>
                <button
                  type="button"
                  className={`filter-option-btn ${selectedCategory === 'woody' ? 'active' : ''}`}
                  onClick={() => setSelectedCategory('woody')}
                >
                  <span>Woody & Leather</span>
                  <span className="filter-count">4</span>
                </button>
                <button
                  type="button"
                  className={`filter-option-btn ${selectedCategory === 'oriental' ? 'active' : ''}`}
                  onClick={() => setSelectedCategory('oriental')}
                >
                  <span>Oriental & Amber</span>
                  <span className="filter-count">2</span>
                </button>
              </div>
            </div>

            {/* Filter Section 2: Price Range */}
            <div className="filter-group">
              <h4 className="filter-group-title">Price Range</h4>
              <div className="filter-options-list">
                <button
                  type="button"
                  className={`filter-option-btn ${selectedPriceRange === 'all' ? 'active' : ''}`}
                  onClick={() => setSelectedPriceRange('all')}
                >
                  <span>All Prices</span>
                </button>
                <button
                  type="button"
                  className={`filter-option-btn ${selectedPriceRange === 'under4000' ? 'active' : ''}`}
                  onClick={() => setSelectedPriceRange('under4000')}
                >
                  <span>Under Rs. 4,000</span>
                </button>
                <button
                  type="button"
                  className={`filter-option-btn ${selectedPriceRange === '4000to4500' ? 'active' : ''}`}
                  onClick={() => setSelectedPriceRange('4000to4500')}
                >
                  <span>Rs. 4,000 – Rs. 4,500</span>
                </button>
                <button
                  type="button"
                  className={`filter-option-btn ${selectedPriceRange === 'above4500' ? 'active' : ''}`}
                  onClick={() => setSelectedPriceRange('above4500')}
                >
                  <span>Above Rs. 4,500</span>
                </button>
              </div>
            </div>

            {/* Filter Section 3: Signature Notes */}
            <div className="filter-group">
              <h4 className="filter-group-title">Dominant Notes</h4>
              <div className="filter-tags-cloud">
                {POPULAR_NOTES.map((note) => {
                  const isSelected = selectedNote === note;
                  return (
                    <button
                      key={note}
                      type="button"
                      className={`note-tag-btn ${isSelected ? 'active' : ''}`}
                      onClick={() => setSelectedNote(isSelected ? null : note)}
                    >
                      {note}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Concentration Perk Box */}
            <div className="sidebar-perk-box">
              <Sparkles size={14} className="perk-box-icon" />
              <div>
                <strong>30% Extrait Concentration</strong>
                <span>14+ Hours Lingering Projection</span>
              </div>
            </div>
          </motion.aside>

          {/* Right Products Grid (Exact Homepage Studio Card Layout) */}
          <main className="collection-products-area">
            <AnimatePresence mode="wait">
              {filteredProducts.length === 0 ? (
                <motion.div
                  key="empty-box"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3, ease: LUXURY_EASE }}
                  className="collection-empty-box"
                >
                  <div className="empty-icon-box">
                    <Search size={32} />
                  </div>
                  <h3 className="empty-title">No Fragrances Found</h3>
                  <p className="empty-desc">
                    We couldn't find any creations matching your current filter selections.
                  </p>
                  <button
                    type="button"
                    className="empty-reset-btn"
                    onClick={handleResetFilters}
                  >
                    RESET ALL FILTERS
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key={filterKey}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3, ease: LUXURY_EASE }}
                  className="rec-cards-grid collection-grid"
                >
                  {filteredProducts.map((product, idx) => (
                    <Reveal
                      key={product.id}
                      direction="up"
                      distance={28}
                      duration={0.7}
                      delay={(idx % 3) * 0.1}
                      amount={0.15}
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
                            {/* Realistic horizontal surface shadow matching homepage */}
                            <div className="lumiere-ground-shadow" />
                          </div>
                        </div>

                        {/* Product Info Section (Exact match to homepage design) */}
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
                              onClick={() => onAddToCart(product)}
                            >
                              <ShoppingBag size={13} strokeWidth={2.2} />
                            </button>
                          </div>
                        </div>
                      </article>
                    </Reveal>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </main>
        </div>
      </div>
    </div>
  );
};
