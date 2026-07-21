# Bugfix Spec — Site Remediation

Derived from [`AUDIT.md`](AUDIT.md). Branch: `fix/site-audit-remediation`.
Status legend: `[ ]` planned · `[x]` done · `[~]` partially done, needs your input · `[-]` out of scope for this branch.

Decisions taken (confirmed by site owner, 2026-07-20):
- Delete all 5 HugoBlox template blog posts.
- Delete the entire `content/courses/` section.
- Rebuild publications from a root `publications.bib` **and** hand-built `content/publications/` pages.

---

## [x] BUG-01 — Unfinished drafts and raw `.docx` files are publicly served
**Severity:** critical · **Files:** `content/blog/ARCHIVE/`

`content/` is published wholesale regardless of folder naming. Live and returning HTTP 200:
`/blog/archive/cc-sdd-tutorial/`, `/blog/archive/boosting_blog_series/`,
`/blog/ARCHIVE/ML%20blog%20posts.docx`, `/blog/ARCHIVE/Graph Visualization.docx` (11 MB).
Both markdown files have no front matter, so they render with filename-derived titles and enter the blog
list, RSS, sitemap, and Pagefind index.

**Fix:** `git mv content/blog/ARCHIVE drafts/blog-archive` — outside `content/`, so Hugo never sees it.
**Acceptance:** `hugo && find public -ipath '*archive*'` returns nothing; no `.docx` under `public/`.

## [x] BUG-02 — Fake lorem-ipsum publications are live
**Severity:** critical · **Files:** `content/publications/{journal-article,conference-paper,preprint}/`

Three template entries with lorem-ipsum abstracts, fabricated co-authors ("Robert Ford", "Nelson Bighetti"),
fake venues, and a dummy PDF, surfaced on both `/publications` and the homepage.

**Fix:** delete all three; replace with the verified record (BUG-08).
**Acceptance:** no occurrence of `Lorem ipsum`, `Robert Ford`, or `Bighetti` anywhere under `content/` or `public/`.

## [x] BUG-03 — `baseURL` points at a redirecting hostname
**Severity:** high · **Files:** `config/_default/hugo.yaml`

`baseURL: 'https://www.soroushdianaty.com/'` but `CNAME` is the apex. Verified live: apex → 200,
`www` → 301 → apex. Every canonical URL, `og:url`, sitemap entry, and RSS link therefore points at a redirect.

**Fix:** `baseURL: 'https://soroushdianaty.com/'`.
**Acceptance:** `grep -c 'https://www\.' public/sitemap.xml` → 0.

## [x] BUG-04 — Nav "News" link 404s
**Severity:** low · **Files:** `config/_default/menus.yaml`

