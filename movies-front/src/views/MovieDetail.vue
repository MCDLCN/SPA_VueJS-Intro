<script setup>
import { computed, onMounted, ref } from 'vue'
import { Icon } from '@iconify/vue'
import api from '@/api/axios'
import { collectionItems, moviePoster, movieTitle, reviewAuthor, reviewContent } from '@/api/helpers'
import { useAuthStore } from '@/stores/auth'
import RatingForm from '@/components/RatingForm.vue'

const movieProp = defineProps({
  id: { type: String, required: true },
})

const auth = useAuthStore()
const movie = ref(null)
const ratings = ref([])
const reviews = ref([])
const loading = ref(false)
const error = ref('')
const imageErrors = ref({})
const isEditingReview = ref(false)

const averageRating = computed(() => {
  if (!ratings.value.length) return null
  const total = ratings.value.reduce((sum, rating) => sum + Number(rating.note || 0), 0)
  return (total / ratings.value.length).toFixed(1)
})

const genres = computed(() =>
  movie.value?.genres?.map((genre) => genre.label).join(', ') || 'Unknown genre'
)

const cast = computed(() =>
  movie.value?.castMembers?.map((person) => person.fullName).join(', ') || 'Unknown cast'
)

const directors = computed(() =>
  movie.value?.directors?.map((person) => person.fullName).join(', ') || 'Unknown director'
)

const countries = computed(() =>
  movie.value?.countries?.join(', ') || 'Unknown country'
)

const currentUserId = computed(() => auth.user?.id)

const currentUserIri = computed(() => auth.user?.['@id'] || `/api/users/${auth.user?.id}`)

const existingReview = computed(() => {
  return reviews.value.find((review) => {
    return review.user?.id === currentUserId.value
      || review.user?.['@id'] === currentUserIri.value
  })
})

const existingRating = computed(() => {
  return ratings.value.find((rating) => {
    return rating.user?.id === currentUserId.value
      || rating.user?.['@id'] === currentUserIri.value
  })
})

async function fetchMovieData() {
  loading.value = true
  error.value = ''

  try {
    const [movieResponse, ratingsResponse, reviewsResponse] = await Promise.all([
      api.get(`/movies/${movieProp.id}`),
      api.get(`/movies/${movieProp.id}/ratings`),
      api.get(`/movies/${movieProp.id}/reviews`),
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

function ratingForReview(review) {
  return ratings.value.find((rating) => {
    return rating.user?.id === review.user?.id
      || rating.user?.['@id'] === review.user?.['@id']
  })
}

function startEditingReview() {
  isEditingReview.value = true
}

onMounted(fetchMovieData)
</script>

<template>
  <p v-if="loading" class="muted">Loading movie...</p>
  <p v-else-if="error" class="error">{{ error }}</p>

  <template v-else-if="movie">
    <section class="detail-layout">
      <div class="detail-poster">
        <img
          v-if="moviePoster(movie) && !imageErrors[movie.id]"
          :src="moviePoster(movie)"
          :alt="movieTitle(movie)"
          @error="imageErrors[movie.id] = true"
        />

        <Icon
          v-else
          icon="ph:film-strip"
        />
      </div>

      <article class="panel movie-info">
        <p class="eyebrow">Movie detail</p>

        <h1>{{ movie.title }}</h1>

        <p class="muted">
          {{ movie.year || 'Unknown release year' }}
        </p>

        <p>
          {{ movie.fullPlot || 'No description available.' }}
        </p>

        <p><strong>Genres:</strong> {{ genres }}</p>
        <p><strong>Director:</strong> {{ directors }}</p>
        <p><strong>Cast:</strong> {{ cast }}</p>
        <p><strong>Country:</strong> {{ countries }}</p>

        <p>
          <strong>IMDb: </strong>

          <template v-if="movie.imdb?.rating">
            {{ movie.imdb.rating }}/10

            <span v-if="movie.imdb?.votes">
              ({{ movie.imdb.votes }} votes)
            </span>
          </template>

          <template v-else>
            No IMDb data
          </template>
        </p>

        <p>
          <strong>Tomatoes: </strong>

          <template v-if="movie.tomatoes?.meter">
            {{ movie.tomatoes.meter }}%
          </template>

          <template v-else>
            No Tomatoes data
          </template>
        </p>

        <div class="rating-chip">
          <Icon icon="ph:star-fill" />
          {{ averageRating ? `${averageRating}/10 user average` : 'No user rating yet' }}
        </div>
      </article>
    </section>

    <section class="content-grid">
      <template v-if="auth.isAuthenticated">
        <div v-if="existingReview" class="panel">
          <h2>Your review</h2>

          <p class="muted">
            You already reviewed this movie.
          </p>

          <p>
            
            Rating:
            {{ existingRating?.note || 'No rating' }}/10
          </p>

          <p>
            {{ existingReview.content }}
          </p>

          <button
            v-if="!isEditingReview"
            class="button-like"
            @click="startEditingReview"
          >
            Edit review
          </button>

          <RatingForm
            v-else
            :movie-id="id"
            :review-to-edit="existingReview"
            :rating-to-edit="existingRating"
            @updated="fetchMovieData"
            @cancel="isEditingReview = false"
          />
        </div>

        <RatingForm
          v-else
          :movie-id="id"
          @created="fetchMovieData"
        />
      </template>

      <div v-else class="panel">
        <h2>Want to rate it?</h2>
        <p class="muted">Login first to send a rating or a review.</p>
        <RouterLink class="button-like" to="/login">Login</RouterLink>
      </div>

      <div class="panel">
        <h2>Reviews</h2>

        <p v-if="!reviews.length" class="muted">No reviews yet.</p>

        <article
          v-for="review in reviews"
          :key="review['@id'] || review.id"
          class="review-card"
        >
          <strong>{{ reviewAuthor(review) }}</strong>

          <p v-if="ratingForReview(review)" class="muted">
            <Icon icon="ph:star-fill" />
            {{ ratingForReview(review).note }}/10
          </p>

          <p>{{ reviewContent(review) }}</p>
        </article>
      </div>
    </section>
  </template>
</template>