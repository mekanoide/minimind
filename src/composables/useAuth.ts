import { ref, onMounted } from 'vue'
import { useSupabaseClient } from '@/composables/useSupabaseClient'

export function useAuth() {
  const { supabase } = useSupabaseClient()

  async function login(email: string) {
    const redirectURL = import.meta.env.REDIRECT_URL ?? 'http://localhost:3002'
    console.log('Redirección', redirectURL)
    try {
      const { data, error } = await supabase.auth.signInWithOtp({
        email: email,
        options: {
          redirectTo: redirectURL
        }
      })
      if (error) throw error
      return data
    } catch (error) {
      console.error('Error updating notes:', error)
    }
  }

  async function logout() {
    try {
      const { error } = await supabase.auth.signOut()
    } catch (error) {
      console.error('Error fetching notes:', error)
    }
  }

  async function getUser() {
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
