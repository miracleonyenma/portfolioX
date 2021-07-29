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
	  { hid: 'google-site-verification', name: 'google-site-verification', content: 'hRt_nx15rRTqJoV-b8mjBMKM3uH5ONJLM_qAfmXTni0'}
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
    '@/assets/scss/tailwind.css',
    '@/assets/scss/main.scss',
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
    'content:file:beforeInsert': (document) => {
      if (document.extension === ".md") {
        const stats = require('reading-time')(document.text)

        document.readingStats = stats
        console.log(stats)
      }
    }
  },

  // Content module configuration: https://go.nuxtjs.dev/config-content
  content: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
