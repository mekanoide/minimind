<script setup lang="ts">
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
  <NuxtLink
    class="group transition-300 relative grid cursor-pointer items-center justify-items-center gap-2 rounded-full px-8 py-4 text-zinc-500 transition-all"
    :to="to"
  >
    <Icon :name="icon" size="24" />
    <span class="text-sm">{{ label }}</span>
    <div aria-hidden="true" class="mark"></div>
  </NuxtLink>
</template>

<style scoped>
a:is(.router-link-exact-active, :hover) {
  @apply text-white;
}

.mark {
  @apply absolute bottom-0 block h-1 w-0 rounded-t-lg bg-brand-500 content-[''] transition-all duration-300;
}

a:hover .mark {
  @apply w-8;
}

a:is(.router-link-exact-active) .mark {
  @apply w-full;
}
</style>
