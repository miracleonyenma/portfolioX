<template>
  <header id="site-header" class="site-header">
    <div class="wrapper">
      <nuxt-link to="/">
        <logo class="relative z-20">
          <h1 slot="logo-text" class="dark:text-gray-100">Miracleio</h1>
        </logo>
      </nuxt-link>

      <site-nav />

    </div>
  </header>
</template>

<script>
import siteNav from './siteNav.vue'
export default {
  components: { siteNav },}
</script>

<style scoped>
@layer components {
  .site-header {
    @apply w-auto p-4 py-4 sticky top-0 md:bg-gray-100 md:bg-opacity-70 md:dark:bg-gray-800 md:dark:bg-opacity-70 md:backdrop-filter md:backdrop-blur-md z-20;
    @apply md:border-2 md:border-gray-100 md:border-opacity-20 md:dark:border-gray-800 md:dark:border-opacity-20 md:bg-clip-padding;
  }
  .site-header .wrapper {
    @apply m-auto max-w-5xl flex items-center justify-between;
  }
}
</style>