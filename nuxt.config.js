// import axios from 'axios';
import { getHighlighter, loadTheme } from 'shiki';
import puppeteer from 'puppeteer';
import fs from 'fs';
// import { promises } from 'dns';
// import { join } from 'path';

export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Miracleio | PortfolioX',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Designer & Frontend Developer portfolio site. Built by Miracleio with love ❤' },
      { hid: 'google-site-verification', name: 'google-site-verification', content: 'hRt_nx15rRTqJoV-b8mjBMKM3uH5ONJLM_qAfmXTni0' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // loading bar config
  // loading: '~/components/loadingBar.vue',

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    // CSS file in the project
    '@/assets/css/tailwind.css',
    '@/assets/css/main.css',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: ['@nuxtjs/tailwindcss', '@nuxtjs/svg', '@nuxtjs/google-analytics'],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    //https://github.com/dword-design/nuxt-content-git
    'nuxt-content-git',
    // https://go.nuxtjs.dev/content
    '@nuxt/content',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      name: 'Miracleio | PortfolioX',
      description: 'Designer & Frontend Developer portfolio site. Built by Miracleio with love ❤',
      lang: 'en',
    }
  },

  googleAnalytics: {
    id: 'UA-202968570-1', // Use as fallback if no runtime config is provided
  },

  // Add readingTime to document before rendering: https://content.nuxtjs.org/advanced#contentfilebeforeinsert
  hooks: {
    'content:file:beforeInsert': async (document) => {
      if (document.extension === ".md") {
        const stats = require('reading-time')(document.text)

        document.readingStats = stats
        console.log(stats)
      }

      const url = process.env.COVER_GEN_URL || 'http://localhost:3000';

      console.log(url);

      const browser = await puppeteer.launch();

      const page = await browser.newPage();

      await page.setViewport({
        width: 1200,
        height: 628,
        deviceScaleFactor: 1
      })

      try {
        await page.goto(url);

        const formCont = await page.waitForSelector("#form-cont", {
          hidden: true
        })

        const h1 = await page.waitForSelector("#content h1")

        await h1.click()

        const titleInput = await page.waitForSelector("#title")
        const descInput = await page.waitForSelector("#description")
        const dateInput = await page.waitForSelector("#updatedAt")

        await titleInput.type(`${document.title}`)
        await descInput.type(`${document.description}`)
        await dateInput.type(`${document.updatedAt}`)

        console.log('titleInput', await titleInput.evaluate(x => {
          return x.value
        }));
        console.log('descInput', await descInput.evaluate(x => {
          return x.value
        }));
        console.log('dateInput', await dateInput.evaluate(x => {
          return x.value
        }));

        await h1.click();

        try {
          await fs.promises.access(`./assets/img/articles/${document.slug}/cover.png`)
        } catch (error) {
          console.log(error);

          try {
            await fs.promises.mkdir(`./assets/img/articles/${document.slug}`)
          } catch (err) {
            console.log(err, 'unable to create path');
          }
        }

        await page.screenshot({
          path: `./assets/img/articles/${document.slug}/cover.png`
        })

        document.coverUrl = `${document.slug}/cover.png`

      } catch (err) {
        console.log('unable to generate image', err)
      }

      await browser.close()
    }
  },

  // Content module configuration: https://go.nuxtjs.dev/config-content
  content: {
    markdown: {
      async highlighter() {
        // const t = await loadTheme(join(process.cwd(), './custom-themes/ayu-dark.json'))
        const highlighter = await getHighlighter({

          theme: 'material-ocean',
          // theme: t
        })

        return (rawCode, lang) => {
          return highlighter.codeToHtml(rawCode, lang)
        }
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },

  // serverMiddleware: [{ path: '/hello', handler: '~/server-middleware/hello.js' }]
}
