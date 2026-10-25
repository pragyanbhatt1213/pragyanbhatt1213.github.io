export interface SiteConfig {
  name: string;
  initials: string;
  role: string;
  education: {
    degree: string;
    institution: string;
    graduationYear: number;
    status: string;
  };
  headline: {
    line1: string;
    line2Prefix: string;
    line2Italic: string;
    full: string;
  };
  annotations: {
    topCenter: string;
    rightStack: string[];
    version: string;
    tagline: string;
    scroll: string;
  };
  intro: {
    label: string;
    text: string;
  };
  approach: {
    number: string;
    title: string;
    description: string;
  }[];
  about: {
    heading: string;
    bio: string[];
    interests: string[];
    currentFocus: string;
  };
  contact: {
    headlinePrefix: string;
    headlineItalic: string;
    email: string;
    github: string;
    linkedin: string;
    resume: string;
  };
  links: {
    work: string;
    notes: string;
    about: string;
    contact: string;
  };
}

export const siteConfig: SiteConfig = {
  name: 'Pragyan Bhatt',
  initials: 'PB',
  role: 'Computer Science Student /\nSoftware Engineer',
  education: {
    degree: 'B.Tech Computer Science and Engineering',
    institution: 'Vellore Institute of Technology',
    graduationYear: 2027,
    status: 'Fourth-Year Student',
  },
  headline: {
    line1: 'Pragyan Bhatt',
    line2Prefix: 'I learn how systems work. Then I build ',
    line2Italic: 'them.',
    full: 'I learn how systems work. Then I build them.',
  },
  annotations: {
    topCenter: 'VIT CSE · Class of 2027',
    rightStack: ['Explore', 'Understand', 'Build'],
    version: 'Class of 2027 · VIT CSE',
    tagline: 'Engineering Portfolio',
    scroll: 'Selected Work',
  },
  intro: {
    label: '00 / PROFILE',
    text: 'Pragyan Bhatt is a fourth-year Computer Science student at Vellore Institute of Technology (graduating 2027), exploring backend systems, AI applications, and the engineering beneath the interface.',
  },
  approach: [
    {
      number: '01',
      title: 'Backend Systems & Concurrency',
      description: 'High-throughput APIs, cache consistency, connection pooling, and resilient data access patterns in Go and Python.',
    },
    {
      number: '02',
      title: 'Client-Side Engineering & Native Bridges',
      description: 'Headless authentication pipelines, native platform channels, and offline-first local caching in Flutter and React.',
    },
    {
      number: '03',
      title: 'Information Retrieval & Grounded LLMs',
      description: 'Vector search with ChromaDB, dense embeddings, semantic chunking, and deterministic context synthesis via LangChain.',
    },
    {
      number: '04',
      title: 'Data Pipelines & Analytical Scoring',
      description: 'Non-parametric statistical anomaly detection (IQR), tabular data transformations, and automated reporting engines.',
    },
  ],
  about: {
    heading: 'I learn quickly. I build to understand.',
    bio: [
      "I'm Pragyan Bhatt, a fourth-year Computer Science student at Vellore Institute of Technology, graduating in 2027.",
      "I'm interested in understanding how software systems work beneath the surface, from backend services and caching to AI applications and data processing.",
      "My strength is learning unfamiliar technologies quickly, understanding their underlying concepts, and turning that knowledge into working implementations. I prefer building, experimenting, and understanding trade-offs over stopping at theory.",
    ],
    interests: [
      'High-throughput backend services and in-memory caching topologies (Go, Fiber, Redis, PostgreSQL)',
      'Retrieval-Augmented Generation, vector databases, and semantic search (Python, LangChain, ChromaDB)',
      'Statistical data processing, telemetry analysis, and anomaly scoring (Python, Django REST, Pandas, NumPy, PyQt5)',
      'Client-side application architecture and native platform channels (Flutter, React, Hive)',
    ],
    currentFocus:
      'Fourth-year B.Tech CSE at Vellore Institute of Technology (graduating 2027). Deepening understanding of distributed systems, concurrency primitives, and production AI retrieval pipelines.',
  },
  contact: {
    headlinePrefix: 'Have something\n',
    headlineItalic: 'worth building?',
    email: 'pragyan.work24@gmail.com',
    github: 'https://github.com/pragyanbhatt1213',
    linkedin: 'https://www.linkedin.com/in/pragyanbhatt99/',
    resume: 'https://github.com/pragyanbhatt1213/Resume',
  },
  links: {
    work: '/work',
    notes: '/notes',
    about: '/about',
    contact: '/contact',
  },
};
