<template>
  <div class="spotify">
    <feather-icon v-if="!isPlaying" name="spotify-2" class="" />
    <div v-else class="album-cover">
      <a :href="song.external_urls.spotify" target="_blank">
        <div class="img-cont">
          <img :src="song.album.images[0].url" alt="" class="album-cover" />
        </div>
      </a>
    </div>
    <div class="details">
      <div v-if="!isPlaying" class="not-playing flex gap-0.5 items-center">
        <h4>Not Playing</h4>
        <span>&ndash; Spotify</span>
      </div>
      <div v-else class="wrapper">
        <div class="album-details">
          <h3 class="song-title">{{ song.name }}</h3>
          <p class="flex gap-2 text-xs">
            <a
              v-for="artist in song.artists"
              :key="artist.id"
              :href="artist.external_urls.spotify"
              target="_blank"
            >
              {{ artist.name }}
            </a>
          </p>
        </div>
        <div class="spotify-icon-cont">
          <feather-icon name="spotify-2" class="" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isPlaying: false,
      song: {},
    }
  },
  methods: {
    async getSong(url) {
      console.log({ url })
      let song = await fetch(url)
        .then((res) => res.json())
        .catch((err) => {
          console.log({ err })
          return {}
        })
      this.song = song
      this.isPlaying = song.isPlaying

      console.log({ song: this.song })
      return song
    },
  },
  activated() {},
  async fetch() {
    const nowPlayingURL =
      process.env.SPOTIFY_NOW_PLAYING_URL ||
      'https://miracleio.me/.netlify/functions/spotify'
    console.log({ nowPlayingURL })
    this.song = await fetch(nowPlayingURL).then((res) => res.json())
    this.isPlaying = this.song.isPlaying

    console.log({ song: this.song })
  },
  async mounted() {
    console.log({ song: this.song })
    if (!this.song.name) {
      let data = await this.getSong(`/.netlify/functions/spotify`)
      console.log({ data })
    }
  },
}
</script>

<style scoped>
.spotify {
  @apply flex gap-4 border border-gray-200 dark:border-gray-800 p-4 rounded-lg;
}

.icon {
  @apply w-6 h-6;
}

.icon.spotify {
  @apply flex self-end justify-end items-end flex-grow;
}

.album-cover {
  @apply w-20 h-20 rounded-md;
}

.wrapper {
  @apply flex flex-col gap-2 h-full;
}

.song-title {
  @apply text-2xl font-bold;
}

.spotify-icon-cont {
  @apply flex justify-end;
}
</style>
