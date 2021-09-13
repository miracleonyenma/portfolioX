<template>
  <button
    class="dark-mode"
    :class="{ active: darkMode }"
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
      darkMode: false,
      clickSound : ""
    }
  },

  watch: {
    darkMode(status) {
      let htmlClsLst = document.documentElement.classList;

      status ? htmlClsLst.add('dark') : htmlClsLst.remove('dark')
      localStorage.darkMode = status
    },
  },

  methods: {
    setTheme() {
      localStorage.darkMode ||
      (!localStorage.darkMode &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
        ? (this.darkMode = true)
        : (this.darkMode = false)
    },

    async toggle(){
        this.darkMode = !this.darkMode;
        let played = await this.clickSound.play()
        console.log(played);
    }
  },

  mounted() {
      this.setTheme();
      this.clickSound = new Audio('/audio/mixkit-classic-click-1117.mp3')
  },
}
</script>

<style scoped>
@import url('~/assets/css/themeControl.css');
</style>