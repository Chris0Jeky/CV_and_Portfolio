# CV & Portfolio

Cristian Tcaci's static [portfolio](https://chris0jeky.github.io/CV_and_Portfolio/),
with project case studies and three CV layouts.

- [Portfolio entry point](Portfolio/portfolio.html) and [project case studies](Portfolio/projects/).
- CV layouts: [standard](CV/cv.html), [academic](CV/cv-academic.html), and
  [tabloid print](CV/cv-tabloid.html).

## Preview locally

From the checkout root, run a local server on loopback, then open
[http://127.0.0.1:8000/](http://127.0.0.1:8000/). The root page opens the portfolio.

```sh
python -m http.server --bind 127.0.0.1 8000
```

The repository contains the built assets, so you do not need to build just to preview.
No live site is changed by serving this local copy.

## Edit and verify

With Node.js installed, restore dependencies from the lockfile and run the checks:

```sh
npm ci --ignore-scripts
npm test
npm run check:links
```

`npm test` checks the committed JSX output, the SDK wiring, and script behavior.
`npm run check:links` checks relative paths in published HTML, not external sites
or real browser interactions. Browser checks are a separate step for UI changes.

For changes to [portfolio JSX sources](Portfolio/portfolio/), run `npm run build`
and include the regenerated `Portfolio/portfolio/dist/` files in the same PR.
See [AGENTS.md](AGENTS.md) for project conventions. The live site is served from
`main`; work on a separate branch rather than pushing an unreviewed change there.
