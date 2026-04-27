import { createRouter, createWebHistory } from 'vue-router'
import CitiesList from '../views/CitiesList.vue'
import City from '../components/City.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/cities', component: CitiesList },
    { path: '/city', component: City }
  ]
})

export default router