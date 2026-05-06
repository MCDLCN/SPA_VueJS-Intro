<script setup>
import { useAuthStore } from '@/stores/auth'
import toroCheer from '@/assets/toroCheer.gif'


const auth = useAuthStore()
</script>

<template>
  <section class="panel">    
    <img :src="toroCheer" alt="Profile gif" />
    <p>If you see this you're logged in</p>
    <br>
    <button @click="auth.logout()">Logout</button>
  </section>
</template>
