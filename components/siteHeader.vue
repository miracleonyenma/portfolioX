<template>
  <header id="site-header" class="site-header">
    <div class="wrapper">
      <nuxt-link to="/">
        <logo class="relative z-20">
          <h1 slot="logo-text" class="dark:text-gray-100">Miracleio</h1>
        </logo>
      </nuxt-link>

      <site-nav />

      <theme-control />
    </div>
  </header>
</template>

<script>
import FeatherIcon from './featherIcon.vue'
import siteNav from './siteNav.vue'
import ThemeControl from './themeControl.vue'
export default {
  components: { siteNav, FeatherIcon, ThemeControl },
}
</script>

<style scoped>
@import url('~/assets/css/siteHeader.css');
</style>