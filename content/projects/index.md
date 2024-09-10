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
          - projects/ongoing
    design:
      # Choose how many columns the section has. Valid values: '1' or '2'.
      columns: '1'
      # Choose your content listing view 
      view: card

  - block: collection
    id: section-1
    content:
      title: Finished Projects
      text: You can see a list of my finished projects, including those leading to publication in peer-reviewed journals, in this section.
      # Display content from the `content/post/` folder
      filters:
        folders:
          - projects/finished
    design:
      # Choose how many columns the section has. Valid values: '1' or '2'.
      columns: '1'
      # Choose your content listing view 
      view: card
---
