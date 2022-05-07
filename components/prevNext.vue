<template>
  <section id="prev-next" class=" px-4">
    <div class="prev-next wrapper w-full px-4 border dark:border-gray-800 rounded-lg">
    <!-- if prev data is available display the link -->
    <nuxt-link v-if="prev" :to="{ name: 'blog-slug', params: { slug: prev.slug } }" class="prev">
      <feather-icon name="arrow-left" />
      <span>
        {{ prev.title }}
      </span>
    </nuxt-link>
    <!-- else display empty span for styling purposes -->
    <span class="prev" v-else></span>

    <!-- if prev data is available display the link -->
    <nuxt-link v-if="next" :to="{ name: 'blog-slug', params: { slug: next.slug } }" class="next">
      <span>{{ next.title }}</span>
      <feather-icon name="arrow-right" />
    </nuxt-link>
    <!-- else display empty span for styling purposes -->
    <span class="next" v-else> </span>
    </div>
  </section>
</template>

<script>
  export default {
    // create props for prev and next data that will be passed to the component
    props: {
      prev: {
        type: Object,
        default: () => null,
      },
      next: {
        type: Object,
        default: () => null,
      },
    },
  }

</script>

<style scoped>
  @layer components {

    /* styling for the components */
    .prev-next {
      @apply flex gap-12 py-8 items-center justify-between m-auto max-w-xl lg:max-w-4xl;
    }

    .prev-next a {
      @apply flex gap-2;
    }
  }

</style>
