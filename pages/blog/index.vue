<template>
  <main class="blog">
    <div class="sect-wrapper">
      <header class="hero-header blog-header">
        <h1>
          Hello 👋🏾, <br />
          It's nice you're here. Welcome.
        </h1>
        <p>
          Have a look what I've been spending hours behind the screen writing
          about
        </p>
      </header>

      <ul class="articles">
        <li class="article" v-for="article of articles" :key="article.slug">
          <nuxt-link
            :to="{ name: 'blog-slug', params: { slug: article.slug } }"
          >
            <h2>{{ article.title }}</h2>
            <p>{{ article.description }}</p>
          </nuxt-link>
          <div class="details-cont">
            <span>{{ formatDate(article.createdAt) }}</span>
            <span>Last updated: {{ formatDate(article.updatedAt) }}</span>
          </div>
        </li>
      </ul>
    </div>
  </main>
</template>

<script>
export default {
  async asyncData({ $content }) {
    const articles = await $content('articles')
      .only(['title', 'slug', 'createdAt', 'updatedAt', 'description'])
      .sortBy('updatedAt', 'desc')
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

<style lang="scss" scoped>
@layer base {
  .blog {
    .sect-wrapper {
      @apply p-4 mt-6 lg:mt-8 m-auto max-w-xl lg:max-w-3xl;
    }
  }

  .blog-header {
    @apply mb-12 pb-8 lg:mb-16;

    // h1 {
    //   @apply mb-0;
    // }
  }

  .articles {
    .article {
      @apply prose lg:prose-xl;
      @apply pl-0 py-2 list-none;


      h2, p{
        @apply mb-0;
      }
    }
  }

  .details-cont{
    span{
      @apply mr-2;
    }
  }
}
</style>