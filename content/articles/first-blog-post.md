---
title: My First Blog Post
description: Learning how to create my blog using nuxt, the nuxt content module and tailwindcss
tags: [dummy, tests]
createdAt: 9-14-2022
updatedAt: 12-27-2022
---

Hey there! 👋🏾
This is my first blog post learning nuxt content.

I'm currently building it using the following:

- Nuxt.js
- Nuxt Content module
- Tailwindcss
  - Tailwindcss typography

## Nuxt.js

Nuxt is based on a powerful modular architecture. You can choose from more than 50 modules to make your development faster and easier. You don't have to reinvent the wheel to get PWA benefits, add Google Analytics to your page or generate a sitemap.

## Nuxt content module

Empower your NuxtJS application with @nuxt/content module: write in a content/ directory and fetch your Markdown, JSON, YAML, XML and CSV files through a MongoDB like API, acting as a Git-based Headless CMS.

## Tailwindcss

Rapidly build modern websites without ever leaving your HTML. A utility-first CSS framework packed with classes like `flex`, `pt-4`, `text-center` and `rotate-90` that can be composed to build any design, directly in your markup.

### Tailwindcss Typography

A plugin that provides a set of prose classes you can use to add beautiful typographic defaults to any vanilla HTML you don't control (like HTML rendered from Markdown, or pulled from a CMS).

<!-- HTML in markdown
    Info box with svg icon
 -->
<!-- <info-box>
    <template #info-box>
        Here we have important information we would love to share with you!
    </template>
</info-box> -->

::info-box{type="info"}
 Here we have important information we would love to share with you!
::

> Sweet huh?
