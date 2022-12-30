<script setup>
import { ArrowDownIcon } from "@heroicons/vue/24/solid/index";
</script>
<template>
  <a class="scroll-to-button" href="#bottom-of-page">
    <button class="cta">
      <ArrowDownIcon class="icon" />
    </button>
  </a>
</template>
<style scoped>
.scroll-to-button {
  @apply fixed bottom-16 right-0 p-8 pb-14;
}
</style>
