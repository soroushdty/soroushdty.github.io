# AGENTS.md

This file provides guidance to AI agents when working with code in this repository.

## What this is

Personal academic website of Dr. Soroush Dianaty (https://www.soroushdianaty.com/), built on the
**Hugo Blox "Academic CV" template**. It is a *content* repo: almost everything is Markdown/YAML.
The theme itself lives in Hugo Modules pulled from `github.com/HugoBlox/kit` (see `go.mod` /
`config/_default/module.yaml`) — those layouts are **not** in this repo. Only a handful of local
overrides exist under `layouts/`.

## Commands

```bash
pnpm install            # deps (pnpm 10, node-linker=hoisted — pnpm, not npm)
pnpm dev                # hugo server --disableFastRender → http://localhost:1313
pnpm build              # hugo --minify + pagefind search index into public/
pnpm pagefind           # regenerate search index only (requires public/ to exist)
hugo mod get -u ./...   # upgrade HugoBlox theme modules
```

Hugo **extended** 0.161.1 is the pinned version (`hugoblox.yaml` → `build.hugo_version`; CI reads it
with yq). Hugo ≥ 0.161 requires the npm `@tailwindcss/cli` package — CI fails loudly if it's missing.
There are no tests or linters.

`public/`, `resources/`, `hugo_stats.json`, and `node_modules/` are build output and gitignored —
never commit them, and never hand-edit files there.

## Deploy

Push to `main` → `.github/workflows/deploy.yml` reads `deploy.host` from `hugoblox.yaml`
(`github-pages`) and calls the reusable `build.yml`, which builds and publishes to GitHub Pages.
`CNAME` sets the custom domain; `netlify.toml` is an unused alternate path kept from the template.
PRs run `build.yml` as validation only.

Two bot workflows open PRs against `main`: `upgrade.yml` (weekly HugoBlox module bump) and
`import-publications.yml` — the latter fires when `publications.bib` at the repo root changes and
runs `academic import publications.bib content/publications/`, regenerating that folder. Treat
`content/publications/**` as derived from the `.bib` file when one is present.

## Architecture

**Config** — `config/_default/`:

- `hugo.yaml` — site-wide Hugo settings (baseURL, taxonomies `authors`/`tags`/`publication_types`,
  `/slides/**` cascade to the `present` output format).
- `params.yaml` — the `hugoblox:` block (schema 2.0): identity, theme colors/mode, header/footer
  style, search, TOC. This is the theme's control surface — prefer editing it over writing CSS.
- `module.yaml` — theme modules to import, plus the mounts that let `hugo-blox/blox/*` and local
  `layouts/`+`assets/` override module files.
- `menus.yaml` — top nav. Entries are hand-maintained and can drift from `content/` (e.g. `News`).

**Content** — `content/` maps 1:1 to URLs. Two kinds of pages:

1. *Landing pages* (`_index.md`, `experience.md`): `type: landing` with a `sections:` list of
   **blocks** (`resume-biography-3`, `markdown`, `collection`, …). Each block has `content:` and
   `design:` keys consumed by the theme; `collection` blocks pull from folders with filters like
   `featured_only`. Block names/options are defined in the HugoBlox modules, not here — copy an
   existing block as a template rather than inventing keys.
2. *Regular pages* — page bundles (`content/blog/<slug>/index.md` + its images) with front matter
   `authors: [me]`, `tags`, optional `cover:`.

`content/blog/ARCHIVE/` holds drafts/source material, not published posts.

**Author data** — `data/authors/me.yaml` (`schema: hugoblox/author/v1`) is the single source for the
bio, avatar, social links, education, and interests rendered by the biography blocks. `username: me`
in a block refers to this file. Its avatar is `assets/media/authors/me.jpg`.

**Assets** — `assets/media/` (Hugo-processed images, custom icons under `icons/custom/` referenced
as `icon: custom/asu`) vs `static/` (copied verbatim; `static/uploads/cv.pdf` is the CV download).

**Local theme overrides** — `layouts/_partials/`:

- `functions/get_logo.html`, `get_logo_url.html` — resolve the navbar/footer logo from
  `assets/media/icons/custom/logo.png`.
- `hooks/head-end/*.html` — anything dropped here is injected into `<head>`; used for the GitHub
  buttons script and extra education-card CSS.
  Adding a file at the same path as a module file replaces it wholesale, so keep overrides minimal.
