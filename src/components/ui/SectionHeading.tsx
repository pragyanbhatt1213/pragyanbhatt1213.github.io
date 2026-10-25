import React from 'react';

interface SectionHeadingProps {
  id?: string;
  number: string;
  title: string;
  subtitle?: string;
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  id,
  number,
  title,
  subtitle,
  className = '',
}) => {
  return (
    <div className={`mb-12 sm:mb-16 ${className}`}>
      <div className="flex items-center gap-3 mb-4">
        <span className="t-mono text-[11px] text-[var(--color-text-muted)] tracking-[0.14em]">
          {number}
        </span>
        <div className="w-8 h-[1px] bg-[var(--color-border)]" />
      </div>
      <h2
        id={id}
        className="font-serif text-[clamp(2.2rem,1.4rem+3vw,4.5rem)] leading-[1.02] tracking-tight font-normal text-[var(--color-text-primary)]"
      >
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-[var(--color-text-secondary)] max-w-[48ch] text-base sm:text-lg leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
};
