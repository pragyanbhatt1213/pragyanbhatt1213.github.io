import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { buildActivity, ActivityDay } from '../../lib/activity';
import { getDailyLearningEntries } from '../../lib/learning';

interface ActivityGridProps {
  selectedDate?: string;
  onSelectDate?: (date: string) => void;
  className?: string;
}

export const ActivityGrid: React.FC<ActivityGridProps> = ({
  selectedDate,
  onSelectDate,
  className = '',
}) => {
  const navigate = useNavigate();
  const [hoveredDay, setHoveredDay] = useState<ActivityDay | null>(null);

  // Source of truth: content/learning/daily-log.md
  const learningEntries = useMemo(() => getDailyLearningEntries(), []);

  // Compute 30 calendar days dynamically up to today (local time)
  const days: ActivityDay[] = useMemo(
    () => buildActivity(learningEntries, new Date()),
    [learningEntries]
  );

  // Luminance level classes strictly adhering to monochrome palette
  const getLevelStyle = (level: number) => {
    switch (level) {
      case 4:
        return 'bg-[var(--color-text-primary)] border-[var(--color-text-primary)]';
      case 3:
        return 'bg-[var(--color-text-secondary)] border-[var(--color-text-secondary)]';
      case 2:
        return 'bg-[var(--color-border-strong)] border-[var(--color-border-strong)]';
      case 1:
        return 'bg-[var(--color-border)] border-[var(--color-border)]';
      default:
        return 'bg-transparent border-[var(--color-border)] opacity-50 hover:border-[var(--color-border-strong)]';
    }
  };

  const activeDaysCount = days.filter((d) => d.hasActivity).length;
  const activeInspectionDay = hoveredDay || (selectedDate ? days.find((d) => d.date === selectedDate) : null);

  const handleCellClick = (date: string) => {
    if (onSelectDate) {
      onSelectDate(date);
    } else {
      navigate(`/notes/history?date=${date}`);
    }
  };

  return (
    <div className={`flex flex-col gap-3.5 ${className}`}>
      <div className="flex items-center justify-between">
        <span className="t-mono text-[10.5px] text-[var(--color-text-muted)] tracking-[0.14em]">
          LAST 30 DAYS ACTIVITY
        </span>
        <span className="t-mono text-[10px]">
          {activeDaysCount === 0 ? (
            <span className="text-[var(--color-text-muted)]">No learning activity recorded yet.</span>
          ) : (
            <span className="text-[var(--color-text-secondary)]">
              {activeDaysCount} active {activeDaysCount === 1 ? 'day' : 'days'}
            </span>
          )}
        </span>
      </div>

      {/* 30 grid cells (2 rows of 15) */}
      <div
        className="grid grid-cols-15 gap-1.5 max-w-[360px]"
        role="grid"
        aria-label="Last 30 days activity grid"
      >
        {days.map((day) => {
          const isSelected = selectedDate === day.date;
          const label = day.hasActivity
            ? `${day.date}: ${day.count} activities recorded${day.dsaCount ? ` (${day.dsaCount} DSA solved)` : ''}`
            : `${day.date}: No activity recorded`;

          return (
            <button
              type="button"
              key={day.date}
              role="gridcell"
              aria-label={label}
              aria-selected={isSelected}
              onClick={() => handleCellClick(day.date)}
              onMouseEnter={() => setHoveredDay(day)}
              onMouseLeave={() => setHoveredDay(null)}
              onFocus={() => setHoveredDay(day)}
              onBlur={() => setHoveredDay(null)}
              className={`aspect-square w-full border rounded-[2px] transition-all duration-200 cursor-pointer outline-none focus:ring-1 focus:ring-[var(--color-text-primary)] ${
                isSelected ? 'ring-1 ring-[var(--color-text-primary)] scale-110' : ''
              } ${getLevelStyle(day.level)}`}
            />
          );
        })}
      </div>

      <div className="flex items-center justify-between text-[10px] t-mono text-[var(--color-text-muted)] mt-0.5">
        <span>Less</span>
        <div className="flex items-center gap-1" aria-hidden="true">
          <span className="w-2 h-2 rounded-[1px] border border-[var(--color-border)] opacity-50" title="Level 0: Inactive" />
          <span className="w-2 h-2 rounded-[1px] bg-[var(--color-border)]" title="Level 1" />
          <span className="w-2 h-2 rounded-[1px] bg-[var(--color-border-strong)]" title="Level 2" />
          <span className="w-2 h-2 rounded-[1px] bg-[var(--color-text-secondary)]" title="Level 3" />
          <span className="w-2 h-2 rounded-[1px] bg-[var(--color-text-primary)]" title="Level 4" />
        </div>
        <span>More</span>
      </div>

      {/* Day Inspector Rail */}
      {activeInspectionDay && (
        <div className="mt-2 p-3 border border-[var(--color-border)] rounded bg-[var(--color-surface)] text-xs flex flex-col gap-1.5 transition-all">
          <div className="flex items-center justify-between">
            <span className="t-mono text-[10.5px] font-medium text-[var(--color-text-primary)]">
              {activeInspectionDay.monthName} {activeInspectionDay.dayOfMonth} ({activeInspectionDay.date})
            </span>
            <div className="flex items-center gap-2">
              {typeof activeInspectionDay.dsaCount === 'number' && (
                <span className="t-mono text-[9.5px] px-1.5 py-0.5 rounded-[2px] border border-[var(--color-border-strong)] text-[var(--color-text-primary)]">
                  {activeInspectionDay.dsaCount} DSA
                </span>
              )}
              <span className="t-mono text-[10px] text-[var(--color-text-secondary)]">
                Level {activeInspectionDay.level}/4
              </span>
            </div>
          </div>

          {!activeInspectionDay.hasActivity ? (
            <p className="t-mono text-[10px] text-[var(--color-text-muted)] m-0">
              No learning activity recorded yet on this date.
            </p>
          ) : (
            <div className="flex flex-col gap-1.5 text-[11px] text-[var(--color-text-secondary)]">
              <span className="t-mono text-[9.5px] text-[var(--color-text-muted)] block">
                LEARNING ENTRIES ({activeInspectionDay.activities.length}):
              </span>
              <ul className="m-0 pl-3.5 list-disc space-y-0.5 text-[11px]">
                {activeInspectionDay.activities.map((act, idx) => (
                  <li key={idx} className="text-[var(--color-text-primary)]">
                    {act}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {activeDaysCount === 0 && !activeInspectionDay && (
        <p className="t-mono text-[10.5px] text-[var(--color-text-muted)] mt-1">
          No learning activity recorded yet.
        </p>
      )}
    </div>
  );
};
