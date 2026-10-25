import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig(({ mode }) => {
  // Base path for GitHub Pages deployment:
  // GitHub repository: pragyanbhatt1213/pragyanbhatt.github.io
  // GitHub Pages URL: https://pragyanbhatt1213.github.io/pragyanbhatt.github.io/
  // In development (npm run dev), use '/' so localhost:3000 works cleanly.
  // In production (npm run build), use '/pragyanbhatt.github.io/' (or VITE_BASE_PATH if overridden).
  const base = process.env.VITE_BASE_PATH ?? (mode === 'development' ? '/' : '/pragyanbhatt.github.io/');

  return {
    base,
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(import.meta.dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
