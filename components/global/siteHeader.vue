<template>
  <header id="site-header" class="site-header">
    <div class="wrapper">
      <nuxt-link to="/">
        <logo>
          <h1 slot="logo-text" class="dark:text-gray-50">Miracleio</h1>
        </logo>
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
import Logo from '../Logo.vue'
export default {}
</script>

<style scoped>
@layer components {
  .site-header {
    @apply w-auto p-4 py-4 sticky top-0 bg-gray-50 bg-opacity-70 dark:bg-gray-900 dark:bg-opacity-70 backdrop-filter backdrop-blur-md z-20;
    @apply border-2 border-gray-50 border-opacity-20 dark:border-gray-900 dark:border-opacity-20 bg-clip-padding;
  }
  .site-header .wrapper {
    @apply m-auto max-w-5xl flex items-center justify-between;
  }
}
</style>