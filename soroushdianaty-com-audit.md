# Website and SEO Audit: SoroushDianaty.com

*Prepared July 26, 2026. Based on live crawling of soroushdianaty.com, its ASU/GitHub/ORCID/Scholar profiles, and web search verification. No Lighthouse, PageSpeed, Search Console, or backlink data was available during this audit — performance and index-coverage findings are marked as validation tasks, not measured results.*

---

## 1. Executive Assessment

**Where the site stands today:** SoroushDianaty.com is a live, well-structured Hugo Blox ("Academic CV") site with genuinely strong bones: a clean canonical/www setup, consistent entity signals across ASU, GitHub, ORCID, and Google Scholar, real peer-reviewed publications with working PubMed/DOI links, and a flagship project (EviTrace) with real technical depth. This is not a neglected site — it is actively maintained (most pages show a same-day "last updated" timestamp) and clearly built by someone who understands the underlying research.

**Primary strategic weakness:** The site is functioning as a well-organized CV, not as a discoverable, persuasive research property. Two compounding problems drive this: (1) **the site is essentially invisible in general web search** — a direct search for the exact string `"soroushdianaty.com"` and for `"Soroush Dianaty"` returned zero results from the site itself, while an outdated third-party aggregator (ZoomInfo) and a dormant Medium account outranked it; and (2) the homepage and navigation are built around a template's default information architecture (an academic CV skeleton) rather than a narrative that tells a hiring committee, collaborator, or journalist what problem this research solves and why it matters. Confirming the exact scale of the indexing gap requires Google Search Console access (see §6 and §15) — what is confirmed here is that the site does not surface for its own name in the search tool used for this audit.

**Three highest-impact opportunities:**
1. **Fix entity SEO and branded search first.** Nothing else in this report matters if a search for "Soroush Dianaty" surfaces a stale ZoomInfo scrape (still describing him as an Iran-based Family Physician) above his own site. This is a credibility risk for anyone doing due diligence before an interview, grant review, or collaboration.
2. **Turn EviTrace and Project Lullaby into real case studies.** Both projects currently read as short abstracts. Expanding them with the problem/method/result/limitations structure recommended in §5 would let the strongest work carry the most weight — the highest-leverage content investment on the whole site.
3. **Simplify the navigation and add a real primary nav.** The site currently exposes its navigation as a long left-hand sidebar table of contents (research, teaching, experience, projects, bio, blog, education, publications, events — nine top-level items) rather than a scannable 5–6 item primary nav with clear conversion paths. This is treated as a confirmed UX finding based on directly observed page structure, but its rendering on desktop vs. mobile should be manually confirmed in a browser (see §10).

**Overall score: 6.4 / 10** — a credible, technically sound foundation held back by weak discoverability and underdeveloped storytelling on the flagship work.

### Scoring table

| Dimension | Score (/10) | Basis |
|---|---|---|
| Positioning | 6 | Clear one-line identity ("Biomedical Informatics Researcher Building Trustworthy Clinical AI") but competes for attention with unrelated Anthropic-news blog content |
| Content quality | 6.5 | Real publications and a technically detailed flagship project; case-study depth and evergreen research writing are thin |
| Information architecture | 5.5 | Logical page set, but no visible primary nav and nine parallel top-level sections observed in page sidebars |
| Visual design | 6 | Clean, professional academic template; largely template-default rather than distinctive (based on rendered HTML/metadata — full visual judgment needs a live browser screenshot pass) |
| User experience | 6 | Fast-reading pages, working CTAs (CV, publications); no visible search-results-found state, no evident breadcrumbs |
| On-page SEO | 6.5 | Title/description present on every page; taxonomy (tag) pages reuse the site-wide description instead of unique ones |
| Technical SEO | 6 | Clean canonical/www handling and pagination canonicalization; robots.txt/sitemap.xml could not be independently fetched in this session (validation task) |
| Authority & trust signals | 5.5 | Strong entity consistency across ASU/GitHub/ORCID/Scholar; a stale, unclaimed ZoomInfo profile and zero apparent visibility for the person's own name in general search actively undermine this |
| Accessibility | 6 (inferred from markup only) | Semantic headings and alt text present in what was fetched; contrast, focus states, and keyboard nav need manual/tool testing |
| Performance | Not scored | No Lighthouse/PageSpeed/CrUX data available — see §11 test plan |
| Conversion clarity | 6 | CV download and publication links work; no explicit "let's collaborate" CTA or contact-path hierarchy observed on the homepage |

**Methodology:** Scores reflect what was directly observed in fetched HTML/metadata against current Google Search Central, web.dev, WCAG 2.2, and Schema.org guidance, weighted toward business impact (indexability and credibility first, polish second). Performance is left unscored because no field or lab data could be captured in this session — assigning a number without measurement would violate this audit's accuracy rules.

---

## 2. Highest-Priority Findings

