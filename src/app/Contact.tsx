import React, { useState } from 'react';
import { Mail } from 'lucide-react';
import { siteConfig } from '../config/site';
import { GithubIcon } from '../components/ui/GithubIcon';
import { isPlaceholderEmail, isPlaceholderUrl } from '../lib/links';

export const Contact: React.FC = () => {
  const hasRealEmail = !isPlaceholderEmail(siteConfig.contact.email) && siteConfig.contact.email.length > 0;
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(siteConfig.contact.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-[var(--container-max)] mx-auto px-6 sm:px-12 py-20 sm:py-32">
      {/* Asymmetric Editorial Composition (Left-Aligned Heading & Narrative, Neatly Arranged Actions) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left Column: Heading and Context */}
        <div className="lg:col-span-6 flex flex-col items-start">
          <span className="t-mono text-[11px] text-[var(--color-text-muted)] tracking-[0.18em]">
            CONTACT / INQUIRIES & COLLABORATION
          </span>

          <h1 className="mt-6 font-serif text-[clamp(2.8rem,1.8rem+5vw,6.5rem)] leading-[0.95] tracking-tight font-normal text-[var(--color-text-primary)]">
            {siteConfig.contact.headlinePrefix}
            <em className="serif-italic">{siteConfig.contact.headlineItalic}</em>
          </h1>

          <p className="mt-8 text-[var(--color-text-secondary)] text-base sm:text-xl max-w-[46ch] leading-relaxed">
            I'm open to conversations about software engineering, backend systems, application architecture, and interesting technical problems.
          </p>

          <div className="mt-12 pt-8 border-t border-[var(--color-border)]/70 w-full">
            <span className="t-mono text-[10.5px] text-[var(--color-text-muted)] tracking-[0.14em]">
              ACADEMIC CONTEXT: VELLORE INSTITUTE OF TECHNOLOGY · CSE '27
            </span>
          </div>
        </div>

        {/* Right Column: Structured Direct Channels */}
        <div className="lg:col-span-6 flex flex-col gap-4 w-full">
          <span className="t-mono text-[11px] text-[var(--color-text-muted)] tracking-[0.16em] mb-2">
            PRIMARY CHANNELS
          </span>

          {/* GitHub Channel */}
          {!isPlaceholderUrl(siteConfig.contact.github) && (
            <a
              href={siteConfig.contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-5 sm:p-6 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-border-strong)] hover:bg-[var(--color-background-secondary)] transition-all flex items-center justify-between group"
              aria-label="GitHub Profile (opens in new tab)"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full border border-[var(--color-border)] flex items-center justify-center text-[var(--color-text-primary)] group-hover:scale-105 transition-transform">
                  <GithubIcon size={18} />
                </div>
                <div className="flex flex-col">
                  <span className="font-serif text-xl text-[var(--color-text-primary)]">GitHub</span>
                  <span className="t-mono text-xs text-[var(--color-text-muted)]">github.com/pragyanbhatt1213</span>
                </div>
              </div>
              <span className="t-mono text-sm text-[var(--color-text-secondary)] group-hover:text-[var(--color-text-primary)] transition-colors">↗</span>
            </a>
          )}

          {/* LinkedIn Channel */}
          {!isPlaceholderUrl(siteConfig.contact.linkedin) && (
            <a
              href={siteConfig.contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-5 sm:p-6 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-border-strong)] hover:bg-[var(--color-background-secondary)] transition-all flex items-center justify-between group"
              aria-label="LinkedIn Profile (opens in new tab)"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full border border-[var(--color-border)] flex items-center justify-center text-[var(--color-text-primary)] group-hover:scale-105 transition-transform">
                  <span className="t-mono text-sm font-bold">in</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-serif text-xl text-[var(--color-text-primary)]">LinkedIn</span>
                  <span className="t-mono text-xs text-[var(--color-text-muted)]">linkedin.com/in/pragyanbhatt99</span>
                </div>
              </div>
              <span className="t-mono text-sm text-[var(--color-text-secondary)] group-hover:text-[var(--color-text-primary)] transition-colors">↗</span>
            </a>
          )}

          {/* Résumé Repository Channel */}
          {!isPlaceholderUrl(siteConfig.contact.resume) && (
            <a
              href={siteConfig.contact.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="p-5 sm:p-6 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-border-strong)] hover:bg-[var(--color-background-secondary)] transition-all flex items-center justify-between group"
              aria-label="Resume repository on GitHub (opens in new tab)"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full border border-[var(--color-border)] flex items-center justify-center text-[var(--color-text-primary)] group-hover:scale-105 transition-transform">
                  <span className="t-mono text-xs font-semibold">CV</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-serif text-xl text-[var(--color-text-primary)]">Résumé</span>
                  <span className="t-mono text-xs text-[var(--color-text-muted)]">Repository on GitHub</span>
                </div>
              </div>
              <span className="t-mono text-sm text-[var(--color-text-secondary)] group-hover:text-[var(--color-text-primary)] transition-colors">↗</span>
            </a>
          )}

          {/* Direct Email Channel */}
          {hasRealEmail && (
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="p-5 sm:p-6 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-border-strong)] hover:bg-[var(--color-background-secondary)] transition-all flex items-center justify-between group"
              aria-label={`Send email to ${siteConfig.contact.email}`}
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full border border-[var(--color-border)] flex items-center justify-center text-[var(--color-text-primary)] group-hover:scale-105 transition-transform">
                  <Mail size={17} />
                </div>
                <div className="flex flex-col">
                  <span className="font-serif text-xl text-[var(--color-text-primary)]">Email</span>
                  <span className="t-mono text-xs text-[var(--color-text-muted)] select-all">{siteConfig.contact.email}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="t-mono text-[10px] px-2.5 py-1 rounded border border-[var(--color-border)] hover:border-[var(--color-border-strong)] bg-[var(--color-background)] hover:bg-[var(--color-surface)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors cursor-pointer"
                  title="Copy email to clipboard"
                  aria-label="Copy email address"
                >
                  {copied ? 'COPIED' : 'COPY'}
                </button>
                <span className="t-mono text-sm text-[var(--color-text-secondary)] group-hover:text-[var(--color-text-primary)] transition-colors">↗</span>
              </div>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
