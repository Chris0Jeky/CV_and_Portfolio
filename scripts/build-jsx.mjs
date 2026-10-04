// Precompiles the portfolio's JSX so the page no longer downloads and runs Babel in the browser.
// It uses the same Babel build (@babel/standalone, pinned) and the same options its in-browser
// <script type="text/babel"> loader applied, so the output behaves as before: presets react + env
// (top-level const becomes var, which these classic scripts rely on to share globals) and the
// loader's three default plugins.
// Run: node scripts/build-jsx.mjs           writes Portfolio/portfolio/dist/*.js
//      node scripts/build-jsx.mjs --check   exits 1 if dist/ is missing, stale or has extra files
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const Babel = require('@babel/standalone');

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const srcDir = join(root, 'Portfolio', 'portfolio');
const outDir = join(srcDir, 'dist');
const check = process.argv.includes('--check');

const options = filename => ({
  filename,
  presets: ['react', 'env'],
  plugins: ['transform-class-properties', 'transform-object-rest-spread', 'transform-flow-strip-types'],
  targets: { browsers: undefined },
  sourceMaps: false,
});

const sources = readdirSync(srcDir).filter(name => name.endsWith('.jsx')).sort();
const expected = new Map();
for (const name of sources) {
  const code = readFileSync(join(srcDir, name), 'utf8').replaceAll('\r\n', '\n');
  const out = Babel.transform(code, options(`portfolio/${name}`)).code;
  const header = `/* Generated from portfolio/${name} by scripts/build-jsx.mjs (@babel/standalone ${Babel.version}); edit the .jsx and rebuild. */\n`;
  expected.set(name.replace(/\.jsx$/, '.js'), header + out + '\n');
}

if (check) {
  const problems = [];
  const present = existsSync(outDir) ? readdirSync(outDir).filter(name => name.endsWith('.js')) : [];
  for (const [name, text] of expected) {
    const path = join(outDir, name);
    if (!existsSync(path)) problems.push(`missing dist/${name}`);
    else if (readFileSync(path, 'utf8').replaceAll('\r\n', '\n') !== text) problems.push(`stale dist/${name}`);
  }
  for (const name of present) if (!expected.has(name)) problems.push(`extra dist/${name} (no matching .jsx)`);
  if (problems.length) {
    for (const line of problems) console.error(line);
    console.error('Run `npm run build` and commit Portfolio/portfolio/dist/.');
    process.exit(1);
  }
  console.log(`dist/ matches ${expected.size} JSX sources`);
} else {
  mkdirSync(outDir, { recursive: true });
  for (const [name, text] of expected) writeFileSync(join(outDir, name), text);
  console.log(`wrote ${expected.size} files to Portfolio/portfolio/dist/`);
}