`/news` has no backing section; the news content is a homepage block with `id: news`.
**Fix:** `url: /#news`. *(Same one-line change as PR #2; carried here so this branch is self-consistent.)*
**Acceptance:** rendered nav emits `href="/#news"`.

## [x] BUG-05 — Fake talk and slide deck
**Severity:** medium · **Files:** `content/events/example/`, `content/slides/example/`

A non-existent 2030 talk at Stanford and a template deck, live while three real presentations are missing.
**Fix:** delete both; add the real events (BUG-11).
**Acceptance:** `/events/example/` and `/slides/example/` absent from `public/`.

## [x] BUG-06 — Vendor advertisement on the homepage
**Severity:** low · **Files:** `content/_index.md`

The `cta-card` block (marked `demo: true`) advertises HugoBlox to your visitors.
**Fix:** remove the block.
**Acceptance:** no "Build your own academic website" string in `public/index.html`.

## [x] BUG-07 — Template blog posts published under your byline
**Severity:** medium · **Files:** `content/blog/{get-started,teach-courses,project-management,second-brain,notebook-onboarding}/`

Five HugoBlox marketing tutorials carry `authors: [me]`.
**Fix:** delete all five (owner-confirmed), including their stock images and media.
**Acceptance:** `content/blog/` contains only `_index.md` and `anthropic-fable/`.

## [x] BUG-08 — Real publication record missing
**Severity:** critical · **Files:** `publications.bib` (new), `content/publications/*` (new)

Seven peer-reviewed articles, three conference abstracts, and four book chapters exist in the public record
and on your CV; none are on the site.

**Fix:** create `publications.bib` at the repo root as the source of truth (this is what
`.github/workflows/import-publications.yml` watches), plus one page per work under `content/publications/`.
Metadata cross-verified against ORCID, PubMed, PMC, Semantic Scholar, Google Scholar, and your CV — see
`AUDIT.md` §4. Featured on the homepage: the FHIR paper, the plasmapheresis follow-up, and the context-aware
LLM abstract.
**Acceptance:** `/publications` lists 11 entries; every DOI resolves; `me` renders as your linked name in each
author list.

## [x] BUG-09 — Author profile contradicts CV and ASU record
**Severity:** high · **Files:** `data/authors/me.yaml`

`role` disagrees with ASU's directory; `awards` is empty though the CV lists three; 2 of 6 roles present;
skills are the template's generic three; MD institution name is abbreviated inconsistently.

**Fix:** bring to CV parity — corrected role and institution name, all six roles, real skill stack
(FHIR/SNOMED-CT/LOINC/ICD/Epic, Python/SAS/SQL/Linux/Git, LoRA & PEFT, survival & cost-effectiveness analysis),
three awards, licenses/certifications, memberships, and peer-review activity.
**Acceptance:** `/experience` renders a non-empty Awards section; every CV role appears.

## [x] BUG-10 — Other people's libraries listed as your projects
**Severity:** medium · **Files:** `content/projects/{pandas,scikit,pytorch}/`

pandas, scikit-learn, and PyTorch are presented under "Selected Projects … that I have worked on".
`pandas/index.md` is a 1-byte empty file rendering a blank page.

**Fix:** delete all three; add `EviTrace` and `project-lullaby` from your GitHub.
**Acceptance:** `/projects` lists exactly your own repos, each linking to its GitHub URL.

## [x] BUG-11 — Real talks missing
**Severity:** medium · **Files:** `content/events/*` (new)

**Fix:** add the 2nd Arizona Digital Health Symposium (5 May 2026), AcademyHealth ARM 2026
(30 May–2 Jun 2026, Seattle), and the 2018 IAUTMU congress, all in the past tense — the CV's
"Accepted, Conference Forthcoming" wording is stale as of 2026-07-20.
**Acceptance:** `/events` lists three real presentations, none future-dated.

## [x] BUG-12 — HugoBlox product docs published as your course
**Severity:** medium · **Files:** `content/courses/`

**Fix:** delete the section (owner-confirmed).
**Acceptance:** `/courses/` absent from `public/`; no nav entry references it.

## [x] BUG-13 — Template tag vocabulary
**Severity:** low · **Files:** taxonomy generated from post front matter

`source-themes`, `hugo-blox`, `hugoblox-kit`, `markdown`, `presentations`, `second-brain` exist only because
of template content.
**Fix:** resolved transitively by BUG-02/05/07/10/12; verify afterwards.
**Acceptance:** `public/tags/` contains only tags from real content.

## [x] BUG-14 — Repo README is vendor marketing copy
**Severity:** low · **Files:** `README.md`

The HugoBlox sales README is the public face of one of your three public repos.
**Fix:** replace with a short description of this site and how to run it.
**Acceptance:** README describes your site, not the template.

## [x] BUG-15 — No last-modified dates
**Severity:** low · **Files:** `config/_default/hugo.yaml`

`enableGitInfo: false` means Hugo derives no `Lastmod` from git history.
**Fix:** set `true`. CI already checks out with `fetch-depth: 0`, so git history is available at build time.
**Acceptance:** build succeeds; `og:updated_time` reflects commit dates.

## [~] BUG-16 — Missing logo asset *(needs your input)*
**Severity:** medium · **Files:** `assets/media/icons/custom/logo.png`

`layouts/_partials/functions/get_logo.html` resolves a logo from this path; the file does not exist, so the
override silently falls through.
**Fix:** you supply a logo PNG, or we delete the override partial and show the site title as text.

## [~] BUG-17 — Generic social-share image *(needs your input)*
**Severity:** medium

`og:image` falls back to the stock HugoBlox icon, so every shared link previews generically.
**Fix:** you supply a 1200×630 OG card, or approve generating a plain text-on-brand-color one.

## [~] BUG-18 — No analytics or search-console verification *(needs your input)*
**Severity:** low · **Files:** `config/_default/params.yaml`

No `analytics` block; you have no visibility into traffic.
**Fix:** requires your GA4 / Plausible / Umami ID and a Search Console verification token.

## [-] BUG-19 — Upstream data hygiene *(outside this repo)*
**Severity:** medium

Your ORCID record is missing the FHIR / *Applied Clinical Informatics* paper that PubMed and Semantic Scholar
both hold. Fix at orcid.org so future BibTeX exports are complete.

---

## Open questions carried from the audit
1. **FHIR paper year** — Semantic Scholar says 2025, PubMed/DBLP/your CV say 2026. Pages use **2026**; correct if wrong.
2. **DOIs for the two *South East Asia J Med Sci* papers** — none found in any index; pages omit the DOI field.
3. **Book chapters** — page ranges, ISBN, and co-authors unconfirmed; published as a single combined entry
   listing all four chapter titles, easy to split once you have the details.
4. **Nucleate BioChallenge win** — no public announcement found naming you; listed from your CV without a link.
5. **PhD committee chair (Adela Grando)** — search-snippet only; deliberately not stated on the site.
