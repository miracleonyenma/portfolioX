<script setup lang="ts">
const { article } = defineProps({
  article: {
    type: Object,
    required: true,
  },
});

const coverImg = ref<HTMLImageElement | null>(null);

console.log({ article });

const useFallbackImg = () => {
  if (coverImg.value) {
    coverImg.value.src = article.coverUrl || article.coverPath;
  }
};
</script>
<template>
  <article class="article max-w-7xl m-auto">
    <header class="article-header">
      <div class="cover-img img-cont">
        <img
          ref="coverImg"
          :src="`/assets/img${article._path}/cover.png`"
          :alt="article.title"
          @error="useFallbackImg"
        />
      </div>
      <div class="wrapper max-w-5xl m-auto">
        <h1 class="title font-heading font-bold text-4xl lg:text-6xl mb-2">
          {{ article.title }}
        </h1>
        <p class="description text-xl pt-2">{{ article.description }}</p>
        <ul class="tags py-4">
          <li v-for="tag in article.tags" :key="tag" class="tag">
            <span>
              {{ tag }}
            </span>
          </li>
        </ul>
        <ArticleDetails :article="article" :options="{ showAvatar: true }" />
      </div>
    </header>
    <hr class="article-hr" />
    <ContentRenderer
      class="prose md:prose-lg prose-headings:font-heading prose-headings:!font-bold dark:prose-invert p-4 py-8 lg:p-8 lg:py-12 max-w-4xl m-auto"
      :value="article"
    >
      <template #empty>
        <p>No content found.</p>
      </template>
    </ContentRenderer>
  </article>
</template>
<style scoped>
.article {
  @apply px-4;
}

/* .cover-img {
  @apply shadow-2xl;
} */

.cover-img img {
  @apply max-h-96;
}

.img-cont img {
  @apply rounded-xl  lg:rounded-t-none lg:rounded-b-3xl shadow-2xl;
}

.article-header > .wrapper {
  @apply py-8 lg:py-12;
}

.details {
  @apply flex pt-4 lg:pt-8 gap-4 justify-between;
}

.detail-item {
  @apply flex items-start md:items-center gap-2 font-heading font-semibold text-xs;
}

.detail-group {
  @apply flex items-center flex-wrap gap-4 gap-y-2;
}

.article-hr {
  @apply border border-slate-200 dark:border-slate-800 max-w-5xl m-auto;
}
</style>
