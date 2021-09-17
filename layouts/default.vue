<template>
  <div>
    <site-header />
    <Nuxt />
    <site-footer />
  </div>
</template>

<script>
import { initTheme, setThemeClass } from '../components/themeModule/initTheme'
// theme.mode === 'dark' ? theme.mode = 'light' : theme.mode = 'dark'
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

        setThemeClass({ mode: mode, el: html, className: 'dark' })
        localStorage.theme = JSON.stringify(data)
      },
    },
  },

  methods: {
    toggle(){
      this.theme.mode === 'dark' ? this.theme.mode = 'light' : this.theme.mode = 'dark'
    }
  },

  beforeMount() {
    this.theme = initTheme().newTheme
    this.$nuxt.$on('toggle-theme', this.toggle)
  },
}
</script>