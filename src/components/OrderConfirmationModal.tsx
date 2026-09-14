import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, ShieldCheck, Truck, Sparkles, ArrowRight } from 'lucide-react';
import type { CartItem } from './CartDrawer';
import './OrderConfirmationModal.css';

interface OrderConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  totalAmount: number;
  onOrderSuccess: () => void;
}

export const OrderConfirmationModal: React.FC<OrderConfirmationModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  totalAmount,
  onOrderSuccess,
}) => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('Karachi');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'bank'>('cod');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [orderId, setOrderId] = useState('');

  // Lock background scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setIsSubmitted(false);
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phone.trim() || !address.trim() || !city.trim()) {
      return;
    }
    const generatedId = `SS-${Math.floor(1000 + Math.random() * 9000)}`;
    setOrderId(generatedId);
    setIsSubmitted(true);
  };

  const handleFinish = () => {
    onOrderSuccess();
    onClose();
  };

  if (!isOpen) return null;

  const popularCities = ['Karachi', 'Lahore', 'Islamabad', 'Rawalpindi', 'Faisalabad', 'Peshawar'];

  return (
    <div className="order-modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div
        className="order-modal-card"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          className="order-modal-close"
          onClick={onClose}
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        {!isSubmitted ? (
          <>
            {/* Modal Header */}
            <div className="order-modal-header">
              <span className="order-modal-eyebrow">
                <Sparkles size={13} className="order-eyebrow-icon" />
                <span>EXPRESS NATIONWIDE CHECKOUT</span>
              </span>
              <h3 className="order-modal-title">Confirm Your Order</h3>
              <p className="order-modal-desc">
                Fill in your delivery details below to confirm your order with Cash on Delivery (COD).
              </p>
            </div>

            {/* Content: Summary & Form */}
            <div className="order-modal-body">
              {/* Order Summary Strip */}
              <div className="order-summary-box">
                <div className="order-summary-head">
                  <span className="summary-title">Order Items ({cartItems.reduce((s, i) => s + i.quantity, 0)})</span>
                  <span className="summary-total">Rs. {totalAmount.toLocaleString()}</span>
                </div>
                <div className="order-items-preview">
                  {cartItems.map((item) => (
                    <div key={item.id} className="summary-item-row">
                      <img src={item.image} alt={item.name} className="summary-thumb" />
                      <div className="summary-item-details">
                        <span className="summary-name">{item.name}</span>
                        <span className="summary-meta">Qty: {item.quantity} • Rs. {(item.priceNum * item.quantity).toLocaleString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="order-delivery-badge">
                  <Truck size={14} />
                  <span>Free Express Delivery Across Pakistan (2–4 Days)</span>
                </div>
              </div>

              {/* Delivery Details Form */}
              <form onSubmit={handleSubmit} className="order-form">
                <div className="form-group">
                  <label className="form-label" htmlFor="fullName">Full Name *</label>
                  <input
                    id="fullName"
                    type="text"
                    className="form-input"
                    placeholder="e.g. Ayesha Khan"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="phone">Phone / WhatsApp Number *</label>
                  <input
                    id="phone"
                    type="tel"
                    className="form-input"
                    placeholder="e.g. 0300 1234567"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="city">City *</label>
                  <input
                    id="city"
                    type="text"
                    className="form-input"
                    placeholder="Enter your city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                  />
                  <div className="city-chips">
                    {popularCities.map((c) => (
                      <button
                        key={c}
                        type="button"
                        className={`city-chip ${city === c ? 'active' : ''}`}
                        onClick={() => setCity(c)}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="address">Full Delivery Address *</label>
                  <textarea
                    id="address"
                    className="form-input form-textarea"
                    placeholder="House/Apartment #, Street, Area, Landmark"
                    rows={2}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                  />
                </div>

                {/* Payment Option */}
                <div className="form-group">
                  <label className="form-label">Payment Method</label>
                  <div className="payment-options">
                    <label className={`payment-pill ${paymentMethod === 'cod' ? 'selected' : ''}`}>
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === 'cod'}
                        onChange={() => setPaymentMethod('cod')}
                      />
                      <div>
                        <strong>Cash on Delivery (COD)</strong>
                        <span>Pay when your package arrives at your doorstep</span>
                      </div>
                    </label>

                    <label className={`payment-pill ${paymentMethod === 'bank' ? 'selected' : ''}`}>
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === 'bank'}
                        onChange={() => setPaymentMethod('bank')}
                      />
                      <div>
                        <strong>Direct Bank Transfer / JazzCash / EasyPaisa</strong>
                        <span>Account details sent via SMS after confirmation</span>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Submit Action */}
                <button type="submit" className="confirm-submit-btn">
                  <span>CONFIRM ORDER • Rs. {totalAmount.toLocaleString()}</span>
                  <ArrowRight size={16} />
                </button>

                <div className="form-trust-note">
                  <ShieldCheck size={14} />
                  <span>100% Authentic Handcrafted Extrait • Tamper-proof Packing</span>
                </div>
              </form>
            </div>
          </>
        ) : (
          /* Order Confirmed Celebration View */
          <div className="order-success-view">
            <div className="success-icon-wrap">
              <CheckCircle2 size={54} className="success-icon" />
            </div>

            <span className="success-badge">ORDER CONFIRMED</span>
            <h3 className="success-title">Thank You, {fullName}!</h3>
            <p className="success-ord-num">Order Reference: <strong>#{orderId}</strong></p>

            <p className="success-desc">
              Your order has been recorded successfully. Our concierge team will pack your fragrance with utmost care and dispatch it to <strong>{city}</strong>.
            </p>

            <div className="success-summary-card">
              <div className="success-row">
                <span>Payment Method:</span>
                <strong>{paymentMethod === 'cod' ? 'Cash on Delivery' : 'Bank Transfer / Mobile Wallet'}</strong>
              </div>
              <div className="success-row">
                <span>Total Amount:</span>
                <strong className="success-total">Rs. {totalAmount.toLocaleString()}</strong>
              </div>
              <div className="success-row">
                <span>Delivery:</span>
                <span>Free Express Courier (2–4 Business Days)</span>
              </div>
            </div>

            <button
              type="button"
              className="continue-btn"
              onClick={handleFinish}
            >
              CONTINUE EXPLORING
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
