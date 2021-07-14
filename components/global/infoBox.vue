<template>
  <div class="info-box">
    <span>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="-2 -2 24 24" width="24" height="24"
        preserveAspectRatio="xMinYMin" class="icon jam jam-info">
        <path
          d="M10 20C4.477 20 0 15.523 0 10S4.477 0 10 0s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm0-10a1 1 0 0 1 1 1v5a1 1 0 0 1-2 0V9a1 1 0 0 1 1-1zm0-1a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
      </svg>
    </span>
    <span>
      <slot name="info-box"> Some information gets diaplayed here </slot>
    </span>
  </div>
</template>

<script>
  export default {
    name: 'infoBox'
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
