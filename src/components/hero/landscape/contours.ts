import { getTerrainHeight, LandscapeVariant } from './terrain';

export interface ContourPoint {
  x: number;
  z: number;
  k: number;
  currentHeight: number;
  targetHeight: number;
}

export interface ContourLine {
  depth: number;
  baseAlpha: number;
  points: ContourPoint[];
  isRidgeHighlight?: boolean;
}

export function generateContours(
  rowCount: number,
  samplesPerRow: number,
  variant: LandscapeVariant = 'hero'
): ContourLine[] {
  const contours: ContourLine[] = [];

  for (let i = 0; i < rowCount; i++) {
    const depthFrac = i / (rowCount - 1);
    const z = 0.05 + 0.95 * Math.pow(depthFrac, 1.35);
    const k = 0.42 + 0.58 * z;
    const points: ContourPoint[] = [];

    // Base contour opacity: 0.04 (far) to 0.28 (near)
    const baseAlpha = 0.04 + 0.24 * z;

    for (let j = 0; j < samplesPerRow; j++) {
      const u = j / (samplesPerRow - 1);
      // Small jitter so it never looks mechanical
      const jitter = ((Math.sin(i * 17.1 + j * 9.7) + 1) / 2 - 0.5) * 0.003;
      const x = -1.02 + 2.04 * u + jitter;
      const h = getTerrainHeight(x, z, variant);

      points.push({
        x,
        z,
        k,
        currentHeight: h,
        targetHeight: h,
      });
    }

    contours.push({
      depth: z,
      baseAlpha,
      points,
    });
  }

  // Add 3-5 ridge highlight lines across summit zones
  const ridgeDepths = [0.14, 0.22, 0.38, 0.55];
  for (const z of ridgeDepths) {
    const k = 0.42 + 0.58 * z;
    const points: ContourPoint[] = [];
    const samples = Math.floor(samplesPerRow * 0.8);

    for (let j = 0; j < samples; j++) {
      const u = j / (samples - 1);
      const x = -0.75 + 1.5 * u;
      const h = getTerrainHeight(x, z, variant);
      points.push({
        x,
        z,
        k,
        currentHeight: h,
        targetHeight: h,
      });
    }

    if (points.length >= 8) {
      contours.push({
        depth: z,
        baseAlpha: 0.38,
        points,
        isRidgeHighlight: true,
      });
    }
  }

  return contours;
}

export function updateContourTargets(contours: ContourLine[], variant: LandscapeVariant) {
  for (let i = 0; i < contours.length; i++) {
    const line = contours[i];
    for (let j = 0; j < line.points.length; j++) {
      const pt = line.points[j];
      pt.targetHeight = getTerrainHeight(pt.x, pt.z, variant);
    }
  }
}
