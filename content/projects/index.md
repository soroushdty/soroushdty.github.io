---
title: 'Projects'
date: 2024-05-19
type: landing

design:
  # Section spacing
  spacing: '5rem'

# Page sections

sections:
  # A section to display blog posts
  - block: collection
    id: section-1
    content:
      title: Ongoing Projects
      text: At any given time, I am working on several personal and work-related projects.
            My main tool for project management is combining Kanban scheduling system with Obsdian Personal Information Management (PIM) to create a free automation system for my tasks.
            You can read more about my task management system <a href="https://drdianaty.com/blog/system/">here</a>, including how to set it up for yourself.
      # Display content from the `content/post/` folder
      filters:
        folders:
          - projects
    design:
      view: card
      columns: '1'
---
