import React from 'react';
import { HeroSection } from '../components/hero/HeroSection';
import { ProjectShowcase } from '../components/projects/ProjectShowcase';
import { ActivityGrid } from '../components/notes/ActivityGrid';
import { SectionHeading } from '../components/ui/SectionHeading';
import { ArrowLink } from '../components/ui/ArrowLink';
import { Reveal } from '../components/ui/Reveal';
import { GithubIcon } from '../components/ui/GithubIcon';
import { Mail } from 'lucide-react';
import { siteConfig } from '../config/site';
import { getFeaturedProjects, getProjectCounts, formatCount } from '../lib/content';
import { getDailyLearningEntries } from '../lib/learning';
import { isPlaceholderEmail, isPlaceholderUrl } from '../lib/links';

export const Home: React.FC = () => {
  const featuredProjects = getFeaturedProjects();
  const learningEntries = getDailyLearningEntries();
  const recentLearning = learningEntries.slice(0, 3);
  const projectCounts = getProjectCounts();

  return (
    <div className="w-full">
      {/* 01 — Signature Hero Section with Nanda Devi Massif */}
      <HeroSection />

      <div className="max-w-[var(--container-max)] mx-auto px-6 sm:px-12">
        {/* 02 — Selected Work Preview (Top 3 Projects in Asymmetric Layout) */}
        <section id="work" className="py-16 sm:py-24" aria-labelledby="work-heading">
          <SectionHeading
            id="work-heading"
            number="01 / SELECTED WORK"
            title="Things I’ve built."
            subtitle="Selected projects exploring backend systems, application architecture, data analysis, and retrieval-based AI."
          />

          <ProjectShowcase projects={featuredProjects} />

          <div className="mt-14 pt-8 border-t border-[var(--color-border)] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <span className="t-mono text-[11px] text-[var(--color-text-muted)] tracking-wider">
              {formatCount(featuredProjects.length)} FEATURED / {formatCount(projectCounts.publishedCount)} TOTAL ARCHITECTURE CASE STUDIES
            </span>
            <ArrowLink to="/work">{`VIEW ALL PROJECTS [${formatCount(projectCounts.publishedCount)}]`}</ArrowLink>
          </div>
        </section>

        {/* 03 — Compact About Section (Asymmetric Editorial Composition) */}
        <section id="about" className="py-20 sm:py-28 border-t border-[var(--color-border)]" aria-labelledby="about-heading">
          <SectionHeading
            id="about-heading"
            number="02 / ABOUT"
            title={siteConfig.about.heading}
            subtitle="Fourth-year Computer Science student at Vellore Institute of Technology (VIT), graduating in 2027."
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mt-8">
            <div className="lg:col-span-7 flex flex-col gap-6 text-[var(--color-text-secondary)] text-base sm:text-lg leading-relaxed">
              {siteConfig.about.bio.map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}

              <div className="pt-4 flex flex-wrap gap-4 items-center">
                <ArrowLink to="/about">ABOUT THE ENGINEER</ArrowLink>
              </div>
            </div>

            <div className="lg:col-span-5 border border-[var(--color-border)] rounded-lg p-6 sm:p-8 bg-[var(--color-background-secondary)] flex flex-col gap-5">
              <span className="t-mono text-[10px] text-[var(--color-text-muted)] tracking-[0.16em]">
                EDUCATION & ENGINEERING INTERESTS
              </span>

              <div>
                <h3 className="font-serif text-2xl text-[var(--color-text-primary)] font-normal">
                  Vellore Institute of Technology
                </h3>
                <p className="t-mono text-xs text-[var(--color-text-secondary)] mt-1">
                  B.Tech · Computer Science & Engineering · Class of 2027
                </p>
              </div>

              <div className="border-t border-[var(--color-border)] pt-4">
                <span className="t-mono text-[10px] text-[var(--color-text-muted)] tracking-[0.14em] block mb-2">
                  AREAS OF FOCUS
                </span>
                <ul className="flex flex-col gap-2 list-none m-0 p-0 text-xs t-mono text-[var(--color-text-primary)]">
                  <li className="flex items-center gap-2">
                    <span className="text-[var(--color-text-muted)]">01</span>
                    <span>Backend Architecture & Caching (Go, Redis, PostgreSQL)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[var(--color-text-muted)]">02</span>
                    <span>Grounded AI & Retrieval Pipelines (Python, LangChain, ChromaDB)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[var(--color-text-muted)]">03</span>
                    <span>Statistical Telemetry & Data Processing (Django, Pandas, PyQt5)</span>
                  </li>
                </ul>
              </div>

              <div className="border-t border-[var(--color-border)] pt-4 flex justify-between items-center text-[10.5px] t-mono text-[var(--color-text-muted)]">
                <span>STATUS: 4TH YEAR</span>
                <span className="text-[var(--color-text-primary)]">GRADUATION: 2027</span>
              </div>
            </div>
          </div>
        </section>

        {/* 04 — Contact Section (Asymmetric Composition, Deliberate Conclusion) */}
        <section id="contact" className="py-24 sm:py-32 border-t border-[var(--color-border)]" aria-labelledby="contact-heading">
          <Reveal>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
              {/* Left Column: Heading, Supporting statement, Inquiries */}
              <div className="lg:col-span-7 flex flex-col items-start">
                <span className="t-mono text-[11px] text-[var(--color-text-muted)] tracking-[0.18em]">
                  03 / CONTACT
                </span>
                <h2
                  id="contact-heading"
                  className="mt-6 font-serif text-[clamp(2.6rem,1.8rem+4vw,5.5rem)] leading-[0.96] tracking-tight font-normal text-[var(--color-text-primary)]"
                >
                  Have something
                  <br />
                  <em className="serif-italic">worth building?</em>
                </h2>

                <p className="mt-6 text-[var(--color-text-secondary)] text-base sm:text-lg max-w-[48ch] leading-relaxed">
                  I'm open to conversations about software engineering, backend systems, application architecture, and interesting technical problems.
                </p>

                <div className="mt-8">
                  <ArrowLink to="/contact">DIRECT INQUIRIES & DETAILS</ArrowLink>
                </div>
              </div>

              {/* Right Column: Verified Professional Profiles & Links */}
              <div className="lg:col-span-5 flex flex-col gap-4 w-full">
                <span className="t-mono text-[10px] text-[var(--color-text-muted)] tracking-[0.16em] mb-1">
                  DIRECT CHANNELS
                </span>

                {!isPlaceholderUrl(siteConfig.contact.github) && (
                  <a
                    href={siteConfig.contact.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 rounded border border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-border-strong)] hover:bg-[var(--color-background-secondary)] transition-all flex items-center justify-between group"
                    aria-label="GitHub Profile (opens in new tab)"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full border border-[var(--color-border)] flex items-center justify-center text-[var(--color-text-primary)]">
                        <GithubIcon size={14} />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-serif text-lg text-[var(--color-text-primary)]">GitHub</span>
                        <span className="t-mono text-[10.5px] text-[var(--color-text-muted)]">github.com/pragyanbhatt1213</span>
                      </div>
                    </div>
                    <span className="t-mono text-xs text-[var(--color-text-secondary)] group-hover:text-[var(--color-text-primary)] transition-colors">↗</span>
                  </a>
                )}

                {!isPlaceholderUrl(siteConfig.contact.linkedin) && (
                  <a
                    href={siteConfig.contact.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 rounded border border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-border-strong)] hover:bg-[var(--color-background-secondary)] transition-all flex items-center justify-between group"
                    aria-label="LinkedIn Profile (opens in new tab)"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full border border-[var(--color-border)] flex items-center justify-center text-[var(--color-text-primary)]">
                        <span className="t-mono text-xs font-bold">in</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="font-serif text-lg text-[var(--color-text-primary)]">LinkedIn</span>
                        <span className="t-mono text-[10.5px] text-[var(--color-text-muted)]">linkedin.com/in/pragyanbhatt99</span>
                      </div>
                    </div>
                    <span className="t-mono text-xs text-[var(--color-text-secondary)] group-hover:text-[var(--color-text-primary)] transition-colors">↗</span>
                  </a>
                )}

                {!isPlaceholderUrl(siteConfig.contact.resume) && (
                  <a
                    href={siteConfig.contact.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 rounded border border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-border-strong)] hover:bg-[var(--color-background-secondary)] transition-all flex items-center justify-between group"
                    aria-label="Resume repository on GitHub (opens in new tab)"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full border border-[var(--color-border)] flex items-center justify-center text-[var(--color-text-primary)]">
                        <span className="t-mono text-[10px] font-semibold">CV</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="font-serif text-lg text-[var(--color-text-primary)]">Résumé</span>
                        <span className="t-mono text-[10.5px] text-[var(--color-text-muted)]">View on GitHub</span>
                      </div>
                    </div>
                    <span className="t-mono text-xs text-[var(--color-text-secondary)] group-hover:text-[var(--color-text-primary)] transition-colors">↗</span>
                  </a>
                )}

                {!isPlaceholderEmail(siteConfig.contact.email) && siteConfig.contact.email.length > 0 && (
                  <a
                    href={`mailto:${siteConfig.contact.email}`}
                    className="p-4 rounded border border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-border-strong)] hover:bg-[var(--color-background-secondary)] transition-all flex items-center justify-between group"
                    aria-label={`Send email to ${siteConfig.contact.email}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full border border-[var(--color-border)] flex items-center justify-center text-[var(--color-text-primary)]">
                        <Mail size={14} />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-serif text-lg text-[var(--color-text-primary)]">Email</span>
                        <span className="t-mono text-[10.5px] text-[var(--color-text-muted)]">{siteConfig.contact.email}</span>
                      </div>
                    </div>
                    <span className="t-mono text-xs text-[var(--color-text-secondary)] group-hover:text-[var(--color-text-primary)] transition-colors">↗</span>
                  </a>
                )}
              </div>
            </div>
          </Reveal>
        </section>

        {/* 04 — Continuous Learning & Daily Log Discovery */}
        <section id="notes" className="py-20 sm:py-28 border-t border-[var(--color-border)]" aria-labelledby="notes-heading">
          <SectionHeading
            id="notes-heading"
            number="04 / CONTINUOUS LEARNING"
            title="Learning is part of the build."
            subtitle="Documenting daily engineering experiments, system internals, and hands-on explorations."
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mt-8">
            {/* Daily Log preview */}
            <div className="lg:col-span-7 flex flex-col">
              <span className="t-mono text-[10px] text-[var(--color-text-muted)] tracking-[0.14em] mb-4">
                RECENT DAILY LOG ENTRIES
              </span>
              {recentLearning.length > 0 ? (
                <div className="border-l border-[var(--color-border)] pl-6 flex flex-col gap-6">
                  {recentLearning.map((entry) => (
                    <div key={entry.date} className="relative">
                      <span className="absolute -left-[31px] top-1.5 w-2 h-2 rounded-full bg-[var(--color-text-primary)] border border-[var(--color-background)]" />
                      <time className="t-mono text-[11px] text-[var(--color-text-muted)]">{entry.date}</time>
                      <ul className="mt-2 space-y-1 list-none p-0 m-0">
                        {entry.activities.slice(0, 3).map((act, idx) => (
                          <li key={idx} className="text-sm text-[var(--color-text-secondary)] flex items-start gap-2">
                            <span className="text-[var(--color-text-muted)] text-[10px] mt-1 select-none">―</span>
                            <span>{act}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-10 px-6 border border-[var(--color-border)] rounded-lg bg-[var(--color-surface)]">
                  <span className="t-mono text-[10px] text-[var(--color-text-muted)] tracking-[0.14em] block mb-2">
                    DAILY LEARNING LOG
                  </span>
                  <p className="text-[var(--color-text-primary)] text-sm font-medium mb-1">
                    No daily learning recorded yet.
                  </p>
                  <p className="text-[var(--color-text-muted)] text-xs leading-relaxed max-w-[42ch]">
                    Tracked via <code className="t-mono text-[11px] text-[var(--color-text-secondary)]">content/learning/daily-log.md</code> starting October 25, 2026.
                  </p>
                </div>
              )}

              <div className="mt-8 flex gap-6">
                <ArrowLink to="/notes">OPEN DAILY LOG →</ArrowLink>
              </div>
            </div>

            {/* 30-Day Activity Grid & Learning History Link */}
            <div className="lg:col-span-5 border border-[var(--color-border)] rounded-lg p-6 sm:p-8 bg-[var(--color-background-secondary)]">
              <span className="t-mono text-[10px] text-[var(--color-text-muted)] tracking-[0.14em] block mb-4">
                ACTIVITY MATRIX / LAST 30 DAYS
              </span>
              <ActivityGrid />
              <div className="mt-6 pt-6 border-t border-[var(--color-border)] flex justify-between items-center">
                <ArrowLink to="/notes/history">VIEW LEARNING HISTORY</ArrowLink>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
