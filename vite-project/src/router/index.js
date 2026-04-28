import { createRouter, createWebHistory } from 'vue-router'
import CitiesList from '../views/CitiesList.vue'
import City from '../components/City.vue'
import CitiesMap from '../components/CitiesMap.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/cities', component: CitiesList },
    { path: '/city', component: City },
    { path: '/map', component: CitiesMap}
  ]
})

export default router