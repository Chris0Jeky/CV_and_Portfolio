# Pulseboard SDK v3

The live portfolio (`Portfolio/portfolio.html`) loads `Portfolio/pulseboard.js`, the Pulseboard SDK 3.1.0
built for project id `portfolio` by Pulseboard's `observatory/adapters/build-sdk.mjs` (Chris0Jeky/Pulseboard#105).
Do not edit the artifact: rebuild it from a Pulseboard checkout and update the sha256 in `observatory.lock.json`.

```sh
cd <Pulseboard>/observatory
node adapters/build-sdk.mjs portfolio <this repo> Portfolio/pulseboard.js
```

Only the live portfolio page loads it. Archive copies, the CV pages and the case-study pages do not, and
`observatory/check.mjs` fails if any other HTML file mentions it.

## What the page sends

The SDK shows a one-line **Beta** bar (rendered into the reserved `data-pulseboard-bar` placeholder at the top
of `<body>`), then a small Beta button bottom left that reopens the choices. Three categories:

| Category | Sends | Outside the EEA | In the EEA or unknown |
|---|---|---|---|
| Usage counts | daily aggregate counts per event, route and release | on | on |
| Diagnostics | load timings, script error summaries, visible time and scroll depth | on | off until OK |
| Journeys and product data | a per-tab random session id and the product events below | on | off until OK |

Global Privacy Control or Do Not Track turns everything off with no request at all. Detailed events are kept
90 days; daily counts are currently kept 14 days. No names, emails, IP addresses or page URLs are stored.

`Portfolio/portfolio/pulseboard-events.js` adds the product events, all guarded so the page works when the SDK
is absent, blocked or inert:

- `route('project')` when the hash is `#projects`, `route('home')` otherwise (the registered `cv` route is unused:
  this page has no CV view). The page declares `<html data-pulseboard-route="home">`; on a `#projects` deep link
  the event script, which runs before the deferred SDK, sets it to `project` so the first view is recorded once
  for the right route.
- `project.opened` `{ project, link }`: `project` is one of `wealthlens`, `taskdeck`, `navsentinel`, `npdl`
  (the site's own project names), `link` is `repo` or `site`. Fired from the project buttons, the contact
  repository rows and the command palette.
- `contact.requested` `{ channel }`: `email` (copy address), `github`, `linkedin`. A request is a click, not a
  confirmed message.

There is no CV download on the live page, so `cv.downloaded` is not wired.

## Origin

The collector admits `https://chris0jeky.github.io`, which this site shares with other GitHub Pages projects
(Developer Lens showcase, IdleHarbor, WealthLens). The SDK keys its storage by project id
(`pulseboard:*:portfolio`), so their choices and markers do not mix. Collection starts only when Pulseboard adds
`portfolio` to its admission lists; until then the collector refuses the requests and the SDK stops after three
failures per endpoint.

GitHub Pages cannot set response headers and the page has no CSP meta tag. If one is added, `connect-src` must
include `https://pulseboard-observatory.commit-atlas.workers.dev`.

## Check

`npm test` (or `node observatory/check.mjs`): the lock hash, the 3.1.0 header and collector origin, no
server-only constants, a fake-browser run (the API is defined, nothing is sent before the bar mounts, GPC sends
nothing, another origin is inert), the page wiring, and the SDK-absent fallbacks of the event wiring. A real
browser check on the published page remains separate.
