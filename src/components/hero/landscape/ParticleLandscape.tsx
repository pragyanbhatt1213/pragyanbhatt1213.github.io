import React, { useEffect, useRef, useState } from 'react';
import { generateParticles, updateParticleTargets, Particle } from './particles';
import { generateContours, updateContourTargets, ContourLine } from './contours';
import { LandscapeVariant, VARIANT_SETTINGS } from './terrain';
import { useReducedMotion } from '../../../hooks/useReducedMotion';
import { LandscapeFallback } from './fallback';

interface Ripple {
  x: number;
  y: number;
  t: number;
}

export interface ParticleLandscapeProps {
  variant?: LandscapeVariant;
  intensity?: number;
  density?: number;
  contourOpacity?: number;
  particleOpacity?: number;
  interactionEnabled?: boolean;
  pointerStrength?: number;
  rippleEnabled?: boolean;
  terrainScale?: number;
  highlightDensity?: number;
  headlineRef?: React.RefObject<HTMLElement | null>;
  className?: string;
}

export const ParticleLandscape: React.FC<ParticleLandscapeProps> = ({
  variant = 'hero',
  intensity = 1.0,
  density = 1.0,
  contourOpacity,
  particleOpacity,
  interactionEnabled = true,
  pointerStrength,
  rippleEnabled,
  terrainScale,
  highlightDensity = 1.0,
  headlineRef,
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const reducedMotion = useReducedMotion();
  const [hasError, setHasError] = useState(false);

  // Compute effective target parameters for current variant + overrides
  const settings = VARIANT_SETTINGS[variant] || VARIANT_SETTINGS.hero;
  const targetTerrainScale = (terrainScale ?? settings.terrainScale) * intensity;
  const targetVerticalCenter = settings.verticalCenter;
  const targetContourOpacity = (contourOpacity ?? settings.contourOpacity) * intensity;
  const targetParticleOpacity = (particleOpacity ?? settings.particleOpacity) * intensity;
  const targetDensityFactor = settings.densityFactor * density;
  const targetPointerStrength = pointerStrength ?? settings.pointerStrength;
  const effectiveRippleEnabled = rippleEnabled ?? settings.rippleEnabled;
  const targetSpeedFactor = settings.speedFactor;
  const parallaxFactor = settings.parallaxFactor;

  // Keep heavy mutable animation state in refs to prevent React re-renders per frame
  const animState = useRef<{
    width: number;
    height: number;
    particles: Particle[];
    contours: ContourLine[];
    pointerX: number;
    pointerY: number;
    targetPointerX: number;
    targetPointerY: number;
    pointerNormalizedX: number;
    isPointerActive: boolean;
    ripples: Ripple[];
    rafId: number;
    isVisible: boolean;
    headlineBounds: { left: number; right: number; top: number; bottom: number };
    startTime: number;
    scrollY: number;
    targetScrollY: number;

    // Smoothly interpolated visual parameters
    currentTerrainScale: number;
    currentVerticalCenter: number;
    currentContourOpacity: number;
    currentParticleOpacity: number;
    currentDensityFactor: number;
    currentPointerStrength: number;
    currentSpeedFactor: number;

    // Track active variant for survey rendering
    activeVariant: LandscapeVariant;
  }>({
    width: 0,
    height: 0,
    particles: [],
    contours: [],
    pointerX: -9999,
    pointerY: -9999,
    targetPointerX: -9999,
    targetPointerY: -9999,
    pointerNormalizedX: 0.5,
    isPointerActive: false,
    ripples: [],
    rafId: 0,
    isVisible: true,
    headlineBounds: { left: 0, right: 0, top: 0, bottom: 0 },
    startTime: performance.now(),
    scrollY: 0,
    targetScrollY: 0,

    currentTerrainScale: targetTerrainScale,
    currentVerticalCenter: targetVerticalCenter,
    currentContourOpacity: targetContourOpacity,
    currentParticleOpacity: targetParticleOpacity,
    currentDensityFactor: targetDensityFactor,
    currentPointerStrength: targetPointerStrength,
    currentSpeedFactor: targetSpeedFactor,
    activeVariant: variant,
  });

  // Keep target settings up to date in ref for animation loop
  const targetsRef = useRef({
    terrainScale: targetTerrainScale,
    verticalCenter: targetVerticalCenter,
    contourOpacity: targetContourOpacity,
    particleOpacity: targetParticleOpacity,
    densityFactor: targetDensityFactor,
    pointerStrength: targetPointerStrength,
    speedFactor: targetSpeedFactor,
    rippleEnabled: effectiveRippleEnabled,
    interactionEnabled,
    parallaxFactor,
    highlightDensity,
    variant,
  });

  useEffect(() => {
    targetsRef.current = {
      terrainScale: targetTerrainScale,
      verticalCenter: targetVerticalCenter,
      contourOpacity: targetContourOpacity,
      particleOpacity: targetParticleOpacity,
      densityFactor: targetDensityFactor,
      pointerStrength: targetPointerStrength,
      speedFactor: targetSpeedFactor,
      rippleEnabled: effectiveRippleEnabled,
      interactionEnabled,
      parallaxFactor,
      highlightDensity,
      variant,
    };

    const state = animState.current;
    state.activeVariant = variant;

    // Update targets on particles and contour lines for smooth morphing
    if (state.particles.length > 0) {
      updateParticleTargets(state.particles, variant);
    }
    if (state.contours.length > 0) {
      updateContourTargets(state.contours, variant);
    }

    if (reducedMotion) {
      state.currentTerrainScale = targetTerrainScale;
      state.currentVerticalCenter = targetVerticalCenter;
      state.currentContourOpacity = targetContourOpacity;
      state.currentParticleOpacity = targetParticleOpacity;
      state.currentDensityFactor = targetDensityFactor;
      state.currentPointerStrength = targetPointerStrength;
      state.currentSpeedFactor = targetSpeedFactor;

      // Snap heights immediately
      for (const p of state.particles) {
        p.currentHeight = p.targetHeight;
      }
      for (const line of state.contours) {
        for (const pt of line.points) {
          pt.currentHeight = pt.targetHeight;
        }
      }
      renderStaticFrame();
    }
  }, [
    variant,
    targetTerrainScale,
    targetVerticalCenter,
    targetContourOpacity,
    targetParticleOpacity,
    targetDensityFactor,
    targetPointerStrength,
    effectiveRippleEnabled,
    interactionEnabled,
    targetSpeedFactor,
    parallaxFactor,
    highlightDensity,
    reducedMotion,
  ]);

  const renderStaticFrameRef = useRef<() => void>(() => {});

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) {
      setHasError(true);
      return;
    }

    const state = animState.current;
    const isMobile = window.innerWidth < 768;
    const dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1.25 : 1.75);

    function computeCounts(w: number) {
      if (w >= 1280) return { pCount: 8400, cRows: 40, cSamples: 90 };
      if (w >= 1024) return { pCount: 6200, cRows: 34, cSamples: 80 };
      if (w >= 768) return { pCount: 4600, cRows: 28, cSamples: 70 };
      if (w >= 480) return { pCount: 3200, cRows: 24, cSamples: 56 };
      return { pCount: 2400, cRows: 20, cSamples: 44 };
    }

    function updateSizeAndData() {
      if (!container || !canvas) return;
      const rect = container.getBoundingClientRect();
      const w = Math.floor(rect.width);
      const h = Math.floor(rect.height);
      if (w <= 0 || h <= 0) return;

      state.width = w;
      state.height = h;

      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

      const { pCount, cRows, cSamples } = computeCounts(w);
      state.particles = generateParticles(pCount, targetsRef.current.variant);
      state.contours = generateContours(cRows, cSamples, targetsRef.current.variant);

      updateHeadlineBounds();
      renderFrame(performance.now(), true);
    }

    function updateHeadlineBounds() {
      // Find headlineRef or first visible main h1 on current page
      let targetEl = headlineRef?.current;
      if (!targetEl) {
        targetEl = document.querySelector('h1');
      }

      if (!targetEl || !container) {
        state.headlineBounds = { left: 0, right: 0, top: 0, bottom: 0 };
        return;
      }

      const hRect = targetEl.getBoundingClientRect();
      const cRect = container.getBoundingClientRect();
      // Soft clearing padding
      state.headlineBounds = {
        left: hRect.left - cRect.left - 24,
        right: hRect.right - cRect.left + 24,
        top: hRect.top - cRect.top - 16,
        bottom: hRect.bottom - cRect.top + 16,
      };
    }

    function drawSurveyOverlay(W: number, H: number, v: LandscapeVariant, introAlpha: number) {
      if (!ctx || introAlpha <= 0) return;

      ctx.save();
      ctx.lineWidth = 0.75;
      const faintColor = `rgba(232, 229, 222, ${(0.14 * introAlpha).toFixed(3)})`;
      const textColor = `rgba(232, 229, 222, ${(0.28 * introAlpha).toFixed(3)})`;

      ctx.strokeStyle = faintColor;
      ctx.fillStyle = textColor;
      ctx.font = '9.5px "IBM Plex Mono", ui-monospace, monospace';

      // Subtle horizontal baseline across bottom zone
      const baseLineY = Math.floor(H * 0.88);
      ctx.setLineDash([3, 7]);
      ctx.beginPath();
      ctx.moveTo(W * 0.08, baseLineY);
      ctx.lineTo(W * 0.92, baseLineY);
      ctx.stroke();
      ctx.setLineDash([]);

      // Corner crosshair registrations for subtle architectural framing
      const drawCross = (cx: number, cy: number) => {
        ctx!.beginPath();
        ctx!.moveTo(cx - 5, cy);
        ctx!.lineTo(cx + 5, cy);
        ctx!.moveTo(cx, cy - 5);
        ctx!.lineTo(cx, cy + 5);
        ctx!.stroke();
      };

      drawCross(32, 48);
      drawCross(W - 32, 48);
      drawCross(32, H - 48);
      drawCross(W - 32, H - 48);

      ctx.restore();
    }

    function renderFrame(now: number, isStaticOnly = false) {
      const { width: W, height: H, particles, contours, ripples, headlineBounds } = state;
      if (W === 0 || H === 0) return;

      const targets = targetsRef.current;
      const lerpFactor = reducedMotion ? 1 : 0.07;

      // Lerp visual parameters smoothly toward targets
      state.currentTerrainScale += (targets.terrainScale - state.currentTerrainScale) * lerpFactor;
      state.currentVerticalCenter += (targets.verticalCenter - state.currentVerticalCenter) * lerpFactor;
      state.currentContourOpacity += (targets.contourOpacity - state.currentContourOpacity) * lerpFactor;
      state.currentParticleOpacity += (targets.particleOpacity - state.currentParticleOpacity) * lerpFactor;
      state.currentDensityFactor += (targets.densityFactor - state.currentDensityFactor) * lerpFactor;
      state.currentPointerStrength += (targets.pointerStrength - state.currentPointerStrength) * lerpFactor;
      state.currentSpeedFactor += (targets.speedFactor - state.currentSpeedFactor) * lerpFactor;

      // Parallax scroll tracking
      state.scrollY += (state.targetScrollY - state.scrollY) * 0.1;
      const parallaxOffsetY = state.scrollY * targets.parallaxFactor;

      const T = (now - state.startTime) * 0.001 * state.currentSpeedFactor;
      const introFade = reducedMotion ? 1 : Math.min(1, Math.max(0, (now - state.startTime) / 1400));

      ctx!.clearRect(0, 0, W, H);

      // Smooth pointer interpolation
      if (targets.interactionEnabled && state.isPointerActive) {
        state.pointerX += (state.targetPointerX - state.pointerX) * 0.12;
        state.pointerY += (state.targetPointerY - state.pointerY) * 0.12;
        state.pointerNormalizedX = state.pointerX / W;
      } else if (!reducedMotion && targets.interactionEnabled) {
        // Subtle ambient Lissajous drift when no active touch/mouse
        const ambientX = W * (0.5 + 0.22 * Math.sin(T * 0.38));
        const ambientY = H * (0.52 + 0.12 * Math.sin(T * 0.29));
        state.pointerX += (ambientX - state.pointerX) * 0.05;
        state.pointerY += (ambientY - state.pointerY) * 0.05;
        state.pointerNormalizedX = state.pointerX / W;
      }

      const mx = state.pointerX;
      const my = state.pointerY;
      const panOffset = (state.pointerNormalizedX - 0.5) * -16;
      const pointerRadius = 110;
      const pointerRadiusSq = pointerRadius * pointerRadius;

      // Filter expired ripples (> 2400ms)
      state.ripples = targets.rippleEnabled ? ripples.filter((r) => now - r.t < 2400) : [];

      // 1. Render Contours
      ctx!.lineWidth = 0.75;
      const vertCenter = state.currentVerticalCenter;
      const tScale = state.currentTerrainScale;
      const cOpacity = state.currentContourOpacity;

      for (let i = 0; i < contours.length; i++) {
        const line = contours[i];
        const pts = line.points;
        const ptCount = pts.length;
        if (ptCount < 2) continue;

        ctx!.beginPath();
        const baseAlpha = line.baseAlpha * cOpacity * introFade;
        if (baseAlpha <= 0.005) continue;

        ctx!.strokeStyle = `rgba(232, 229, 222, ${baseAlpha.toFixed(3)})`;

        for (let j = 0; j < ptCount; j++) {
          const pt = pts[j];

          // Smooth height morphing towards target variant
          if (reducedMotion) {
            pt.currentHeight = pt.targetHeight;
          } else if (Math.abs(pt.currentHeight - pt.targetHeight) > 0.001) {
            pt.currentHeight += (pt.targetHeight - pt.currentHeight) * 0.075;
          }

          let px = W / 2 + pt.x * W * 0.47 * pt.k + panOffset * (0.4 + 0.6 * line.depth);
          let py = H * (vertCenter + 0.46 * pt.z) - pt.currentHeight * H * tScale * 0.35 * pt.k - parallaxOffsetY;

          if (!reducedMotion) {
            py += Math.sin(T * 0.35 + j * 0.12 + line.depth * 8) * 1.0;
          }

          // Pointer proximity displacement on contour
          if (targets.interactionEnabled) {
            const dx = px - mx;
            const dy = py - my;
            const distSq = dx * dx + dy * dy;
            if (distSq < pointerRadiusSq * 1.5) {
              const dist = Math.sqrt(distSq);
              const factor = Math.pow(1 - dist / (pointerRadius * 1.22), 2);
              py -= factor * (state.currentPointerStrength * 0.5);
            }
          }

          if (j === 0) {
            ctx!.moveTo(px, py);
          } else {
            ctx!.lineTo(px, py);
          }
        }
        ctx!.stroke();
      }

      // 2. Render Particles
      const pOpacity = state.currentParticleOpacity;
      const maxRenderIndex = Math.floor(particles.length * state.currentDensityFactor);

      for (let i = 0; i < maxRenderIndex; i++) {
        const p = particles[i];

        // Smooth height morphing towards target variant
        if (reducedMotion) {
          p.currentHeight = p.targetHeight;
        } else if (Math.abs(p.currentHeight - p.targetHeight) > 0.001) {
          p.currentHeight += (p.targetHeight - p.currentHeight) * 0.075;
        }

        let px = W / 2 + p.normX * W * 0.47 * p.k + panOffset * p.k;
        let py = H * (vertCenter + 0.46 * p.normZ) - p.currentHeight * H * tScale * 0.35 * p.k - parallaxOffsetY;

        // Pointer proximity repulsion
        let targetOffX = 0;
        let targetOffY = 0;

        if (targets.interactionEnabled) {
          const dx = px - mx;
          const dy = py - my;
          const distSq = dx * dx + dy * dy;

          if (distSq < pointerRadiusSq && distSq > 1) {
            const d = Math.sqrt(distSq);
            const push = Math.pow(1 - d / pointerRadius, 2) * state.currentPointerStrength;
            targetOffX = (dx / d) * push;
            targetOffY = (dy / d) * push - push * 0.35; // subtle lift
          }

          // Ripple ring displacement
          for (const rip of state.ripples) {
            const rx = px - rip.x;
            const ry = py - rip.y;
            const rDist = Math.sqrt(rx * rx + ry * ry) + 0.1;
            const rAge = (now - rip.t) / 1000;
            const waveRadius = rAge * 240;
            const waveDelta = rDist - waveRadius;

            if (Math.abs(waveDelta) < 60) {
              const waveAmp =
                Math.sin(waveDelta / 14) *
                Math.exp(-rAge * 1.6) *
                Math.exp(-Math.abs(waveDelta) / 45) *
                7.0;
              targetOffX += (rx / rDist) * waveAmp;
              targetOffY += (ry / rDist) * waveAmp;
            }
          }
        }

        // Smooth spring physics for particle offset
        p.offsetX += (targetOffX - p.offsetX) * 0.1;
        p.offsetY += (targetOffY - p.offsetY) * 0.1;
        px += p.offsetX;
        py += p.offsetY;

        // Ambient vertex oscillation & summit drift
        if (!reducedMotion) {
          px += Math.sin(T * 0.32 + p.phase) * 0.7;
          py += Math.cos(T * 0.28 + p.phase) * 0.7;

          if (p.drift) {
            p.driftOffset += p.driftSpeed * 0.12 * state.currentSpeedFactor;
            if (p.driftOffset > 32) {
              p.driftOffset = 0;
            }
            py -= p.driftOffset;
          }
        }

        // Soft headline clearing: calculate distance outside headline bounding rect
        let clearingFactor = 1.0;
        if (headlineBounds.right > headlineBounds.left) {
          const outX = Math.max(headlineBounds.left - px, 0, px - headlineBounds.right);
          const outY = Math.max(headlineBounds.top - py, 0, py - headlineBounds.bottom);
          const distFromText = Math.hypot(outX, outY);
          clearingFactor = Math.min(1, 0.22 + distFromText / 65);
        }

        // Drift fade out
        let driftFade = 1.0;
        if (p.drift) {
          driftFade = Math.max(0, 1 - p.driftOffset / 32);
        }

        const alpha = Math.min(1, p.baseAlpha * pOpacity * clearingFactor * introFade * driftFade);
        if (alpha <= 0.005) continue;

        ctx!.fillStyle = `rgba(245, 243, 237, ${alpha.toFixed(3)})`;
        ctx!.fillRect(px, py, p.size, p.size);
      }

      // 3. Technical Survey Overlay
      drawSurveyOverlay(W, H, state.activeVariant, introFade);
    }

    renderStaticFrameRef.current = () => renderFrame(performance.now(), true);

    function loop(now: number) {
      if (!state.isVisible || reducedMotion) return;
      renderFrame(now);
      state.rafId = requestAnimationFrame(loop);
    }

    // Window-level pointer event handlers for full immersive responsiveness
    const onPointerMove = (e: PointerEvent) => {
      if (!targetsRef.current.interactionEnabled) return;
      const rect = canvas.getBoundingClientRect();
      state.targetPointerX = e.clientX - rect.left;
      state.targetPointerY = e.clientY - rect.top;
      state.isPointerActive = true;
    };

    const onPointerLeave = () => {
      state.isPointerActive = false;
      state.targetPointerX = -9999;
      state.targetPointerY = -9999;
    };

    const onPointerDown = (e: PointerEvent) => {
      if (reducedMotion || !targetsRef.current.interactionEnabled || !targetsRef.current.rippleEnabled) return;
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      state.ripples.push({ x, y, t: performance.now() });
      if (state.ripples.length > 3) {
        state.ripples.shift();
      }
    };

    const onScroll = () => {
      state.targetScrollY = window.scrollY;
      updateHeadlineBounds();
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    document.addEventListener('mouseleave', onPointerLeave);
    window.addEventListener('pointerdown', onPointerDown, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });

    // Periodic headline bounds refresh (on DOM mutations or dynamic route elements)
    const boundsInterval = setInterval(updateHeadlineBounds, 600);

    // Visibility and resize observers
    const resizeObserver = new ResizeObserver(() => {
      updateSizeAndData();
    });
    resizeObserver.observe(container);

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        state.isVisible = entry.isIntersecting && !document.hidden;
        if (state.isVisible && !reducedMotion && !state.rafId) {
          state.rafId = requestAnimationFrame(loop);
        } else if (!state.isVisible && state.rafId) {
          cancelAnimationFrame(state.rafId);
          state.rafId = 0;
        }
      },
      { threshold: 0.05 }
    );
    intersectionObserver.observe(container);

    const onVisibilityChange = () => {
      state.isVisible = !document.hidden;
      if (state.isVisible && !reducedMotion && !state.rafId) {
        state.rafId = requestAnimationFrame(loop);
      } else if (!state.isVisible && state.rafId) {
        cancelAnimationFrame(state.rafId);
        state.rafId = 0;
      }
    };
    document.addEventListener('visibilitychange', onVisibilityChange);

    // Initial sizing and frame dispatch
    updateSizeAndData();
    if (!reducedMotion) {
      state.rafId = requestAnimationFrame(loop);
    }

    return () => {
      if (state.rafId) cancelAnimationFrame(state.rafId);
      window.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('mouseleave', onPointerLeave);
      window.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('visibilitychange', onVisibilityChange);
      clearInterval(boundsInterval);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
    };
  }, [headlineRef, reducedMotion]);

  function renderStaticFrame() {
    renderStaticFrameRef.current();
  }

  if (hasError) {
    return <LandscapeFallback />;
  }

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 w-full h-full overflow-hidden select-none pointer-events-none ${className}`}
      style={{ zIndex: 'var(--z-canvas, 0)' }}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
};
