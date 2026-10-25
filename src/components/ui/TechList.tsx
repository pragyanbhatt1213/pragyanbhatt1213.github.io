import React from 'react';

interface TechListProps {
  technologies: string[];
  className?: string;
}

export const TechList: React.FC<TechListProps> = ({ technologies, className = '' }) => {
  return (
    <div
      className={`flex flex-wrap items-center gap-x-2.5 gap-y-1.5 font-mono text-[11px] sm:text-[11.5px] tracking-[0.14em] uppercase ${className}`}
      aria-label="Technology stack"
    >
      {technologies.map((tech, idx) => (
        <span key={tech} className="inline-flex items-center">
          <span className="text-[#d8d5cd] font-normal hover:text-[#f3f0e8] transition-colors">
            {tech}
          </span>
          {idx < technologies.length - 1 && (
            <span className="ml-2.5 text-[var(--color-text-muted)] opacity-60 select-none" aria-hidden="true">
              /
            </span>
          )}
        </span>
      ))}
    </div>
  );
};
