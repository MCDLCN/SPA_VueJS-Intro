<script setup>
import { Icon } from '@iconify/vue'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
</script>

<template>
  <header class="app-header">
    <RouterLink class="brand" to="/">
      Movies
    </RouterLink>

    <RouterLink class="center-link" to="/">
      Listing
    </RouterLink>

    <nav>
      <RouterLink v-if="auth.isAuthenticated" to="/profile">Profile</RouterLink>
      <RouterLink v-if="!auth.isAuthenticated" to="/login">Login</RouterLink>
      <button v-else class="link-button" @click="auth.logout()">Logout</button>
    </nav>
  </header>

  <main class="page-shell">
    <RouterView />
  </main>
</template>

<style scoped>
.app-header {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
}

.center-link {
  justify-self: center;
}

nav {
  justify-self: end;
  display: flex;
  gap: 1rem;
}

</style>