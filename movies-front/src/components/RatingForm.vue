<script setup>
import { ref } from 'vue'
import { Icon } from '@iconify/vue'
import api from '@/api/axios'
import { useAuthStore } from '@/stores/auth'

const props = defineProps({
  movieId: { type: [String, Number], required: true },
})

const emit = defineEmits(['created'])

const auth = useAuthStore()
const note = ref(8)
const content = ref('')
const loading = ref(false)
const error = ref('')
const success = ref('')

async function submitRating() {
  error.value = ''
  success.value = ''
  loading.value = true

  try {
    await api.post('/ratings', {
      movie: `/api/movies/${props.movieId}`,
      user: auth.userIri,
      note: Number(note.value),
    })

    if (content.value.trim()) {
      await api.post('/reviews', {
        movie: `/api/movies/${props.movieId}`,
        user: auth.userIri,
        content: content.value.trim(),
      })
    }

    success.value = 'Rating saved.'
    content.value = ''
    emit('created')
  } catch (err) {
    error.value = err.response?.data?.detail || 'Could not save the rating.'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <form class="panel form-stack" @submit.prevent="submitRating">
    <h2>
      <Icon icon="ph:star-bold" />
      Rate this movie
    </h2>

    <label>
      Rating / 10
      <input v-model="note" type="number" min="0" max="10" required />
    </label>

    <label>
      Review optional
      <textarea v-model="content" rows="4" placeholder="Write a short review..." />
    </label>

    <button :disabled="loading" type="submit">
      {{ loading ? 'Saving...' : 'Submit' }}
    </button>

    <p v-if="error" class="error">{{ error }}</p>
    <p v-if="success" class="success">{{ success }}</p>
  </form>
</template>
