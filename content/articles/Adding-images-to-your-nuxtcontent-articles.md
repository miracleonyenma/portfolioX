---
title: Adding images to your nuxt/content articles
description: Here's a way to add images into your article content in your nuxt/content project
tags: [Nuxt Content, Nuxt, VueJS, frontend, Blog series]
---

<!-- ## Outline

- Nuxt & Nuxt Content
- Creating an image container component
  - Making it globally accessible
  - Using require to get the processed image
- Adding our component to our markdown
- Useful links -->

---

## Nuxt & Nuxt Content

[Nuxt](https://nuxtjs.org) is a great SSR (Server Side Rendering) framework built for VueJS applications.
It's modular, so it comes with a lot of other features that makes creating a Vue app easier and more powerful.

The [nuxt content module](https://content.nuxtjs.org/) is one of those features. It acts as a **Git-based Headless CMS** which helps you render and fetch your Markdown, YAML, JSON, XML and CSV files from your `content/` directory.

For this article, I'll assume you've already gotten your nuxt app up and running and have already installed the `nuxt/content` module.

Let's dive straight into adding images to our article contents

## Creating an image container component

Let's say we have a file in our project `content/articles/an-article.md`

```markdown
---
title: An article
description: this is an article
---

## Hello, this is an article

Some text in the article.
```

And, we have an image in our `assets/` directory, say `assets/img/article-1/article-img.png` <br/>
For the sake of organization, we'll keep `article-img.png` in a subfolder that corresponds with our article title `article-1/`.

If we want to add that image to our article, we can create a component for that.

### Making the component globally available

We'll create our component and make it globally available as this is required for Nuxt to be a ble to auto import the component into our `markdown`.

First, let's make sure auto importing is enabled in our nuxt app, open `/nuxt.config.js`

```js
...

// Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

...
```

Let's create a new component `component/global/imgCont.vue`

```html
<template>
  <div class="img-cont">
    <img :src="getImg()" :alt="{{ alt }}" />
    <span class="img-caption">{{alt}}</span>
  </div>
</template>
```

In our `<script>` we'll have

```html
<script>
  export default: {
      //declare props for the 'src' and 'alt' of the image
      props: {
          src: {
              type: String,
              required: true
          },
          alt: {
              type: String,
              required: true
          }
      },
      methods: {
          /* function to get and return the final url to our processed image
          using the require function */
          getImg(){
              try{
                  // place the '~/' before 'assets/'
                  return require(`~/assets/img/articles/${src}`)
              } catch(err){
                  console.warn(err);
                  // return null if any error
                  return null
              }
          }
      }
  }
</script>
```

Our `imgCont` component basically takes in the `src` and `alt` of our image in the mardown file and returns the bundled / processed image which will be served through `_nuxt/` in our `developement` build.

### Using `require()` to process the image

In our `component/global/imgCont.vue`

```js
...

try{
	// place the '~/' before 'assets/'
	return require(`~/assets/img/articles/${src}`)

...
```

This 'processing' is done using the `require` function which treats the string passed to it as a module, which would be resolved by `webpack` and the respective loaders during the build.

> The `~/ ` is a way of telling nuxt to look for that file from the base directory

## Adding our component to our markdown

Now we can add our component to our markdown file

```markdown
---
title: An article
description: this is an article
---

## Hello, this is an article

Some text in the article.

<img-cont src="article-1/article-img.png" alt="An image in my article" />
```

Here, you'll notice that our `src` is referencing the image only from the subfolder and article name. <br/>
This is just a structure we can to follow so that we won't run into much complication incase our directory structure changes.

There we have it! Our component should be able to display our images form our articles.

<!-- This is actually the method I used on my blog and you can see the live output here and the code here -->

## Useful links

Here are some related links that I think you might find useful

- Create a Blog with Nuxt Content - [Create a Blog with Nuxt Content - NuxtJS](https://nuxtjs.org/blog/creating-blog-with-nuxt-content)
- The Nuxt Content module [Introduction - Nuxt Content (nuxtjs.org)](https://content.nuxtjs.org/)
- [Working with images in Nuxt Content | Woet Flow](https://woetflow.com/posts/working-with-images-in-nuxt-content/)

Thanks for reading! ❤ <br/>
I hope you found this useful, feel free to share ✨
