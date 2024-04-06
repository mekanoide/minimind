import {
  NavigationGuardNext,
  RouteLocationNormalized,
  createRouter,
  createWebHistory
} from 'vue-router'
import { useSupabaseClient } from '@/composables/useSupabaseClient'
import Notes from '@/pages/Notes.vue'
import Tasks from '@/pages/Tasks.vue'
import Auth from '@/pages/Auth.vue'
import { useLoadingStore } from '@/stores/useLoadingStore'

const { supabase } = useSupabaseClient()

const routes = [
  {
    path: '/',
    redirect: '/notes'
  },
  {
    path: '/notes',
    name: 'Notes',
    component: Notes,
    meta: { requiresAuth: true }
  },
  {
    path: '/tasks',
    name: 'Tasks',
    component: Tasks,
    meta: { requiresAuth: true }
  },
  {
    path: '/auth',
    name: 'Auth',
    component: Auth
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  linkActiveClass: 'active',
  linkExactActiveClass: 'exact-active'
})

router.beforeEach(
  async (
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext
  ): Promise<void> => {
    const loadingStore = useLoadingStore()
    loadingStore.startLoading()
    const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)
    const {
      data: { user }
    } = await supabase.auth.getUser()

    console.log('currentUser', user)

    if (requiresAuth && !user) {
      next('/auth') // Redirige a la página de autenticación
    } else {
      next() // Continúa con la navegación prevista
    }
  }
)

router.afterEach(() => {
  const loadingStore = useLoadingStore()
  setTimeout(() => loadingStore.finishLoading(), 500)
})

export default router
