<script setup>
import City from '../components/City.vue';


const cities = [
  {
    id: 1,
    name: 'First city',
    weather: 'Sunny',
    temperature: 22.0,
    updatedAt: new Date()
  },
  {
    id: 2,
    name: 'Second city',
    weather: 'Cloudy',
    temperature: 19.5,
    updatedAt: new Date()
  }
]

</script>

<template>
  <h1>
    Weather - list of cities
  </h1>
  <City
    v-for="city in cities"
    :key="city.id"
    :name="city.name"
    :weather="city.weather"
    :temperature="city.temperature"
    :updatedAt="city.updatedAt"
  />
</template>

<style scoped>
.cities-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>