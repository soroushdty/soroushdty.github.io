# Antigravity Task: Redesign and SEO-Optimize the Personal Website Homepage

## Mission

You are running from the repository root of Soroush Dianaty's personal academic website. Inspect the actual repository, implement the redesign and SEO improvements below, validate the result, and leave the repository in a buildable state.

This is an implementation task, not only an audit. Make the changes that can be safely completed from the repository. Do not invent biographical claims, publications, awards, affiliations, metrics, dates, profile URLs, or research results.

## Known repository context

The repository is expected to use:

- Hugo Extended with the HugoBlox Academic CV theme as a Hugo Module.
- Tailwind CSS v4.
- Pagefind search.
- `pnpm dev` for local development.
- `pnpm build` for the production build and search index.
- `content/_index.md` for the homepage landing-page sections.
- `data/authors/me.yaml` as the main source for biography and profile data.
- `config/_default/` for Hugo, navigation, and theme parameters.
- `assets/media/` for Hugo-processed media.
- `static/` for verbatim files such as the CV.
- `layouts/` for local HugoBlox overrides.

Treat the local repository as the source of truth. Paths and implementation details may have changed. Read `README.md`, `AGENTS.md`, existing audit/specification files, `package.json`, Hugo configuration, and relevant templates before editing. Follow repository-specific rules unless they conflict with this task.

## Safety and scope rules

- Work on the current branch.
- Do not commit, push, force-reset, or rewrite Git history.
- Do not modify unrelated pages or data unless required for shared layout, SEO, accessibility, or index cleanup.
- Do not hand-edit generated output such as `public/` unless the repository explicitly tracks it as source.
- Prefer configuration, content, reusable partials, and local theme overrides over editing vendored or module-managed theme code.
- Preserve all verified factual content.
- Use only repository-owned images and assets. Do not download third-party images.
- Avoid adding large dependencies for a small task.
- Preserve both light and dark themes.
- Keep desktop navigation visible at desktop widths. The current desktop screenshot already has a full horizontal navigation bar; do not replace it with a hamburger menu on wide screens.
- Keep the mobile navigation behavior intact unless a defect is found.

## Current desktop problem to solve

At approximately 1600 x 900, the homepage hero renders as a narrow, mobile-like card centered in a very large empty canvas. The hero is roughly 480 px wide, the portrait is small, the text column wraps excessively, and the lower buttons are near or below the viewport edge. The header navigation is already acceptable and visible. The primary redesign priority is therefore the desktop content layout, not the navigation model.

The resulting homepage should look intentionally designed for large desktop screens while remaining strong on tablets, phones, and vertical monitors.

---

# Phase 0: Baseline inspection

- [x] Run `git status --short` and preserve all pre-existing user changes.
- [x] Read the repository documentation and current homepage source.
- [x] Identify the exact template, partial, content block, and stylesheet responsible for the homepage hero and landing-page section width.
- [x] Inspect current title, meta description, canonical URL, Open Graph tags, Twitter card tags, JSON-LD, sitemap, robots directives, taxonomies, and image markup in the generated site.
- [x] Run the existing install/build workflow before changes. Use the lockfile and documented package manager.
- [x] Record baseline build errors separately from errors introduced by this task.
- [x] If browser automation is available, capture baseline screenshots at 375 x 812, 768 x 1024, 1024 x 768, 1440 x 900, and 1600 x 900.
- [x] Inventory indexable content for placeholder, demo, theme-example, empty taxonomy, duplicate, stale-domain, and thin archive pages.

stop after the audit AND ASK claryfiyong questions before Continue into implementation.

---

# Phase 1: Rebuild the hero for desktop and responsive layouts

## 1.1 Container and geometry

