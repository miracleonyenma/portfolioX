<template>
  <main>
    <section>
      <article class="article" data-page-trans="children">
        <!-- Our custom injected variables specified with the The YAML front matter goes here  -->
        <header class="article-header hero-header" data-page-trans="children">
          <div class="img-cont">
            <img
              :src="getCoverImg(article.coverUrl)"
              :alt="article.title"
              @error="setFallBackImg"
            />
          </div>

          <div class="wrapper py-12">
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
              <span class="mr-2"
                >Posted: {{ formatDate(article.createdAt) }}</span
              >
              <span>Updated: {{ formatDate(article.updatedAt) }}</span>
              <br />
              <span class="font-bold"> {{ article.readingStats.text }} </span>
            </div>
          </div>
        </header>

        <toc
          class="article-toc prose lg:prose-xl dark:prose-dark mb-4"
          :toc="article.toc"
        >
          <h2 slot="heading">What we'll cover</h2>
        </toc>

        <!-- this is where we will render the article contents -->
        <nuxt-content
          class="article-content prose lg:prose-xl dark:prose-dark m-auto"
          :document="article"
        />

        <footer class="mt-12 mb-6 p-4 text-center ">
          <!-- <em> -->
            Any feedback? Shoot me a mail at
            <a href="mailto:miracleiodev@gmail.com">
              <b> miracleiodev@gmail.com </b>
            </a>
          <!-- </em> -->
        </footer>
      </article>
    </section>

    <!-- Pass the data to the component props -->
    <prev-next :prev="prev" :next="next" class="sect-wrapper w-full border dark:border-gray-800 rounded-lg"></prev-next>
  </main>
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
    getCoverImg(coverUrl) {
      let local = require(`~/assets/img/articles/${coverUrl}`)
      console.log('LOCAL', local)
      return local
    },
    async setFallBackImg(e) {
      let src
      try {
        src = (
          await fetch(
            'https://covergen-api.herokuapp.com/screenshot/miracleio.me',
            {
              method: 'POST',
              body: JSON.stringify({
                targetURL: 'https://cover-gen.netlify.app/',
                document: {
                  title: this.article.title,
                  description: this.article.description,
                  updatedAt: this.article.updatedAt,
                  slug: this.article.slug,
                },
              }),
            }
          )
        ).url
      } catch (error) {
        console.log('Errrrrrrrrr', error)
        src = await require(`~/assets/img/articles/hello/cover.png`)
      }

      console.log('SRCCCCC', src)
      e.target.src = src
    },
  },

  computed: {},

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
          content: this.getCoverImg(this.article.coverUrl),
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
          content: this.getCoverImg(this.article.coverUrl),
        },
      ],
    }
  },
}
</script>

<style scoped>
@import url('~/assets/css/slug.css');
</style>
