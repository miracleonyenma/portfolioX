<template>
  <button class="toggler" @click="toggle()">
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
      clickSound: '',
    }
  },

  methods: {
    toggle() {
      this.$nuxt.$emit('toggle-theme')
      this.clickSound.play()
    },
  },

  beforeMount() {
    this.clickSound = new Audio('/audio/mixkit-classic-click-1117.mp3')
  },
}
</script>

<style scoped>
@import url('~/assets/css/themeControl.css');
</style>