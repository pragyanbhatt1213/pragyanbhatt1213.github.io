export interface DailyLearningEntry {
  date: string; // ISO format: YYYY-MM-DD
  activities: string[];
  dsaCount?: number; // Explicit count if provided in entry, otherwise undefined
  hasActivity: boolean;
}
