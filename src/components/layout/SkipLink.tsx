import React from 'react';

export const SkipLink: React.FC = () => {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-[var(--z-skip,100)] px-4 py-2 bg-[var(--color-text-primary)] text-[var(--color-background)] font-mono text-xs tracking-wider uppercase font-semibold outline-none ring-2 ring-white"
    >
      Skip to content
    </a>
  );
};
