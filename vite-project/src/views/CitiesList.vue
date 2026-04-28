<script setup>
import { ref, onMounted } from 'vue'
import City from '../components/City.vue';

const cities = ref([]) 
const loading = ref(false)
const error = ref(null)

onMounted(async () => {
  loading.value = true
  error.value = null

  try {
    cities.value = [
      {
        id: 1,
        name: 'City 1',
        weather: 'Sunny',
        temperature: 22,
        updatedAt: new Date()
      }
    ]
  } catch (e) {
    error.value = 'Failed to load cities'
  } finally {
    loading.value = false
  }
})

</script>

<template>
  <h1>
    Weather - list of cities
  </h1>
  <p v-if="loading">Loading...</p>
  <p v-if="error" style="color: red">{{ error }}</p>
  <div v-if="!loading && !error">
  <City
    v-for="city in cities"
    :key="city.id"
    :name="city.name"
    :weather="city.weather"
    :temperature="city.temperature"
    :updatedAt="city.updatedAt"
  />
  </div>
</template>

<style scoped>
.cities-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>