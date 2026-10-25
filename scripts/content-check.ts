import { projects } from '../src/content/projects';
import { topics } from '../src/content/topics';

function checkContent() {
  console.log('--- Checking Developer Portfolio Content Integrity ---');
  let errors = 0;
  const placeholders: string[] = [];

  const topicIds = new Set(topics.map((t) => t.id));
  const projectSlugs = new Set<string>();

  // Check Projects
  for (const p of projects) {
    if (projectSlugs.has(p.slug)) {
      console.error(`[ERROR] Duplicate project slug: ${p.slug}`);
      errors++;
    }
    projectSlugs.add(p.slug);

    if (!p.title || !p.shortDescription || !p.number) {
      console.error(`[ERROR] Project ${p.slug} missing required fields`);
      errors++;
    }

    if (p.placeholder) {
      placeholders.push(`Project: ${p.title} (${p.slug})`);
    }

    if (p.repoUrl && !p.repoUrl.startsWith('https://')) {
      console.error(`[ERROR] Project ${p.slug} repoUrl must be https`);
      errors++;
    }
  }

  // Check Topics
  for (const t of topics) {
    for (const rel of t.relatedTopicIds) {
      if (!topicIds.has(rel)) {
        console.error(`[ERROR] Topic ${t.id} references unknown related topic '${rel}'`);
        errors++;
      }
    }
  }

  console.log(`\nIdentified ${placeholders.length} placeholder record(s):`);
  placeholders.forEach((pl) => console.log(`  * ${pl}`));

  if (errors > 0) {
    console.error(`\nValidation failed with ${errors} error(s).`);
    process.exit(1);
  }

  console.log(`\nAll checks passed successfully! (${projects.length} projects, ${topics.length} topics)`);
}

checkContent();
