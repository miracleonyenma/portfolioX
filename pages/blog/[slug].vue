<script setup>
import { ClockIcon } from "@heroicons/vue/24/solid/index";
const route = useRoute();
const slug = ref(route.params.slug);

const { data, error } = await useAsyncData(
  `article-${slug.value}`,
  async () => {
    const article = queryContent("articles", route.params.slug).findOne();
    // get the surround information,
    // which is an array of documeents that come before and after the current document
    let surround = await queryContent()
      .only(["_path", "title", "description"])
      .sort({ date: 1 })
      .findSurround(`/articles/${slug.value}`);

    // replace "articles/" with "blog/" in surround paths
    surround = surround.map((doc) => {
      doc._path = doc._path.replace("articles", "blog");
      return doc;
    });

    return { article: await article, surround: surround };
  }
);

console.log({ data: data.value, error: error.value });
</script>
<template>
  <main>
    <article class="article max-w-7xl m-auto">
      <header class="article-header">
        <div class="img-cont">
          <img
            src="https://miracleio.me/_nuxt/img/cover.2ace172.png"
            :alt="data.article.title"
          />
        </div>
        <div class="wrapper max-w-5xl m-auto">
          <h1 class="title font-heading font-bold text-4xl lg:text-6xl mb-2">
            {{ data.article.title }}
          </h1>
          <p class="description text-xl pt-2">{{ data.article.description }}</p>
          <ul class="tags py-4">
            <li v-for="tag in data.article.tags" :key="tag" class="tag">
              <span>
                {{ tag }}
              </span>
            </li>
          </ul>
          <div class="details">
            <span class="reading-time flex items-center gap-2">
              <ClockIcon class="icon" />
              <span>
                {{ data.article.readingTime?.text }}
              </span>
            </span>
          </div>
        </div>
      </header>
      <ContentRenderer
        class="prose dark:prose-invert p-4 lg:p-8 max-w-4xl m-auto"
        :value="data.article"
      >
        <template #empty>
          <p>No content found.</p>
        </template>
      </ContentRenderer>
    </article>

    <PrevNext :prev="data.surround[0]" :next="data.surround[1]" />
  </main>
</template>
<style scoped>
.article {
  @apply px-4;
}
.img-cont img {
  @apply rounded-xl  lg:rounded-t-none lg:rounded-b-3xl;
}

.article-header > .wrapper {
  @apply py-12;
}
</style>
