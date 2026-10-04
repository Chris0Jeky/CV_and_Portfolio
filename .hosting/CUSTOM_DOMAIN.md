# Custom domain: prepared, inactive

Prepared 2026-10-04. Nothing here is active. The site stays at https://chris0jeky.github.io/CV_and_Portfolio/
until the owner buys a domain and runs the steps below. Buying the domain, choosing the hostname and the DNS
changes are owner actions; an agent never buys, registers or changes DNS.

`CNAME.inactive` is the file to copy to the repository root at cutover. GitHub Pages builds this site from the
root of `main`, so a file named `CNAME` at the root would activate a custom domain on the next push. Keeping the
prepared copy under `.hosting/` with a different name means it does nothing until it is copied.

## Why the move is short

Every page links to its scripts, styles, images and sibling pages by relative path, so the site works unchanged
at any base path: `/CV_and_Portfolio/` today, `/` on a custom domain. `npm run check:links` is the static part of
that proof: it resolves every relative `href` and `src` attribute in the published HTML to a file in this repository
(exact letter case; a directory needs an `index.html`), fails on a broken or root-absolute (`/...`) link, and lists
the lines that name this site's current address. It does not look at links built in JSX, CSS `url()` references or
script navigation, so it does not prove base-path independence on its own: keep the browser acceptance step (step 5).

## Steps (owner, about five minutes plus DNS and certificate time)

Replace `portfolio.example.com` with the chosen hostname everywhere below. A `www.` or other subdomain is the
simplest choice; an apex domain (`example.com`) works too and uses the A/AAAA records instead.

1. **Verify the domain on the GitHub account first** (prevents a domain takeover): GitHub, Settings, Pages,
   "Add a domain". GitHub shows a TXT record named `_github-pages-challenge-chris0jeky.<domain>`; add it at the
   DNS provider and press Verify. Keep that TXT record afterwards: removing it unverifies the domain.
2. **Activate in the repository**, after the verification and before the DNS records (an agent can open this PR
   once the hostname is known):
   - copy `.hosting/CNAME.inactive` to `CNAME` at the root and replace its one line with the hostname;
   - update the touchpoints `npm run check:links -- --touchpoints` lists: the `og:url` in
     `Portfolio/portfolio.html`, the visible link in `CV/cv-academic.html`, `public_origin` in
     `.hosting/manifest.json` and the address in `AGENTS.md`.
   Alternatively, type the hostname in Settings, Pages, Custom domain: for a site built from a branch, GitHub
   commits the same root `CNAME` file itself.
3. **DNS records** at the provider, once the repository setting is in place (GitHub's order):
   - subdomain: `CNAME portfolio.example.com -> chris0jeky.github.io` (no repository name in the target);
   - apex: `A` records `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153` and `AAAA`
     records `2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153`, `2606:50c0:8003::153`, plus
     `CNAME www -> chris0jeky.github.io`.
   - Do not use a wildcard (`*`) record.
4. **HTTPS**: once the certificate is issued (up to 24 hours), tick Settings, Pages, "Enforce HTTPS".
5. **Check**: `https://portfolio.example.com/` redirects to the portfolio; open a case study, each CV variant
   and the old `https://chris0jeky.github.io/CV_and_Portfolio/` address (GitHub redirects it to the new host).

## Pulseboard goes inert on a new origin

`Portfolio/pulseboard.js` registers the origin `https://chris0jeky.github.io` and sends nothing from any other
origin. After the move the page still works, but usage counts stop until the SDK is rebuilt for the new origin
in a Pulseboard checkout (`observatory/README.md` has the command), the collector accepts that origin, and
`observatory/check.mjs` and `observatory.lock.json` are updated with it. Plan that as a Pulseboard change in the
same window, or accept a gap in counts.

## Umbrella domain options

GitHub serves a user site's custom domain for the whole account: with a user site (`chris0jeky.github.io`
repository, which does not exist today) on `example.com`, every project site without its own domain appears at
`example.com/<repository>/`, including this one at `example.com/CV_and_Portfolio/`. Two clean shapes:

- **Portfolio on the umbrella root**: set the umbrella hostname on this repository (steps above). Other Pages
  projects (the estate-atlas and agent-harness docs, WealthLens charts) each take their own subdomain later,
  with the same steps in their own repository.
- **A small user site as the umbrella index**: create the user-site repository with the umbrella domain and
  link out from it; this portfolio then lives at `/CV_and_Portfolio/` or on its own subdomain.

The first is fewer moving parts. Either way, keep the old GitHub Pages address working until the new host is
verified, and roll back by deleting the root `CNAME` (or clearing the custom domain in Settings).

Sources (read 2026-10-04): GitHub Docs, "Managing a custom domain for your GitHub Pages site" and "About custom
domains and GitHub Pages". Re-check the IP addresses there at cutover.
