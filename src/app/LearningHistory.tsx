import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { getDailyLearningEntries } from '../lib/learning';
import { ActivityGrid } from '../components/notes/ActivityGrid';
import { DailyLearningTimeline } from '../components/notes/DailyLearningTimeline';
import { SectionHeading } from '../components/ui/SectionHeading';
import { ArrowLink } from '../components/ui/ArrowLink';

export const LearningHistory: React.FC = () => {
  const [searchParams] = useSearchParams();
  const learningEntries = getDailyLearningEntries();

  const [selectedDate, setSelectedDate] = useState<string>(() => {
    return searchParams.get('date') || '';
  });

  const handleSelectDate = (date: string) => {
    setSelectedDate(date);
    const el = document.getElementById(`log-${date}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <div className="max-w-[var(--container-max)] mx-auto px-6 sm:px-12 py-16 sm:py-24">
      {/* Breadcrumb */}
      <div className="flex items-center gap-3 mb-8 text-xs t-mono text-[var(--color-text-muted)]">
        <Link to="/notes" className="hover:text-[var(--color-text-primary)] transition-colors">
          DAILY LOG
        </Link>
        <span>/</span>
        <span className="text-[var(--color-text-primary)]">LEARNING HISTORY</span>
      </div>

      <SectionHeading
        number="PROGRESSION"
        title="Learning History"
        subtitle="Chronological record of daily technical investigation, DSA problem solving, systems reading, and practical experimentation."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mt-12">
        {/* Main Column */}
        <div className="lg:col-span-7 flex flex-col gap-14">
          <section>
            <div className="flex items-center justify-between pb-3 border-b border-[var(--color-border)] mb-6">
              <h2 className="t-mono text-[11px] text-[var(--color-text-muted)] tracking-[0.16em]">
                DAILY LEARNING TIMELINE
              </h2>
              <span className="t-mono text-[9.5px] text-[var(--color-text-secondary)]">
                SOURCE: CONTENT/LEARNING/DAILY-LOG.MD
              </span>
            </div>

            <DailyLearningTimeline
              entries={learningEntries}
              selectedDate={selectedDate}
              onSelectDate={handleSelectDate}
            />
          </section>
        </div>

        {/* Sidebar */}
        <aside className="lg:col-span-5 flex flex-col gap-8">
          <div className="border border-[var(--color-border)] rounded-lg p-6 bg-[var(--color-background-secondary)]">
            <ActivityGrid
              selectedDate={selectedDate}
              onSelectDate={handleSelectDate}
            />
          </div>

          <div className="p-6 border border-[var(--color-border)] rounded-lg bg-[var(--color-surface)]">
            <span className="t-mono text-[10px] text-[var(--color-text-muted)] block mb-2 tracking-[0.14em]">
              RECORDING CRITERIA
            </span>
            <ul className="m-0 pl-3.5 list-disc space-y-1.5 text-xs text-[var(--color-text-secondary)]">
              <li>Only explicitly recorded bullet points are tracked.</li>
              <li>Multiple entries on the same day count as one active day.</li>
              <li>DSA problem counts are parsed from numeric counts.</li>
            </ul>
          </div>
        </aside>
      </div>

      <div className="mt-20 pt-8 border-t border-[var(--color-border)] flex justify-between items-center">
        <ArrowLink to="/notes">BACK TO DAILY LOG</ArrowLink>
        <ArrowLink to="/work">VIEW PROJECTS →</ArrowLink>
      </div>
    </div>
  );
};
