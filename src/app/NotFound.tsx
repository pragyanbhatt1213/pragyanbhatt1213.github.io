import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLink } from '../components/ui/ArrowLink';

export const NotFound: React.FC = () => {
  return (
    <div className="max-w-[var(--container-max)] mx-auto px-6 sm:px-12 py-32 sm:py-48 text-center flex flex-col items-center justify-center">
      <span className="t-mono text-[11px] text-[var(--color-text-muted)] tracking-[0.2em] mb-4">
        ERROR 404 / SECTOR UNRESOLVED
      </span>

      <h1 className="font-serif text-[clamp(3.5rem,2rem+7vw,9rem)] leading-[0.95] font-normal text-[var(--color-text-primary)]">
        Path not <em className="serif-italic">found.</em>
      </h1>

      <p className="mt-6 text-[var(--color-text-secondary)] text-base sm:text-lg max-w-[42ch] mx-auto leading-relaxed">
        The requested routing node does not exist in the current topology. Return to the main terrain or explore selected work.
      </p>

      <div className="mt-12 flex flex-wrap gap-6 justify-center">
        <ArrowLink to="/">RETURN TO HOMEPAGE</ArrowLink>
        <ArrowLink to="/work">VIEW WORK INDEX</ArrowLink>
      </div>
    </div>
  );
};
