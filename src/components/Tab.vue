<script setup>
const props = defineProps({
  selected: Boolean,
  to: String
})

const emit = defineEmits(['click'])
</script>

<template>
  <RouterLink class="cursor-pointer px-8 flex items-center rounded-full h-12 text-zinc-400 font-bold transition-all" :to="to">
    <slot></slot>
  </RouterLink>
</template>

<style scoped>
a:is(.exact-active, :hover) {
  @apply text-zinc-200 bg-zinc-800;
}
</style>
