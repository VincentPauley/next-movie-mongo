import { useRouter } from 'next/router'
import { useQuery, useMutation } from '@tanstack/react-query'
import { GetMovie, DeleteMovie } from '@/services/movies'
import { Box, Button, Container, Typography } from '@mui/material'

export default function SingleMoviePage() {
  const router = useRouter()

  const movieId = Array.isArray(router.query.movieId) ? router.query.movieId[0] : router.query.movieId ?? ''

  const { data: movie, isError, isLoading } = useQuery({ queryKey: ['movie', movieId], queryFn: () => GetMovie(movieId) });

  // DeleteMovie
  const deleteMovie: any = useMutation({
    mutationFn: () => DeleteMovie(movieId)
  });

  if (isError) {
    return <div>Error finding title...</div>
  }

  if (isLoading) {
    return <div>Loading Title...</div>
  }

  return (
    <Container>{
      movie?.data && <Typography variant="h3">{movie?.data?.title}, {movie?.data?.year} </Typography>
    }

    <Box sx={{border: '1px solid black', padding: '1rem', marginTop: '1rem'}}>
      <Typography variant="h5" sx={{ marginBottom: '1rem'}}>Movie Actions</Typography>
      <Button color="error" variant="outlined" onClick={() => deleteMovie.mutate()}>Delete</Button>
    </Box>
    
    
    </Container>)
}