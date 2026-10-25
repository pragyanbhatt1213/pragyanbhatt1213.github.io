/**
 * Deterministic terrain height calculation based on Gaussian peaks,
 * domain-warped harmonic octaves, edge attenuation mask, and sea-level clamp.
 * Supports page-specific compositions while maintaining the same recognizable
 * topographic visual language across the entire portfolio.
 */

export type LandscapeVariant =
  | 'hero'
  | 'archive'
  | 'case-study'
  | 'journal'
  | 'timeline'
  | 'quiet'
  | 'contact'
  | 'not-found';

export interface VariantSettings {
  terrainScale: number;      // Multiplier on vertical mountain elevation
  verticalCenter: number;    // Base Y offset as fraction of canvas height (0.3 - 0.5)
  contourOpacity: number;    // Multiplier for contour line stroke alpha
  particleOpacity: number;   // Multiplier for particle fill alpha
  densityFactor: number;     // Active fraction of particles rendered (0.4 - 1.0)
  pointerStrength: number;   // Push factor for pointer proximity (8 - 18)
  rippleEnabled: boolean;    // Whether click ripple wave is active
  speedFactor: number;       // Ambient drift and wave speed multiplier (0.3 - 1.0)
  parallaxFactor: number;    // Scroll parallax dampening factor
  surveyType: LandscapeVariant;
}

// Gaussian peak specification: [cx, cz, sigma, amplitude]
type PeakSpec = [number, number, number, number];

// 1. Hero: Nanda Devi Himalayan Massif Profile
// - Main western peak (7,816m): towering, sheer, pyramidal summit positioned right-center
// - East peak / Sunanda Devi (7,434m): dramatic secondary summit connected by a knife-edge col
// - Flanking western buttress and outer sanctuary ramparts
// - Generous negative space on the left to elevate editorial typography
const HERO_PEAKS: PeakSpec[] = [
  [0.10, 0.15, 0.12, 1.12],  // Nanda Devi Main Western Summit (7,816m)
  [0.36, 0.19, 0.10, 0.92],  // Nanda Devi East / Sunanda Devi Summit (7,434m)
  [0.23, 0.17, 0.08, 0.76],  // High knife-edge connecting ridge (col)
  [-0.18, 0.24, 0.14, 0.78], // Western arête dropping toward the inner sanctuary
  [0.58, 0.26, 0.16, 0.62],  // Eastern ridge buttress toward Nanda Kot
  [-0.56, 0.32, 0.18, 0.58], // Sanctuary western wall rampart
  [-0.82, 0.46, 0.22, 0.38], // Distant west rim
  [0.86, 0.48, 0.22, 0.36],  // Distant east rim
  [-0.08, 0.58, 0.20, 0.28], // Rishi Ganga glacial shelf
  [0.26, 0.70, 0.24, 0.22],  // Foreground moraine terrace
];

// 2. Archive (Work Index): Restrained, wide landscape with broad shoulders & lower central peak
const ARCHIVE_PEAKS: PeakSpec[] = [
  [-0.10, 0.22, 0.18, 0.42], // Restrained central ridge
  [0.12, 0.24, 0.18, 0.38],
  [-0.72, 0.36, 0.24, 0.52], // Wide west horizon ridge
  [0.72, 0.34, 0.24, 0.50],  // Wide east horizon ridge
  [-0.40, 0.58, 0.22, 0.32],
  [0.40, 0.60, 0.22, 0.30],
  [0.00, 0.82, 0.32, 0.16],
];

// 3. Case Study: Mountain spreads to left and right flanks, lowering central elevation to clear the reading column
const CASE_STUDY_PEAKS: PeakSpec[] = [
  [-0.74, 0.22, 0.22, 0.52], // West flank ridge
  [0.74, 0.22, 0.22, 0.50],  // East flank ridge
  [-0.46, 0.38, 0.20, 0.34], // West shoulder
  [0.46, 0.38, 0.20, 0.32],  // East shoulder
  [-0.88, 0.52, 0.24, 0.24], // Far west edge
  [0.88, 0.52, 0.24, 0.24],  // Far east edge
  [0.00, 0.26, 0.24, 0.12],  // Low central saddle
];

