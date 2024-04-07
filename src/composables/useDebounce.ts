import { ref } from 'vue'

export function useDebounce(): { debounce: (callback: Function, wait?: number) => void } {
  const timeout = ref<number>()

  function debounce(callback: Function, wait: number = 1000) {
    clearTimeout(timeout.value)
    timeout.value = setTimeout(callback, wait)
  }

  return { debounce }
}
