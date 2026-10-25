import { Project } from '../../types/project';

export const projects: Project[] = [
  // 01: LinkForge (Prominent #1 Project)
  {
    id: 'linkforge',
    slug: 'linkforge',
    number: '01',
    title: 'LinkForge',
    shortDescription: 'A URL shortener built with Go and Fiber, combining Redis-backed lookups, PostgreSQL persistence, and asynchronous click analytics.',
    overview:
      'A backend URL shortener engineered in Go with the Fiber v2 framework (fasthttp). Uses Redis 7 for sub-millisecond cache-aside reads, atomic SETNX for collision-free custom slug allocation (3–50 chars), and atomic INCR/EXPIRE for IP rate limiting (10 req/min per IP). PostgreSQL 16 serves as the durable ACID source of truth. Click analytics are processed asynchronously via Go buffered channels (capacity 100) and background worker goroutines. Includes Prometheus telemetry and auto-provisioned Grafana dashboards verified under k6 load tests.',
    technologies: ['Go', 'Fiber', 'Redis', 'PostgreSQL', 'Docker'],
    status: 'completed',
    featured: true,
    published: true,
    repoUrl: 'https://github.com/pragyanbhatt1213/LinkForge--url-shortener-',
    demoUrl: undefined,
    caseStudyPath: '/work/linkforge',
    highlights: [
      'Sub-millisecond cache-aside redirects via Redis 7 with PostgreSQL 16 persistence',
      'Atomic SETNX preventing duplicate custom slug collisions under high concurrency',
      'Asynchronous click tracking worker pool decoupled from the HTTP 302 response hot-path',
      'Prometheus custom metrics and auto-provisioned Grafana monitoring validated with k6 load tests',
    ],
    related: ['heritage-rag-bot', 'chemical-equipment-visualizer'],
    verified: true,
    placeholder: false,
    visualization: {
      type: 'flow',
      nodes: [
        { id: 'client', label: 'Client', subLabel: 'Browser / curl', role: 'origin' },
        { id: 'ratelimit', label: 'Rate Limiter', subLabel: 'Redis INCR / EXPIRE', role: 'middleware' },
        { id: 'api', label: 'Fiber HTTP API', subLabel: 'Go fasthttp router', role: 'router' },
        { id: 'redis', label: 'Redis 7 Cache', subLabel: 'Cache-aside HIT', role: 'cache' },
        { id: 'postgres', label: 'PostgreSQL 16', subLabel: 'ACID source of truth', role: 'database' },
        { id: 'queue', label: 'ClickQueue', subLabel: 'Buffered channel (cap 100)', role: 'async-worker' },
        { id: 'redirect', label: 'HTTP 302', subLabel: 'Immediate redirect', role: 'destination' },
      ],
      edges: [
        { from: 'client', to: 'ratelimit', style: 'solid', label: 'POST /shorten | GET /:slug' },
        { from: 'ratelimit', to: 'api', style: 'solid', label: 'Count <= 10 req/min' },
        { from: 'api', to: 'redis', style: 'solid', label: 'GET slug (cache-aside)' },
        { from: 'redis', to: 'postgres', style: 'dashed', label: 'Cache miss fallback (SELECT)' },
        { from: 'api', to: 'redirect', style: 'solid', label: '302 Found' },
        { from: 'api', to: 'queue', style: 'dotted', label: 'RecordClick(slug) non-blocking' },
        { from: 'queue', to: 'postgres', style: 'dotted', label: 'Workers INSERT INTO clicks' },
      ],
      paths: {
        redirect: ['client', 'ratelimit', 'api', 'redis', 'redirect'],
        create: ['client', 'ratelimit', 'api', 'redis', 'postgres'],
      },
    },
    caseStudy: [
      {
        id: 'problem',
        title: 'Why URL Shortening is a Real Backend Engineering Problem',
        content:
          'URL redirection represents a classic asymmetric read-to-write ratio: links are created once but can experience millions of concurrent redirects during marketing campaigns or viral spikes. If every redirect executes a synchronous SQL query against PostgreSQL, the database connection pool saturates, driving latencies up and causing timeouts. The engineering objective was to design a system where redirect throughput is strictly bounded by in-memory speeds while ensuring ACID durability, collision-free slug assignment, and decoupled click analytics.',
      },
      {
        id: 'architecture',
        title: 'Cache-Aside Topology & Request Lifecycle',
        content:
          'When a visitor requests `GET /:slug`, the Fiber handler checks Redis using `GET slug`. If present (HIT), the service dispatches an asynchronous click event and immediately returns an HTTP 302 Found redirect. On a cache miss (redis.Nil), the query falls back to PostgreSQL, repopulates the Redis key with a 24-hour TTL, and returns the redirect. Custom slug creation uses atomic `SETNX` to prevent race conditions where concurrent requests attempt to register identical identifiers.',
      },
      {
        id: 'workers',
        title: 'Asynchronous Click Tracking with Go Channels',
        content:
          'Synchronous PostgreSQL `INSERT INTO clicks` operations on every visit would introduce database I/O latency to the redirect path. Instead, LinkForge uses a buffered Go channel (`ClickQueue`, capacity 100) and a dedicated worker pool of 3 goroutines started at boot. The handler places click events into the channel without waiting; background workers batch-insert records into PostgreSQL, completely isolating visitor latency from database write speeds.',
      },
      {
        id: 'observability',
        title: 'Observability & Load Test Validation',
        content:
          'LinkForge exposes Prometheus metrics at `/metrics` measuring request throughput, duration histograms, and error rates. Grafana dashboards auto-provision from Docker Compose. Under staged k6 load testing ramping from 10 to 100 Virtual Users (8,875 total requests), the redirect path maintained a p95 latency of 1.86ms with a 100% redirect success rate.',
      },
      {
        id: 'tradeoffs',
        title: 'Engineering Decisions & Limitations',
        content:
          '1. HTTP 302 vs 301: Using HTTP 301 Moved Permanently enables client browsers to cache the destination URL locally, eliminating server egress but blinding click tracking on repeated visits. HTTP 302 Found preserves 100% click observability at the expense of server handling.\n\n2. Rate Limiting: 10 requests per minute per IP using Redis atomic `INCR` and `EXPIRE` protects against scraping and database flooding. In a distributed multi-datacenter deployment, Redis replication lag and cross-region cache synchronization would require eventual consistency handling.',
      },
    ],
  },

  // 02: RAG Question Answering (#2 Project)
  {
    id: 'heritage-rag-bot',
    slug: 'heritage-rag-bot',
    number: '02',
    title: 'RAG Question Answering',
    shortDescription: 'A retrieval-augmented question-answering system using dense embeddings, ChromaDB, and context-grounded language model generation.',
    overview:
      'A conversational question-answering system using Retrieval-Augmented Generation (RAG) to eliminate hallucinations when querying domain documents. Utilizes local CPU-computed HuggingFace sentence embeddings (all-MiniLM-L6-v2, 384 dimensions) and ChromaDB vector indexing coupled with a custom LangChain wrapper for Together AI hosted LLaMA 3.3 70B Turbo model behind an interactive Streamlit interface. Communicates engineering in retrieval-based AI, semantic search, contextual information retrieval, and grounded question answering.',
    technologies: ['Python', 'LangChain', 'Together AI', 'ChromaDB', 'HuggingFace', 'Streamlit'],
    status: 'completed',
    featured: true,
    published: true,
    repoUrl: 'https://github.com/pragyanbhatt1213/heritage-rag-bot',
    demoUrl: undefined,
    caseStudyPath: '/work/heritage-rag-bot',
    highlights: [
      'Custom TogetherChatModel extending LangChain BaseChatModel for OpenAI-compatible completion calls',
      'Local CPU-based sentence embedding pipeline (384 dimensions) with zero per-token inference cost',
      'ChromaDB vector store with HNSW indexing for sub-10ms semantic similarity retrieval (k=3)',
      'Defensive prompt engineering enforcing strict negative constraints against hallucinations',
    ],
    related: ['linkforge', 'chemical-equipment-visualizer'],
    verified: true,
    placeholder: false,
    visualization: {
      type: 'pipeline',
      lanes: [
        {
          id: 'ingestion',
          label: 'Ingestion Lane (Async Offline)',
          style: 'dashed',
          nodes: [
            { id: 'docs', label: 'Domain Documents', subLabel: 'Curated corpus & PDFs' },
            { id: 'chunker', label: 'Recursive Splitter', subLabel: '512t overlap 64' },
            { id: 'embed', label: 'HuggingFace CPU', subLabel: 'all-MiniLM-L6-v2 (384-d)' },
            { id: 'chroma', label: 'ChromaDB Store', subLabel: 'SQLite + HNSW Index' },
          ],
        },
        {
          id: 'query',
          label: 'Query Lane (Synchronous Runtime)',
          style: 'solid',
          nodes: [
            { id: 'question', label: 'User Query', subLabel: 'Streamlit session input' },
            { id: 'condense', label: 'History Memory', subLabel: 'ConversationBufferMemory' },
            { id: 'retriever', label: 'Similarity Search', subLabel: 'Top-3 nearest chunks (k=3)' },
            { id: 'llm', label: 'TogetherChatModel', subLabel: 'LLaMA 3.3 70B Turbo' },
            { id: 'answer', label: 'Grounded Answer', subLabel: 'Strict source attribution' },
          ],
        },
      ],
    },
    caseStudy: [
      {
        id: 'problem',
        title: 'The Problem: Grounding AI Answers in Verified Knowledge',
        content:
          'General-purpose Large Language Models memorize broad statistical distributions across training corpuses but frequently hallucinate specific details when queried about specialized domain facts, archival records, or regional historical data. Retrieval-Augmented Generation (RAG) resolves this by physically decoupling knowledge storage from language reasoning: domain documents are embedded into a dense vector index, and only verified chunks are supplied to the model as conversational context.',
      },
      {
        id: 'architecture',
        title: 'Two-Phase Architecture: Ingestion & Query Synthesis',
        content:
          'The system separates document ingestion from user query response:\n\n1. Ingestion Lane: Raw documents and dataset PDFs are split into 512-token chunks with 64-token overlapping windows to preserve semantic continuity across paragraph boundaries. Chunks are converted into 384-dimensional dense vectors using a local HuggingFace `all-MiniLM-L6-v2` model and indexed into ChromaDB with HNSW search.\n\n2. Query Lane: When a user asks a question, the query is embedded, the top-3 nearest document chunks are retrieved from ChromaDB, and an augmented prompt injects the verified context into the model while enforcing strict negative constraints.',
      },
      {
        id: 'decisions',
        title: 'Technical Decisions & Local Embeddings',
        content:
          '1. Local CPU Embeddings: Running sentence-transformers locally on CPU eliminates per-token API costs and external network latency during retrieval.\n\n2. Custom TogetherChatModel: Built a custom Pydantic wrapper subclassing LangChain `BaseChatModel` to translate messages directly to Together AI OpenAI-compatible completions endpoints, insulating the application from upstream third-party package breaking changes.',
      },
      {
        id: 'retrieval-experiments',
        title: 'Benchmarking Retrieval Strategies',
        content:
          'The repository documents extensive prototyping across retrieval techniques:\n- Standard Cosine Similarity ($k=3$): Fast and effective for direct queries, with sub-15ms retrieval latency.\n- Maximal Marginal Relevance (MMR): Penalizes redundancy to ensure retrieved context spans distinct aspects of the query.\n- Contextual Compression: Uses a preliminary similarity search followed by an LLM extraction pass to strip irrelevant sentences before prompt synthesis.',
      },
      {
        id: 'tradeoffs',
        title: 'Limitations & Future Improvements',
        content:
          '1. Session Isolation: In the prototype Streamlit runtime, conversation memory is initialized in memory, which can overlap across concurrent users. A production deployment should back sessions with Redis.\n\n2. Hybrid Search: Dense embeddings alone can miss exact keyword or year matches. Combining BM25 keyword search with dense HNSW vectors using reciprocal rank fusion (RRF) would improve precision on catalog lookups.',
      },
    ],
  },

  // 03: Chemical Equipment Visualizer (#3 Project)
  {
    id: 'chemical-equipment-visualizer',
    slug: 'chemical-equipment-visualizer',
    number: '03',
    title: 'Chemical Equipment Visualizer',
    shortDescription: 'A data analysis and visualization application for chemical equipment telemetry, using statistical outlier detection to help identify unusual sensor readings.',
    overview:
      'A full-stack web and desktop application designed to streamline chemical equipment monitoring. Accepts CSV equipment records containing flowrate, pressure, and temperature parameters, validates data schemas, computes summary statistics and IQR outlier boundaries using Pandas and NumPy, calculates operational health scores (0–100), and generates downloadable reports in PDF, Excel, and CSV formats. Built with Django REST Framework, PostgreSQL, and React 19, with a companion PyQt5 desktop application.',
    technologies: ['Python', 'Django', 'PostgreSQL', 'Pandas', 'NumPy', 'React', 'PyQt5', 'ReportLab'],
    status: 'completed',
    featured: true,
    published: true,
    repoUrl: 'https://github.com/pragyanbhatt1213/chemical-equipment-visualizer',
    demoUrl: 'https://chemical-equipment-visualizer-production.vercel.app/',
    caseStudyPath: '/work/chemical-equipment-visualizer',
    highlights: [
      'Automated CSV data processing reducing manual spreadsheet analysis time',
      'Non-parametric IQR outlier detection per operational parameter using NumPy and Pandas',
      'Equipment health scoring on a 0–100 scale with High, Medium, and Low risk categorization',
      'Downloadable multi-page PDF reports with tables and charts via ReportLab, plus Excel and CSV export',
      'Dual interface: React 19 web dashboard and native PyQt5 desktop application',
    ],
    related: ['linkforge', 'heritage-rag-bot'],
    verified: true,
    placeholder: false,
    visualization: {
      type: 'flow',
      nodes: [
        { id: 'upload', label: 'CSV Upload', subLabel: 'Equipment parameters', role: 'origin' },
        { id: 'clean', label: 'Validation & Stats', subLabel: 'Schema & summary metrics', role: 'processor' },
        { id: 'iqr', label: 'IQR Outlier Filter', subLabel: 'Q1 / Q3 percentile bounds', role: 'analyzer' },
        { id: 'score', label: 'Health Scoring', subLabel: '0–100 Risk categorization', role: 'scorer' },
        { id: 'web', label: 'React Web & PyQt5', subLabel: 'Interactive dashboard', role: 'destination' },
        { id: 'export', label: 'Report Generation', subLabel: 'PDF, Excel, CSV export', role: 'destination' },
      ],
      edges: [
        { from: 'upload', to: 'clean', style: 'solid', label: 'Validate schema & nulls' },
        { from: 'clean', to: 'iqr', style: 'solid', label: 'Calculate parameter bounds' },
        { from: 'iqr', to: 'score', style: 'solid', label: 'Assign health penalties' },
        { from: 'score', to: 'web', style: 'solid', label: 'Render metrics & charts' },
        { from: 'score', to: 'export', style: 'dashed', label: 'ReportLab PDF & Excel' },
      ],
      paths: {
        analysis: ['upload', 'clean', 'iqr', 'score', 'web'],
        reports: ['upload', 'clean', 'iqr', 'score', 'export'],
      },
    },
    caseStudy: [
      {
        id: 'overview',
        title: 'Project Overview',
        content:
          'Chemical Equipment Visualizer is a full-stack platform built to analyze and visualize equipment telemetry datasets. Users upload CSV files containing equipment records with operational metrics (flowrate, pressure, and temperature). The backend processes the data, calculates statistical summaries, identifies anomalies using the Interquartile Range (IQR) method, computes a health score on a 0–100 scale, and generates downloadable reports in PDF and Excel formats.',
      },
      {
        id: 'problem',
        title: 'The Problem',
        content:
          'Monitoring equipment fleets in educational and industrial chemical labs often relies on manual spreadsheets. Engineers manually compute averages, eyeball outliers, and assemble reporting charts. This workflow is time-consuming, prone to calculation errors, and delays the identification of equipment operating outside safe parameters. The goal of this project was to automate data ingestion, statistical anomaly detection, and report generation into a single streamlined pipeline.',
      },
      {
        id: 'how-it-works',
        title: 'How It Works',
        content:
          '1. Upload & Validation: The user uploads a CSV file through the web dashboard or desktop interface. The system verifies required columns (`Equipment Name`, `Type`, `Flowrate`, `Pressure`, `Temperature`), checks data types, and ensures files are under the 10MB limit.\n\n2. Statistical Processing: Pandas computes descriptive statistics for each numeric parameter—minimum, maximum, mean, median, and standard deviation.\n\n3. Outlier Detection: The system calculates the first quartile (Q1, 25th percentile) and third quartile (Q3, 75th percentile). Readings outside [Q1 - 1.5*IQR, Q3 + 1.5*IQR] are flagged as statistical outliers.\n\n4. Health Scoring: A penalty-based algorithm calculates an overall health index from 0 to 100, grouping equipment into High Risk (<70), Medium Risk (70–85), and Low Risk (≥85).\n\n5. Visualization & Export: The processed dataset is stored in PostgreSQL and rendered as interactive charts on the frontend, with one-click export to ReportLab-generated PDF and openpyxl-formatted Excel.',
      },
      {
        id: 'decisions',
        title: 'Technical Decisions',
        content:
          '1. Non-Parametric IQR Method: Standard Z-score anomaly detection assumes a Gaussian normal distribution. Equipment telemetry often exhibits skewed distributions due to operating modes. IQR is non-parametric and resistant to extreme values.\n\n2. Server-Side Report Generation: Rather than relying on browser-based print styling, PDF generation is handled server-side using ReportLab. This ensures pixel-consistent tables, formatting, and embedded charts regardless of the client browser.\n\n3. Dual Web & Desktop Interface: The Django REST backend supports both the React web application (deployed on Vercel) and a standalone cross-platform PyQt5 desktop application for local workstations.',
      },
      {
        id: 'capabilities',
        title: 'Key Capabilities',
        content:
          '- CSV dataset upload with automatic column and data-type validation\n- Parameter-wise statistical analysis (min, max, mean, median, standard deviation)\n- IQR anomaly detection identifying equipment outside expected ranges\n- 0–100 equipment health scoring and risk classification (High, Medium, Low)\n- Efficiency ranking leaderboard sorting equipment by performance score\n- Professional PDF report generation via ReportLab\n- Excel export with styled sheets and raw CSV download\n- Analysis history storing and retrieving the last 5 uploaded datasets\n- Token-based API authentication with pre-configured demo access',
      },
      {
        id: 'limitations',
        title: 'Limitations & Future Improvements',
        content:
          'The application currently handles uploaded batch CSV files synchronously within the HTTP request cycle, which works efficiently for datasets up to several thousand rows (<10MB). Planned improvements include:\n- Asynchronous background processing for very large CSV uploads\n- Live WebSocket streaming for continuous sensor inputs\n- Configurable parameter thresholds tailored to specific equipment categories',
      },
    ],
  },

  // 04: VTOP Plus (#4 Project)
  {
    id: 'vtop-plus',
    slug: 'vtop-plus',
    number: '04',
    title: 'VTOP Plus',
    shortDescription: 'Student-focused web and mobile project for the university ERP portal with headless auth and offline Hive caching.',
    overview:
      'A Flutter application addressing the latency, session dropouts, and interface friction of the university student ERP portal (VTOP). Operates entirely client-side without any intermediary proxy server, preserving student privacy. Utilizes native Kotlin (Android) and Swift (iOS) platform channels (CookieBridge) to extract HttpOnly session cookies from headless WebViews, parses server HTML into structured models, and provides offline timetable access and automated attendance safety margin calculators.',
    technologies: ['Flutter', 'Dart', 'Kotlin', 'Swift', 'Hive', 'HTML Parsing'],
    status: 'completed',
    featured: false,
    published: true,
    repoUrl: 'https://github.com/pragyanbhatt1213/VTOP-Plus',
    demoUrl: 'https://vtop-plus.vercel.app',
    caseStudyPath: '/work/vtop-plus',
    highlights: [
      '100% client-side zero-backend architecture protecting student credentials',
      'Native CookieBridge channel capturing HttpOnly session cookies from headless WebViews',
      'Client-side HTML table extraction mapping legacy server markup to typed Dart entities',
      'Offline schedule and attendance margin calculator using local Hive NoSQL storage',
    ],
    related: ['sentry-wallet', 'linkforge'],
    verified: true,
    placeholder: false,
    visualization: {
      type: 'flow',
      nodes: [
        { id: 'user', label: 'Student UI', subLabel: 'Schedule & Attendance', role: 'origin' },
        { id: 'webview', label: 'Headless WebView', subLabel: 'Captures auth session', role: 'auth' },
        { id: 'bridge', label: 'Native CookieBridge', subLabel: 'Kotlin / Swift channel', role: 'bridge' },
        { id: 'vtop', label: 'VTOP ERP Portal', subLabel: 'University server', role: 'remote' },
        { id: 'parser', label: 'Client HTML Parser', subLabel: 'DOM table extractor', role: 'parser' },
        { id: 'hive', label: 'Hive NoSQL Cache', subLabel: 'Offline-first persistence', role: 'storage' },
      ],
      edges: [
        { from: 'user', to: 'webview', style: 'solid', label: 'Credentials input' },
        { from: 'webview', to: 'bridge', style: 'solid', label: 'Extract HttpOnly session cookie' },
        { from: 'bridge', to: 'vtop', style: 'solid', label: 'Direct authenticated request' },
        { from: 'vtop', to: 'parser', style: 'solid', label: 'Raw HTML response' },
        { from: 'parser', to: 'hive', style: 'solid', label: 'Store structured records' },
        { from: 'hive', to: 'user', style: 'solid', label: 'Instant offline rendering' },
      ],
      paths: {
        login: ['user', 'webview', 'bridge', 'vtop'],
        offline: ['user', 'hive'],
      },
    },
    caseStudy: [
      {
        id: 'problem',
        title: 'User Problem & Architectural Constraints',
        content:
          'University students consult the student ERP portal (VTOP) multiple times daily for class locations, attendance margins, and exam schedules. The legacy portal suffers from strict session timeouts, CAPTCHAs, slow responsive rendering, and periodic outages during high-traffic exam periods. Building a centralized backend proxy was rejected because routing thousands of student university credentials through an external server would create severe security liabilities.',
      },
      {
        id: 'architecture',
        title: 'Headless Authentication & Native CookieBridge',
        content:
          'The mobile client bypasses backend dependencies by performing all interactions directly on the user device. To overcome browser security boundaries where JavaScript cannot access `HttpOnly` cookies, VTOP Plus implements native platform channels: Kotlin (`CookieManager`) on Android and Swift (`WKHTTPCookieStore`) on iOS. Once the user authenticates, the CookieBridge retrieves the verified session cookies and hands them to Dart for subsequent direct HTTP requests.',
      },
      {
        id: 'decisions',
        title: 'Key Engineering Decisions',
        content:
          '1. Hive Local NoSQL: Offline availability is paramount. Hive stores raw and parsed entities directly in binary format on the device file system, enabling instantaneous startup times (< 50ms) even when airplane mode is active.\n\n2. Attendance Margin Calculator: Rather than merely displaying raw percentages, the app calculates the exact number of classes a student can safely miss (or must attend) to maintain the mandatory 75% threshold.',
      },
      {
        id: 'tradeoffs',
        title: 'Limitations & Maintenance Realities',
        content:
          'Because the system relies on client-side HTML parsing, any server-side layout change made by the university IT administrators can break parsing logic until an app update is released. Defensive selector matching and automated schema validation mitigate these failures.',
      },
    ],
  },

  // 05: SentryWallet (#5 Project)
  {
    id: 'sentry-wallet',
    slug: 'sentry-wallet',
    number: '05',
    title: 'SentryWallet',
    shortDescription: 'Web3 project exploring a lightweight browser-based wallet interface for dApp interactions with Supabase authentication.',
    overview:
      'A browser-based Web3 wallet interface inspired by MetaMask, built with React 19, Supabase, Tailwind CSS, CRACO, and Framer Motion. Explores secure session authentication with Google OAuth integration, transaction signing simulation, and multi-page dApp navigation. Built to investigate how client-side wallet interfaces handle session lifecycle states, decouple transaction inspection from broadcast, and render intuitive asset management.',
    technologies: ['React', 'Supabase', 'Tailwind CSS', 'Framer Motion', 'CRACO', 'Lucide'],
    status: 'completed',
    featured: false,
    published: true,
    repoUrl: 'https://github.com/pragyanbhatt1213/SentryWallet',
    demoUrl: 'https://sentrywallet.vercel.app/',
    caseStudyPath: '/work/sentry-wallet',
    highlights: [
      'Supabase v2 authentication integration with Google OAuth and session token persistence',
      'MetaMask-inspired multi-page routing using React Router 7 and Framer Motion transitions',
      'Transaction review and parameter decoding modal preventing deceptive dApp calls',
      'Defensive session handling and secure credential storage patterns',
    ],
    related: ['vtop-plus', 'linkforge'],
    verified: true,
    placeholder: false,
    visualization: {
      type: 'flow',
      nodes: [
        { id: 'dapp', label: 'dApp Connection', subLabel: 'Web3 Provider request', role: 'origin' },
        { id: 'wallet', label: 'SentryWallet UI', subLabel: 'React 19 + Framer Motion', role: 'router' },
        { id: 'supabase', label: 'Supabase Auth', subLabel: 'Google OAuth & Session', role: 'auth' },
        { id: 'tx-sandbox', label: 'Tx Inspection', subLabel: 'Param review & gas decode', role: 'security' },
        { id: 'broadcast', label: 'Sign & Broadcast', subLabel: 'Simulated RPC dispatch', role: 'destination' },
      ],
      edges: [
        { from: 'dapp', to: 'wallet', style: 'solid', label: 'Request transaction intent' },
        { from: 'wallet', to: 'supabase', style: 'solid', label: 'Verify session token' },
        { from: 'wallet', to: 'tx-sandbox', style: 'solid', label: 'Decode raw ABI call data' },
        { from: 'tx-sandbox', to: 'broadcast', style: 'solid', label: 'User signature approval' },
      ],
      paths: {
        signing: ['dapp', 'wallet', 'tx-sandbox', 'broadcast'],
        auth: ['wallet', 'supabase'],
      },
    },
    caseStudy: [
      {
        id: 'problem',
        title: 'Project Purpose & UX Friction in Web3',
        content:
          'Interacting with decentralized applications presents significant usability barriers for new users: cryptographic key management is intimidating, session lifecycles are difficult to understand, and raw hex transaction payloads leave users blind to what smart contract functions they are actually invoking. SentryWallet was built as a lightweight, browser-based wallet interface that explores intuitive session onboarding via Google OAuth and transparent transaction inspection.',
      },
      {
        id: 'architecture',
        title: 'Application Architecture & Supabase Session Management',
        content:
          'The frontend utilizes React 19 styled with Tailwind CSS, configured through CRACO for optimized bundling. Authentication is powered by Supabase, enabling Google OAuth login and secure token refreshing. When a dApp initiates a transaction request, SentryWallet decodes the recipient contract address, ETH value, and gas allowances into clear visual tokens before requesting user confirmation.',
      },
      {
        id: 'decisions',
        title: 'Key Implementation Decisions',
        content:
          '1. MetaMask-Inspired Component System: Modeled after industry-standard wallet interfaces to provide familiar muscle memory for account switching, asset display, and transaction history.\n\n2. Framer Motion Page Transitions: Multi-page navigation (React Router 7) uses fluid physics-based transitions to prevent jarring screen resets during modal reviews and onboarding flows.',
      },
      {
        id: 'limitations',
        title: 'Known Boundaries & Educational Scope',
        content:
          'SentryWallet is an interface and session management experiment. It does not replace hardware wallet enclaves (such as Ledger or Trezor) for securing high-value private keys in production environments. Transaction signing operates in a simulated sandbox environment.',
      },
    ],
  },
];