- [x] Replace the narrow centered desktop card with a responsive hero container that uses the available width.
- [x] Target a content width of approximately 1050-1200 px on 1440-1600 px screens, with safe side gutters.
- [x] Use a two-column layout at large breakpoints: portrait/profile visual on the left and text/actions on the right.
- [x] Keep the content as a single stacked column on small screens.
- [x] Avoid fixed heights. Let content determine height.
- [x] Reduce excess whitespace above the hero. The hero should begin approximately 48-72 px below the fixed header on desktop unless the existing header geometry requires another value.
- [x] Keep the entire hero, including all primary buttons, visible without clipping at 1600 x 900 and 1440 x 900.
- [x] Aim for a desktop hero height no greater than about 560-620 px.
- [x] At 1600 x 900, the next section should be visible or clearly indicated near the fold.
- [x] Retain a restrained card or panel treatment only if it supports the design. Do not let it resemble a narrow mobile app panel on desktop.

Suggested layout behavior, adapted to the actual Tailwind configuration:

- Full-width section with `w-full` and responsive horizontal padding.
- Inner container around `max-w-6xl` or `max-w-7xl`.
- Desktop grid or flex layout with a portrait region around 260-320 px and a flexible content column.
- Main text column constrained to a readable maximum width of roughly 60-70 characters.

## 1.2 Portrait

- [x] Increase the portrait size on large screens to approximately 220-280 px while preserving a smaller mobile size.
- [x] Align it vertically with the headline and core identity content instead of placing it beside the lower paragraph only.
- [x] Preserve correct aspect ratio and object positioning.
- [x] Use a factual alt attribute such as `Portrait of Soroush Dianaty, M.D.`.
- [x] Add explicit intrinsic dimensions or Hugo-generated dimensions to prevent layout shift.
- [x] Use the Hugo image pipeline and responsive variants when feasible.
- [x] Because the portrait is above the fold and may be the LCP image, do not lazy-load it. Use appropriate eager loading and `fetchpriority="high"` only if output inspection confirms it is beneficial.

## 1.3 Hero copy and semantic hierarchy

Replace the generic welcome-first hierarchy with a specialty-first identity. Preserve the Persian name as secondary identity text, with proper `lang` and `dir` attributes.

Use one semantic H1 on the homepage. The visible H1 should communicate both identity and specialty. Implement a visually attractive line break if useful, but keep the accessible text coherent.

Preferred H1 concept:

> Soroush Dianaty, M.D. - Biomedical Informatics Researcher Building Trustworthy Clinical AI

Preferred supporting copy, with minor edits allowed only to fit verified repository facts:

> Physician-scientist and Biomedical Informatics PhD researcher at Arizona State University developing evaluation frameworks for trustworthy clinical large language models, including hallucination detection, evidence grounding, and FHIR-based data segmentation.

- [x] Remove `Welcome to the Personal Website of` from the primary heading.
- [x] Keep `Soroush Dianaty, M.D.` visually dominant.
- [x] Keep the Persian name visible but lower in hierarchy.
- [x] Consolidate the separate PhD badge, program, and affiliation into a clean metadata row or compact group.
- [x] Avoid repeating the same keywords unnaturally.
- [x] Ensure there is exactly one H1 in generated homepage HTML.

## 1.4 Calls to action

Use a clear action hierarchy:

1. Primary: `Explore Research` linking to the homepage research section or the strongest existing research/projects page.
2. Secondary: `View Publications` linking to the canonical publications page.
3. Tertiary: `Download CV` linking to the existing CV.

- [x] Keep all actions visible in one row on large screens when space allows.
- [x] Wrap cleanly on medium screens and stack or wrap predictably on phones.
- [x] Use one visually dominant button, not three competing buttons.
- [x] Use descriptive accessible names and visible focus states.
- [x] For the CV, preserve sensible target/rel behavior and make the action explicit.

## 1.5 Header refinement without redesigning navigation

- [x] Retain the existing desktop navigation links and horizontal layout.
- [x] Do not hide desktop navigation simply to create more whitespace.
- [x] Check widths around 1024-1280 px for crowding.
- [x] If the long brand label causes crowding, shorten only the visible brand to `Soroush Dianaty, M.D.` while retaining the full specialty in metadata and homepage copy.
- [x] Keep search and theme controls accessible.
- [x] Preserve mobile hamburger behavior.

