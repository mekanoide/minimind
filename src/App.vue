<script setup>
import { useDialogStore } from '@/stores/useDialogStore'
import { useLoadingStore } from '@/stores/useLoadingStore'
import { storeToRefs } from 'pinia'
import Dialog from '@/components/Dialog.vue'
import Loading from '@/components/Loading.vue'
import Header from '@/components/Header.vue'
import MobileNavigation from './components/MobileNavigation.vue'

const dialogStore = useDialogStore()
const loadingStore = useLoadingStore()
</script>

<template>
  <Header />
  <!-- <Loading v-if="loadingStore.isLoading" /> -->
  <main>
    <RouterView></RouterView>
  </main>
  <MobileNavigation />
  <Dialog v-if="dialogStore.isShowingDialog" />
</template>
