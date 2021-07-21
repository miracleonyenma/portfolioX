<template>
  <div class="loading-bar" :class="{ err: err, loading: loading }"></div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      err: false,
      increaseNum: 50,
    }
  },
  methods: {
    start() {
      this.loading = true
    },
    finish() {
      this.loading = false
    },

    fail(err) {
      console.warn(err)
      this.err = true
    },
  },
}
</script>

<style lang="scss" scoped>
@layer components {
  .loading-bar {
    @apply fixed h-2 w-0 left-0 rounded-b-sm bg-gradient-to-r from-blue-300 to-purple-900 z-20;
  }

  .loading {
    animation: load 0.35s cubic-bezier(0.4, 0, 0.2, 1) infinite;
  }

  .err{
      @apply w-full bg-red-600;
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