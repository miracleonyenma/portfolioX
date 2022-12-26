<script setup lang="ts">
const { src, alt } = defineProps({
  src: {
    type: String,
    required: true,
  },
  alt: {
    type: String,
    required: true,
  },
});
</script>
<template>
  <figure class="article-img not-prose">
    <div class="img-cont">
      <img :src="src" :alt="alt" />
    </div>
    <figcaption class="caption">
      {{ alt }}
    </figcaption>
  </figure>
</template>
<style scoped>
img {
  @apply rounded-lg;
}
.caption {
  @apply italic text-sm text-center mt-2;
}
</style>