// 4. Journal (Notes): Rolling, low-contrast terrain with soft harmonic ridges
const JOURNAL_PEAKS: PeakSpec[] = [
  [-0.28, 0.22, 0.22, 0.38],
  [0.28, 0.24, 0.22, 0.36],
  [-0.68, 0.42, 0.26, 0.32],
  [0.68, 0.40, 0.26, 0.30],
  [-0.15, 0.62, 0.25, 0.22],
  [0.15, 0.64, 0.25, 0.20],
  [0.00, 0.85, 0.30, 0.14],
];

// 5. Timeline (Learning History): Scientific survey plateau with stepped terraces
const TIMELINE_PEAKS: PeakSpec[] = [
  [-0.20, 0.20, 0.18, 0.46],
  [0.22, 0.22, 0.18, 0.44],
  [-0.62, 0.36, 0.22, 0.38],
  [0.62, 0.36, 0.22, 0.36],
  [-0.30, 0.58, 0.20, 0.26],
  [0.30, 0.60, 0.20, 0.25],
  [0.00, 0.78, 0.28, 0.18],
];

// 6. Quiet (About): Spacious negative space on left/center for reading bio, gentle right shelf
const QUIET_PEAKS: PeakSpec[] = [
  [0.55, 0.28, 0.25, 0.35],  // Subtle right-flank shelf
  [0.78, 0.46, 0.22, 0.30],
  [-0.70, 0.55, 0.26, 0.20],
  [0.15, 0.72, 0.28, 0.15],
];

// 7. Contact: Symmetrical valley composition framing center terminal card
const CONTACT_PEAKS: PeakSpec[] = [
  [-0.65, 0.30, 0.22, 0.48], // Twin framing ridges on left & right
  [0.65, 0.30, 0.22, 0.48],
  [-0.38, 0.60, 0.20, 0.25],
  [0.38, 0.60, 0.20, 0.25],
];

// 8. Not Found: Fragmented, offset topography with anomalous sector
const NOT_FOUND_PEAKS: PeakSpec[] = [
  [-0.32, 0.20, 0.15, 0.50],
  [0.42, 0.28, 0.16, 0.46],
  [-0.72, 0.48, 0.20, 0.32],
  [0.18, 0.68, 0.22, 0.24],
];

export const VARIANT_SETTINGS: Record<LandscapeVariant, VariantSettings> = {
  hero: {
    terrainScale: 1.0,
    verticalCenter: 0.31,
    contourOpacity: 1.0,
    particleOpacity: 1.0,
    densityFactor: 1.0,
    pointerStrength: 18,
    rippleEnabled: true,
    speedFactor: 1.0,
    parallaxFactor: 0.10,
    surveyType: 'hero',
  },
  archive: {
    terrainScale: 0.46,
    verticalCenter: 0.48,
    contourOpacity: 0.58,
    particleOpacity: 0.70,
    densityFactor: 0.80,
    pointerStrength: 14,
    rippleEnabled: true,
    speedFactor: 0.68,
    parallaxFactor: 0.08,
    surveyType: 'archive',
  },
  'case-study': {
    terrainScale: 0.32,
    verticalCenter: 0.40,
    contourOpacity: 0.38,
    particleOpacity: 0.48,
    densityFactor: 0.62,
    pointerStrength: 10,
    rippleEnabled: true,
    speedFactor: 0.45,
    parallaxFactor: 0.05,
    surveyType: 'case-study',
  },
  journal: {
    terrainScale: 0.36,
    verticalCenter: 0.46,
    contourOpacity: 0.42,
    particleOpacity: 0.52,
    densityFactor: 0.65,
    pointerStrength: 12,
    rippleEnabled: true,
    speedFactor: 0.50,
    parallaxFactor: 0.08,
    surveyType: 'journal',
  },
  timeline: {
    terrainScale: 0.44,
    verticalCenter: 0.44,
    contourOpacity: 0.55,
    particleOpacity: 0.65,
    densityFactor: 0.74,
    pointerStrength: 13,
    rippleEnabled: true,
    speedFactor: 0.55,
    parallaxFactor: 0.08,
    surveyType: 'timeline',
  },
  quiet: {
    terrainScale: 0.28,
    verticalCenter: 0.48,
    contourOpacity: 0.32,
    particleOpacity: 0.42,
    densityFactor: 0.48,
    pointerStrength: 9,
    rippleEnabled: false,
    speedFactor: 0.38,
    parallaxFactor: 0.05,
    surveyType: 'quiet',
  },
  contact: {
    terrainScale: 0.38,
    verticalCenter: 0.45,
    contourOpacity: 0.46,
    particleOpacity: 0.54,
    densityFactor: 0.60,
    pointerStrength: 14,
    rippleEnabled: true,
    speedFactor: 0.55,
    parallaxFactor: 0.06,
    surveyType: 'contact',
  },
  'not-found': {
    terrainScale: 0.44,
    verticalCenter: 0.42,
    contourOpacity: 0.50,
    particleOpacity: 0.58,
    densityFactor: 0.62,
    pointerStrength: 15,
    rippleEnabled: true,
    speedFactor: 0.65,
    parallaxFactor: 0.08,
    surveyType: 'not-found',
  },
};

