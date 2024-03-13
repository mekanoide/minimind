import { createRouter, createWebHistory } from 'vue-router'
import { useSupabaseClient } from '@/composables/useSupabaseClient'
import Notes from '@/pages/Notes.vue'
import Tasks from '@/pages/Tasks.vue'

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
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  linkActiveClass: 'active',
  linkExactActiveClass: 'exact-active'
})

router.beforeEach(async (to, from, next) => {
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
})

export default router
