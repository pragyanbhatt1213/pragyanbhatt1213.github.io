import React from 'react';
import { Link } from 'react-router-dom';

interface ArrowLinkProps {
  to?: string;
  href?: string;
  children: React.ReactNode;
  ariaLabel?: string;
  className?: string;
}

export const ArrowLink: React.FC<ArrowLinkProps> = ({
  to,
  href,
  children,
  ariaLabel,
  className = '',
}) => {
  const content = (
    <>
      <span className="hairline-link active">{children}</span>
      <span
        className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-1.5"
        aria-hidden="true"
      >
        →
      </span>
    </>
  );

  const baseClasses = `group inline-flex items-center gap-2 t-mono text-[11px] sm:text-[12px] tracking-[0.14em] text-[var(--color-text-primary)] transition-colors ${className}`;

  if (to) {
    return (
      <Link to={to} className={baseClasses} aria-label={ariaLabel}>
        {content}
      </Link>
    );
  }

  return (
    <a
      href={href || '#'}
      className={baseClasses}
      aria-label={ariaLabel}
      target={href?.startsWith('http') ? '_blank' : undefined}
      rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
    >
      {content}
    </a>
  );
};
