<template>
  <button
    class="dark-mode"
    :class="{ active: theme.mode === 'dark' }"
    @click="toggle()"
  >
    <div class="wrapper">
      <feather-icon name="sun" />
      <feather-icon name="moon" />
    </div>
  </button>
</template>

<script>
export default {
  data() {
    return {
      theme: {
        mode: '',
      },
      clickSound: '',
    }
  },

  watch: {
    theme: {
      deep: true,

      handler(data) {
        let htmlClsLst = document.documentElement.classList
        let { mode } = data

        mode === 'dark' ? htmlClsLst.add('dark') : htmlClsLst.remove('dark')
        localStorage.theme = JSON.stringify(data)
      },
    },
  },

  methods: {
    setTheme() {
      (!localStorage.theme &&
        window.matchMedia('(prefers-color-scheme: dark)').matches) ||
      (localStorage.theme && JSON.parse(localStorage.theme).mode === 'dark')
        ? (this.theme.mode = 'dark')
        : (this.theme.mode = 'light')

      localStorage.theme = JSON.stringify(this.theme)
    },

    toggle() {
      this.theme.mode === 'dark'
        ? (this.theme.mode = 'light')
        : (this.theme.mode = 'dark')

        this.clickSound.play()
    },
  },

  mounted() {
    this.setTheme()
    this.clickSound = new Audio('/audio/mixkit-classic-click-1117.mp3')
  },
}
</script>

<style scoped>
@import url('~/assets/css/themeControl.css');
</style>