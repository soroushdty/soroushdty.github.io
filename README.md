# Personal website of Dr. Soroush Dianaty.

## 🌟 Architecture & Features

- **M.D. Education & Thesis Portfolio:** Dedicated page at [`/education/md/`](https://soroushdianaty.com/education/md/) detailing clinical rotations, medical degree, and apheresis cost-effectiveness thesis.
- **Dedicated Portfolio Sections:** Standalone deep-dive pages for [Family Physician Service](https://soroushdianaty.com/experience/family-physician/), [USERN Executive Committee](https://soroushdianaty.com/experience/usern/), and [Neuroscience Research Assistantship](https://soroushdianaty.com/experience/neuroscience-research-assistant/).
- **Open-Source Tools:** Featured research repos including **[EviTrace](https://soroushdianaty.com/projects/evitrace/)** (interactive clinical LLM evidence pipeline visualizer & JSON-LD schema) and **[project-lullaby](https://soroushdianaty.com/projects/project-lullaby/)**.
- **Teaching Portfolio:** Detailed course outlines for **BMI 201** and **BMI 601** at [`/teaching/`](https://soroushdianaty.com/teaching/).
- **Academic SEO:** Highwire Press metadata tags (`citation_title`, `citation_author`, `citation_journal_title`), Dublin Core, OpenGraph social sharing card (`sharing_card.png`), and custom Health AI emblem tab bar icon.

---

## 🛠️ Stack & Dependencies

- **Generator:** [Hugo Extended 0.164.0](https://gohugo.io)
- **Theme Framework:** [HugoBlox Kit 0.12.0](https://github.com/HugoBlox/kit) (Academic CV module)
- **Styling:** Tailwind CSS v4
- **Search Indexing:** [Pagefind](https://pagefind.app)
- **Package Manager:** `pnpm` 10 (`node-linker=hoisted`)

---

## 🚀 Local Development

```bash
pnpm install     # Install node dependencies
pnpm dev         # Start local Hugo server with live reload -> http://localhost:1313
pnpm build       # Production build + pagefind search index into public/
pnpm pagefind    # Regenerate search index only
```

---

## 📦 Repository Layout

| Directory / File | Description |
|---|---|
| `content/` | Site content pages: homepage (`_index.md`), `bio`, `education/md`, `experience/`, `projects/`, `publications/`, `blog/`, `teaching/`, `events/` |
| `data/authors/me.yaml` | Single source of truth for bio, avatar, education, experience, skills, awards, and social links |
| `publications.bib` | BibTeX source of truth for publications; triggers automated GitHub Actions import workflow |
| `config/_default/` | Site configuration (`hugo.yaml`), theme parameters (`params.yaml`), navigation (`menus.yaml`), modules |
| `layouts/` | Local theme partials and shortcode overrides |
| `assets/media/` | Processed graphics, custom icons (`icons/custom/logo.png`), and social preview card (`sharing_card.png`) |
| `static/` | Static assets served verbatim (`CNAME`, `.nojekyll`, `favicon.ico`, `uploads/cv.pdf`, `uploads/papers/`) |
| `drafts/` | Work-in-progress content outside `content/` to prevent unwanted publishing |

---

## 🚢 Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml` which builds the Hugo site with Pagefind and publishes to GitHub Pages (`build_type: workflow`) mapped to custom domain `soroushdianaty.com`.

---

## 📄 License

Site content © Dr. Soroush Dianaty | Theme template released under the [MIT License](LICENSE.md); HugoBlox is a trademark of Lore Labs.
