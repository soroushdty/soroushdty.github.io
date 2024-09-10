---
title: Blog
summary: My writings
type: landing

cascade:
  - _target:
      kind: page
    params:
      show_breadcrumb: true

sections:
  - block: collection
    id: blog
    content:
      title: blog
      filters:
        folders:
          - blog
    design:
      view: showcase
      columns: '1'
      flip_alt_rows: true
---
