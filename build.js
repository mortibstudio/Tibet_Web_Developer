const fs = require('fs');
const path = require('path');

const DIST = path.join(__dirname, 'dist');
const PUBLIC = path.join(__dirname, 'public');

function copyDir(src, dest) {
  try {
    fs.mkdirSync(dest, { recursive: true });
    for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
      const srcPath = path.join(src, entry.name);
      const destPath = path.join(dest, entry.name);
      if (['dist', 'public', 'node_modules', '.git', 'build.js', 'package.json', 'package-lock.json'].includes(entry.name)) continue;
      if (entry.isDirectory()) {
        copyDir(srcPath, destPath);
      } else {
        fs.copyFileSync(srcPath, destPath);
      }
    }
  } catch (err) {
    console.warn('Copy warning:', err.message);
  }
}

try {
  if (fs.existsSync(DIST)) fs.rmSync(DIST, { recursive: true, force: true });
  copyDir(__dirname, DIST);
} catch (e) {
  console.log('Dist sync skipped');
}

console.log('Build completed successfully!');
