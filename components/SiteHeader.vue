<script setup lang="ts">
const a = ref(1);
</script>
<template>
  <header class="site-header">
    <div class="wrapper">
      <NuxtLink to="/">
        <SiteLogo>
          <template #logo-text>
            <h1 class="font-heading font-bold">Miracleio</h1>
          </template>
        </SiteLogo>
      </NuxtLink>
      <div class="content-cont">
        <slot></slot>
      </div>
    </div>
  </header>
</template>
<style scoped>
.site-header {
  @apply sticky lg:fixed top-0 left-0 w-full p-4 z-20;
}

.site-header > .wrapper {
  @apply flex items-center justify-between gap-4 p-3 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl max-w-6xl m-auto;
}

.site-header .content-cont {
  @apply flex items-center gap-4;
}
</style>
