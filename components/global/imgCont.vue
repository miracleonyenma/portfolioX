<template>
  <figure class="article-img">
      <div class="img-cont">
        <img :src="getImg()" :alt="alt" />
      </div>
    <figcaption class="caption">
      {{ alt }}
    </figcaption>
  </figure>
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      required: true,
    },
    alt: {
      type: String,
      required: true,
    },
  },

  methods: {
    getImg() {
      try {
        return require(`~/assets/img/articles/${this.src}`)
      } catch (err) {
        console.warn(err)
        return null
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@layer components{
    .article-img{
        @apply mt-0;
        .img-cont{
            @apply overflow-hidden rounded-md shadow-lg;
        }

        .caption{
            @apply text-xs text-center mt-2;
        }
    }
}
</style>