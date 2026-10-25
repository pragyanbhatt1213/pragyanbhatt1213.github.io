import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProjectBySlug, getProjects } from '../lib/content';
import { FlowDiagram } from '../components/projects/visualizations/FlowDiagram';
import { PipelineDiagram } from '../components/projects/visualizations/PipelineDiagram';
import { ChemicalVisualizerDiagram } from '../components/projects/visualizations/ChemicalVisualizerDiagram';
import { VtopPlusDiagram } from '../components/projects/visualizations/VtopPlusDiagram';
import { SentryWalletDiagram } from '../components/projects/visualizations/SentryWalletDiagram';
import { TechList } from '../components/ui/TechList';
import { GithubIcon } from '../components/ui/GithubIcon';
import { ArrowLink } from '../components/ui/ArrowLink';
import { isPlaceholderUrl } from '../lib/links';

export const CaseStudy: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? getProjectBySlug(slug) : undefined;
  const allProjects = getProjects();

  if (!project) {
    return (
      <div className="max-w-[var(--container-max)] mx-auto px-6 sm:px-12 py-24 sm:py-36 text-center flex flex-col items-center">
        <span className="t-mono text-[11px] text-[var(--color-text-muted)] tracking-[0.2em] mb-4">
          ERROR 404 / PROJECT UNRESOLVED
        </span>
        <h1 className="font-serif text-[clamp(2.5rem,1.8rem+5vw,5.5rem)] leading-[0.98] font-normal text-[var(--color-text-primary)]">
          Project not <em className="serif-italic">found.</em>
        </h1>
        <p className="mt-6 text-[var(--color-text-secondary)] text-base sm:text-lg max-w-[44ch] mx-auto leading-relaxed">
          The requested project "{slug}" does not exist in the catalog or has not yet been published.
        </p>
        <div className="mt-10 flex gap-6">
          <ArrowLink to="/work">RETURN TO ALL PROJECTS</ArrowLink>
          <ArrowLink to="/">HOMEPAGE</ArrowLink>
        </div>
      </div>
    );
  }

  const currentIndex = allProjects.findIndex((p) => p.slug === project.slug);
  const prevProject = currentIndex > 0 ? allProjects[currentIndex - 1] : null;
  const nextProject = currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : null;

  return (
    <article className="max-w-[var(--container-max)] mx-auto px-6 sm:px-12 py-16 sm:py-24">
      {/* Breadcrumb Navigation & Back Link */}
      <div className="flex items-center justify-between gap-4 mb-8 text-xs t-mono text-[var(--color-text-muted)]">
        <div className="flex items-center gap-3">
          <Link to="/work" className="hover:text-[var(--color-text-primary)] transition-colors">
            WORK
          </Link>
          <span>/</span>
          <span className="text-[var(--color-text-primary)] font-medium">{project.title.toUpperCase()}</span>
        </div>

        <Link
          to="/work"
          className="hover:text-[var(--color-text-primary)] transition-colors inline-flex items-center gap-1.5"
        >
          <span>← BACK TO ALL PROJECTS</span>
        </Link>
      </div>

      {/* Hero Header */}
      <div className="border-b border-[var(--color-border)] pb-12 mb-12">
        <div className="flex items-center gap-3 mb-4">
          <span className="t-mono text-[11px] text-[var(--color-text-muted)] tracking-[0.16em]">
            {project.number} / CASE STUDY
          </span>
          <div className="w-12 h-[1px] bg-[var(--color-border)]" />
          {project.status && (
            <span className="t-mono text-[10px] text-[var(--color-text-secondary)] border border-[var(--color-border)] px-2 py-0.5 rounded uppercase">
              {project.status}
            </span>
          )}
        </div>

        <h1 className="font-serif text-[clamp(2.8rem,1.8rem+5vw,6rem)] leading-[0.98] font-normal text-[var(--color-text-primary)]">
          {project.title}
        </h1>

        <p className="mt-6 text-[var(--color-text-secondary)] text-lg sm:text-xl max-w-[50ch] leading-relaxed">
          {project.shortDescription}
        </p>

        {/* Action Bar & Tech Stack Rail */}
        <div className="mt-8 pt-8 border-t border-[var(--color-border)] flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex flex-col gap-2">
            <span className="t-mono text-[10px] text-[var(--color-text-muted)] tracking-[0.14em]">
              TECHNOLOGY STACK
            </span>
            <TechList technologies={project.technologies} />
          </div>

          {/* Primary Action Buttons: GitHub Repository & Live Demo */}
          <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
            {project.repoUrl && !isPlaceholderUrl(project.repoUrl) && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded border border-[var(--color-border-strong)] bg-[var(--color-surface)] text-[var(--color-text-primary)] hover:border-[var(--color-text-primary)] hover:bg-[var(--color-background-secondary)] transition-all t-mono text-xs tracking-wider font-medium shadow-[0_2px_8px_rgba(0,0,0,0.3)]"
                aria-label={`View ${project.title} repository on GitHub`}
              >
                <GithubIcon size={16} />
                <span>VIEW GITHUB REPOSITORY ↗</span>
              </a>
            )}

            {project.demoUrl && !isPlaceholderUrl(project.demoUrl) && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded border border-[var(--color-border)] text-[var(--color-text-primary)] hover:border-[var(--color-border-strong)] hover:bg-[var(--color-surface)] transition-colors t-mono text-xs tracking-wider"
              >
                <span>LIVE DEMO ↗</span>
              </a>
            )}

            <Link
              to="/work"
              className="inline-flex items-center gap-1.5 px-3 py-2.5 text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors t-mono text-xs tracking-wider"
            >
              <span>BACK TO WORK</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Architecture & Workflow Visualization Section */}
      <section className="mb-20" aria-label="System architecture diagram">
        <div className="flex items-center justify-between mb-4">
          <h2 className="t-mono text-[11px] text-[var(--color-text-muted)] tracking-[0.16em]">
            SYSTEM TOPOLOGY & DATA FLOW
          </h2>
          <span className="t-mono text-[10.5px] text-[var(--color-text-secondary)]">
            INTERACTIVE SYSTEM VISUALIZATION
          </span>
        </div>

        {project.slug === 'linkforge' && <FlowDiagram />}
        {(project.slug === 'heritage-rag-bot' || project.slug === 'rag-qa') && <PipelineDiagram />}
        {project.slug === 'chemical-equipment-visualizer' && <ChemicalVisualizerDiagram />}
        {project.slug === 'vtop-plus' && <VtopPlusDiagram />}
        {project.slug === 'sentry-wallet' && <SentryWalletDiagram />}
      </section>

      {/* Main Content Grid: Table of Contents & Deep Dive Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Table of Contents sticky rail */}
        <aside className="lg:col-span-3 sticky top-24 border border-[var(--color-border)] rounded p-5 bg-[var(--color-surface)] hidden lg:block">
          <span className="t-mono text-[10px] text-[var(--color-text-muted)] tracking-[0.14em] block mb-4">
            TABLE OF CONTENTS
          </span>
          <ul className="flex flex-col gap-2.5 list-none m-0 p-0">
            {project.caseStudy.map((sec) => (
              <li key={sec.id}>
                <a
                  href={`#${sec.id}`}
                  className="t-mono text-[11px] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors block"
                >
                  {sec.title}
                </a>
              </li>
            ))}
          </ul>
        </aside>

        {/* Case Study Sections (Prose explanations without code blocks) */}
        <div className="lg:col-span-9 flex flex-col gap-14">
          {project.caseStudy.map((sec) => (
            <section key={sec.id} id={sec.id} className="scroll-mt-24 border-b border-[var(--color-border)]/60 pb-12 last:border-b-0">
              <h3 className="font-serif text-[26px] sm:text-[32px] font-normal text-[var(--color-text-primary)] mb-4">
                {sec.title}
              </h3>
              <div className="text-[var(--color-text-secondary)] text-base sm:text-lg leading-relaxed max-w-[65ch] space-y-4 whitespace-pre-line">
                {sec.content}
              </div>
            </section>
          ))}
        </div>
      </div>

      {/* Pager: Navigate Previous / Next with Actual Project Titles */}
      <nav
        className="mt-24 pt-12 border-t border-[var(--color-border)] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6"
        aria-label="Project pager"
      >
        {prevProject ? (
          <Link
            to={`/work/${prevProject.slug}`}
            className="group flex flex-col items-start gap-1"
          >
            <span className="t-mono text-[10px] text-[var(--color-text-muted)] tracking-wider">
              ← PREVIOUS PROJECT
            </span>
            <span className="font-serif text-[22px] text-[var(--color-text-primary)] group-hover:translate-x-1 transition-transform">
              {prevProject.title}
            </span>
          </Link>
        ) : (
          <div />
        )}

        {nextProject && (
          <Link
            to={`/work/${nextProject.slug}`}
            className="group flex flex-col items-end gap-1 ml-auto"
          >
            <span className="t-mono text-[10px] text-[var(--color-text-muted)] tracking-wider">
              NEXT PROJECT →
            </span>
            <span className="font-serif text-[22px] text-[var(--color-text-primary)] group-hover:translate-x-1 transition-transform">
              {nextProject.title}
            </span>
          </Link>
        )}
      </nav>
    </article>
  );
};
