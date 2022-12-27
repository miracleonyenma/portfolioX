---
title: How I implemented TailwindCSS dark mode in my Nuxt blog
description: Here's how I added dark mode theme functionality that respects user preference using the `prefers-color-scheme` and localStorage and a cool "click" sound effect.
tags: [Nuxt 2, Vue, TailwindCSS, Dark mode]
createdAt: 9-17-2022
updatedAt: 9-17-2022
---

I've always been in love with this dark mode functionality of a thing. So when I learnt that [TailwindCSS - A Utility-first CSS Framework](https://tailwindcss.com/) supports dark mode out of the box, I was excited. That's probably one of the top reasons I fell in love with Tailwind.

I've been working on a redesign of my [portfolio and blog](https://miracleio.me/) in my free time and I just had to add this feature to my site, it just wouldn't be complete without it.

Although it's a well known fact that dark mode offers a ton of benefits to site visitors, like it:

- helps their device consume less battery on OLED screens,
- keeps them from squeezing their eyelids and trying to block the excess light while browsing in dark places by just turning on dark mode
- also prevents them from cranking their brightness 🔆 all the way up because they are trying to read what's on the page while outdoors
- is just plain cool 😎

My new [site](https://miracleio.me) runs on [Nuxt](http://nuxtjs.org/) which is basically a server side rendering framework like Next.js (which is for React) but for [Vue](https://vuejs.org/). I'm not going to cover how I set up the site with [Nuxt Content](https://content.nuxtjs.org/) and Tailwind in this article but here's a link to that [here](https://miracleio.me/blog/Creating-a-blog-using-Nuxt-and-Nuxt-Content---with-TailwindCSS).

## **Approaching The Problem**

If you look at the Tailwind docs on [dark mode](https://tailwindcss.com/docs/dark-mode), there's an example of a common approach for dark mode and respecting user preference and that approach is what I was looking for.

What I want for my site is that:

- The system theme preference is respected by first time users - this is where `prefers-color-scheme` comes in.
- This preference is now cached in `localStorage`and upon the user's next visit, the cached theme will be used
- The user can also toggle theme mode and that will be saved to `localStorage` for their next visit

Now, the thing with Tailwind's [example](https://tailwindcss.com/docs/dark-mode#toggling-dark-mode-manually) is that it's very basic and you have to figure out how to implement it.

## Prerequisites

Before we jump into how I transformed that basic example into a feature that works, there's a few things I did beforehand.

### Enable Manual Dark Mode

According to Tailwind's [docs](https://tailwindcss.com/docs/dark-mode#toggling-dark-mode-manually)

> If you want to support toggling dark mode manually instead of relying on the operating system preference, use the `class` strategy instead of the `media` strategy

It's important to note that we'll have to add the `.dark`class to our `HTML` document (so that it'll be applied throughout the app ) in order to apply any `dark:{class}` class to elements. That's why we need to be able to control this class manually.

To do this, just change `media` to `class` in the `darkMode` property in `tailwind.config.js` file

```js
// tailwind.config.js
module.exports = {
  darkMode: 'class',
  // ...
}
```

Now, when dark mode is enabled, `<html>` should have a class of `dark`. Then, all `dark:{class}` classes will be applied

```html
<!-- Dark mode enabled -->
<html class="dark">
  <body>
    <!-- dark:bg-black Will be applied -->
    <div class="bg-white dark:bg-black">
      <!-- ... -->
    </div>
  </body>
</html>
```

🆒

### Enable Dark Mode Variant For Other Utilities

By default, dark mode is only enabled for color-related utilities/classes, so something like this will work:

```html
<p class="text-black dark:text-white">Some text</p>
```

but this will not work:

```html
<p class="transform translate-x-1 dark:translate-x-2">Some text</p>
```

All you have to do is enable dark mode on our desired utilities:

```js
// tailwind.config.js
module.exports = {
  //...
  variants: {
    extend: {
      translate: ['dark'],
      typography: ['dark'], //if you've setup Tailwind Typography Plugin for dark mode
    },
  },
}
```

You'll notice, I added `'dark'` to the variant list for `typography`, that's for the Tailwind Typography plugin I'm using. This is beyond the scope of this article, but I'll share how I implemented dark mode for that plugin soon.
Now that we've enabled the dark mode variant for our utilities, let's proceed.

## Implementing The Feature

In order to do this, I had to create a `components/themeModule` folder containing some functions in the `themeModule/initTheme.js` and my toggle button component in `themeModule/themeControl.vue`.
So my file structure basically looks like this:

```md
|
+-- components
| +-- themeModule
| +-- initTheme.js
| +-- themeControl.vue
|
```

What I'm trying to do can also very easily be implemented with a state management pattern like [Vuex](https://vuex.vuejs.org/#what-is-a-state-management-pattern) which happens to come with Nuxt by default. But, I just decided not to use it. But, if you're interested to see how you can implement this feature using Vuex, you can check out this great [article](https://dev.to/tonyketcham/vue-tailwind-2-0-dark-mode-using-vuex-localstorage-and-user-s-default-preference-439g) by [@Tony Ketcham](https://dev.to/tonyketcham) where he used it.

### Set Theme On User Visit

In `themeModule/initTheme.js` I have the following piece of code:

```js
// components/themeModule/initTheme.js

const initTheme = () => {
  const savedTheme = localStorage.theme
  const userPrefersDark = window.matchMedia(
    '(prefers-color-scheme: dark)'
  ).matches
  const newTheme =
    {}(!savedTheme && userPrefersDark) ||
    (savedTheme && JSON.parse(savedTheme).mode === 'dark')
      ? (newTheme.mode = 'dark')
      : (newTheme.mode = 'light')

  localStorage.theme = JSON.stringify(newTheme)

  return { newTheme }
}
```

What's happening here?

- First, we'll see if the `"theme"` is present in `localStorage` already, and if a value is present, it'll be assigned to `savedTheme`, if none, `savedTheme` will be `undefined`
- Then, we get the preferred color scheme of the system. If it's dark, `userPrefersDark` will be `true`, else it'll be `false`
- Assigning an empty object to `newTheme`, my desired structure for this object is this:

  ```js
      theme: {
        mode: "dark" || "light",
        //... some other property
      }
  ```

  This is because I intend to add more options like main color to the theming functionality.

I have a _compound_ ternary operator that does basically two things:

1. ```js
    !savedTheme && userPrefersDark
    ```

    Check if no theme has been set in `localStorage` **and** if the system the is set to "dark".
    **If this is true**, it means that this is the **first time** the user has visited the page (hence, _no cached theme in localStorage yet_) **and** that the **system preference has been set to dark**.

2. ```js
    savedTheme && JSON.parse(savedTheme).mode === 'dark'
    ```

    Check if `theme` was saved to localStorage and `theme.mode` was equal to "dark"
    **If this is true** on the other hand, it means that this isn't the first user visit and that a **mode has saved to `localStorage`**, so we should use that.

These two conditions imply that the desired mode is dark. If either of them is true, the mode should be set to dark:

```js
? (newTheme.mode = 'dark')
```

If both of the two compound conditions are false, the desired mode is dark:

```js
: (newTheme.mode = 'light')
```

I hope this all makes sense. If you don't understand how ternary operators work, here's a link that will help: [Make Your Code Cleaner with JavaScript Ternary Operator (javascripttutorial.net)](https://www.javascripttutorial.net/javascript-ternary-operator/)

For now, here's the classic `if else` equivalent:

```js
if (
  (!savedTheme && userPrefersDark) ||
  (savedTheme && JSON.parse(savedTheme).mode === 'dark')
) {
  newTheme.mode = 'dark'
} else {
  newTheme.mode = 'light'
}
```

Alright. now we can save the `newTheme` to `localStorage` and return it:

````js
localStorage.theme = JSON.stringify(newTheme)

return { newTheme }```
````

That's it for the `initTheme()` function.

I prefer to run this function at the topmost level of my app which is `layouts/default.vue`.

So, in that file, I added the following:

```html
<!-- layouts/default.vue -->
<!-- ... -->
<script>
  import { initTheme } from '../components/themeModule/initTheme'

  export default {
    data() {
      return {
        theme: {},
      }
    },

    watch: {
      theme: {
        deep: true,
        handler(data) {
          const { mode } = data
          const html = document.documentElement

          mode === 'dark'
            ? html.classList.add('dark')
            : html.classList.remove('dark')

          localStorage.theme = JSON.stringify(data)
        },
      },
    },
    methods: {
      // this function toggles the value of `theme.mode`
      toggle() {
        this.theme.mode === 'dark'
          ? (this.theme.mode = 'light')
          : (this.theme.mode = 'dark')
      },
    },

    beforeMount() {
      this.theme = initTheme().newTheme
      // listen to 'toggle-theme' event and run the `toggle()` method when fired
      this.$nuxt.$on('toggle-theme', this.toggle)
    },
  }
</script>
```

In `<script>`, I import `initTheme` function then I do the following:

- Create a `theme` data property in `data()`,
- Set the `theme` data to the value returned by `initTheme` in `beforeMount()` which runs when the app is visited.

  <info-box>
    <template #info-box>
    Take note of <code>this.$nuxt.$on('toggle-theme', this.toggle)</code>, this is a nuxt global custom event listener which will run the <code>toggle()</code> method when the event is emitted from <code>themeModule/themeControl.vue</code>. You'll see this emitter in the component code.
    </template>
  </info-box>

- The `toggle()` method checks if the current theme mode is "dark", if it is, it sets it to "light". If it's not "dark", it set's it to dark. That's the basic toggle functionality right there.
- Set up a watcher for `theme` data.
- `deep: true` ensures that the value properties of the object are watched as well.
- We have another ternary operator which checks to see if the new `mode` is `"dark"`, if it is, its adds the `.dark` class to `html` document. If the mode is not `"dark"`, it removes the `.dark` class.
- Then, it saves the new data to `localStorage`

Right now, the app basically checks `localStorage` and system preference to determine whether or not to enable dark mode. What's left is the toggle button/component.

### Adding Toggle Functionality

What's left now is to create a button component that users will click to toggle between light and dark mode. Behold, `themeModule/themeControl.vue`

```html
<!-- components/themeModule/themeControl.vue -->
<!-- ... -->

<template>
  <button class="toggler" @click="toggle()">
    <div class="wrapper">
      <!-- custom icon components -->
      <feather-icon name="sun" />
      <feather-icon name="moon" />
    </div>
  </button>
</template>

<script>
  export default {
    data() {
      return {
        clickSound: '',
      }
    },

    methods: {
      toggleFunc() {
        // nuxt global event emitter
        this.$nuxt.$emit('toggle-theme')
        // play cool sound effect
        this.clickSound.play()
      },
    },

    beforeMount() {
      // get audio file from static folder, create new Audio function and assign it to `clickSound` data ob
      this.clickSound = new Audio('/audio/mixkit-classic-click-1117.mp3')
    },
  }
</script>

<style scoped>
    .toggler {
      @apply relative w-6 h-6 ml-6 overflow-hidden;
    }
    .toggler .wrapper {
      @apply inline-flex transition transform;
      /* dark variant for button */
      @apply dark:-translate-x-1/2;
    }
  }
</style>
```

Basically, when clicked, in the `toggleFunc()` method, a global custom event `toggle-theme` is emitted.
If you recall, we have a global listener in `layouts/default.vue`. This listener is in `layouts/default.vue`, is responsible for changing the theme in the app as we have seen in the previous section.

### The Sound Effect

For the sound effect, I just downloaded a free audio file I found on [mixkit.co](https://mixkit.co/free-sound-effects/click/), compressed the file using [www.onlineconverter.com](https://www.onlineconverter.com/compress-mp3), downloaded it again and added it to my `/static/audio` folder. This allows me to create a new Audio element from a file without webpack like so: `new Audio('/audio/mixkit-classic-click-1117.mp3')`, assign it to `this.clickSound` .
Then, play it in `toggleFunc()` like so: `this.clickSound.play()`.
It's pretty simple.

Here's my toggler in action:

<img-cont src="How-I-implemented-TailwindCSS-dark-mode-in-my-Nuxt-blog/baa7cee3-5cde-43d6-a971-8b37237d2a60_gif.gif" alt="GIF of the toggler on my blog"></img-cont>

### The Toggler Animation

I created the transition by simply adding the `dark:-translate-x-1/2` variant to `.wrapper`. That's why I had to enable the dark mode variant for the the `translate` utility in the beginning for this to work.
The icons are styled side-by-side in a wrapper. The container which is the `.toggler`button has `overflow` set to `hidden`.
So, when the dark class is active, the `.wrapper` translates on the x-axis by 50%, revealing the moon while hiding the star and vice-versa.

## Conclusion

Well, I've tried to give a detailed rundown of how I implemented this dark mode thing on my Nuxt site. Without Vuex 😋. If you have any thoughts, questions, or recommendations, please feel free to reach out. I'd really appreciate feedback.

## Further Reading

Here are some resources I think you might find useful:

- [Vue + Tailwind 2.0: dark mode using Vuex, localStorage, and user's default preference](https://dev.to/tonyketcham/vue-tailwind-2-0-dark-mode-using-vuex-localstorage-and-user-s-default-preference-439g)
- [TailwindCSS Dark Mode](https://tailwindcss.com/docs/dark-mode)

Appreciate and share 🙌🏾 if you feel this could be useful to someone out there ✨
Thanks for reading ❤.
