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