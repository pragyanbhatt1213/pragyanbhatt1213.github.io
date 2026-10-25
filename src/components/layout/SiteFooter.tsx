import React from 'react';
import { siteConfig } from '../../config/site';
import { isPlaceholderUrl } from '../../lib/links';

interface SiteFooterProps {
  className?: string;
}

export const SiteFooter: React.FC<SiteFooterProps> = ({ className = '' }) => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={`w-full border-t border-[var(--color-border)] py-8 px-6 sm:px-12 mt-24 ${className}`}>
      <div className="max-w-[var(--container-max)] mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div className="flex items-center gap-4">
          <span className="font-serif text-[22px]">{siteConfig.initials}</span>
          <span className="w-[1px] h-4 bg-[var(--color-border)]" />
          <span className="t-mono text-[11px] text-[var(--color-text-muted)]">
            © {currentYear} {siteConfig.name}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-6 sm:gap-8">
          {!isPlaceholderUrl(siteConfig.contact.github) ? (
            <a
              href={siteConfig.contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="t-mono text-[11px] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
            >
              GitHub
            </a>
          ) : (
            <a
              href="/contact"
              className="t-mono text-[11px] text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors"
              title="GitHub link pending configuration"
            >
              GitHub [Config]
            </a>
          )}
          {!isPlaceholderUrl(siteConfig.contact.linkedin) ? (
            <a
              href={siteConfig.contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="t-mono text-[11px] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
            >
              LinkedIn
            </a>
          ) : (
            <a
              href="/contact"
              className="t-mono text-[11px] text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors"
              title="LinkedIn link pending configuration"
            >
              LinkedIn [Config]
            </a>
          )}
          <button
            type="button"
            onClick={scrollToTop}
            className="t-mono text-[11px] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors cursor-pointer"
          >
            Back to top ↑
          </button>
        </div>

        <div className="t-mono text-[11px] text-[var(--color-text-muted)]">
          {siteConfig.annotations.version} · {siteConfig.annotations.tagline}
        </div>
      </div>
    </footer>
  );
};
