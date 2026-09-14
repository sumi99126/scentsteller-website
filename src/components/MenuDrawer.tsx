import React, { useEffect } from 'react';
import { X, ChevronRight } from 'lucide-react';
import './MenuDrawer.css';

interface MenuDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateCollection?: () => void;
  onNavigateHome?: () => void;
}

interface NavLinkItem {
  label: string;
  href: string;
}

const MENU_LINKS: NavLinkItem[] = [
  { label: 'Home', href: '#home' },
  { label: 'Our Collections', href: '#collection' },
  { label: 'About', href: '#about' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'FAQs', href: '#faq' },
  { label: 'Contact', href: '#contact' },
];

export const MenuDrawer: React.FC<MenuDrawerProps> = ({
  isOpen,
  onClose,
  onNavigateCollection,
  onNavigateHome,
}) => {
  // Lock background scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleLinkClick = (href: string) => {
    onClose();
    if (href === '#home') {
      if (onNavigateHome) onNavigateHome();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (href === '#collection') {
      if (onNavigateCollection) onNavigateCollection();
      return;
    }
    if (onNavigateHome) {
      onNavigateHome();
    }
    setTimeout(() => {
      const id = href.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 120);
  };

  return (
    <>
      {/* Backdrop overlay */}
      <div
        className={`menu-drawer-backdrop ${isOpen ? 'open' : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Left Sliding Panel */}
      <aside
        className={`menu-drawer-panel ${isOpen ? 'open' : ''}`}
        aria-label="Navigation Menu Drawer"
        aria-modal="true"
        role="dialog"
      >
        {/* Header with Brand Logo & Close Icon */}
        <div className="menu-drawer-header">
          <div className="menu-logo-wrap">
            <img
              src="/logo-black.png"
              alt="Scent Stellar"
              className="menu-logo-img"
            />
          </div>

          <button
            type="button"
            className="menu-drawer-close-btn"
            onClick={onClose}
            aria-label="Close Navigation Menu"
          >
            <X size={20} />
          </button>
        </div>

        {/* Links Navigation */}
        <nav className="menu-drawer-nav">
          <ul className="menu-nav-list">
            {MENU_LINKS.map((link) => (
              <li key={link.href} className="menu-nav-item">
                <a
                  href={link.href}
                  className="menu-nav-link"
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(link.href);
                  }}
                >
                  <span className="menu-link-text">{link.label}</span>
                  <ChevronRight size={16} className="menu-arrow-icon" />
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Clean Minimal Footer */}
        <div className="menu-drawer-footer-clean">
          <p className="menu-brand-footer-text">Scent Stellar • Handcrafted Extraits Pakistan</p>
        </div>
      </aside>
    </>
  );
};
