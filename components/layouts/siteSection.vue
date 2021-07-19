<template>
  <section class="site-section">
      <slot name="site-section">

      </slot>
  </section>
</template>

<script>
export default {

}
</script>

<style scoped>
@layer components{
    .site-section{
        @apply p-4 lg:p-6
    }
}
</style>