<template>
  <section>
    <article class="article" data-page-trans="children">
      <!-- Our custom injected variables specified with the The YAML front matter goes here  -->
      <header class="article-header hero-header" data-page-trans="children">
        <h1>{{ article.title }}</h1>
        <p>{{ article.description }}</p>

        <!-- container for article details -->
        <div class="details-cont">
          <!-- the format date function converts the default date to a readable form -->
          <span>Posted: {{ formatDate(article.createdAt) }}</span>
          <span>Last updated: {{ formatDate(article.updatedAt) }}</span>
          <br>
          <span> {{article.readingStats.text}} </span>
        </div>
      </header>

      <toc class="prose lg:prose-xl" :toc="article.toc">
        <h2 slot="heading"> What we'll cover </h2>
      </toc>

      <!-- this is where we will render the article contents -->
      <nuxt-content class="prose lg:prose-xl" :document="article" />
    </article>

    <!-- Pass the data to the component props -->
    <prev-next :prev="prev" :next="next" class="sect-wrapper"></prev-next>
  </section>
</template>

<script>
import toc from '~/components/global/toc.vue'
export default {
  components: { toc },
  async asyncData({ $content, params }) {
    const article = await $content('articles', params.slug).fetch()

    // assign the first two objects in returned array to prev & next constant variables
    const [prev, next] = await $content('articles')
      // fetch only the title and slug from the articles
      .only(['title', 'slug', 'updatedAt'])
      // sortby time updated, in ascending order
      .sortBy('updatedAt', 'desc')
      // get the correct slug
      .surround(params.slug)
      // fetch data
      .fetch()

    // return the data to be vailable for use in the file
    return { article, prev, next }
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
  head() {
    return {
      title: this.article.title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.article.description,
        },
        {
          hid: 'authour',
          name: 'author',
          content: 'Miracleio',
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content: [...this.article.tags]
        },
      ],
    }
  },
}
</script>

<style scoped>
@layer components {
  .article {
    @apply p-4 mt-6 lg:mt-8 m-auto max-w-xl lg:max-w-3xl;
  }

  .article-header {
    @apply mb-12 pb-4 lg:mb-16 border-gray-200 border-b-2;

    h1 {
      @apply mb-2;
    }
  }
}
</style>