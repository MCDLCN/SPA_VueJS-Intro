import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import MovieList from '@/views/MovieList.vue'
import MovieDetail from '@/views/MovieDetail.vue'
import Login from '@/views/Login.vue'
import Profile from '@/views/Profile.vue'

const routes = [
  { path: '/', name: 'movies', component: MovieList },
  { path: '/movies/:id', name: 'movie-detail', component: MovieDetail, props: true },
  { path: '/login', name: 'login', component: Login },
  { path: '/profile', name: 'profile', component: Profile, meta: { requiresAuth: true } },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to) => {
  const auth = useAuthStore()

  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    return { name: 'login', query: { redirect: to.fullPath } }
  }
})

export default router
