/**
 * Centralized link verification and helper utilities.
 * Ensures placeholder URLs and mailto addresses do not render as active, broken hyperlinks.
 */

export interface LinkRecord {
  name: string;
  location: string;
  url: string;
  status: 'verified' | 'placeholder' | 'unverified' | 'missing';
  notes: string;
}

export function isPlaceholderUrl(url?: string | null): boolean {
  if (!url) return true;
  const trimmed = url.trim();
  if (!trimmed || trimmed === '#' || trimmed.startsWith('#')) return true;
  if (trimmed.includes('[') || trimmed.includes('placeholder')) return true;
  return false;
}

export function isPlaceholderEmail(email?: string | null): boolean {
  if (!email) return true;
  const trimmed = email.trim();
  if (!trimmed || trimmed.includes('[') || trimmed.includes('placeholder')) return true;
  return false;
}

/**
 * Complete Link Inventory across projects, external profiles, and navigation destinations.
 */
export const LINK_INVENTORY: LinkRecord[] = [
  {
    name: 'Chemical Equipment Visualizer Repository',
    location: 'src/content/projects (chemical-equipment-visualizer)',
    url: 'https://github.com/pragyanbhatt1213/chemical-equipment-visualizer',
    status: 'verified',
    notes: 'Verified repository URL from project inventory.',
  },
  {
    name: 'Chemical Equipment Visualizer Live Demo',
    location: 'src/content/projects (chemical-equipment-visualizer)',
    url: 'https://chemical-equipment-visualizer-production.vercel.app/',
    status: 'verified',
    notes: 'Verified live demo deployment on Vercel.',
  },
  {
    name: 'VTOP Plus Repository',
    location: 'src/content/projects (vtop-plus)',
    url: 'https://github.com/pragyanbhatt1213/VTOP-Plus',
    status: 'verified',
    notes: 'Verified repository URL from project inventory.',
  },
  {
    name: 'VTOP Plus Live Landing Page',
    location: 'src/content/projects (vtop-plus)',
    url: 'https://vtop-plus.vercel.app',
    status: 'verified',
    notes: 'Verified live product web preview on Vercel.',
  },
  {
    name: 'SentryWallet Repository',
    location: 'src/content/projects (sentry-wallet)',
    url: 'https://github.com/pragyanbhatt1213/SentryWallet',
    status: 'verified',
    notes: 'Verified repository URL from project inventory.',
  },
  {
    name: 'SentryWallet Live Preview',
    location: 'src/content/projects (sentry-wallet)',
    url: 'https://sentrywallet.vercel.app/',
    status: 'verified',
    notes: 'Verified live application deployment on Vercel.',
  },
  {
    name: 'LinkForge Repository',
    location: 'src/content/projects (linkforge)',
    url: 'https://github.com/pragyanbhatt1213/LinkForge--url-shortener-',
    status: 'verified',
    notes: 'Verified repository URL from project inventory (backend service without live demo).',
  },
  {
    name: 'Heritage RAG Bot Repository',
    location: 'src/content/projects (heritage-rag-bot)',
    url: 'https://github.com/pragyanbhatt1213/heritage-rag-bot',
    status: 'verified',
    notes: 'Verified repository URL from project inventory.',
  },
  {
    name: 'GitHub Profile Link',
    location: 'src/config/site.ts (contact.github)',
    url: 'https://github.com/pragyanbhatt1213',
    status: 'verified',
    notes: 'Verified GitHub profile of Pragyan Bhatt.',
  },
  {
    name: 'LinkedIn Profile Link',
    location: 'src/config/site.ts (contact.linkedin)',
    url: 'https://www.linkedin.com/in/pragyanbhatt99/',
    status: 'verified',
    notes: 'Verified LinkedIn profile of Pragyan Bhatt.',
  },
  {
    name: 'Contact Email',
    location: 'src/config/site.ts (contact.email)',
    url: 'mailto:pragyan.work24@gmail.com',
    status: 'verified',
    notes: 'Configured verified public contact email of Pragyan Bhatt.',
  },
  {
    name: 'Résumé / CV Link',
    location: 'src/config/site.ts (contact.resume)',
    url: 'https://github.com/pragyanbhatt1213/Resume',
    status: 'verified',
    notes: 'Verified Resume repository on GitHub.',
  },
  {
    name: 'Google Fonts: Instrument Serif / IBM Plex Mono / Inter',
    location: 'index.html',
    url: 'https://fonts.googleapis.com',
    status: 'verified',
    notes: 'Standard Google Fonts CDN stylesheet verified.',
  },
];