function getPeaksForVariant(variant: LandscapeVariant): PeakSpec[] {
  switch (variant) {
    case 'hero':
      return HERO_PEAKS;
    case 'archive':
      return ARCHIVE_PEAKS;
    case 'case-study':
      return CASE_STUDY_PEAKS;
    case 'journal':
      return JOURNAL_PEAKS;
    case 'timeline':
      return TIMELINE_PEAKS;
    case 'quiet':
      return QUIET_PEAKS;
    case 'contact':
      return CONTACT_PEAKS;
    case 'not-found':
      return NOT_FOUND_PEAKS;
    default:
      return HERO_PEAKS;
  }
}

/**
 * Returns normalized terrain height [0..1] for normalized coordinates
 * x in [-1, 1], z in [0, 1] (0 = far peaks, 1 = near foreground)
 */
export function getTerrainHeight(x: number, z: number, variant: LandscapeVariant = 'hero'): number {
  let h = 0;
  const peaks = getPeaksForVariant(variant);

  // 1. Sum of Gaussian peaks for active composition
  for (const [px, pz, sigma, amp] of peaks) {
    const dx = x - px;
    const dz = z - pz;
    const distSq = dx * dx + dz * dz;
    h += amp * Math.exp(-distSq / (2 * sigma * sigma));
  }

  // 2. Sharp Himalayan arête ridgelines & domain-warped cirque carving
  const warpX = x + 0.038 * Math.sin(z * 11 + x * 3.8);
  const warpZ = z + 0.038 * Math.cos(x * 13 - z * 4.6);

  // Crystalline arête ridges: sharp crests rather than round mathematical domes
  const ridge1 = 0.058 * (1 - Math.abs(Math.sin(warpX * 7.2 + warpZ * 4.5)));
  const ridge2 = 0.032 * (1 - Math.abs(Math.cos(warpX * 15.6 - warpZ * 9.8)));
  const octave3 = 0.016 * Math.sin(warpX * 38.0 + warpZ * 29.0);
  h += ridge1 + ridge2 + octave3;

  // 3. Variant-specific spatial attenuation
  let maskMod = 1.0;
  if (variant === 'case-study') {
    // Mountain parts toward left & right flanks, leaving the center reading column quiet
    const centerDip = Math.min(1.0, 0.20 + Math.pow(Math.abs(x) / 0.55, 1.8) * 0.85);
    const foregroundFalloff = Math.max(0.12, 1 - Math.max(0, z - 0.35) * 1.8);
    maskMod = centerDip * foregroundFalloff;
  } else if (variant === 'quiet') {
    // Clear the left reading area
    const leftClear = x < -0.1 ? Math.max(0.1, 1 - Math.abs(x + 0.1) * 1.3) : 1.0;
    maskMod = leftClear;
  } else if (variant === 'contact') {
    // Inward valley framing the center
    const centerDip = Math.min(1, 0.4 + Math.pow(Math.abs(x), 1.2) * 0.9);
    maskMod = centerDip;
  }

  // 4. Edge attenuation mask (falls off at left/right edges and far/near bounds)
  const edgeX = Math.max(0, 1 - Math.pow(Math.abs(x), 1.6) * 1.05);
  const edgeZ = Math.sin(Math.PI * Math.min(1, Math.max(0, z)));
  const mask = Math.pow(edgeX, 0.7) * Math.pow(edgeZ, 0.45) * maskMod;

  // 5. Clamp below sea level
  return Math.max(0, h * mask);
}
