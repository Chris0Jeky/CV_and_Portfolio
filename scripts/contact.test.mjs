import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import Babel from '@babel/standalone';

const read = path => readFileSync(new URL(path, import.meta.url), 'utf8');

// Render the component's element tree without a browser or network dependencies.
function contactLinks(code) {
  const context = vm.createContext({
    window: {},
    SectionHeader: () => null,
    React: {
      useState: value => [value, () => {}],
      createElement(type, props, ...children) {
        if (typeof type === 'function') return type({ ...props, children });
        return { type, props: props || {}, children };
      },
    },
  });
  vm.runInContext(code, context);
  const links = [];
  function walk(node) {
    if (!node || typeof node !== 'object') return;
    if (node.type === 'a' && node.props.target === '_blank') links.push(node);
    node.children.forEach(walk);
  }
  walk(context.window.Contact());
  return links;
}

for (const variant of ['source', 'production']) {
  test(`${variant}: contact links navigate to the displayed HTTPS destination`, () => {
    const code = variant === 'source'
      ? Babel.transform(read('../Portfolio/portfolio/contact.jsx'), { presets: ['react'] }).code
      : read('../Portfolio/portfolio/dist/contact.js');
    const links = contactLinks(code);
    const linkedin = links.find(link => link.props['data-pb-contact'] === 'linkedin');
    assert.ok(linkedin, 'The LinkedIn contact is rendered');
    assert.equal(linkedin.props.href, 'https://www.linkedin.com/in/cristian-tcaci/');

    for (const link of links) {
      const displayed = link.children[1].children.join('');
      const url = new URL(link.props.href); // Rejects placeholders and relative destinations.
      assert.equal(url.protocol, 'https:', displayed);
      assert.equal(
        `${url.hostname.replace(/^www\./, '')}${url.pathname}`.replace(/\/$/, ''),
        displayed,
      );
      for (const token of ['noopener', 'noreferrer']) {
        assert.ok(link.props.rel.split(/\s+/).includes(token), `${displayed}: ${token}`);
      }
    }
  });
}
