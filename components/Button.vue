<script setup lang="ts">
const props = defineProps<{
  variant?: string
  size?: string
  pending?: boolean
}>()
</script>

<template>
  <button
    class="grid h-12 justify-center items-center rounded-2xl px-8"
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
  @apply bg-zinc-800 text-zinc-200;
}

button[data-variant='primary'] {
  @apply bg-brand-500 text-zinc-900;
}

button[data-variant='primary']:hover {
  @apply bg-brand-400;
}

button[data-size='large'] {
  @apply h-16 px-8 text-lg;
}

button[data-pending=true] {
  @apply cursor-not-allowed opacity-75;
}

button[data-pending=true] span {
  @apply cursor-not-allowed opacity-0;
}
</style>
