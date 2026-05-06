<script setup>
import { onMounted, ref, watch } from 'vue'
import { Icon } from '@iconify/vue'
import api from '@/api/axios'
import { collectionItems, totalItems } from '@/api/helpers'
import MovieCard from '@/components/MovieCard.vue'
import Pagination from '@/components/Pagination.vue'

const movies = ref([])
const genres = ref([])
const selectedGenre = ref('')
const page = ref(1)
const itemsPerPage = 15
const total = ref(0)
const search = ref('')
const loading = ref(false)
const error = ref('')
let searchTimeout = null

async function fetchGenres() {
  const { data } = await api.get('/genres')
  genres.value = collectionItems(data)
}

async function fetchMovies() {
  loading.value = true
  error.value = ''

  try {
    const endpoint = selectedGenre.value
      ? `/genres/${selectedGenre.value}/movies`
      : '/movies'

    const { data } = await api.get(endpoint, {
      params: {
        page: page.value,
        itemsPerPage,
        title: search.value || undefined,
      },
    })

    movies.value = collectionItems(data)
    total.value = totalItems(data)
  } catch (err) {
    error.value = err.response?.data?.detail || 'Could not load movies.'
  } finally {
    loading.value = false
  }
}

function changePage(nextPage) {
  page.value = nextPage
  fetchMovies()
}

watch(search, () => {
  clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => {
    page.value = 1
    fetchMovies()
  }, 300)
})

watch(selectedGenre, () => {
  page.value = 1
  fetchMovies()
})

onMounted(async () => {
  await fetchGenres()
  await fetchMovies()
})
</script>

<template>
  <section class="hero">
    <div>
      <p class="eyebrow">Movie API front-end</p>
      <h1>Browse movies</h1>
      <p>Search, open details, login, then rate and review movies.</p>
    </div>
  </section>

  <section class="toolbar">
    <label class="search-field">
      <Icon icon="ph:magnifying-glass" />
      <input v-model="search" type="search" placeholder="Type stuff here" />
    </label>

    <select v-model="selectedGenre" class="select-field">
      <option value="">All genres</option>
      <option
        v-for="genre in genres"
        :key="genre['@id'] || genre.id"
        :value="genre.id"
      >
        {{ genre.label || genre.name }}
      </option>
    </select>
  </section>

  <p v-if="loading" class="muted">Loading movies...</p>
  <p v-else-if="error" class="error">{{ error }}</p>

  <section v-else class="movie-grid">
    <MovieCard v-for="movie in movies" :key="movie['@id'] || movie.id" :movie="movie" />
  </section>

  <Pagination
    v-if="total > itemsPerPage"
    :page="page"
    :total-items="total"
    :items-per-page="itemsPerPage"
    @change="changePage"
  />
</template>