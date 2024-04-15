import { Container, Box, Typography } from '@mui/material'

import MovieCountDisplay from '@/components/MovieCountDisplay'
import MovieForm from '@/components/MovieForm'

const AddMovie = () => {
  return (
    <Container>
      <Box
        sx={{
          display: 'flex',
          padding: '2rem'
        }}
      >
        <Typography
          variant="h4"
          sx={{
            marginRight: '.5rem'
          }}
        >Add Movie</Typography>
        <MovieCountDisplay/>
      </Box>
      <MovieForm/>
    </Container>
  )
}

export default AddMovie