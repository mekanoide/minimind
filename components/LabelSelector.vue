<script setup lang="ts">
import { ref } from 'vue'
import Button from '@/components/Button.vue'
import { useLabelColors } from '@/composables/useLabelColors'
// Imports

// Props
const props = defineProps<{
  label: number
}>()
// Emits
const emit = defineEmits<{
  update: number[]
}>()

// Properties
const colors = useLabelColors(props.label)

const showingLabels = ref<boolean>(false)

const labels = ['default', 'recommendation', 'idea', 4, 5, 6]

// Computed properties

// Methods

function onSelect(label: number) {
  emit('update', label)
  showingLabels.value = false
}

function onToggleLabels() {
  showingLabels.value = !showingLabels.value
}

// Lifecycle hooks

// Watchers
</script>

<template>
  <div class="relative">
    <button
      class="w-24 h-12 rounded-2xl grid place-content-center"
      :class="[colors.card]"
      type="button"
      @click="onToggleLabels"
      :label="$t('show-labels')">
      <span>{{ label }}</span>
    </button>
    <menu
      v-if="showingLabels"
      class="absolute bottom-full mb-2 z-50 grid w-max gap-2 rounded-2xl bg-zinc-900 p-4 shadow-lg">
      <li v-for="(item, index) in labels">
        <button
          :data-label="item"
          type="button"
          class="w-full text-left block p-4 rounded-2xl"
          :class="useLabelColors(index).card"
          @click="onSelect(index)">
          {{ item }}
        </button>
      </li>
    </menu>
  </div>
</template>

<style scoped></style>
