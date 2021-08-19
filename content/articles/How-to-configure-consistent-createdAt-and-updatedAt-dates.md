---
title: How to configure consistent createdAt and updatedAt dates
description: Here, we'll see a quick way to get our Nuxt Content date values working right in both development and production
tags: [Nuxt, Nuxt Content, Vue, nuxt-content-git, Blog Features]
---

Using the the Nuxt Content Module is a great way to build blogs and documentation sites with Nuxt. It works as a "Git-based Headless CMS" and comes with a tons of features to manage content using markdown, XML, JSON and CSV files.

One of these features is the `createdAt` and `updatedAt` time stamp that Nuxt Content assigns to each content. This data is gotten from the file on the machine and so it can have a different values locally and in production, on a server.

To fix this, we need to provide a consistent date value to our content and use that data instead. We'll be using [`nuxt-content-git`,](https://github.com/dword-design/nuxt-content-git) a module by [@dword-design](https://github.com/dword-design). It is an additional module for @nuxt/content that replaces or adds createdAt and updatedAt dates based on the git history.

I'll assume that you've installed and setup [Nuxt](https://nuxtjs.org/docs/2.x/get-started/installation) and [Nuxt Content](https://content.nuxtjs.org/) already. If you haven't, I have an article on that, check it out [here](https://content.nuxtjs.org/)

## Installing The Module

Run,

```bash
npm install nuxt-content-git
```

## Configure in `nuxt.config.js`

After installation, add the following to `modules` in your `nuxt.config.js` file just before `'@nuxt/content'`.

```javascript
// nuxt.config.js

export default {
    ...

    modules: [
      ...

      //https://github.com/dword-design/nuxt-content-git
      ['nuxt-content-git', {
        createdAtName : 'gitCreatedAt',
        updatedAtName : 'gitUpdatedAt',
      }],
      // https://go.nuxtjs.dev/content
      '@nuxt/content',
    ]

...
}
```

This would create new properties `'gitCreatedAt'` and `'gitUpdatedAt'` and insert it into the `$content` without overwriting `createdAt` and `updatedAt`.

If you intend to overwrite the values with the ones provided by the `nuxt-content-git` module, you only have to add the module without any extra configs.

```javascript
// nuxt.config.js

export default {
  ...

  modules: [
    ...

    //https://github.com/dword-design/nuxt-content-git
    'nuxt-content-git',
    // https://go.nuxtjs.dev/content
    '@nuxt/content',
  },

  ...
}
```

Now the `createdAt` and `updatedAt` date values will be replaced with dates based on git history.

## Using The Property Within Your Nuxt App

All you have to do is fetch the `$content` and it becomes available in the assigned object

```html
<!-- pages/_slug.vue -->
<template>
  <section>
    <article class="article">
      <!-- Custom injected variables - 'title' & 'description'  specified within the The YAML front matter goes here  -->
      <header>
        <h1>{{ article.title }}</h1>
        <p>{{ article.description }}</p>

        <!-- container for article details -->
        <div class="details-cont">
          <!-- the format date function converts the default date to a readable form -->
          <span>Posted: {{ formatDate(article.gitCreatedAt) }}</span>
          <span>Updated: {{ formatDate(article.gitUpdatedAt) }}</span>
        </div>
      </header>

      <!-- this is where we will render the article contents -->
      <nuxt-content :document="article" />
    </article>
  </section>
</template>

<script>
  export default {
    async asyncData({ $content, params }) {
      const article = await $content('articles', params.slug).fetch()
      return { article }

    ...
    },

    methods: {
      formatDate(date) {
        // format the date to be displayed in a readable format
        return new Date(date).toLocaleDateString('en', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })
      },
    },

    ...
  }
</script>
```

Here, in `asyncData()`, we fetched the article file that matched the slug defined in `params.slug` and assigned it to `article`. We now have access to all properties of that article including the new `gitCreatedAt` and `gitUpdatedAt` assuming we did not overwrite the values. Else, we'll just keep using `createdAt` and `updatedAt` since the values are now based on git history.

## Conclusion

In order to keep our date values consistent in Nuxt Content, we can install and configure a package `nuxt-content-git`, which adds or replaces the `createdAt` and `updatedAt` dates with values based on git history.
This way, it'll be consistent in both development and production.

## Further Reading

- [nuxt-content-git documentation](https://github.com/dword-design/nuxt-content-git)
- [Creating a blog using Nuxt and Nuxt Content with TailwindCSS](http://localhost:3000/blog/Creating-a-blog-using-Nuxt-and-Nuxt-Content---with-TailwindCSS)
- [Create a blog with Nuxt Content](https://nuxtjs.org/blog/creating-blog-with-nuxt-content)
- [Nuxt Content documentation](https://content.nuxtjs.org/)

Thanks for reading ✨
