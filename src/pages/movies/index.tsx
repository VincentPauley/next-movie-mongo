import { Typography } from '@mui/material'

import MovieList from '@/components/MovieList'

export default function MoviesPage() {
  return (
    <div>
      <Typography variant='h1'>Movies Page</Typography>
      <MovieList/>
    </div>
  )
}
