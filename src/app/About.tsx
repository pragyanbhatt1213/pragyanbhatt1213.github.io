import React from 'react';
import { siteConfig } from '../config/site';
import { SectionHeading } from '../components/ui/SectionHeading';
import { ArrowLink } from '../components/ui/ArrowLink';
import { GithubIcon } from '../components/ui/GithubIcon';
import { isPlaceholderUrl } from '../lib/links';

export const About: React.FC = () => {
  return (
    <div className="max-w-[var(--container-max)] mx-auto px-6 sm:px-12 py-16 sm:py-24">
      <SectionHeading
        number="ABOUT / ENGINEERING PHILOSOPHY"
        title={siteConfig.about.heading}
        subtitle="Fourth-year Computer Science student at Vellore Institute of Technology, graduating in 2027."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mt-12">
        {/* Main Prose & Focus Areas */}
        <div className="lg:col-span-8 flex flex-col gap-8 text-[var(--color-text-secondary)] text-base sm:text-lg leading-relaxed">
          {siteConfig.about.bio.map((para, idx) => (
            <p key={idx}>{para}</p>
          ))}

          <div className="mt-4 border-t border-[var(--color-border)] pt-8">
            <h2 className="t-mono text-[11px] text-[var(--color-text-muted)] tracking-[0.16em] mb-4">
              PRIMARY TECHNICAL INTERESTS
            </h2>
            <ul className="flex flex-col gap-4 list-none m-0 p-0 text-[var(--color-text-primary)]">
              {siteConfig.about.interests.map((interest, idx) => (
                <li key={idx} className="flex items-start gap-3.5">
                  <span className="t-mono text-[11px] text-[var(--color-text-muted)] mt-1">
                    0{idx + 1}
                  </span>
                  <span className="text-sm sm:text-base">{interest}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-2 border-t border-[var(--color-border)] pt-8">
            <h2 className="t-mono text-[11px] text-[var(--color-text-muted)] tracking-[0.16em] mb-2">
              CURRENT FOCUS
            </h2>
            <p className="text-[var(--color-text-primary)] text-sm sm:text-base leading-relaxed">
              {siteConfig.about.currentFocus}
            </p>
          </div>
        </div>

        {/* Sidebar: Education, Credentials & Contact */}
        <aside className="lg:col-span-4 flex flex-col gap-6">
          <div className="border border-[var(--color-border)] rounded-lg p-6 bg-[var(--color-background-secondary)]">
            <span className="t-mono text-[10px] text-[var(--color-text-muted)] tracking-[0.16em] block mb-3">
              EDUCATION & ACADEMICS
            </span>
            <div className="flex flex-col gap-2">
              <h3 className="font-serif text-xl text-[var(--color-text-primary)] font-normal leading-snug">
                Vellore Institute of Technology
              </h3>
              <p className="text-xs t-mono text-[var(--color-text-secondary)]">
                B.Tech · Computer Science & Engineering
              </p>
              <div className="mt-3 pt-3 border-t border-[var(--color-border)] flex justify-between items-center text-[10.5px] t-mono text-[var(--color-text-muted)]">
                <span>STATUS: 4TH YEAR</span>
                <span className="text-[var(--color-text-primary)]">GRADUATION: 2027</span>
              </div>
            </div>
          </div>

          <div className="border border-[var(--color-border)] rounded-lg p-6 bg-[var(--color-background-secondary)]">
            <span className="t-mono text-[11px] text-[var(--color-text-muted)] block mb-4">
              EXTERNAL PROFILES & DOCUMENTS
            </span>
            <div className="flex flex-col gap-3">
              {!isPlaceholderUrl(siteConfig.contact.github) && (
                <a
                  href={siteConfig.contact.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="t-mono text-xs text-[var(--color-text-primary)] hover:border-[var(--color-text-primary)] border border-[var(--color-border)] p-3 rounded bg-[var(--color-surface)] transition-colors flex justify-between items-center"
                >
                  <span className="flex items-center gap-2">
                    <GithubIcon size={14} />
                    <span>GITHUB REPOSITORIES</span>
                  </span>
                  <span>↗</span>
                </a>
              )}

              {!isPlaceholderUrl(siteConfig.contact.linkedin) && (
                <a
                  href={siteConfig.contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="t-mono text-xs text-[var(--color-text-primary)] hover:border-[var(--color-text-primary)] border border-[var(--color-border)] p-3 rounded bg-[var(--color-surface)] transition-colors flex justify-between items-center"
                >
                  <span>LINKEDIN NETWORK</span>
                  <span>↗</span>
                </a>
              )}

              {!isPlaceholderUrl(siteConfig.contact.resume) && (
                <a
                  href={siteConfig.contact.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="t-mono text-xs text-[var(--color-text-primary)] hover:border-[var(--color-text-primary)] border border-[var(--color-border)] p-3 rounded bg-[var(--color-surface)] transition-colors flex justify-between items-center"
                >
                  <span>RÉSUMÉ REPOSITORY</span>
                  <span>↗</span>
                </a>
              )}
            </div>
          </div>

          <div className="p-6 border border-[var(--color-border)] rounded-lg bg-[var(--color-surface)]">
            <span className="t-mono text-[10px] text-[var(--color-text-muted)] block mb-2">
              COLLABORATION
            </span>
            <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed mb-4">
              Interested in thoughtful engineering conversations, systems architecture, and turning ideas into working code.
            </p>
            <ArrowLink to="/contact">GET IN TOUCH</ArrowLink>
          </div>
        </aside>
      </div>
    </div>
  );
};
