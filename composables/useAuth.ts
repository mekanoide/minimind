import { ref, onMounted } from 'vue'

export function useAuth(): {
  login: (email: string) => Promise<any>
  logout: () => Promise<void>
  getUser: () => Promise<any>
  verifyOtp: (email: string, token: string) => Promise<any>
} {
  const supabase = useSupabaseClient()

  async function login(email: string, redirectUrl?: string) {
    try {
      const { data, error } = await supabase.auth.signInWithOtp({
        email: email,
        options: {
          emailRedirectTo:
            process.env.REDIRECT_URL ??
            redirectUrl ??
            'http://localhost:3002'
        }
      })
      if (error) throw error
      return data
    } catch (error) {
      console.error('Error updating notes:', error)
    }
  }

  async function verifyOtp(email: string, token: string) {
    try {
      const { data, error } = await supabase.auth.verifyOtp({
        email: email,
        token: token,
        type: 'email'
      })
      if (error) throw error
      return data
    } catch (error) {
      console.error('Error fetching notes:', error)
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
    verifyOtp,
    logout,
    getUser
  }
}
