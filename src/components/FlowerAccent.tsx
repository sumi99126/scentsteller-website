import React from 'react';

export const FlowerAccent: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'inline-block', verticalAlign: 'middle' }}
    >
      <defs>
        <radialGradient id="petalGrad1" cx="50%" cy="30%" r="60%">
          <stop offset="0%" stopColor="#FFF2B2" />
          <stop offset="60%" stopColor="#E8C86A" />
          <stop offset="100%" stopColor="#C9A33E" />
        </radialGradient>
        <radialGradient id="petalGrad2" cx="40%" cy="40%" r="55%">
          <stop offset="0%" stopColor="#FFF7D6" />
          <stop offset="70%" stopColor="#E2BE5E" />
          <stop offset="100%" stopColor="#BD9632" />
        </radialGradient>
        <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#A07018" />
          <stop offset="60%" stopColor="#D4A034" />
          <stop offset="100%" stopColor="#F5D061" />
        </radialGradient>
        <filter id="flowerSoftShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor="#000000" floodOpacity="0.1" />
        </filter>
      </defs>

      <g filter="url(#flowerSoftShadow)">
        {/* 5 Petals */}
        <path
          d="M50 50 C40 32 30 14 50 8 C70 14 60 32 50 50 Z"
          fill="url(#petalGrad1)"
        />
        <path
          d="M50 50 C68 40 86 30 92 50 C86 70 68 60 50 50 Z"
          fill="url(#petalGrad2)"
        />
        <path
          d="M50 50 C60 68 70 86 50 92 C30 86 40 68 50 50 Z"
          fill="url(#petalGrad1)"
        />
        <path
          d="M50 50 C32 60 14 70 8 50 C14 30 32 40 50 50 Z"
          fill="url(#petalGrad2)"
        />
        <path
          d="M50 50 C38 35 24 22 36 12 C52 16 48 36 50 50 Z"
          fill="url(#petalGrad1)"
          transform="rotate(35 50 50)"
        />

        {/* Pistils / Stamen Center */}
        <circle cx="50" cy="50" r="8" fill="url(#centerGlow)" />
        <circle cx="48" cy="47" r="1.5" fill="#5C3B00" />
        <circle cx="52" cy="46" r="1.5" fill="#5C3B00" />
        <circle cx="53" cy="51" r="1.5" fill="#5C3B00" />
        <circle cx="48" cy="53" r="1.5" fill="#5C3B00" />
        <circle cx="45" cy="50" r="1.5" fill="#5C3B00" />
      </g>
    </svg>
  );
};
