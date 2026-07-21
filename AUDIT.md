# Website Audit — soroushdianaty.com

Audit date: 2026-07-20. Sources: repo contents, live site (`https://soroushdianaty.com`), local Hugo build,
`static/uploads/cv.pdf` (dated 18 May 2026), and public records (ORCID, PubMed, PMC, Semantic Scholar,
ASU profile + ASU-hosted CV, Google Scholar, GitHub).

---

## 1. Verdict

The site is a **partially customized HugoBlox "Academic CV" template**. The infrastructure (build, deploy,
domain, theme, search) is healthy. The *content* is roughly **20% you and 80% template demo**, and the demo
half is live and indexable right now.

The single worst problem: **your live publications page lists three lorem-ipsum fake papers** ("An example
journal article", "An example conference paper", "An example preprint") while **seven real peer-reviewed
papers, three conference abstracts, and four book chapters are missing entirely**. Two of the fakes are
co-authored with "Robert Ford" and one BibTeX file credits "Nelson Bighetti" — template placeholder names
that are, to any reader, indistinguishable from a fabricated publication record. This is the highest-priority
fix on the list.

---

## 2. Inventory — what is actually there

### 2.1 Real, yours, and accurate

| Item | Path | Notes |
|---|---|---|
| Author profile data | `data/authors/me.yaml` | Real bio, ORCID/Scholar/Scopus IDs, 2 education + 2 experience entries. Accurate but incomplete (see §4). |
| Homepage research blurb | `content/_index.md` (markdown block) | Matches CV summary verbatim. Good. |
| Blog post: Anthropic Fable suspension | `content/blog/anthropic-fable/` | Genuine, substantial (~17 KB), 6 original figures, renders correctly. The only real post. |
| CV PDF | `static/uploads/cv.pdf` | 4 pages, current as of May 2026. Linked from the biography block. |
| ASU icon | `assets/media/icons/custom/asu.svg` | Used by the ASU profile link. |
| Avatar | `assets/media/authors/me.jpg` | Renders fine. |
| Theme overrides | `layouts/_partials/` | Logo resolver + `head-end` hooks (GitHub buttons, education-card CSS). Working. |
| Experience page scaffold | `content/experience.md` | Correct structure; renders whatever is in `me.yaml`. |

### 2.2 Template demo content — currently live on your domain

| Item | Path | Status |
|---|---|---|
| 3 fake publications | `content/publications/{journal-article,conference-paper,preprint}/` | **Live.** Lorem ipsum abstracts, fake co-authors, fake venues, a dummy PDF. |
| 3 fake projects | `content/projects/{pandas,scikit,pytorch}/` | **Live.** These are descriptions of other people's open-source libraries, presented as your projects. `pandas/index.md` is a 1-byte empty file → renders a blank page. |
| 5 template blog posts | `content/blog/{get-started,teach-courses,project-management,second-brain,notebook-onboarding}/` | **Live.** HugoBlox marketing tutorials under your byline (`authors: [me]`). |
| Entire "Courses" section | `content/courses/hugo-blox/**` (14 files) | **Live.** HugoBlox's own product documentation presented as a course you teach. |
| Fake talk | `content/events/example/` | **Live.** "Create Beautiful Presentations with Markdown", venue Stanford, dated 2030. |
| Fake slide deck | `content/slides/example/` | **Live** at `/slides/example/`. |
| HugoBlox advertisement | `content/_index.md` `cta-card` block (`demo: true`) | **Live** at the bottom of your homepage: "👉 Build your own academic website like this". |
| Template README | `README.md` | The HugoBlox marketing README ("The Academic CV That Gets You Hired"), i.e. the public face of your GitHub repo. |

### 2.3 Not published / inert

- `content/blog/ARCHIVE/` — draft material (see §3.2, this is *not* actually unpublished).
- `publications.bib` — **does not exist**, so `.github/workflows/import-publications.yml` never runs.
- `.devcontainer/`, `.vscode/` — template dev config, harmless.
- `netlify.toml` — alternate deploy path, unused (you deploy via GitHub Pages).

---

## 3. Findings by severity

### 3.1 CRITICAL — fake publication record is live

`/publications` shows three lorem-ipsum entries; two list a co-author "Robert Ford", and
`content/publications/journal-article/cite.bib` credits "Bighetti, Nelson". The homepage "Featured
Publications" and "Recent Publications" blocks surface them too, and `conference-paper.pdf` is a downloadable
dummy. Meanwhile **zero** of your real papers appear anywhere on the site.

Risk: a reader, reviewer, or hiring committee cannot tell template filler from claimed authorship.

### 3.2 CRITICAL — unfinished drafts and raw source files are publicly served

`content/blog/ARCHIVE/` is **not** excluded from the build. Hugo publishes everything under `content/`
regardless of folder name:

- `https://soroushdianaty.com/blog/archive/cc-sdd-tutorial/` → HTTP 200 (verified live)
- `https://soroushdianaty.com/blog/archive/boosting_blog_series/` → HTTP 200 (verified live)
- `https://soroushdianaty.com/blog/ARCHIVE/ML%20blog%20posts.docx` → HTTP 200 (verified live)
- `https://soroushdianaty.com/blog/ARCHIVE/Graph Visualization.docx` → HTTP 200, **11 MB**

Both markdown drafts have **no front matter at all** — no title, no date, no summary — so they render with
filename-derived titles (`Cc Sdd Tutorial`, `Boosting Blog Series`) and appear in your blog listing, RSS
feed, sitemap, and Pagefind search index. The `.docx` files are raw Word documents whose contents have never
been reviewed for publication.

### 3.3 HIGH — `baseURL` points at a hostname that redirects

`config/_default/hugo.yaml` sets `baseURL: 'https://www.soroushdianaty.com/'`, but `CNAME` is the apex
`soroushdianaty.com`, and live behavior is:

- `https://soroushdianaty.com/` → 200
- `https://www.soroushdianaty.com/` → 301 → apex
- `https://soroushdty.github.io/` → 301 → apex

So every canonical URL, `og:url`, sitemap entry, and RSS link on the site points at a redirecting hostname.
This splits SEO signals and makes social-share previews resolve through an extra hop.

### 3.4 HIGH — site claims and CV/public record disagree

| Site says | Record says | Source |
|---|---|---|
| Role: "Biomedical Informatics Researcher" | "Graduate Teaching Associate", CHS Office of the Dean, ASU | ASU profile, ORCID employments |
| Awards: `awards: []` (empty) | 3 awards incl. **First Place, $2,500, Nucleate Arizona BioChallenge (Oct 2025)** and **ASU Graduate Fellowship, $4,845 (2025–26)** | your CV |
| Experience: 2 entries | 6 roles (SHARES/NIDA, AHRQ decision aid, K.N. Toosi Computational Medicine Center, USERN, Neuroscience Research Center, + the 2 listed) | your CV |
| Skills: Python, ML, Cloud Computing, Academic Writing, Conference Presentations, Grant Proposals | FHIR, SNOMED-CT/LOINC/ICD, Epic, SAS, SQL, Linux, Git, LoRA/PEFT fine-tuning, survival analysis, cost-effectiveness analysis | your CV |
| MD institution: "Tehran Medical Branch, IAU" | "Tehran Medical Sciences Branch, Islamic Azad University (IAUTMU)" | ORCID, ASU profile |
| Nothing about licenses, certifications, memberships, peer review | Medical License (IRIMC), 2× CITI certifications, AMIA member, ASU CIE, 3 manuscripts peer-reviewed | your CV |

Also: the site tagline claims a research focus on "clinical LLM hallucination detection, evidence grounding,
and responsible AI evaluation." **No published paper on hallucination detection exists under your name in any
index checked.** As a statement of *current research direction* that is fine and should stay — just make sure
it never reads as a claim of published work. Your `EviTrace` repo is the concrete public artifact backing the
"evidence grounding" half; feature it.

**Your ORCID record is also incomplete** — it is missing the FHIR/Applied Clinical Informatics paper that
PubMed and Semantic Scholar both have. Worth fixing at the source (orcid.org), not just on the website.

### 3.5 MEDIUM

- **Fake projects.** `content/projects/` describes pandas, scikit-learn, and PyTorch — other people's
  libraries — as "Selected Projects … that I have worked on over the years." Your two real public repos
  (`EviTrace`, `project-lullaby`) are absent.
- **Blog authorship.** Five HugoBlox tutorials carry `authors: [me]`, attributing vendor marketing copy to you.
- **Courses section.** `/courses/hugo-blox/` publishes HugoBlox's product documentation as your course, and it
  is in the nav-reachable site graph.
- **Fake talk dated 2030** at `/events/example/` — an "upcoming talk" at Stanford that does not exist, while
  your two real 2026 conference presentations are missing.
- **Missing logo asset.** `layouts/_partials/functions/get_logo.html` looks for
  `assets/media/icons/custom/logo.png`; that file does not exist, so the resolver silently falls through.
- **No custom social-share image.** `og:image` falls back to the generic HugoBlox icon, so every link you
  share on LinkedIn/X/Slack previews with a stock graphic.
- **No analytics or search-console verification** configured in `params.yaml` (the file is only 42 lines —
  no `analytics`, `seo`, or `verification` blocks).
- **`enableGitInfo: false`** in `hugo.yaml`, so no "last updated" dates are derived from git history.

### 3.6 LOW

- Homepage `cta-card` block advertises HugoBlox to your visitors (`demo: true` marks it as removable).
- `README.md` is the vendor's marketing page rather than a description of your site.
- Nav "News" pointed at `/news`, which 404s — **already fixed** on branch `fix/news-menu-link` (PR #2) by
  pointing it at the `/#news` homepage anchor.
- The homepage "Recent News" block just re-lists blog posts, duplicating `/blog`.
- Tag vocabulary is polluted by template tags (`source-themes`, `hugo-blox`, `hugoblox-kit`, `markdown`,
  `presentations`, `second-brain`).
- `content/publications/conference-paper/featured.jpg` and friends are 200–600 KB stock photos shipped with
  the template.

---

## 4. Verified publication record (use this as the source of truth)

Cross-checked against ORCID, PubMed, PMC, Semantic Scholar, Google Scholar, and your ASU-hosted CV.

**Peer-reviewed articles**

1. Lee P, Dhadwal AS, Kaiser M, **Dianaty S**, Lott E, Singh G, Chern D, Walonoski JA, Grando A. *Assessing
   the Effectiveness and Scalability of Fast Healthcare Interoperability Resource-Based Granular Data
   Segmentation Technology.* Appl Clin Inform. DOI `10.1055/a-2863-4129`, PMID `42285541`,
   open access: PMC13286105. — *Sources disagree on year (2025 vs 2026); confirm which the journal assigned.*
2. **Dianaty S**, Gholami F, Gholamrezaie HR, Mirzaei A. *Cost-effectiveness of plasmapheresis and hemoperfusion
   in COVID-19 survivors: A six-month follow-up analysis after hospital discharge.* Ther Apher Dial. 2025 Jan 14
   (epub). DOI `10.1111/1744-9987.14235`, PMID `39809458`.
3. Raiszadeh M, Khosronejad A, **Dianaty S**, Ghorbani Yekta B. *Novel repair of acute Stanford type B aortic
   dissection using combined endovascular graft and transfemoral replacement of vascular plug.* Catheter
   Cardiovasc Interv. 2023 Dec;102(7):1287–1290. DOI `10.1002/ccd.30849`, PMID `37786981`.
4. **Dianaty S**, Khodadadi S, Alimoghaddam R, Mirzaei A. *Comparison of outcomes and costs of extracorporeal
   blood purification therapies in critically ill COVID-19 patients.* Ther Apher Dial. 2023 Jun;27(3):505–516.
   DOI `10.1111/1744-9987.13948`, PMID `36324189`.
5. Khoshgoftar Some Saraii Z, **Dianaty S**, Rouhollah F, Zare N, Ghorbani Yekta B. *Reproductive status of male
   rat offspring following exposure to methamphetamine during intrauterine life: An experimental study.*
   Int J Reprod Biomed. 2023 Mar;21(2):175–184. DOI `10.18502/ijrm.v21i2.12809`, PMID `37034297`, PMC10073868.
6. Darabi R, Ghoreshi B, **Dianaty S**, Motevalli MS. *Stress and menstrual disorders among Iranian medical
   students: A cross-sectional study.* South East Asia J Med Sci. 2021 Sep;5(2):8–15. — *No DOI found; not
   indexed in PubMed/ORCID/Semantic Scholar. Confirmed via your CV + Google Scholar only.*
7. Yaminifar L, **Dianaty S**, Shahverdi Z, Yaraghi M, Ghorbani Yekta B. *Differential diagnosis of benign ovarian
   cysts using tumor markers in serum and cyst fluid.* South East Asia J Med Sci. 2021 Sep;5(2):1–7. — *No DOI
   found; same caveat as #6.*

**Conference abstracts** — note both 2026 meetings have now **passed**; your CV still says "Accepted,
Conference Forthcoming", which is stale as of today.

1. **Dianaty S**, Soumma SB. *Explainable early prediction of acute kidney injury using first 24-hour physiologic
   and clinical data.* 2nd Arizona Digital Health Symposium; 5 May 2026; Phoenix, AZ.
2. **Dianaty S**, Kaiser M, Murcko A, Grando A. *Early Evidence for Context-Aware Large Language Models (LLMs) in
   Sensitive Health Data Classification.* AcademyHealth Annual Research Meeting 2026; 30 May–2 Jun 2026; Seattle, WA.
3. **Dianaty S**, Ghorbani Yekta B. *Effects of Descurainia Sophia products on urinary and renal function.*
   Congress of Invention, Patenting and Manufacturing of Experimental, Pharmaceutical and Clinical Products,
   IAUTMU; 25 Feb 2018; Tehran, Iran.

**Book chapters** — *Practical Guide to Psychiatric Medications*, 2nd ed. (MTP Psychiatry, 2022): "Introduction
to Digital Psychiatry", "The COVID-19 Pandemic and Mental Health", "Apps and Wearables for Mental Health",
"Future Advances in Mental Health". *(CV-only; no independent bibliographic record found — page ranges, ISBN,
and co-authors need confirming from the publisher.)*

**Excluded — name collision, do not add:** Soroushianfar M, Sadr S, Sazmand A, Dianaty S, et al.
*Gastrointestinal parasites of cats in the Middle East (2000–2023).* Parasitol Int. 2024, PMID 38960370.
Different person; absent from your ORCID, Scholar, and CV.

**Real projects to feature** (from your GitHub, both GPL-3.0, both currently 0 stars):

- **EviTrace** — automated, evidence-grounded attribute extraction from scientific PDFs; GROBID/pdfplumber/
  PyMuPDF/PaddleOCR backends, four-stage QC (rater → IAA → adjudicator → reconciler), LLM field extraction,
  JSON-LD annotation layer. Python. → directly supports the "evidence grounding" research claim.
- **project-lullaby** — digital health surveillance for low-income mothers with pregnancy-induced hypertension
  in South Phoenix and Mesa; passive monitoring, heat-risk context, clinical escalation. Python.

---

## 5. Step-by-step remediation plan

Work top-down. Phases 0–2 are the ones that matter; everything after is polish. Do each phase on its own
branch, check the deploy preview, merge.

### Phase 0 — Stop the bleeding (30 min, no writing required)

1. **Un-publish the ARCHIVE drafts.** Move them out of `content/` entirely — renaming the folder is not enough,
   and `.docx` files there are served verbatim:
   ```bash
   mkdir -p drafts
   git mv content/blog/ARCHIVE drafts/blog-archive     # `drafts/` is outside content/, so Hugo ignores it
   ```
   Then confirm nothing is left: `hugo && ls public/blog | grep -i archive` should print nothing.
   *(Alternative if you prefer them in-place: add `content/blog/ARCHIVE` to `ignoreFiles` in `hugo.yaml` — but
   moving them is safer, since `ignoreFiles` takes regexes and is easy to get subtly wrong.)*
2. **Fix `baseURL`** in `config/_default/hugo.yaml`:
   ```yaml
   baseURL: 'https://soroushdianaty.com/'
   ```
3. **Delete the fake publications** so nothing lorem-ipsum is live while you assemble the real list:
   ```bash
   git rm -r content/publications/journal-article content/publications/conference-paper content/publications/preprint
   ```
4. **Delete the fake talk and slide deck:**
   ```bash
   git rm -r content/events/example content/slides/example
   ```
5. **Remove the HugoBlox ad** — delete the `cta-card` block (the one marked `demo: true`) from `content/_index.md`.
6. Build, eyeball, ship: `pnpm build && hugo server` → merge.

### Phase 1 — Publish the real publication record (half a day)

The repo already has the machinery: `.github/workflows/import-publications.yml` watches for `publications.bib`
at the repo root and runs `academic import publications.bib content/publications/`, opening a PR with generated
pages. It has never fired because the file doesn't exist.

1. Export BibTeX for items 1–5 in §4 straight from PubMed ("Send to → Citation manager") or from each DOI via
   `https://doi.org/<DOI>` with a BibTeX content negotiation — that gets you correct venue/volume/page data
   without hand-typing. Hand-write entries for items 6–7 (no DOI).
2. Save the result as `publications.bib` in the repo root and push to `main`. The workflow opens an import PR.
3. Run the converter locally first if you want to preview: `pip install academic && academic import publications.bib content/publications/ --compact`.
4. For each generated page, fill in: `featured: true` for the 2–3 you want on the homepage, `tags`, a real
   `summary`, and `url_pdf` / `doi` links. Add an open-access PDF where you have one (items 1 and 5 are OA).
5. Delete the stock `featured.jpg` files the template left behind; either add a real figure from the paper or
   leave the image field empty.
6. **Conference abstracts and book chapters** don't belong in the BibTeX import — add them as their own
   entries with `publication_types: ['paper-conference']` and `['chapter']` respectively, or list them in a
   markdown block on `/publications`. Update the two 2026 abstracts from "forthcoming" to presented.
7. While you're at it: **add the FHIR paper to your ORCID record** — it's missing there.

### Phase 2 — Bring `data/authors/me.yaml` up to CV parity (2–3 hours)

Everything on the homepage biography card and the `/experience` page renders from this one file, so this is
the highest-leverage edit in the repo.

1. `role:` → `"Graduate Teaching Associate"` or `"PhD Student, Biomedical Informatics & Data Science"` — match
   what ASU's directory says.
2. `education:` → correct the MD institution to "Tehran Medical Sciences Branch, Islamic Azad University
   (IAUTMU)"; consider adding your MD thesis title (cost-effectiveness of plasmapheresis vs hemoperfusion in
   critically ill COVID-19 patients) since it ties directly to publications #2 and #4.
3. `experience:` → add the four missing roles from your CV: SHARES (NIDA-funded, PI Grando), the AHRQ decision-aid
   project (PI Wang), K.N. Toosi Computational Medicine Center, USERN, and the Neuroscience Research Center.
   Include the clinical-rotations line if you want the clinical volume visible.
4. `skills:` → replace the generic three with the CV's real stack: Python / SAS / SQL / Linux / Git; FHIR,
   SNOMED-CT, LOINC, ICD, Epic; LoRA & PEFT fine-tuning, prompt & context engineering; regression, survival
   analysis, cost-effectiveness analysis.
5. `awards:` → currently `[]`, and `content/experience.md` already renders a `resume-awards` block, so the
   section exists and is empty. Add: Nucleate Arizona BioChallenge First Place ($2,500, Oct 2025); ASU Graduate
   College Fellowship ($4,845, 2025–26); IAUTMU Student Research Committee Active Member Award (Oct 2018).
6. Consider adding certifications/licenses (IRIMC medical license, 2× CITI), memberships (AMIA, ASU CIE), and
   peer-review activity (Frontiers in Pharmacology ×1, Italian J Gynaecology & Obstetrics ×2). Check which of
   these the `hugoblox/author/v1` schema supports; anything unsupported can go in a markdown block on
   `/experience` instead.
7. Add a Semantic Scholar / ResearchGate link to `links:` if you want them discoverable (`ids:` already has
   `research_gate` and `scopus`, but no visible link).

### Phase 3 — Replace the fake projects (2 hours)

```bash
git rm -r content/projects/pandas content/projects/scikit content/projects/pytorch
```

Create `content/projects/evitrace/index.md` and `content/projects/project-lullaby/index.md` using the
descriptions in §4. Each needs: `title`, `date`, `summary`, `tags`, `links` (type `code` → the GitHub URL), and
a real screenshot or architecture diagram as `featured.png`. EviTrace should lead — it is the public evidence
for the "evidence grounding" line in your tagline. Consider a third entry for the AKI-prediction work behind
your Arizona Digital Health Symposium abstract, if it's shareable.

### Phase 4 — Talks and news (1–2 hours)

The `/events` section is now empty after Phase 0. Add your two real 2026 presentations (Arizona Digital Health
Symposium, 5 May 2026; AcademyHealth ARM, Seattle, 30 May–2 Jun 2026) as `content/events/<slug>/index.md` with
`event_name`, `location`, `event_start`/`event_end`, `abstract`, and slides/poster if you can share them. Add the
2018 IAUTMU congress if you want the full record. Optionally add the Sep 2023 AI-in-academic-writing workshop
(6 hours, 50+ attendees) — it demonstrates teaching reach.

### Phase 5 — Blog cleanup (1 hour)

Decide per post. The five HugoBlox tutorials (`get-started`, `teach-courses`, `project-management`,
`second-brain`, `notebook-onboarding`) are vendor copy under your byline — delete them, or if you want to keep
one as a formatting reference, set `draft: true`. Your Anthropic/Fable post then stands alone, which is a
better signal than one real post buried among five template posts. The two ARCHIVE drafts moved out in Phase 0
can be finished and re-added properly (with front matter: `title`, `date`, `summary`, `authors`, `tags`).

Also decide the fate of `/courses/hugo-blox/**` — 14 files of HugoBlox product documentation. Unless you plan a
real course, delete `content/courses/` and drop any nav entry for it.

Then clean the tag vocabulary: drop `source-themes`, `hugo-blox`, `hugoblox-kit`, `markdown`, `presentations`,
`second-brain` once the posts that carry them are gone.

### Phase 6 — Polish and instrumentation (2 hours)

1. **Logo**: add `assets/media/icons/custom/logo.png` (your override partial already looks for it), or remove
   the override if you'd rather show the site title as text.
2. **Social share image**: add an OG image (1200×630) so links don't preview with the stock HugoBlox icon.
   A clean card with your name, title, and ASU affiliation is enough.
3. **Analytics + verification**: add an `analytics` block to `params.yaml` (GA4 or a privacy-friendly option
   like Plausible/Umami) and register the site in Google Search Console — you currently have no visibility into
   whether anyone finds the site.
4. **`enableGitInfo: true`** in `hugo.yaml` to get real "last updated" dates from git history.
5. **README.md**: replace the HugoBlox marketing README with a short description of your own site — it is the
   first thing anyone visiting your GitHub profile sees, and `soroushdty.github.io` is one of only three public
   repos you have.
6. **Favicon**: currently the theme default; swap for something of your own.
7. Optional: drop `netlify.toml` and `.devcontainer/` if you never intend to use them.

### Phase 7 — Ongoing hygiene

- Keep `publications.bib` as the single source of truth; adding a paper becomes "append entry, push, merge the
  bot's PR."
- The weekly `upgrade.yml` workflow already opens theme-upgrade PRs — check their deploy previews before merging.
- Re-export `static/uploads/cv.pdf` whenever the CV changes, so the download and the site never drift apart.
- Before each publish, run `pnpm build` and skim `public/` for anything you didn't intend to ship.

---

## 6. Open questions to settle yourself

1. **FHIR paper year** — 2025 or 2026? Sources disagree; the journal's own record decides it.
2. **DOIs for the two *South East Asia J Med Sci* papers** — not in any index checked; the journal's site may have them.
3. **Book chapter details** — page ranges, ISBN, co-authors; only your CV attests to these.
4. **AcademyHealth 2026 abstract status** — the meeting has passed; update "forthcoming" wording accordingly.
5. **Nucleate Arizona BioChallenge win** — no public announcement found naming you. Worth linking to a
   Nucleate post or ASU news item if one exists, since an unlinked award claim is weaker than a linked one.
6. **PhD committee chair (Adela Grando)** — appeared only in a search snippet, not a primary page. Confirm
   before stating it on the site.
