<script setup>
import { Icon } from '@iconify/vue'
import { moviePoster, movieTitle, resourceId } from '@/api/helpers'

defineProps({
  movie: { type: Object, required: true },
})
</script>

<template>
  <RouterLink class="movie-card" :to="`/movies/${resourceId(movie)}`">
    <div class="poster-box">
      <img v-if="moviePoster(movie)" :src="moviePoster(movie)" :alt="movieTitle(movie)" />
      <Icon v-else icon="ph:image-square" />
    </div>

    <div class="movie-card-body">
      <h3>{{ movieTitle(movie) }}</h3>
      <p>{{ movie.releaseDate || movie.releaseYear || movie.year || 'Unknown year' }}</p>
    </div>
  </RouterLink>
</template>
