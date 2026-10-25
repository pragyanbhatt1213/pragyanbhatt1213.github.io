import rawDailyLog from '../../content/learning/daily-log.md?raw';
import { parseDailyLog } from './learning-parser';
import { DailyLearningEntry } from '../types/learning';

export * from './learning-parser';

/**
 * Returns all parsed daily learning entries from the project's daily-log.md file.
 */
export function getDailyLearningEntries(): DailyLearningEntry[] {
  return parseDailyLog(rawDailyLog);
}

/**
 * Retrieves a daily learning entry for a specific ISO date (YYYY-MM-DD).
 */
export function getDailyLearningEntryByDate(date: string): DailyLearningEntry | undefined {
  const entries = getDailyLearningEntries();
  return entries.find((e) => e.date === date);
}
