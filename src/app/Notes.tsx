import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getDailyLearningEntries } from '../lib/learning';
import { ActivityGrid } from '../components/notes/ActivityGrid';
import { DailyLearningTimeline } from '../components/notes/DailyLearningTimeline';
import { SectionHeading } from '../components/ui/SectionHeading';
import { ArrowLink } from '../components/ui/ArrowLink';

export const Notes: React.FC = () => {
  const [searchParams] = useSearchParams();
  const learningEntries = getDailyLearningEntries();

  const [selectedDate, setSelectedDate] = useState<string>(() => {
    return searchParams.get('date') || '';
  });

  const handleSelectDate = (date: string) => {
    setSelectedDate(date);
    setTimeout(() => {
      const el = document.getElementById(`log-${date}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 50);
  };

  return (
    <div className="max-w-[var(--container-max)] mx-auto px-6 sm:px-12 py-16 sm:py-24">
      <SectionHeading
        number="CONTINUOUS LEARNING"
        title="Daily Learning Log"
        subtitle="Chronological engineering journal documenting daily investigations, system internals, and hands-on explorations."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mt-10">
        {/* Daily Learning Log Timeline Column */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          <div className="flex items-center justify-between pb-3 border-b border-[var(--color-border)]">
            <span className="t-mono text-[10px] text-[var(--color-text-muted)] tracking-[0.14em]">
              RECORDED ENTRIES (NEWEST FIRST)
            </span>
            <span className="t-mono text-[10px] text-[var(--color-text-secondary)]">
              SOURCE: CONTENT/LEARNING/DAILY-LOG.MD
            </span>
          </div>

          <DailyLearningTimeline
            entries={learningEntries}
            selectedDate={selectedDate}
            onSelectDate={setSelectedDate}
          />
        </div>

        {/* Sidebar */}
        <aside className="lg:col-span-4 flex flex-col gap-8">
          <div className="border border-[var(--color-border)] rounded-lg p-6 bg-[var(--color-background-secondary)]">
            <ActivityGrid
              selectedDate={selectedDate}
              onSelectDate={handleSelectDate}
            />
            <div className="mt-6 pt-4 border-t border-[var(--color-border)] flex justify-between items-center">
              <ArrowLink to="/notes/history">TIMELINE VIEW</ArrowLink>
            </div>
          </div>

          <div className="p-6 border border-[var(--color-border)] rounded-lg bg-[var(--color-surface)]">
            <span className="t-mono text-[10px] text-[var(--color-text-muted)] block mb-2 tracking-[0.14em]">
              DAILY LOG WORKFLOW
            </span>
            <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed mb-3">
              1. Open <code className="t-mono text-[11px] text-[var(--color-text-primary)]">content/learning/daily-log.md</code>.
            </p>
            <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed mb-3">
              2. Add <code className="t-mono text-[11px] text-[var(--color-text-primary)]">## YYYY-MM-DD</code> with short bullet points.
            </p>
            <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
              3. Commit & push. The site updates automatically.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
};
