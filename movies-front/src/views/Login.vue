<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Icon } from '@iconify/vue'
import { useAuthStore } from '@/stores/auth'

const route = useRoute()
const router = useRouter()
const auth = useAuthStore()

const email = ref('test1@test.com')
const password = ref('password')
const loading = ref(false)
const error = ref('')

async function submitLogin() {
  loading.value = true
  error.value = ''

  try {
    await auth.login(email.value, password.value)
    await router.push(route.query.redirect || '/')
  } catch (err) {
    error.value = err.response?.data?.message || err.response?.data?.detail || 'Login failed.'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <section class="auth-page">
    <form class="panel auth-card form-stack" @submit.prevent="submitLogin">
      <Icon class="auth-icon" icon="ph:user-circle-bold" />
      <h1>Login</h1>
      <p class="muted">Test account: test1@test.com / password</p>

      <label>
        Email
        <input v-model="email" type="email" required />
      </label>

      <label>
        Password
        <input v-model="password" type="password" required />
      </label>

      <button :disabled="loading" type="submit">
        {{ loading ? 'Connecting...' : 'Login' }}
      </button>

      <p v-if="error" class="error">{{ error }}</p>
    </form>
  </section>
</template>
