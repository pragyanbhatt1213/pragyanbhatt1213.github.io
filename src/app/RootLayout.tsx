import React, { useEffect, useState, useMemo } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { SiteHeader } from '../components/layout/SiteHeader';
import { SiteFooter } from '../components/layout/SiteFooter';
import { SkipLink } from '../components/layout/SkipLink';
import { ScrollProgress } from '../components/layout/ScrollProgress';
import { ParticleLandscape } from '../components/hero/landscape/ParticleLandscape';
import { LandscapeVariant } from '../components/hero/landscape/terrain';
import { siteConfig } from '../config/site';
import { getProjectBySlug, getNoteBySlug } from '../lib/content';

function getVariantForPath(pathname: string): LandscapeVariant {
  if (pathname === '/') return 'hero';
  if (pathname === '/work') return 'archive';
  if (pathname.startsWith('/work/')) {
    const slug = pathname.replace('/work/', '');
    const project = getProjectBySlug(slug);
    return project ? 'case-study' : 'not-found';
  }
  if (pathname === '/notes') return 'journal';
  if (pathname === '/notes/history') return 'timeline';
  if (pathname.startsWith('/notes/')) {
    const slug = pathname.replace('/notes/', '');
    const note = getNoteBySlug(slug);
    return note ? 'journal' : 'not-found';
  }
  if (pathname === '/about') return 'quiet';
  if (pathname === '/contact') return 'contact';
  return 'not-found';
}

export const RootLayout: React.FC = () => {
  const location = useLocation();
  const [pageAnnouncement, setPageAnnouncement] = useState('');

  const currentVariant = useMemo(() => getVariantForPath(location.pathname), [location.pathname]);

  // Announce page title to screen readers on route change & scroll to top
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });

    let title = `${siteConfig.name} — Software Engineer`;
    const path = location.pathname;

    if (path === '/work') {
      title = `Project Catalog & Systems Architecture | ${siteConfig.name}`;
    } else if (path.startsWith('/work/')) {
      const slug = path.replace('/work/', '');
      const project = getProjectBySlug(slug);
      title = project ? `${project.title} — Case Study | ${siteConfig.name}` : `Project Not Found | ${siteConfig.name}`;
    } else if (path === '/notes') {
      title = `Field Notes & Engineering Log | ${siteConfig.name}`;
    } else if (path === '/notes/history') {
      title = `Learning History & Activity Timeline | ${siteConfig.name}`;
    } else if (path.startsWith('/notes/')) {
      const slug = path.replace('/notes/', '');
      const note = getNoteBySlug(slug);
      title = note ? `${note.title} — Field Note | ${siteConfig.name}` : `Note Not Found | ${siteConfig.name}`;
    } else if (path === '/about') {
      title = `About & Engineering Philosophy | ${siteConfig.name}`;
    } else if (path === '/contact') {
      title = `Contact & Technical Inquiries | ${siteConfig.name}`;
    }

    document.title = title;
    setPageAnnouncement(`Navigated to ${title}`);
  }, [location.pathname]);

  return (
    <div className="relative min-h-screen flex flex-col justify-between bg-[var(--color-background)] text-[var(--color-text-primary)]">
      {/* 0. Continuous Monochrome Particle-Landscape Host (Persistent across all routes) */}
      <ParticleLandscape variant={currentVariant} />

      {/* 1. Skip Link and Scroll Progress */}
      <SkipLink />
      <ScrollProgress />

      {/* Screen reader polite live region */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {pageAnnouncement}
      </div>

      {/* Persistent site header */}
      <SiteHeader isHeroHeader={false} />

      {/* Main page content with restrained content transition */}
      <main
        id="main-content"
        key={location.pathname}
        className="relative z-10 flex-1 w-full outline-none route-content-transition"
        tabIndex={-1}
      >
        <Outlet />
      </main>

      <SiteFooter className="relative z-10" />
    </div>
  );
};
