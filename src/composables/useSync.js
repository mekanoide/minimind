import { ref, watch } from 'vue'
import { useDebounce } from '@/composables/useDebounce'
import { useSupabaseClient } from '@/composables/useSupabaseClient'

export function useSync() {
  const content = ref('')
  const { debounce } = useDebounce()
  const { supabase } = useSupabaseClient()
  const isOnline = ref(navigator.onLine)

  // Escuchar cambios en el estado de la conexión
  window.addEventListener('online', () => (isOnline.value = true))
  window.addEventListener('offline', () => (isOnline.value = false))

  function syncNote() {
    if (isOnline.value) {
      // Intentar sincronizar con Supabase
      supabase
        .updateOrCreateNote(content.value)
        .then(() => {
          // Si la sincronización es exitosa, limpiar localStorage
          localStorage.removeItem('unsyncedNote')
        })
        .catch((error) => {
          console.error('Error syncing with Supabase:', error)
          // Si falla, asegurarse de que el contenido esté en localStorage
          saveLocally()
        })
    } else {
      // Si está offline, guardar en localStorage
      saveLocally()
    }
  }

  function saveLocally() {
    localStorage.setItem('unsyncedNote', content.value)
  }

  function loadLocalContent() {
    const storedContent = localStorage.getItem('unsyncedNote')
    if (storedContent) {
      content.value = storedContent
    }
  }

  // Cargar contenido local al iniciar
  loadLocalContent()

  // Debounce syncNote en lugar de updateNote directamente
  watch(content, () => {
    debounce(syncNote, 500) // Ajusta el tiempo según necesites
  })

  return { content }
}
