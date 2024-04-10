<script setup>
// Imports
import Tabs from '@/components/Tabs.vue'
import Tab from '@/components/Tab.vue'
// Props

// Emits

// Reactive properties

// Computed properties

// Methods

// Lifecycle hooks

// Watchers
</script>

<template>
  <footer class="fixed w-full bottom-0 grid place-content-center bg-black px-4">
    <Tabs>
      <Tab to="/notes" icon="mdi:notebook-outline" :label="$t('notes')"></Tab>
      <Tab to="/tasks" icon="mdi:check-circle-outline" :label="$t('tasks')"></Tab>
    </Tabs>
  </footer>
</template>

<style scoped></style>