### Finding 1 — The site does not appear to rank for the owner's own name
- **Evidence:** A search for `"Soroush Dianaty"` returned a stale ZoomInfo scrape (describing him as a Family Physician at Qazvin University of Medical Sciences, with no mention of ASU or the PhD), an ASU directory profile, a Frontiers journal author line, a 2022 Medium post, and Wiley journal pages — but no result from soroushdianaty.com itself. A search for the literal domain string `"soroushdianaty.com"` also returned nothing relevant.
- **Why it matters:** Branded search is normally the easiest search intent to win. Losing it to an outdated third-party data broker is a direct credibility and control-of-narrative risk for anyone screening this person before an interview, grant panel, or partnership.
- **Severity:** Critical
- **Recommended action:** Submit the site in Google Search Console, verify indexing status page-by-page under the URL Inspection tool, check for a manual action or `noindex` accidentally left in a template partial, and build a small number of quality backlinks (ASU faculty/student directory already links to it — that's a start) to accelerate re-crawl.
- **Expected impact:** Recovering branded search is usually fast once a technical blocker is ruled out; this should be the very first thing checked before any redesign work.
- **Effort:** Small (diagnosis) to Medium (if backlink building is required)
- **Validation needed:** This finding is based on this session's search tool, not a verified Google Search Console index-coverage report — confirm directly in Search Console and with a manual `site:soroushdianaty.com` query in a Google browser session.

### Finding 2 — Flagship projects read as abstracts, not case studies
- **Evidence:** The EviTrace project page (soroushdianaty.com/projects/evitrace/) has a two-paragraph description, an architecture diagram written in Mermaid syntax, a sample JSON-LD block, and a GitHub link — but no stated research question, no evaluation results, no limitations, no reproducibility notes, and no link back to a related publication. Project Lullaby's homepage teaser is a single sentence.
- **Why it matters:** For a research-facing audience (search committees, funders, potential collaborators), the project pages are the strongest conversion surface on the site — and they currently under-sell real, technically substantive work.
- **Severity:** High
- **Recommended action:** Apply the case-study template in §5 to both projects.
- **Expected impact:** Meaningfully stronger first impression for anyone who clicks through from publications or search.
- **Effort:** Medium

### Finding 3 — Mermaid diagram source code may be rendering as raw text
- **Evidence:** The fetched HTML/markdown for the EviTrace page shows the Mermaid `flowchart LR` syntax as plain text in the page body rather than as a parsed diagram reference. This tool's fetch does not execute client-side JavaScript, so this cannot be confirmed as a live-browser rendering failure from this data alone.
- **Why it matters:** If the diagram is in fact rendering as raw code in visitors' browsers (rather than as a diagram), it undermines the single most visually persuasive asset on the flagship project page.
- **Severity:** High if confirmed, otherwise not applicable
- **Recommended action:** Open the live page in a real browser (desktop and mobile) and confirm whether the flowchart renders as a diagram. If it does not, check that the Mermaid.js runtime is loading and that the code fence uses the exact syntax Hugo Blox expects.
- **Effort:** Small
- **Validation needed:** Manual browser check — this is explicitly a validation task, not a confirmed defect.

### Finding 4 — Taxonomy (tag) pages carry duplicate, non-unique meta descriptions
- **Evidence:** `/tags/evidence-grounding/` returns a unique `<title>` ("Evidence Grounding | Soroush Dianaty, M.D.") but the exact same site-wide meta description used on the homepage, research page, and other tag pages ("Soroush Dianaty, M.D., is a Biomedical Informatics PhD researcher... FHIR-based health data systems."). The same pattern appears on the homepage-level taxonomy pages generated by the template.
- **Why it matters:** Duplicate meta descriptions across many indexable URLs dilute topical relevance signals and mean Google is likely to rewrite the snippet for these pages anyway — a missed opportunity on pages that could otherwise reinforce specific research themes.
- **Severity:** Medium
- **Recommended action:** Either write unique one-sentence descriptions per tag/theme, or `noindex` low-value tag pages that duplicate content already indexed elsewhere (see §6 for the specific recommendation per URL type).
- **Effort:** Small

### Finding 5 — No visible primary navigation bar in fetched markup
- **Evidence:** Every fetched page shows only "Open Menu / Close Menu" in the header, with the full page list (Research, Teaching, Experiences, Projects, Bio, Blog, Education, Publications, Events) appearing as a left-column sidebar table of contents rather than a persistent top nav with a curated 5–6 item set.
- **Why it matters:** Nine parallel top-level sections is navigation overload for a first-time visitor, and if this sidebar is the *only* way to move between sections (rather than a supplement to a slim top nav), that adds friction for exactly the audience this site is trying to convert.
- **Severity:** High
- **Recommended action:** Confirm in a live browser whether a compact top nav exists and the sidebar is a secondary in-page table of contents (common in Hugo Blox academic themes) — if so, the priority is trimming *that* nav to 5–6 items per §4. If there truly is no persistent primary nav, add one.
- **Effort:** Small (if only consolidation) to Medium (if nav needs to be built)
- **Validation needed:** This is inferred from static HTML/markdown extraction, which does not always preserve JS-rendered nav bars — verify visually before prioritizing a rebuild.

### Finding 6 — Blog content mix currently skews to third-party AI-industry news rather than the author's own research
- **Evidence:** All three published blog posts as of this audit are about Anthropic's Claude Fable/Mythos export-control suspension and reopening, or general clinical-LLM-evaluation commentary — none are first-person write-ups of the author's own study results, methods, or research process.
- **Why it matters:** This directly risks the outcome the request brief flagged as something to avoid: the site reading as "a generic AI-news blog" rather than a distinctive research voice. It's also a missed SEO opportunity — evergreen, expertise-demonstrating content (see §9) tends to compound in search value, while commentary on a single news cycle has a short shelf life.
- **Severity:** Medium
- **Recommended action:** Rebalance the editorial mix per §9 — aim for roughly 60% evergreen/methods content, 25% project-and-publication-driven notes, 15% timely commentary.
- **Effort:** Medium (ongoing, editorial)

### Finding 7 — Entity signals across the web are strong but include one stale, damaging outlier
- **Evidence:** ASU profile, GitHub, ORCID, Google Scholar, and the personal site are mutually consistent (same name, ASU affiliation, cross-links). The one outlier is a ZoomInfo scrape describing outdated information (Qazvin-based Family Physician, Islamic Azad University MD, no ASU/PhD mention).
- **Why it matters:** ZoomInfo pages often rank well because of the platform's domain authority, and an inaccurate scrape can outrank the true, current information — see Finding 1.
- **Severity:** Medium
- **Recommended action:** Submit a correction/claim request to ZoomInfo (or a removal request, since this is not a paid-controlled profile), and prioritize the backlink/indexing work in Finding 1 to outrank it organically in the meantime.
- **Effort:** Small

### Finding 8 — No evidence of legacy/duplicate domains or leftover demo/template pages
- **Evidence:** Searches for `"drdianaty.com"` and other plausible old-domain variants returned no matches; `site:soroushdianaty.com`-style queries returned no unrelated demo/template/taxonomy pages beyond the tag pages already discussed.
- **Why it matters:** This is a **confirmed absence of a problem**, not a finding requiring action — flagged here so it isn't mistakenly investigated further. Domain consolidation and legacy-URL cleanup, which are common issues on Hugo Blox academic sites migrated from other platforms, do not appear to apply here.
- **Severity:** Low (informational)
- **Recommended action:** None required; re-verify directly in Google Search Console's "Duplicate, Google chose different canonical" and "Discovered — not indexed" reports, since this audit's search tool is not equivalent to a full Search Console crawl.

### Finding 9 — robots.txt and sitemap.xml could not be independently verified in this session
- **Evidence:** Direct fetch attempts to `soroushdianaty.com/robots.txt` and a sitemap URL were blocked by this tool's access rules (only URLs surfaced via search or prior fetch can be retrieved, and neither file surfaced in search results).
- **Why it matters:** These are foundational technical SEO files — an incorrect `Disallow` rule or missing sitemap reference could explain some of the indexing weakness in Finding 1.
- **Severity:** High (unknown — could be the root cause of Finding 1)
- **Recommended action:** Manually open `https://soroushdianaty.com/robots.txt` and `https://soroushdianaty.com/sitemap.xml` in a browser or via `curl`, confirm the sitemap is referenced in robots.txt, contains all canonical URLs, and that nothing is disallowing `/` or key sections.
- **Effort:** Small
- **Validation needed:** This is a required manual check, not a confirmed problem — flagged as high severity only because of its potential connection to Finding 1.

---

## 3. Design and UX Audit

**First impression:** The homepage leads with a portrait, name, a bilingual tagline (English positioning statement plus سروش دیانتی in Persian), academic role, institution, and three clear CTAs (Explore Research, View Publications, Download CV). This is a strong, credible opening — it reads as "researcher," not "job seeker" or "generic developer portfolio."

**Visual hierarchy:** The homepage follows a sensible top-to-bottom flow: hero → research focus (three numbered pillars) → featured publications → selected projects → recent publications list → talks → award spotlight → recent news. This is close to the ideal order requested in this brief, with one gap: there's no explicit "current affiliation" trust block (ASU logo, department, advisor) and no dedicated "collaborate with me" section — the site ends on a blog list rather than a call to action.

**Hero section:** Clear and above-average for an academic site. The bilingual name treatment is a nice authentic touch rather than a generic template artifact.

**Typography, color, spacing:** Cannot be fully judged from fetched markup/metadata alone — this needs a direct visual pass in a browser (desktop and mobile) rather than being asserted here as measured. What is confirmed is that the theme is Hugo Blox Kit 0.12.0 ("Academic CV" template), which means much of the visual system is template-default unless customized — worth a deliberate pass to inject brand-specific color and type choices rather than shipping the default look, per the frontend-design guidance on avoiding templated defaults.

**Card usage, images, research diagrams:** Publication and project cards are present and functional. The one directly observed diagram (EviTrace's Mermaid flowchart) needs the rendering check flagged in Finding 3.

**Mobile responsiveness, dark mode, language switcher:** Not independently verifiable from this fetch method — flag as validation tasks. The `viewport` meta tag is correctly configured (`width=device-width,initial-scale=1`), which is a good sign but not proof of a fully responsive layout.

**Navigation, footer:** Footer is minimal and consistent (copyright line, Hugo Blox attribution/backlink). The Hugo Blox "Clone this template" outbound link in the footer is standard for the free tier of this theme but is worth being aware of as a slightly off-brand distraction on an otherwise personal, professional page.

**Calls to action / contact accessibility:** "Download CV" and "Explore Research" are strong, working CTAs on the homepage. There's no visible dedicated "Contact" or "Collaborate" page or CTA distinct from the mailto link buried in the bio page footer — this is a real gap for the "conversion paths for collaborators, employers, researchers, and students" objective stated in the brief.

**Perceived academic authority:** High, thanks to real PubMed-linked publications, ORCID/Scholar consistency, and a specific, credible research narrative (trustworthy clinical LLMs, evidence grounding, FHIR data segmentation) rather than vague AI-buzzword positioning.

### Proposed homepage hierarchy

1. Hero (name, bilingual tagline, role, institution, 2–3 CTAs)
2. Credibility indicators (ASU affiliation badge, PhD program, award callout, "as seen in" if applicable)
3. Research themes (three pillars — already present, keep)
4. Flagship projects (EviTrace, Project Lullaby — expand per §5)
5. Selected publications (already present, keep, add a "why this matters" one-liner per entry)
6. Current affiliation block (department, lab/PI if applicable, teaching role)
7. Latest research note (evergreen content per §9, not just news commentary)
8. Collaboration call to action (explicit "Interested in collaborating on clinical AI evaluation? Reach out" block with a direct mailto or contact form)

### Example copy

- **Hero eyebrow:** "Physician-Scientist · Biomedical Informatics PhD Researcher"
- **H1:** "Making Clinical AI Trustworthy Enough to Deploy"
- **Research positioning statement:** "I build evaluation frameworks that tell clinicians when a language model's output can be trusted — and when it can't."
- **Supporting paragraph:** "My work sits at the intersection of medicine and machine learning: detecting hallucinations in clinical LLM output, grounding generated claims in verifiable evidence, and designing FHIR-based data segmentation so sensitive health information can be shared safely. I trained as a physician before moving into informatics research, and that clinical grounding shapes every evaluation framework I build."
- **Primary CTA:** "See the Research →"
- **Secondary CTA:** "Download CV"
- **Collaboration section:** "Working on clinical NLP evaluation, EHR-based AI safety, or FHIR interoperability? I'm always glad to talk — reach out at sdianaty@asu.edu."

---

## 4. Information Architecture

**Current state (observed):** Research, Teaching & Mentorship, Experiences (with 3 sub-pages), Projects (with 2 sub-pages), Biography, Blog (with 3 posts), Education Portfolio (with 1 sub-page), Publications (11+ entries, paginated), Recent & Upcoming Talks/Events (3 entries). That is nine parallel top-level destinations before counting sub-pages — too many for a primary nav, even though it's a reasonable set of *content types* to have somewhere on the site.

**Overlap to resolve:** "Experiences" and "Education Portfolio" both function as CV-style history and could reasonably live under one "Background" or "CV" section with sub-tabs. "Recent & Upcoming Talks" substantially overlaps with "Publications" (the same three items appear in both, since talks and papers share the same underlying work) — these could be cross-linked rather than duplicated as separate top-level destinations.

### Recommended primary navigation (5–6 items)

1. **Research** (folds in Research Focus + Projects as sub-items)
2. **Publications** (folds in Talks/Events as a filterable view or sidebar, since they largely share the same underlying works)
3. **About** (folds in Biography + Education Portfolio + Experience)
4. **Writing** (the blog, rebalanced per §9)
5. **Teaching**
6. **CV / Contact** (a single destination that offers the CV download and a clear collaboration CTA — this doubles as the conversion page for §3)

### Recommended sitemap

```
/                          → Homepage (hero, pillars, featured pubs/projects, CTA)
/research/                 → Research Focus & Program
  #trustworthy-clinical-llms
  #evidence-grounding
  #fhir-health-data
/research/evitrace/        → EviTrace (moved under /research/ as flagship project)
/research/project-lullaby/ → Project Lullaby
/publications/              → Full publication list (filterable by theme/type)
/publications/<slug>/       → Individual publication pages (existing structure, keep)
/talks/                     → Talks & events (cross-linked from publications, not a separate primary nav item)
/writing/                   → Blog / research notes (renamed from /blog/, rebalanced content mix)
/writing/<slug>/
/about/                     → Biography (merges current /bio/)
/about/education/           → Education Portfolio (existing /education/md/ content, nested)
/about/experience/          → Experience entries (existing /experience/ content, nested)
/teaching/                  → Teaching & Mentorship (existing content, keep as top-level)
/cv/                        → CV download + explicit collaboration CTA + contact
```

This keeps every existing URL's content intact (nothing needs to be deleted) while flattening the *navigation* down to six clickable destinations. Where URLs move (e.g., `/bio/` → `/about/`), 301 redirects are required — see §6.

---

## 5. Content Audit

| Section | Working | Missing | Remove | Expand | Search-intent fit |
|---|---|---|---|---|---|
| Research overview | Clear three-pillar structure, plain-language explanations | No links from each pillar down to the specific publications/projects that support it | — | Add 1–2 sentence "supporting evidence" links per pillar | Good for informational queries like "clinical LLM hallucination detection research" |
| Project pages | Real technical depth (EviTrace's 4-stage QC pipeline, GitHub link) | Problem statement, evaluation results, limitations, reproducibility notes, status/last-updated framing | — | Apply case-study structure below | Currently too thin to rank for anything beyond the project's own name |
| Publications | Complete, accurate, PubMed/DOI-linked, correctly chronological | Per-publication plain-language summary of *why it matters* (currently just citation + tags) | — | One-sentence lay summary per entry | Good entity/citation SEO; weak for topic-based discovery search |
| Biography | Concise, accurate, cross-linked to GitHub/LinkedIn/Scholar/ORCID | A short "how I got here" narrative bridging MD → PhD (currently purely factual timeline) | — | 2–3 sentences of narrative | Fine for branded search once indexing is fixed (Finding 1) |
| Experience | Good specificity (7,500+ patients across 17 villages, real institutional names) | Cross-links from experience entries to related research interests | — | Light | Adds credibility; low search-intent value on its own |
| Blog/research notes | Two posts show real analytical depth | Evergreen, first-person research-method content (see Finding 6) | Nothing — repurpose, don't delete | Add 8–10 evergreen pieces per §9 | Currently thin/timely; needs rebalancing |
| Teaching | Specific, well-documented (named courses, responsibilities) | Student outcomes or testimonials (optional, common on strong academic sites) | — | Light | Not a primary SEO target; fine as-is |
| News/events | Accurately mirrors publications/talks | A single unified "Talks" or "Activity" feed instead of a separate top-level section | Consider merging into Publications per §4 | — | Low independent search value |

**Do the project pages function as true case studies today?** Not yet. EviTrace has real substance (a described 4-stage QC pipeline, sample JSON-LD output, GPL-3.0 license, GitHub link) but is missing the framing that turns "here's what I built" into "here's the problem I solved, how I solved it, and what I learned." Project Lullaby is currently a one-line teaser on the homepage with no dedicated deep page confirmed in this crawl — this should be checked directly and built out if thin.

### Recommended case-study structure (for EviTrace, Project Lullaby, and future flagship projects)

- **Problem** — what breaks today without this tool
- **Research question** — the specific question being answered
- **Role** — sole author / lead / contributor, and what that meant day-to-day
- **Collaborators** — names and affiliations where appropriate
- **Methods** — the technical approach (EviTrace already has strong material here)
- **Architecture** — the diagram, rendered correctly (see Finding 3)
- **Data** — what was used to build/validate it
- **Evaluation** — how correctness/quality was measured
- **Results** — concrete outcomes, even preliminary ones
- **Limitations** — stated honestly; this builds credibility, not doubt
- **Reproducibility** — link to code/data, license, setup instructions
- **Publications** — link to any paper(s) that came from this work
- **Code** — GitHub link (already present)
- **Project status** — active / archived / seeking collaborators
- **Last updated date** — already tracked site-wide; surface it visibly on the page, not just in metadata

---

## 6. SEO Audit

### On-page SEO

**Observed pattern across pages:** Every fetched page carries a unique, descriptive `<title>` in the format `[Page Name] | Soroush Dianaty, M.D.`, and canonical tags are present and correct on every page checked, including paginated publication pages (which correctly reference themselves rather than duplicating page 1 — a subtlety many sites get wrong). The one consistent weakness is that several page types (tag/taxonomy pages, and likely category-style archive pages not individually checked) reuse the exact site-wide meta description instead of a unique one (Finding 4).

**Heading hierarchy:** H1 usage observed is correct (one clear H1 per page — page title), with H2/H3 used for sub-sections (e.g., the three research pillars). No skipped heading levels were observed in the pages fetched.

**URL structure:** Clean, descriptive, lowercase, hyphenated slugs throughout (`/publications/fhir-granular-data-segmentation/`, `/experience/family-physician/`) — this is genuinely strong and above-average for an academic site.

**Image alt text:** Alt text is present on key images (e.g., "Portrait of Soroush Dianaty, M.D.") — full site-wide alt-text coverage should be spot-checked, particularly on any diagrams once the Mermaid rendering question (Finding 3) is resolved.

**Internal linking / anchor text:** Anchor text is generally descriptive (e.g., "View Thesis & Clinical Portfolio →" rather than "click here"). Cross-linking from project pages back to the author's bio is automatic (Hugo Blox author byline), which is good practice already in place.

**Social metadata:** Open Graph and Twitter Card tags are present and complete on every page fetched (og:title, og:description, og:image, twitter:card), including a dedicated 1200×630 sharing card image — this is a strong, already-correct implementation.

**Publication/update dates:** `article:published_time` and `article:modified_time` are present in metadata on content pages — good for freshness signals, though the "Last updated" date is not always surfaced as visible on-page text (it was visible on /research/ but should be checked site-wide).

### Recommended titles and meta descriptions

| Page | Recommended title | Recommended meta description |
|---|---|---|
| Homepage | Soroush Dianaty, M.D. — Trustworthy Clinical AI & Biomedical Informatics | Physician-scientist and PhD researcher at Arizona State University building evaluation frameworks for hallucination detection, evidence grounding, and FHIR-based clinical AI. |
| Research | Clinical LLM Evaluation Research — Soroush Dianaty | Research on hallucination detection, evidence grounding, and FHIR-based data segmentation for trustworthy clinical AI, led by Soroush Dianaty at ASU. |
| Publications | Publications — Soroush Dianaty, M.D. | Peer-reviewed publications by Soroush Dianaty on clinical AI evaluation, FHIR data segmentation, and clinical outcomes research, with PubMed and DOI links. |
| About/Bio | About Soroush Dianaty — Physician-Scientist, ASU | MD-turned-PhD-researcher bridging clinical medicine and biomedical informatics, now studying trustworthy clinical LLM evaluation at Arizona State University. |
| Writing/Blog | Writing on Clinical AI Evaluation — Soroush Dianaty | Essays on evaluating clinical LLMs, evidence grounding, and FHIR interoperability from a physician-researcher's perspective. |
| EviTrace | EviTrace: Evidence-Grounded PDF Extraction for Clinical Research | An auditable, evidence-grounded pipeline for extracting structured clinical attributes from scientific PDFs, with per-field provenance and a 4-stage QC process. |
| Trustworthy Clinical LLMs theme | Trustworthy Clinical LLM Evaluation Research | Evaluation frameworks for hallucination detection, calibration, and clinically meaningful performance metrics in generative clinical AI. |
| Evidence Grounding theme | Evidence Grounding in Clinical AI Research | Methods for verifying that generated clinical claims are explicitly supported by EHR notes and biomedical literature. |
| FHIR / Interoperable Health Data theme | FHIR-Based Health Data Segmentation Research | Granular, FHIR-oriented data segmentation research protecting sensitive health information while preserving interoperability. |

### Technical SEO

| Item | Status |
|---|---|
| HTTPS | Confirmed — all fetched URLs served over HTTPS |
| www → non-www redirect | Confirmed working — fetching `www.soroushdianaty.com` resolved to the canonical `soroushdianaty.com` |
| Canonical tags | Confirmed present and correct on every page fetched, including correct self-referential canonicals on paginated publication pages |
| Trailing slash consistency | Confirmed consistent (all content URLs use a trailing slash) |
| Sitemap.xml | **Could not be independently verified this session** — validation task |
| Robots.txt | **Could not be independently verified this session** — validation task, high priority given Finding 1 |
| Duplicate/thin taxonomy pages | Tag pages exist and are thin/duplicate on meta description (Finding 4); not confirmed as indexed or not |
| Old/legacy domains | No evidence found of `drdianaty.com` or other duplicate domains — treat as a non-issue pending a direct DNS/WHOIS check if desired |
| JavaScript-rendered content | Mermaid diagrams may depend on client-side JS — verify rendering (Finding 3) and confirm Google can render the page correctly via Search Console's URL Inspection "rendered HTML" view |
| Broken links | None identified in the pages fetched; a full crawl (e.g., via Screaming Frog) is recommended to check the complete site |

**Recommended treatment for each URL category, per the brief's request:**

| URL category | Recommendation | Why |
|---|---|---|
| Tag/taxonomy pages (`/tags/*`) | Content improvement (unique descriptions) for tags with 2+ substantial items; `noindex` for tags with only one thin item | Avoids duplicate-description dilution without losing legitimate topical hub pages |
| Paginated publication pages (`/publications/page/2/`) | Keep self-referential canonical (already correct); consider raising the per-page count so pagination is rarely needed with only ~11 publications | Current setup is technically correct, just barely necessary at this content volume |
| `www` subdomain | Keep as a 301 redirect to non-www (already working) | No action needed — confirmed correct |
| Any leftover Hugo Blox demo/example content | Not found in this crawl — if a manual review finds any (e.g., a default "Publication Title" placeholder), 404/410 it | Precautionary only |
| Old domain(s), if any exist | 301 redirect to the equivalent soroushdianaty.com page once confirmed to exist | No evidence of an old domain was found in this audit |

### Entity and academic-author SEO

Cross-checked platforms and consistency:

| Platform | Status | Notes |
|---|---|---|
| Personal website | Consistent | Name, ASU affiliation, research focus all aligned |
| ASU directory profile | Consistent, authoritative | Links out to personal site and LinkedIn; lists Google Scholar and ORCID IDs directly |
| GitHub (`github.com/soroushdty`) | Consistent | Bio reads "BIDS PhD Student at ASU"; links to personal site, LinkedIn, and ASU profile |
| ORCID (`0000-0001-5674-8999`) | Consistent (per ASU profile and Wiley author metadata) | Same ID cited across multiple sources |
| Google Scholar | Consistent (per ASU profile link) | Not independently fetchable (robots-disallowed for automated tools); confirm profile completeness manually |
| LinkedIn | Consistent (per ASU/GitHub cross-links) | Not independently fetchable; confirm headline/summary match current positioning manually |
| PubMed / journal author records | Consistent | ASU affiliation correctly listed on the most recent Frontiers and Wiley articles |
| ZoomInfo | **Inconsistent, outdated** | Describes an earlier career stage (Iran-based Family Physician) with no ASU/PhD mention — the one real outlier |

**Recommended consistent professional identity statement** (for use verbatim across LinkedIn headline, Scholar bio, and site meta description): *"Physician-scientist and Biomedical Informatics PhD researcher at Arizona State University, building evaluation frameworks for trustworthy clinical LLMs, evidence grounding, and FHIR-based health data interoperability."*

**Changes to help search engines associate the site with the correct researcher:** Add `sameAs` structured-data links (see §7) pointing to ASU, GitHub, ORCID, and Google Scholar from the homepage `Person` schema; pursue the ZoomInfo correction/removal in Finding 7; and prioritize the indexing fix in Finding 1 so the canonical, current source (the personal site) has a fighting chance against third-party aggregators.

---

## 7. Structured-Data Recommendations

No structured data (JSON-LD or Microdata) was observed in the fetched page metadata for the homepage, research page, or bio page, beyond the EviTrace page's example `MedicalStudy` JSON-LD, which is sample output for the tool itself, not site-wide schema. This means the site is very likely not currently emitting `Person`, `ProfilePage`, or `ScholarlyArticle` schema — a real gap worth confirming with Google's Rich Results Test before adding anything, since some Hugo Blox themes emit schema that isn't visible in a plain fetch.

**Recommended schema types and key properties:**

- **`Person`** (homepage/bio): `name`, `alternateName` (Persian name), `jobTitle`, `affiliation` (Organization → ASU), `url`, `sameAs` (array: GitHub, LinkedIn, ORCID, Google Scholar), `image`
- **`ProfilePage`** (homepage or bio): wraps the `Person` as `mainEntity`
- **`Organization`** (ASU, referenced from `Person.affiliation`): `name`, `url`
- **`ScholarlyArticle`** (each publication page): `headline`, `author`, `datePublished`, `identifier` (DOI), `isPartOf` (journal/conference name), `citation` if applicable
- **`Article` / `BlogPosting`** (blog posts): `headline`, `author`, `datePublished`, `dateModified`, `image`
- **`BreadcrumbList`** (all non-homepage pages): reinforces the IA proposed in §4
- **`WebSite`** (homepage): `name`, `url`, optionally `potentialAction` for a `SearchAction` if a site search exists (a search UI was observed in the header — "All Results / Searching... / No results found")

**Example JSON-LD for the homepage** (illustrative — verify field values against the live site before deploying, and check whether Hugo Blox already generates any of this before adding duplicates):

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://soroushdianaty.com/#person",
      "name": "Soroush Dianaty",
      "alternateName": "سروش دیانتی",
      "jobTitle": "PhD Researcher, Biomedical Informatics and Data Science",
      "url": "https://soroushdianaty.com/",
      "image": "https://soroushdianaty.com/media/authors/me.jpg",
      "affiliation": {
        "@type": "CollegeOrUniversity",
        "name": "Arizona State University",
        "url": "https://www.asu.edu"
      },
      "sameAs": [
        "https://github.com/soroushdty",
        "https://www.linkedin.com/in/soroush-dianaty/",
        "https://orcid.org/0000-0001-5674-8999",
        "https://scholar.google.com/citations?user=GxlqqGoAAAAJ&hl=en",
        "https://search.asu.edu/profile/5071792"
      ]
    },
    {
      "@type": "ProfilePage",
      "@id": "https://soroushdianaty.com/#profilepage",
      "mainEntity": { "@id": "https://soroushdianaty.com/#person" }
    },
    {
      "@type": "WebSite",
      "@id": "https://soroushdianaty.com/#website",
      "url": "https://soroushdianaty.com/",
      "name": "Soroush Dianaty, M.D.",
      "publisher": { "@id": "https://soroushdianaty.com/#person" }
    }
  ]
}
```

Do not duplicate any markup Hugo Blox already generates correctly — check the live page source (`view-source:`) for existing `<script type="application/ld+json">` blocks before adding new ones, and validate with Google's Rich Results Test rather than assuming this list is complete.

---

## 8. Internal-Linking Strategy

**Model:** Research theme → Project → Publication → Research note

**Specific examples based on actual site content:**

- `Evidence Grounding` (research theme, `/research/#evidence-grounding`) → **should link to** → `EviTrace` (project) → **which should link to** → `Assessing the Effectiveness and Scalability of FHIR-Based Granular Data Segmentation` (the closest related publication) → **which should link to** → the blog post "Evaluating Clinical LLMs: Beyond Standard NLP Benchmarks" (research note) — this exact chain already exists as separate content but is not currently cross-linked end-to-end.
- `Interoperable Health Data & Granular Segmentation` (research theme) → **Project Lullaby** (digital health surveillance touches on real-world data segmentation and privacy) → **the FHIR granular data segmentation publication** → a future research note on 42 CFR Part 2 / SHARES.
- `Trustworthy Clinical LLMs` (research theme) → the two "Anthropic Fable" blog posts, reframed as case studies in *why AI governance and model-access volatility matter for health-tech teams building on foundation models* — this is the one place the current AI-news content genuinely connects back to the core research narrative, and it should be linked explicitly rather than left as a standalone tag cluster.

