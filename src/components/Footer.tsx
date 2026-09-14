import React, { useState } from 'react';
import {
  MessageCircle,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Truck,
  CheckCircle2,
} from 'lucide-react';
import './Footer.css';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer className="luxury-footer" id="contact">
      {/* Top Accent Gradient Border */}
      <div className="footer-gold-line" />

      {/* Main Multi-Column Grid */}
      <div className="footer-container">
        <div className="footer-grid">
          {/* Column 1: Brand Essence */}
          <div className="footer-col footer-brand-col">
            <div className="footer-logo-wrap">
              <img
                src="/logo-white.png"
                alt="Scent Stellar Haute Parfumerie"
                className="footer-logo-img"
              />
            </div>
            <p className="footer-brand-tagline">
              Crafting transcendent haute parfumerie through rare botanical absolutes, Cambodian agarwood, and pure French craftsmanship. An unforgettable signature for your presence.
            </p>
            <div className="footer-social-links">
              <a
                href="https://www.instagram.com/scent_stellar/"
                target="_blank"
                rel="noreferrer"
                className="footer-social-btn"
                aria-label="Instagram"
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="footer-social-btn"
                aria-label="Facebook"
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
              <a
                href="https://wa.me/923000000000"
                target="_blank"
                rel="noreferrer"
                className="footer-social-btn whatsapp-highlight"
                aria-label="WhatsApp Concierge"
              >
                <MessageCircle size={17} />
              </a>
            </div>
          </div>

          {/* Column 2: Haute Collections */}
          <div className="footer-col">
            <h4 className="footer-heading">Collections</h4>
            <ul className="footer-links-list">
              <li><a href="#recommendations">Flora Imperial Extrait</a></li>
              <li><a href="#recommendations">Zentus Noir Intense</a></li>
              <li><a href="#recommendations">Ash Sultan Amber</a></li>
              <li><a href="#recommendations">Celestial Elixir</a></li>
              <li><a href="#recommendations">Discovery Coffret Trio</a></li>
              <li><a href="#craftsmanship">Royal Bespoke Gifting</a></li>
            </ul>
          </div>

          {/* Column 3: Client Care & Concierge */}
          <div className="footer-col">
            <h4 className="footer-heading">Client Care</h4>
            <ul className="footer-links-list">
              <li>
                <a
                  href="https://wa.me/923000000000?text=Hello%20Scent%20Stellar,%20I%20would%20like%20a%20personal%20fragrance%20consultation"
                  target="_blank"
                  rel="noreferrer"
                  className="footer-whatsapp-link"
                >
                  <MessageCircle size={14} className="wa-icon" />
                  <span>WhatsApp Concierge</span>
                </a>
              </li>
              <li><a href="#faq">Cash on Delivery (COD) Nationwide</a></li>
              <li><a href="#faq">Express Courier Across Pakistan (2–4 Days)</a></li>
              <li><a href="#faq">Discovery Samples Policy</a></li>
              <li><a href="#faq">Authenticity & Flacon Care</a></li>
              <li><a href="#faq">Corporate Fragrance Orders</a></li>
            </ul>
          </div>

          {/* Column 4: Private VIP Salon Newsletter */}
          <div className="footer-col footer-newsletter-col">
            <h4 className="footer-heading">
              <span>Private Salon</span>
              <Sparkles size={14} className="footer-sparkle" />
            </h4>
            <p className="footer-newsletter-text">
              Subscribe to receive confidential invitations to limited micro-batch drops, private fragrance unveilings, and seasonal giftings.
            </p>

            <form className="footer-newsletter-form" onSubmit={handleSubscribe}>
              <div className="footer-input-wrap">
                <input
                  type="email"
                  className="footer-input"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button
                  type="submit"
                  className="footer-submit-btn"
                  aria-label="Join Private Salon"
                >
                  <ArrowRight size={16} />
                </button>
              </div>
              {subscribed && (
                <div className="footer-subscribe-success">
                  <CheckCircle2 size={14} />
                  <span>Welcome to the private circle of Scent Stellar.</span>
                </div>
              )}
            </form>

            <div className="footer-trust-badges">
              <span className="trust-badge">
                <ShieldCheck size={13} />
                <span>100% Authentic Extrait</span>
              </span>
              <span className="trust-badge">
                <Truck size={13} />
                <span>Nationwide COD Express</span>
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Legal */}
        <div className="footer-bottom-bar">
          <p className="footer-copyright">
            © {new Date().getFullYear()} Scent Stellar Parfums. All Rights Reserved. Mastercrafted in micro-batches.
          </p>
          <div className="footer-bottom-links">
            <a href="#faq">Privacy Policy</a>
            <span className="footer-separator">•</span>
            <a href="#faq">Terms of Elegance</a>
            <span className="footer-separator">•</span>
            <a href="#faq">IFRA Safety Compliant</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
