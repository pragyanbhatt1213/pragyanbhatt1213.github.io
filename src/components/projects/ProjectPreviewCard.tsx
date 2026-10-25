import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Project } from '../../types/project';
import { TechList } from '../ui/TechList';
import { GithubIcon } from '../ui/GithubIcon';
import { MiniatureSchematic } from './visualizations/MiniatureSchematic';
import { isPlaceholderUrl } from '../../lib/links';

interface ProjectPreviewCardProps {
  project: Project;
}

export const ProjectPreviewCard: React.FC<ProjectPreviewCardProps> = ({ project }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <article
      className="group relative border-t border-[var(--color-border)] pt-10 sm:pt-14 pb-4 transition-colors duration-300 hover:border-[var(--color-border-strong)]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column: Number, Title, Description, Tech, Action */}
        <div className="lg:col-span-6 flex flex-col items-start">
          {/* Number & dynamic hairline marker */}
          <div className="flex items-center gap-3 mb-3">
            <span className="t-mono text-[11px] text-[var(--color-text-muted)] tracking-[0.16em]">
              {project.number} / SELECTED
            </span>
            <div className="w-8 h-[1px] bg-[var(--color-border)] group-hover:w-16 group-hover:bg-[var(--color-text-primary)] transition-all duration-500 ease-out" />
          </div>

          {/* Project Title */}
          <h3 className="font-serif text-[clamp(2.4rem,1.4rem+3.5vw,4.5rem)] leading-[1.02] tracking-tight font-normal text-[var(--color-text-primary)] transition-transform duration-300 ease-out group-hover:translate-x-2">
            <Link
              to={`/work/${project.slug}`}
              className="outline-none hover:text-[var(--color-text-primary)] focus-visible:ring-1 focus-visible:ring-[var(--color-text-primary)] rounded"
            >
              {project.title}
            </Link>
          </h3>

          {/* 1 concise description */}
          <p className="mt-3 text-[var(--color-text-secondary)] text-sm sm:text-base leading-relaxed max-w-[46ch]">
            {project.shortDescription}
          </p>

          {/* Verified technology tags */}
          <div className="mt-5">
            <TechList technologies={project.technologies} />
          </div>

          {/* Action Row */}
          <div className="mt-7 flex flex-wrap items-center gap-4 sm:gap-6">
            <Link
              to={`/work/${project.slug}`}
              className="inline-flex items-center gap-2 px-4 py-2 rounded bg-[var(--color-surface)] border border-[var(--color-border-strong)] text-[var(--color-text-primary)] hover:border-[var(--color-text-primary)] hover:bg-[var(--color-background-secondary)] transition-all t-mono text-xs tracking-wider font-medium shadow-[0_2px_8px_rgba(0,0,0,0.25)]"
              aria-label={`Open case study for ${project.title}`}
            >
              <span>OPEN CASE STUDY</span>
              <span aria-hidden="true">→</span>
            </Link>

            {project.repoUrl && !isPlaceholderUrl(project.repoUrl) && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:border-[var(--color-border-strong)] hover:bg-[var(--color-surface)] transition-all t-mono text-xs tracking-wider"
                aria-label={`${project.title} repository on GitHub (opens in new tab)`}
              >
                <GithubIcon size={14} />
                <span>GITHUB REPOSITORY ↗</span>
              </a>
            )}
          </div>
        </div>

        {/* Right Column: Distinctive Miniature Schematic */}
        <div className="lg:col-span-6 w-full">
          <Link
            to={`/work/${project.slug}`}
            className="block outline-none cursor-pointer focus-visible:ring-1 focus-visible:ring-[var(--color-text-primary)] rounded-lg"
            tabIndex={-1}
            aria-hidden="true"
          >
            <MiniatureSchematic slug={project.slug} isHovered={isHovered} />
          </Link>
        </div>
      </div>
    </article>
  );
};
