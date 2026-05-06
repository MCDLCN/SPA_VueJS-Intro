<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { LMap, LTileLayer, LMarker, LIcon } from '@vue-leaflet/vue-leaflet'

const cities = ref([])
const loading = ref(false)
const error = ref(null)

const frenchCities = [
  { id: 1, name: 'Paris', latitude: 48.8566, longitude: 2.3522 },
  { id: 2, name: 'Lyon', latitude: 45.7640, longitude: 4.8357 },
  { id: 3, name: 'Marseille', latitude: 43.2965, longitude: 5.3698 },
  { id: 4, name: 'Toulouse', latitude: 43.6047, longitude: 1.4442 },
  { id: 5, name: 'Nice', latitude: 43.7102, longitude: 7.2620 },
  { id: 6, name: 'Nantes', latitude: 47.2184, longitude: -1.5536 },
  { id: 7, name: 'Strasbourg', latitude: 48.5734, longitude: 7.7521 },
  { id: 8, name: 'Montpellier', latitude: 43.6119, longitude: 3.8772 },
  { id: 9, name: 'Bordeaux', latitude: 44.8378, longitude: -0.5792 },
  { id: 10, name: 'Lille', latitude: 50.6292, longitude: 3.0573 },
  { id: 11, name: 'Rennes', latitude: 48.1173, longitude: -1.6778 },
  { id: 12, name: 'Grenoble', latitude: 45.1885, longitude: 5.7245 }
]

onMounted(async () => {
  loading.value = true
  error.value = null

  try {
    const results = await Promise.all(
      frenchCities.map(async (city) => {
        const res = await axios.get(
          `https://api.open-meteo.com/v1/forecast?latitude=${city.latitude}&longitude=${city.longitude}&current=temperature_2m,weather_code`
        )

        return {
          ...city,
          temperature: res.data.current.temperature_2m,
          weatherCode: res.data.current.weather_code,
          updatedAt: new Date(res.data.current.time)
        }
      })
    )

    cities.value = results
  } catch (e) {
    error.value = 'Request failed'
  } finally {
    loading.value = false
  }
})

const getWeatherIcon = (code) => {
  if (code === 0) return '☀️'

  if ([1, 2, 3].includes(code)) return '⛅'

  if ([45, 48].includes(code)) return '🌫️'

  if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code)) return '🌧️'

  if ([71, 73, 75, 77, 85, 86].includes(code)) return '❄️'

  if ([95, 96, 99].includes(code)) return '⛈️'

  return '🌡️'
}
</script>

<template>
  <p v-if="loading">Request in progress</p>
  <p v-if="error" class="error">{{ error }}</p>

  <l-map id="map" class="map" style="height: 600px" :zoom="5" :center="[46.603354, 1.888334]">
    <l-tile-layer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

    <l-marker
      v-for="city in cities"
      :key="city.id"
      :lat-lng="[city.latitude, city.longitude]"
    >
      <l-icon>
        <div class="weather-marker">
          {{ getWeatherIcon(city.weatherCode) }}
        </div>
      </l-icon>
    </l-marker>
  </l-map>
</template>

<style scoped>
.map {
  height: 600px;
  width: 100%;
}

.error {
  color: red;
}

.weather-marker {
  font-size: 28px;
}

#map :deep(.leaflet-marker-icon) {
  background: transparent;
  border: none;
}

#map :deep(.leaflet-marker-shadow) {
  display: none;
}
</style>