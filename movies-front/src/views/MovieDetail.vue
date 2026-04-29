<script setup>
import { computed, onMounted, ref } from 'vue'
import { Icon } from '@iconify/vue'
import api from '@/api/axios'
import { collectionItems, moviePoster, movieTitle } from '@/api/helpers'
import { useAuthStore } from '@/stores/auth'
import RatingForm from '@/components/RatingForm.vue'

const props = defineProps({
  id: { type: String, required: true },
})

const auth = useAuthStore()
const movie = ref(null)
const ratings = ref([])
const reviews = ref([])
const loading = ref(false)
const error = ref('')

const averageRating = computed(() => {
  if (!ratings.value.length) return null
  const total = ratings.value.reduce((sum, rating) => sum + Number(rating.note || 0), 0)
  return (total / ratings.value.length).toFixed(1)
})

async function fetchMovieData() {
  loading.value = true
  error.value = ''

  try {
    const [movieResponse, ratingsResponse, reviewsResponse] = await Promise.all([
      api.get(`/movies/${props.id}`),
      api.get(`/movies/${props.id}/ratings`),
      api.get(`/movies/${props.id}/reviews`),
    ])

    movie.value = movieResponse.data
    ratings.value = collectionItems(ratingsResponse.data)
    reviews.value = collectionItems(reviewsResponse.data)
  } catch (err) {
    error.value = err.response?.data?.detail || 'Could not load movie details.'
  } finally {
    loading.value = false
  }
}

onMounted(fetchMovieData)
</script>

<template>
  <p v-if="loading" class="muted">Loading movie...</p>
  <p v-else-if="error" class="error">{{ error }}</p>

  <template v-else-if="movie">
    <section class="detail-layout">
      <div class="detail-poster">
        <img v-if="moviePoster(movie)" :src="moviePoster(movie)" :alt="movieTitle(movie)" />
        <Icon v-else icon="ph:film-strip" />
      </div>

      <article class="panel movie-info">
        <p class="eyebrow">Movie detail</p>
        <h1>{{ movieTitle(movie) }}</h1>
        <p class="muted">{{ movie.releaseDate || movie.releaseYear || movie.year || 'Unknown release date' }}</p>
        <p>{{ movie.description || movie.overview || movie.synopsis || 'No description available.' }}</p>

        <div class="rating-chip">
          <Icon icon="ph:star-fill" />
          {{ averageRating ? `${averageRating}/10 average` : 'No rating yet' }}
        </div>
      </article>
    </section>

    <section class="content-grid">
      <RatingForm v-if="auth.isAuthenticated" :movie-id="id" @created="fetchMovieData" />

      <div v-else class="panel">
        <h2>Want to rate it?</h2>
        <p class="muted">Login first to send a rating or a review.</p>
        <RouterLink class="button-like" to="/login">Login</RouterLink>
      </div>

      <div class="panel">
        <h2>Reviews</h2>
        <p v-if="!reviews.length" class="muted">No reviews yet.</p>
        <article v-for="review in reviews" :key="review['@id'] || review.id" class="review-card">
          <strong>{{ review.user?.username || 'User' }}</strong>
          <p>{{ review.content }}</p>
        </article>
      </div>
    </section>
  </template>
</template>
