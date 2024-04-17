import { Container, Typography } from '@mui/material'

import MovieList from '@/components/MovieList'

export default function MoviesPage() {
  return (
    <Container maxWidth="md">
      <Typography variant='h2'>Movie Search</Typography>
      <MovieList/>
    </Container>
  )
}
