import { Topic } from '../types/note';

export const topics: Topic[] = [
  {
    id: 'backend',
    name: 'Backend Architecture',
    description: 'Server frameworks, API contracts, HTTP protocol nuances, and concurrency models.',
    relatedTopicIds: ['caching', 'databases', 'systems'],
  },
  {
    id: 'caching',
    name: 'Caching & State',
    description: 'Cache eviction strategies, redis caching topologies, TTL management, and cache-aside patterns.',
    relatedTopicIds: ['backend', 'databases'],
  },
  {
    id: 'databases',
    name: 'Databases & Storage',
    description: 'Relational data models, indexing, transaction isolation, connection pools, and query optimization.',
    relatedTopicIds: ['backend', 'caching'],
  },
  {
    id: 'systems',
    name: 'Systems & OS',
    description: 'Linux kernel primitives, namespaces, cgroups, memory management, and system call boundaries.',
    relatedTopicIds: ['containers', 'networking'],
  },
  {
    id: 'containers',
    name: 'Containers & Isolation',
    description: 'Process confinement, pivot_root, chroot, resource limits, and filesystem layers.',
    relatedTopicIds: ['systems', 'backend'],
  },
  {
    id: 'retrieval',
    name: 'Information Retrieval',
    description: 'Vector search, embedding distance metrics, text chunking methods, and semantic relevance.',
    relatedTopicIds: ['llms', 'databases'],
  },
  {
    id: 'llms',
    name: 'Language Models & RAG',
    description: 'Prompt synthesis, hallucination mitigation, grounded context windows, and token economics.',
    relatedTopicIds: ['retrieval', 'backend'],
  },
  {
    id: 'networking',
    name: 'Networking & Protocols',
    description: 'TCP handshakes, socket buffers, HTTP/1.1 vs HTTP/2 multiplexing, and DNS resolution latency.',
    relatedTopicIds: ['backend', 'systems'],
  },
];
