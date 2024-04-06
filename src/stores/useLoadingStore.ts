import { defineStore } from "pinia"
import { ref } from "vue"

export const useLoadingStore = defineStore('loading', () => {
  const isLoading = ref<Boolean>(false)

  function startLoading() {
    isLoading.value = true
  }

  function finishLoading() {
    isLoading.value = false
  }
  return {
    isLoading,
    startLoading,
    finishLoading
  }
})