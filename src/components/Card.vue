<script setup>
const props = defineProps({
  data: Object,
});
</script>

<template>
  <li class="Card">
    <time datetime="data.datetime">{{ data.datetime }}</time>
    <p class="content">{{ data.content }}</p>
  </li>
</template>

<style scoped>
.Card {
  @apply block rounded-xl border-2 border-gray-700 p-6;
}

time {
  @apply text-gray-500;
}

.content {
  @apply line-clamp-4;
}
</style>
