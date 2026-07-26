---
title: ""
summary: "Physician-Scientist & PhD Student in Biomedical Informatics & Data Science at Arizona State University."
date: "2026-07-26"
type: "landing"
sections:
  - block: "markdown"
    content:
      title: ""
      subtitle: ""
      text: |
        <div class="py-8 sm:py-12 bg-gradient-to-r from-primary-500/10 via-transparent to-secondary-500/10 rounded-3xl px-6 sm:px-10 my-4 border border-gray-200/60 dark:border-gray-800">
          <div class="flex flex-col md:flex-row items-center gap-8">
            <div class="flex-shrink-0">
              <img class="w-36 h-36 sm:w-44 sm:h-44 rounded-full object-cover shadow-xl ring-4 ring-primary-500/20" src="/media/authors/me.jpg" alt="Dr. Soroush Dianaty, M.D.">
            </div>
            <div class="flex-1 text-center md:text-left">
              <h1 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white tracking-tight mb-3">
                Welcome to the Personal Website of <span class="text-primary-600 dark:text-primary-400 font-extrabold">Soroush Dianaty, M.D.</span> <span dir="rtl" lang="fa" class="text-xl sm:text-2xl text-gray-500 dark:text-gray-400 font-normal ml-2 inline-block" title="سروش دیانتی">(سروش دیانتی)</span>
              </h1>
              <div class="flex flex-wrap items-center justify-center md:justify-start gap-2 text-base sm:text-lg mb-5">
                <span class="inline-flex items-center px-3 py-0.5 rounded-md text-sm font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                  PhD Student
                </span>
                <span class="text-gray-800 dark:text-gray-100 font-semibold">Biomedical Informatics &amp; Data Science</span>
                <span class="text-gray-400 dark:text-gray-500">·</span>
                <span class="text-secondary-600 dark:text-secondary-400 font-bold">Arizona State University</span>
              </div>
              <p class="text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                Physician-scientist specializing in evaluation frameworks for <strong>trustworthy clinical LLMs</strong>. Research focuses on translating academic findings into deployable AI systems, with emphasis on automated hallucination detection, evidence grounding, and FHIR granular data segmentation.
              </p>
              <div class="flex flex-wrap justify-center md:justify-start gap-3">
                <a href="/bio/" class="inline-flex items-center px-5 py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-semibold text-sm rounded-xl shadow-sm transition-all duration-200">
                  About Me →
                </a>
                <a href="/publications" class="inline-flex items-center px-5 py-2.5 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 font-semibold text-sm rounded-xl border border-gray-200 dark:border-gray-700 transition-all duration-200">
                  View Publications
                </a>
                <a href="/uploads/cv.pdf" target="_blank" rel="noopener" class="inline-flex items-center px-5 py-2.5 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 font-semibold text-sm rounded-xl border border-gray-200 dark:border-gray-700 transition-all duration-200">
                  Download CV
                </a>
              </div>
            </div>
          </div>
        </div>
    design:
      columns: "1"
    ce: "section-hero"
    id: "hero"
  - block: "markdown"
    content:
      title: "📚 My Research"
      subtitle: ""
      text: "Physician-scientist and PhD researcher in Biomedical Informatics at Arizona State University, specializing in evaluation frameworks for trustworthy clinical LLMs. Research focuses on translating academic findings into clinically deployable AI systems, with emphasis on hallucination detection, evidence grounding, and responsible AI evaluation. Brings frontline clinical experience and ML research training to bridge the gap between what health AI can do and what clinicians and patients can safely trust."
    design:
      columns: "1"
    ce: "section-8494a2bc"
    As: "section-6d79884b"
  - block: "markdown"
    content:
      title: "🏆 Award Spotlight"
      subtitle: ""
      text: "🏆 **First Place ($2,500) — Nucleate Arizona BioChallenge (Oct 2025):** Recognized for innovative biotech and digital health translation, advancing evidence-grounded computational methods from academic research toward real-world healthcare application."
    design:
      columns: "1"
    ce: "section-awards"
    id: "awards-spotlight"
    As: "section-awards-spotlight"
  - block: "collection"
    content:
      title: "Featured Publications"
      filters:
        folders:
          - "publications"
        featured_only: true
    design:
      view: "article-grid"
      columns: 2
    ce: "section-papers"
    id: "papers"
    As: "section-b90d36b8"
  - block: "collection"
    content:
      title: "Recent Publications"
      text: ""
      filters:
        folders:
          - "publications"
        exclude_featured: false
    design:
      view: "citation"
    ce: "section-3f0f14a7"
    As: "section-d4bf9149"
  - block: "collection"
    content:
      title: "Recent & Upcoming Talks"
      filters:
        folders:
          - "events"
    design:
      view: "card"
    ce: "section-talks"
    id: "talks"
    As: "section-dde4e7bb"
  - block: "collection"
    content:
      title: "Recent News"
      subtitle: ""
      text: ""
      page_type: "blog"
      count: 10
      filters:
        author: ""
        category: ""
        tag: ""
        exclude_featured: false
        exclude_future: false
        exclude_past: false
        publication_type: ""
      offset: 0
      order: "desc"
    design:
      view: "card"
      columns: 1
      spacing:
        padding:
          - 0
          - 0
          - 0
          - 0
    ce: "section-news"
    id: "news"
    As: "section-1aa532e2"
---
