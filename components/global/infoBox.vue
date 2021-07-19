<template>
  <div class="info-box">
    <span class="icon">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="feather feather-info"
      >
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="16" x2="12" y2="12"></line>
        <line x1="12" y1="8" x2="12.01" y2="8"></line>
      </svg>
    </span>
    <span>
      <slot name="info-box"> Some information gets diaplayed here </slot>
    </span>
  </div>
</template>

<script>
export default {
  name: 'infoBox',
}
</script>

<style scoped>
@layer components {
  .icon {
    @apply text-gray-800;
  }

  .info-box {
    @apply flex gap-4 items-start p-6 bg-blue-200 text-gray-800 border-blue-500 border-l-4 rounded-md;
  }

  .info-box span {
    @apply text-gray-800 leading-none;
  }
}
</style>
