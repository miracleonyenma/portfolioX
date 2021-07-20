<template>
  <aside v-if="toc.length > 0" class="toc">
    <header class="toc__header">
      <slot name="heading">
        <h1>Table of contents</h1>
      </slot>
    </header>
    <ul class="toc__list">
      <li class="toc__item" :class="`depth-${content.depth}`" v-for="content in toc" :key="content.id">
        <a :href="`#${content.id}`">
          {{ content.text }}
        </a>
      </li>
    </ul>
  </aside>
</template>

<script>
  export default {
    props: {
      toc: {
        type: Array,
        required: true,
      },
    },
  }

</script>

<style lang="scss" scoped>
  .toc {
    @apply mb-8;

    &__item {
      &.depth-3 {
        @apply ml-8;
      }
    }
  }

</style>
