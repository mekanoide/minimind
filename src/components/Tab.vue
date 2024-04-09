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
    class="relative grid gap-2 justify-items-center cursor-pointer items-center py-2 px-8 text-zinc-500 transition-all transition-300 rounded-full hover:bg-zinc-800 hover:text-zinc-200"
    :to="to"
  >
    <Icon :icon="icon" class="h-8 w-8" />
    <span class="text-sm">{{ label }}</span>
  </RouterLink>
</template>

<style scoped>
a:is(.exact-active, :hover) {
  @apply border-rose-500 text-white;
}

/* a:is(.exact-active)::before {
  @apply block bg-rose-500 h-1 w-6 absolute top-0 content-[''] rounded-b-lg;
}
 */
 </style>
