<template>
  <section class="blog">
    <header class="blog-header">
      <h1>It's nice you're here. Welcome.</h1>
      <p>
        Have a look what I've been spending hours behind the screen writing
        about
      </p>
    </header>

    <ul class="articles">
      <li class="article" v-for="article of articles" :key="article.slug">
        <nuxt-link :to="{ name: 'blog-slug', params: { slug: article.slug } }">
          <h2>{{ article.title }}</h2>
          <p>{{ article.description }}</p>

          <div class="details-cont">
            <span>{{ formatDate(article.updatedAt) }}</span>
          </div>
        </nuxt-link>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  async asyncData({ $content }) {
    const articles = await $content('articles')
      .only(['title', 'slug', 'updatedAt', 'description'])
      .sortBy('createdAt', 'asc')
      .fetch()

    return { articles }
  },

  methods: {
    formatDate(date) {
      // format the date to be displayed in a readable format
      return new Date(date).toLocaleDateString('en', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    },
  },
}
</script>

<style scoped>
@layer base {
  .blog {
    @apply p-4 mt-6 lg:mt-8 m-auto lg:max-w-3xl;
  }

  .blog-header {
    @apply prose lg:prose-xl;
    @apply mb-12 pb-8 lg:mb-16;
  }

  .blog-header h1 {
    @apply mb-0;
  }

  .articles .article {
    @apply prose lg:prose-lg;
    @apply pl-0 py-2 list-none;
  }

  .articles .article h2 {
    @apply mb-0;
  }
}
</style>