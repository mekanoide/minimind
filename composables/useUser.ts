import { ref, onMounted } from 'vue'

export const useUser = () => {
  const supabase = useSupabaseClient()
  const userId = ref(null)
  const labels = ref([])

  const getSupabaseSession = async () => {
    const { data, error } = await supabase.auth.getSession()
    if (error) throw error
    userId.value = data.session.user.id
  }

  const getUserLabels = async () => {
    const { data, error } = await supabase
      .from('labels')
      .select('*')
      .eq('user_id', userId.value)
    if (error) throw error
    labels.value = data
  }

  onMounted(async () => {
    await getSupabaseSession()
    await getUserLabels()
  })

  return { userId, labels }
}

export default { useUser }