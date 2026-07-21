# soroushdianaty.com

Personal academic website of **Dr. Soroush Dianaty, MD** — PhD student in Biomedical Informatics and Data
Science at Arizona State University. Research on trustworthy clinical LLMs: hallucination detection, evidence
grounding, and responsible AI evaluation.

Live at **[soroushdianaty.com](https://soroushdianaty.com)**.

## Stack

Built with [Hugo](https://gohugo.io) (extended, version pinned in `hugoblox.yaml`) on the
[HugoBlox](https://github.com/HugoBlox/kit) Academic CV template. The theme is pulled in as a Hugo Module —
see `go.mod` and `config/_default/module.yaml` — so this repo holds content and configuration, not theme code.
Search is [Pagefind](https://pagefind.app); styling is Tailwind CSS v4.

## Develop

```bash
pnpm install     # requires pnpm
pnpm dev         # http://localhost:1313
pnpm build       # production build + search index into public/
```

## Deploy

Pushing to `main` builds and publishes to GitHub Pages via `.github/workflows/deploy.yml`. Pull requests are
built by `build.yml` as validation.

## Publications

`publications.bib` in the repo root is the source of truth. Pushing a change to it triggers
`.github/workflows/import-publications.yml`, which converts entries to pages under `content/publications/`
and opens a pull request.

## Layout

| Path | Contents |
|---|---|
| `content/` | All pages — landing pages (`_index.md`, `experience.md`) and sections (`blog`, `publications`, `projects`, `events`) |
| `data/authors/me.yaml` | Bio, education, experience, skills, awards, and links — the source for every résumé block |
| `config/_default/` | Hugo config, theme parameters, navigation, module imports |
| `assets/media/` | Hugo-processed images and custom icons |
| `static/` | Files copied verbatim, including the CV PDF |
| `drafts/` | Unpublished work-in-progress — outside `content/`, so Hugo never builds it |

## License

Site content © Soroush Dianaty. Template released under the [MIT License](LICENSE.md);
HugoBlox is a trademark of Lore Labs.
