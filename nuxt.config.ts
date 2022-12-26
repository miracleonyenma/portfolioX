// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  content: {
    highlight: {
      theme: {
        // Default theme (same as single string)
        default: "material-ocean",
      },
    },
  },
  css: ["~/assets/css/main.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  modules: ["@nuxt/content"],
});
