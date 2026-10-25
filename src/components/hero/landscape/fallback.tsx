import React from 'react';

export const LandscapeFallback: React.FC = () => {
  return (
    <div
      className="absolute inset-0 w-full h-full pointer-events-none flex items-center justify-center overflow-hidden"
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1000 600"
        className="w-full h-full opacity-40"
        preserveAspectRatio="xMidYMid meet"
      >
        <g stroke="rgba(232, 229, 222, 0.2)" fill="none" strokeWidth="0.8">
          <path d="M50,420 Q250,220 500,160 T950,420" />
          <path d="M80,440 Q300,280 520,240 T920,440" />
          <path d="M120,470 Q350,340 540,310 T880,470" />
          <path d="M160,500 Q400,410 560,390 T840,500" />
        </g>
        <g fill="rgba(232, 229, 222, 0.45)">
          <circle cx="500" cy="160" r="1.5" />
          <circle cx="480" cy="180" r="1" />
          <circle cx="520" cy="175" r="1.2" />
          <circle cx="340" cy="270" r="1" />
          <circle cx="660" cy="265" r="1.1" />
        </g>
      </svg>
    </div>
  );
};