---

# Phase 2: Improve homepage content architecture

## 2.1 Remove duplicated biography copy

The current `My Research` paragraph substantially repeats the hero. Replace it with a concise research-focus section that adds structure rather than repetition.

- [x] Rename the section to `Research Focus`.
- [x] Remove decorative emoji from formal section headings. Use no icon or a restrained existing SVG/icon system.
- [x] Add a one- or two-sentence introduction that does not duplicate the hero.
- [x] Present three research pillars as responsive cards or compact feature blocks.

Use these verified-topic labels and adapt descriptions to existing content:

### Trustworthy Clinical LLMs

Evaluation frameworks for hallucination, reliability, calibration, and clinically meaningful performance.

### Evidence Grounding

Methods for determining whether generated clinical claims are supported by appropriate biomedical evidence.

### Interoperable Health Data

FHIR-oriented data representation, granular segmentation, and deployment-focused clinical AI infrastructure.

- [x] Link each pillar to an existing relevant project, publication, tag, or research page when a meaningful destination exists.
- [x] Do not add dead links or create thin pages only to satisfy the card links.

## 2.2 Lead with evidence of work

- [x] Place tangible research output near the top of the page after the hero and research-focus content.
- [x] Reuse existing `Featured Publications`, featured projects, or recent work rather than creating unsupported claims.
- [x] Ensure each featured item includes a descriptive title, one concise contribution or context line when the source supports it, venue/year metadata, and a clear link.
- [x] Add a `View all publications` action to the featured-publications area if absent.
- [x] Do not display the same publication twice in adjacent homepage sections.

## 2.3 Section order

Use this preferred order when compatible with available content:

1. Hero
2. Research Focus
3. Featured Publications or Featured Work
4. Selected/Current Projects
5. Recent Publications
6. Talks or Events
7. Award Spotlight
8. Recent News or Writing
9. Contact/profile links or footer

- [x] Move the award block lower than core research evidence unless repository content strongly justifies another order.
- [x] Keep the homepage concise. Prefer a curated preview plus `View all` links over long unbounded lists.
- [x] Remove empty sections automatically or configure them not to render when no items exist.

## 2.4 Academic identity links

- [x] Surface verified academic/profile links in the hero, a compact identity strip, or footer: ASU profile, Google Scholar, ORCID, GitHub, LinkedIn, and PubMed only where verified.
- [x] Use the existing author data source rather than duplicating URLs in multiple templates.
- [x] Use consistent naming everywhere: `Soroush Dianaty, M.D.` unless an external platform requires another style.

---

# Phase 3: Refine the visual system

## 3.1 Color and emphasis

- [x] Keep one primary accent, preferably the existing blue, and one supporting accent, preferably teal/cyan.
- [x] Reserve green mainly for status or compact metadata rather than major headings and links.
- [x] Reduce competition among blue, cyan, green, gray, and multiple button fills.
- [x] Verify accessible contrast in both themes.

## 3.2 Typography

- [x] Establish a clear type scale for H1, section headings, card titles, metadata, and body text.
- [x] Use responsive sizing rather than oversized desktop text that causes awkward wrapping.
- [x] Target body text around 17-19 px where the theme supports it.
- [x] Keep long prose to approximately 55-70 characters per line.
- [x] Use consistent font weights. Avoid bolding many phrases in the same paragraph.

## 3.3 Spacing, cards, and interaction

- [x] Use a consistent spacing scale across the homepage.
- [x] Reduce excessive section gaps while preserving clear section boundaries.
- [x] Use consistent border radius, border opacity, shadow, and card padding.
- [x] Prefer subtle background shifts and spacing over putting every section in a large rounded card.
- [x] Keep hover effects restrained and limited to interactive elements.
- [x] Respect `prefers-reduced-motion`.
- [x] Ensure touch targets are at least approximately 44 x 44 px.

