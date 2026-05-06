<script setup>

function onListClick() {
  window.alert("Boo!");
}
</script>

<template>
  <button @click="onListClick">
    Don't click this is super scary
  </button>
  <router-view />
  <br>
  <router-link to="/" >Take me back home</router-link>
  <br>
  <router-link to="/cities" >To the cities</router-link>
</template>