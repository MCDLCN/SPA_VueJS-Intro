<script setup>
import { Icon } from '@iconify/vue'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
</script>

<template>
  <section class="panel">
    <p class="eyebrow">Protected route</p>
    <h1>
      <Icon icon="ph:lock-key-bold" />
      Profile
    </h1>
    <p>You can only see this page while logged in.</p>
    <p class="muted">JWT is stored in localStorage and sent by the Axios interceptor.</p>

    <button @click="auth.logout()">Logout</button>
  </section>
</template>
