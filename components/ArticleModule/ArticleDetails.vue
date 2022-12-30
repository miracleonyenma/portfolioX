<script setup>
import { ClockIcon, CalendarIcon } from "@heroicons/vue/24/solid/index";

const { article, options } = defineProps({
  article: {
    type: Object,
    required: true,
  },
  options: {
    type: Object,
    required: false,
  },
});
</script>
<template>
  <footer class="details">
    <div class="author detail-item !items-center">
      <div v-if="options?.showAvatar" class="img-cont shrink-0 w-10 h-10">
        <img
          :src="
            article.author?.avatar ||
            '/assets/img/miracleio.jpg'
          "
          :alt="article.author?.name || 'Miracle Onyenma'"
          srcset=""
          class="!rounded-full ring ring-han-purple"
        />
      </div>
      <span>
        {{ article.author?.name || "Miracle Onyenma" }}
      </span>
    </div>
    <div class="detail-group justify-end">
      <div class="detail-item date">
        <CalendarIcon class="icon" />
        <time
          :datetime="
            article.createdAt || article.gitCreatedAt || article.fileCreatedAt
          "
        >
          {{
            article.formattedCreatedAt ||
            article.formattedGitCreatedAt ||
            article.formattedFileCreatedAt
          }}
        </time>
      </div>

      <div class="detail-item reading-time">
        <ClockIcon class="icon" />
        <span>
          {{ article.readingTime?.text }}
        </span>
      </div>
    </div>
  </footer>
</template>
<style scoped>
.details {
  @apply flex mt-2 gap-4 justify-between;
}

.detail-item {
  @apply flex items-start sm:items-center gap-2 font-heading font-semibold text-xs;
}

.detail-group {
  @apply flex items-center flex-wrap gap-4 gap-y-2;
}
</style>
