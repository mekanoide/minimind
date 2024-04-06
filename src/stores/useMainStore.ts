import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useMainStore = defineStore('main', () => {
  const isShowingMenu = ref<Boolean>(false)

  function hideMenu() {
    isShowingMenu.value = false
  }

  function showMenu() {
    isShowingMenu.value = true
  }

  return {
    isShowingMenu,
    hideMenu,
    showMenu
  }
})
