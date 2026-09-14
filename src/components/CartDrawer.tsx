import React, { useEffect } from 'react';
import { X, ShoppingBag, Plus, Minus, Trash2, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';
import './CartDrawer.css';

export interface CartItem {
  id: string;
  name: string;
  subtitle: string;
  price: string;
  priceNum: number;
  image: string;
  quantity: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, newQty: number) => void;
  onRemoveItem: (id: string) => void;
  onOpenCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onOpenCheckout,
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

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.priceNum * item.quantity, 0);

  return (
    <>
      {/* Backdrop overlay */}
      <div
        className={`cart-drawer-backdrop ${isOpen ? 'open' : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Right Drawer Panel */}
      <aside
        className={`cart-drawer-panel ${isOpen ? 'open' : ''}`}
        aria-label="Shopping Cart Drawer"
        aria-modal="true"
        role="dialog"
      >
        {/* Header */}
        <div className="cart-drawer-header">
          <div className="cart-header-title-wrap">
            <ShoppingBag size={19} className="cart-header-icon" />
            <h3 className="cart-drawer-title">Shopping Bag</h3>
            <span className="cart-header-count">({totalItems})</span>
          </div>

          <button
            type="button"
            className="cart-drawer-close-btn"
            onClick={onClose}
            aria-label="Close Cart"
          >
            <X size={20} />
          </button>
        </div>

        {/* Free Express Delivery Banner */}
        <div className="cart-perk-banner">
          <Sparkles size={14} className="cart-perk-icon" />
          <span>Free Express Delivery Across Pakistan on Orders Over Rs. 3,500</span>
        </div>

        {/* Drawer Body */}
        <div className="cart-drawer-body">
          {items.length === 0 ? (
            <div className="cart-empty-state">
              <div className="cart-empty-icon-box">
                <ShoppingBag size={38} strokeWidth={1.2} />
              </div>
              <h4 className="cart-empty-title">Your Bag is Empty</h4>
              <p className="cart-empty-text">
                Explore our handcrafted extraits and discover the lingering fragrance that defines your presence.
              </p>
              <button
                type="button"
                className="cart-empty-btn"
                onClick={() => {
                  onClose();
                  const el = document.getElementById('recommendations');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                EXPLORE COLLECTION
              </button>
            </div>
          ) : (
            <div className="cart-items-list">
              {items.map((item) => (
                <div key={item.id} className="cart-item-card">
                  <div className="cart-item-thumb-box">
                    <img src={item.image} alt={item.name} className="cart-item-thumb" />
                  </div>

                  <div className="cart-item-info">
                    <div className="cart-item-header">
                      <h4 className="cart-item-name">{item.name}</h4>
                      <button
                        type="button"
                        className="cart-item-remove-btn"
                        onClick={() => onRemoveItem(item.id)}
                        aria-label={`Remove ${item.name}`}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>

                    <p className="cart-item-subtitle">{item.subtitle}</p>

                    <div className="cart-item-bottom-row">
                      {/* Quantity Controls */}
                      <div className="cart-qty-counter">
                        <button
                          type="button"
                          className="cart-qty-btn"
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          aria-label="Decrease quantity"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="cart-qty-number">{item.quantity}</span>
                        <button
                          type="button"
                          className="cart-qty-btn"
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          aria-label="Increase quantity"
                        >
                          <Plus size={12} />
                        </button>
                      </div>

                      <div className="cart-item-price-wrap">
                        <span className="cart-item-price">Rs. {(item.priceNum * item.quantity).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer with Subtotal & Checkout */}
        {items.length > 0 && (
          <div className="cart-drawer-footer">
            <div className="cart-summary-subtotal">
              <span className="cart-subtotal-label">Estimated Subtotal</span>
              <span className="cart-subtotal-val">Rs. {subtotal.toLocaleString()}</span>
            </div>

            <p className="cart-tax-notice">Cash on Delivery (COD) & protective luxury packaging included.</p>

            <button
              type="button"
              className="cart-checkout-btn"
              onClick={() => {
                onClose();
                onOpenCheckout();
              }}
            >
              <span>PROCEED TO CHECKOUT</span>
              <ArrowRight size={16} />
            </button>

            <div className="cart-security-badge">
              <ShieldCheck size={14} />
              <span>100% Authentic Handcrafted Extrait • Cash on Delivery</span>
            </div>
          </div>
        )}
      </aside>
    </>
  );
};
