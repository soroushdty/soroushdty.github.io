---
title: 'Projects'
date: 2024-05-19
type: landing

design:
  # Section spacing
  spacing: '5rem'

# Page sections
sections:
  - block: collection
    content:
      title: Ongoing Projects
      text: At any given time, I am working on several personal and work-related projects.
            My main tool for project management is combining Kanban scheduling system with Obsdian Personal Information Management (PIM) to create a free automation system for my tasks.
            You can read more about my task management system ([here]({{< relref "/blog/system" >}})), including how to set it up for yourself.
      filters:
        folders:
          - project
    design:
      view: article-grid
      fill_image: false
      columns: '3'

  - block: collection
content:
  title: Finished Projects
  text: You can see a list of my finished projects, including those leading to publication in peer-reviewed journals, in this section.
  filters:
    folders:
      - project
design:
  view: article-grid
  fill_image: false
  columns: 3
---
