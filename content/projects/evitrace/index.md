---
title: EviTrace
date: 2026-01-01
summary: Automated, evidence-grounded attribute extraction from scientific PDFs, with auditable provenance for every extracted field.
tags:
  - Evidence Grounding
  - LLM Evaluation
  - Research Tooling
links:
  - type: code
    url: https://github.com/soroushdty/EviTrace
---

EviTrace is a research pipeline for extracting structured attributes from scientific PDFs while keeping
every extracted value traceable back to the evidence that produced it.

<!--more-->

- **Multi-backend PDF extraction** — GROBID, pdfplumber, PyMuPDF, and PaddleOCR, so the pipeline degrades
  gracefully across born-digital and scanned documents.
- **Four-stage quality control** — rater, inter-annotator agreement, adjudicator, and reconciler stages,
  rather than trusting a single model pass.
- **LLM-powered field extraction** with confidence scoring and evidence attribution on every field.
- **Auditable output** — JSON results plus a W3C JSON-LD annotation layer.

Written in Python and released under GPL-3.0.
