import React, { useEffect, useState } from 'react';
import './Preloader.css';

interface PreloaderProps {
  onComplete?: () => void;
  minDuration?: number; // duration in ms
}

const PHRASES = [
  'Distilling Essences...',
  'Blending Rare Accords...',
  'Haute Parfumerie...',
  'Unveiling Elegance...'
];

export const Preloader: React.FC<PreloaderProps> = ({
  onComplete,
  minDuration = 2400
}) => {
  const [progress, setProgress] = useState<number>(0);
  const [phraseIndex, setPhraseIndex] = useState<number>(0);
  const [isFading, setIsFading] = useState<boolean>(false);

  useEffect(() => {
    const intervalTime = 25; // interval step in ms
    const totalSteps = minDuration / intervalTime;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const currentProgress = Math.min(100, Math.round((currentStep / totalSteps) * 100));
      setProgress(currentProgress);

      // Rotate status phrases
      if (currentProgress < 30) {
        setPhraseIndex(0);
      } else if (currentProgress < 60) {
        setPhraseIndex(1);
      } else if (currentProgress < 90) {
        setPhraseIndex(2);
      } else {
        setPhraseIndex(3);
      }

      if (currentProgress >= 100) {
        clearInterval(timer);
        // Begin fade out animation
        setTimeout(() => {
          setIsFading(true);
          setTimeout(() => {
            if (onComplete) onComplete();
          }, 800);
        }, 300);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [minDuration, onComplete]);

  return (
    <div className={`preloader-container ${isFading ? 'fade-out' : ''}`}>
      {/* Background radial glow */}
      <div className="preloader-ambient-glow" />

      {/* Center content */}
      <div className="preloader-content">
        <div className="preloader-logo-wrapper">
          <div className="preloader-logo-glow" />
          <img
            src="/logo-black.png"
            alt="Scents Stellar Logo"
            className="preloader-logo"
          />
        </div>

        <p className="preloader-tagline">Haute Parfumerie & Luxury Fragrances</p>

        <div className="preloader-progress-section">
          <div className="preloader-progress-track">
            <div
              className="preloader-progress-bar"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="preloader-status-row">
            <span className="preloader-phrase">{PHRASES[phraseIndex]}</span>
            <span className="preloader-percentage">{progress.toString().padStart(2, '0')}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};
