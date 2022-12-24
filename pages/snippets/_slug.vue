<template>
  <main>
    <section>
      <article class="article" data-page-trans="children">
        <!-- Our custom injected variables specified with the The YAML front matter goes here  -->
        <header class="article-header hero-header" data-page-trans="children">
          <div class="img-cont">
            <img
              :src="getCoverImg(snippet.coverUrl)"
              :alt="snippet.title"
              @error="setFallBackImg"
            />
          </div>

          <div class="wrapper py-12">
            <h1>{{ snippet.title }}</h1>
            <p>{{ snippet.description }}</p>

            <!-- container for snippet details -->
            <div class="details-cont">
              <ul id="article-tags">
                <li v-for="tag in snippet.tags" :key="tag" class="tag">
                  {{ tag }}
                </li>
              </ul>

              <!-- the format date function converts the default date to a readable form -->
              <span class="mr-2"
                >Posted: {{ formatDate(snippet.createdAt) }}</span
              >
              <span>Updated: {{ formatDate(snippet.updatedAt) }}</span>
              <br />
              <span class="font-bold"> {{ snippet.readingStats.text }} </span>
            </div>
          </div>
        </header>

        <div class="article-wrapper flex flex-col gap-4 lg:flex-row-reverse">
          <toc class="article-toc prose dark:prose-dark" :toc="snippet.toc">
            <h3 slot="heading">
              <span class="font-header font-black"> What we'll cover </span>
            </h3>
          </toc>

          <!-- this is where we will render the article contents -->
          <nuxt-content
            class="article-content prose lg:prose-xl dark:prose-dark"
            :document="snippet"
          />
        </div>

        <footer class="mt-12 mb-6 p-4 text-center">
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
    <prev-next :prev="prev" :next="next" class="sect-wrapper"></prev-next>
  </main>
</template>

<script>
import toc from '~/components/global/toc.vue'
export default {
  components: { toc },
  async asyncData({ $content, params }) {
    const snippet = await $content('snippets', params.slug).fetch()

    // assign the first two objects in returned array to prev & next constant variables
    const [prev, next] = await $content('snippets')
      // fetch only the title and slug from the snippets
      .only(['title', 'slug', 'updatedAt'])
      // sortby time updated, in ascending order
      .sortBy('updatedAt', 'desc')
      // get the correct slug
      .surround(params.slug)
      // fetch data
      .fetch()

    // return the data to be vailable for use in the file
    return { snippet, prev, next }
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
                  title: this.snippet.title,
                  description: this.snippet.description,
                  updatedAt: this.snippet.updatedAt,
                  slug: this.snippet.slug,
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
      title: this.snippet.title,
      meta: [
        {
          hid: 'title',
          name: 'title',
          content: this.snippet.title,
        },
        {
          hid: 'description',
          name: 'description',
          content: this.snippet.description,
        },
        {
          hid: 'author',
          name: 'author',
          content: 'Miracleio',
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content: [...this.snippet.tags],
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
          content: `https://miracleio.me/blog/${this.snippet.slug}`,
        },
        {
          hid: 'og-title',
          property: 'og:title',
          content: `${this.snippet.title}`,
        },
        {
          hid: 'og-description',
          property: 'og:description',
          content: `${this.snippet.description}`,
        },
        {
          hid: 'og-image',
          property: 'og:image',
          content: `https://miracleio.me${this.getCoverImg(
            this.snippet.coverUrl
          )}`,
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
          content: `https://miracleio.me/blog/${this.snippet.slug}`,
        },
        {
          hid: 'twitter-title',
          property: 'twitter:title',
          content: `${this.snippet.title}`,
        },
        {
          hid: 'twitter-description',
          property: 'twitter:description',
          content: `${this.snippet.description}`,
        },
        {
          hid: 'twitter-image',
          property: 'twitter:image',
          content: `https://miracleio.me${this.getCoverImg(
            this.snippet.coverUrl
          )}`,
        },
      ],
    }
  },
}
</script>

<style scoped>
@import url('~/assets/css/slug.css');
</style>
