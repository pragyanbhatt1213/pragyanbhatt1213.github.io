import React, { useEffect, useRef, useState } from 'react';
import { siteConfig } from '../../config/site';
import { SiteHeader } from '../layout/SiteHeader';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export const HeroSection: React.FC = () => {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const reducedMotion = useReducedMotion();
  const [phase, setPhase] = useState<number>(0);

  useEffect(() => {
    // If reduced motion or session already played, jump to final state
    const hasSeenIntro = sessionStorage.getItem('portfolio_intro_seen');
    if (reducedMotion || hasSeenIntro) {
      setPhase(5);
      return;
    }

    // Sequenced timed entrance
    const timers = [
      setTimeout(() => setPhase(1), 150),
      setTimeout(() => setPhase(2), 500),
      setTimeout(() => setPhase(3), 850),
      setTimeout(() => setPhase(4), 1200),
      setTimeout(() => {
        setPhase(5);
        sessionStorage.setItem('portfolio_intro_seen', 'true');
      }, 1600),
    ];

    return () => timers.forEach(clearTimeout);
  }, [reducedMotion]);

  const isReady = phase >= 1;

  return (
    <section
      className="relative mx-[clamp(10px,1.6vw,24px)] mt-3 sm:mt-5 mb-16 sm:mb-24 min-h-[clamp(580px,88svh,900px)] rounded-[var(--radius-frame-sm)] sm:rounded-[var(--radius-frame)] border border-[var(--color-border)] bg-[var(--color-background-secondary)]/20 backdrop-blur-[0.5px] overflow-hidden contain-paint transition-opacity duration-700 select-none flex flex-col justify-between"
      aria-labelledby="hero-title"
      data-phase={phase}
    >
      {/* 0. Top Header inside hero frame */}
      <div
        className={`transition-opacity duration-1000 ${
          phase >= 4 ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <SiteHeader isHeroHeader={true} />
      </div>

      {/* 1. Optical Frame Reticle Tint (Persistent canvas shines through from RootLayout) */}
      <div
        className={`absolute inset-0 bg-[var(--color-background-secondary)]/15 backdrop-blur-[0.5px] pointer-events-none transition-opacity duration-1000 ${
          isReady ? 'opacity-100' : 'opacity-0'
        }`}
        aria-hidden="true"
      />

      {/* 2. Asymmetric Hero Composition (Left-Aligned, Spaciously Offset from the Nanda Devi Massif) */}
      <div className="relative z-10 px-8 sm:px-14 lg:px-20 my-auto py-24 sm:py-28 max-w-4xl">
        <div
          className={`transition-all duration-1000 ease-out ${
            phase >= 2
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-4'
          }`}
        >
          {/* Academic & Professional Context Label */}
          <div className="flex items-center gap-3 mb-5">
            <span className="w-2 h-2 rounded-full bg-[var(--color-text-primary)] opacity-70" />
            <span className="t-mono text-[11px] text-[var(--color-text-muted)] tracking-[0.18em] uppercase">
              VIT CSE · Class of 2027
            </span>
          </div>

          {/* Primary Name Headline */}
          <h1
            id="hero-title"
            ref={headlineRef}
            className="font-serif text-[clamp(3.2rem,2.2rem+4.8vw,6.8rem)] leading-[0.93] tracking-[-0.025em] font-normal text-[var(--color-text-primary)] select-text drop-shadow-[0_0_24px_rgba(5,5,5,0.95)]"
          >
            Pragyan Bhatt
          </h1>

          {/* Personal Statement */}
          <p className="mt-4 font-serif text-[clamp(1.35rem,1.1rem+1.3vw,2.2rem)] text-[#f0ece1] leading-snug select-text">
            <span>I learn how systems work. </span>
            <em className="serif-italic font-normal">Then I build them.</em>
          </p>

          {/* Purpose of the Website */}
          <p className="mt-5 text-sm sm:text-base text-[var(--color-text-secondary)] leading-relaxed max-w-[54ch] select-text">
            A collection of software projects, engineering decisions, technical experiments, and notes documenting how I learn, build, and understand software systems.
          </p>

          {/* Integrated Functional Navigation Cues */}
          <div className="mt-10 flex flex-wrap items-center gap-6 sm:gap-8 t-mono text-xs tracking-wider">
            <a
              href="#work"
              className="inline-flex items-center gap-2 text-[var(--color-text-primary)] border-b border-[var(--color-text-primary)] pb-1 hover:opacity-80 transition-opacity cursor-pointer font-medium"
            >
              <span>SELECTED WORK</span>
              <span>↓</span>
            </a>
            <a
              href="/about"
              className="inline-flex items-center gap-1.5 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
            >
              <span>ABOUT</span>
              <span>→</span>
            </a>
            <a
              href="/notes"
              className="inline-flex items-center gap-1.5 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
            >
              <span>FIELD NOTES</span>
              <span>→</span>
            </a>
            <a
              href="/contact"
              className="inline-flex items-center gap-1.5 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
            >
              <span>CONTACT</span>
              <span>→</span>
            </a>
          </div>
        </div>
      </div>

      {/* 3. Minimal Hero Footer Rail */}
      <div
        className={`relative z-10 px-8 sm:px-14 lg:px-20 pb-7 pt-4 border-t border-[var(--color-border)]/60 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 transition-opacity duration-1000 ${
          phase >= 5 ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <span className="t-mono text-[10.5px] text-[var(--color-text-muted)] tracking-[0.14em]">
          SYSTEMS · DATABASES · AI RETRIEVAL · CACHING
        </span>

        <a
          href="#work"
          className="t-mono text-[10.5px] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors flex items-center gap-2 group cursor-pointer"
        >
          <span>SCROLL TO EXPLORE WORK</span>
          <span className="group-hover:translate-y-0.5 transition-transform">↓</span>
        </a>
      </div>
    </section>
  );
};
