// Checks that every relative link in the published HTML resolves to a file in this repository, so the
// site works unchanged at any base path: the GitHub Pages project path today, a custom domain's root later.
// Also lists the absolute references to the current GitHub Pages origin, which a domain cutover must review.
// Run: node scripts/check-links.mjs [--touchpoints]   (no dependencies; exits 1 on a broken link)
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { dirname, join, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const ORIGIN = 'chris0jeky.github.io';
// This site's own address, or the bare origin (Pulseboard registers the origin alone). Links to the owner's other
// GitHub Pages projects are not touchpoints: they keep working when this site moves.
const SELF = /chris0jeky\.github\.io(?:\/CV_and_Portfolio|["'`]|\/?$)/i;
// Reference-only copies of earlier site versions; AGENTS.md says not to edit them, so they are not checked.
const SKIP_DIRS = new Set(['.git', '.claude', 'node_modules', 'archive']);
const SOURCE_EXT = /\.(html|jsx|js|mjs|json|md)$/;

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) {
      if (!SKIP_DIRS.has(name)) walk(path, out);
    } else {
      out.push(path);
    }
  }
  return out;
}

const rel = path => relative(root, path).split(sep).join('/');
const files = walk(root);
const html = files.filter(path => path.endsWith('.html'));

const broken = [];
let checked = 0;
for (const file of html) {
  const text = readFileSync(file, 'utf8').replace(/<!--[\s\S]*?-->/g, '');
  for (const match of text.matchAll(/\b(?:href|src)\s*=\s*"([^"]*)"/g)) {
    const target = match[1].trim();
    if (!target || /^(?:[a-z][a-z0-9+.-]*:|\/\/|#)/i.test(target)) continue;
    const path = decodeURI(target.split(/[?#]/)[0]);
    if (!path) continue;
    checked += 1;
    // A leading slash would resolve against the host root, which moves when the base path changes.
    if (path.startsWith('/')) {
      broken.push(`${rel(file)}: root-absolute link "${target}" breaks when the base path changes`);
      continue;
    }
    const resolved = resolve(dirname(file), path);
    if (!resolved.startsWith(root) || !existsSync(resolved)) {
      broken.push(`${rel(file)}: "${target}" does not resolve to a file in the repository`);
    }
  }
}

const touchpoints = [];
for (const file of files.filter(path => SOURCE_EXT.test(path) && path !== fileURLToPath(import.meta.url))) {
  readFileSync(file, 'utf8').split('\n').forEach((line, index) => {
    if (SELF.test(line)) touchpoints.push(`${rel(file)}:${index + 1}`);
  });
}

const cname = existsSync(join(root, 'CNAME'));
console.log(`checked ${checked} relative links in ${html.length} HTML files (archive excluded)`);
console.log(`custom domain: ${cname ? 'ACTIVE (root CNAME present)' : 'inactive (no root CNAME)'}`);
console.log(`${touchpoints.length} lines reference this site's ${ORIGIN} address; review them at a domain cutover (--touchpoints lists them)`);
if (process.argv.includes('--touchpoints')) for (const line of touchpoints) console.log(`  ${line}`);
if (broken.length) {
  for (const line of broken) console.error(`BROKEN ${line}`);
  process.exit(1);
}
