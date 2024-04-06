<script setup>
import { useDialogStore } from '@/stores/useDialogStore'
import { useLoadingStore } from '@/stores/useLoadingStore'
import { storeToRefs } from 'pinia'
import Dialog from '@/components/Dialog.vue'
import Loading from '@/components/Loading.vue'

const dialogStore = useDialogStore()
const loadingStore = useLoadingStore()
</script>

<template>
  <Loading v-if="loadingStore.isLoading" />
  <RouterView v-else></RouterView>
  <Dialog v-if="dialogStore.isShowingDialog" />
</template>
