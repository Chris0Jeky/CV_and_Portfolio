// Checks that every relative link in the published HTML resolves to a file in this repository, so the site works
// unchanged at any base path: the GitHub Pages project path today, a custom domain's root later.
// Also lists the absolute references to the current GitHub Pages origin, which a domain cutover must review.
// Run: node scripts/check-links.mjs [--touchpoints]   (no dependencies; exits 1 on a broken link)
// Tests: node --test scripts/   (checkSite is the pure entry point they exercise)
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { dirname, isAbsolute, join, relative, resolve, sep } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ORIGIN = 'chris0jeky.github.io';
// This site's own address, or the bare origin (Pulseboard registers the origin alone). Links to the owner's other
// GitHub Pages projects are not touchpoints: they keep working when this site moves. The repository name needs a
// boundary after it, so a look-alike such as CV_and_Portfolio-old does not count.
const SELF = /chris0jeky\.github\.io(?:\/CV_and_Portfolio(?![\w.-])|\/?["'`]|\/?$)/i;
// Reference-only copies of earlier site versions; AGENTS.md says not to edit them, so they are not checked.
const SKIP_DIRS = new Set(['.git', '.claude', 'node_modules', 'archive']);
const SOURCE_EXT = /\.(html|jsx|js|mjs|json|md)$/;
// These two name the origin on purpose (the regex above, its fixtures), so they are not touchpoints.
const SELF_FILES = new Set(['scripts/check-links.mjs', 'scripts/check-links.test.mjs']);
// A link is either a comment or live HTML. Scripts and styles are matched as whole blocks first, so a "<!--" inside
// a script string cannot open a comment that swallows the live HTML after it. An unclosed comment runs to the end.
const COMMENT_OR_RAW = /<!--[\s\S]*?(?:-->|$)|<(script|style)\b[^>]*>[\s\S]*?<\/\1\s*>/gi;
const ATTRIBUTE = /\b(?:href|src)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+))/gi;

// Comments go; a script or style keeps only its opening tag (its own src is a real link) and loses its body, which is
// code or CSS, where `const src = f()` or `a[href=x]` is not an attribute.
const stripComments = text => text.replace(COMMENT_OR_RAW, (whole, tag) => (tag ? whole.match(/^<[^>]*>/)[0] : ''));

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

// Decodes each path component on its own, so %23 is a literal "#" and %2F cannot smuggle in a separator.
// Returns the decoded components, or a string naming why the path cannot be decoded.
function decodeComponents(path) {
  const parts = [];
  for (const raw of path.split('/')) {
    let part;
    try {
      part = decodeURIComponent(raw);
    } catch {
      return 'has invalid percent-encoding';
    }
    if (/[/\\]/.test(part)) return 'encodes a path separator';
    parts.push(part);
  }
  return parts;
}

// Pages serve from a case-sensitive file system, but Windows and macOS checkouts are not, so a mis-cased link works
// locally and 404s live. Compare each component's spelling with its parent's listing; a directory needs an index.html.
function resolvesExactly(root, resolved) {
  const where = relative(root, resolved);
  if (where === '..' || where.startsWith(`..${sep}`) || isAbsolute(where)) return false;
  let current = root;
  for (const part of where ? where.split(sep) : []) {
    let listing;
    try {
      listing = readdirSync(current);
    } catch {
      return false;
    }
    if (!listing.includes(part)) return false;
    current = join(current, part);
  }
  if (!existsSync(current)) return false;
  if (!statSync(current).isDirectory()) return true;
  return readdirSync(current).includes('index.html');
}

export function checkSite(rootDir) {
  const root = resolve(rootDir);
  const rel = path => relative(root, path).split(sep).join('/');
  const files = walk(root);
  const html = files.filter(path => path.endsWith('.html'));

  const broken = [];
  let checked = 0;
  for (const file of html) {
    const text = stripComments(readFileSync(file, 'utf8'));
    for (const match of text.matchAll(ATTRIBUTE)) {
      const target = (match[1] ?? match[2] ?? match[3]).trim();
      if (!target || /^(?:[a-z][a-z0-9+.-]*:|\/\/|#)/i.test(target)) continue;
      const path = target.split(/[?#]/)[0];
      if (!path) continue;
      checked += 1;
      // A leading slash would resolve against the host root, which moves when the base path changes.
      if (path.startsWith('/')) {
        broken.push(`${rel(file)}: root-absolute link "${target}" breaks when the base path changes`);
        continue;
      }
      const parts = decodeComponents(path);
      if (typeof parts === 'string') {
        broken.push(`${rel(file)}: "${target}" ${parts}`);
        continue;
      }
      if (!resolvesExactly(root, resolve(dirname(file), ...parts))) {
        broken.push(`${rel(file)}: "${target}" does not resolve to a file in the repository (exact case, directory needs index.html)`);
      }
    }
  }

  const touchpoints = [];
  for (const file of files.filter(path => SOURCE_EXT.test(path) && !SELF_FILES.has(rel(path)))) {
    readFileSync(file, 'utf8').split('\n').forEach((line, index) => {
      if (SELF.test(line)) touchpoints.push(`${rel(file)}:${index + 1}`);
    });
  }

  return { broken, touchpoints, checked, htmlCount: html.length, cname: existsSync(join(root, 'CNAME')) };
}

function main() {
  const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
  const { broken, touchpoints, checked, htmlCount, cname } = checkSite(root);
  console.log(`checked ${checked} relative links in ${htmlCount} HTML files (archive excluded)`);
  console.log(`custom domain: ${cname ? 'root CNAME present' : 'inactive (no root CNAME)'}`);
  console.log(`${touchpoints.length} lines reference this site's ${ORIGIN} address; review them at a domain cutover (--touchpoints lists them)`);
  if (process.argv.includes('--touchpoints')) for (const line of touchpoints) console.log(`  ${line}`);
  if (broken.length) {
    for (const line of broken) console.error(`BROKEN ${line}`);
    process.exit(1);
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) main();
