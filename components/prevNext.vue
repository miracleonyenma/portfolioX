<template>
  <section id="prev-next" class="prev-next">
    <!-- if prev data is available display the link -->
    <nuxt-link v-if="prev" :to="{ name: 'blog-slug', params: { slug: prev.slug } }" class="prev">
      <span class="icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
          class="feather feather-arrow-left">
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
      </span>
      <span>
        {{ prev.title }}
      </span>
    </nuxt-link>
    <!-- else display empty span for styling purposes -->
    <span class="prev" v-else></span>

    <!-- if prev data is available display the link -->
    <nuxt-link v-if="next" :to="{ name: 'blog-slug', params: { slug: next.slug } }" class="next">
      <span>{{ next.title }}</span>
      <span class="icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
          class="feather feather-arrow-right">
          <line x1="5" y1="12" x2="19" y2="12"></line>
          <polyline points="12 5 19 12 12 19"></polyline>
        </svg>
      </span>
    </nuxt-link>
    <!-- else display empty span for styling purposes -->
    <span class="next" v-else> </span>
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
