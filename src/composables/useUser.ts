import { ref, onMounted } from 'vue'
import { useSupabaseClient } from '@/composables/useSupabaseClient'

export const useUser = () => {
  const { supabase } = useSupabaseClient()
  const userId = ref(null)

  const getSupabaseSession = async () => {
    const { data, error } = await supabase.auth.getSession()
    if (error) throw error
    userId.value = data.session.user.id
  }

  onMounted(async () => {
    getSupabaseSession()
  })

  return { userId }
}

export default { useUser }