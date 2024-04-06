import { ref, onMounted } from 'vue'
import { useSupabaseClient } from '@/composables/useSupabaseClient'

export function useAuth() {
  const { supabase } = useSupabaseClient()

  const login = async (email) => {
    try {
      const { data, error } = await supabase.auth.signInWithOtp({
        email: email,
        options: {
          redirectTo: import.meta.env.DEV
            ? 'http://localhost:3002'
            : 'https://your-app-url.com'
        }
      })
      if (error) throw error
      return data
    } catch (error) {
      console.error('Error updating notes:', error)
    }
  }

  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut()
    } catch (error) {
      console.error('Error fetching notes:', error)
    }
  }

  const getUser = async () => {
    const {
      data: { user }
    } = await supabase.auth.getUser()
    return user
  }

  return {
    login,
    logout,
    getUser
  }
}
