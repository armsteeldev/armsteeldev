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

The workflow in `.github/workflows/deploy.yml` builds the site and publishes `dist/` when changes reach `main`. In the repository, open **Settings → Pages** and select **GitHub Actions** under **Build and deployment → Source**. The workflow does not configure a custom domain in repository settings by itself.

For `armsteel.dev`, add `armsteel.dev` under the repository’s **Settings → Pages → Custom domain**. The repository owner or an administrator must do this. The `public/CNAME` file is included in the generated site as a record of the intended domain.

For Name.com DNS, configure the apex (`@`) with these GitHub Pages records:

| Type | Host | Value |
| --- | --- | --- |
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |
| AAAA | `@` | `2606:50c0:8000::153` |
| AAAA | `@` | `2606:50c0:8001::153` |
| AAAA | `@` | `2606:50c0:8002::153` |
| AAAA | `@` | `2606:50c0:8003::153` |
| CNAME | `www` | `armsteeldev.github.io` |

Set the record TTL to Name.com’s default. GitHub recommends adding the domain in Pages settings before configuring DNS. DNS can take time to propagate; verify the records and HTTPS state in GitHub Pages after configuration. No DNS or publication changes have been made as part of preparing this repository.

## Structure

- `src/content/projects/` — Markdown project entries
- `src/components/` — shared header, footer, section heading, and project card
- `src/layouts/` — shared document layout and metadata
- `src/pages/` — homepage, archive, About, generated project details, sitemap, and 404 page
- `src/styles/global.css` — design tokens, responsive layout, and component styles
- `public/branding/armsteel-mark.svg` — reusable standalone Armsteel mark
- `public/favicon.svg` and `public/og.svg` — browser and social preview artwork
- `.github/workflows/deploy.yml` — GitHub Pages build and deployment workflow

The email and YouTube links from the visual reference are not included because no valid destinations were supplied.
