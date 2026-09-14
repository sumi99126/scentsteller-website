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
      'Our fragrances are handcrafted at an exceptional 28%–32% Extrait de Parfum concentration. Blended with rare aged amber, natural botanical absolutes from Grasse, and sustainably sourced woods, each creation delivers a 14+ hour lingering projection that evolves gracefully throughout the day.',
  },
  {
    id: 'delivery-pakistan',
    question: 'Do you deliver across Pakistan and offer Cash on Delivery?',
    answer:
      'Yes! We provide express nationwide delivery and Cash on Delivery (COD) across all cities in Pakistan, including Karachi, Lahore, Islamabad, Rawalpindi, Faisalabad, Multan, and Peshawar. Parcels are safely packed in protective presentation boxes and delivered within 2–4 business days with full SMS tracking.',
  },
  {
    id: 'discovery-samples',
    question: 'Are complimentary discovery samples included with every order?',
    answer:
      'Every full-size 100ml flacon order arrives with two complimentary 2ml deluxe discovery atomizers of your choice. This allows you to explore our wider haute perfumery portfolio from the comfort of your home.',
  },
  {
    id: 'whatsapp-concierge',
    question: 'Can I place an order directly via WhatsApp Concierge?',
    answer:
      'Certainly. Our private Fragrance Sommelier Concierge is available 24/7 on WhatsApp to provide tailored scent consultations, bespoke royal gift wrapping, corporate orders, and instantaneous order placement with discreet payment options.',
  },
  {
    id: 'storage-flacon',
    question: 'How should I store my luxury perfume flacon?',
    answer:
      'To preserve the intricate aromatic compounds and pure essential oils, we recommend storing your Scent Stellar flacon upright in a cool, shaded environment away from direct sunlight and sudden temperature shifts. Our heavy crystal glass bottles are specifically engineered to safeguard the delicate elixir within.',
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
              Explore clarity on our bespoke blends, artisanal formulations, and royal concierge services, <br />
              crafted to guide your journey into high-perfumery excellence.
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