---

# Phase 4: On-page and technical SEO

## 4.1 Homepage title and description

Configure a unique homepage title equivalent to:

> Soroush Dianaty, M.D. | Clinical AI & Biomedical Informatics

Configure a homepage meta description equivalent to:

> Soroush Dianaty, M.D., is a Biomedical Informatics PhD researcher at Arizona State University studying trustworthy clinical LLMs, hallucination detection, evidence grounding, and FHIR-based health data systems.

- [x] Use the repository's Hugo/HugoBlox metadata system instead of hardcoding duplicate head tags.
- [x] Keep the title concise and avoid keyword stuffing.
- [x] Verify the generated title and description in production HTML.

## 4.2 Canonical and social metadata

- [x] Ensure the homepage has one self-referencing canonical URL using `https://soroushdianaty.com/`.
- [x] Audit `baseURL`, CNAME, old-domain references, and absolute URLs for consistency.
- [x] Add or verify Open Graph title, description, URL, type, image, image dimensions, and image alt text.
- [x] Add or verify `twitter:card` with a large-image card when supported.
- [x] Use a repository-owned 1200 x 630 social image. Create one from existing assets only if the current toolchain supports reproducible generation without a large new dependency. Otherwise use the best existing high-resolution owned image and document the remaining manual asset task.

## 4.3 Structured data

- [x] Inspect existing HugoBlox JSON-LD before adding anything.
- [x] Ensure the homepage emits valid `ProfilePage` and `Person` structured data, or an equivalent valid graph, without duplicate conflicting Person entities.
- [x] Include only verified values from repository data.
- [x] Include name, preferred credential formatting, URL, image, job title/description, ASU affiliation, research topics, and verified `sameAs` links.
- [x] Do not add unverified `alumniOf`, awards, identifiers, or profiles.
- [x] Verify publication/article pages emit appropriate `ScholarlyArticle`, `Article`, or `BlogPosting` data only where supported and accurate.
- [x] Validate generated JSON syntax and schema shape locally when possible.

## 4.4 Crawlability, internal links, and index hygiene

- [x] Ensure all important internal links are normal crawlable anchor elements with descriptive text.
- [x] Add logical links from the homepage to research, projects, publications, writing/news, biography, and CV.
- [x] Audit the content tree for old HugoBlox demo/tutorial pages, placeholder content, empty taxonomy pages, duplicate archives, and stale-domain pages.
- [x] Remove demo content from `content/` or set it to draft/noindex when it must remain available.
- [x] Keep drafts outside the generated content tree where the repository convention already supports that.
- [x] Do not redirect unrelated old URLs to the homepage.
- [x] For removed URLs, use only redirects supported by the actual hosting platform. Do not pretend a client-side redirect is a server-side 301.
- [x] If GitHub Pages cannot provide the desired server response, remove the page from sitemap/internal links, allow a correct 404, and document any Search Console removal or DNS/edge redirect action that requires manual work.
- [x] Disable, noindex, or avoid rendering empty taxonomy/list pages when practical.
- [x] Verify `robots.txt` does not block important content.
- [x] Verify the sitemap contains canonical, indexable URLs only.

## 4.5 Research information architecture

- [x] Audit whether the site has enough original material for dedicated research-topic pages.
- [x] Preferred topic paths are:
  - `/research/trustworthy-clinical-llms/`
  - `/research/hallucination-detection/`
  - `/research/evidence-grounding/`
  - `/research/fhir-health-data/`
- [x] Create these pages only when the repository contains enough verified, non-duplicative material to make each page useful.
- [x] Each created page must have a unique title, one H1, an explanation of the topic, Soroush's verified contribution, related publications/projects, and meaningful internal links.
- [x] Do not create thin keyword pages. If content is insufficient, create or improve one consolidated `/research/` page and link the homepage pillars to anchored sections there.

---

# Phase 5: Performance and accessibility

