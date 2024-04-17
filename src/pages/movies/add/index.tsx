import { Container, Box, Typography } from '@mui/material'

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
      </Box>
      <MovieForm/>
    </Container>
  )
}

export default AddMovie