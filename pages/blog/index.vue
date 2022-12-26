<script setup lang="ts">
import { useIsChristmas } from "~~/composables/special-days/useChristmas";

const isChristmas = useIsChristmas();
const articlesPath = ref("/articles");
const articleSlug = (path: string) => {
  // replace "articles/" with "blog"
  return path.replace("articles", "blog");
};
</script>
<template>
  <main>
    <header class="articles-header page-header">
      <div class="wrapper">
        <span class="py-4" v-if="isChristmas"> Merry Christmas! 🎄 </span>
        <h1 class="font-heading font-bold text-4xl lg:text-6xl">
          Hey there, <br />
          Welcome to my blog!
        </h1>
        <p class="description text-xl pt-2">
          Have a look at what I've been spending hours behind a screen on. I
          hope you find some of them useful. Enjoy!
        </p>
      </div>
    </header>
    <section class="site-section">
      <div class="wrapper">
        <!-- Render list of all articles in ./content/blog using `path` -->
        <!-- Provide only defined fieldsin the `:query` prop -->
        <ContentList
          :path="articlesPath"
          :query="{
            only: ['title', 'description', 'tags', '_path', 'img'],
            $sensitivity: 'base',
          }"
        >
          <!-- Default list slot -->
          <template v-slot="{ list }">
            <ul class="article-list">
              <li
                v-for="article in list"
                :key="article._path"
                class="article-item"
              >
                <NuxtLink :to="article._path.replace('articles', 'blog')">
                  <article class="wrapper">
                    <header class="article-item-header">
                      <h2 class="font-heading text-2xl font-semibold underline">
                        {{ article.title }}
                      </h2>
                      <p>{{ article.description }}</p>
                      <ul class="tags">
                        <li
                          class="tag !py-0.5"
                          v-for="(tag, n) in article.tags"
                          :key="n"
                        >
                          {{ tag }}
                        </li>
                      </ul>
                    </header>
                  </article>
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

.article-item .article-item-header {
  @apply flex flex-col gap-2.5;
}
</style>
