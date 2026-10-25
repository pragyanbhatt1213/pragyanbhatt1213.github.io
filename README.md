# Pragyan Bhatt — Software Engineering Portfolio

A minimal, dark editorial portfolio and daily engineering learning log featuring an interactive Himalayan topographic mountain landscape (Nanda Devi profile), systems architecture diagrams, and project case studies.

## Technologies

- **Frontend**: React 19, TypeScript
- **Styling**: Tailwind CSS 4, CSS custom properties
- **Build Tool**: Vite
- **Routing**: React Router 7 (`BrowserRouter` with dynamic base and SPA fallback)
- **Graphics & Animation**: Canvas 2D topographic terrain engine, Framer Motion
- **Icons**: Lucide React
- **Testing**: Node.js native test runner (`node:test`, `tsx`)
- **Deployment**: GitHub Pages via GitHub Actions

## Local Setup & Development

```bash
# Install dependencies
npm install

# Start local development server (http://localhost:3000)
npm run dev
```

## Testing, Validation & Build

```bash
# Validate project content integrity
npm run content:check

# Validate daily learning log format
npm run learning:check

# Run test suite
npm run test

# Type-check TypeScript codebase
npm run lint

# Build optimized production bundle & generate 404.html for GitHub Pages
npm run build
```

## GitHub Pages Deployment

The repository is configured for automated deployment to **GitHub Pages** (`https://pragyanbhatt.github.io/`) via GitHub Actions.

### 1. Enable GitHub Actions for Pages
In your GitHub repository:
1. Go to **Settings** → **Pages**.
2. Under **Build and deployment** → **Source**, select **GitHub Actions**.

### 2. Pushing Changes
Whenever changes are pushed to `main`, `.github/workflows/deploy.yml` runs all verification tests, builds the production bundle, and publishes the site automatically.

```bash
git add .
git commit -m "feat: configure GitHub Pages deployment"
git branch -M main
git push -u origin main
```

*(You can also trigger a manual deployment anytime from GitHub's **Actions** tab via `workflow_dispatch`.)*

## Project Content

Projects are maintained in structured TypeScript files under:
`src/content/projects/index.ts`

Active projects:
1. **LinkForge** — High-concurrency Go URL shortener with Fiber, Redis 7 cache-aside, and PostgreSQL 16.
2. **RAG Question Answering** — Retrieval-augmented generation pipeline with LangChain, ChromaDB, and negative constraints.
3. **Chemical Equipment Visualizer** — Django REST analytics platform with IQR telemetry anomaly bounds.
4. **VTOP Plus** — Cross-platform student ERP client with native cookie bridging and offline Hive storage.
5. **SentryWallet** — Web3 interface experiment with Supabase authentication and transaction inspection.

## Updating the Daily Learning Log

The single source of truth for all daily learning activity is:
`content/learning/daily-log.md`

### Daily Workflow

1. Open `content/learning/daily-log.md`.
2. Add today's dated heading (`## YYYY-MM-DD`) if it does not already exist.
3. Add short bullets (`- ...`) for completed work.
4. Run validation: `npm run learning:check`.
5. Commit and push:

```bash
git add content/learning/daily-log.md
git commit -m "log: record daily engineering activity"
git push
```
