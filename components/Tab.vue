<script setup lang="ts">
const props = defineProps<{
  icon: string
  label: string
  selected?: boolean
  to: string
}>()

const localePath = useLocalePath()

const emit = defineEmits<{
  click: never[]
}>()
</script>

<template>
  <NuxtLink
    class="group transition-300 relative grid cursor-pointer items-center justify-items-center gap-2 rounded-2xl px-4 py-4 text-zinc-300 transition-all"
    :title="label"
    :to="localePath(to)"
  >
    <Icon :name="icon" size="32" />
<!--     <span class="text-xs text-ellipsis max-w-20">{{ label }}</span> -->
    <div aria-hidden="true" class="mark"></div>
  </NuxtLink>
</template>

<style scoped>
a:is(.router-link-exact-active, :hover) {
  @apply text-brand-400;
}

.mark {
  @apply absolute bottom-0 block h-1 w-0 rounded-t-2xl bg-brand-400 content-[''] transition-all duration-300;
}

a:hover .mark {
  @apply w-8;
}

a:is(.router-link-exact-active) .mark {
  @apply w-full;
}
</style>
