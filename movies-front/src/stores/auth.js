import { defineStore } from 'pinia'
import api from '@/api/axios'

const STORAGE_KEY = 'movies_auth'

function readStoredAuth() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}
  } catch {
    return {}
  }
}

export const useAuthStore = defineStore('auth', {
  state: () => {
    const stored = readStoredAuth()

    return {
      token: stored.token || '',
      user: stored.user || null,
    }
  },

  getters: {
    isAuthenticated: (state) => Boolean(state.token),
    userIri: (state) => state.user?.['@id'] || (state.user?.id ? `/api/users/${state.user.id}` : '/api/users/1'),
  },

  actions: {
    save() {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ token: this.token, user: this.user }))
      localStorage.setItem('token', this.token)
    },

    async login(email, password) {
      const { data } = await api.post('/auth', { email, password })
      this.token = data.token
      this.user = data.user || data.data || null
      this.save()
    },

    logout() {
      this.token = null
      this.user = null

      localStorage.removeItem(STORAGE_KEY)
      localStorage.removeItem('token')
    },
  },
})
