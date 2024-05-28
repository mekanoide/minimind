<script setup lang="ts">
const showAddMenu = ref<Boolean>(false)

import { useMainStore } from '~/store/useMainStore'

const mainStore = useMainStore()

function onOpenMenu() {
  mainStore.toggleMenu()
}

function onAdd() {
  showAddMenu.value = !showAddMenu.value
}
</script>

<template>
  <footer class="fixed w-full bottom-0 bg-black px-4">
    <Tabs>
      <Tab
        to="/"
        icon="mdi:home-outline"
        :label="$t('home')" />
      <Tab
        to="/notes"
        icon="mdi:notebook-outline"
        :label="$t('notes')" />
      <Button
        class="pointer-events-auto whitespace-nowrap shadow-2xl -translate-y-2"
        variant="primary"
        size="large"
        :title="$t('add')"
        @click="onAdd">
        <Icon name="mdi:plus-circle-outline" />
      </Button>
      <Tab
        to="/tasks"
        icon="mdi:check-circle-outline"
        :label="$t('tasks')" />
      <Tab
        to="/settings"
        icon="mdi:settings-outline"
        :label="$t('settings')" />
    </Tabs>
  </footer>
  <menu
    v-if="showAddMenu"
    class="fixed bottom-16 right-4 z-50 grid w-max gap-2 rounded-2xl bg-zinc-900 p-4 shadow-lg">
    <li>
      <button
        type="button"
        class="w-full text-left block p-4 rounded-2xl"
        @click="onAdd">
        {{ $t('add-note') }}
      </button>
    </li>
    <li>
      <button
        type="button"
        class="w-full text-left block p-4 rounded-2xl"
        @click="onAdd">
        {{ $t('add-task') }}
      </button>
    </li>
  </menu>
</template>

<style scoped></style>
