<script setup>
import { LMap, LTileLayer, LMarker } from '@vue-leaflet/vue-leaflet'
</script>

<template>
  <l-map style="height: 800px" :zoom="5" :center="[48.8566, 2.3522]">
    <l-tile-layer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    <l-marker :lat-lng="[48.8566, 2.3522]" />
  </l-map>
</template>