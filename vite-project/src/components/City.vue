<script setup>
const city = {
  name: 'My city',
  weather: 'Lowkey cloudy',
  temperature: 20.55,
  updatedAt: new Date()
}
</script>

<template>
  <div>
    <h1>{{ city.name }}</h1>

    <p>Weather: {{ city.weather }}</p>

    <p>Temperature: {{ city.temperature.toFixed(1) }} °C</p>

    <p>Update: {{ city.updatedAt.toLocaleString() }}</p>
  </div>
</template>