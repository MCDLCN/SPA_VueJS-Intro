<script setup>
import { ref } from "vue"

function onListClick() {
  window.alert("Boo!");
}
</script>

<template>
  <button @click="onListClick">
    Don't click this is super scary 
  </button>
</template>