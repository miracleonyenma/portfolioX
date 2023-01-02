<script setup lang="ts">
const isChristmas = useIsChristmas();
const specialGreeting = useSpecialGreeting();
const snippetsPath = ref("/snippets");
// const snippetSlug = (path: string) => {
//   // replace "snippets/" with "blog"
//   return path.replace("articles", "blog");
// };
</script>
<template>
  <main>
    <header class="articles-page-header page-header">
      <div class="wrapper">
        <span class="py-4" v-if="specialGreeting"> {{ specialGreeting }} </span>
        <h1 class="font-heading font-bold text-4xl lg:text-6xl">Snippets</h1>
        <p class="description text-xl pt-2">
          Short code snippets that I've found useful.
        </p>
      </div>
    </header>
    <section class="articles-list-section site-section">
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
              'createdAt',
              'formattedCreatedAt',
              'updatedAt',
              'formattedUpdatedAt',
              'gitCreatedAt',
              'formattedGitCreatedAt',
              'gitUpdatedAt',
              'formattedGitUpdatedAt',
              'fileCreatedAt',
              'formattedFileCreatedAt',
              'fileUpdatedAt',
              'formattedFileUpdatedAt',
            ],
            $sensitivity: 'base',
            sort: [
              { createdAt: -1 },
              // { gitUpdatedAt: -1 },
              // { fileUpdatedAt: -1 },
              // { updatedAt: -1 },
            ],
          }"
        >
          <!-- Default list slot -->
          <template v-slot="{ list }">
            <ul class="articles-list">
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
