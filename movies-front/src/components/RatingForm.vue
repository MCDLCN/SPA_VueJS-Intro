<script setup>
import { computed, ref, watch } from 'vue'
import api from '@/api/axios'
import { useAuthStore } from '@/stores/auth'

const props = defineProps({
  movieId: {
    type: [String, Number],
    required: true,
  },
  reviewToEdit: {
    type: Object,
    default: null,
  },
  ratingToEdit: {
    type: Object,
    default: null,
  },
})

const authStore = useAuthStore()

const emit = defineEmits(['created', 'updated', 'cancel'])

const rating = ref(0)
const content = ref('')
const error = ref('')
const loading = ref(false)

const isEditing = computed(() => !!props.reviewToEdit)

watch(
  () => props.reviewToEdit,
  (review) => {
    content.value = review?.content ?? ''
  },
  { immediate: true }
)

watch(
  () => props.ratingToEdit,
  (ratingData) => {
    rating.value = ratingData?.note ?? 0
  },
  { immediate: true }
)

async function submitReview() {
  error.value = ''

  if (!content.value.trim()) {
    error.value = 'Review content is required.'
    return
  }

  if (!rating.value) {
    error.value = 'Rating is required.'
    return
  }

  loading.value = true

  try {
    if (isEditing.value) {
      await api.patch(
        props.reviewToEdit['@id'].replace('/api', ''),
        {
          content: content.value.trim(),
        },
        {
          headers: {
            'Content-Type': 'application/merge-patch+json',
          },
        }
      )

      if (props.ratingToEdit?.['@id']) {
        await api.patch(
          props.ratingToEdit['@id'].replace('/api', ''),
          {
            note: Number(rating.value),
          },
          {
            headers: {
              'Content-Type': 'application/merge-patch+json',
            },
          }
        )
      }

      emit('updated')
      return
    }

    await api.post('/reviews', {
      movie: `/api/movies/${props.movieId}`,
      user: `/api/users/${authStore.user.id}`,
      content: content.value.trim(),
    })

    await api.post('/ratings', {
      movie: `/api/movies/${props.movieId}`,
      user: `/api/users/${authStore.user.id}`,
      note: Number(rating.value),
    })

    content.value = ''
    rating.value = 0

    emit('created')
  } catch (err) {
  console.log(err.response?.data)
  console.log(err.response?.status)

  error.value =
    err.response?.data?.detail ||
    err.response?.data?.description ||
    err.response?.data?.violations?.[0]?.message ||
    err.message ||
    'Something went wrong.'
} finally {
    loading.value = false
  }
}

function cancelEdit() {
  emit('cancel')
}
</script>

<template>
  <form class="panel form-stack" @submit.prevent="submitReview">
    <h2>
      <Icon icon="ph:star-bold" />
      Rate this movie
    </h2>

    <label>
      Rating / 10
      <input v-model="rating" type="number" min="0" max="10" required />
    </label>

    <label>
      Review optional
      <textarea v-model="content" rows="4" placeholder="Write your review..." />
    </label>

    <button :disabled="loading" type="submit">
      {{ loading ? 'Saving...' : 'Submit' }}
    </button>

    <button type="button" @click="cancelEdit">
      Cancel
    </button>

    <p v-if="error" class="error">{{ error }}</p>
  </form>
</template>