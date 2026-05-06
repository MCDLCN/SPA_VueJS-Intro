<script setup>
import { format } from 'timeago.js'

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
    <p>Updated {{ format(updatedAt) }}</p>
  </div>
</template>

<style scoped>
div {
  padding: 16px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background: #f8f8f8;
}
</style>    