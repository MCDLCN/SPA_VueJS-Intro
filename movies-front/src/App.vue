<script setup>
import { Icon } from '@iconify/vue'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
</script>

<template>
  <header class="app-header">
    <RouterLink class="brand" to="/">
      <Icon icon="ph:film-slate-bold" />
      Movies
    </RouterLink>

    <nav>
      <RouterLink to="/">Listing</RouterLink>
      <RouterLink v-if="auth.isAuthenticated" to="/profile">Profile</RouterLink>
      <RouterLink v-if="!auth.isAuthenticated" to="/login">Login</RouterLink>
      <button v-else class="link-button" @click="auth.logout()">Logout</button>
    </nav>
  </header>

  <main class="page-shell">
    <RouterView />
  </main>
</template>
