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
    class="grid justify-items-center cursor-pointer items-center rounded-full py-2 px-8 font-bold text-zinc-400 transition-all"
    :to="to"
  >
    <Icon :icon="icon" class="h-8 w-8" />
    <span class="text-sm">{{ label }}</span>
  </RouterLink>
</template>

<style scoped>
a:is(.exact-active, :hover) {
  @apply bg-zinc-800 text-white;
}
</style>
