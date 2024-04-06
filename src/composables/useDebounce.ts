import { ref } from 'vue'

export function useDebounce() {
  const timeout = ref('')

  const debounce = (callback, wait = 1000) => {
    clearTimeout(timeout.value)
    timeout.value = setTimeout(callback, wait)
  }

  return { debounce }
}
