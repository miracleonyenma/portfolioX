---
title: How to set up Tailwindcss in Nuxt 3
description: Here's how you can set up Tailwindcss 3 in Nuxt 3
tags: [tailwindcss, nuxt3]
createdAt: 2022-12-23T23:00:00.000Z
updatedAt: 2022-12-23T23:00:00.000Z
---

In this snippet post, I'll quickly walk you through how to set up Tailwindcss in your Nuxt 3 application. At the time of writing [v3.2.4](https://github.com/tailwindlabs/tailwindcss/releases/tag/v3.2.4) is the latest version of Tailwind and [v3.0.0](https://github.com/nuxt/framework/releases/tag/v3.0.0) is the current stable version of Nuxt 3.

## Create new Nuxt 3 project

If you don't have a Nuxt 3 project created already, you can create one and navigate to the newly created project by running:

```bash
npx nuxi init my-project

# navigate to newly created project
cd my-project
```

## Install packages

Run the following to install the necessary packages and generate a `tailwind.config.js` file:

```bash
npm install -D tailwindcss postcss autoprefixer

# generate `tailwind.config.js` file
npx tailwindcss init
```

## Configurations

Now we have to make a few configurations.

First, we'll add the `@tailwind` directives to our CSS file, create a new file `./assets/css/main.css` or a css file of choice, if none is created already and enter the following:

```css
/* ./assets/css/main.css */
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Then, in `./nuxt.config.ts`, we'll enter the following to configure `tailwind` and `autoprefixer`as PostCSS plugins:

```typescript
// ./nuxt.config.ts

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
});
```

Next, we'll add the paths of the files that we want tailwind to scan and generate styles for in `./tailwind.config.js`:

```js
/* ./tailwind.config.js */

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

With that, we can start using Tailwindcss styles in our project:

```vue
<!-- ./app.vue -->

<template>
  <h1 class="text-3xl font-bold underline">
    Hello world!
  </h1>
</template>
```



## Resources and further reading

You can view the [installation guide for Nuxt 3 from the Tailwind documentation](https://tailwindcss.com/docs/guides/nuxtjs#3).



Alright. I hope you found this useful! Happy coding!

Thanks for reading ❤
