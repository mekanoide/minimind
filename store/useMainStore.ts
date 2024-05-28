import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useMainStore = defineStore('main', () => {
  const isShowingMenu = ref<Boolean>(false)
  const isOfflineMode = ref<Boolean>(false)

  function toggleMenu() {
    isShowingMenu.value = !isShowingMenu.value
  }

  function hideMenu() {
    isShowingMenu.value = false
  }

  function showMenu() {
    isShowingMenu.value = true
  }

  function setOfflineMode() {
    console.log('Setting offline mode')
    isOfflineMode.value = true
  }

  return {
    isShowingMenu,
    isOfflineMode,
    toggleMenu,
    hideMenu,
    showMenu,
    setOfflineMode
  }
})
