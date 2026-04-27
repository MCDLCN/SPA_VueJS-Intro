import { createApp } from 'vue'
import App from './App.vue'
import CitiesList from './views/CitiesList.vue'
import "./style.scss"

createApp(App).mount('#app')
createApp(CitiesList).mount('#CitiesList')

