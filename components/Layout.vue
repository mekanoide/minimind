<script setup lang="ts">
import { computed } from 'vue'
import { useDialogStore } from '~/store/useDialogStore'
import { useLoadingStore } from '~/store/useLoadingStore'
import { useRoute } from 'vue-router'
import Header from '@/components/Header.vue'
import MobileNavigation from '@/components/MobileNavigation.vue'


const route = useRoute()
const layout = computed(() => route.meta.layout)
</script>

<template>
  <Header v-if="layout === 'default'" />
  <!-- <Loading v-if="loadingStore.isLoading" /> -->
  <main>
    <slot></slot>
  </main>
  <MobileNavigation v-if="layout === 'default'" />
</template>
