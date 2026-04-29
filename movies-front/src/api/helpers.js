export function collectionItems(data) {
  return data?.member || data?.['hydra:member'] || data?.items || []
}

export function totalItems(data) {
  return data?.totalItems || data?.['hydra:totalItems'] || collectionItems(data).length || 0
}

export function resourceId(resource) {
  const iri = resource?.['@id'] || resource?.id || ''

  if (typeof iri === 'number') return iri
  return String(iri).split('/').filter(Boolean).pop()
}

export function movieTitle(movie) {
  return movie?.title || movie?.name || 'Untitled movie'
}

export function moviePoster(movie) {
  return movie?.posterPath || movie?.poster || movie?.image || movie?.thumbnail || null
}
