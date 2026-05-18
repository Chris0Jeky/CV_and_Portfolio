---
name: seo-perf
description: Optimize SEO meta tags, Open Graph, performance, and Core Web Vitals for the portfolio site.
user-invocable: true
---

# SEO & Performance

## Trigger
- New pages added
- Content updates that affect meta descriptions
- Performance issues reported
- Before major deployments
- Periodic audit of site health

## Workflow

### SEO audit

1. **Read the `<head>` section** of the target page(s).
2. **Check meta tags**:
   - [ ] `<title>` is descriptive, unique per page, under 60 characters
   - [ ] `<meta name="description">` is compelling, under 160 characters
   - [ ] `<meta name="viewport" content="width=device-width, initial-scale=1">`
   - [ ] `<meta charset="UTF-8">`
   - [ ] `<link rel="canonical">` points to the correct GitHub Pages URL

3. **Check Open Graph tags**:
   - [ ] `og:title`, `og:description`, `og:image`, `og:url`, `og:type` present
   - [ ] `og:image` uses an absolute URL (GitHub Pages domain)
   - [ ] Twitter card meta tags present (`twitter:card`, `twitter:title`, etc.)

4. **Check structured data** (optional but recommended):
   - [ ] `<script type="application/ld+json">` with Person schema for portfolio
   - [ ] Schema includes name, jobTitle, url, sameAs (social links)

5. **Check content SEO**:
   - [ ] One `<h1>` per page
   - [ ] Heading hierarchy is logical
   - [ ] Internal links between pages work
   - [ ] No broken external links

### Performance audit

1. **Asset loading**:
   - [ ] CDN resources use `preconnect` in `<head>`
   - [ ] Non-critical CSS/JS uses `defer` or `async`
   - [ ] Critical CSS is inlined or loaded first
   - [ ] Images use `loading="lazy"` below the fold
   - [ ] Images are appropriately sized (no 4000px images for 400px display)

2. **Resource hints**:
   - [ ] `<link rel="preconnect" href="https://fonts.googleapis.com">`
   - [ ] `<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>`
   - [ ] `<link rel="preconnect" href="https://cdnjs.cloudflare.com">`

3. **JavaScript performance**:
   - [ ] No render-blocking scripts in `<head>` (use `defer`)
   - [ ] Event listeners use passive option where appropriate
   - [ ] No excessive DOM queries in scroll/resize handlers
   - [ ] tsparticles config uses reasonable particle count (≤80)

4. **CSS performance**:
   - [ ] No unused CSS rules (check against HTML)
   - [ ] Animations use `transform` and `opacity` (GPU-accelerated)
   - [ ] No layout-triggering animations (`width`, `height`, `top`, `left`)
   - [ ] `will-change` used sparingly and only where needed

5. **Core Web Vitals targets**:
   - LCP (Largest Contentful Paint): < 2.5s
   - FID (First Input Delay): < 100ms
   - CLS (Cumulative Layout Shift): < 0.1

## Output

Findings organized by category (SEO / Performance) with specific file, line, and recommendation.

## Verification

- Validate meta tags by reading the HTML `<head>` section
- Check link validity by verifying URLs are well-formed
- Suggest running Lighthouse in Chrome DevTools for metrics
