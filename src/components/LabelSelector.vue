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

const labels = [1, 2, 3, 4, 5, 6]

// Computed properties

// Methods

function onToggleLabels() {
  showingLabels.value = !showingLabels.value
}

// Lifecycle hooks

// Watchers
</script>

<template>
  <div class="relative">
    <Button type="button" @click="onToggleLabels" :label="$t('show-labels')">
      <span :class="[colors.card]"></span>
      epa
    </Button>
    <menu
      v-if="showingLabels"
      class="absolute bottom-full z-50 grid w-max grid-cols-3 gap-2 rounded-lg bg-zinc-900 p-4 shadow-lg"
    >
      <li v-for="item in labels">
        <button
          :data-label="item"
          type="button"
          class="block aspect-square w-16 rounded-md"
          @click="emit('update', item)"
        ></button>
      </li>
    </menu>
  </div>
</template>

<style scoped></style>
