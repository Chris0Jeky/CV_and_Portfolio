// Tests for scripts/check-links.mjs. Run: node --test scripts/
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { checkSite } from './check-links.mjs';

// Builds a temp fixture tree from { 'relative/path': 'contents' }, runs the check on its "site" directory, and
// cleans up. Files outside "site/" are siblings of the root, for the root-boundary cases.
function withSite(tree, fn) {
  const base = mkdtempSync(join(tmpdir(), 'check-links-'));
  try {
    for (const [name, body] of Object.entries(tree)) {
      const path = join(base, name);
      mkdirSync(dirname(path), { recursive: true });
      writeFileSync(path, body);
    }
    return fn(checkSite(join(base, 'site')));
  } finally {
    rmSync(base, { recursive: true, force: true });
  }
}

const page = body => `<!doctype html><html><body>${body}</body></html>`;
const site = tree => Object.fromEntries(Object.entries(tree).map(([k, v]) => [`site/${k}`, v]));

test('a clean site has no broken links and counts what it checked', () => {
  withSite(site({
    'index.html': page('<a href="a/page.html">a</a><img src="img/p.png">'),
    'a/page.html': page('<a href="../index.html">home</a>'),
    'img/p.png': 'x',
  }), result => {
    assert.deepEqual(result.broken, []);
    assert.equal(result.checked, 3);
  });
});

test('a missing target is reported with file and target', () => {
  withSite(site({ 'index.html': page('<a href="nope.html">x</a>') }), ({ broken }) => {
    assert.equal(broken.length, 1);
    assert.match(broken[0], /index\.html: "nope\.html"/);
  });
});

test('external, mailto, protocol-relative and fragment links are not checked', () => {
  withSite(site({
    'index.html': page('<a href="https://example.com/x">a</a><a href="mailto:a@b.c">b</a><a href="//cdn.x/y.js">c</a><a href="#top">d</a>'),
  }), ({ broken, checked }) => {
    assert.deepEqual(broken, []);
    assert.equal(checked, 0);
  });
});

test('a root-absolute link is reported', () => {
  withSite(site({ 'index.html': page('<a href="/x.html">x</a>'), 'x.html': page('') }), ({ broken }) => {
    assert.equal(broken.length, 1);
    assert.match(broken[0], /root-absolute link "\/x\.html"/);
  });
});

test('query strings and fragments are ignored when resolving', () => {
  withSite(site({ 'index.html': page('<a href="b.html?x=1#y">b</a>'), 'b.html': page('') }), ({ broken }) => {
    assert.deepEqual(broken, []);
  });
});

test('path spelling must match exactly: wrong case on any component fails', () => {
  const tree = site({
    'index.html': page('<img src="portfolio/images/headshot.jpg"><img src="Portfolio/Images/headshot.jpg"><img src="Portfolio/images/Headshot.jpg">'),
    'Portfolio/images/headshot.jpg': 'x',
  });
  withSite(tree, ({ broken }) => assert.equal(broken.length, 3));
});

test('exact-case links to the same file pass', () => {
  withSite(site({
    'index.html': page('<img src="Portfolio/images/headshot.jpg">'),
    'Portfolio/images/headshot.jpg': 'x',
  }), ({ broken }) => assert.deepEqual(broken, []));
});

test('a link that escapes the root is rejected, including into a sibling with the same prefix', () => {
  withSite({
    'site/index.html': page('<img src="../site-old/x.png"><img src="../outside.png">'),
    'site-old/x.png': 'x',
    'outside.png': 'x',
  }, ({ broken }) => {
    assert.equal(broken.length, 2);
    for (const line of broken) assert.match(line, /does not resolve/);
  });
});

test('double-quoted, single-quoted, unquoted and any-case attributes are all checked', () => {
  const links = ['<a href="d.html">', "<a href='s.html'>", '<a href=u.html>', '<A HREF="U1.html">', "<IMG SRC='U2.png'>", '<a href = "sp.html">'];
  withSite(site({ 'index.html': page(links.join('')) }), ({ broken, checked }) => {
    assert.equal(checked, links.length);
    assert.equal(broken.length, links.length);
  });
});

test('existing targets in every attribute form pass', () => {
  const links = ['<a href="d.html">', "<a href='s.html'>", '<a href=u.html>', '<A HREF="up.html">'];
  withSite(site({
    'index.html': page(links.join('')),
    'd.html': '', 's.html': '', 'u.html': '', 'up.html': '',
  }), ({ broken, checked }) => {
    assert.deepEqual(broken, []);
    assert.equal(checked, links.length);
  });
});

