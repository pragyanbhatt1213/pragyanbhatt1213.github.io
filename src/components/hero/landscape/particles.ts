import { getTerrainHeight, LandscapeVariant } from './terrain';

export interface Particle {
  normX: number;
  normZ: number;
  k: number; // perspective depth scale
  currentHeight: number;
  targetHeight: number;
  baseAlpha: number;
  size: number;
  phase: number;
  drift: boolean;
  driftOffset: number;
  driftSpeed: number;
  offsetX: number;
  offsetY: number;
}

// Pseudo-random generator with fixed seed for determinism
function createPRNG(seed = 42) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return s / 2147483647;
  };
}

export function generateParticles(
  targetCount: number,
  variant: LandscapeVariant = 'hero'
): Particle[] {
  const rnd = createPRNG(1337);
  const particles: Particle[] = [];
  const maxAttempts = targetCount * 14;
  let attempts = 0;

  while (particles.length < targetCount && attempts < maxAttempts) {
    attempts++;
    // Sample x in [-1, 1], z in [0.03, 0.98]
    const x = rnd() * 2 - 1;
    const z = Math.pow(rnd(), 0.88); // slight bias towards deeper terrain
    const h = getTerrainHeight(x, z, variant);

    // Rejection sampling: higher probability on peaks and ridges, but always keep ambient base density
    const acceptProbability = 0.16 + Math.pow(h, 1.25) * 0.92;
    if (rnd() > acceptProbability) continue;

    // Perspective projection depth scale
    const k = 0.42 + 0.58 * z;

    // Luminance distribution (82% dim, 15% medium, 3% bright technical highlights)
    const roll = rnd();
    let baseAlpha: number;
    let size: number;
    if (roll < 0.82) {
      baseAlpha = 0.12 + rnd() * 0.25;
      size = 0.6 + rnd() * 0.5;
    } else if (roll < 0.97) {
      baseAlpha = 0.35 + rnd() * 0.25;
      size = 0.9 + rnd() * 0.7;
    } else {
      baseAlpha = 0.82 + rnd() * 0.18;
      size = 1.6 + rnd() * 0.7;
    }

    // Distance attenuation: far particles slightly smaller
    size *= 0.72 + k * 0.52;

    // Drift for particles near summit
    const isDrifting = h > 0.60 && rnd() < 0.25;

    particles.push({
      normX: x,
      normZ: z,
      k,
      currentHeight: h,
      targetHeight: h,
      baseAlpha,
      size,
      phase: rnd() * Math.PI * 2,
      drift: isDrifting,
      driftOffset: 0,
      driftSpeed: 0.15 + rnd() * 0.35,
      offsetX: 0,
      offsetY: 0,
    });
  }

  return particles;
}

export function updateParticleTargets(particles: Particle[], variant: LandscapeVariant) {
  for (let i = 0; i < particles.length; i++) {
    const p = particles[i];
    p.targetHeight = getTerrainHeight(p.normX, p.normZ, variant);
  }
}
