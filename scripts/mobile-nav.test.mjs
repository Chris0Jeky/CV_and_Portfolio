import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';

const html = readFileSync(new URL('../Portfolio/portfolio.html', import.meta.url), 'utf8');
const app = readFileSync(new URL('../Portfolio/portfolio/dist/app.js', import.meta.url), 'utf8');
const menuScript = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)]
  .map(match => match[1]).find(code => code.includes('mobile-nav'));

test('mobile navigation uses a labelled native dialog for Escape and background inertness', () => {
  assert.match(html, /<dialog\b[^>]*id="mobile-nav"[^>]*aria-label="Mobile navigation"/);
  assert.match(html, /<button\b[^>]*id="mobile-nav-close"[^>]*aria-label="Close menu"[^>]*autofocus/);
  assert.match(html, /\.mobile-nav-overlay\[open\]\s*\{\s*display:\s*flex;/);
  assert.doesNotMatch(html, /onclick="closeMobileNav\(\)"/);
});

function launcher(menu) {
  const React = {
    createElement: (type, props, ...children) => ({ type, props: props || {}, children }),
  };
  const tree = runInNewContext(`${app}\nNav();`, {
    React,
    ReactDOM: { createRoot: () => ({ render() {} }) },
    document: { getElementById: id => id === 'mobile-nav' ? menu : {} },
  });
  function find(node) {
    if (!node || typeof node !== 'object') return;
    if (node.props['aria-label'] === 'Menu') return node;
    return node.children.map(find).find(Boolean);
  }
  return find(tree);
}

test('the shipped menu launcher opens modally and identifies its controlled dialog', () => {
  let opened = 0;
  const menu = {
    open: false,
    classList: { add() {} },
    showModal() { this.open = true; opened++; },
  };
  const button = launcher(menu);
  button.props.onClick();
  assert.equal(opened, 1, 'opening must use showModal, not just make the overlay visible');
  assert.equal(button.props['aria-controls'], 'mobile-nav');
  assert.equal(button.props['aria-haspopup'], 'dialog');
  button.props.onClick();
  assert.equal(opened, 1, 'an already open dialog is not reopened');
  assert.doesNotThrow(() => launcher(null).props.onClick());
});

test('the close button and all five section links dismiss the dialog without cancelling navigation', () => {
  const targets = [...html.matchAll(/<a href="(#(?:about|experience|projects|skills|contact))"/g)]
    .map(match => match[1]);
  assert.deepEqual(targets, ['#about', '#experience', '#projects', '#skills', '#contact']);
  const controls = ['close', ...targets].map(name => ({
    name,
    listeners: {},
    addEventListener(type, listener) { this.listeners[type] = listener; },
  }));
  let closed = 0;
  const menu = {
    close() { closed++; },
    querySelectorAll: () => controls,
  };
  runInNewContext(menuScript, { document: { getElementById: () => menu } });
  for (const control of controls) {
    assert.equal(typeof control.listeners.click, 'function', `${control.name} must have a close handler`);
    let prevented = false;
    control.listeners.click({ preventDefault() { prevented = true; } });
    assert.equal(prevented, false, `${control.name} must retain normal anchor navigation`);
  }
  assert.equal(closed, controls.length);
  assert.doesNotThrow(() => runInNewContext(menuScript, { document: { getElementById: () => null } }));
});
