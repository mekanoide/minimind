<script setup>
const props = defineProps({
  selected: Boolean,
  to: String
})

const emit = defineEmits(['click'])
</script>

<template>
  <RouterLink class="cursor-pointer px-8 py-4 text-stone-500" :to="to">
    <slot></slot>
  </RouterLink>
</template>

<style scoped>
a.exact-active {
  @apply text-stone-200 border-b-4 border-pink-700;
}
</style>
