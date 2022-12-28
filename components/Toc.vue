<script setup lang="ts">
import { ListBulletIcon } from "@heroicons/vue/24/solid/index";

// define links prop
defineProps({
  links: {
    type: Array,
    required: true,
  },
});

const inactive = ref(false);

// flatten TOC links nested arrays to one array
const flattenLinks = (links: any[]) => {
  console.log({ links });

  let _links = links
    .map(
      (link: {
        id: string | number | symbol | undefined;
        depth: any;
        text: any;
        children: any;
      }) => {
        let _link = [link];
        if (link.children) {
          let flattened = flattenLinks(link.children);
          _link = [link, ...flattened];
        }
        return _link;
      }
    )
    .flat(1);
  console.log({ _links });
  return _links;
};
</script>

<template>
  <button @click="inactive = !inactive" class="cta mb-4 lg:hidden">
    <ListBulletIcon class="icon" />
  </button>

  <nav class="toc" :class="{ inactive }">
    <header class="toc-header">
      <div class="wrapper flex items-center gap-3">
        <h3 class="text-xl font-bold">Table of Contents</h3>
      </div>
    </header>
    <ul class="toc-links">
      <!-- render each link with depth class -->
      <li
        v-for="link of flattenLinks(links)"
        :key="link.id"
        :class="`toc-link _${link.depth}`"
      >
        <a :href="`#${String(link.id)}`">
          {{ link.text }}
        </a>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
.toc {
  @apply p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg;
  @apply max-h-[calc(100vh-9rem)] overflow-auto;
  @apply transition-all;
}

@media (max-width: 1024px) {
  .toc.inactive {
    @apply scale-75 -translate-y-12 origin-top-left p-0 h-0 opacity-0 invisible pointer-events-none overflow-hidden;
  }
}

.toc-header {
  @apply pb-4 mb-4 border-b border-slate-200 dark:border-slate-700;
}
.toc-links {
  @apply flex flex-col gap-2 px-2;
}
.toc-link {
  @apply text-slate-500 dark:text-slate-100 hover:underline;
}
.toc-link._3 {
  @apply pl-3;
}
.toc-link._4 {
  @apply pl-6;
}
.toc-link._undefined {
  @apply pl-8;
}
</style>
