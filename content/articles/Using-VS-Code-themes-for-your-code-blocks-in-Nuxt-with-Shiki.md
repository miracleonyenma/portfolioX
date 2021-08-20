---
title: Using VS Code themes for your code blocks in Nuxt with Shiki
description: Here's how we can use VS Code these for syntax highlighting in our Nuxt site using Nuxt Content and Shiki
tags: [Nuxt, Nuxt Content, Vue, Shiki, Blog Features]
---

The Nuxt Content module comes with many great features. One of them is the syntax highlighting feature that it comes with.

By default, Nuxt Content uses [Prism](https://prismjs.com/) for it's syntax highlighting. Prism is great, it comes with a lot of themes that you can add, you can even create your own custom theme.  Another great one that you can integrate into your site is [Highlight.js](https://highlightjs.org/).  Then, we have [Shiki](https://shiki.matsu.io/). Which is the one I went for because it can generate HTML code for your code block similar to VS Code. This is because it uses TextMate grammar to tokenize strings, and colors the tokens with VS Code themes. The [Nuxt Content](https://content.nuxtjs.org/) module site has some snippets that shows you how to use these packages, you can check it out [here](https://content.nuxtjs.org/snippets/#custom-highlighter).

I'll be showing you how to set up Shiki for custom highlighting in your Nuxt Content site. For this one, I'll assume you have created and set up your Nuxt site with Nuxt Content already, if you haven't, you can get started [here](https://miracleio.me/blog/Creating-a-blog-using-Nuxt-and-Nuxt-Content---with-TailwindCSS).



## Installation

To install Shiki run,

```bash
npm install shiki
```

After successful installation we can now configure Shiki

## Configuration

In order for Shiki to do it's magic in our generated markdown content, we first import the `getHighlighter`  function from the module in our `nuxt.config.js`

```javascript
import { getHighlighter } from 'shiki';

export default {
  ...
}
```

Now, we have to define our `nuxt.config.js` content module configuration. We'll add these configurations to `content.markdown`. This [module](https://content.nuxtjs.org/configuration#markdown) compiles markdown files into  JSON AST (Abstract Syntax Tree) that will be stored in the `body` variable. 

```javascript 
export default {
  modules: ['@nuxt/content'],
    
  content: {
    markdown: {
      async highlighter() {
        const highlighter = await getHighlighter({

          theme: 'nord'
        })
        return (rawCode, lang) => {
          return highlighter.codeToHtml(rawCode, lang)
        }
      }
    }
  }
```

Here, we're using [`markdown.highlighter`](https://content.nuxtjs.org/configuration#markdownhighlighter) to change the default highlighter. In order for this to work we have to use `async highlighter()` since we're getting the highlighter from a promised-returned-package/function. 

Now, within the `async highlighter()` function, we're getting the theme by passing the  theme, `theme: 'nord` as an object argument to the `getHighlighter` function. This gets the theme if it's available by default.

We return a function `return (rawCode, lang) => {}` which takes two arguments - `rawCode` and `lang` which is the code and language of the code blocks in the markdown files. Now, within this function we return `highlighter.codeToHtml(rawCode, lang)` which converts code to HTML tokens which is used in the final output.



## Using A Custom Theme

Now, there's a good chance that the predefined themes shipped with Shiki might not be what you're looking for. We'll you can use a custom VS Code theme. Like [ayu-dark](https://github.com/ayu-theme/vscode-ayu/blob/master/ayu-dark.json) for instance, there are two ways that I know of:

### 1. Using [shiki-themes](https://www.npmjs.com/package/shiki-themes) 

Install shiki-themes

```bash
npm i shiki-themes
```

To get the ayu-dark theme [here](https://github.com/ayu-theme/vscode-ayu/blob/master/ayu-dark.json). You can copy the contents of the file and create a new file in a new directory at the root of your project. I'll save mine as `custom-themes/ayu-dark.json` 

Now, add it to your project, in `nuxt.config.js`:

```javascript
import { getHighlighter } from 'shiki';

// this will be used to fetch the theme file
import { loadTheme } from 'shiki-themes';

export default {

  // Content module configuration: https://go.nuxtjs.dev/config-content
  content: {
    markdown: {
      async highlighter(){
      
        // get custom theme
        const t = await loadTheme('./custom-themes/ayu-dark.json')
        const highlighter = await getHighlighter({
          theme: t
        })

        return (rawCode, lang) => {
          return highlighter.codeToHtml(rawCode, lang)
        }
      }
    }
  },
  
  ...
}

```

Here, we are importing `loadTheme` from the `shiki-themes` package. This function takes in the relative path of our custom theme as an argument.

### 2. Without shiki-themes

I also tried loading my custom theme without shiki-themes. Here's how:

```javascript
// load both functions from 'shiki'
import {getHighlighter, loadTheme} from 'shiki';
// load the join function from 'path'
import { join } from 'path';

export default {
  content: {
    markdown: {
      async highlighter(){
          
        // the 'join' method joins all arguments together and normalize the resulting path as a string
        // process.cwd() gives the current working directory of the Node.js process
        const t = await loadTheme(join(process.cwd(), './custom-themes/ayu-dark.json'))
        const highlighter = await getHighlighter({

          theme: t
        })

        return (rawCode, lang) => {
          return highlighter.codeToHtml(rawCode, lang)
        }
      }
    }
  },
  
  ...
}
```

Here, we're loading the custom theme without `shiki-themes`. Instead we import `loadTheme` from `shiki` itself. We are also importing `join` from `path`. 

In `loadTheme` we used `join` to join all arguments together and normalize the resulting path as a string. The first argument passed to `join` is `process.cwd()`. This gives the current working directory of the Node.js process. The second argument is the relative path to our custom theme. 

This is necessary because, for some reason `loadTheme` looks for the file within the `node_modules`/ directory relative to the package in this directory. So, we need a way to pass an absolute path to our custom theme so that it can find our file. That's why we need `path.join` and `process.cwd`.



## Further Reading

Here are a few awesome reads I think you'll appreciate if you want to get started with Nuxt Content or understand more:

- [Creating a blog using Nuxt and Nuxt Content with TailwindCSS](https://miracleio.me/blog/Creating-a-blog-using-Nuxt-and-Nuxt-Content---with-TailwindCSS)
-  [Create a blog with Nuxt Content](https://nuxtjs.org/blog/creating-blog-with-nuxt-content)
- [Nuxt Content documentation](https://content.nuxtjs.org/)
- [Highlight your website's code blocks with VSCode - Miguel Piedrafita](https://miguelpiedrafita.com/vscode-highlighting#commento-login-box-container)
- [Nuxt Content Configuration - Markdown Highlight](https://content.nuxtjs.org/configuration#markdownhighlighter)
- [shikijs/shiki: A beautiful Syntax Highlighter. (github.com)](https://github.com/shikijs/shiki)
- [shiki-themes - npm (npmjs.com)](https://www.npmjs.com/package/shiki-themes#yours)

Thanks for reading ✨