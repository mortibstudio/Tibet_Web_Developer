const fs = require('fs');
const path = require('path');

const DIST = path.join(__dirname, 'dist');

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.name === 'dist' || entry.name === 'node_modules' || entry.name === '.git' || entry.name === 'build.js' || entry.name === 'package.json' || entry.name === 'package-lock.json') continue;
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

// Clean dist
if (fs.existsSync(DIST)) fs.rmSync(DIST, { recursive: true });

// Copy everything to dist
copyDir(__dirname, DIST);

console.log('Build complete — files copied to dist/');
