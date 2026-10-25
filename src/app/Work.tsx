import React, { useState, useMemo } from 'react';
import { getProjects, getAllProjectsIncludingUnpublished, getProjectCounts, formatCount } from '../lib/content';
import { ProjectIndexRow } from '../components/projects/ProjectIndexRow';
import { SectionHeading } from '../components/ui/SectionHeading';
import { ArrowLink } from '../components/ui/ArrowLink';
import { Reveal } from '../components/ui/Reveal';

type DomainFilter = 'all' | 'backend' | 'systems' | 'data' | 'retrieval';

export const Work: React.FC = () => {
  const [domainFilter, setDomainFilter] = useState<DomainFilter>('all');
  const publishedProjects = getProjects();
  const allProjects = getAllProjectsIncludingUnpublished();
  const counts = getProjectCounts();

  const displayedProjects = useMemo(() => {
    if (domainFilter === 'all') return publishedProjects;
    return publishedProjects.filter((p) => {
      const techs = p.technologies.map((t) => t.toLowerCase());
      switch (domainFilter) {
        case 'backend':
          return techs.some((t) => ['go', 'fiber', 'django', 'postgresql', 'redis'].includes(t));
        case 'systems':
          return techs.some((t) => ['flutter', 'kotlin', 'swift', 'hive', 'docker', 'supabase'].includes(t));
        case 'data':
          return techs.some((t) => ['pandas', 'numpy', 'reportlab', 'django'].includes(t));
        case 'retrieval':
          return techs.some((t) => ['langchain', 'together ai', 'chromadb', 'huggingface', 'embeddings', 'llms'].includes(t));
        default:
          return true;
      }
    });
  }, [domainFilter, publishedProjects]);

  const filters: { key: DomainFilter; label: string; count: number }[] = [
    { key: 'all', label: 'ALL', count: counts.publishedCount },
    { key: 'backend', label: 'BACKEND', count: counts.backendCount },
    { key: 'systems', label: 'SYSTEMS & MOBILE', count: counts.systemsCount },
    { key: 'data', label: 'DATA & ANALYTICS', count: counts.dataCount },
    { key: 'retrieval', label: 'AI & RETRIEVAL', count: counts.retrievalCount },
  ];

  return (
    <div className="max-w-[var(--container-max)] mx-auto px-6 sm:px-12 py-16 sm:py-24">
      {/* Header with dynamic count */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <SectionHeading
          number={`SELECTED WORK / ${formatCount(counts.publishedCount)}`}
          title="Project Index"
          subtitle="Architectural case studies, infrastructure prototypes, and systems implementations."
          className="mb-0"
        />
      </div>

      {/* Domain Filter Tabs */}
      <div className="flex items-center gap-1.5 flex-wrap border-b border-[var(--color-border)] pb-4 mb-0">
        {filters.map((f) => (
          <button
            key={f.key}
            type="button"
            onClick={() => setDomainFilter(f.key)}
            aria-pressed={domainFilter === f.key}
            className={`px-3 py-1.5 text-[10.5px] t-mono tracking-[0.14em] rounded transition-colors duration-200 cursor-pointer ${
              domainFilter === f.key
                ? 'bg-[var(--color-border-strong)] text-[var(--color-text-primary)] font-medium'
                : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface)]'
            }`}
          >
            {f.label} ({formatCount(f.count, 1)})
          </button>
        ))}
      </div>

      {/* Result status */}
      <div className="py-3 flex justify-between items-center text-[10px] t-mono text-[var(--color-text-muted)] tracking-[0.12em]">
        <span>
          SHOWING {displayedProjects.length} OF {counts.totalCount} PROJECTS
        </span>
        {domainFilter !== 'all' && (
          <button
            type="button"
            onClick={() => setDomainFilter('all')}
            className="text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors cursor-pointer underline underline-offset-4 decoration-[var(--color-border)]"
          >
            CLEAR FILTER
          </button>
        )}
      </div>

      {/* Project List */}
      <div className="border-t border-[var(--color-border)]">
        {displayedProjects.length > 0 ? (
          displayedProjects.map((project) => (
            <Reveal key={project.id}>
              <ProjectIndexRow project={project} />
            </Reveal>
          ))
        ) : (
          <div className="py-20 text-center border-b border-[var(--color-border)]">
            <span className="t-mono text-[11px] text-[var(--color-text-muted)] block mb-2">
              NO PROJECTS MATCHED THIS FILTER
            </span>
            <p className="text-[var(--color-text-secondary)] text-sm max-w-[40ch] mx-auto mb-4">
              Try selecting a different domain or clearing the filter to view all projects.
            </p>
            <button
              type="button"
              onClick={() => setDomainFilter('all')}
              className="t-mono text-xs px-4 py-2 border border-[var(--color-border-strong)] rounded text-[var(--color-text-primary)] hover:bg-[var(--color-border)] transition-colors cursor-pointer"
            >
              VIEW ALL PROJECTS
            </button>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="mt-16 pt-8 border-t border-[var(--color-border)] flex justify-between items-center text-xs t-mono text-[var(--color-text-muted)]">
        <span>PROJECTS HONESTLY VERIFIED AGAINST SOURCE CODE</span>
        <ArrowLink to="/contact">REQUEST CODEWALK</ArrowLink>
      </div>
    </div>
  );
};
