<template>
  <div class="loading-bar" :class="{ err: err, loading: loading }"></div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      loaded: false,
      err: false,
      increaseNum: 50,
    }
  },
  methods: {
    start() {
      this.loading = true
      this.loaded = false
    },
    finish() {
      this.loading = false
      this.loaded = true
    },

    fail(err) {
      console.warn(err)
      this.err = true
    },
  },
}
</script>

<style scoped>
@layer components {
  .loading-bar {
    @apply fixed h-2 w-0 left-0 rounded-b-sm bg-gradient-to-r from-blue-300 to-purple-900 z-20;
  }
  .loading {
    -webkit-animation: load 3s cubic-bezier(0.4, 0, 0.2, 1) infinite;
    animation: load 3s cubic-bezier(0.4, 0, 0.2, 1) infinite;
  }
  .loaded {
    @apply w-full;
  }
  .err {
    @apply w-full bg-red-600;
  }
  @-webkit-keyframes load {
    0% {
      @apply left-0 w-0;
      right: unset;
    }
    50% {
      @apply left-0 w-full;
      right: unset;
    }
    51% {
      @apply right-0 w-full;
      left: unset;
    }
    100% {
      @apply right-0 w-0;
      left: unset;
    }
  }
  @keyframes load {
    0% {
      @apply left-0 w-0;
      right: unset;
    }
    50% {
      @apply left-0 w-full;
      right: unset;
    }
    51% {
      @apply right-0 w-full;
      left: unset;
    }
    100% {
      @apply right-0 w-0;
      left: unset;
    }
  }
}
</style>