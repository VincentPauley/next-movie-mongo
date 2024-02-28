import { useRouter } from 'next/router'
import { Container } from '@mui/material'
import { useQuery } from '@tanstack/react-query'

import { GetMoviesByYear } from '@/services/movies'
import MovieSearchResults from '@/components/MovieSearchResults'

const MoviesFromYear = () => {
  const router = useRouter()

  const year = Array.isArray(router.query.year) ? router.query.year[0] : router.query.year ?? ''

  const { data: movies, isError, isLoading } = useQuery({ queryKey: ['moviesByYear', year], queryFn: () => GetMoviesByYear(year) });

  return (
    <Container>
      <p>Movies From Year: {year}</p>
      {movies?.data?.length}
      <MovieSearchResults movies={movies?.data || []} />
    </Container>
  )
}

export default MoviesFromYear
