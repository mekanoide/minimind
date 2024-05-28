import { useMainStore } from '@/store/useMainStore'

export default defineNuxtRouteMiddleware(() => {
  console.log('Running auth middleware')
  const mainStore = useMainStore()
  const user = useSupabaseUser()
  // TODO: Redirect to login page if user is not logged in and the app is not in offline mode
  if (!user.value && !mainStore.isOfflineMode) {
    console.log('User is not logged in, redirecting to login page')
    return navigateTo('/auth')
  }
})
