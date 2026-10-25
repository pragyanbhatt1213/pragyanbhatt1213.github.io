import { DailyLearningEntry } from '../types/learning';

/**
 * Extracts an explicit numeric count of DSA questions/problems from an activity line.
 * If no explicit count is specified, returns undefined (never assumes 0).
 */
export function extractDsaCount(text: string): number | undefined {
  if (!/\bdsa\b/i.test(text)) {
    return undefined;
  }

  // Pattern 1: Solved X DSA questions/problems (e.g. 'Solved 3 DSA question')
  const matchSolvedDsa = text.match(/solved\s+(\d+)\s*dsa\s*(?:questions?|problems?)?/i);
  if (matchSolvedDsa) {
    const parsed = parseInt(matchSolvedDsa[1], 10);
    return Number.isNaN(parsed) ? undefined : parsed;
  }

  // Pattern 2: X DSA questions/problems (e.g. '3 DSA questions')
  const matchNumDsa = text.match(/(\d+)\s*dsa\s*(?:questions?|problems?)?/i);
  if (matchNumDsa) {
    const parsed = parseInt(matchNumDsa[1], 10);
    return Number.isNaN(parsed) ? undefined : parsed;
  }

  // Pattern 3: DSA: ... Solved X questions/problems
  const match1 = text.match(/\bdsa\b.*?solved\s+(\d+)\s*(?:questions?|problems?)/i);
  if (match1) {
    const parsed = parseInt(match1[1], 10);
    return Number.isNaN(parsed) ? undefined : parsed;
  }

  // Pattern 4: DSA: ... X questions/problems
  const match2 = text.match(/\bdsa\b.*?(\d+)\s*(?:questions?|problems?)/i);
  if (match2) {
    const parsed = parseInt(match2[1], 10);
    return Number.isNaN(parsed) ? undefined : parsed;
  }

  // Pattern 5: DSA: ... solved X
  const match3 = text.match(/\bdsa\b.*?solved\s+(\d+)\b/i);
  if (match3) {
    const parsed = parseInt(match3[1], 10);
    return Number.isNaN(parsed) ? undefined : parsed;
  }

  return undefined;
}

/**
 * Parses markdown daily learning log content.
 * Accepts any markdown string, tolerates malformed dates, empty sections,
 * and comments without throwing errors.
 */
export function parseDailyLog(rawContent: string): DailyLearningEntry[] {
  if (!rawContent || typeof rawContent !== 'string') {
    return [];
  }

  const lines = rawContent.split(/\r?\n/);
  const rawSections: { date: string; activities: string[] }[] = [];

  let currentDate: string | null = null;
  let currentActivities: string[] = [];

  for (const line of lines) {
    const trimmed = line.trim();

    // Check for date heading: ## YYYY-MM-DD
    const dateMatch = trimmed.match(/^##\s*(\d{4}-\d{2}-\d{2})\s*$/);
    if (dateMatch) {
      if (currentDate) {
        rawSections.push({
          date: currentDate,
          activities: [...currentActivities],
        });
      }
      currentDate = dateMatch[1];
      currentActivities = [];
      continue;
    }

    // Check for bullet point: - activity or * activity
    const bulletMatch = trimmed.match(/^[-*]\s+(.+)$/);
    if (bulletMatch && currentDate) {
      const activityText = bulletMatch[1].trim();
      if (activityText.length > 0) {
        currentActivities.push(activityText);
      }
    }
  }

  // Push final open section
  if (currentDate) {
    rawSections.push({
      date: currentDate,
      activities: [...currentActivities],
    });
  }

  // Deduplicate/merge any duplicate date headings
  const dateMap = new Map<string, string[]>();
  for (const section of rawSections) {
    const existing = dateMap.get(section.date) || [];
    existing.push(...section.activities);
    dateMap.set(section.date, existing);
  }

  const entries: DailyLearningEntry[] = [];
  for (const [date, activities] of dateMap.entries()) {
    // A date heading without any activities does not count as an active day or entry
    if (activities.length === 0) {
      continue;
    }

    let dsaCount: number | undefined = undefined;

    for (const act of activities) {
      const count = extractDsaCount(act);
      if (typeof count === 'number') {
        dsaCount = (dsaCount ?? 0) + count;
      }
    }

    entries.push({
      date,
      activities,
      dsaCount,
      hasActivity: true,
    });
  }

  // Sort descending: newest date first
  entries.sort((a, b) => b.date.localeCompare(a.date));

  return entries;
}
