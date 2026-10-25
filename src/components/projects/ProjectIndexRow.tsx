import React from 'react';
import { Link } from 'react-router-dom';
import { Project } from '../../types/project';
import { TechList } from '../ui/TechList';
import { GithubIcon } from '../ui/GithubIcon';
import { isPlaceholderUrl } from '../../lib/links';

interface ProjectIndexRowProps {
  project: Project;
}

export const ProjectIndexRow: React.FC<ProjectIndexRowProps> = ({ project }) => {
  const isAvailable = project.published;

  return (
    <article className="group w-full py-7 sm:py-9 border-b border-[var(--color-border)] flex flex-col lg:flex-row lg:items-center justify-between gap-6 transition-colors hover:border-[var(--color-border-strong)]">
      {/* Left: Number, Title, Description, Tech Stack */}
      <div className="flex items-start sm:items-start gap-4 sm:gap-7 flex-1">
        <span className="t-mono text-[11px] text-[var(--color-text-muted)] min-w-[28px] pt-1">
          {project.number}
        </span>
        <div className="flex flex-col gap-2 flex-1">
          <h3 className="font-serif text-[26px] sm:text-[34px] leading-tight font-normal text-[var(--color-text-primary)] transition-transform duration-300 ease-out group-hover:translate-x-1.5">
            <Link
              to={`/work/${project.slug}`}
              className="outline-none hover:text-[var(--color-text-primary)] focus-visible:ring-1 focus-visible:ring-[var(--color-text-primary)] rounded"
            >
              {project.title}
            </Link>
          </h3>
          <p className="text-[var(--color-text-secondary)] text-sm sm:text-base max-w-[56ch] leading-relaxed">
            {project.shortDescription}
          </p>
          <div className="mt-2">
            <TechList technologies={project.technologies} />
          </div>
        </div>
      </div>

      {/* Right: Prominent Actions (GitHub Link with Icon & Case Study Link) */}
      <div className="flex items-center gap-4 sm:gap-6 self-start lg:self-center pl-11 lg:pl-0 shrink-0">
        {project.repoUrl && !isPlaceholderUrl(project.repoUrl) && (
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded border border-[var(--color-border-strong)] bg-[var(--color-surface)] text-[var(--color-text-primary)] hover:border-[var(--color-text-primary)] hover:bg-[var(--color-background-secondary)] transition-all t-mono text-xs tracking-wider font-medium"
            aria-label={`${project.title} GitHub repository (opens in new tab)`}
          >
            <GithubIcon size={14} />
            <span>GITHUB REPOSITORY ↗</span>
          </a>
        )}

        {isAvailable && (
          <Link
            to={`/work/${project.slug}`}
            className="inline-flex items-center gap-1.5 t-mono text-xs tracking-wider text-[var(--color-text-primary)] hover:translate-x-1 transition-transform hairline-link py-1 font-medium"
            aria-label={`Open case study for ${project.title}`}
          >
            <span>VIEW CASE STUDY</span>
            <span aria-hidden="true">→</span>
          </Link>
        )}
      </div>
    </article>
  );
};
