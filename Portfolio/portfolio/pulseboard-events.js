// Product events for the Pulseboard SDK (Portfolio/pulseboard.js, loaded with defer).
// Every call is guarded: the page behaves the same when the SDK is absent, blocked or inert.
// Props are closed enums from this site's own data only; never free text, names or URLs.
(() => {
  'use strict';

  const PROJECTS = ['wealthlens', 'taskdeck', 'navsentinel', 'npdl'];
  const LINKS = ['repo', 'site'];
  const CHANNELS = ['email', 'github', 'linkedin'];

  function call(method, ...args) {
    try {
      const sdk = window.Pulseboard;
      if (sdk && typeof sdk[method] === 'function') return sdk[method](...args) === true;
    } catch (_) {
      // The SDK never throws by contract; this guard covers a missing or replaced global.
    }
    return false;
  }

  function project(slug, link) {
    if (!PROJECTS.includes(slug)) return false;
    return call('track', 'project.opened', LINKS.includes(link) ? { project: slug, link } : { project: slug });
  }

  function contact(channel) {
    if (!CHANNELS.includes(channel)) return false;
    return call('track', 'contact.requested', { channel });
  }

  // Registered routes: home, project, cv. This page has no CV view, so only the projects section maps.
  const routeFor = hash => (hash === '#projects' ? 'project' : 'home');
  let current = 'home';
  function syncRoute() {
    const next = routeFor(window.location.hash);
    if (next === current) return false;
    current = next;
    return call('route', next);
  }

  function onClick(event) {
    const target = event.target;
    const el = target && typeof target.closest === 'function'
      ? target.closest('[data-pb-project], [data-pb-contact]')
      : null;
    if (!el) return;
    const slug = el.getAttribute('data-pb-project');
    if (slug) project(slug, el.getAttribute('data-pb-link'));
    else contact(el.getAttribute('data-pb-contact'));
  }

  document.addEventListener('click', onClick, true);
  window.addEventListener('hashchange', syncRoute);
  // A deep link such as #projects: the SDK has mounted with "home" by DOMContentLoaded (it loads with defer).
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', syncRoute, { once: true });
  else syncRoute();

  window.PortfolioPulse = Object.freeze({ project, contact, syncRoute });
})();