test('a commented-out link is ignored', () => {
  withSite(site({ 'index.html': page('<!-- <a href="gone.html">x</a> --><a href="ok.html">ok</a>'), 'ok.html': '' }), ({ broken, checked }) => {
    assert.deepEqual(broken, []);
    assert.equal(checked, 1);
  });
});

test('a "<!--" inside a script does not hide live HTML after it', () => {
  const html = page('<script>var s = "<!--";</script><a href="missing.html">live</a><!-- real comment <a href="hidden.html">x</a> -->');
  withSite(site({ 'index.html': html }), ({ broken }) => {
    assert.equal(broken.length, 1);
    assert.match(broken[0], /"missing\.html"/);
  });
});

test('percent-encoding is decoded per component, so %23 is a literal #', () => {
  withSite(site({
    'index.html': page('<a href="a%23b.html">x</a><a href="my%20dir/f%20g.html">y</a>'),
    'a#b.html': '',
    'my dir/f g.html': '',
  }), ({ broken }) => assert.deepEqual(broken, []));
});

test('invalid percent-encoding is reported with file and target, not thrown', () => {
  withSite(site({ 'index.html': page('<img src="%"><a href="a%2Fb.html">x</a>') }), ({ broken }) => {
    assert.equal(broken.length, 2);
    assert.match(broken[0], /index\.html: "%"/);
    assert.match(broken[1], /index\.html: "a%2Fb\.html"/);
  });
});

test('a directory target needs an index.html', () => {
  withSite(site({
    'index.html': page('<a href="has/">a</a><a href="has">b</a><a href="empty/">c</a><a href="empty">d</a><a href="./">e</a>'),
    'has/index.html': page(''),
    'empty/readme.txt': 'x',
  }), ({ broken }) => {
    assert.equal(broken.length, 2);
    assert.match(broken[0], /"empty\/"/);
    assert.match(broken[1], /"empty"/);
  });
});

test('a directory whose index is spelled with the wrong case fails', () => {
  withSite(site({ 'index.html': page('<a href="d/">a</a>'), 'd/Index.html': '' }), ({ broken }) => assert.equal(broken.length, 1));
});

test('archive and dot-directories are not walked', () => {
  withSite(site({
    'index.html': page(''),
    'Portfolio/archive/old.html': page('<a href="gone.html">x</a>'),
    '.claude/x.html': page('<a href="gone.html">x</a>'),
  }), ({ broken }) => assert.deepEqual(broken, []));
});

test('touchpoints: own address counts, other projects and look-alike repositories do not', () => {
  const lines = [
    'https://chris0jeky.github.io/CV_and_Portfolio/', // 1 counts
    'https://chris0jeky.github.io/CV_and_Portfolio', // 2 counts
    '"https://chris0jeky.github.io/"', // 3 counts: trailing slash before the quote
    '"https://chris0jeky.github.io"', // 4 counts
    'https://chris0jeky.github.io/CV_and_Portfolio-old/', // 5 not: no boundary after the repository name
    'https://chris0jeky.github.io/CV_and_Portfolio2', // 6 not
    'https://chris0jeky.github.io/estate-atlas/', // 7 not: another project
  ];
  withSite(site({ 'index.html': page(''), 'NOTES.md': lines.join('\n') }), ({ touchpoints }) => {
    assert.deepEqual(touchpoints, ['NOTES.md:1', 'NOTES.md:2', 'NOTES.md:3', 'NOTES.md:4']);
  });
});

test('root CNAME is reported when present', () => {
  withSite(site({ 'index.html': page('') }), result => assert.equal(result.cname, false));
  withSite(site({ 'index.html': page(''), CNAME: 'example.com\n' }), result => assert.equal(result.cname, true));
});

test('script and style bodies are not scanned for attributes, but the script tag itself is', () => {
  const html = page('<script src="app.js">const src = buildAssetUrl(); const href = "x";</script>'
    + '<script>var o = { src=other(), href = nowhere };</script><style>a[href=foo] { color: red }</style>'
    + '<script src="missing.js"></script>');
  withSite(site({ 'index.html': html, 'app.js': '' }), ({ broken, checked }) => {
    assert.equal(checked, 2);
    assert.equal(broken.length, 1);
    assert.match(broken[0], /"missing\.js"/);
  });
});

test('only real traversal escapes the root: names that merely start with two dots are inside it', () => {
  withSite(site({
    'index.html': page('<a href="..notes.html">a</a><a href="..dir/page.html">b</a><a href="..">c</a><a href="../x.html">d</a>'),
    '..notes.html': '',
    '..dir/page.html': '',
  }), ({ broken }) => {
    assert.equal(broken.length, 2);
    assert.match(broken[0], /"\.\."/);
    assert.match(broken[1], /"\.\.\/x\.html"/);
  });
});
