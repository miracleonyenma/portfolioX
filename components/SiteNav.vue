<script setup lang="ts">
import { Bars2Icon, Bars3Icon } from "@heroicons/vue/24/solid/index";
const navActive = ref(false);
const toggleNav = () => {
  navActive.value = !navActive.value;
};
</script>
<template>
  <nav class="site-nav" :class="{ active: navActive }">
    <div class="wrapper">
      <ul class="links">
        <li class="link">
          <NuxtLink to="/blog">Blog</NuxtLink>
        </li>
        <li class="link">
          <NuxtLink to="/">Snippets</NuxtLink>
        </li>
      </ul>
    </div>
  </nav>
  <div class="site-nav-action-cont">
    <button @click="toggleNav" class="site-nav-btn cta bg-slate-50 dark:bg-slate-900 py-2 shadow-lg">
      <Bars3Icon class="icon w-6 h-6" />
    </button>
  </div>
</template>
<style scoped>
.site-nav {
  @apply fixed top-0 left-0 w-full h-screen bg-slate-50 dark:bg-slate-800;
  @apply lg:relative lg:w-auto lg:h-auto lg:bg-transparent;

  @apply invisible opacity-0 pointer-events-none;
  @apply lg:visible lg:opacity-100 lg:pointer-events-auto;
}
.site-nav.active {
  @apply visible opacity-100 pointer-events-auto;
}

.site-nav > .wrapper {
  @apply flex flex-col justify-end h-full p-8 py-32;
  @apply flex lg:flex-row lg:h-auto lg:p-0;
}

.links {
  @apply flex flex-col gap-4 text-right;
  @apply lg:flex lg:flex-row lg:gap-4 lg:text-left;
}

.link {
  @apply font-extrabold text-5xl;
  @apply lg:font-medium lg:text-base;
}

.link > a {
  @apply text-slate-400 hover:text-slate-800 dark:text-slate-500 dark:hover:text-slate-100;
}

.link > a.router-link-active {
  @apply text-slate-800 dark:text-slate-100;
}

.site-nav-action-cont {
  @apply fixed bottom-0 right-0 p-8 pb-14;
  @apply lg:hidden;
}
</style>
