const fs = require('fs');
const path = require('path');

const DIST = path.join(__dirname, 'dist');
const PUBLIC = path.join(__dirname, 'public');

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.name === 'dist' || entry.name === 'public' || entry.name === 'node_modules' || entry.name === '.git' || entry.name === 'build.js' || entry.name === 'package.json' || entry.name === 'package-lock.json') continue;
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

// Clean & sync dist
if (fs.existsSync(DIST)) fs.rmSync(DIST, { recursive: true });
copyDir(__dirname, DIST);

// Clean & sync public
if (fs.existsSync(PUBLIC)) fs.rmSync(PUBLIC, { recursive: true });
copyDir(__dirname, PUBLIC);

console.log('Build complete — files synced to dist/ and public/');
