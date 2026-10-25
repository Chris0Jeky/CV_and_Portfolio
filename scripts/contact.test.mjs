import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';

// Exercise the shipped component with only React's rendering/state boundary stubbed.
const code = readFileSync(new URL('../Portfolio/portfolio/dist/contact.js', import.meta.url), 'utf8');
const email = 'Jeky.tck@gmail.com';

function contact(clipboard) {
  const state = [];
  let slot = 0;
  const window = {};
  const React = {
    createElement: (type, props, ...children) => ({ type, props: props || {}, children }),
    useState(initial) {
      const index = slot++;
      if (!(index in state)) state[index] = initial;
      return [state[index], value => { state[index] = value; }];
    },
  };
  runInNewContext(code, { window, React, SectionHeader() {}, navigator: { clipboard }, setTimeout() {} });
  function render() {
    slot = 0;
    const nodes = [];
    function walk(node) {
      if (!node || typeof node !== 'object') return;
      nodes.push(node);
      node.children.forEach(walk);
    }
    walk(window.Contact());
    return {
      control: nodes.find(node => node.props['data-pb-contact'] === 'email'),
      status: nodes.find(node => node.props.role === 'status'),
    };
  }
  return render;
}

const text = node => node ? node.children.map(child => typeof child === 'object' ? text(child) : child).join('') : '';

test('copy email is a native keyboard-operable button with a persistent address', () => {
  const { control, status } = contact(undefined)();
  assert.equal(control.type, 'button');
  assert.equal(control.props.type, 'button');
  assert.equal(control.props['aria-label'], `Copy email address: ${email}`);
  assert.ok(text(control).includes(email));
  assert.ok(status, 'copy feedback has a live status region');
  assert.equal(text(status), '');
});

test('copy success is announced only after the clipboard write resolves', async () => {
  let complete;
  const writes = [];
  const render = contact({ writeText(value) {
    writes.push(value);
    return new Promise(resolve => { complete = resolve; });
  } });
  const copying = render().control.props.onClick();
  assert.deepEqual(writes, [email]);
  assert.doesNotMatch(text(render().control) + text(render().status), /copied/i);
  assert.equal(render().control.props.disabled, true);
  complete();
  await copying;
  assert.match(text(render().status), /copied to clipboard/i);
  assert.equal(render().control.props.disabled, false);
  assert.ok(text(render().control).includes(email));
});

for (const [name, clipboard] of [
  ['unavailable API', undefined],
  ['unavailable writeText', {}],
  ['synchronous exception', { writeText() { throw new Error('Denied'); } }],
  ['rejected permission', { writeText() {
    const rejected = Promise.reject(new Error('NotAllowedError'));
    rejected.catch(() => {}); // Keep the original implementation's unhandled rejection out of the test runner.
    return rejected;
  } }],
]) {
  test(`copy failure (${name}) is handled and gives a manual-copy fallback`, async () => {
    const render = contact(clipboard);
    await assert.doesNotReject(async () => render().control.props.onClick());
    assert.match(text(render().status), /could not copy/i);
    assert.match(text(render().status), /select and copy/i);
    assert.doesNotMatch(text(render().status), /copied to clipboard/i);
    assert.equal(render().control.props.disabled, false);
    assert.ok(text(render().control).includes(email));
  });
}

test('a failed copy can be retried successfully without stale error feedback', async () => {
  let attempts = 0;
  const render = contact({ writeText() {
    if (++attempts === 1) throw new Error('Denied');
    return Promise.resolve();
  } });
  await render().control.props.onClick();
  assert.match(text(render().status), /could not copy/i);
  await render().control.props.onClick();
  assert.equal(attempts, 2);
  assert.match(text(render().status), /copied to clipboard/i);
  assert.doesNotMatch(text(render().status), /could not copy/i);
});
