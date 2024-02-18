import { useRouter } from 'next/router'
import { useQuery } from '@tanstack/react-query'
import { GetMovie } from '@/services/movies'
import { Typography } from '@mui/material'

export default function SingleMoviePage() {
  const router = useRouter()

  const movieId = Array.isArray(router.query.movieId) ? router.query.movieId[0] : router.query.movieId ?? ''

  const { data: movie, isError, isLoading } = useQuery({ queryKey: ['movie', movieId], queryFn: () => GetMovie(movieId) });

  console.log({movie})

  if (isError) {
    return <div>Error finding title...</div>
  }

  if (isLoading) {
    return <div>Loading Title...</div>
  }

  return <div>{
    movie?.data && <Typography variant="h3">{movie?.data?.title}, {movie?.data?.year} </Typography>
  }</div>
}