import React from 'react';
import { Menu, ShoppingBag } from 'lucide-react';
import './Navbar.css';

interface NavbarProps {
  cartCount?: number;
  onOpenMenu?: () => void;
  onOpenCart?: () => void;
  onNavigateHome?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount = 0,
  onOpenMenu,
  onOpenCart,
  onNavigateHome,
}) => {
  return (
    <header className="mocko-header">
      <div className="mocko-navbar-pill">
        {/* Left: Circle Menu Button */}
        <button
          className="nav-circle-btn"
          aria-label="Open Navigation Menu"
          onClick={onOpenMenu}
        >
          <Menu size={18} strokeWidth={2.2} />
        </button>

        {/* Center: Brand Graphic Logo (matching preloader) */}
        <div
          className="nav-center-brand"
          onClick={onNavigateHome}
          role="button"
          tabIndex={0}
          aria-label="Return to Homepage"
          style={{ cursor: 'pointer' }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && onNavigateHome) onNavigateHome();
          }}
        >
          <img
            src="/logo-black.png"
            alt="Scent Stellar"
            className="navbar-brand-logo"
          />
        </div>

        {/* Right: Circle Shopping Bag Button */}
        <button
          className="nav-circle-btn"
          aria-label={`View Cart (${cartCount})`}
          onClick={onOpenCart}
        >
          <ShoppingBag size={18} strokeWidth={2.2} />
          {cartCount > 0 && (
            <span className="nav-cart-badge-count">{cartCount}</span>
          )}
        </button>
      </div>
    </header>
  );
};
