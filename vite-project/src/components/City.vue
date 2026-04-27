<script setup>
defineProps({
  name: String,
  weather: String,
  temperature: Number,
  updatedAt: Date
})
</script>

<template>
  <div>
    <h2>{{ name }}</h2>
    <p>Weather: {{ weather }}</p>
    <p>Temperature: {{ temperature.toFixed(1) }} °C</p>
    <p>Update: {{ updatedAt.toLocaleString() }}</p>
  </div>
</template>