**Recommended anchor text:** Use the destination page's actual subject as anchor text ("the FHIR-based granular data segmentation study," "EviTrace's evidence-grounding pipeline") rather than generic phrases like "this project" or "read more" — this reinforces topical relevance for both users and search engines.

---

## 9. Content Strategy

**Goal:** Build durable topical authority in trustworthy clinical AI, clinical LLM evaluation, evidence grounding, biomedical informatics, privacy-aware health data, FHIR, clinical hallucination evaluation, and reproducible AI evaluation — without becoming a generic AI-news blog (the explicit risk flagged in Finding 6).

**Recommended editorial mix:** ~60% evergreen/methods explainers, ~25% project- and publication-driven research notes (a plain-language companion post every time a paper or project milestone lands), ~15% timely commentary (reserved for genuine health-tech-relevant regulatory or industry events, not general AI news).

### 10–15 high-value article topics

| Topic | Search intent | Target reader | Link to | Type |
|---|---|---|---|---|
| What "hallucination" actually means in a clinical LLM (and how to measure it) | Informational — clinicians/researchers new to the term | Clinician-researchers, health-tech PMs | Research → Trustworthy Clinical LLMs | Evergreen |
| A plain-language walkthrough of EviTrace's 4-stage QC pipeline | Informational/technical | ML engineers evaluating similar pipelines | EviTrace project page | Project-focused |
| Why RAG isn't enough for clinical evidence grounding | Informational — technical debate | ML researchers, informatics grad students | Evidence Grounding theme | Evergreen |
| Explaining 42 CFR Part 2 to engineers building health data pipelines | Informational — compliance-adjacent | Health-tech engineers | FHIR / Interoperable Health Data theme | Evergreen |
| FHIR data segmentation, explained for non-FHIR people | Informational | Broader health-tech audience | FHIR granular segmentation publication | Evergreen |
| What I learned building Project Lullaby's remote monitoring pipeline | Case-study/narrative | Digital health builders | Project Lullaby page | Project-focused |
| How clinicians should read a "hallucination rate" benchmark claim | Informational — practical skepticism | Clinicians evaluating AI vendor claims | Trustworthy Clinical LLMs theme | Evergreen |
| Reproducibility standards for clinical AI evaluation studies | Informational/methods | Academic peers, reviewers | Research overview | Evergreen |
| From MD to PhD: why a physician studies AI evaluation instead of practicing | Narrative/positioning | Recruiters, prospective collaborators, students | Bio/About | Evergreen |
| A researcher's take on the AcademyHealth ARM 2026 presentation | Recap/timely | Conference peers | Corresponding publication/talk | Timely, evergreen-leaning |
| Benchmarks vs. bedside: why MMLU-style scores don't predict clinical safety | Informational | ML researchers, health-tech leadership | Existing "Evaluating Clinical LLMs" post (expand) | Evergreen |
| What foundation-model access policy changes mean for health-tech teams (using the Anthropic Fable episode as a case study, reframed) | Timely, but reframed around durable lessons | Health-tech engineering leadership | Trustworthy Clinical LLMs theme | Timely, but written for durability |
| Designing an inter-annotator agreement protocol for clinical NLP labeling | Methods/technical | Informatics grad students, ML engineers | EviTrace / Evidence Grounding | Evergreen |

