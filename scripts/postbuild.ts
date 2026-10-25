import fs from 'node:fs';
import path from 'node:path';

function postbuild() {
  const distDir = path.resolve(process.cwd(), 'dist');
  const indexHtml = path.join(distDir, 'index.html');
  const notFoundHtml = path.join(distDir, '404.html');

  if (!fs.existsSync(indexHtml)) {
    console.error('[postbuild] Error: dist/index.html does not exist');
    process.exit(1);
  }

  // Copy index.html to 404.html for GitHub Pages client-side SPA routing
  fs.copyFileSync(indexHtml, notFoundHtml);
  console.log('[postbuild] Successfully created dist/404.html for GitHub Pages direct routing');
}

postbuild();
