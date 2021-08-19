---
title: Creating a blog using Nuxt and Nuxt Content - with TailwindCSS
description: In this tutorial you'll learn how to create a personal blog using a Git-based CMS - Nuxt Content
tags: [Nuxt, Nuxt Content, Vue, TailwindCSS]
---

## What we're going to be building

We will be building a simple blog site using [Nuxt](https://nuxtjs.org/) which is a framework popularly used for server side rendering and Static Site Generation with Vue.

We'll also be using [Nuxt Content](https://content.nuxtjs.org/) which is a module which acts as a **Git-based Headless CMS** that fetches your Markdown, JSON, YAML, XML and CSV files through a MongoDB like API. It has powerful features that allow you to write blogs, documentations and more.

## Prerequisites

Before we dive right in, you should have:

- A basic understanding of HTML, CSS & JS, Vue and the [Markdown syntax](https://www.markdownguide.org/basic-syntax/)
- [Node](https://nodejs.org/en/) installed
- A text editor, we recommend VS Code with the Vetur extension or WebStorm
- A terminal, I recommend using VS Code's integrated terminal

## Getting Started

Let's install everything we need for the project.

### Install nuxt using create-nuxt-app

To get started quickly you can use the create-nuxt-app.

Make sure you have npx installed (npx is shipped by default since npm 5.2.0) or npm v6.1 or yarn.

```bash
npx create-nuxt-app <project-name>
```

Choose _Content - Git-based Headless CMS_ option from Nuxt.js modules

<img-cont src="Creating-a-blog-using-Nuxt-and-Nuxt-Content---with-TailwindCSS/blog-with-nuxt-content-create-nuxt-app-install-content-Annotation 2021-07-11 014841.png" alt="create-nuxt-app installation options"></img-cont>

Proceed to select other options, here's my preset:

<!-- ![blog-with-nuxt-content-create-nuxt-app-installation-Annotation 2021-07-11 015118.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1625966762066/IvOhoXl96.png) -->

<img-cont src="Creating-a-blog-using-Nuxt-and-Nuxt-Content---with-TailwindCSS/blog-with-nuxt-content-create-nuxt-app-installation-Annotation 2021-07-11 015118.png" alt="create-nuxt-app-installation"></img-cont>

Installation complete! 🎉

<!-- ![blog-with-nuxt-content-create-nuxt-app-installation-complete-Annotation 2021-07-11 021302.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1625966789225/4LY2jIog5.png) -->

<img-cont src="Creating-a-blog-using-Nuxt-and-Nuxt-Content---with-TailwindCSS/blog-with-nuxt-content-create-nuxt-app-installation-complete-Annotation 2021-07-11 021302.png" alt="Nuxt app installation complete"></img-cont>

### Install nuxt content separately

**If you already have Nuxt setup before now, you can install the content module by running the command**

```bash
#install nuxt content

npm install @nuxt/content
```

Then we can add it to our modules property inside our nuxt.config file.

```js
//nuxt.config.js
export default {
  modules: ['@nuxt/content'],
}
```

### Install Tailwind and Tailwindcss typography via npm

Tailwindcss is a utility first css framework that provides us with custom classes we can use to style our app.

Tailwindcss Typography is "A plugin that provides a set of `prose` classes you can use to add beautiful typographic defaults to any vanilla HTML you don't control (like HTML rendered from Markdown, or pulled from a CMS)."

Install @nuxtjs/tailwindcss which is a nuxt module for tailwind integration as well as Tailwind and its peer-dependencies using npm:

```bash
npm install -D @nuxtjs/tailwindcss tailwindcss@latest postcss@latest autoprefixer@latest
```

Add the @nuxtjs/tailwindcss module to the buildModules section of your nuxt.config.js file:

```js
// nuxt.config.js
export default {
  buildModules: ['@nuxtjs/tailwindcss'],
}
```

### Create your configuration file

Next, generate your tailwind.config.js file:

```bash
npx tailwindcss init
```

This will create a minimal tailwind.config.js file at the root of your project:

```js
//tailwind.config.js
module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
```

Create a `tailwind.css` file in `assets/css.tailwind.css` use the `@tailwind` directive to inject Tailwind’s base, components, and utilities styles:

```css
/*assets/css/tailwind.css*/
@tailwind base;
@tailwind components;
@tailwind utilities;
```

You can import the css file into your components or make it accessible globally by defining the CSS files/modules/libraries you want to set globally _(included in every page)._

```js
  /* nuxt.config.js*/
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    // CSS file in the project
    '@/assets/css/tailwind.css',
  ],

```

### Install Tailwind typography

```bash
# Using npm
npm install @tailwindcss/typography
```

Then add the plugin to your tailwind.config.js file:

```js
// tailwind.config.js
module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/typography')],
}
```

### Configure Tailwind to remove unused styles in production

In your tailwind.config.js file, configure the purge option with the paths to all of your pages and components so Tailwind can tree-shake unused styles in production builds:

```js
// tailwind.config.js
module.exports = {
  purge: [
    './components/**/*.{vue,js}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/typography')],
}
```

Now run

```bash
npm run dev
```

### Quick note

While going through these steps, I ran into an **issue of mismatched packages** while trying to run `npm run dev`

<!-- ![blog-with-nuxt-content-version-mismatch-error-Annotation 2021-07-11 031752.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1625975242485/YCqCkt50g.png) -->

<img-cont src="Creating-a-blog-using-Nuxt-and-Nuxt-Content---with-TailwindCSS/blog-with-nuxt-content-version-mismatch-error-Annotation 2021-07-11 031752.png" alt="Vue version mismatch error"></img-cont>

**Here's how I fixed it:**

update the mismatched package(s), which in my case was the `vue-server-renderer`

```bash
npm i vue-server-renderer@latest --save
```

<!-- ![blog-with-nuxt-content-update-vue-renderer-version-Annotation 2021-07-11 032705.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1625975276642/JYoReAgk2.png) -->

<img-cont src="Creating-a-blog-using-Nuxt-and-Nuxt-Content---with-TailwindCSS/blog-with-nuxt-content-update-vue-renderer-version-Annotation 2021-07-11 032705.png" alt="Update vue-renderer-version"></img-cont>

That fixed it for me, when I ran `npm run dev`

<!-- ![blog-with-nuxt-content-run-dev-succesfull-Annotation 2021-07-11 032953.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1625975289781/wtKSJLTIf.png) -->

<img-cont src="Creating-a-blog-using-Nuxt-and-Nuxt-Content---with-TailwindCSS/blog-with-nuxt-content-run-dev-succesfull-Annotation 2021-07-11 032953.png" alt="`run dev` succesfull"></img-cont>

<!-- ![blog-with-nuxt-content-site-preview-Annotation 2021-07-11 032953.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1625975335704/mi9b73FR9.png) -->

<img-cont src="Creating-a-blog-using-Nuxt-and-Nuxt-Content---with-TailwindCSS/blog-with-nuxt-content-site-preview-Annotation 2021-07-11 032953.png" alt="Initial site preview"></img-cont>

_Sweet! 🎉, now we can move into the interesting stuff_

## Create your first blog post

The content module works by reading the files in our `content/` directory.

So, navigate to `content/` and create an `articles/` folder.
Create a `first-blog-post.md` file and
insert the following

```md
content/articles/first-blog-post.md

---

<!--- YAML Front matter section in-between triple dashes '---' -->

title: First Blog Post
description: Learning how to create my blog using nuxt content

---

# My first blog post

Hey there! 👋🏾

This is my first blog post learning nuxt content.
```

<!-- ![blog-with-nuxt-content-create-content-md-file-Annotation 2021-07-11 034837.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1625975435117/_58aEjwEA.png) -->

<img-cont src="Creating-a-blog-using-Nuxt-and-Nuxt-Content---with-TailwindCSS/blog-with-nuxt-content-create-content-md-file-Annotation 2021-07-11 034837.png" alt="Create  markdown file in `content/` directory"></img-cont>

<info-box>
  <template #info-box>
    Note the YAML front matter section, this will be used later on to insert custom variables like title and description that we will access using `$content`.
  </template>
</info-box>

Next, we're going to create a [dynamic page](https://nuxtjs.org/docs/2.x/directory-structure/pages#dynamic-pages) which will be used to:

- fetch the article content using `asyncData` before the page has been rendered. We have access to our content through the context by using the variable `$content`. Since we are using a dynamic page, we can know what article file to fetch using the `params.slug` variable provided by vue router to get the name of each article
- render the article in the template using `<nuxt-content>`

Ok, navigate to `pages/` and create a `blog/` folder.
Create a `_slug.vue` (our dynamic page) file and
insert the following

```html
pages/blog/_slug.vue

<template>
  <article>
    <!-- this is where we will render the article contents -->
    <nuxt-content :document="article" />
  </article>
</template>

<script>
  export default {
    async asyncData({ $content, params }) {
      //here, we will fetch the article from the article/ folder based on the name provided in the 'params.slug`
      const article = await $content('articles', params.slug).fetch()

      return { article }
    },
  }
</script>
```

To display our content we are using the <nuxt-content /> component by passing in the variable we returned into the `:document="article"` document prop.

Go to your site and you should see something like this

<!-- ![blog-with-nuxt-content-render-first-article-Annotation 2021-07-11 123202.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1626008969368/_V0QIMEyB.png) -->

<img-cont src="Creating-a-blog-using-Nuxt-and-Nuxt-Content---with-TailwindCSS/blog-with-nuxt-content-render-first-article-Annotation 2021-07-11 123202.png" alt="Previe of first article"></img-cont>

## Accessing default injected variables

The content module provides lots of injected variables which we can use in our template.
Some of the ones will be using are:

- body: body text
- dir: directory
- extension: file extension (.md in this example)
- path: the file path
- slug: the file slug
- toc: an array containing our table of contents
- createdAt: the file creation date
- updatedAt: the date of the last file update

We can access this data using the `article` variable we created. Let's check them out by printing it with a `<pre>` tag in our template

```html
<pre> {{ article }} </pre>
```

We should see something like this on our page

```js
{
  "slug": "first-blog-post",
  "toc": [],
  "body": {
    "type": "root",
    "children": [
    // article content
    ]
  },
  "dir": "/articles",
  "path": "/articles/first-blog-post",
  "extension": ".md",
  "createdAt": "2021-07-11T02:34:43.695Z",
  "updatedAt": "2021-07-11T03:33:33.608Z"
}
```

### Custom injected variables

We'll also use this to display custom injected variables specified in the YAML front matter which must be valid YAML at the top of the file.
This is useful for adding SEO variables such as title, description and image of your article.

```html
<template>
  <article class="article">
      <!-- Our custom injected variables specified with the The YAML front matter goes here  -->
      <header class="article-header">
          <h1>{{article.title}}</h1>
          <p>{{article.description}}</p>

          <!-- container for article details -->
          <div class="details-cont">
              <!-- the format date function converts the default date to a readable form -->
              <span>{{formatDate(article.updatedAt)}}</span>
          </div>
      </header>

      <!-- this is where we will render the article contents -->
      <nuxt-content :document="article" />
  </article>
</template>

<script>
export default {
    async asyncData({ $content, params }) {
    //here, we will fetch the article from the article/ folder based on the name provided in the 'params.slug`
        const article = await $content('articles', params.slug).fetch();

        return {article}
    },
    methods: {
        // format the date to be displayed in a readable format
        formatDate(date){
            return new Date(date).toLocaleDateString('en', {year: 'numeric', month: 'long', day: 'numeric'})
        }
    }
}
```

Notice the `formatDate` function which we use to convert the `article.updatedAt` value to a more readable date.

We should have something like this:

<!-- ![blog-with-nuxt-content-article-with-injected-variables-Annotation 2021-07-11 135032.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1626009001772/l5eXbp4f5.png) -->

<img-cont src="Creating-a-blog-using-Nuxt-and-Nuxt-Content---with-TailwindCSS/blog-with-nuxt-content-article-with-injected-variables-Annotation 2021-07-11 135032.png" alt="Article with injected variables"></img-cont>

Now, we have two heading `<h1>` elements. One from the YAML front matter and the main markdown. We can remove the one in the main markdown.
We can also add more content for the styles:

```md
## <!--- content/articles/first-blog-post -->

title: My First Blog Post
description: Learning how to create my blog using nuxt, the nuxt content module and tailwindcss

---

Hey there! 👋🏾
This is my first blog post learning nuxt content.

I'm currently building it using the following:

- Nuxt.js
- Nuxt Content module
- Tailwindcss
- Tailwindcss typography

> Sweet huh?
```

Great! 😎 Let's touch it up a bit with some styling.

## Styling with Tailwindcss and Tailwindcss typography

The content from our article shows up when we visit the slug along with some custom data. But it looks ugly, let's fix that.

First, we apply the Tailwindcss typography `.prose` class to the `<article>` element for some basic styles:

```html
<article class="article prose lg:prose-xl"></article>
```

Now, we just create our custom styles in `pages/blog/_slug.vue`

```css
<style scoped>
@layer components {
  .article {
      @apply prose lg:prose-xl;
      @apply p-4 mt-6 lg:mt-8 m-auto lg:max-w-3xl;
  }

  .article-header{
      @apply mb-12 pb-8 lg:mb-16 border-gray-200 border-b-2;
  }

  .article-header h1{
      @apply mb-0;
  }

  .article-header .details-cont span{
      @apply text-opacity-50 text-sm;
  }
}
</style>
```

Our page now looks like this:

<!-- ![blog-with-nuxt-content-configure-blog-with-styling-Annotation 2021-07-11 162500.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1626249266836/ut6jai8_v.png) -->

<img-cont src="Creating-a-blog-using-Nuxt-and-Nuxt-Content---with-TailwindCSS/blog-with-nuxt-content-configure-blog-with-styling-Annotation 2021-07-11 162500.png" alt="Our page with some styling"></img-cont>

Sweet indeed 😍

## Adding HTML markup and Vue components in our article markdown

We can add valid html code in our markdown file.
Let's create an info box with some styling

```md
<!--
    content/articles/first-blog-post.md

    ...rest of file

    HTML in markdown
    Info box with svg icon
 -->
<div class="flex gap-4 items-start p-6 bg-blue-200 text-gray-800 border-blue-700 border-l-4 rounded-md">
<span><svg class="text-blue-700" xmlns="http://www.w3.org/2000/svg" viewBox="-2 -2 24 24" width="24" height="24" preserveAspectRatio="xMinYMin" class="icon jam jam-info"><path class="text-blue-700" d='M10 20C4.477 20 0 15.523 0 10S4.477 0 10 0s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm0-10a1 1 0 0 1 1 1v5a1 1 0 0 1-2 0V9a1 1 0 0 1 1-1zm0-1a1 1 0 1 1 0-2 1 1 0 0 1 0 2z'/></svg></span>
<span class="text-gray-800" style="line-height: initial">Here we have important information we would love to share with you!</span>
</div>
```

You should have something like this:

<!-- ![blog-with-nuxt-content-configure-blog-with-html-markup-Annotation 2021-07-11 175231.png](Upload failed. Please re-upload the image) -->

<img-cont src="Creating-a-blog-using-Nuxt-and-Nuxt-Content---with-TailwindCSS/blog-with-nuxt-content-configure-blog-with-html-markup-Annotation 2021-07-11 175231.png" alt="Add information box using HTML"></img-cont>

Sweet, now we can make this a vue component that can be reused

Create `infoBox.vue` file in `components/global`.

```html
<!-- components/global/infoBox.vue-->
<template>
  <div class="info-box">
    <span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="-2 -2 24 24"
        width="24"
        height="24"
        preserveAspectRatio="xMinYMin"
        class="icon jam jam-info"
      >
        <path
          d="M10 20C4.477 20 0 15.523 0 10S4.477 0 10 0s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm0-10a1 1 0 0 1 1 1v5a1 1 0 0 1-2 0V9a1 1 0 0 1 1-1zm0-1a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"
        />
      </svg>
    </span>
    <span>
      <slot name="info-box"> Some information gets diaplayed here </slot>
    </span>
  </div>
</template>

<script>
  export default {
    name: 'infoBox',
  }
</script>

<style scoped>
  @layer components {
    .icon {
      @apply text-gray-800;
    }

    .info-box {
      @apply flex gap-4 items-start p-6 bg-blue-200 text-gray-800 border-blue-500 border-l-4 rounded-md;
    }

    .info-box span {
      @apply text-gray-800 leading-none;
    }
  }
</style>
```

<info-box>
  <template #info-box>
    We are creating it in a <code>components/global</code> folder to register the component globally in order for nuxt to be able to auto import it into <code>&lt;nuxt-content&gt;</code>
  </template>
</info-box>

Now, replace the html with our new `infoBox` component

```html
<!-- infoBox component automatically imported as global component  -->
<info-box>
  <!-- insert into slot -->
  <template #info-box>
    Here we have important information we would love to share with you!
  </template>
</info-box>
```

If we view our page, we should still see our info box

<!-- ![blog-with-nuxt-content-configure-blog-with-html-markup-Annotation 2021-07-11 175231.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1626249270340/Z-M_a581s.png) -->

<img-cont src="Creating-a-blog-using-Nuxt-and-Nuxt-Content---with-TailwindCSS/blog-with-nuxt-content-configure-blog-with-html-markup-Annotation 2021-07-11 175231.png" alt="Add information box using Vue components"></img-cont>

## The content API

It's pretty awesome that the content module provides an API that we can access on the `http://localhost:3000/_content/` route. we can fetch data for all articles on the `http://localhost:3000/_content/articles` route.
<br>
We can access a single article using the slug of the article i.e `http://localhost:3000/_content/articles/first-blog-post` to access the data for `http://localhost:3000/blog/first-blog-post`.

## Adding Previous and Next Article functionality

We're going to be adding a previous and next article functionality to our blog to navigate to other posts on our sites.
So, let's create about three duplicates of our `content/articles/first-blog-post.md` file so we can have more posts to navigate to.

<!-- ![blog-with-nuxt-content-duplicate-article-Annotation 2021-07-11 190022.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1626249304972/EHwwhvNxxo.png) -->

<img-cont src="Creating-a-blog-using-Nuxt-and-Nuxt-Content---with-TailwindCSS/blog-with-nuxt-content-duplicate-article-Annotation 2021-07-11 190022.png" alt="Duplicates of article"></img-cont>

Let's create our `prevNext.vue` component in our `components/` folder

Here, we have a `nuxt-link` component which basically accesses the `slug` and `title` of the previous or next article.

```html
<!-- components/prevNext -->

<template>
<!-- ...rest of file -->

<nuxt-link v-if="prev" :to="{ name: 'blog-slug', params: { slug: prev.slug } }" class="prev">
      <span class="icon-cont"><svg</svg></span>
      <span>{{ prev.title }}</span>
</nuxt-link>

<!-- nuxt-link for "next" -->
<!-- ...rest of file -->
</template>
```

This data is what will be passed as props to the component which we defined here:

```html
<!-- components/prevNext -->

<script>
  export default {
    // create props for prev and next data that will be passed to the component
    props: {
      prev: {
        type: Object,
        default: () => null,
      },
      next: {
        type: Object,
        default: () => null,
      },
    },
  }
</script>
```

Our new component should look something like this:

```html
<!-- components/prevNext -->
<template>
  <section id="prev-next" class="prev-next">
    <!-- if prev data is available display the link -->
    <nuxt-link
      v-if="prev"
      :to="{ name: 'blog-slug', params: { slug: prev.slug } }"
      class="prev"
    >
      <span class="icon-cont"
        ><svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="-5 -5 24 24"
          width="24"
          height="24"
          preserveAspectRatio="xMinYMin"
          class="icon jam jam-arrow-left"
        >
          <path
            d="M3.414 7.657l3.95 3.95A1 1 0 0 1 5.95 13.02L.293 7.364a.997.997 0 0 1 0-1.414L5.95.293a1 1 0 1 1 1.414 1.414l-3.95 3.95H13a1 1 0 0 1 0 2H3.414z"
          /></svg
      ></span>
      <span> {{ prev.title }} </span>
    </nuxt-link>
    <!-- else display empty span for styling purposes -->
    <span class="prev" v-else></span>

    <!-- if prev data is available display the link -->
    <nuxt-link
      v-if="next"
      :to="{ name: 'blog-slug', params: { slug: next.slug } }"
      class="next"
    >
      <span>{{ next.title }}</span>
      <span class="icon-cont">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="-5 -5 24 24"
          width="24"
          height="24"
          preserveAspectRatio="xMinYMin"
          class="icon jam jam-arrow-right"
        >
          <path
            d="M10.586 5.657l-3.95-3.95A1 1 0 0 1 8.05.293l5.657 5.657a.997.997 0 0 1 0 1.414L8.05 13.021a1 1 0 1 1-1.414-1.414l3.95-3.95H1a1 1 0 1 1 0-2h9.586z"
          />
        </svg>
      </span>
    </nuxt-link>
    <!-- else display empty span for styling purposes -->
    <span class="next" v-else> </span>
  </section>
</template>

<script>
  export default {
    // create props for prev and next data that will be passed to the component
    props: {
      prev: {
        type: Object,
        default: () => null,
      },
      next: {
        type: Object,
        default: () => null,
      },
    },
  }
</script>

<style scoped>
  @layer components {
    /* styling for the components */
    .prev-next {
      @apply flex gap-12 py-8 items-center justify-between m-auto max-w-xl lg: max-w-4xl;
    }

    .prev-next a {
      @apply flex gap-2;
    }
  }
</style>
```

Now let's get back to our `components/blog/_slug.vue`.

```javascript
// components/blog/_slug.vue

export default {
  async asyncData({ $content, params }) {
    const article = await $content('articles', params.slug).fetch()

    // assign the first two objects in returned array to prev & next constant variables
    const [prev, next] = await $content('articles')
      // fetch only the title and slug from the articles
      .only(['title', 'slug', 'updatedAt'])
      // sortby time updated, in ascending order
      .sortBy('updatedAt', 'asc')
      // get the correct slug
      .surround(params.slug)
      // fetch data
      .fetch()

    // return the data to be vailable for use in the file
    return { article, prev, next }

// rest of <script>
```

We now have the data of the each of the first two sorted articles each in `prev` & `next` variables, which we will now pass to the `prevNext` component after the `<article>`

```html
<!-- components/blog/_slug.vue -->

<!-- rest of file -->

<!-- Pass the data to the component props-->
<prev-next :prev="prev" :next="next"></prev-next>
```

Here we go:

<!-- ![blog-with-nuxt-content-prevVext-component-Annotation 2021-07-12 003740.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1626249332207/9joodc1yS.png) -->

<img-cont src="Creating-a-blog-using-Nuxt-and-Nuxt-Content---with-TailwindCSS/blog-with-nuxt-content-prevVext-component-Annotation 2021-07-12 003740.png" alt="Previous and Next compnont"></img-cont>

Great!

## Listing out all our Articles

Now, it'll be really nice if we could display our articles on our blog page.
<br/>
Let's create a new page in our `blogs/` folder; `pages/blogs/index.vue`
<br/>
Then in the `<script>`, we pass in `$content` and `params` into our `asyncData` function.
Within the function we pass `aritcles` which is the folder which our articles are stored into `$content` and chain `.only(['title', 'slug', 'updatedAt', 'description'])` to fetch only those attributes from the articles,
<br/>
`.sortBy('createdAt', 'asc')` to sort it
<br>
and lastly `fetch()` to fetch the data and assign it to `const articles`

```html
<!-- pages/blog/index.vue -->

<script>
  export default {
    async asyncData({ $content }) {
      const articles = await $content('articles')
        .only(['title', 'slug', 'updatedAt', 'description'])
        .sortBy('createdAt', 'asc')
        .fetch()

      return { articles }
    },

    methods: {
      formatDate(date) {
        // format the date to be displayed in a readable format
        })
      },
    },
  }
</script>
```

Now we can use the `v-for` directive to render our articles from the `articles` data

```html
<!-- pages/blog/index.vue -->

<template>
  <section class="blog">
    <header class="blog-header">
      <h1>It's nice you're here. Welcome.</h1>
      <p>
        Have a look what I've been spending hours behind the screen writing
        about
      </p>
    </header>

    <ul class="articles">
      <li class="article" v-for="article of articles" :key="article.slug">
        <nuxt-link :to="{ name: 'blog-slug', params: { slug: article.slug } }">
          <h2>{{ article.title }}</h2>
          <p>{{ article.description }}</p>

          <div class="details-cont">
            <span>{{ formatDate(article.updatedAt) }}</span>
          </div>
        </nuxt-link>
      </li>
    </ul>
  </section>
</template>

<!--- Styling the page -->
<style scoped>
  @layer base {
    .blog {
      @apply p-4 mt-6 lg:mt-8 m-auto lg:max-w-3xl;
    }

    .blog-header {
      @apply prose lg:prose-xl;
      @apply mb-12 pb-8 lg:mb-16;
    }

    .blog-header h1 {
      @apply mb-0;
    }

    .articles .article {
      @apply prose lg:prose-lg;
      @apply pl-0 py-2 list-none;
    }

    .articles .article h2 {
      @apply mb-0;
    }
  }
</style>
```

Let's visit http://localhost:3000/blog, we should see our blog page

<!-- ![blog-with-nuxt-content-blog-list-index-page-Annotation 2021-07-14 061942.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1626249390189/c6DL-LK47.png) -->

<img-cont src="Creating-a-blog-using-Nuxt-and-Nuxt-Content---with-TailwindCSS/blog-with-nuxt-content-blog-list-index-page-Annotation 2021-07-14 061942.png" alt="Blog page, list out all blog posts"></img-cont>

## Creating a navigation for our site

The last thing we are going to be doing is creating a simple navigation that will take us to our home page and blog page.

Let's create our `siteHeader.vue` component in `components/` with some basic styling.

```html
<!-- components/siteHeader.vue -->

<template>
  <header id="site-header" class="site-header">
    <div class="wrapper">
      <nuxt-link to="/">
        <figure class="site-logo">
          <h1>PortfolioX</h1>
        </figure>
      </nuxt-link>

      <nav class="site-nav">
        <ul class="links">
          <li class="link">
            <nuxt-link to="/blog">Blog</nuxt-link>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script>
  export default {}
</script>

<style scoped>
  @layer components {
    .site-header {
      @apply w-auto p-4 py-8 sticky top-0 bg-white bg-opacity-70 backdrop-filter backdrop-blur-md z-10;
    }

    .site-header .wrapper {
      @apply m-auto max-w-5xl flex items-center justify-between;
    }
  }
</style>
```

Next, we add it to our default site layout, in `layouts/default.vue`

```html
<!-- layouts/default.vue -->

<template>
  <div>
    <site-header />
    <Nuxt />
  </div>
</template>
```

Our `siteHeader.vue` It is now automatically imported into our layout. Have a look at our page

<!-- ![blog-with-nuxt-content-blog-with-site-header-Annotation 2021-07-14 075929.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1626249427110/1v-qmk4z0.png) -->

<img-cont src="Creating-a-blog-using-Nuxt-and-Nuxt-Content---with-TailwindCSS/blog-with-nuxt-content-blog-with-site-header-Annotation 2021-07-14 075929.png" alt="Blog with Site Header"></img-cont>

Beautiful 😘

## Conclusion

We've managed to build a pretty simple blog site with important features using just one module, nuxt/content.
The focus of this article was the content module, so, I'll drop links for more reading on tailwindcss.
<br>
I think this is a pretty awesome and useful feature in Nuxt.js.I think you would love to play around with it even more because there is a lot more functionality you can add to your project that we didn't cover here.

I hope you see this useful, I will consider writing on deployment in the future but I'll just drop some links that I feel are useful till then.

Thanks for reading. Happy coding 😎.

## Futher Reading

### Useful links

- The content module documentation: https://content.nuxtjs.org/
- NuxtJs documentation: https://nuxtjs.org/docs/2.x/get-started/installation
- Tailwindcss documentation: https://tailwindcss.com/docs/

### Awesome reads

- An article on creatung a blog with Nuxt content: https://nuxtjs.org/blog/creating-blog-with-nuxt-content#add-a-search-field
- An article on building a prtfolio site with NuxtJs: https://itnext.io/building-the-ultimate-portfolio-site-with-nuxt-js-and-netlify-beautiful-blazing-fast-100-seod-102913a60cfd
