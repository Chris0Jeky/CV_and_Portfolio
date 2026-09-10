# Observatory integration

Shared collector/dashboard: [Pulseboard #15](https://github.com/Chris0Jeky/Pulseboard/pull/15), source commit `8d92fff11f581d600c357e402cd521426665f318`.

The portfolio entry loads a same-origin, vendored adapter after mounting the application. Its endpoint is empty, so collection and consent storage remain off. Biography, CVs, archive pages, images and existing interactions are unchanged. There is no new CDN dependency.

Run `node observatory/check.mjs`, then the portfolio's existing browser checks, including the published subpath and mobile layout. The shared kit has 58 passing local tests, but this host's full browser checks have not been executed here.

Before activation, deploy the collector, review the site notice and regenerate the locked script with the exact project endpoint. Verify explicit consent and withdrawal. Baseline active signals are page views and content-free error occurrence counts. Project/contact names are reserved for later semantic hooks; a contact-link request is not a confirmed lead, email, interview or hire. Never send form text or visitor identities.
