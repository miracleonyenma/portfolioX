<template>
  <footer id="site-footer" class="site-footer">
    <div class="wrapper">
      <div class="top-cont">
        <header>
          <logo :showText="true" class="relative mb-2">
            <h1 slot="logo-text" class="text-xl font-bold dark:text-gray-100">
              Miracleio
            </h1>
          </logo>
          Have a great {{ getGreeting() }}!
        </header>
        <SpotifyNow />
      </div>
      <hr class="border-gray-800 my-12" />
      <div class="links-group">
        <div class="group site-group">
          <h3 class="heading">Site</h3>
          <ul class="links">
            <li class="link" title="Home">
              <nuxt-link to="/">Home</nuxt-link>
            </li>
            <li class="link" title="Blog">
              <nuxt-link to="/blog">Blog</nuxt-link>
            </li>
          </ul>
        </div>
        <div class="group socials-group">
          <h3 class="heading">Socials</h3>
          <ul class="links">
            <li class="link" title="Twitter">
              <a
                class="icon"
                href="https://twitter.com/miracleio"
                target="twitter"
              >
                Twitter
              </a>
            </li>
            <li class="link" title="GitHub">
              <a
                class="icon"
                href="https://github.com/miracleonyenma"
                target="github"
              >
                GitHub
              </a>
            </li>
            <li class="link" title="Dribbble">
              <a
                class="icon"
                href="https://dribbble.com/miracleio"
                target="dribble"
              >
                Dribbble
              </a>
            </li>
          </ul>
        </div>
      </div>
      <p class="py-12">Miracleio &copy; {{ new Date().getFullYear() }}</p>
    </div>
  </footer>
</template>

<script>
import SpotifyNow from './SpotifyNow.vue'
export default {
  methods: {
    getGreeting() {
      let hour = new Date().getHours()
      console.log(hour)
      if (hour < 7) return 'morning, Early bird'
      else if (hour < 12) return 'morning'
      else if (hour < 18) return 'afternoon'
      else return 'evening'
    },
  },
  components: { SpotifyNow },
}
</script>

<style scoped>
@import url('~/assets/css/siteFooter.css');
</style>