## 5.1 Images and Core Web Vitals

- [x] Convert or process the hero portrait into efficient WebP/AVIF variants when supported by Hugo.
- [x] Use `srcset` and `sizes` appropriate to the responsive layout.
- [x] Set intrinsic image dimensions.
- [x] Lazy-load below-the-fold images, not the likely LCP image.
- [x] Avoid loading unused large images on the homepage.
- [x] Check font loading and remove unnecessary weights or icon payloads where safe.
- [x] Defer noncritical scripts and avoid adding JavaScript for effects achievable with CSS.
- [x] Preserve Pagefind and existing theme behavior.

Performance targets for a representative mobile and desktop run:

- LCP at or below 2.5 seconds.
- INP at or below 200 ms where measurable.
- CLS at or below 0.1.
- Lighthouse Performance, Accessibility, Best Practices, and SEO scores of at least 90 when the local environment permits reliable measurement.

Treat these as validation targets, not reasons to falsify measurements.

## 5.2 Semantic HTML and accessibility

- [x] Use semantic `header`, `nav`, `main`, `section`, and `footer` landmarks.
- [x] Preserve or add a functional skip-to-content link.
- [x] Maintain logical heading order.
- [x] Ensure visible keyboard focus for navigation, buttons, cards, and controls.
- [x] Verify navigation and theme controls have accessible names.
- [x] Do not use color alone to communicate meaning.
- [x] Verify text and interactive contrast against WCAG AA.
- [x] Ensure Persian name markup has correct language and direction.
- [x] Test at 200 percent browser zoom for clipping and horizontal scrolling.

---

# Phase 6: Validation and acceptance criteria

## 6.1 Build and automated checks

- [x] Run the documented production build, expected to be `pnpm build`.
- [x] Run any existing lint, formatting, link, HTML, or test commands.
- [x] Do not introduce new build warnings that can reasonably be fixed.
- [x] Confirm Pagefind generation still succeeds.
- [x] Search generated homepage HTML for exactly one H1, one canonical, one meta description, and non-conflicting JSON-LD.
- [x] Check internal homepage links and referenced assets for 404s.
- [x] Confirm the CV link works.
- [x] Confirm no placeholder tokens such as `YOUR_...`, `TODO`, or fake profile URLs were introduced.

## 6.2 Responsive visual checks

Test at minimum:

- 375 x 812 phone.
- 768 x 1024 tablet/vertical screen.
- 1024 x 768 compact desktop/tablet landscape.
- 1440 x 900 desktop.
- 1600 x 900 wide desktop.

Acceptance criteria:

- [x] At 1440-1600 px, the hero is broad and balanced rather than a 480 px mobile-like card.
- [x] Portrait and text form a deliberate two-column composition.
- [x] Hero buttons are visible without clipping.
- [x] No horizontal overflow occurs at any tested width.
- [x] Desktop navigation remains visible and usable.
- [x] Mobile layout stacks cleanly with sensible order and spacing.
- [x] Light and dark themes both look intentional.
- [x] Research copy is not repeated verbatim across adjacent sections.
- [x] Featured work appears early enough to establish credibility.
- [x] Headings no longer rely on decorative emoji.

## 6.3 Final response

After implementation, provide a concise final report containing:

1. Summary of the visual changes.
2. Summary of SEO and structured-data changes.
3. Files changed.
4. Commands run and their results.
5. Responsive sizes tested.
6. Any existing errors that were not caused by this task.
7. Any manual follow-up that cannot be completed from code, such as DNS redirects, Search Console removals, or a manually designed social image.

Do not claim a Lighthouse score, schema validation result, browser result, or redirect status unless it was actually tested.

## Definition of done

The task is complete only when the homepage uses the wide desktop canvas effectively, has a concise specialty-first hero, removes duplicated research copy, presents verified research output early, retains strong responsive behavior, emits correct SEO metadata, passes the repository build, and has no known regressions in navigation, search, light/dark themes, or accessibility.
