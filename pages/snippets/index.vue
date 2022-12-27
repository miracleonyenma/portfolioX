<script setup lang="ts">
import { useIsChristmas } from "~~/composables/special-days/useChristmas";

const isChristmas = useIsChristmas();
const snippetsPath = ref("/snippets");
// const snippetSlug = (path: string) => {
//   // replace "snippets/" with "blog"
//   return path.replace("articles", "blog");
// };
</script>
<template>
  <main>
    <header class="articles-header page-header">
      <div class="wrapper">
        <span class="py-4" v-if="isChristmas"> Merry Christmas! 🎄 </span>
        <h1 class="font-heading font-bold text-4xl lg:text-6xl">Snippets</h1>
        <p class="description text-xl pt-2">
          Short code snippets that I've found useful.
        </p>
      </div>
    </header>
    <section class="site-section">
      <div class="wrapper">
        <!-- Render list of all articles in ./content/blog using `path` -->
        <!-- Provide only defined fieldsin the `:query` prop -->
        <ContentList
          path="/snippets"
          :query="{
            only: [
              'title',
              'description',
              'tags',
              '_path',
              'img',
              'readingTime',
              'author',
              'updatedAt',
              'formattedUpdatedAt',
            ],
            $sensitivity: 'base',
          }"
        >
          <!-- Default list slot -->
          <template v-slot="{ list }">
            <ul class="article-list">
              <li
                v-for="article in list"
                :key="article._path"
                class="list-item"
              >
                <NuxtLink :to="article._path">
                  <ArticleListItem :article="article" />
                </NuxtLink>
              </li>
            </ul>
          </template>
          <!-- Not found slot to display message when no content us is found -->
          <template #not-found>
            <p>No articles found.</p>
          </template>
        </ContentList>
      </div>
    </section>
  </main>
</template>
<style scoped>
.articles-header {
  @apply p-4 my-12 lg:mt-44;
}
.articles-header > .wrapper {
  @apply w-full max-w-4xl m-auto;
}
.article-list {
  @apply grid lg:grid-cols-1 gap-12 w-full max-w-3xl m-auto;
}
</style>
