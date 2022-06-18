<template>
  <aside
    v-if="toc.length > 0"
    class="toc"
    :class="{ expanded: isExpanded }"
    @click="toggleExpand"
  >
    <div class="wrapper">
      <header class="toc__header">
        <slot name="heading">
          <h3>Table of contents</h3>
        </slot>
        <button
          class="transform lg:hidden"
          :class="{ 'rotate-90': isExpanded }"
        >
          <feather-icon name="chevron-right" />
        </button>
      </header>
      <ul class="toc__list">
        <li
          class="toc__item"
          :class="`depth-${content.depth}`"
          v-for="content in toc"
          :key="content.id"
        >
          <a :href="`#${content.id}`">
            {{ content.text }}
          </a>
        </li>
      </ul>
    </div>
  </aside>
</template>

<script>
import featherIcon from '../featherIcon.vue'
export default {
  components: { featherIcon },
  props: {
    toc: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      isExpanded: false,
    }
  },
  methods: {
    toggleExpand() {
      this.isExpanded = !this.isExpanded
    },
  },
}
</script>

<style scoped>
@import url('~/assets/css/toc.css');
</style>
