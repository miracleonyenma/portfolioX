<template>
  <div class="info-box">
    <feather-icon name="info" />
    <span>
      <slot name="info-box"> Some information gets diaplayed here </slot>
    </span>
  </div>
</template>

<script>
import featherIcon from '../featherIcon.vue'
export default {
  components: { featherIcon },
  name: 'infoBox',
}
</script>

<style scoped>
@layer components {
  .icon {
    @apply text-gray-800;
  }

  .info-box {
    @apply flex gap-4 items-start p-6 bg-blue-200 dark:bg-gray-900 border-blue-500 dark:border-gray-700 text-gray-800 border-l-4 rounded-md;
  }

  .info-box span {
    @apply text-gray-800 dark:text-gray-100;
  }
}
</style>
