# Armsteel

Armsteel is Charlie Arnerstål’s personal portfolio and archive for software, electronics, experiments, and other things he makes. The site is a static Astro project for `https://armsteel.dev`.

## Run locally

Requires Node.js 24 and npm.

```sh
npm ci
npm run dev
```

Astro prints a local URL when the development server starts. Build the production site with:

```sh
npm run build
```

The finished static site is written to `dist/`.

## Add a project

Create a Markdown file in `src/content/projects/`. The filename becomes the project URL slug. Add the fields below as frontmatter, then write a concise description using only information you can confirm.

```md
---
title: Project name
description: A short, accurate description.
category: Software
order: 5
featured: false
---

Add a short project note here. Avoid unverified dates, features, technologies, or claims.
```

`category` supplies the archive filter, and `order` sets the display order. Set `featured` to `true` to include a project on the homepage. Projects without an image use a clearly labeled abstract placeholder; they are not presented as screenshots.

To add real images, copy them into `public/projects/` and add their paths and descriptive alt text to the frontmatter. `image` supplies the card and detail cover; `images` adds an optional gallery. The year, links, GitHub repository, and technical details are also optional. Leave them out until you have confirmed information and destinations.

Optional fields are `year`, `image`, `imageAlt`, `images` (with `src`, `alt`, and optional `caption`), `links` (with `label` and `url`), `githubUrl`, and `technicalDetails` (with `label` and `value`).

The project archive and individual pages are generated from these Markdown entries.

## GitHub Pages

The workflow in `.github/workflows/deploy.yml` builds the site and publishes `dist/` when changes reach `main`. GitHub Pages uses this GitHub Actions workflow as its publishing source. The configured custom domain is `armsteel.dev`; the workflow publishes the `CNAME` file from `public/` with the site.

At Name.com, the apex uses an `ANAME` record pointing to `armsteeldev.github.io`, and `www` uses a `CNAME` to the same host. Existing TXT records for domain verification are kept in place. The GitHub Pages certificate is approved and HTTPS is enforced.

The root `CNAME` records the custom domain in the repository, and `public/CNAME` ensures the same value is present in the static deployment artifact.

## Structure

- `src/content/projects/` — Markdown project entries
- `src/components/` — shared header, footer, section heading, and project card
- `src/layouts/` — shared document layout and metadata
- `src/pages/` — homepage, archive, About, generated project details, sitemap, and 404 page
- `src/styles/global.css` — design tokens, responsive layout, and component styles
- `public/branding/armsteel-mark.svg` — reusable standalone Armsteel mark
- `public/favicon.svg`, its PNG fallbacks, and `public/og.svg` — browser and social preview artwork
- `.github/workflows/deploy.yml` — GitHub Pages build and deployment workflow

The Contact page uses the existing Armsteel email address and separates the personal GitHub profile from the Armsteel organization.
