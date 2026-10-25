import React from 'react';
import { DailyLearningEntry } from '../../types/learning';

interface DailyLearningTimelineProps {
  entries: DailyLearningEntry[];
  selectedDate?: string;
  onSelectDate?: (date: string) => void;
  className?: string;
}

export const DailyLearningTimeline: React.FC<DailyLearningTimelineProps> = ({
  entries,
  selectedDate,
  onSelectDate,
  className = '',
}) => {
  if (entries.length === 0) {
    return (
      <div className={`py-12 px-6 border border-[var(--color-border)] rounded-lg text-center bg-[var(--color-surface)] ${className}`}>
        <span className="t-mono text-[10px] text-[var(--color-text-muted)] tracking-[0.14em] block mb-2">
          DAILY LEARNING LOG
        </span>
        <p className="text-[var(--color-text-primary)] text-sm font-medium mb-1">
          No daily learning recorded yet.
        </p>
        <p className="text-[var(--color-text-muted)] text-xs max-w-[44ch] mx-auto leading-relaxed">
          Add entries under ISO date headings (e.g. <code className="t-mono text-[11px] text-[var(--color-text-secondary)]">## YYYY-MM-DD</code>) with bullet points in <code className="t-mono text-[11px] text-[var(--color-text-secondary)]">content/learning/daily-log.md</code>.
        </p>
      </div>
    );
  }

  return (
    <div className={`border-l border-[var(--color-border)] pl-6 flex flex-col gap-8 ${className}`}>
      {entries.map((entry) => {
        const isSelected = selectedDate === entry.date;

        return (
          <article
            key={entry.date}
            id={`log-${entry.date}`}
            className={`relative transition-all duration-200 ${
              isSelected ? 'p-4 -ml-4 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border-strong)]' : ''
            }`}
          >
            {/* Timeline node */}
            <span
              className={`absolute ${isSelected ? '-left-[21px] top-6' : '-left-[31px] top-1.5'} w-2 h-2 rounded-full border border-[var(--color-background)] ${
                entry.hasActivity ? 'bg-[var(--color-text-primary)]' : 'bg-[var(--color-border)]'
              }`}
            />

            <header className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-3">
                <time
                  dateTime={entry.date}
                  className="t-mono text-[11px] text-[var(--color-text-muted)] tracking-wider"
                >
                  {entry.date}
                </time>
                {typeof entry.dsaCount === 'number' && (
                  <span className="t-mono text-[9.5px] px-2 py-0.5 rounded-[2px] border border-[var(--color-border)] text-[var(--color-text-primary)] bg-[var(--color-background-secondary)]">
                    {entry.dsaCount} DSA {entry.dsaCount === 1 ? 'QUESTION' : 'QUESTIONS'}
                  </span>
                )}
              </div>

              {onSelectDate && (
                <button
                  type="button"
                  onClick={() => onSelectDate(entry.date)}
                  className="t-mono text-[9.5px] text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors cursor-pointer"
                >
                  {isSelected ? 'SELECTED' : 'INSPECT'}
                </button>
              )}
            </header>

            {entry.activities.length > 0 ? (
              <ul className="mt-3 space-y-2 list-none p-0 m-0">
                {entry.activities.map((activity, idx) => (
                  <li
                    key={idx}
                    className="text-sm text-[var(--color-text-secondary)] flex items-start gap-2.5 leading-relaxed"
                  >
                    <span className="text-[var(--color-text-muted)] text-[10px] mt-1 select-none">
                      ―
                    </span>
                    <span>{activity}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-2 text-xs italic text-[var(--color-text-muted)]">
                No specific bullet points recorded for this day.
              </p>
            )}
          </article>
        );
      })}
    </div>
  );
};
