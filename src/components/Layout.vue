<script setup lang="ts">
import { useDialogStore } from '@/stores/useDialogStore'
import { useLoadingStore } from '@/stores/useLoadingStore'
import Header from '@/components/Header.vue'
import MobileNavigation from '@/components/MobileNavigation.vue'
</script>

<template>
  <Header />
  <!-- <Loading v-if="loadingStore.isLoading" /> -->
  <main>
    <slot></slot>
  </main>
  <MobileNavigation />
</template>
