import React from 'react';
import { Reveal } from './Reveal';
import './CraftsmanshipSection.css';

interface CraftCallout {
  id: string;
  title: string;
  description: string;
}

const LEFT_CALLOUTS: CraftCallout[] = [
  {
    id: 'delivery',
    title: 'DIRECT DELIVERY',
    description: 'Directly dispatched from our artisanal atelier.',
  },
  {
    id: 'lasting',
    title: 'LONG-LASTING SCENTS',
    description: '30% pure extrait for 14+ hours sillage.',
  },
  {
    id: 'eco',
    title: 'ECO-FRIENDLY PACKAGING',
    description: 'Recyclable crystal flacons and sustainable boxing.',
  },
];

const RIGHT_CALLOUTS: CraftCallout[] = [
  {
    id: 'ingredients',
    title: 'PREMIUM INGREDIENTS',
    description: 'Taif roses, Grasse flora, and noble Cambodian oudh.',
  },
  {
    id: 'artisan',
    title: 'ARTISANAL BLENDING',
    description: 'Micro-batched with precision by master perfumers.',
  },
  {
    id: 'shipping',
    title: 'NATIONWIDE COD',
    description: 'Safe express delivery across all of Pakistan.',
  },
];

export const CraftsmanshipSection: React.FC = () => {
  return (
    <section className="craft-section" id="craftsmanship">
      <div className="craft-container">
        {/* ====================================================================
            HEADER: Eyebrow, Editorial Title with Italic "of", Narrative Subtitle
            ==================================================================== */}
        <Reveal direction="up" distance={30} duration={0.85}>
          <header className="craft-header">
            <span className="craft-eyebrow">CRAFTSMANSHIP & PURITY</span>
            <h2 className="craft-title">
              Scent <span className="craft-italic-of">of</span> Elegance
            </h2>
            <p className="craft-subtitle">
              Uncompromising artisanal extraits formulated with rare botanical absolutes and noble oudh.
            </p>
          </header>
        </Reveal>

        {/* ====================================================================
            SHOWCASE: 3 Clear Beats — Center Bottle Anchor + Alternating Cards
            ==================================================================== */}
        <div className="craft-showcase-stage">
          {/* Beat 2: Left Callouts Column (3 Cards fading in from left, alternating) */}
          <div className="craft-col craft-left-col">
            {LEFT_CALLOUTS.map((item, idx) => (
              <Reveal
                key={item.id}
                direction="left"
                distance={50}
                duration={0.8}
                delay={0.10 + idx * 0.24}
              >
                <div className="craft-item-row left-row">
                  <div className="craft-card">
                    <h3 className="craft-card-title">{item.title}</h3>
                    <p className="craft-card-desc">{item.description}</p>
                  </div>
                  {/* Horizontal Gold Connector Line with Glowing Beacon Dot */}
                  <div className="craft-connector-line left-line">
                    <span className="connector-wire" />
                    <span className="connector-dot" />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Beat 1: Center Column: Anchor Perfume Bottle with Zoom-In Entrance */}
          <div className="craft-center-col">
            <Reveal direction="zoom" zoomScale={0.85} distance={0} duration={1.0} delay={0.05}>
              <div className="craft-bottle-stage">
                {/* Warm Ambient Rose-Gold Backlight Glow */}
                <div className="craft-bottle-glow" />

                {/* Flora Perfume Bottle */}
                <img
                  src="/bottle-flora.png"
                  alt="Scent Stellar Flora Luxury Flacon"
                  className="craft-flora-bottle"
                  loading="lazy"
                />

                {/* Realistic Soft Surface Contact Shadow */}
                <div className="craft-ground-shadow" />
              </div>
            </Reveal>
          </div>

          {/* Beat 3: Right Callouts Column (Cards fading in from right, alternating) */}
          <div className="craft-col craft-right-col">
            {RIGHT_CALLOUTS.map((item, idx) => (
              <Reveal
                key={item.id}
                direction="right"
                distance={50}
                duration={0.8}
                delay={0.22 + idx * 0.24}
              >
                <div className="craft-item-row right-row">
                  {/* Horizontal Gold Connector Line with Glowing Beacon Dot */}
                  <div className="craft-connector-line right-line">
                    <span className="connector-dot" />
                    <span className="connector-wire" />
                  </div>
                  <div className="craft-card">
                    <h3 className="craft-card-title">{item.title}</h3>
                    <p className="craft-card-desc">{item.description}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