**How to avoid the generic-AI-news-blog trap:** Every commentary piece should be explicitly reframed through the health-tech/clinical-AI-safety lens *before* publishing (the existing Anthropic posts already do some of this — lean further into it, and cut anything that's pure industry recap without a clinical-AI angle).

---

## 10. Accessibility Audit

**Directly observed from fetched markup:**
- Heading hierarchy appears correct (single H1 per page, nested H2/H3) on every page fetched.
- Descriptive alt text is present on the homepage portrait image ("Portrait of Soroush Dianaty, M.D.").
- The `lang` attribute and RTL handling for the embedded Persian text (سروش دیانتی) could not be confirmed from the fetched markdown extraction — this needs a direct view-source check, since correct `lang="fa"` / `dir="rtl"` spans matter for screen readers correctly pronouncing the Persian name.
- Descriptive link text is generally used ("View Thesis & Clinical Portfolio →" rather than "click here").

**Requires manual/tool testing (WCAG 2.2-oriented checklist):**

| Item | Status |
|---|---|
| Keyboard navigation (tab order, all interactive elements reachable) | Not tested — requires manual keyboard-only pass |
| Visible focus indicators | Not tested — requires manual pass or automated tool (axe, WAVE) |
| Skip-navigation link | Not observed in fetched markup — likely missing; add one |
| Color contrast (text, links, buttons against backgrounds) | Not tested — requires a contrast-checking tool against the live rendered styles |
| Diagram accessibility (Mermaid flowchart alt/text equivalent) | Not tested — depends on Finding 3's rendering outcome; if it renders as an SVG, it needs an accessible text alternative or `aria-label` |
| Target size (2.5.8 in WCAG 2.2, minimum tap target size) | Not tested — check nav/menu buttons in a live mobile view |
| Reduced motion support (`prefers-reduced-motion`) | Not tested |
| Dark-mode contrast (if dark mode exists) | Not tested — confirm dark mode exists first |
| `lang` attribute and RTL support for Persian text | Not confirmed from this fetch method — verify in view-source |
| Form labels | Not applicable to pages observed (no forms found); confirm if a contact form is added per §3 |
| Accessible authentication | Not applicable — no login/auth flow observed on this site |

**Recommendation:** Run axe DevTools or WAVE against the live site (all major templates listed in §11), and do one full keyboard-only pass before treating any of the above as resolved.

---

## 11. Performance Audit

No Lighthouse, PageSpeed Insights, WebPageTest, or Core Web Vitals field data was collected for this audit — inventing scores would violate this audit's accuracy requirements. What follows is an observed-risk list and a concrete test plan.

**Observed risk factors (from markup, not measurement):**
- Third-party embeds: X/Twitter, Facebook, LinkedIn, and WhatsApp share links appear on every content page — each is a small but real script/resource dependency that can affect INP if not lazy-loaded.
- A client-side search widget ("All Results / Searching... / No results found") is present in the header on every page — worth confirming it doesn't block rendering or add unnecessary JS weight on pages where search is rarely used.
- Mermaid.js (if in use per Finding 3) is a non-trivial JS dependency that runs diagram parsing client-side — this can affect both LCP (if diagrams are above the fold) and INP.
- Images use `.webp` for blog featured images (a good, modern format choice) but the homepage portrait uses `.jpg` — worth auditing whether responsive `srcset` variants are served for both.

**Current Core Web Vitals thresholds to test against (2026):** Largest Contentful Paint (LCP) under 2.5 seconds, Interaction to Next Paint (INP) under 200 milliseconds, and Cumulative Layout Shift (CLS) under 0.1, each measured at the 75th percentile of real-user data.

**Recommended test plan:**
1. Run PageSpeed Insights on the homepage, `/research/`, `/projects/evitrace/` (heaviest page — diagram + JSON-LD block), and one publication page, on both mobile and desktop.
2. Cross-check with Google Search Console's Core Web Vitals report for real-user (CrUX) field data once enough traffic has accumulated.
3. Use Chrome DevTools' Performance panel to profile the EviTrace page specifically, given its Mermaid dependency and larger content payload.
4. Use WebPageTest for a waterfall view of third-party script loading (social share buttons, search widget, Mermaid).
5. Re-test after any fix to confirm no regression, and allow the ~28-day CrUX rolling window before judging field-data improvement.

---

## 12. Competitive Positioning

Rather than naming and copying specific individuals' sites, the useful comparison is to the patterns that make the strongest personal academic/research sites in biomedical informatics and clinical AI effective:

- **Concise positioning stated once, prominently** — a single sentence a hiring committee or collaborator can repeat back after 5 seconds. SoroushDianaty.com already has the raw material for this (see the hero copy suggestion in §3) but currently splits the positioning statement across the hero, research page, and bio page with slightly different wording each time.
- **Flagship-project emphasis** — the strongest sites treat one or two projects as the centerpiece, with real depth (see §5's case-study structure), rather than spreading equal weight across everything.
- **Publication filtering by theme, not just chronology** — letting a visitor filter to "evidence grounding" or "FHIR" publications directly, rather than scrolling a flat reverse-chronological list.
- **Visual research storytelling** — diagrams that actually render and are captioned in plain language (directly relevant given Finding 3).
- **Accessible CV and multiple contact paths** — a CV download plus a clear "how to reach me" block, not just a mailto buried in a bio footer.

**How SoroushDianaty.com can stay distinctive rather than converging on a template look:** Lean into the physician-to-informatics-researcher narrative (a genuinely differentiated background from most CS-trained clinical-AI researchers), the bilingual identity treatment already present in the hero, and a visual system for the research diagrams that's custom rather than default Mermaid styling — this is the kind of small, deliberate design investment that separates a distinctive academic site from a templated one.

---

## 13. Recommended Site Architecture

```
soroushdianaty.com/
├── index.html                    # Homepage — hero, pillars, featured work, CTA
├── research/
│   ├── index.html                # Research overview (3 pillars)
│   ├── evitrace/                 # Flagship project (moved from /projects/)
│   └── project-lullaby/          # Flagship project (moved from /projects/)
├── publications/
│   ├── index.html                # Filterable by theme + chronological
│   └── <slug>/                   # Individual publication pages (existing)
├── talks/
│   └── <slug>/                   # Talks/events, cross-linked from publications
├── writing/
│   └── <slug>/                   # Blog/research notes (renamed from /blog/)
├── about/
│   ├── index.html                # Biography (merged from /bio/)
│   ├── education/                # From /education/md/
│   └── experience/               # From /experience/*
├── teaching/
│   └── index.html                # Teaching & Mentorship (unchanged)
└── cv/
    └── index.html                # CV download + collaboration CTA + contact
```

---

## 14. Implementation Roadmap

### Priority 0: Critical search and credibility cleanup

| Task | Owner | Effort | Impact | Dependency | Verification |
|---|---|---|---|---|---|
| Fetch and audit `robots.txt` and `sitemap.xml` directly | Developer | Small | Critical | None | Manual browser check; confirm no blanket `Disallow` |
| Submit/verify site in Google Search Console; check index coverage | SEO | Small | Critical | None | Search Console coverage report |
| Investigate and resolve why the site doesn't surface for its own name | SEO | Medium | Critical | Robots/sitemap check | Manual `site:soroushdianaty.com` and branded-name search in Google |
| Request correction/removal of the outdated ZoomInfo profile | Content editor | Small | High | None | Re-check ZoomInfo listing after request |

### Priority 1: Information architecture and conversion

| Task | Owner | Effort | Impact | Dependency | Verification |
|---|---|---|---|---|---|
| Confirm live-browser nav behavior (top nav vs. sidebar-only) | Designer | Small | High | None | Manual desktop + mobile browser check |
| Consolidate navigation to 5–6 primary items per §4 | Developer/Designer | Medium | High | Nav confirmation above | Visual review against proposed sitemap |
| Add a dedicated CV/Contact page with an explicit collaboration CTA | Developer/Content editor | Small | High | None | Live page review |
| Set up 301 redirects for any URLs that move (e.g., `/bio/` → `/about/`) | Developer | Small | High | IA changes above | Spot-check redirects with curl/browser |

### Priority 2: Content authority

| Task | Owner | Effort | Impact | Dependency | Verification |
|---|---|---|---|---|---|
| Rebuild EviTrace and Project Lullaby as full case studies (§5 structure) | Content editor | Medium | High | Diagram rendering fix (Finding 3) | Peer review against case-study checklist |
| Confirm/fix Mermaid diagram rendering | Developer | Small | High | None | Live browser check, desktop + mobile |
| Publish first 3–4 evergreen articles from §9's topic list | Content editor | Large (ongoing) | Medium-High | None | Track organic impressions per article |
| Add unique meta descriptions to tag pages (or noindex thin ones) | SEO | Small | Medium | None | Search Console coverage + manual page review |

### Priority 3: Design, schema, accessibility, and performance

| Task | Owner | Effort | Impact | Dependency | Verification |
|---|---|---|---|---|---|
| Add `Person`/`ProfilePage`/`WebSite` JSON-LD per §7 | Developer | Small | Medium | Confirm no existing duplicate schema first | Google Rich Results Test |
| Run PageSpeed Insights/Lighthouse across key pages | Developer | Small | Medium | None | PageSpeed Insights report |
| Run axe/WAVE accessibility scan + manual keyboard pass | Developer/Designer | Medium | Medium | None | axe/WAVE report, manual test notes |
| Custom visual pass on diagrams/color system to reduce templated-default look | Designer | Medium | Medium | None | Visual review |

---

## 15. Recommended Metrics

| KPI | What it tracks | Where to measure |
|---|---|---|
| Index coverage (submitted vs. indexed URLs) | Whether the sitemap-cleanup work in Priority 0 is working | Google Search Console → Pages report |
| Branded search ranking position for "Soroush Dianaty" | Whether the site outranks the ZoomInfo scrape | Manual search + Search Console Performance report filtered to branded queries |
| Organic impressions (site-wide and per research theme) | Overall visibility growth | Search Console Performance report |
| Search click-through rate | Whether new titles/descriptions (§6) are working | Search Console Performance report |
| Research theme page traffic | Whether IA consolidation (§4) helps or hurts theme-page visibility | Google Analytics (or equivalent) by landing page |
| Project page engagement (time on page, scroll depth) | Whether case-study rebuilds (§5) increase engagement | Analytics |
| Publication page clicks to DOI/PubMed | Whether the site is functioning as a discovery hub for the actual research | Analytics event tracking on outbound links |
| CV download count | Direct conversion signal for recruiters/collaborators | Analytics event tracking |
| Email/collaboration link clicks | Direct conversion signal | Analytics event tracking (mailto click tracking) |
| Core Web Vitals (LCP, INP, CLS) pass rate | Whether the performance test plan (§11) uncovers real issues | Search Console Core Web Vitals report, CrUX |
| Indexed-to-submitted sitemap ratio | Sitemap health over time | Search Console Sitemaps report |
| External profile consistency | Whether the ZoomInfo/entity cleanup (Finding 7) holds | Periodic manual spot-check |

---

## 16. Final Action List

### Five highest-return actions
1. Directly verify `robots.txt` and `sitemap.xml` and fix whatever is suppressing branded-search visibility (Finding 1 and 9).
2. Set up and check Google Search Console for real index-coverage data — this replaces every "confirm in Search Console" caveat in this report with a real number.
3. Rebuild EviTrace and Project Lullaby as full case studies using the §5 structure.
4. Confirm and, if needed, fix the Mermaid diagram rendering on the EviTrace page.
5. Consolidate the navigation to 5–6 primary items and add a dedicated CV/Contact page with a collaboration CTA.

### 30-day action plan
- Week 1: Robots.txt/sitemap audit, Search Console setup, ZoomInfo correction request, live-browser nav and diagram rendering check.
- Week 2: Fix any technical blockers found; add unique tag-page descriptions or noindex thin ones; implement JSON-LD.
- Week 3: Rebuild EviTrace as a full case study; confirm Project Lullaby's page depth and rebuild if thin.
- Week 4: Consolidate navigation to 5–6 items; add CV/Contact page; run PageSpeed/axe scans and log findings for Priority 3.

### 90-day action plan
- Publish 6–8 evergreen articles from the §9 topic list, each cross-linked per the §8 internal-linking model.
- Complete the full accessibility checklist (manual keyboard pass, contrast check, skip-nav link).
- Re-check branded search ranking and index coverage; confirm the site now outranks the ZoomInfo profile.
- Re-run PageSpeed Insights/Core Web Vitals field data (allowing for the 28-day CrUX window) and close out any remaining Priority 3 items.
- Reassess the overall score against this baseline audit.

### Before vs. after vision
**Before:** A technically sound but nearly invisible academic CV site — real research, real publications, real cross-platform consistency, undermined by a branded-search gap that lets a stale third-party scrape represent this researcher to anyone who searches his name, and by project pages that undersell genuinely strong technical work.

**After:** A site that wins its own name in search, leads every visitor to a clear one-sentence understanding of what problem this research solves, showcases EviTrace and Project Lullaby as fully realized case studies a search committee or collaborator can evaluate on their merits, and publishes a steady stream of evergreen clinical-AI-evaluation writing that compounds in search value instead of chasing news cycles.

---

## Confirmed vs. inferred vs. validation-required — summary

- **Confirmed by direct fetch:** homepage/page content and metadata, canonical/www redirect behavior, pagination canonicalization, taxonomy page duplication, entity consistency across ASU/GitHub/ORCID (via ASU profile), absence of evidence for old/duplicate domains, presence of real PubMed/DOI-linked publications, blog content mix.
- **Inferred, needs manual confirmation:** whether the sidebar-style page list is the *only* navigation or supplements a hidden top nav; whether the Mermaid diagram renders correctly in a live browser; visual design quality (color, spacing, mobile layout) beyond what static markup reveals; RTL/`lang` attribute correctness for Persian text.
- **Explicitly not measured (validation tasks, not findings):** Lighthouse/PageSpeed/Core Web Vitals scores, Google Search Console index coverage and branded-query rankings, robots.txt/sitemap.xml contents, accessibility contrast/keyboard-nav testing, backlink profile.
