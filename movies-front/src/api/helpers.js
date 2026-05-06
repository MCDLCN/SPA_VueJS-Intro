export function collectionItems(data) {
  return (
    data?.member ||
    data?.['hydra:member'] ||
    data?.items ||
    []
  )
}

export function totalItems(data) {
  return (
    data?.totalItems ||
    data?.['hydra:totalItems'] ||
    collectionItems(data).length ||
    0
  )
}

export function resourceId(resource) {
  const iri = resource?.['@id'] || resource?.id || ''

  if (typeof iri === 'number') return iri

  return String(iri)
    .split('/')
    .filter(Boolean)
    .pop()
}

export function movieTitle(movie) {
  return movie?.title || 'Untitled movie'
}

export function movieYear(movie) {
  return movie?.year || 'Unknown year'
}

export function moviePlot(movie) {
  return movie?.fullPlot || movie?.plot || 'No description available.'
}

export function movieGenres(movie) {
  return (
    movie?.genres
      ?.map((genre) => genre.label)
      .join(', ') || 'Unknown genre'
  )
}

export function movieDirectors(movie) {
  return (
    movie?.directors
      ?.map((director) => director.fullName)
      .join(', ') || 'Unknown director'
  )
}

export function movieCast(movie) {
  return (
    movie?.castMembers
      ?.map((actor) => actor.fullName)
      .join(', ') || 'Unknown cast'
  )
}

export function movieCountries(movie) {
  return movie?.countries?.join(', ') || 'Unknown country'
}

export function imdbRating(movie) {
  return movie?.imdb?.rating || null
}

export function imdbVotes(movie) {
  return movie?.imdb?.votes || null
}

export function tomatoesRating(movie) {
  return movie?.tomatoes?.meter || null
}

export function moviePoster(movie) {
  return (
    movie?.poster ||
    movie?.posterPath ||
    movie?.image ||
    movie?.thumbnail ||
    null
  )
}

export function reviewAuthor(review) {
  return review?.user?.username || 'User'
}

export function reviewContent(review) {
  return review?.content || 'No review content.'
}