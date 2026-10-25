import { DailyLearningEntry } from '../types/learning';

export interface ActivityDay {
  date: string; // YYYY-MM-DD
  dayOfMonth: number;
  monthName: string;
  count: number; // Count of activities recorded in daily-log.md for this date
  hasActivity: boolean;
  activities: string[];
  dsaCount?: number;
  level: 0 | 1 | 2 | 3 | 4;
}

/**
 * Buckets daily learning activities into the last 30 calendar days leading up to referenceDate.
 * Derived exclusively from dated entries in content/learning/daily-log.md.
 * 
 * Rules:
 * - Never synthesizes fake activity
 * - Never computes fake streaks
 * - 0 activities => level 0 (subtle inactive cell)
 * - 1 activity   => level 1
 * - 2 activities => level 2
 * - 3 activities => level 3
 * - 4+ activities => level 4
 * - If a day has multiple activities, it counts as one active calendar day.
 */
export function buildActivity(
  learningEntries: DailyLearningEntry[] = [],
  referenceDate: Date = new Date()
): ActivityDay[] {
  const days: ActivityDay[] = [];

  // Group learning log entries by ISO date string (YYYY-MM-DD)
  const learningByDate = new Map<string, DailyLearningEntry>();
  for (const entry of learningEntries) {
    learningByDate.set(entry.date, entry);
  }

  const monthNames = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  // Calculate exactly 30 calendar days ending at referenceDate (inclusive of referenceDate)
  for (let i = 29; i >= 0; i--) {
    const targetDate = new Date(referenceDate);
    targetDate.setDate(targetDate.getDate() - i);
    const y = targetDate.getFullYear();
    const m = String(targetDate.getMonth() + 1).padStart(2, '0');
    const dayNum = targetDate.getDate();
    const dStr = String(dayNum).padStart(2, '0');
    const dateKey = `${y}-${m}-${dStr}`;

    const entry = learningByDate.get(dateKey);
    const activities = entry?.activities || [];
    const count = activities.length;
    const hasActivity = count > 0;
    const dsaCount = entry?.dsaCount;

    let level: 0 | 1 | 2 | 3 | 4 = 0;
    if (count === 0) {
      level = 0;
    } else if (count >= 4) {
      level = 4;
    } else if (count === 3) {
      level = 3;
    } else if (count === 2) {
      level = 2;
    } else {
      level = 1;
    }

    days.push({
      date: dateKey,
      dayOfMonth: dayNum,
      monthName: monthNames[targetDate.getMonth()],
      count,
      hasActivity,
      activities,
      dsaCount,
      level,
    });
  }

  return days;
}
