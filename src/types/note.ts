export interface NoteFrontmatter {
  title: string;
  date: string; // ISO date, e.g. '2025-10-24'
  summary: string;
  topics: string[];
  technologies: string[];
  projects?: string[];
  related?: string[];
  references?: { label: string; url: string }[];
  draft?: boolean;
  placeholder?: boolean;
}

export interface NoteBody {
  learned?: string;
  tried?: string;
  builtOrChanged?: string;
  challenges?: string;
  outcome?: string;
  nextQuestion?: string;
}

export interface Note extends NoteFrontmatter {
  slug: string;
  readingTime: number; // estimated minutes
  wordCount: number;
  body: NoteBody;
}

export interface Topic {
  id: string;
  name: string;
  description: string;
  relatedTopicIds: string[];
}
