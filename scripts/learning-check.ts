import fs from 'node:fs';
import path from 'node:path';
import { extractDsaCount } from '../src/lib/learning-parser';

function checkDailyLearningLog() {
  console.log('--- Checking Daily Learning Log Integrity ---');
  const filePath = path.resolve(process.cwd(), 'content/learning/daily-log.md');

  if (!fs.existsSync(filePath)) {
    console.error(`[ERROR] File not found: content/learning/daily-log.md`);
    process.exit(1);
  }

  const raw = fs.readFileSync(filePath, 'utf-8');
  const lines = raw.split(/\r?\n/);

  let errors = 0;
  let warnings = 0;

  const seenDates = new Set<string>();
  let currentDate: string | null = null;
  let currentActivities = 0;
  let totalActivities = 0;
  let totalDsaQuestions = 0;
  let inComment = false;

  for (let i = 0; i < lines.length; i++) {
    const lineNum = i + 1;
    const line = lines[i];
    const trimmed = line.trim();

    // Track HTML comment blocks <!-- ... -->
    if (trimmed.includes('<!--')) {
      inComment = true;
    }
    if (inComment) {
      if (trimmed.includes('-->')) {
        inComment = false;
      }
      continue;
    }

    if (!trimmed || trimmed.startsWith('# ')) {
      continue;
    }

    // Check for date heading
    if (trimmed.startsWith('##')) {
      const headingText = trimmed.replace(/^##\s*/, '').trim();

      // Validate ISO date format YYYY-MM-DD
      const isIso = /^\d{4}-\d{2}-\d{2}$/.test(headingText);
      if (!isIso) {
        console.error(`[ERROR] Line ${lineNum}: Invalid date heading '## ${headingText}'. Expected ISO format '## YYYY-MM-DD'`);
        errors++;
        currentDate = null;
        continue;
      }

      // Check for duplicate date sections
      if (seenDates.has(headingText)) {
        console.error(`[ERROR] Line ${lineNum}: Duplicate date heading '## ${headingText}'`);
        errors++;
      } else {
        seenDates.add(headingText);
      }

      currentDate = headingText;
      currentActivities = 0;
      continue;
    }

    // Line under date heading
    if (currentDate) {
      if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
        const bulletText = trimmed.slice(2).trim();
        if (bulletText.length === 0) {
          console.error(`[ERROR] Line ${lineNum}: Empty bullet point under date '## ${currentDate}'`);
          errors++;
          continue;
        }

        currentActivities++;
        totalActivities++;

        // Validate DSA pattern if mentioned
        if (/\bdsa\b/i.test(bulletText)) {
          const count = extractDsaCount(bulletText);
          if (typeof count === 'number') {
            totalDsaQuestions += count;
          }
        }
      } else {
        console.warn(`[WARN] Line ${lineNum}: Unexpected text format under date '## ${currentDate}'. Prefer bullet point '- ...': "${trimmed}"`);
        warnings++;
      }
    }
  }

  console.log(`\nResults:`);
  console.log(`  * Distinct Dates: ${seenDates.size}`);
  console.log(`  * Total Activities: ${totalActivities}`);
  console.log(`  * Total DSA Questions: ${totalDsaQuestions}`);
  console.log(`  * Errors: ${errors}`);
  console.log(`  * Warnings: ${warnings}`);

  if (errors > 0) {
    console.error(`\nValidation failed with ${errors} error(s).`);
    process.exit(1);
  }

  console.log(`\nDaily learning log check passed successfully!`);
}

checkDailyLearningLog();
