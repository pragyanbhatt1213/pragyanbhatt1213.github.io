import { projects } from '../content/projects';
import { topics } from '../content/topics';
import { Project } from '../types/project';
import { Note, Topic } from '../types/note';

export function getProjects(): Project[] {
  return projects.filter((p) => p.published);
}

export function getAllProjectsIncludingUnpublished(): Project[] {
  return projects;
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.published && p.featured);
}

export function getProjectBySlug(slug: string): Project | undefined {
  if (slug === 'rag-qa' || slug === 'rag-question-answering-system') {
    return projects.find((p) => p.slug === 'heritage-rag-bot');
  }
  return projects.find((p) => p.slug === slug && p.published);
}

export function getNotes(): Note[] {
  return [];
}

export function getNoteBySlug(_slug: string): Note | undefined {
  return undefined;
}

export function getTopics(): Topic[] {
  return topics;
}

export function formatCount(count: number, minDigits: number = 2): string {
  return String(count).padStart(minDigits, '0');
}

export function getProjectCounts() {
  const published = getProjects();
  const all = getAllProjectsIncludingUnpublished();
  return {
    publishedCount: published.length,
    totalCount: all.length,
    archivedCount: all.length - published.length,
    backendCount: published.filter((p) => {
      const techs = p.technologies.map((t) => t.toLowerCase());
      return techs.some((t) => ['go', 'fiber', 'django', 'postgresql', 'redis'].includes(t));
    }).length,
    systemsCount: published.filter((p) => {
      const techs = p.technologies.map((t) => t.toLowerCase());
      return techs.some((t) => ['flutter', 'kotlin', 'swift', 'hive', 'docker', 'supabase'].includes(t));
    }).length,
    retrievalCount: published.filter((p) => {
      const techs = p.technologies.map((t) => t.toLowerCase());
      return techs.some((t) => ['langchain', 'together ai', 'chromadb', 'huggingface', 'embeddings', 'llms'].includes(t));
    }).length,
    dataCount: published.filter((p) => {
      const techs = p.technologies.map((t) => t.toLowerCase());
      return techs.some((t) => ['pandas', 'numpy', 'reportlab'].includes(t));
    }).length,
  };
}

export function getNoteCounts() {
  return {
    totalCount: 0,
  };
}

export function getTopicById(id: string): Topic | undefined {
  return topics.find((t) => t.id === id);
}

export interface TopicGraphNode {
  topic: Topic;
  noteCount: number;
  connectedTopics: { topicId: string; weight: number }[];
}

export function buildTopicGraph(allNotes: Note[], allTopics: Topic[]): TopicGraphNode[] {
  const publishedNotes = allNotes.filter((n) => !n.draft);
  const noteCountByTopic = new Map<string, number>();
  const coOccurrence = new Map<string, Map<string, number>>();

  for (const t of allTopics) {
    noteCountByTopic.set(t.id, 0);
    coOccurrence.set(t.id, new Map());
  }

  for (const n of publishedNotes) {
    for (const tId of n.topics) {
      noteCountByTopic.set(tId, (noteCountByTopic.get(tId) || 0) + 1);
      for (const otherId of n.topics) {
        if (tId !== otherId) {
          const map = coOccurrence.get(tId);
          if (map) {
            map.set(otherId, (map.get(otherId) || 0) + 1);
          }
        }
      }
    }
  }

  return allTopics.map((topic) => {
    const rawCo = coOccurrence.get(topic.id) || new Map();
    const connections: { topicId: string; weight: number }[] = [];

    // include taxonomy relations
    for (const relId of topic.relatedTopicIds) {
      const coWeight = rawCo.get(relId) || 0;
      connections.push({ topicId: relId, weight: 2 + coWeight });
    }

    return {
      topic,
      noteCount: noteCountByTopic.get(topic.id) || 0,
      connectedTopics: connections,
    };
  });
}

export function searchNotes(allNotes: Note[], query: string): Note[] {
  const q = query.trim().toLowerCase();
  if (!q) {
    return allNotes.filter((n) => !n.draft);
  }

  type ScoredNote = { note: Note; score: number };
  const scored: ScoredNote[] = [];

  for (const note of allNotes) {
    if (note.draft) continue;
    let score = 0;

    const title = note.title.toLowerCase();
    const summary = note.summary.toLowerCase();
    const tech = note.technologies.map((t) => t.toLowerCase()).join(' ');
    const tops = note.topics.join(' ').toLowerCase();
    const bodyText = Object.values(note.body).join(' ').toLowerCase();

    if (title.includes(q)) score += 10;
    if (summary.includes(q)) score += 5;
    if (tech.includes(q)) score += 4;
    if (tops.includes(q)) score += 3;
    if (bodyText.includes(q)) score += 1;

    if (score > 0) {
      scored.push({ note, score });
    }
  }

  return scored.sort((a, b) => b.score - a.score).map((s) => s.note);
}
