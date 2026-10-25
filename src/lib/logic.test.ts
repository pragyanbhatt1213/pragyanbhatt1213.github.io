import test from 'node:test';
import assert from 'node:assert/strict';
import { buildActivity } from './activity';
import { searchNotes, buildTopicGraph } from './content';
import { extractDsaCount, parseDailyLog } from './learning-parser';
import { Note, Topic } from '../types/note';
import { DailyLearningEntry } from '../types/learning';

const mockNotes: Note[] = [
  {
    slug: 'note-1',
    title: 'Testing Redis Cache Invalidation',
    date: '2026-02-10',
    summary: 'Evaluating TTL eviction strategies versus pub-sub invalidate signals.',
    topics: ['backend', 'caching'],
    technologies: ['Redis', 'Go'],
    readingTime: 2,
    wordCount: 180,
    placeholder: false,
    draft: false,
    body: {
      learned: 'Active TTL prevents stale cache drift.',
    },
  },
  {
    slug: 'note-2',
    title: 'Linux Namespaces Isolation Deep Dive',
    date: '2026-01-18',
    summary: 'Comprehensive analysis of PID, mount and network namespaces.',
    topics: ['systems', 'containers'],
    technologies: ['Linux', 'Kernel'],
    readingTime: 5,
    wordCount: 450,
    placeholder: false,
    draft: false,
    body: {
      learned: 'Namespaces decouple global system resources.',
    },
  },
];

const mockTopics: Topic[] = [
  { id: 'backend', name: 'Backend', description: 'desc', relatedTopicIds: ['caching'] },
  { id: 'caching', name: 'Caching', description: 'desc', relatedTopicIds: ['backend'] },
  { id: 'systems', name: 'Systems', description: 'desc', relatedTopicIds: ['containers'] },
  { id: 'containers', name: 'Containers', description: 'desc', relatedTopicIds: ['systems'] },
];

test('1. An empty daily log produces zero active days', () => {
  const refDate = new Date('2026-10-25T12:00:00Z');
  const days = buildActivity([], refDate);

  assert.equal(days.length, 30);
  assert.equal(days[29].date, '2026-10-25');

  const activeDays = days.filter((d) => d.hasActivity);
  assert.equal(activeDays.length, 0);

  for (const day of days) {
    assert.equal(day.count, 0);
    assert.equal(day.level, 0);
    assert.equal(day.hasActivity, false);
  }
});

test('2. A date heading without bullets produces zero active days', () => {
  const markdownWithoutBullets = `
# Daily Learning Log

Add one dated section whenever you record your learning.
Use today's date in YYYY-MM-DD format.

## 2026-10-25
`;
  const entries = parseDailyLog(markdownWithoutBullets);
  assert.equal(entries.length, 0); // Heading without bullets must not count

  const refDate = new Date('2026-10-25T12:00:00Z');
  const days = buildActivity(entries, refDate);
  const activeDays = days.filter((d) => d.hasActivity);
  assert.equal(activeDays.length, 0);
});

test('3. One dated section with two bullets produces one active day', () => {
  const markdownTwoBullets = `
## 2026-10-25
- DSA: Solved 2 questions — two pointers
- Go: Concurrency primitives
`;
  const entries = parseDailyLog(markdownTwoBullets);
  assert.equal(entries.length, 1);
  assert.equal(entries[0].date, '2026-10-25');
  assert.equal(entries[0].activities.length, 2);

  const refDate = new Date('2026-10-25T12:00:00Z');
  const days = buildActivity(entries, refDate);
  const activeDays = days.filter((d) => d.hasActivity);
  assert.equal(activeDays.length, 1);
  assert.equal(days[29].date, '2026-10-25');
  assert.equal(days[29].count, 2);
  assert.equal(days[29].level, 2);
});

test('4. Four bullets on one date still produce one active day', () => {
  const markdownFourBullets = `
## 2026-10-25
- DSA: Solved 4 questions on arrays and binary search
- Go: Studied goroutines and channels
- Backend: Learned API error handling
- Project: Improved LinkForge error handling
`;
  const entries = parseDailyLog(markdownFourBullets);
  assert.equal(entries.length, 1);
  assert.equal(entries[0].activities.length, 4);

  const refDate = new Date('2026-10-25T12:00:00Z');
  const days = buildActivity(entries, refDate);
  const activeDays = days.filter((d) => d.hasActivity);
  assert.equal(activeDays.length, 1); // Multiple bullets still equal exactly one active day
  assert.equal(days[29].count, 4);
  assert.equal(days[29].level, 4);
});

