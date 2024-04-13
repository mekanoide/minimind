<script setup lang="ts">
import { Icon } from '@iconify/vue'

const props = defineProps<{
  icon: string
  label: string
  selected?: boolean
  to: string
}>()

const emit = defineEmits<{
  click: never[]
}>()
</script>

<template>
  <RouterLink
    class="group transition-300 relative grid cursor-pointer items-center justify-items-center gap-2 rounded-full px-8 py-4 text-zinc-500 transition-all"
    :to="to"
  >
    <Icon :icon="icon" class="h-6 w-6" />
    <span class="text-sm">{{ label }}</span>
    <div aria-hidden="true" class="mark"></div>
  </RouterLink>
</template>

<style scoped>
a:is(.exact-active, :hover) {
  @apply text-white;
}

.mark {
  @apply absolute bottom-0 block h-1 w-0 rounded-t-lg bg-brand-500 content-[''] transition-all duration-300;
}

a:hover .mark {
  @apply w-4;
}

a:is(.exact-active) .mark {
  @apply w-full;
}
</style>
