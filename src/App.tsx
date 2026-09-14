import { useState } from 'react';
import { Preloader } from './components/Preloader';
import { Navbar } from './components/Navbar';
import { Hero, FRAGRANCES } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { RecommendationsSection } from './components/RecommendationsSection';
import type { RecommendationProduct } from './components/RecommendationsSection';
import { PromotionalBanners } from './components/PromotionalBanners';
import { CraftsmanshipSection } from './components/CraftsmanshipSection';
import { FavoriteMomentsSection } from './components/FavoriteMomentsSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { FaqSection } from './components/FaqSection';
import { CtaBanner } from './components/CtaBanner';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import type { CartItem } from './components/CartDrawer';
import { MenuDrawer } from './components/MenuDrawer';
import { OrderConfirmationModal } from './components/OrderConfirmationModal';
import { CollectionPage } from './components/CollectionPage';
import './App.css';

const INITIAL_CART: CartItem[] = [
  {
    id: 'flora',
    name: 'FLORA ÉTERNELLE',
    subtitle: 'Centifolia Rose • 100ml Extrait',
    price: 'Rs. 3,850',
    priceNum: 3850,
    image: '/bottle-flora.png',
    quantity: 1,
  },
];

function App() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [preloaderKey] = useState<number>(0);
  const [activeFragranceIdx, setActiveFragranceIdx] = useState<number>(0);

  // View Routing State: 'home' | 'collection'
  const [currentView, setCurrentView] = useState<'home' | 'collection'>('home');

  // Cart, Menu & Checkout State
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [cartItems, setCartItems] = useState<CartItem[]>(INITIAL_CART);

  const current = FRAGRANCES[activeFragranceIdx] || FRAGRANCES[0];

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const navigateToCollection = () => {
    setCurrentView('collection');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToHome = () => {
    setCurrentView('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddToCart = (product: RecommendationProduct) => {
    const priceNumber = parseInt(product.pricePKR.replace(/[^0-9]/g, ''), 10) || 3850;
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          subtitle: `${product.notes.split('•')[0].trim()} • 100ml Extrait`,
          price: product.pricePKR,
          priceNum: priceNumber,
          image: product.bottleImg,
          quantity: 1,
        },
      ];
    });
    // Open right cart drawer immediately on adding to cart
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (id: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(id);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: newQty } : item))
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="app-root">
      {/* Animated Preloader with Black Logo */}
      {isLoading && (
        <Preloader
          key={preloaderKey}
          minDuration={2200}
          onComplete={() => setIsLoading(false)}
        />
      )}

      {/* Main Luxury Layout with Dynamic Background covering Header & Hero */}
      <div
        className={`page-wrapper theme-${current.id} view-${currentView}`}
        style={{
          background: currentView === 'collection' ? '#ffffff' : current.bgGradient,
        }}
      >
        {/* Ambient aura covering both Header and Hero seamlessly */}
        {currentView === 'home' && (
          <div
            className="page-dynamic-backdrop"
            style={{ background: current.auraGradient }}
          />
        )}

        <Navbar
          cartCount={totalCartCount}
          onOpenMenu={() => setIsMenuOpen(true)}
          onOpenCart={() => setIsCartOpen(true)}
          onNavigateHome={navigateToHome}
        />

        <main className="main-content">
          {currentView === 'home' ? (
            <>
              <Hero
                selectedIdx={activeFragranceIdx}
                onSelectFragrance={setActiveFragranceIdx}
              />
              {/* About / Philosophy Section */}
              <AboutSection />
              {/* Curated Recommendations Section */}
              <RecommendationsSection onAddToCart={handleAddToCart} />
              {/* Dual Promotional Banners */}
              <PromotionalBanners />
              {/* Craftsmanship & Purity */}
              <CraftsmanshipSection />
              {/* Refined Scents for Every Moment Bento Section */}
              <FavoriteMomentsSection />
              {/* Testimonials Section */}
              <TestimonialsSection />
              {/* Haute Fragrances FAQ Section */}
              <FaqSection />
              {/* Pre-Footer Luxury CTA Banner */}
              <CtaBanner onExploreClick={navigateToCollection} />
              {/* Comprehensive Haute Parfumerie Footer */}
              <Footer />
            </>
          ) : (
            <>
              {/* Dedicated Collection Page with Left Filter Sidebar */}
              <CollectionPage
                onAddToCart={handleAddToCart}
                onBackHome={navigateToHome}
              />
              {/* Comprehensive Haute Parfumerie Footer */}
              <Footer />
            </>
          )}
        </main>
      </div>

      {/* Right Slide-Out Shopping Bag Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onOpenCheckout={() => setIsCheckoutOpen(true)}
      />

      {/* Left Slide-Out Navigation Menu Drawer */}
      <MenuDrawer
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onNavigateCollection={navigateToCollection}
        onNavigateHome={navigateToHome}
      />

      {/* On-Site Order Confirmation Modal */}
      <OrderConfirmationModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        totalAmount={cartItems.reduce((sum, item) => sum + item.priceNum * item.quantity, 0)}
        onOrderSuccess={() => {
          setCartItems([]);
        }}
      />
    </div>
  );
}

export default App;