test('5. A DSA count is extracted only when explicitly provided', () => {
  // Explicit numeric counts
  assert.equal(extractDsaCount('DSA: Solved 4 questions on arrays and binary search'), 4);
  assert.equal(extractDsaCount('DSA: Solved 1 question — two pointers'), 1);
  assert.equal(extractDsaCount('DSA: 3 problems on trees'), 3);
  assert.equal(extractDsaCount('DSA: Solved 5 problems'), 5);
  assert.equal(extractDsaCount('Solved 3 DSA question'), 3);

  // Non-numeric or missing counts must return undefined (never assume 0)
  assert.equal(extractDsaCount('DSA: Studied binary search trees and DFS traversal'), undefined);
  assert.equal(extractDsaCount('DSA: Practiced dynamic programming concepts'), undefined);

  // Non-DSA topics must return undefined
  assert.equal(extractDsaCount('Go: Studied goroutines and channels'), undefined);
  assert.equal(extractDsaCount('Backend: Implemented 2 endpoints with error handling'), undefined);
});

test('6. Published field notes do not appear in daily learning', () => {
  // Field notes have dates like 2026-02-10 and 2026-01-18
  const emptyDailyLogEntries: DailyLearningEntry[] = [];
  const refDate = new Date('2026-10-25T12:00:00Z');
  const days = buildActivity(emptyDailyLogEntries, refDate);

  // Activity grid must NOT include mockNotes
  const activeDays = days.filter((d) => d.hasActivity);
  assert.equal(activeDays.length, 0);

  // Search published field notes operates independently
  const searchResults = searchNotes(mockNotes, 'Redis');
  assert.equal(searchResults.length, 1);
  assert.equal(searchResults[0].slug, 'note-1');
});

test('7. Legacy task data does not appear in daily learning', () => {
  const refDate = new Date('2026-10-25T12:00:00Z');
  const days = buildActivity([], refDate);

  // Days only contain DailyLearningEntry fields
  for (const day of days) {
    assert.equal((day as any).taskCount, undefined);
    assert.equal((day as any).taskTitles, undefined);
  }
});

test('8. The 30-day grid uses the current date dynamically', () => {
  const today = new Date('2026-10-25T12:00:00Z');
  const tomorrow = new Date('2026-10-26T12:00:00Z');

  const daysToday = buildActivity([], today);
  assert.equal(daysToday[29].date, '2026-10-25');
  assert.equal(daysToday[0].date, '2026-09-26');

  const daysTomorrow = buildActivity([], tomorrow);
  assert.equal(daysTomorrow[29].date, '2026-10-26');
  assert.equal(daysTomorrow[0].date, '2026-09-27');
});

test('9. Invalid dates and duplicate entries are handled safely', () => {
  const markdownWithDuplicatesAndInvalid = `
## Invalid-Date
- Something
## 2026/10/25
- Wrong format
## 2026-10-26
- First entry on Oct 26
## 2026-10-26
- Second entry on Oct 26 (duplicate section should merge)
`;
  const entries = parseDailyLog(markdownWithDuplicatesAndInvalid);
  assert.equal(entries.length, 1);
  assert.equal(entries[0].date, '2026-10-26');
  assert.equal(entries[0].activities.length, 2);
  assert.deepEqual(entries[0].activities, [
    'First entry on Oct 26',
    'Second entry on Oct 26 (duplicate section should merge)',
  ]);
});

test('10. Link helpers accurately identify placeholder destinations and emails', async () => {
  const { isPlaceholderUrl, isPlaceholderEmail } = await import('./links');

  assert.equal(isPlaceholderUrl('https://github.com/[placeholder-linkforge]'), true);
  assert.equal(isPlaceholderUrl('#resume-placeholder'), true);
  assert.equal(isPlaceholderUrl('#'), true);
  assert.equal(isPlaceholderUrl(''), true);
  assert.equal(isPlaceholderUrl(undefined), true);
  assert.equal(isPlaceholderUrl('https://github.com/torvalds/linux'), false);

  assert.equal(isPlaceholderEmail('[your@email.placeholder]'), true);
  assert.equal(isPlaceholderEmail(''), true);
  assert.equal(isPlaceholderEmail(undefined), true);
  assert.equal(isPlaceholderEmail('pragyan.work24@gmail.com'), false);
});
