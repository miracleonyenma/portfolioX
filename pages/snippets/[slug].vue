<script setup>
const route = useRoute();
const slug = ref(route.params.slug);

const { data, error } = await useAsyncData(
  `snippet-${slug.value}`,
  async () => {
    const article = queryContent("snippets", route.params.slug).findOne();
    // get the surround information,
    // which is an array of documeents that come before and after the current document
    let surround = await queryContent()
      .only(["_path", "title", "description"])
      .sort({ date: 1 })
      .findSurround(`/snippets/${slug.value}`);

    // replace "articles/" with "blog/" in surround paths
    // surround = surround.map((doc) => {
    //   doc._path = doc._path.replace("articles", "blog");
    //   return doc;
    // });

    return { article: await article, surround: surround };
  }
);

console.log({ data: data.value, error: error.value });
</script>
<template>
  <main>
    <ArticlePage :article="data.article" />
    <div class="max-w-6xl m-auto p-4 py-12">
      <PrevNext :prev="data.surround[0]" :next="data.surround[1]" />
    </div>
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
