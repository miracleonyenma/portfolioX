<template>
  <nav class="site-nav" :class="{ active: navActive }">
    <div class="nav-wrapper">
      <ul class="links">
        <!-- <li class="link">
          <nuxt-link to="/">Home</nuxt-link>
        </li> -->
        <li class="link">
          <nuxt-link to="/blog">Blog</nuxt-link>
        </li>
        <li class="link">
          <nuxt-link to="/snippets">Snippets</nuxt-link>
        </li>
      </ul>
    </div>

    <button
      class="nav-btn"
      :class="{ active: navActive }"
      @click="navActive = !navActive"
    ></button>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      navActive: false,
    }
  },
  watch: {
    $route() {
      this.navActive = false
    },
  },
}
</script>

<style scoped>
@import url('~/assets/css/siteNav.css');
</style>
