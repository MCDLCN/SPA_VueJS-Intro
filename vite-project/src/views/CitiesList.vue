<script setup>
import City from '../components/City.vue';


</script>

<template>
  <h1>
    Weather - list of cities
  </h1>
  <City
    name="My city"
    weather="cloudy"
    :temperature="20.55"
    :updatedAt="new Date()"
  />
</template>