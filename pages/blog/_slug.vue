<template>
  <section>
    <article class="article" data-page-trans="children">
      <!-- Our custom injected variables specified with the The YAML front matter goes here  -->
      <header class="article-header hero-header" data-page-trans="children">
        <h1>{{ article.title }}</h1>
        <p>{{ article.description }}</p>

        <!-- container for article details -->
        <div class="details-cont">
          <ul id="article-tags">
            <li v-for="tag in article.tags" :key="tag" class="tag">
              {{ tag }}
            </li>
          </ul>

          <!-- the format date function converts the default date to a readable form -->
          <span>Posted: {{ formatDate(article.createdAt) }}</span>
          <span>Updated: {{ formatDate(article.updatedAt) }}</span>
          <br>
          <span class="font-bold"> {{ article.readingStats.text }} </span>
        </div>
      </header>

      <toc class="prose lg:prose-xl dark:prose-dark" :toc="article.toc">
        <h2 slot="heading">What we'll cover</h2>
      </toc>

      <!-- this is where we will render the article contents -->
      <nuxt-content class="prose lg:prose-xl dark:prose-dark" :document="article" />
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
          hid: 'title',
          name: 'title',
          content: this.article.title,
        },
        {
          hid: 'description',
          name: 'description',
          content: this.article.description,
        },
        {
          hid: 'author',
          name: 'author',
          content: 'Miracleio',
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content: [...this.article.tags],
        },

        //Open Graph
        {
          hid: 'og-type',
          property: 'og:type',
          content: 'website',
        },
        {
          hid: 'og-url',
          property: 'og:url',
          content: `https://miracleio.me/blog/${this.article.slug}`,
        },
        {
          hid: 'og-title',
          property: 'og:title',
          content: `${this.article.title}`,
        },
        {
          hid: 'og-description',
          property: 'og:description',
          content: `${this.article.description}`,
        },
        {
          hid: 'og-image',
          property: 'og:image',
          content: require(`~/assets/img/articles/${this.article.slug}/cover.png`),
        },

        //Twitter
        {
          hid: 'twitter-card',
          property: 'twitter:card',
          content: 'summary_large_image',
        },
        {
          hid: 'twitter-url',
          property: 'twitter:url',
          content: `https://miracleio.me/blog/${this.article.slug}`,
        },
        {
          hid: 'twitter-title',
          property: 'twitter:title',
          content: `${this.article.title}`,
        },
        {
          hid: 'twitter-description',
          property: 'twitter:description',
          content: `${this.article.description}`,
        },
        {
          hid: 'twitter-image',
          property: 'twitter:image',
          content: require(`~/assets/img/articles/${this.article.slug}/cover.png`),
        },
      ],
    }
  },
}
</script>

<style scoped>
@import url('~/assets/css/slug.css');
</style>