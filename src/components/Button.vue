<script setup lang="ts">
import Spinner from '@/components/Spinner.vue'

const props = defineProps<{
  variant?: string
  size?: string
  pending?: boolean
}>()
</script>

<template>
  <button
    class="relative grid h-12 justify-center items-center rounded-full px-8"
    :data-variant="variant"
    :data-size="size"
    :data-pending="pending"
  >
    <span class="grid grid-flow-col items-center gap-2 col-start-1 row-start-1">
      <slot></slot>
    </span>
    <Spinner v-if="pending" class="col-start-1 row-start-1 justify-self-center" />
  </button>
</template>

<style scoped>
button:not([data-variant]) {
  @apply bg-zinc-800 text-zinc-400;
}

button[data-variant='primary'] {
  @apply bg-rose-600 text-zinc-900;
}

button[data-variant='primary']:hover {
  @apply bg-rose-500;
}

button[data-size='large'] {
  @apply h-16 px-12 text-lg;
}

button[data-pending=true] {
  @apply cursor-not-allowed opacity-75;
}

button[data-pending=true] span {
  @apply cursor-not-allowed opacity-0;
}
</style>
