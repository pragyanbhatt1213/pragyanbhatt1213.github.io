import React, { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { siteConfig } from '../../config/site';
import { isPlaceholderUrl } from '../../lib/links';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  projectCount?: number;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  onClose,
  projectCount,
}) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const location = useLocation();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      closeButtonRef.current?.focus();

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };

      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const links = [
    {
      label: 'Work',
      count: projectCount !== undefined ? `[${String(projectCount).padStart(2, '0')}]` : undefined,
      href: '/work',
    },
    {
      label: 'Daily Log',
      href: '/notes',
    },
    { label: 'Learning History', href: '/notes/history' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Navigation Menu"
      className="fixed inset-0 z-[var(--z-menu,50)] bg-[var(--color-overlay)] backdrop-blur-xl flex flex-col justify-between p-6 sm:p-10 animate-fade-in"
    >
      {/* Top bar with initials and close button */}
      <div className="flex items-center justify-between border-b border-[var(--color-border)] pb-6">
        <div className="flex items-center gap-3">
          <span className="font-serif text-[28px]">{siteConfig.initials}</span>
          <span className="t-mono text-[10px] text-[var(--color-text-secondary)]">
            SOFTWARE ENGINEER
          </span>
        </div>
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          className="w-11 h-11 flex items-center justify-center border border-[var(--color-border)] rounded text-[var(--color-text-primary)] hover:border-[var(--color-border-strong)] transition-colors cursor-pointer"
          aria-label="Close menu"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      {/* Main stacked links in large serif */}
      <nav className="my-auto py-8">
        <ul className="flex flex-col gap-6 list-none m-0 p-0">
          {links.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <li key={item.label} className="border-b border-[var(--color-border)] pb-5">
                <Link
                  to={item.href}
                  onClick={onClose}
                  className={`font-serif text-[38px] sm:text-[48px] tracking-tight block transition-transform duration-200 hover:translate-x-2 ${
                    isActive ? 'text-[var(--color-text-primary)]' : 'text-[var(--color-text-secondary)]'
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer metadata & social links */}
      <div className="pt-6 border-t border-[var(--color-border)] flex flex-wrap justify-between items-center gap-4">
        <span className="t-mono text-[11px] text-[var(--color-text-muted)]">
          {siteConfig.annotations.version}
        </span>
        <div className="flex gap-5">
          {!isPlaceholderUrl(siteConfig.contact.github) ? (
            <a
              href={siteConfig.contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="t-mono text-[11px] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
            >
              GitHub
            </a>
          ) : (
            <Link
              to="/contact"
              onClick={onClose}
              className="t-mono text-[11px] text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]"
            >
              GitHub [Config]
            </Link>
          )}

          {!isPlaceholderUrl(siteConfig.contact.linkedin) ? (
            <a
              href={siteConfig.contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="t-mono text-[11px] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
            >
              LinkedIn
            </a>
          ) : (
            <Link
              to="/contact"
              onClick={onClose}
              className="t-mono text-[11px] text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]"
            >
              LinkedIn [Config]
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};
