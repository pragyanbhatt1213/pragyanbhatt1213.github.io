import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { siteConfig } from '../../config/site';
import { getProjectCounts, formatCount, getProjectBySlug } from '../../lib/content';
import { MobileMenu } from './MobileMenu';
import { GithubIcon } from '../ui/GithubIcon';

interface SiteHeaderProps {
  isHeroHeader?: boolean;
}

export const SiteHeader: React.FC<SiteHeaderProps> = ({ isHeroHeader = false }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolledPastHero, setIsScrolledPastHero] = useState(false);
  const location = useLocation();

  const isHome = location.pathname === '/';
  const { publishedCount } = getProjectCounts();

  useEffect(() => {
    if (!isHome || isHeroHeader) return;

    const handleScroll = () => {
      const scrolled = window.scrollY > 360;
      setIsScrolledPastHero(scrolled);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHome, isHeroHeader]);

  // Derive sub-route breadcrumb
  let breadcrumb: { parent: string; parentHref: string; current: string } | null = null;
  const path = location.pathname;

  if (path.startsWith('/work/') && path !== '/work') {
    const slug = path.replace('/work/', '');
    const proj = getProjectBySlug(slug);
    breadcrumb = {
      parent: 'WORK',
      parentHref: '/work',
      current: proj ? proj.title.toUpperCase() : slug.toUpperCase(),
    };
  } else if (path.startsWith('/notes')) {
    if (path === '/notes/history') {
      breadcrumb = {
        parent: 'LOG',
        parentHref: '/notes',
        current: 'TIMELINE',
      };
    }
  }

  const navItems = [
    { label: 'WORK', count: formatCount(publishedCount), href: '/work', hash: '#work' },
    { label: 'ABOUT', count: null, href: '/about', hash: '#about' },
    { label: 'CONTACT', count: null, href: '/contact', hash: '#contact' },
    { label: 'LOG', count: null, href: '/notes', hash: '#notes' },
  ];

  // Styling rules
  let headerClasses = '';
  if (isHeroHeader) {
    headerClasses = 'absolute top-0 left-0 right-0 flex items-center justify-between px-6 sm:px-9 py-6 sm:py-8 z-[var(--z-header,4)]';
  } else if (isHome) {
    headerClasses = `fixed top-0 left-0 right-0 flex items-center justify-between px-6 sm:px-9 py-4 bg-[var(--color-background)]/90 backdrop-blur-md border-b border-[var(--color-border)] z-50 transition-all duration-300 ${
      isScrolledPastHero ? 'translate-y-0 opacity-100 pointer-events-auto' : '-translate-y-full opacity-0 pointer-events-none'
    }`;
  } else {
    headerClasses = 'sticky top-0 left-0 right-0 flex items-center justify-between px-6 sm:px-9 py-4 bg-[var(--color-background)]/90 backdrop-blur-md border-b border-[var(--color-border)] z-50';
  }

  return (
    <>
      <header className={headerClasses} role="banner">
        {/* Monogram, descriptor & contextual breadcrumb */}
        <div className="flex items-center gap-4">
          <Link
            to="/"
            className="flex items-center gap-3.5 text-inherit outline-none group"
            aria-label={`${siteConfig.name} - Home`}
          >
            <span className="font-serif text-[26px] leading-none tracking-tight group-hover:text-[var(--color-text-primary)] transition-colors">
              {siteConfig.initials}
            </span>
            <span className="hidden sm:block w-[1px] h-[22px] bg-[var(--color-border-strong)]" />
            <span className="hidden sm:block t-mono text-[9.5px] leading-[1.3] text-[var(--color-text-secondary)] tracking-[0.14em]">
              SOFTWARE
              <br />
              ENGINEER
            </span>
          </Link>

          {/* Contextual Route Breadcrumb */}
          {!isHeroHeader && breadcrumb && (
            <div className="hidden lg:flex items-center gap-2 t-mono text-[10px] text-[var(--color-text-muted)] border-l border-[var(--color-border)] pl-4 ml-1">
              <Link to={breadcrumb.parentHref} className="hover:text-[var(--color-text-primary)] transition-colors">
                {breadcrumb.parent}
              </Link>
              <span>/</span>
              <span className="text-[var(--color-text-primary)] font-medium max-w-[20ch] truncate">
                {breadcrumb.current}
              </span>
            </div>
          )}
        </div>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-7" aria-label="Primary Navigation">
          <ul className="flex items-center gap-6 lg:gap-7 m-0 p-0 list-none">
            {navItems.map((item) => {
              const isActive =
                location.pathname === item.href ||
                (item.href === '/work' && location.pathname.startsWith('/work/')) ||
                (item.href === '/notes' && location.pathname.startsWith('/notes/')) ||
                (isHome && location.hash === item.hash);

              return (
                <li key={item.label}>
                  <Link
                    to={isHome && !isScrolledPastHero ? item.hash : item.href}
                    className={`t-mono text-[11px] lg:text-[11.5px] tracking-[0.14em] hairline-link flex items-center gap-1.5 transition-colors duration-200 ${
                      isActive
                        ? 'text-[var(--color-text-primary)] active font-medium'
                        : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
                    }`}
                  >
                    <span>{item.label}</span>
                    {item.count && (
                      <span className="text-[9.5px] text-[var(--color-text-muted)] opacity-80 group-hover:opacity-100">
                        [{item.count}]
                      </span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="w-[1px] h-3.5 bg-[var(--color-border)] ml-1" />

          {/* GitHub small icon link */}
          <a
            href={siteConfig.contact.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors p-1"
            aria-label="GitHub Profile (opens in new tab)"
            title="GitHub Profile"
          >
            <GithubIcon size={16} />
          </a>

          {/* Current location solid dot */}
          <span
            className="w-[5px] h-[5px] rounded-full bg-[var(--color-text-primary)] opacity-85 ml-1"
            title="Navigation active"
            aria-hidden="true"
          />
        </nav>

        {/* Mobile menu toggle */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(true)}
          className="md:hidden flex items-center justify-center w-10 h-10 text-[var(--color-text-primary)] border border-[var(--color-border)] rounded hover:border-[var(--color-border-strong)] transition-colors cursor-pointer"
          aria-label="Open menu"
          aria-expanded={mobileMenuOpen}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <line x1="3" y1="7" x2="21" y2="7" />
            <line x1="3" y1="17" x2="21" y2="17" />
          </svg>
        </button>
      </header>

      {/* Accessible mobile drawer dialog */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        projectCount={publishedCount}
      />
    </>
  );
};
