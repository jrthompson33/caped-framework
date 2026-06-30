# CAPED Supplemental Materials

Static single-page site for IEEE VIS supplemental materials, built with **Astro**, **Starlight**, and **React**.

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:4321](http://localhost:4321). Build static output with `npm run build` (served from `dist/`).

## Project structure

| Layer | Location | Role |
|-------|----------|------|
| **Content** | `src/content/` | Paper metadata, examples (MDX), and Starlight docs page |
| **Config** | `src/config/site.ts` | CAPED dimension definitions |
| **Components** | `src/components/` | Astro layout + React interactivity |
| **Styles** | `src/styles/starlight.css` | Custom CSS on top of Starlight |
| **Site config** | `astro.config.mjs` | Starlight sidebar, layout, and integrations |

### Adding an example

Create `src/content/examples/06-my-example.mdx`:

```yaml
---
title: "My Example"
order: 6
summary: "One-line summary"
sections:
  - title: "First chart"
    text: "Describe this part of the scenario. Include exact phrases that match annotations below."
    embedType: image   # image | iframe | live
    embedSrc: "/images/scenario-06-line-chart-01.png"
    embedWidth: 75     # optional, 1–100 (default 100)
    annotations:
      - text: "exact phrase"
        dimension: input
  - title: "Second chart"
    text: "Describe the next part of the scenario."
    embedType: live
    embedCode: |
      // Optional code for live embed placeholder
    annotations: []
remarks: "Optional closing notes on how this example relates to CAPED."
draft: false
---
```

## CAPED annotations

The `AnnotatedText` React component highlights phrases in each subsection's `text` field. Annotation `text` values must match substrings exactly. Hover or focus a highlight to see which CAPED dimension it maps to.

## Deploy to GitHub Pages

This project includes a GitHub Actions workflow (`.github/workflows/deploy.yml`) that builds and deploys on every push to `main`.

### One-time setup

1. Create a GitHub repository and push this project:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/jrthompson33/caped-framework.git
git push -u origin main
```

2. In the repo on GitHub, go to **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to **GitHub Actions**.
4. Push to `main` (or re-run the workflow from the **Actions** tab).

Your site will be published at:

`https://jrthompson33.github.io/caped-framework/`

### Re-run deploy

If the first workflow run failed at **Setup Pages**, that usually means Pages was not set to **GitHub Actions** yet when the repo was pushed. After enabling it in **Settings → Pages**, go to **Actions → Deploy to GitHub Pages → Run workflow**.

Add your domain under **Settings → Pages → Custom domain**. No code changes needed—the workflow picks up the correct `site` URL automatically.

### Local preview of the production build

```bash
npm run build
npm run preview
```
