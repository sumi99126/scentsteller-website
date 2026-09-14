import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { Reveal, LUXURY_EASE } from './Reveal';
import './FaqSection.css';

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

const FAQ_DATA: FaqItem[] = [
  {
    id: 'enduring-extraits',
    question: 'What makes Scent Stellar extraits so enduring?',
    answer:
      'Handcrafted at 28%–32% Extrait de Parfum concentration with aged amber and Grasse absolutes, delivering 14+ hours of lasting projection.',
  },
  {
    id: 'delivery-pakistan',
    question: 'Do you deliver across Pakistan and offer Cash on Delivery?',
    answer:
      'Yes. We provide express delivery and Cash on Delivery (COD) nationwide across Pakistan in 2–4 business days with full SMS tracking.',
  },
  {
    id: 'discovery-samples',
    question: 'Are complimentary discovery samples included with every order?',
    answer:
      'Every 100ml flacon includes two complimentary 2ml deluxe discovery atomizers of your choice.',
  },
  {
    id: 'whatsapp-concierge',
    question: 'Can I place an order directly via WhatsApp Concierge?',
    answer:
      'Yes. Our WhatsApp Concierge is available 24/7 for scent consultations, bespoke gifting, and instant order placement.',
  },
  {
    id: 'storage-flacon',
    question: 'How should I store my luxury perfume flacon?',
    answer:
      'Store your flacon upright in a cool, shaded environment away from direct sunlight to preserve the pure botanical oils.',
  },
];

export const FaqSection: React.FC = () => {
  // Allow toggling open/close on cards, opening the first one by default
  const [openId, setOpenId] = useState<string | null>('enduring-extraits');

  const toggleAccordion = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="faq-section" id="faq">
      {/* Soft ambient lighting glow */}
      <div className="faq-ambient-glow" aria-hidden="true" />

      <div className="faq-container">
        {/* ====================================================================
            SECTION HEADER: Centered Eyebrow & Shortened Haute Fragrance Title
            ==================================================================== */}
        <Reveal direction="up" duration={0.8} distance={30} amount={0.2}>
          <header className="faq-header">
            <span className="faq-badge">FREQUENTLY ASKED QUESTIONS</span>
            <h2 className="faq-title">
              Everything About <span className="faq-pink-italic">Our Fragrances</span>
            </h2>
            <p className="faq-subtitle">
              Clarity on our bespoke blends, express delivery, and concierge services.
            </p>
          </header>
        </Reveal>

        {/* ====================================================================
            5 ACCORDION CARDS: Staggered Fade Up + Smooth AnimatePresence Expand
            ==================================================================== */}
        <div className="faq-accordion-list" role="tablist">
          {FAQ_DATA.map((item, index) => {
            const isOpen = openId === item.id;
            return (
              <Reveal
                key={item.id}
                direction="up"
                duration={0.65}
                distance={24}
                delay={index * 0.08}
                amount={0.15}
              >
                <div
                  className={`faq-card ${isOpen ? 'open' : ''}`}
                  onClick={() => toggleAccordion(item.id)}
                  role="tab"
                  aria-expanded={isOpen}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      toggleAccordion(item.id);
                    }
                  }}
                >
                  {/* Accordion Question Header */}
                  <div className="faq-card-header">
                    <h3 className="faq-question-text">{item.question}</h3>
                    <button
                      type="button"
                      className="faq-toggle-btn"
                      aria-label={isOpen ? 'Collapse answer' : 'Expand answer'}
                      tabIndex={-1}
                    >
                      <ChevronDown size={17} className="faq-toggle-icon" />
                    </button>
                  </div>

                  {/* Smooth Expanding Accordion Answer Body with Framer Motion */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: LUXURY_EASE }}
                        className="faq-answer-collapse"
                      >
                        <div className="faq-answer-inner">
                          <p className="faq-answer-text">{item.answer}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};
