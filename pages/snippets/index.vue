<template>
  <main class="blog">
    <div class="sect-wrapper" data-page-trans="children">
      <header class="hero-header blog-header">
        <h1>
          Snippets
        </h1>
        <p data-page-trans="self">
          Short articles and snippets.
        </p>
      </header>

      <ul class="articles">
        <li class="article" v-for="snippet of snippets" :key="snippet.slug">
          <nuxt-link
            :to="{ name: 'snippets-slug', params: { slug: snippet.slug } }"
          >
            <h2>{{ snippet.title }}</h2>
            <p>{{ snippet.description }}</p>
          </nuxt-link>
          <div class="details-cont">
            <ul id="article-tags">
              <li v-for="tag in snippet.tags" :key="tag" class="tag">
                {{ tag }}
              </li>
            </ul>

            <!-- the format date function converts the default date to a readable form -->
            <span>Posted: {{ formatDate(snippet.createdAt) }}</span>
            <span>Updated: {{ formatDate(snippet.updatedAt) }}</span>
            <span> {{ snippet.readingStats.text }} </span>
          </div>
        </li>
      </ul>
    </div>
  </main>
</template>

<script>
export default {
  async asyncData({ $content }) {
    const seo = {
      title: 'Miracleio | Blog',
      description:
        "Have a look what I've been spending hours behind the screen writing about",
      author: 'Miracleio',
      keywords: [
        'Miracleio Blog',
        'Frontend Developer Blog',
        'Nuxt Tutorials',
        'Vue Tutorials',
        'miracleonyenma blog',
        'Nigerian Frontend Developer',
      ],
      url: 'https://miracleio.me/blog',
    }

    const snippets = await $content('snippets')
      .only([
        'title',
        'slug',
        'createdAt',
        'updatedAt',
        'description',
        'readingStats',
        'tags',
      ])
      .sortBy('updatedAt', 'desc')
      .fetch()

    return { seo, snippets }
  },

  head() {
    return {
      title: this.seo.title,
      meta: [
        {
          hid: 'title',
          name: 'title',
          content: this.seo.title,
        },
        {
          hid: 'description',
          name: 'description',
          content: this.seo.description,
        },
        {
          hid: 'author',
          name: 'author',
          content: this.seo.author,
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content: [...this.seo.keywords],
        },
        //Open Graph
        {
          hid: 'og:type',
          property: 'og:type',
          content: 'website',
        },
        {
          hid: 'og:site_name',
          property: 'og:site_name',
          content: this.seo.title,
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content: this.seo.url,
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: this.seo.title,
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: this.seo.description,
        },
        //Twitter
        {
          hid: 'twitter:card',
          property: 'twitter:card',
          content: 'summary_large_image',
        },
        {
          hid: 'twitter:url',
          property: 'twitter:url',
          content: this.seo.url,
        },
        {
          hid: 'twitter:title',
          property: 'twitter:title',
          content: this.seo.title,
        },
        {
          hid: 'twitter:description',
          property: 'twitter:description',
          content: this.seo.description,
        },
      ],
    }
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
@import url('~/assets/css/blog.css');
</style>