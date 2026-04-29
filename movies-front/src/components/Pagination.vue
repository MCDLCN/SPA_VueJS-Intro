<script setup>
import { computed } from 'vue'
import { Icon } from '@iconify/vue'

const props = defineProps({
  page: { type: Number, required: true },
  totalItems: { type: Number, default: 0 },
  itemsPerPage: { type: Number, default: 12 },
})

const emit = defineEmits(['change'])

const totalPages = computed(() => Math.max(1, Math.ceil(props.totalItems / props.itemsPerPage)))

const visiblePages = computed(() => {
  const start = Math.max(1, props.page - 2)
  const end = Math.min(totalPages.value, props.page + 2)
  const pages = []

  for (let current = start; current <= end; current += 1) {
    pages.push(current)
  }

  return pages
})

function goTo(pageNumber) {
  if (pageNumber < 1 || pageNumber > totalPages.value || pageNumber === props.page) return
  emit('change', pageNumber)
}
</script>

<template>
  <div class="pagination" aria-label="Pagination">
    <button :disabled="page <= 1" @click="goTo(page - 1)">
      <Icon icon="ph:caret-left-bold" />
      Previous
    </button>

    <button
      v-for="pageNumber in visiblePages"
      :key="pageNumber"
      :class="{ active: pageNumber === page }"
      @click="goTo(pageNumber)"
    >
      {{ pageNumber }}
    </button>

    <button :disabled="page >= totalPages" @click="goTo(page + 1)">
      Next
      <Icon icon="ph:caret-right-bold" />
    </button>
  </div>
</template>
