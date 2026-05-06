<script setup>
import { ref } from 'vue'
import { Icon } from '@iconify/vue'
import { moviePoster, movieTitle, resourceId } from '@/api/helpers'

const imageErrors = ref({})


defineProps({
  movie: { type: Object, required: true },
})
</script>

<template>
  <RouterLink class="movie-card" :to="`/movies/${resourceId(movie)}`">
    <div class="poster-box">
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

    <div class="movie-card-body">
      <h3>{{ movieTitle(movie) }}</h3>
      <p>{{ movie.releaseDate || movie.releaseYear || movie.year || 'Unknown year' }}</p>
    </div>
  </RouterLink>
</template>
